---
title: "Decoupling the Agent Core from the Tool Runtime"
description: "What OpenAI's Agents API protocol reveals about the next shift in agent architecture: decoupling the persistent Agent Core from thin Tool Runtimes so one agent can operate N computers as peripherals without cross-machine A2A."
pubDate: 2026-11-12T20:55:00Z
updatedDate: 2026-11-12
heroImage: "https://toddzheng.net/media/01-coupled-vs-decoupled-en-1b7c9848.png"
tags: ["ai", "agents", "openai", "mcp", "software-engineering"]
---

> I have been looking into the protocol design of OpenAI's Agents API recently. Setting aside the surface-level abstractions, I think the protocol points to a much more important architectural shift underneath: decoupling the Agent Core from the Tool Runtime (or rather, multiple Tool Runtimes). This means we can have a single, persistent agent with continuous memory operating N different computers at once, without needing agents on different machines to talk to each other over A2A.

## A Formula Coupled by Default

In 2023, Lilian Weng wrote a widely cited post, "LLM Powered Autonomous Agents", which introduced a formula that has since appeared in countless papers and talks: Agent = LLM (Model) + Memory (Context) + Planning + Tool Use. OpenAI and Anthropic later gave similar engineering definitions in their own guides, roughly boiling an agent down to Model, Context, Control Loop, and Tools. That formula only defines the logical components of an agent. It never said those components have to run on the same bare metal.

In fact, the first decoupling happened on day one. Because a hundred-billion-parameter model does not fit on a personal laptop, everyone naturally accepted that the Model lives on a GPU cluster in the cloud, reached over an HTTP API. Yet out of engineering convenience and historical inertia, the remaining three pieces, Context, Control Loop, and Tool Runtime, ended up bundled inside a single process on a single machine.

Ever since local agents like Claude Code and OpenClaw took off, this bundling has been taken for granted even more. To get the easiest possible access to the local filesystem and bash, developers naturally put the agent's Control Loop (or Harness), the session context, and even long-term memory (such as `CLAUDE.md` or local memory files sitting in a directory) into the same local process. Without quite noticing it, everyone accepted an implicit assumption: wherever the Tool Runtime lives, the agent itself must live on that machine too.

![Two physical boundary shifts of agent components](https://toddzheng.net/media/01-coupled-vs-decoupled-en-1b7c9848.png)

## Cross-Machine A2A: Paying for an Architectural Flaw

The moment you work across more than one computer, that assumption starts getting in your way. Right now I carry a MacBook with me, keep a desktop at home, and run two Linux devboxes in the cloud for training and builds. Under the current model, I have to run four separate agents on those four machines. Each one guards its own bash shell and filesystem, with its own isolated memory that knows nothing about the others. Once I teach the agent on my MacBook my coding style and how an internal tool works, switching to a cloud devbox means starting over with an agent that knows none of it.

You might argue that I could run one primary agent on my MacBook and have it reach the other devboxes over SSH or remote MCP. Doesn't that let one agent operate multiple machines? The catch is that doing so simply turns your MacBook into a single point of failure. The moment you close the lid and walk out of the office, the entire Control Loop goes to sleep and dies with it. And when you sit down at your home desktop later that night, all the context and memory you built up during the day is still locked inside that sleeping MacBook at work.

Things get even more absurd when a task spans multiple machines. Suppose I want my agent to inspect some half-finished code on my MacBook, run a load test on a cloud devbox, and write up the results on my home machine. Because each agent is tied to its physical host, the industry has started promoting A2A (Agent-to-Agent) protocols so agents on different computers can message each other to string the workflow together. To me, running A2A between multiple computers owned by the same person is pure tax on a flawed architecture.

In any system, signal loss across boundaries cannot be ignored. Every handoff across a boundary acts like multiplying by a factor between 0 and 1; the longer the chain, the more you lose along the way. A2A forces one or more lossy natural-language translations right into the middle of your system. The agent on Machine A already holds the exact stack trace, context details, and reasoning tokens in its head. Just because it cannot call bash on Machine B directly, it has to compress that precise intermediate state into a block of natural language and pass it like a game of telephone to the agent on Machine B. Machine B's agent reads the message, tries to reconstruct the intent, reasons from scratch, runs the command, and translates the result back into natural language. Not only does this burn multiples of the tokens and latency, it causes severe information loss: critical details simply vanish after two rounds of natural-language paraphrasing.

![Signal loss in cross-machine A2A](https://toddzheng.net/media/02-a2a-telephone-game-en-193451df.png)

Real A2A should only happen across trust boundaries or between different people, such as my personal agent negotiating a meeting time with yours; or for deliberate context isolation, such as spawning a temporary subagent to sift through hundreds of megabytes of noisy logs and return only the conclusion so the main context stays clean. Running two separate agents and making them chat with each other just because two disks and two bash shells sit on different physical machines is drawing the system boundary in the wrong place.

## How OpenAI's Agents API Solves It

If you look back at the protocol design of OpenAI's new Agents API (`v1/agents`), you can see that it untangles this knot at the protocol layer.

In the Agents API, what used to be welded together inside a local process is cleanly split into two primitives: a server-hosted Agent Core (represented in the API as a Session that maintains persistent memory, automatic context compaction, and the background control loop), and an execution layer represented by the Environment and remote MCP servers. Whether exposing this as a stateful Session at the API surface is the right abstraction is another question; I actually think the user-facing experience should be completely sessionless, which is a deep rabbit hole we will save for the next post. At the physical topology layer, however, it cleanly separates the Agent Core from the Tool Runtime.

Under this protocol, if you want the cloud Agent Core to operate your own computer or private server, you have two channels. One is setting the Environment to `self_hosted` and running a lightweight executor (`codex exec-server`) on the machine to handle local PTY terminals and file reads/writes. The other is using Secure MCP Tunnel (`tunnel-client`) to expose local MCP services from different machines back to the same Agent Core. Either way, what runs on your local computer is no longer a full agent, just a very thin executor. It opens an outbound WebSocket or HTTPS connection to the cloud (so no public IP is required), does zero thinking of its own, and simply follows instructions from the Agent Core: run a shell command in a local PTY, read or write a file, or forward a local tool call, and stream stdout/stderr back.

This is the exact same principle as the "thin client" model I argued for in "[Skill + CLI Considered Harmful](/en/blog/skill-cli-considered-harmful/)". Each computer stops running a full agent and steps back into being a pure Tool Runtime.

## Computers Are Just Peripherals: Toward a True Personal Agent

Once you see it this way, the rest of the architecture falls into place: a computer is really just a hot-swappable peripheral for the agent. Just as we plug three monitors and two keyboards into a single workstation, one persistent Agent Core can mount N different Tool Runtimes at the same time. My MacBook is one Tool Runtime, my cloud GPU devbox is a second, and my Raspberry Pi home server is a third. Within a single reasoning turn, that same agent can call a tool on my MacBook to read a local file, and in the very next step of the same thought process, invoke bash on the Linux devbox to kick off a job. There is zero A2A telephone loss in between, and all long-term memory, personal preferences, and reasoning context remain intact inside that single Agent Core. Even when I close my MacBook lid, put it in my bag, and walk out of the office, the agent does not die when the laptop sleeps. It simply notices that the MacBook peripheral has disconnected, while its work on the cloud devbox keeps right on running.

![One persistent Agent Core operating N computer peripherals](https://toddzheng.net/media/03-one-core-n-runtimes-en-42f696b6.png)

When you think about it, this is how humans work too. Humans do not have tools growing out of our bodies. We walk over to where the tools are and operate them: a desktop at the office desk, a laptop on the train, a home PC at night. The tools stay where they are, while the one doing the thinking and carrying the memory is always the same person. We never split ourselves into two people just because we own a computer at work and another at home, nor do we call our office self on the phone at night to hand off what we did during the day.

Only with this kind of architecture can we get a true Personal Agent: a personal assistant that follows the person, carries continuous memory, and stays with you wherever you work.

## Closing Thoughts

For the past two years, our mental model for building agents has been "Compute-Attached": start with a computer, drop an agent inside it, and have it operate that computer for you. As protocols like the OpenAI Agents API mature and decouple the control loop from the execution environment, the next wave will inevitably move toward "Identity-Attached": the Agent Core follows the person, while the N computers, containers, and phones in our hands are simply Tool Runtimes that plug into that core on demand.

Of course, hanging the Tool Runtimes of all your devices off a single Agent Core brings its own engineering challenges: isolating permissions across machines to contain the blast radius if one edge machine ingests untrusted data and hits a prompt injection, or handling offline degradation on a flight without Wi-Fi. Still, the direction is clear. Stop installing a separate agent on every computer you own and making them text each other over A2A. All your computer really needs is a thin runtime daemon.
