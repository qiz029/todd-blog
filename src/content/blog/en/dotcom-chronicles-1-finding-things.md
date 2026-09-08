---
title: "Dotcom Chronicles (1): The Web Began with a Problem of Finding Things"
description: "In 1989, turnover at CERN kept separating documents from the people who could explain them. Starting from that problem, Berners-Lee wrote a proposal, a browser, and the first website, and in 1991 sent the invitation out."
pubDate: 2026-09-08T00:56:59.371Z
updatedDate: 2026-09-08
tags: ["Internet History", "Dotcom", "History of Technology", "World Wide Web"]
series: dotcom-chronicles
seriesOrder: 2
---

In March 1989, Tim Berners-Lee wrote a proposal at CERN, the European Organization for Nuclear Research, titled "Information Management: A Proposal." CERN is an international laboratory for particle physics. Researchers from many countries run experiments there together, each using and maintaining some part of the equipment and software. People arrive and leave, projects start and merge, and the machines have gone through several generations. The problem the proposal set out to solve sounds small: in a place like this, how do you find a document, and once you have found it, how do you know what it has to do with other documents and other people? The answer he proposed later grew into the World Wide Web.[^proposal89]

![Diagram from the 1989 proposal](https://toddzheng.net/media/proposal-1989-mesh-diagram-7ca522e8.png)

*A diagram from the March 1989 proposal. At the center is "A Proposal 'Mesh'"; around it are ENQUIRE, hypertext, CERNDOC, VAX/NOTES, CERN's hierarchy of divisions and groups, and Tim Berners-Lee himself, the author of the document. W3C archive copy at its archived resolution, unmodified; [original page](https://www.w3.org/History/1989/proposal.html), © Tim Berners-Lee / CERN, 1989, reproduced under the [W3C Document License](https://www.w3.org/copyright/document-license-2023/).*

I read this proposal with a thread I have cared about for a long time. A great deal of human work, when you unfold it, is exchanging information, keeping records, and making judgments from records that already exist. A business deal needs the agreement written down. An engineering project needs drawings and notes on what was changed, so that the next person can take over and check the work. One person can work from memory. A group working across time and distance has to turn what is in their heads into records that other people can read. Will a decision made today still be findable next month? When someone leaves, will their successor know why things were arranged this way? Documents carry that responsibility.

Once what was on paper moves into computers, many operations get easier, but storing something is only the beginning. As material piles up, you still have to know where to look, whether what you found applies to the problem in front of you, and how it relates to other records. In a group it is harder still. You find a piece of code, but not the person who wrote it. A note mentions another system, and to understand that system you have to go and find someone again. A network can transfer a file to you, but it will not tell you which file to ask for. <mark>Today we click a link and go from a description straight to the related material. In 1989 nobody had built that action yet.</mark>

## The Files Stay, the People Leave

The CERN that Berners-Lee describes worked in ways far more tangled than its organization chart. People used equipment across groups, shared software, and traded knowledge. A newcomer was given a few names, learned who to ask, and slowly worked out what was going on around them. As long as the people who knew were still there, this worked well enough. But turnover was fast, and the technical details of past projects left with the people who left. <mark>The files were still on the shelf. The people who could explain them were gone.</mark>[^proposal89]

![UA6 computer room at CERN, 1983](https://toddzheng.net/media/cern-ua6-computer-room-1983-3ed4d2c1.jpg)

*The computer room of the UA6 experiment at CERN, April 1983. Terminals, paper records, and equipment share one room. The photograph is a reference for the working environment of the period; it is not Berners-Lee's office. Image: © CERN, [source and date](https://commons.wikimedia.org/wiki/File:UA6_computer_room.jpg), [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/), unmodified.*

If a project never changed once it was finished, a thick manual might be enough. Real work keeps going. Equipment gets modified, programs get replaced, collaborators change. The difficulty then goes beyond whether anyone bothered to write documentation. You need to know how one document relates to another, and when something changes, you need to follow those relationships to the people and systems affected.

Nearly ten years earlier, Berners-Lee had built a tool for exactly this need, called ENQUIRE. Its 1980 manual is concrete: facing any part of a system, a user should be able to find out what it belongs to, what it is made of, what it depends on, and what a change to it would affect. Programs, machines, documents, and people could all be nodes, and the lines between nodes carried meaning. The manual also drew a boundary. ENQUIRE helped the user find detailed documentation and worked alongside other documentation and retrieval systems; the documentation itself stayed where it was.[^enquire]

The idea is not hard to picture. When we try to understand unfamiliar work, we often draw a few circles on paper and connect them with arrows: this machine runs that program, that program belongs to this project, this project is that person's responsibility. ENQUIRE put relationships like these into a computer so that a person could follow them. It was not yet the Web that would later span different machines. <mark>But it left one piece of experience behind: the connections between pieces of information are themselves worth recording.</mark>

![Conceptual sketch of ENQUIRE relationships](https://toddzheng.net/media/enquire-relations-explainer-3dc6e8d7.png)

*A conceptual sketch of ENQUIRE relationships: from a machine to a program, from a program to a project and its documentation, with the link to a person kept as well. Drawn from [§2–4 of the 1980 manual](https://www.w3.org/History/1980/Enquire/manual/) and the example in the text; not the original interface. The faded person node shows that people may leave; it does not mean the system saved or updated these relationships on its own.*

## From One Note to the Next

The 1989 proposal pushed the problem one step further. CERN had several kinds of computers and information systems, and any new method had to reach the material that already existed and connect it gradually. Berners-Lee chose hypertext. A reference inside a document could become a doorway into another document, so the reader did not have to go back to a master index each time and guess which category the target belonged to, but could keep looking from within what they were already reading.[^proposal89]

![Client and server diagram from the 1989 proposal](https://toddzheng.net/media/proposal-1989-client-server-diagram-0d7bd161.png)

*Another diagram from the same 1989 proposal: browser programs run on many platforms and fetch material from hypertext servers, and information on one server can refer to information on another. Client and server were already separate here, and the 1990 proposal kept this architecture. W3C archive copy, unmodified; [original page](https://www.w3.org/History/1989/proposal.html), © Tim Berners-Lee / CERN, 1989, reproduced under the W3C Document License.*

In November 1990, the proposal Berners-Lee submitted jointly with Robert Cailliau was already using the name WorldWideWeb. It contains a homely example: you see a person's name in a piece of software documentation and want their email address, but you may have to switch to another computer, another interface, and learn another way of querying. A problem that is continuous to a person had been cut into pieces between machines.[^proposal90]

![The 1990 proposal example: one problem cut into pieces](https://toddzheng.net/media/1990-split-problem-explainer-692c153b.png)

*The example from the 1990 proposal: to get from a name in software documentation to that person's email address, you had to change computers, change interfaces, and learn another lookup method; the proposal imagined links joining those steps. Drawn from the Introduction of the [proposal of 12 November 1990](https://www.w3.org/Proposal.html); the two middle steps summarize the original text; not the original interface.*

Reading this today, you may think: isn't that just a link? This is exactly where today's experience has to be set aside for a moment. We are so used to it that we barely notice how many conventions it contains: how to say where the target is, how to ask a distant machine for the material, how to display it once it arrives. <mark>Making a set of notes that jump to each other on your own computer is one thing. Connecting material that lives in different systems is another.</mark>

The 1990 proposal placed browsers and servers at the two ends. The browser handled display and navigation for the reader; the server answered requests; old systems were attached through gateways that presented their material as accessible content. The proposal also limited its scope: it did not intend to finish converting every document format at CERN, and it did not make sound and video a focus of this phase.[^proposal90]

This arrangement left room for existing material. If a new tool only became useful after everyone had moved house, the first person to try it would have to bear almost the entire cost of moving. Letting the old material be reached was a different way to start. The team went further in its 1991 presentation conclusions: the Web merely provides access, does not disturb existing data management, and asks no extra work of information suppliers.[^conclusion] My guess is that this was on the optimistic side. Someone still had to understand the old system, write the gateway, organize the content, and handle the problems readers ran into. <mark>Clicking a link came later. The work required at the time was far more than that one gesture.</mark>

## The Good Machine, and Everyone Else's Machines

Berners-Lee wrote the first Web browser on a NeXT computer, and the program was also called WorldWideWeb. More precisely, it was a browser and editor in one: it could read, and it could also edit local documents and create links. When he later described the program, he made a point of NeXT's development tools; much of the interface and text-editing functionality was already there, so he could get the idea working fairly quickly. Both the convenience of the platform and the statement that the program was written in 1990 come from his recollection. That it was usable in 1991 can be confirmed from the presentations and release material of that year.[^browser][^available]

The same NeXT also ran the first Web server. The machine was called nxoc01.cern.ch and later renamed info.cern.ch; the first web page had the address `http://nxoc01.cern.ch/hypertext/WWW/TheProject.html`, and judging from the address, the page was about the project itself. By Christmas 1990 both the browser-editor and the line-mode browser could be demonstrated, and three kinds of things could be opened: hypertext files, the FIND index on CERN's mainframe, and network news. The first website went online at the end of 1990 in this form: one machine, a few pages describing itself. The 1990 text of that page has not survived; the restored version at info.cern.ch today carries content from 1992.[^history][^firstsite]

![The first Web server NeXTcube, displayed in 2005](https://toddzheng.net/media/first-web-server-nextcube-2005-1392a27d.jpg)

*That NeXTcube. A handwritten label on the case reads "This machine is a server. DO NOT POWER IT DOWN!!", and a copy of the March 1989 proposal rests on the keyboard. Photographed in August 2005 in CERN's Microcosm exhibition; this is a museum arrangement, not the office as it was in 1990. Photo: Coolcaesar, [source](https://commons.wikimedia.org/wiki/File:First_Web_Server.jpg), [CC BY-SA 3.0](https://creativecommons.org/licenses/by-sa/3.0/), unmodified.*

This gave the earliest Web a very direct, workaday character. Write a description, put a link on a word, then follow the link to read what is elsewhere; reading and organizing material happened in the same tool. The editing had its limits. This early program could browse remote material, but editing was confined to local files. It was not yet the kind of online document people later came to know, where you can log in from anywhere and edit together.[^browser]

![WorldWideWeb browser-editor screenshot, 1993](https://toddzheng.net/media/worldwideweb-next-screenshot-1993-a16ccecb.png)

*The WorldWideWeb browser-editor on NeXT, in a screenshot from 1993. Berners-Lee says it was taken when Communications of the ACM asked for an article; by then the program had been revised for two or three years, and this is not what it looked like in 1990. "Mark all" and "Link to marked" in the Links menu at top left are the link-making functions described in the text; the open windows show his home page, the WWW Virtual Library, and CERN's welcome page. W3C archive copy, unmodified; [source](https://www.w3.org/People/Berners-Lee/WorldWideWeb.html), © CERN / W3C, reproduced under the W3C Document License.*

And what could be done on a NeXT was not what everyone at CERN could do at their own terminal. On 17 May 1991, the team presented the Web to CERN's C5 committee and set two clients side by side: the NeXT editor, rich in features and limited in reach, and the line-mode browser, plain in appearance but able to run under Unix, VMS, and other environments without assuming what kind of terminal the user had. The line-mode browser was written by Nicola Pellow, then a student.[^c5][^available][^pellow]

Without a mouse, you could still read along links. The line-mode browser numbered them and let the reader choose the next one by number. The experience was not that of a graphical interface, but for people who had no NeXT, being able to open material and follow references was enough to give the project a chance of being tried. In the public announcement in August, Berners-Lee was still reminding readers that the NeXT client could read network news and the line-mode version could not yet.[^reply]

![Project home page in the line-mode browser simulator](https://toddzheng.net/media/line-mode-simulator-2013-render-91805586.png)

*The same project home page as seen in a line-mode browser: no mouse, and a number after every link. This is the simulator from CERN's 2013 restoration project (line-mode.cern.ch) displaying the 1992 archived page. It is not an original 1991 screen and is shown only to illustrate the interaction. Screenshot taken for this article.*

When we tell the history of an invention, it is easy to remember the person who built the first prototype and then jump to the product everyone uses. <mark>Between the two lies a great deal of work.</mark> Someone has to carry the same idea to another operating system, someone has to accept a version with fewer features, and someone has to tell users: it is not as pretty as the demo, but you can start using it now.

## Won't This Turn Into a Mess?

A record of questions and answers survives from that C5 presentation. Berners-Lee notes at the start that he wrote it from memory and had forgotten some of the questions and who asked them, so it cannot be read as a transcript. The questions that were preserved are still enough to show how far the project was, at that moment, from being taken for granted.[^questions]

Someone asked whether VM/CMS could get a line-mode client first. Someone worried that if anyone could make any link they liked, the whole thing would become a hopeless mess. And one question connects directly to the title of the earlier section: if a news article is deleted from the server, what happens to my reference to it? The files stay and the people leave was an old problem inside CERN. A file on a distant server, which the person who manages it may delete at any time, is in my view the same problem in a new form. The discussion turned from there to private copies and shared archives. Should you keep your own copy of something far away that you depend on? And if copies are kept everywhere, will the world fill up with stale ones? A working browser had appeared; these questions did not resolve themselves along with it.[^questions]

I like reading material like this. <mark>It takes us away from the ceremonies that commemorate an invention and back to the moment when a new tool was still trying to win users.</mark> The people in that meeting room had their own machines and material they already relied on. They had to judge whether putting their work into this new way of connecting things was a good idea.

The presentation's conclusions contain one more line: the team judged that the effort of producing good-quality data outweighs the effort of building the tools to access it. That judgment shows they had already seen the work beyond the tool. <mark>A browser can put a document in front of you. It cannot guarantee that the document is clearly written, or that anyone keeps maintaining it.</mark>[^conclusion]

## Sending the Invitation Out

On 6 August 1991, in the `alt.hypertext` newsgroup, someone asked whether there was any research on retrieving information from multiple heterogeneous sources. Berners-Lee replied with an introduction to WorldWideWeb. The reply included an address, `http://info.cern.ch/hypertext/WWW/TheProject.html`, and he wrote that if you were reading the post in the NeXT client, you could click on it and go straight in. That was the website on the NeXT, which by then had been running for more than half a year. He followed up with a project summary describing the existing software, explaining how to obtain it, and inviting people in other fields to take part. <mark>This moment, so often treated as a milestone, was at the time one answer in a technical discussion.</mark>[^reply]

![Archived project home page of 3 November 1992](https://toddzheng.net/media/first-website-19921103-render-bb904080.png)

*The address in that reply, a little over a year later: the version of 3 November 1992 preserved by W3C, rendered in a modern browser. The text is from the period; the font, colors, and underlines are today's browser defaults, not how it looked then. [Archived page](https://www.w3.org/History/19921103-hypertext/hypertext/WWW/TheProject.html), © CERN / W3C.*

The summary gave the download location for the source code of line-mode browser 0.9, listed the NeXT editor and a skeleton server, and called the release a very early prototype. It also explained to potential information providers how to attach existing material: write a few marked-up files pointing at what you already have, and any file on anonymous FTP can become a link target. Readers and providers drawing each other in was what the project hoped would happen. It had not happened yet.[^announcement]

The code could be obtained, and its legal status has to be read in the terms of the time. In the reply Berners-Lee wrote that the copyright belonged to CERN and that free distribution and use were not normally a problem. CERN's formal declaration two years later is a different moment. Where things stood in August 1991: people outside had a way to get the prototype, to try reading with it, and to try attaching their own material.[^reply]

![Timeline 1989 to 1991](https://toddzheng.net/media/1989-1991-timeline-explainer-107c1730.png)

*The points this article passes through. Dates are given to the month, and only three carry an exact day; the grey node belongs to the next article. Compiled from the W3C timeline and the SLAC chronology; not a contemporary chart.*

From the proposal of March 1989 to here, the original problem of finding things had received an answer that ran. But for people outside CERN, "it works" still needed a more concrete reason. Is there anything in there that I need? Who will install the software for us? When something goes wrong, who do we ask?

In September 1991, the physicist Paul Kunz finished a visit to CERN and returned to the Stanford Linear Accelerator Center (SLAC) in California. He had seen WorldWideWeb at CERN. And the SLAC library had a database of high-energy physics preprints that already had an international body of users.[^slac]

[^proposal89]: Tim Berners-Lee, ["Information Management: A Proposal"](https://www.w3.org/History/1989/proposal.html), March 1989; see in particular "Losing Information at CERN," "CERN Requirements," and "Accessing Existing Data." The archive's preface notes that the text was redistributed in 1990; this article distinguishes the original proposal from the later note.
[^enquire]: Tim Berners-Lee, [*The ENQUIRE System* manual](https://www.w3.org/History/1980/Enquire/manual/), October 1980, §1–4. The web page is a hand transcription of the original manual.
[^proposal90]: Tim Berners-Lee and Robert Cailliau, ["WorldWideWeb: Proposal for a HyperText Project"](https://www.w3.org/Proposal.html), 12 November 1990; see Introduction, Scope, and Architecture. Read here as a plan, not as a record of completed goals.
[^browser]: Tim Berners-Lee, ["The WorldWideWeb browser"](https://www.w3.org/People/Berners-Lee/WorldWideWeb.html), a later account. Used for the development environment, the editing capability, and its limits; not as evidence of contemporary adoption.
[^c5]: [Entry page for the C5 presentation of 17 May 1991](https://www.w3.org/Talks/C5_17_May_91.html).
[^available]: [The "available functions" page linked from the C5 presentation](https://www.w3.org/Talks/Available.html), contrasting the line-mode browser and the NeXT editor.
[^questions]: [Questions and answers from the C5 presentation](https://www.w3.org/Talks/C5_Questions.html). The author states that it was written from memory with omissions; the text summarizes the questions and does not reconstruct the exchange.
[^conclusion]: [Conclusion of the C5 presentation](https://www.w3.org/Talks/C5_conclusion.html), signed TBL, RC, NP. On w3.org this page and the "available functions" page both sit in the Talk_Feb-91 directory and may have been carried over from a February 1991 talk; cited here as the material linked from the C5 entry page.
[^announcement]: Tim Berners-Lee, ["WorldWideWeb: Summary"](https://www.w3.org/People/Berners-Lee/1991/08/art-6487.txt), 6 August 1991.
[^reply]: Tim Berners-Lee, [the earlier project introduction of the same day](https://www.w3.org/People/Berners-Lee/1991/08/art-6484.txt), 6 August 1991.
[^history]: W3C, ["A Little History of the World Wide Web"](https://www.w3.org/History.html). A timeline maintained by W3C, partly compiled after the fact; used here for the first server and page address in November 1990, what could be demonstrated at Christmas 1990, and the SLAC server entry of 12 December 1991.
[^firstsite]: [info.cern.ch](https://info.cern.ch/) describes itself as "home of the first website" and offers a restored page; the restored page refers to project news from November 1992 and is not the 1990 original.
[^slac]: SLAC Archives, History and Records Office, ["Early Web Chronology and Documents 1991–1994"](https://ahro.slac.stanford.edu/wwwslac-exhibit/early-web-chronology-and-documents-1991-1994). An institutional chronology written after the fact; used here only for Kunz's return from CERN to SLAC in September 1991 and for the existing international user base of the SPIRES database. The launch of the server is left for the next article.
[^pellow]: Tim Berners-Lee, ["The World Wide Web: A very short personal history"](https://www.w3.org/People/Berners-Lee/ShortHistory.html), 7 May 1998; the text says the line-mode browser was written by the student Nicola Pellow and could run on almost any computer. A later recollection, used only for attribution.
