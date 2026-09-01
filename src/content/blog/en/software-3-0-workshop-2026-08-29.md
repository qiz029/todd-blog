---
title: "2026-08-29 Workshop — Written Version"
description: "Automation is hard, but Software 3.0 and code-generating agents are changing its economics: every genuine niche need is now worth building and testing."
pubDate: 2026-08-29
heroImage: "https://toddzheng.net/media/01-manual-friction-4e9df1fe.png"
tags: ["ai", "automation", "software-3.0", "agents"]
draft: true
---

![Why are we still doing this manually?](https://toddzheng.net/media/01-manual-friction-4e9df1fe.png)

*Many opportunities for automation begin with a simple question: “Why are we still doing this manually?”*

We have all asked that question. Maybe we were copying the same information between several systems, updating the same spreadsheet every day, or relying on memory yet again to carry a process that the system should have handled. After complaining, we usually finish the task anyway. Skilled people can make a broken process look fast and dependable. Over time, diligence hides the friction, repetition becomes normal, and something that should have been changed turns into “just how work gets done.”

Automation is a refusal to accept that default answer. It is not a magic button, nor is it merely a few lines of code. It means reorganizing work that depends on patience, memory, and repetition into a system that can run reliably. To do that, we have to understand how the work actually happens: what triggers it, where the information comes from, which judgments are required, how exceptions are handled, who notices a mistake, who can stop the process, and who is ultimately accountable. Automation is hard. The first version will be clumsy, models will make mistakes, and workflows that once seemed clear will reveal more exceptions as soon as we try to implement them.

Even so, I hope we keep trying. Not because artificial intelligence has become all-powerful, but because we now have a lower-cost way to challenge problems we once had no choice but to tolerate. The work most worthy of our enthusiasm is not the easiest work. It is the thing we have complained about and abandoned many times, yet still believe should not depend forever on a person repeating it.

## Turn Complaints into a Way of Finding Problems

Larry Wall famously called laziness, impatience, and hubris the three virtues of a programmer. The words do not sound especially respectable, but they describe the beginning of automation surprisingly well. Laziness makes us resist repeating mechanical work. Impatience makes unreasonable delays intolerable. Hubris makes us believe a process can be changed—and that we should own the result after changing it. In their productive form, these traits become an eye for friction, the drive to automate, and the ownership required to keep the final outcome inside our own responsibility boundary.

Complaining alone, however, does not produce improvement. “This system is terrible” expresses frustration. “Yesterday morning, I spent forty minutes checking three systems to confirm the status of one order” begins to describe a solvable problem. The second statement contains a person, a time, an action, and a cost. From there, we can ask about the trigger, the sources of input, the decision rules, and the expected output. I call this a productive complaint: when a smoke detector goes off, do not argue with its tone—look for the smoke.

Many bad processes survive not because no one sees them, but because capable people protect them. The daily spreadsheet is always immaculate. The weekly copy-and-paste report never contains an error. The person who must search five systems for an answer has become so skilled that it takes only two minutes. That diligence deserves respect, but it can also prevent an organization from feeling the urgency to change. Someone is always there at the last moment to catch the error and close the gap. Automation is not a rejection of that effort. It is an attempt to redirect human effort from maintaining a bad process to changing it.

![Bad processes are protected by people who know how to repair them](https://toddzheng.net/media/02-bad-process-06f5a680.png)

*A bad process often looks most stable when someone has become highly skilled at compensating for its flaws.*

## Many Problems Had Value; They Just Were Not Worth Building For

Turning one small need into dependable software used to require far more than writing code. Someone had to understand the need, define the problem, choose an approach, design the workflow, and then test, deploy, monitor, and maintain the system. A working restaurant does more than cook one dish; it also needs purchasing, staffing, inventory, payments, hygiene, and management. Opening a restaurant because you want one bowl of noodles prepared exactly to your taste sounds absurd. Building an entire software production line for a workflow used by only a few people used to be equally uneconomical.

![Opening a restaurant for one bowl of noodles](https://toddzheng.net/media/03-noodle-restaurant-f28152dd.png)

*Building custom software for a niche need used to resemble opening an entire restaurant for one bowl of noodles.*

That is why standardized software has dominated for so long. Software companies collect requests from many people, search for the largest common denominator, and design one product that can serve as many customers as possible. This model created enormous value, but its tradeoff is familiar. Off-the-shelf software may satisfy 80 percent of your needs while bringing many features you never use. People must contort their work around the remaining 20 percent. Highly customized software has generally been affordable only to large organizations, because they must pay not only for development, but also for understanding, coordination, and long-term maintenance.

The important change brought by AI is not simply that code can be generated faster. It is that parts of the cost of understanding, prototyping, modifying, and executing are falling at the same time. Mature cloud services, open-source software, and shared infrastructure already provide identity, permissions, data, integrations, and observability. AI coding makes the application layer easier to adapt to a real workflow. A distance that once required an organizational chain to cross may now be covered by a small team—or even one person who understands both the problem and the tools. The problem has not suddenly become easy, but the boundary defining how small a problem can be and still deserve a solution is moving.

This does not mean every wish should become a software company that operates forever. It means every genuine niche need is worth implementing at least once so that it can be tested. In the past, a need had to prove that its market was large before it could receive development resources. Now it only needs to be important enough to a particular person or team to justify a low-cost experiment. We should stop inheriting the impossibilities of five years ago and calculate again: How often does this happen? What do delays and errors cost? What would it cost to build a small tool that fits the workflow? Problems once classified as “valuable, but not valuable enough to build for” should now return to the candidate list.

## Software 3.0 Changes the Economics of Problems

I often use the terms Software 1.0, 2.0, and 3.0 to describe this shift. Their differences are not only about which technologies they use. They are about how people tell computers what they want and what form the resulting software takes. Software 1.0 turns human-written rules into code. Software 2.0 turns human-provided examples into models. Software 3.0 begins to turn human intent directly into working software.

The core of Software 1.0 is that people write the rules. Engineers translate business logic, conditions, and operational procedures into code. The code is the blueprint: the expected inputs, the steps to perform, and the behavior under different conditions must all be specified in advance. This software can be deterministic, reliable, and traceable, but changing it requires another round of understanding, design, implementation, testing, and release. Because every change is expensive, software naturally searches for common needs and tries to serve as many people as possible with the same codebase.

![Software 1.0: people encode rules as a decision tree](https://toddzheng.net/media/04-software-10-30ca4f25.png)

*Software 1.0: people encode the rules, and the software follows paths defined in advance.*

SaaS represents the mature economics of Software 1.0. Product teams collect feedback from many customers, identify common needs, turn those needs into features, screens, and standard workflows, and spread development costs through sales at scale. A request that does not make the common roadmap must wait, be approximated through configuration or plugins, or be completed manually. Customers buy software that has already been designed. It may cover 80 percent of what they need, but they must change how they work to fit boundaries the product established in advance.

![Traditional SaaS is designed around common needs](https://toddzheng.net/media/07-saas-common-needs-d539b1b7.png)

*Traditional SaaS first identifies a sufficiently large common need, then fixes it into a standardized product.*

Software 2.0 changed part of what happens inside the program. Instead of hand-writing every rule for text recognition, image classification, or recommendations, we supply large amounts of data and let a neural network learn a probabilistic decision function. This allows software to handle complex inputs that could never be exhaustively enumerated. Product capabilities expand dramatically. From a user’s perspective, however, the form of the software remains largely unchanged. The model is usually an intelligent module inside a fixed application. The screens, workflows, permissions, and feature boundaries are still designed in advance by a product team, and the product is still delivered at scale around common needs.

![Software 2.0: models learn patterns from data](https://toddzheng.net/media/05-software-20-ad06e5d0.png)

*Software 2.0: people provide data, and neural networks learn complex patterns that people could not enumerate.*

Many products described as Software 3.0 today remain at this stage. They add a chat box, a content-generation button, or a smarter recommendation module to an existing SaaS product. The model becomes more capable, but the software shell remains the same. Users still enter a fixed product and express their needs through the menus, fields, and workflows that the product permits. That is useful, but it does not yet reach the most fundamental change introduced by Software 3.0.

The turning point of Software 3.0 is the agent’s ability to generate code. An agent can do more than produce text. It can understand a person’s goal, inspect existing systems and data, decompose the task, write code, call tools, run tests, and continue revising in response to feedback. Code is no longer only a fixed product written in advance and delivered to every customer. It becomes an intermediate artifact generated and maintained by an agent for a specific need. The user describes how the work should operate; the agent turns that intent into interfaces, workflows, integrations, and automation.

![Software 3.0: agents generate highly customized software from individual needs](https://toddzheng.net/media/06-software-30-agent-b43704a1.png)

*Software 3.0: code becomes an intermediate artifact that an agent generates and continuously modifies for a particular need.*

This customization is not the old SaaS idea of exposing a few more settings. Different teams can share the same general foundation while operating entirely different application layers. Customer support can follow its own classification, escalation, and review rules. A sales team can use its own way of evaluating opportunities. A small shop can generate a tool for a special workflow that occurs only three times a day. People no longer have to prove that their need is common before they are allowed to have a feature. Software can grow around each user and take the shape that best fits their work.

In this sense, the SaaS rule that “software is worth developing only after we find a sufficiently large common need” has reached its end as the sole default model of software production. This does not mean SaaS companies will disappear, nor does it mean every capability should be generated from scratch. Identity, permissions, payments, data, observability, compliance, and model services still require stable, shared infrastructure. They may become even more important. What is ending is the assumption that the application layer must serve a massive common denominator before it deserves to be built.

The more likely shape of the future is shared infrastructure beneath highly customized intelligent apps. Foundational capabilities continue to be standardized and delivered at scale, while agents quickly generate and continually modify the application layer around specific needs. Traditional SaaS tries to fit one hundred customers into one product. Software 3.0 can let one hundred customers share one dependable foundation while using one hundred different applications fitted to their own workflows. Scale does not disappear; it moves downward, from a uniform product to common infrastructure.

![Shared infrastructure with highly customized intelligent applications](https://toddzheng.net/media/08-agent-custom-app-fb0deced.png)

*Scale moves into shared infrastructure, while the application presented to each user can become highly customized.*

That is why any niche need is now worth building for. “Worth building” does not mean every need will become a large business, nor does it mean the first generated version belongs in production. It means implementation has become cheap enough to build something, test it with real examples, and then decide whether to continue. In the past, people had to prove the market was large before they could have software. Now they can have software first and use the results to discover how large the need really is. Software 3.0 is not merely a new development slogan. It changes who is entitled to software made for them.

Deterministic rules do not lose their value in this world. Permissions, money, state transitions, and irreversible actions should often remain under traditional logic. Models are useful for language, images, ambiguous context, and inputs too varied to enumerate. Agents can understand goals, organize steps, and generate the necessary code. Dependable Software 3.0 does not ask a model to control everything. It places rules, models, agents, and people where each works best, with clear boundaries for confirmation, monitoring, and recovery.

## An Example Too Small to Be Worth Building Before

I built a game called Stocker. Players return to different historical periods and trade through a market history that has already happened, without seeing the real company names or the actual year. To preserve the sense of discovery, in-game news cannot reveal the real companies or events, but it also cannot repeat a small set of fixed templates forever. What happens in the market each day, which changes deserve coverage, and whether an event should first appear as a rumor or as confirmed news all shape how players understand the situation.

If the content were produced entirely by hand, a developer would need to study the market data, decide what was newsworthy, and write large volumes of copy in different voices. Rule-based templates can cover a small number of scenarios, but players soon recognize them. Using real historical news would destroy the uncertainty that makes the game interesting. Maintaining a permanent content-production operation for a few games among friends would make no economic sense. The need had value, but its production cost exceeded the experience it could create. In the past, it was not worth building.

The current design does not appoint the model as editor in chief and ask it to invent everything. The game engine still decides what happens on each day, whether the event is a real shock or a rumor, which alias to use, and which information must never be revealed. The model only turns established facts into news written for the scene. If generation fails, the system falls back to a template, so the game room can continue. Put differently: humans run the assignment desk; the model writes the sentences.

| News generated during a Stocker game | The in-game agent chatroom |
|:---:|:---:|
| ![News generated during a Stocker game](https://toddzheng.net/media/09-stocker-generated-news-b27b6528.png) | ![The Stocker agent chatroom](https://toddzheng.net/media/10-stocker-agent-chatroom-aa6d23a3.png) |

*Stocker places generative capability inside an existing game engine. The model controls expression; the engine controls facts, rules, and failure recovery.*

What this example really demonstrates is not how intelligent the model is, but how the cost curve has changed. Previously, developers had to accumulate a large inventory of articles in advance. Now the game can generate content by day and by event, while retaining a fallback for failure. An experience too small to justify its own content pipeline becomes feasible because an intelligent module can be placed inside an existing system. This is where automation becomes most exciting: it can do more than replace existing work. It can make products and experiences possible that we simply could not afford before.

## The Hard Part of Automation Is Never Just the Model

Many teams imagine AI as an Easy Button: load documents, rules, and historical records, press once, and the system completes the work. Once we try to build it, we discover that the hardest questions have not disappeared. Which rules apply in this situation? What should happen when data is missing? Which source wins when two sources conflict? Which actions can be reversed? When must the system stop and ask a person? None of these questions can be solved automatically by writing a longer prompt.

We also need to distinguish two kinds of complexity. Some complexity belongs to the problem itself: the correctness of financial calculations, permission boundaries, safety risks, and the many exceptions found in reality. This essential complexity requires careful understanding, modeling, and tradeoffs. Other complexity comes from tools, processes, and organizations: repeated data entry, environment configuration, meaningless approvals, and moving information between systems. This accidental complexity should be simplified, removed, or automated first. AI can substantially reduce the second kind, but it cannot eliminate the first for us.

Model capability should not be decided by a leaderboard either. Speed, cost, context length, and benchmarks are useful references, but a dependable choice requires a small evaluation built from your own real tasks. Gather representative examples, define what a good result means before testing, and record where each model fails. One impressive demonstration is not a stable capability, and an aggregate ranking cannot substitute for results inside a specific workflow. Model selection is only one small part of automation engineering. Problem definition, data quality, workflow design, and failure handling are usually more important.

This is precisely why automation deserves both enthusiasm and patience. A failed first attempt does not necessarily mean the direction was wrong. It may have revealed a rule that no one had ever written down. A wrong model response may expose how deeply the original workflow depended on one person’s judgment. Making hidden work explicit is progress in itself. Automation should not hide a complex reality inside a black box. It should force us to understand that reality more honestly.

## Agents Can Execute, but They Cannot Be Accountable

As models complete increasingly substantial tasks, it is easy to confuse capability with responsibility. A model can generate, classify, summarize, plan, and—when authorized—call tools to perform actions. Responsibility still belongs to the people and organizations that deploy and use it. Society will not accept “the AI decided” as a final explanation, and users should not have to bear the consequences of how a system divides work internally. Capability can be delegated. Accountability does not simply disappear.

![Humans run the assignment desk; the model writes the sentences](https://toddzheng.net/media/11-engine-boundary-bf4eca6a.png)

*Deterministic systems control facts, permissions, and actions; models handle language and uncertain inputs.*

Every automation effort should therefore begin with a few plain questions. Who will notice when it is wrong? Can the error be corrected or reversed? Which step requires explicit human confirmation? Who has the authority to stop the system? Whose name appears on the final result? A system can receive greater authority when the work is low-risk, easy to inspect, and recoverable. Permissions should be more cautious when money, contracts, healthcare, safety, or irreversible actions are involved. Boundaries do not limit imagination; they make it possible for automation to enter the real world.

A practical approach is to expand authority gradually. At first, the system acts as an assistant: it organizes information while a person decides and acts. Once there is evidence, it becomes a copilot: it prepares recommendations or drafts for a person to approve. Only after the error types, monitoring methods, and recovery paths are well understood should it act automatically within a clearly defined scope. Do not begin by pursuing maximum autonomy. Find the value first, then let authority grow with the evidence.

## Start with Something That Actually Happened

When beginning an automation project, do not start with “I want to build an agent,” and do not begin with a list of tools you want to use. Return to the last time the work really occurred. Whenever what event happens, who spends how much time, where do they get the information, what judgment do they make, and what action do they complete? This sentence is deliberately ordinary, but it turns an abstract ambition into an observable workflow. If you cannot say when the problem last occurred, it may not yet be concrete enough to build for.

Next, clarify the output you need and the inputs you already have. Is the output a summary, a reply draft, a ranking, a reminder, or an action that changes the world? Do the inputs come from email, chat, orders, images, rules, or historical records? Which steps are deterministic transformations, and where is model judgment genuinely required? Which mistake would be most serious, and who will inspect it? As these questions become clearer, the technical design often becomes simpler.

The first experiment does not need to be a complete system. You might start with ten historical examples, manually give each input to a model, and have a person review every result. You can postpone some integrations and skip a finished interface. You can test whether the output is useful without pretending the workflow is already fully automated. A good experiment should produce enough evidence within a week to decide whether to continue, adjust, or stop. Its purpose is not to prove you were right. It is to reduce one important uncertainty at the lowest possible cost.

If you are a user of the workflow yourself, begin as user zero. Build for yourself, use the result, and record where your own judgment was wrong. Then ask a second person to try it so that your personal habits and hidden assumptions become visible. Only after more people use it should you decide whether a behavior represents a common need or an individual preference. Building for yourself is not the same as building in isolation, as long as you acknowledge that the first version is incomplete and let real use continually correct your understanding.

## Keep Doing the Difficult Work That Matters

AI does not make automation effortless. We still have to understand the workflow, confront exceptions, organize data, design boundaries, observe failures, and own the result. Sometimes a week of work proves only that the original idea was wrong. Sometimes a system saves five minutes a day instead of several hours. Sometimes the best conclusion is that a high-risk action should remain in human hands. None of these outcomes is failure. They mean we have finally stopped debating the problem in the abstract.

I hope we use AI often, because only sustained use gives us judgment of our own. I hope we complain more, because every “Why are we still doing this manually?” may be a smoke detector. And I hope we learn from many different fields, because automation is not only a technical problem. It also involves business, experience, communication, safety, and responsibility. Technical people can move one step closer to real problems, while nontechnical people can move one step closer to testable solutions. The wider the territory both groups can cover, the shorter the distance between a real need and a working system.

We do not need to understand everything before we start, and we do not need to pretend the first attempt will succeed. Choose something that happened recently and that you have tolerated for too long. Break it apart, run a small experiment, observe the result, and then take one more step. Automation is hard, but that is precisely why it is worth doing. The easy parts will eventually be solved. The work that still needs human enthusiasm, judgment, and courage is the work without a ready-made answer that is nevertheless worth changing.

In the past, many problems were not worthless; they simply could not justify an entire software production line. That boundary is moving. Let us not use AI only to finish yesterday’s work faster. Let us recover our enthusiasm, keep trying, and bravely turn the things people should not have to repeat forever into automation that genuinely works tomorrow.
