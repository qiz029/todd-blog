---
title: "Skill + CLI Considered Harmful"
description: "More and more platforms integrate with agents by shipping a Skill plus a CLI. It works, but it ships the version problem back to the user's machine, a problem the web already solved once."
pubDate: 2026-09-19T07:23:30Z
updatedDate: 2026-09-19
tags: ["ai", "agents", "cli", "mcp", "software-engineering"]
---

> The title is a nod to Dijkstra's 1968 letter, "Go To Statement Considered Harmful", and my point is much the same. Many platforms now integrate with agents by shipping a Skill plus a CLI. It is pleasant to use, but sooner or later the platform will pay for it. Its biggest problem is version control, which is a problem the software industry already solved once over the past 20 years, with the web.

## Why Skill + CLI Took Off

Ever since OpenClaw blew up, more and more platforms have started shipping a skill plus a CLI so that a user's agent can reach that user's resources on the platform. Agents have some natural advantages with a CLI. Humans have left behind plenty of POSIX training data, so agents already know how to use one. A CLI is designed to describe itself and to return reasonable error messages. And then there is the Unix philosophy of text streams over binary formats: a text stream is directly readable by both humans and agents, and it can be piped freely into other CLIs to process data. As Peter Steinberger, the creator of OpenClaw, put it, once an agent can use bash, it's all over.

The Skill, for its part, describes how to make the calls, the flows, and the error codes. It supplements the CLI with context, so the agent knows: 1. when to call this CLI, 2. how to call it, 3. how to chain a series of operations together.

As an aside, the problem that Agent + Skill + CLI directly solves is enterprise integration (or, if you like, low-code platforms). An enterprise integration flow has three elements: Workflow, Connectors, and Data Transformation. The first two are not that hard, and today they map to the Skill and the CLI. The third is the painful one: how do you express a data transformation in natural language? LLMs solved that one, though. This topic is a deep rabbit hole, so let's save it for another day.

## The Biggest Problem: Version Control

This approach does work. Compared with the early MCP model, or with letting the agent call HTTP APIs directly, it is clearly more accurate and gives better control over the flow. Compared with letting the agent do browser use or computer use, it saves a lot of tokens, runs faster, and does not require a multimodal model. But <mark>its biggest problem is version control</mark>. The Lark CLI on my machine has not been upgraded in a long time, to say nothing of my Lark skill. Asking ordinary users to upgrade their skills and CLIs is even less realistic.

This is a classic distributed systems problem: we cannot assume that every node in the system is on one unified, harmonious version. For enterprise platforms in particular, we have to do everything we can to make sure a server-side upgrade does not simply break the user's experience. If the CLI version is incompatible with the server, say because of a breaking schema change, things are arguably not so bad. The server will usually return a fairly obvious error. If the workflow of an enterprise integration has changed, for example an approval that used to be required no longer is, the problem becomes a silent one. <mark>It is hard to notice, and it may even lead the agent to the wrong judgment.</mark>

## Turning Back the Clock

Why has the web grown so fast over the past 20 years? The core reason is that this development model is the easiest to distribute and the cheapest to maintain: you never have to worry about whether the user's local version is compatible. The server pulls most of the control, and most of the potential for incompatibility, over to its own side. What is left for the client is a very thin webapp, plus the user's own browser. And browsers are relatively stable. They do not introduce breaking changes very often (although there is, of course, the horrifying requirement of supporting IE).

Anyone who lived through the desktop client era should remember what things were like before. Enterprise software meant installing a client on one machine after another. Every time the server was upgraded, IT had to chase each user to upgrade as well. There were always a few machines stuck forever on a version from three years ago, which would then throw errors right on schedule some Monday morning. Later, SaaS killed off these locally installed enterprise applications one by one, largely because a user could refresh the page and get the latest version. The "version" problem simply disappeared for users.

Now look at Skill plus CLI again. <mark>The CLI is that fat client installed on the user's machine, and the Skill is an operating manual that ships with it.</mark> And this combination is worse than the desktop software of those days. Desktop software at least learned to auto-update eventually. Mobile apps have app store updates, and if all else fails they can force an upgrade and refuse to run until you take it. The CLI? The user has to remember to run an upgrade command. The Skill has it even worse. Most of the time it is just a few markdown files sitting in some directory, many of them without so much as a version number, let alone an upgrade mechanism. When the server-side flow changes, this manual does not change at all, and the agent will keep diligently working from an outdated manual.

It took us 20 years to pull control and compatibility back from the user's computer to the server. Integrating with platforms through Skill plus CLI amounts to shipping them right back out again. That is plainly turning back the clock.

## History Already Gave Us the Answer

The idea I am proposing here is not new. It comes from historical experience and some logical thinking. In his 1999 paper "The Jini Architecture for Network-Centric Computing", Jim Waldo stated plainly that a large network cannot require all of its nodes to upgrade in lockstep (or even guarantee that some nodes will ever upgrade at all, ha). In 2008, in "REST APIs Must Be Hypertext-Driven", Roy Fielding pointed out that beyond the entry point and standard media types, application state should be driven by the choices the server provides. Only then can you keep the server's workflow knowledge from leaking into the client and becoming a leaky abstraction. All of this says that for a platform, <mark>shipping a very thick CLI is the wrong choice, and shipping a very thick Skill layer is a suicidal one</mark>.

And the scariest part? Hyrum's Law, from Google: with enough users of an API, every observable behavior (bug or typo, it does not matter) will eventually be depended on by somebody. That means the 0.0.1 CLI a platform puts out may well still have to be considered for backward compatibility after the server has iterated for a year. If you do not believe this, take a look at HTTP's Referer header, then look up how `referer` is actually supposed to be spelled.

## The Fix: Thin Client + Self-Describing Services

As I see it, the fix fundamentally looks like this. <mark data-color="green">The agent side, which is to say the client, maintains a module that is thin, semantics-free, and generic.</mark> All server-side schema descriptions, error codes, and method descriptions should be exposed as service self-description, something like "service reflection". The server also needs to be able to describe flows and supply additional knowledge. More importantly, all of these capabilities need to be designed for progressive loading, to avoid repeating the mistakes of early MCP.

Concretely, I see two ways to get there.

1. Today's MCP servers can provide capabilities dynamically, including signaling the client when the server changes. That takes care of schema drift between server and client. MCP now also supports Skill Extension as an experimental feature. Connecting to a platform and always treating the Skills hosted on that platform as the source of truth should gradually become the mainstream approach.
2. "Resurrect" hypermedia-driven (HATEOAS) APIs. The server not only describes itself through progressively loaded schemas, it also provides interface-level hints that tell the client what it can do next, and why. With this approach, the agent's client no longer needs to install skills or register an MCP server. It only needs to authorize the agent to make HTTP API calls directly, though the security implications still need careful thought.

## Closing Thoughts

If you do not believe me, ask your agent to take a look at the platform-facing skills and CLIs on your own machine. You will be surprised by how many there are, and by how badly their versions have drifted. Platforms that keep shipping this Skill and CLI combination are only planting more landmines in their own maintenance.
