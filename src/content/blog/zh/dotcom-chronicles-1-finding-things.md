---
title: "Dotcom编年史 (一)：万维网从一个找资料的问题开始"
description: "1989 年，CERN 的人员流动让资料和能解释资料的人分开。Berners-Lee 从这个找资料的问题出发，写出提案、浏览器和第一个网站，并在 1991 年把邀请发到了外面。"
pubDate: 2026-09-08T00:56:59.371Z
updatedDate: 2026-09-08
tags: ["互联网历史", "Dotcom", "科技史", "万维网"]
series: dotcom-chronicles
seriesOrder: 2
---

1989 年 3 月，Tim Berners-Lee 在欧洲核子研究中心（CERN）写了一份提案，题目叫《信息管理：一个提案》。CERN 是研究粒子物理的国际机构，来自不同国家的研究人员在这里合作做实验，各自使用和维护一部分设备与软件。人来了又走，项目开了又并，机器换了几代。提案要解决的事情说起来很小：在这样一个地方，怎样找到一份资料，找到之后，又怎样知道它和别的资料、别的人有什么关系。这个办法后来发展成了万维网。[^proposal89]

![1989 年提案中的关系示意图](https://toddzheng.net/media/proposal-1989-mesh-diagram-7ca522e8.png)

*1989 年 3 月提案里的示意图。中间是 “A Proposal ‘Mesh’”，四周连着 ENQUIRE、超文本、CERNDOC、VAX/NOTES、CERN 的部门与小组层级，还有写下这份文件的 Tim Berners-Lee 本人。W3C 存档件，分辨率即存档原件，未作修改；[原始页面](https://www.w3.org/History/1989/proposal.html)，© Tim Berners-Lee／CERN，1989，按 [W3C 文档许可](https://www.w3.org/copyright/document-license-2023/)转载。*

我读这份提案时，带着一条自己长期关心的线索。人类的许多工作，展开来看，是在交换信息、保存记录，再根据已有的记录作判断。做一笔生意要记下约定，做一项工程要留下图纸和修改说明，好让后来的人能接手，能检验。一个人可以凭记忆做事，一群人要跨越时间和地点一起做事，就得把脑子里的东西变成别人能读的记录。今天作出的决定，下个月还能不能查到？一个人离开以后，接替他的人能不能知道事情为什么这样安排？文档承担着这种责任。

纸上的内容搬进电脑以后，许多操作方便了，但存下来只是开始。资料越积越多，你仍然要知道该去哪里找，找到的东西是否适用于眼前的问题，它和其他记录又有什么关系。到了多人合作的环境里更难。一段程序找到了，写它的人不知道在哪里；一份说明提到了另一套系统，要弄清那套系统，又得重新找人。网络可以把文件传过来，却不会告诉你该找哪一份。<mark>我们今天点一下链接就从说明走到相关资料，这个动作在 1989 年还没有人做出来。</mark>

## 文件在，人走了

Berners-Lee 描述的 CERN，实际协作方式比组织架构图复杂得多。人们跨组使用设备、共享软件、交换知识。新来的人先得到几个名字，知道可以去问谁，再慢慢摸清周围的工作。只要熟悉情况的人还在，这种办法运行得不错。但人员流动很快，过去项目里的技术细节会随着离开的人一起消失。<mark>文件还在架子上，能解释这些文件的人已经不在了。</mark>[^proposal89]

![1983 年 CERN UA6 实验机房](https://toddzheng.net/media/cern-ua6-computer-room-1983-3ed4d2c1.jpg)

*1983 年 4 月，CERN 的 UA6 实验机房。终端、纸面记录与设备共处一室，为这一节提供当时工作环境的参照；这不是 Berners-Lee 的办公室。图片：© CERN，[来源与年代](https://commons.wikimedia.org/wiki/File:UA6_computer_room.jpg)，[CC BY 4.0](https://creativecommons.org/licenses/by/4.0/)，未作修改。*

如果一项工程做完以后不再变化，把它写成一本厚手册也许就够了。可真实工作总会继续。设备要改，程序要换，合作的人会变。困难于是超出了“有没有人认真写文档”：你需要知道一份资料和另一份资料之间的关系，还要在事情变化以后，沿着那些关系找到受影响的人和系统。

近十年前，Berners-Lee 已经为这种需要做过一个工具，叫 ENQUIRE。它的 1980 年手册写得很具体：面对系统的某个部分，使用者应该能查到它属于什么、由什么组成、依赖什么，改动它会牵涉哪里。程序、机器、文档乃至人，都可以作为节点，节点之间的连线带有含义。手册也划出了边界。它帮助使用者寻找详细说明，与其他文档和检索系统一起工作，那些说明本身仍然留在原来的地方。[^enquire]

这个想法不难想象。我们理解一项陌生工作时，常在纸上画几个圈，再用箭头连起来：这台机器运行那段程序，那段程序属于这个项目，项目由那个人负责。ENQUIRE 把这样的关系放进计算机，让人能沿着它们查下去。它还不是后来跨越不同机器的 Web。<mark>但它留下了一段经验：信息之间的联系本身值得记录。</mark>

![ENQUIRE 关系概念示意](https://toddzheng.net/media/enquire-relations-explainer-3dc6e8d7.png)

*ENQUIRE 关系概念示意：从机器找到程序，从程序找到项目和相关说明，也保留与人员的联系。依据 [1980 年手册 §2–4](https://www.w3.org/History/1980/Enquire/manual/) 与正文示例绘制，非原始界面；淡色人物节点用于说明人员可能离开，并不表示系统会自动保存或更新这些关系。*

## 从一条说明，走到另一条说明

1989 年的提案把问题推进了一步。CERN 有好几种计算机和信息系统，新办法必须能接近已经存在的资料，让它们逐渐连在一起。Berners-Lee 选了超文本：文档里的引用可以成为通往另一份文档的入口，读者不必每次退回总目录再猜目标属于哪个类别，可以沿着正在读的内容继续找。[^proposal89]

![1989 年提案中的客户端与服务器示意图](https://toddzheng.net/media/proposal-1989-client-server-diagram-0d7bd161.png)

*同一份 1989 年提案里的另一张图：浏览器程序跑在多种平台上，向超文本服务器取资料，一台服务器上的信息又可以指向另一台。客户端与服务器在这时已经分开，1990 年方案沿用了这个架构。W3C 存档件，未作修改；[原始页面](https://www.w3.org/History/1989/proposal.html)，© Tim Berners-Lee／CERN，1989，按 W3C 文档许可转载。*

1990 年 11 月，Berners-Lee 与 Robert Cailliau 联名提交的方案已经用上 WorldWideWeb 这个名字。文中有个朴素的例子：你在一份软件说明里看到一个人的名字，想找他的电子邮件地址，却可能要换一台电脑、换一种界面、再学一套查询办法。在人看来连续的一个问题，在机器之间被切成了几段。[^proposal90]

![1990 年方案例子示意：一个问题被切成几段](https://toddzheng.net/media/1990-split-problem-explainer-692c153b.png)

*1990 年方案里的例子示意：在软件说明里看到一个名字，要找到他的邮件地址，当时得换电脑、换界面、再学一套查法；方案设想用链接把这几步接起来。依据 [1990 年 11 月 12 日方案](https://www.w3.org/Proposal.html) Introduction 绘制，中间两步是对原文的概括，非原始界面。*

今天读到这里，可能会觉得，这不就是链接吗？但这正是需要暂时放下今天经验的地方。我们太习惯它了，很难察觉其中包含多少约定：怎样指出目标在哪里，怎样向远处的机器请求资料，拿到以后又怎样显示。<mark>在自己的电脑上做一套能互相跳转的笔记是一回事，让不同系统里的资料彼此连接是另一回事。</mark>

1990 年方案把浏览器与服务器作为两端。浏览器负责读者眼前的显示和操作，服务器回应请求，旧系统通过接口接入，把资料呈现为可访问的内容。方案同时限定了范围：不打算把 CERN 所有文档格式的转换都做完，也不把声音和视频作为这一阶段的重点。[^proposal90]

这样的安排给已有资料留了位置。假如一个新工具要等所有人搬家以后才有用，第一个尝试的人就得先承担几乎全部搬家的成本。让原来的资料能被访问，是另一种起步方式。团队在 1991 年的演示结论里说得更进一步：Web 只提供访问，不打扰原有的数据管理，资料供应方不必额外做事。[^conclusion] 我猜这话说得偏乐观了。总要有人理解旧系统，写接口，整理内容，处理读者遇到的问题。<mark>点一下链接是后来的事，当时要做的工作远比这个动作多。</mark>

## 好用的机器，和更多人的机器

Berners-Lee 在一台 NeXT 计算机上写出了最早的 Web 浏览器，名字也叫 WorldWideWeb。更准确地说，它是浏览器兼编辑器，既能阅读，也能编辑本地文档、建立链接。他后来介绍这个程序时特别提到 NeXT 的开发工具：许多界面和文字编辑功能已有现成基础，他能较快地把想法做出来。这些开发便利，以及程序写成于 1990 年的说法，都来自他的回忆。程序在 1991 年已经可用，则有当年的演示与发布资料可以确认。[^browser][^available]

同一台 NeXT 上还跑着第一台 Web 服务器。机器名叫 nxoc01.cern.ch，后来改成 info.cern.ch；第一个网页的地址是 `http://nxoc01.cern.ch/hypertext/WWW/TheProject.html`，从地址看，这一页讲的是项目本身。到 1990 年圣诞节，浏览器兼编辑器和行模式浏览器都已经能演示，能打开的东西有三类：超文本文件、CERN 大型机上的 FIND 索引，以及网络新闻。第一个网站就这样在 1990 年底上线了：一台机器，几页讲自己的说明。那一页 1990 年的原文没有保存下来，今天 info.cern.ch 上复原的版本带着 1992 年的内容。[^history][^firstsite]

![第一台 Web 服务器 NeXTcube，2005 年展陈](https://toddzheng.net/media/first-web-server-nextcube-2005-1392a27d.jpg)

*那台 NeXTcube。机箱上贴着手写标签 “This machine is a server. DO NOT POWER IT DOWN!!”，键盘上放着 1989 年 3 月提案的复印件。2005 年 8 月摄于 CERN 的 Microcosm 展厅，是展陈状态，不是 1990 年的办公室现场。摄影：Coolcaesar，[来源](https://commons.wikimedia.org/wiki/File:First_Web_Server.jpg)，[CC BY-SA 3.0](https://creativecommons.org/licenses/by-sa/3.0/)，未作修改。*

这让最初的 Web 带着很直接的工作意味。写一段说明，给某个词加上链接，然后沿着链接去看别处的内容，阅读和组织资料发生在同一个工具里。编辑能力也有边界。这个早期程序可以浏览远程资料，编辑只限本地文件，还不是后来那种随处登录、多人协作修改的在线文档。[^browser]

![WorldWideWeb 浏览器兼编辑器 1993 年截图](https://toddzheng.net/media/worldwideweb-next-screenshot-1993-a16ccecb.png)

*NeXT 上的 WorldWideWeb 浏览器兼编辑器，1993 年的截图。Berners-Lee 说这是《Communications of the ACM》来约稿时截的，程序此时已经改了两三年，不是 1990 年的画面。左上角 Links 菜单里的 “Mark all”“Link to marked”，就是正文说的建链功能；窗口里开着他的个人主页、WWW Virtual Library 和 CERN 的欢迎页。W3C 存档件，未作修改；[出处](https://www.w3.org/People/Berners-Lee/WorldWideWeb.html)，© CERN／W3C，按 W3C 文档许可转载。*

而且，NeXT 上能做到的事，不等于 CERN 每个人都能在自己的终端上做到。1991 年 5 月 17 日，团队向 CERN 的 C5 委员会介绍 Web，把两种客户端摆在一起：NeXT 编辑器功能丰富，覆盖面有限；行模式浏览器界面朴素，却能跑在 Unix、VMS 等环境里，不预设使用者有哪种终端。行模式浏览器的作者是当时还是学生的 Nicola Pellow。[^c5][^available][^pellow]

没有鼠标，也可以沿着链接读。行模式浏览器用编号让读者选择下一处内容。体验与图形界面不同，但手头没有 NeXT 的人能打开资料、顺着引用往下读，这个项目就有了试用的可能。到 8 月的公开介绍里，Berners-Lee 仍提醒读者：NeXT 客户端能读网络新闻，行模式版本还没加上这项功能。[^reply]

![行模式浏览器模拟器显示的项目首页](https://toddzheng.net/media/line-mode-simulator-2013-render-91805586.png)

*同一个项目首页在行模式浏览器里的样子：没有鼠标，每个链接后面跟着一个编号。这是 CERN 2013 年复原项目的模拟器（line-mode.cern.ch）在显示 1992 年的存档页，不是 1991 年的原始画面，只用来示意交互方式。截图为本文自摄。*

我们讲发明史时，容易记住第一个做出原型的人，然后跳到产品普及。<mark>两者之间隔着许多工作。</mark>同一个想法要有人带到另一种操作系统上，功能有限的版本要有人愿意接受，还要有人向使用者解释：虽然没有演示时那么漂亮，你现在就可以开始用。

## 这样不会乱吗？

那次 C5 演示之后留下了一份问答记录。Berners-Lee 在开头说明，这是凭记忆整理的，有些问题和提问者已经记不清，所以不能把它当作逐字稿。保存下来的疑问，仍然足以让人感到这个项目当时离“理所当然”有多远。[^questions]

有人问 VM/CMS 能不能先有一个行模式客户端。有人担心，每个人都可以随意建链接，整个系统会不会乱成一团。还有一个问题直接连着上一节的标题：一篇新闻组文章一旦从服务器上删除，我的引用怎么办？文件在，人走了，是 CERN 内部的老问题；文件在远处的服务器上，管它的人随时可能删掉，在我看来是同一个问题换了形态。讨论由此转向私人副本与共同存档。来自远处、自己又依赖的资料要不要留一份在手里？到处保存副本，又会不会留下大量过时内容？一个可运行的浏览器出现了，这些问题并没有跟着解决。[^questions]

我很喜欢读这种材料。<mark>它让我们暂时离开纪念发明的场合，回到一个新工具正在争取使用者的时刻。</mark>坐在那间会议室里的人有自己的机器，有已经依赖的资料，他们要判断，把手头的工作放进这种新的连接方式里，是不是一个好主意。

演示结论里还有一句话：团队认为，制作高质量资料所需的努力，超过了制作访问这些资料的工具。这个判断说明他们已经看到工具之外的工作。<mark>浏览器能把一份文档送到眼前，不能保证文档写得清楚，也不能保证有人持续维护。</mark>[^conclusion]

## 把邀请发到外面

1991 年 8 月 6 日，在讨论超文本的 `alt.hypertext` 新闻组里，有人询问是否存在能从不同信息来源取回资料的研究。Berners-Lee 回帖介绍了 WorldWideWeb。回帖里附了一个地址，`http://info.cern.ch/hypertext/WWW/TheProject.html`，他说如果你正用 NeXT 客户端读这封帖子，点一下就能进来。那就是那台 NeXT 上的网站，此时已经跑了半年多。随后他又发出一份项目摘要，说明已有的软件，给出获取办法，邀请其他领域的人参与。<mark>这个后来常被当作历史节点的时刻，当时是一场技术讨论里的一个回答。</mark>[^reply]

![1992 年 11 月 3 日的项目首页存档](https://toddzheng.net/media/first-website-19921103-render-bb904080.png)

*回帖里那个地址，一年多以后的样子：W3C 保存的 1992 年 11 月 3 日版本，用今天的浏览器渲染。文字是当时的；字体、颜色和下划线是现代浏览器的默认样式，不是当时的显示效果。[存档页](https://www.w3.org/History/19921103-hypertext/hypertext/WWW/TheProject.html)，© CERN／W3C。*

摘要给出了行模式浏览器 0.9 的源代码下载位置，列出 NeXT 编辑器和服务器骨架，版本被称为很早期的原型。它也向潜在的信息提供者解释怎样把已有资料接进来：写少量带标记的文件指向现有内容，匿名 FTP 上的文件也可以成为链接目标。读者和资料提供者相互吸引，是项目希望发生的事，还不是已经发生的事。[^announcement]

代码可以取得了，权利状态要按当时的说法理解。Berners-Lee 在回帖中写明版权属于 CERN，通常可以免费分发和使用。两年后 CERN 作出的正式权利声明是另一个时点。1991 年 8 月的情况是：外面的人已经有办法拿到原型，试着读，也试着接上自己的资料。[^reply]

![1989 至 1991 年时间线](https://toddzheng.net/media/1989-1991-timeline-explainer-107c1730.png)

*本篇经过的节点。时间取到月，只有三处留下确切日期；灰色节点属于下一篇。依据 W3C 年表与 SLAC 年表整理，非同期图表。*

从 1989 年 3 月的提案走到这里，最初那个找资料的问题有了一个可以运行的回答。可是对 CERN 之外的人来说，“可以用”还需要更具体的理由。里面有什么我需要的东西？谁替我们装软件？出了问题找谁？

1991 年 9 月，物理学家 Paul Kunz 结束在 CERN 的访问，回到加州的斯坦福直线加速器中心（SLAC）。他在 CERN 看到了 WorldWideWeb。而 SLAC 图书馆手里，有一个已经有一批国际用户的高能物理预印本数据库。[^slac]

[^proposal89]: Tim Berners-Lee，[《Information Management: A Proposal》](https://www.w3.org/History/1989/proposal.html)，1989 年 3 月；重点见 “Losing Information at CERN”“CERN Requirements” 及 “Accessing Existing Data”。存档导言说明文本于 1990 年重新分发；本文区分原提案与后加说明。
[^enquire]: Tim Berners-Lee，[《The ENQUIRE System》手册](https://www.w3.org/History/1980/Enquire/manual/)，1980 年 10 月，§1–4。网页是原手册的人工转录。
[^proposal90]: Tim Berners-Lee、Robert Cailliau，[《WorldWideWeb: Proposal for a HyperText Project》](https://www.w3.org/Proposal.html)，1990 年 11 月 12 日；见 Introduction、Scope、Architecture。此处按计划文件解读，不将全部目标视为已完成。
[^browser]: Tim Berners-Lee，[《The WorldWideWeb browser》](https://www.w3.org/People/Berners-Lee/WorldWideWeb.html)，事后介绍。用于开发环境、编辑能力与限制，不作为同期采用规模的证据。
[^c5]: [1991 年 5 月 17 日 C5 演示入口](https://www.w3.org/Talks/C5_17_May_91.html)。
[^available]: [C5 演示所链接的可用功能页](https://www.w3.org/Talks/Available.html)，对照行模式浏览器与 NeXT 编辑器。
[^questions]: [C5 演示问答记录](https://www.w3.org/Talks/C5_Questions.html)。作者明确说明凭记忆整理且有遗漏；正文仅概述问题，不还原对话。
[^conclusion]: [C5 演示结论](https://www.w3.org/Talks/C5_conclusion.html)，署名 TBL、RC、NP。该页与可用功能页在 w3.org 上均存放于 Talk_Feb-91 目录，可能沿用自 1991 年 2 月的讲稿；本文按 C5 演示入口所链接的材料引用。
[^announcement]: Tim Berners-Lee，[《WorldWideWeb: Summary》](https://www.w3.org/People/Berners-Lee/1991/08/art-6487.txt)，1991 年 8 月 6 日。
[^reply]: Tim Berners-Lee，[同日较早的项目介绍回复](https://www.w3.org/People/Berners-Lee/1991/08/art-6484.txt)，1991 年 8 月 6 日。
[^history]: W3C，[《A Little History of the World Wide Web》](https://www.w3.org/History.html)。W3C 维护的年表，部分条目为事后整理；此处用 1990 年 11 月首个服务器与网页地址、1990 年圣诞节的可演示范围，以及 1991 年 12 月 12 日 SLAC 服务器一条。
[^firstsite]: [info.cern.ch](https://info.cern.ch/) 自称 “home of the first website” 并提供复原页面；复原页引用 1992 年 11 月的项目新闻，不是 1990 年的原页。
[^slac]: SLAC Archives, History and Records Office，[《Early Web Chronology and Documents 1991–1994》](https://ahro.slac.stanford.edu/wwwslac-exhibit/early-web-chronology-and-documents-1991-1994)。机构事后年表；此处只用 Kunz 1991 年 9 月自 CERN 返回 SLAC，以及 SPIRES 数据库已有国际用户两点，服务器上线过程留待下一篇。
[^pellow]: Tim Berners-Lee，[《The World Wide Web: A very short personal history》](https://www.w3.org/People/Berners-Lee/ShortHistory.html)，1998 年 5 月 7 日；原文称行模式浏览器由学生 Nicola Pellow 编写，几乎可在任何计算机上运行。事后回忆，仅用于作者归属。
