---
title: "Dotcom编年史 (二)：只盼它能在 SLAC 活下来"
description: "1991 年 12 月，一台免费送来的 Web 服务器在 SLAC 图书馆的账号上跑起来。跟着 Louise Addis 的收件箱走三个半月，看引进它的人走后，谁接着管，它怎样活下来。"
pubDate: 2026-09-09T04:39:18Z
updatedDate: 2026-09-09
tags: ["互联网历史", "Dotcom", "科技史", "万维网"]
series: dotcom-chronicles
seriesOrder: 3
---

1991 年 12 月 11 日早上，斯坦福直线加速器中心（SLAC）的物理学家 Paul Kunz 给图书馆的 Louise Addis 写了一封信。他三个月前刚从欧洲核子研究中心（CERN）访问回来，在那里见到了 Tim Berners-Lee 和 WorldWideWeb，回来以后一直在试着把图书馆的文献数据库 SPIRES 接到这个新东西上。信里说，他把进展告诉了 CERN 那几位 Web 的作者，对方很兴奋，下周要去圣安东尼奥开 HyperText '91 会议，想在演示里直接用 SLAC 的这个接口。“我回信说他们这是在冒险。不过我们也许可以配合一下。”他接着问，准备运行守护进程的那台独立虚拟机，它的专用账号在哪里，能不能让计算部门加急办一下。守护进程是常驻后台等请求的程序；在 SLAC 的 IBM 大型机上，一个账号就是一台独立的虚拟机。[^notebook]

Addis 的回信发出时间是 12 日凌晨零点四十二分。“你敢我就敢，试试吧。”账号用 SPICELL，那是她早先申请的一个旧账号，本来是给外部用户做隔离环境的，“用在这上面倒也合适”。当天傍晚，Kunz 报告守护进程已经在 SPICELL 上跑起来，建议把它加进自动登录的服务机清单，“至少能撑过 Berners-Lee 在圣安东尼奥的演示”。信的最后一句是：“Louise，接下来就看你的了，找人来做后面的改进吧。我要回去干我的正事了。”13 日凌晨一点多，Addis 回了一行：“太好了，我这就去设法让 George 感兴趣。”她说的 George 是 George Crane，这年 2 月起负责 SPIRES 的检索接口。SLAC 档案年表记作欧洲之外第一台 Web 服务器上线的那个 12 月 12 日，是这样定下来的。[^notebook][^chronology]

圣安东尼奥那边，Berners-Lee 和 Cailliau 投给会议的论文没有被接受为正式报告，只得到海报和演示的位置。那是超文本研究者自己的会，论文集里收了一篇分析 Xanadu 版权模型的文章，评审委员会里有人不放心会断的链接。<mark>SLAC 这台服务器撑的，就是那场演示。</mark>[^ht91]

![www92.notebook 的头两封信](https://toddzheng.net/media/www92-notebook-first-mails-excerpt-ea444192.png)

*这两封信在 Addis 保存的邮件日志里的样子。文字取自 [Wayback Machine 2001 年 12 月 17 日抓取的 www92.notebook](http://web.archive.org/web/20011217182813/http://www.slac.stanford.edu:80/~addis/history.docs/www92.notebook)，以等宽字体重新渲染，省去三行空的邮件头，拼写与分隔线照旧，两处底色为本文所加；不是 1991 年终端上的显示效果。邮件作者为 Paul Kunz 与 Louise Addis，此处作史料节选引用。*

我原打算写 Web 怎样传到美国，去找当年的演示和宣传材料。读完 Addis 保存的这本邮件日志，我改了主意。日志是她的收件箱，从 1991 年 12 月 11 日收到 1992 年 3 月 25 日，三个半月的信和几份纪要，记的是一个免费送来的工具怎样在一个实验室里活下来。<mark>Kunz 第二天就回去干正事了，信里的事从此都落在 Addis 这边。</mark>

![Paul Kunz 与 NeXT，1998 年](https://toddzheng.net/media/paul-kunz-next-1998-a0060aec.jpg)

*Paul Kunz 与曾用于在 SLAC 演示早期 Web 浏览器的 NeXT，1998 年 9 月摄于 SLAC。这是七年后的照片，不是 1991 年归来时的现场。图片：© SLAC National Accelerator Laboratory，[档案来源](https://ahro.slac.stanford.edu/wwwslac-exhibit)，未改动；当前为本地草稿选图，公开转载许可待确认。*

## 图书馆手里的东西

高能物理的研究者需要及时知道同行写了什么，而正式期刊的出版要等很久，论文在发表前流通的版本，叫预印本。SLAC 图书馆的 SPIRES-HEP 收这类文献，也收已经发表的期刊论文、报告和会议论文，由 SLAC 和德国电子同步加速器研究所 DESY 两家图书馆合办。1992 年版的《粒子性质综述》介绍它时说，到 1992 年 1 月已有超过二十三万九千条记录，每年新增近两万条，除了书目字段，还按引用关系和主题做了索引。没有 SLAC 账号的人也能查，办法叫 QSPIRES。BITNET 是比互联网更早把各大学大型机连起来的学术网络，在它上面把检索语句当作一条消息发给 SLAC 的机器，结果显示在自己屏幕上；或者写一封只有一行的电子邮件，结果以邮件发回。手册里的例子是查 1991 年题目含 TOP 的论文，条件要写成数据库能理解的语句，再指定输出格式。今天在浏览器里查一篇论文，打几个词就有结果，中间那台机器怎么理解你，不用知道；1991 年查 SPIRES，这两件事都得自己做。[^pdg]

![1992 年 PDG 手册的 QSPIRES 一节](https://toddzheng.net/media/pdg1992-qspires-page-excerpt-4e6ce82b.png)

*1992 年版《粒子性质综述》前置部分对 QSPIRES 用法的说明，第 A.1 节。左栏是 BITNET 上的交互查询，右栏是同页下方的邮件查询，每封只能写一行。裁自 [Physical Review D 第 45 卷 PDF](https://pdg.lbl.gov/rpp-archive/files/PhysRevD.45.S1.pdf)第 13 页右栏，两段之间略去 WHOIS／WHEREIS 快捷查询与查 CONF 数据库的例子，字迹为原扫描，未重排。© American Physical Society／Particle Data Group，此处作史料节选引用。该节末尾注明 1992 年 4 月修订，它说明的是这个时点的用法。*

Addis 从 1962 年图书馆还开在斯坦福校园一间仓库里的时候就在这里工作，1969 年前后开始做这个数据库。她在 2000 年的访谈里回忆，研究者原先通过 BITNET 的交互消息查 SPIRES，改走 Internet 以后，交互消息用不上了，只剩邮件，使用者不满意，他们更喜欢马上得到回应。不过她说，真正的起因是另一件事。1989 到 1990 年，她在帮德州的超导超级对撞机（SSC）项目建图书馆，那边的馆员想把 SPIRES-HEP 嵌进一个图形界面里，SSC 已经出钱在开发一套 X-Windows 界面，就是 Unix 工作站上的图形窗口。“我还记得 Paul Kunz 从 CERN 回来出现在我办公室的那天。他给我演示了 Web，我们马上就动起来了。”<mark>她看到的是一个又快又省的替代办法。</mark>用今天的话说，SSC 在给一个数据库专门写客户端，Kunz 演示的是把数据库接到一个什么都能显示的通用浏览器上。[^addis]

我觉得这能解释，为什么欧洲之外的第一台服务器，接的是一个图书馆的数据库。<mark>给一个新浏览器写介绍页，可以让别人知道它存在；把别人本来就要查的数据库接进来，才有机会让人反复打开它。</mark>图书馆不用向物理学家解释他们为什么要查论文，手里又正好有一个等着答案的界面问题，而且这个问题已经有人在花钱用更贵的办法解决。

## “连真的 3278 终端都比不上”

12 月 13 日下午，Berners-Lee 在邮件列表里宣布 SPIRES 的实验性 Web 服务上线。他感谢 Paul Kunz、Louise Addis，和跟 Kunz 一起在大型机上架服务器的 Terry Hung，提醒试用者不要期待它已经完善。使用办法很短：打开行模式浏览器，第一篇里那个只认字符、什么终端都能跑的浏览器，从 CERN 的首页沿链接进入，再输入 `K FIND AUTHOR KUNZ`，查作者为 Kunz 的记录。`FIND` 眼下还省不掉，以后也许会改。公告末尾转引了 Kunz 几天前的来信：Addis “高兴坏了”，会去申请一台长期运行的 VM 服务机，也就是大型机上专门跑服务的一个账号，把打磨做完，“事情真的动起来了”。[^launch]

公告转引的来信里还有一段。Kunz 说，他们“确实有这样的印象”，从 Unix 机器经 Web 查 SPIRES，比用终端登录 SLAC 的大型机 SLACVM 再查要快，“连真的 3278 终端都比不上”，3278 是直接连在 IBM 大型机上的显示终端；从 Web 查 CERN 大型机上的文档索引 FIND，也比登录 CERNVM 再敲同一条命令快。我原以为第一批人给出的理由会和链接有关，<mark>读到这里才发现，一个物理学家说的头一个好处是快。</mark>他说的是印象，没有测过。而读者从 CERN 的页面走到 SLAC 的数据库以后，仍然要学数据库自己的查询语法。今天的搜索框和结果页很容易遮住这种中间状态：<mark>新的访问办法已经接通，旧系统的用法仍露在外面。</mark>[^launch]

![一台 IBM 3278 终端](https://toddzheng.net/media/ibm-3278-terminal-mnactec-2016-50cd8523.jpg)

*一台 IBM 3278 终端，2016 年 10 月摄于西班牙特拉萨的加泰罗尼亚科学技术博物馆（MNACTEC）。Kunz 说的“真的 3278 终端”就是这一类直接连大型机的显示终端；这是博物馆展品，不是 SLAC 的机器，只用来让读者看见这种设备。摄影：Marcin Wichary，[来源](https://commons.wikimedia.org/wiki/File:IBM_3278_terminal.jpg)，[CC BY 2.0](https://creativecommons.org/licenses/by/2.0/)，仅缩小尺寸，未裁切或调色。*

Addis 后来说过他们怎样分工。她去弄到需要的账号，Kunz 和 Hung 在大型机上架设服务器，George Crane 把远程 SPIRES 接口接到新入口，她则让数据库直接输出 HTML。她在 1990 年代中期写的一份预印本服务史，说法一致。[^addis][^preprints]

HTML 当时是一种普通的文本文件，用尖括号里的标签标出标题、段落和列表。这些标签取自 SGML，那是出版和文档行业已经在用的一套标记规范，Berners-Lee 自己加的只有一样，把一段文字指向另一处地址的那个锚。CERN 的标签清单一页就写完了，还交代浏览器碰到不认识的标签直接忽略；1991 年 8 月的发布帖说，建一个小 Web 就是写几个 SGML 文件指向已有资料。Addis 说的“让数据库直接输出 HTML”，我理解就是让检索结果出来时自带这些标签。[^html]读者眼前出现的一页内容，就这样接在已有数据库后面。今天的网站大多也是这个结构：页面是临时拼出来的，数据在别的系统里，中间有一层把请求翻译过去，再把结果翻译回来。1991 年 12 月，这一层是几段 REXX 脚本，IBM 大型机上的脚本语言。

![SPIRES 接入 Web 的概念示意](https://toddzheng.net/media/spires-web-query-1991-explainer-bb547174.png)

*SPIRES 接入 Web 的概念示意。依据 [1991 年 12 月 13 日上线公告](https://ksi.cpsc.ucalgary.ca/archives/WWW-TALK/www-talk-1991.messages/28.html)及 [Addis 对接口分工的回忆](https://firstmonday.org/ojs/index.php/fm/article/download/749/658?inline=1)自制；箭头概括请求与结果的流向，返回结果仍经 Web 服务与接口，并非当时的界面或完整协议图。*

查到一篇论文的记录，与在屏幕上读到整篇论文之间，还隔着一步。按 Addis 的服务史，从数据库记录链接到洛斯阿拉莫斯服务器上的 TeX 源文件是 1992 年夏天的事，TeX 是物理学家写论文用的排版格式，她自己说“这还不算全文，但比没有强多了”；把带公式的排版正文显示、打印出来，要等到 1993 年春天图书馆买了一台 NeXT 和一块 1.3 GB 的硬盘以后。<mark>1991 年 12 月上线的，是一个能查书目记录的入口。</mark>[^preprints]

## 还差七条记录

服务器跑起来以后，先坏的是服务器本身。1992 年 2 月 11 日，Kunz 写信说 WWW 服务器又起不来了，守护进程绑定端口失败，他把错误信息原样贴出来，说“我不知道该拿它怎么办”。五天后，物理学家 Tony Johnson 想起 Berners-Lee 早先寄给他的一份 SPIRES 接口缺陷清单，转给全组。清单第一条说，首页应该讲清这个索引收了什么、没收什么，如果收了高能物理的全部文献就说是，不是就说不是，然后 Berners-Lee 自己补了一句：“我也没资格说这话，我们自己的 XFIND 索引就没这么做，但确实该做。”另一条说，行模式浏览器自己有 `find` 命令，所以查 SPIRES 得打 `find find title tau and date 1980`，“这不直观”。其余几条是坏掉的帮助链接和每行多出来的空格。[^notebook]

2 月 25 日，一位外部使用者在公开列表上报了同样的问题。荷兰高能物理研究机构 NIKHEF 的 Willem van Leeuwen 写道，查询 SPIRES 时需要输入两次 `find`。还有一个更麻烦的现象。他按作者 Holthuizen 查询，应该得到 111 条参考文献，屏幕上却只显示了 104 条。Berners-Lee 回信说，这些问题应该在服务器端修正，但他对条目缺失的原因也没有定论，只猜测限制可能按行数计算。[^bugs]

![111 条与 104 条的数量对照](https://toddzheng.net/media/spires-111-104-explainer-7eea3333.png)

*依据 [1992 年 2 月 25 日邮件](https://lists.w3.org/Archives/Public/www-talk/1992JanFeb/0021.html)自制的数量对照：使用者报告应有 111 条，实际显示 104 条。小格仅表示数量，不对应文献顺序；这不是原始结果页，也不能据此认定数据库删除了七条记录。*

同一天，Berners-Lee 另给 van Leeuwen 回了一封私信，抄送 SLAC，标题是“SPIRES，把大多数人都搞糊涂了”。信里说，你不是第一个发现这个问题的人，“问题在于，当初在很短时间里把它做起来的那几位，并不负责维护它，也不负责做这种小修小补”。然后他转向 Kunz：能不能给 SPIRES 服务器指定一个联系人？<mark>今天的软件项目把这个角色叫维护者，1992 年 2 月的 SLAC 还没有这个词，只有这个问句。</mark>至于双重 `find`，他解释说是浏览器改了。新版把 `FIND` 当成自己的命令吃掉，只把后面两个词发给服务器，服务器那边补一行 REXX 把它加回去就行。Kunz 把信转给 Addis 和 Crane，说这解释了为什么从 CERN 那边查不了了，“不过我想你们已经弄明白了”。[^confuses]

<mark>从使用者这边看，七条没显示出来的记录，比服务器用了什么协议要紧得多。</mark>查作者的论文，结果缺了几篇，就可能漏掉自己正在找的那一篇；终端上的文字挤乱了，还得分清是内容有问题，还是显示出了错。<mark>Web 已经让两处系统通了话，维护者还要逐项检查，送到读者眼前的内容有没有少、能不能读。</mark>至于 Berners-Lee 问的那个问题，谁来接着管，SLAC 这边此时已经为它开过两次会。

## “一边划船一边造船”

2 月 5 日那次会议，是 Addis 召集的。她 2000 年的说法是，到 2 月，她软磨硬泡说动的人已经够了，就拉起了一个临时的 Web 开发与支持小组，纪要上的名字是 WWW Working Wizards。到会的有她、Kunz、Johnson、Crane 和 Bebo White。纪要开头说，Kunz 把 WWW 软件从 CERN 引进 SLAC，SPIRES 的接口是他“为演示目的在 SLACVM 上装的一个快而糙的网关”，网关就是把一边的请求翻译给另一边的程序；他已经证明了 Web 在 SLAC 能做什么，现在希望把维护和打磨交到别人手里。他给了一份文件清单，C 程序、纪要里写作 SGML 的页面和 REXX 脚本，一共七个部分，然后带大家把代码走了一遍。纪要末尾记着一句：不清楚计算部门能挤出多少人手，得先问清楚。[^addis][^notebook]

同一份纪要也记下浏览器在 SLAC 内部铺到了哪里。Kunz 装了叫 Unixhub 的 Unix 集群和 B 组的 NeXT 集群，Bebo White 装了 IBM 大型机 SLACVM，Johnson 装了跑 DEC VMS 系统的 SLACVX；1 月 24 日的 CERN 项目通讯转述 Kunz 的话，说行模式浏览器已经装到 SLAC 的全部 Unix 系统上。<mark>装了多少台机器，和有多少人用，是两个数字，今天做产品的人叫它们安装量和活跃用户。</mark>他们 1992 年就想把这两个数分开，只是还没有办法数。待办事项里有一条，是想办法识别使用者本人而不只是 IP 地址，好做迭代检索，也好统计用户。[^news][^notebook]

两周后有了答案。2 月 19 日的会前提醒里，Addis 复述上周的决议：计算部门对投入时间说了“yes”；White 和 Johnson 去读接口的 C 代码，考虑改写成 REXX 以便维护；Crane 负责修 SPIRES 的检索接口；Mark Barnett 评估在三种平台上维护 WWW 要多少工作量；Joan Winters 去研究 CERN 那边的 WWW 菜单，“为将来 SLAC 正式宣布 WWW 时准备菜单，如果会宣布的话”。SLAC 的年表接着记下，7 月 Johnson 做出实验室的中央入口页，秋天他又发布了自己写的图形界面浏览器 MidasWWW。[^notebook][^chronology]

![部分 WWW Wizards 合影，2000 年](https://toddzheng.net/media/slac-www-wizards-2000-c7154042.jpg)

*2000 年 2 月，部分 WWW Wizards 在 SLAC 的 Paul Kunz 办公室合影。从左至右为 Louise Addis、George Crane、Tony Johnson、Joan Winters，坐着的是 Paul Kunz；这是八年后的照片，不是 1992 年小组成立时的现场。图片：© SLAC National Accelerator Laboratory，[年代来源](https://ahro.slac.stanford.edu/wwwslac-exhibit/slacs-web-wizards)及[人物顺序](https://firstmonday.org/ojs/index.php/fm/article/download/749/658?inline=1)，原图未改动；当前为本地草稿选图，公开转载许可待确认。*

年表没有记的是 3 月。3 月 11 日早上，Barnett 给 Addis 写信，抄送全组，说他没法承诺继续负责，因为手头原有的事已经做不完。他对这个项目的看法是：它能用有限的本地人力提供一项有用的服务，但“看起来是个无底洞”，要活下去就得定一组最小的目标，再找一个有时间也有兴趣的协调人，“不是我”。信是早上七点四十八分开写的，附言说写到十一点零七分才写完，“协调人的提议我领情，但这不是个好主意”。第二天 Addis 给 Winters 写信，说研究部的人都是这个状态，她自己也只有匆匆忙忙的时间；她要的是一份菜单，“不会把正常人搞糊涂，又能让没耐心的物理学家立刻用上他已经会用的功能”。附言里她转述了 Crane 的比喻：有时候你只能一边划船一边造船。Winters 第二天开车上班时想起没回信，回了几句：“我会尽力帮着一边划一边造这条 WWW 的船。不过按我的经验，这种船通常会漏。话说回来，有时候也只能这样。”[^notebook]

![1992 年 3 月的三封信](https://toddzheng.net/media/www92-notebook-boat-letters-excerpt-2d21602c.png)

*Barnett 3 月 11 日的退出信、Addis 12 日致 Winters 信的附言和 Winters 13 日的回信，在 www92.notebook 里的样子。文字取自 [Wayback Machine 2001 年 12 月 17 日抓取](http://web.archive.org/web/20011217182813/http://www.slac.stanford.edu:80/~addis/history.docs/www92.notebook)，以等宽字体重新渲染，省去 Received 行与空邮件头，Barnett 信里八行变量清单和 Addis 信的正文以方括号标明省略，五处底色为本文所加；不是 1992 年终端上的显示效果。邮件作者为 Mark Barnett、Louise Addis 与 Joan Winters，此处作史料节选引用。*

<mark>这几封信让我愿意把 Addis 放在故事中央。</mark>她不写浏览器，也不写服务器。她做的事，是在 12 月 13 日凌晨说“我这就去设法让 George 感兴趣”，在 2 月里把五六个人拉进自己的办公室，再把谁做什么记下来发给每个人，到 3 月有人退出时，接着给下一个人写信。2000 年访谈的作者记下，Addis 在电话里先笑着推掉了“把 Web 带到美国”的功劳，又说这段历史有点像《罗生门》，同一件事每个人讲出来都不一样。别人问她当时是否想到 Web 会发展成什么，她说没有，“我只盼它能在 SLAC 活下来”。这些工作起初都不算正职，没有人为此加薪，有些是用自己的时间做的，Web 在很长一段时间里背着“无人支持的软件”这个名声。她补了一句：而且很好玩，“我希望同事们也这么觉得”。今天在公司里维护过内部工具的人，会认出这个处境。<mark>浏览器可以从 CERN 免费取来，接着管的人只能在本地找。</mark>[^addis][^notebook]

## “他们想进我们的数据库”

报告 111 条变 104 条的那位荷兰人，自己也写过是怎么用上 Web 的。2 月 26 日，Kunz 把高能物理 Unix 用户新闻组里的一篇帖子转给 Addis，怕她漏看；新闻组是 Usenet 上按主题分的公开讨论区。van Leeuwen 在帖子里说，1991 年 11 月他在 NIKHEF 装了一个 WWW 浏览器，目的是读 CERN 图书馆放在 XFIND 里的文档；“当 SLAC 的 SPIRES 预印本数据库能从 WWW 访问以后，NIKHEF 对 WWW 的热情涨了起来”。这个月他又在一台 Sun 上装了服务器，内容还很初步，但他更想说的是，在 Unix 系统上装一台服务器、把资料放上去“极其简单”，他说自己斗胆建议大家用它来查谁在哪里做什么。署名是 Wwwillem。转到 Addis 手里的那份，“SLAC 的 SPIRES 预印本数据库”这几个字下面有人打了一行标记。[^hepix]

第二天，Barnett 给她发了一封只有标题、没有正文的邮件，大意是：如果你还没试过，到 SLACVM 上挂上同事的磁盘，然后敲 GOPHER。Gopher 是明尼苏达大学做的一套按菜单逐层往下翻的系统，这时已经装在 SLACVM 上，和 SPIRES 的网关在同一台大型机里。日志收到 3 月 25 日为止，最后一封是 Berners-Lee 发给关注者名单的通告：服务器代码出了新的小版本，放在 CERN 的匿名 FTP 上，不用账号就能下载；加了通往 WAIS 的网关，WAIS 是当时另一套联网全文检索系统；也能在老式的 C 编译器上编译。<mark>也就是说，又有一个版本要有人去装。</mark>今天的软件自己会更新，1992 年每个新版本是一封邮件和一个 FTP 地址，装不装看本地有没有人。[^notebook][^gopher]

![Addis 收件箱里的三个半月](https://toddzheng.net/media/slac-www92-timeline-explainer-8a6662a2.png)

*这本日志覆盖的三个半月。日期取自邮件与公告的落款，同一天多封信只标最要紧的一件；依据 www92.notebook 与同期公告自制，非同期图表。1992 年夏天通知用户取浏览器一事在日志范围之外，未画入。*

那年夏天，图书馆做了一件 Addis 后来只用一句话带过的事。按她的服务史，他们“鼓励 QSPIRES 用户从 CERN 用 FTP 取免费浏览器，改用 WWW，有些人照做了”。她在 2000 年说得更具体：图书馆通知了登记在册的用户怎样取浏览器，“很多人马上就去了。他们想进我们的数据库，所以很有动力去取那个浏览器、上 Web。”她没有说“很多”是多少，服务史也只写了“有些人”。<mark>为了进一个数据库去装一个浏览器，和今天为了用一个服务去装一个 App，是同一个动作。</mark> <mark>我猜第一批打开浏览器的人，多半是被自己本来就要查的数据库带来的。</mark>[^preprints][^addis]

Addis 1994 年从 SLAC 退休。这些邮件后来存成一个纯文本文件，放在她的个人目录下，名字叫 www92.notebook。2001 年 12 月互联网档案馆抓取过一次，现在能读到的就是那一份。[^addis][^notebook]

[^chronology]: SLAC Archives, History and Records Office，[《Early Web Chronology and Documents, 1991–1994》](https://ahro.slac.stanford.edu/wwwslac-exhibit/early-web-chronology-and-documents-1991-1994)。这是机构事后编制的年表，用于 Kunz 归程、“欧洲之外第一台”的说法，以及 1992 年入口页和浏览器的时间；1991 年 12 月 12 日上线一条另有同期邮件佐证，见 notebook 脚注。年表所记 1992 年 1 月法国会议的演示者与同期通讯不一致，本文不用。
[^ht91]: ACM Hypertext '91，1991 年 12 月 15 至 18 日，圣安东尼奥。W3C 的 [A Little History of the World Wide Web](https://www.w3.org/History.html) 在 1991 年 12 月条下记 “Presented poster and demonstration at Hypertext'91”；CERN 文档服务器存有 [12 月 17 日的演示照片](https://cds.cern.ch/images/CERN-IT-9112021-01)。评审的顾虑出自评审人 Mark Frisse 2015 年在 [Mike Caulfield 博客](https://hapgood.us/2015/04/21/that-time-berners-lee-got-knocked-down-to-a-poster-session/)下的留言：决定由委员会作出，当时圈内正争论写作系统的链接是否必须双向，“如果没记错，Tim 的演示轰动全场”。这是二十多年后的自述，本文只用它说明评审关心什么，不据此认定拒稿的唯一原因。论文集目录见 [DBLP](http://www.sigmod.org/publications/dblp/db/conf/ht/ht91.html)：没有 Web 的条目，Pamela Samuelson 与 Robert Glushko 分析 Xanadu 的论文在第 39 至 50 页。证据整理见 Hypertext '91 上的 WWW 论文待遇与演示。
[^html]: HTML 的形态据 CERN 超文本文档 1992 年 11 月 3 日快照中的 [MarkUp.html](https://www.w3.org/History/19921103-hypertext/hypertext/WWW/MarkUp/MarkUp.html)（“The hypertext mark-up language is an SGML format”“WWW parsers should ignore tags which they do not understand”，署 Dan Connolly 编辑）与 [Tags.html](https://www.w3.org/History/19921103-hypertext/hypertext/WWW/MarkUp/Tags.html)（标签清单：TITLE、A、H1 至 H6、P、UL、LI 等）。这是 1992 年末的版本，1991 年 12 月的标签集只会更少。P、H1 至 H6、UL、LI 取自 SGML 而 A HREF 为 Berners-Lee 所加，据 Raggett 等《Raggett on HTML 4》（Addison Wesley Longman，1998）[第 2 章](https://www.w3.org/People/Raggett/book4/ch02.html)，事后叙述。“写几个 SGML 文件指向已有资料”出自 1991 年 8 月的项目摘要，见 1991 WorldWideWeb Internet Announcement，Addis 的邮件日志里也收有一份。Addis 的原话是 “I was able to make the SPIRES-HEP database write HTML”，见 addis 脚注；具体怎样输出，她没有说，正文的理解是本文推测。
[^pdg]: Particle Data Group，[《Review of Particle Properties》](https://pdg.lbl.gov/rpp-archive/files/PhysRevD.45.S1.pdf)，Physical Review D 第 45 卷，1992 年；前置部分 “Accessing and Using Particle Physics Databases”，PDF 第 13 至 15 页，末尾注明 1992 年 4 月修订。原文说 HEP 库 “indexed by standard bibliographic entities as well as by citations and topics”，记录数、合办方、QSPIRES 的交互与邮件两种用法、免费及节点登记要求，均取自该节。已核全本 PDF。
[^addis]: Melissa Henderson，[《First Monday Interviews: Louise Addis》](https://firstmonday.org/ojs/index.php/fm/article/download/749/658?inline=1)，2000 年 5 月。事后访谈。本文用其 1962 年入职、1994 年退休与 1969 年前后开始做数据库、旧查询方式、SSC 图形界面项目、Kunz 出现在办公室那天、接口分工、“说动了足够多的人”（twisted enough arms）、“只盼活下来”、志愿劳动与“很好玩”，以及通知用户取浏览器的回忆；引文为本文自译。“笑着推掉功劳”和《罗生门》的比方出自访谈者 Henderson 的导言，是她对电话交谈的转述，不是访谈正文。访谈里“近五千名登记用户、四十个国家”是她 2000 年的说法，本文不作为 1991 年的同期统计。
[^notebook]: Louise Addis 保存的 SLAC 内部邮件日志 `www92.notebook`，收 1991 年 12 月 11 日至 1992 年 3 月 25 日的邮件与纪要，原载 SLAC 个人目录，现存 [Wayback Machine 2001 年 12 月 17 日抓取](http://web.archive.org/web/20011217182813/http://www.slac.stanford.edu:80/~addis/history.docs/www92.notebook)。同期一手材料，但只收 Addis 收发或被抄送的邮件，纪要亦为她所记。本文用其 1991 年 12 月 11 至 13 日 Kunz 与 Addis 的往来、1992 年 2 月 5 日纪要、2 月 11 日服务器故障、2 月 16 日 Johnson 转发的 Berners-Lee 缺陷清单（清单本身未注日期，只说是 Johnson 初次联系 Berners-Lee 时收到）、2 月 19 日会前提醒、2 月 27 日 Barnett 关于 Gopher 的邮件（只有标题，无正文）、3 月 11 日 Barnett 退出信、3 月 12 日 Addis 致 Winters 信及附言、3 月 13 日 Winters 回信、3 月 25 日 Berners-Lee 的服务器新版本通告（日志最后一条）。正文引文为本文自译，原文见 1991–1992 SLAC WWW 工作笔记本（Addis）。SLAC 档案页另列的 1992 年 2 月 5 日纪要单页与 Terry Hung 通信，原链接已失效且无存档。
[^launch]: Tim Berners-Lee，[《WWW to SPIRES on SLACVM — Experimental》](https://ksi.cpsc.ucalgary.ca/archives/WWW-TALK/www-talk-1991.messages/28.html)，1991 年 12 月 13 日。公告保留了查询命令，并转引 Kunz 数日前来信；“高兴坏了”（absolutely delighted）、“事情真的动起来了”（Things are really moving now）和关于速度的几句均出自转引部分。申请永久 VM 服务机是信中的计划，不是已完成的结果。Kunz 自己写的是 “we certainly have the impression”，速度说法是印象，不是测量。
[^preprints]: Louise Addis，[《Brief and Biased History of Preprint and Database Activities at the SLAC Library, 1962–1994》](https://www.slac.stanford.edu/spires/papers/history.html)，1994 年前后写成，1997 至 2002 年间有几次增补。这是 Addis 本人的事后整理，与 2000 年访谈同属她的回忆；本文用其 1991 年 12 月、1992 年夏、1993 年春的条目，区分书目检索、TeX 源文件链接与后来的全文服务三个时点，不把后来的便利算进 1991 年 12 月的上线。
[^bugs]: Tim Berners-Lee，[《Browser append to file, and SPIRES server》](https://lists.w3.org/Archives/Public/www-talk/1992JanFeb/0021.html)，1992 年 2 月 25 日。回信内保留 Willem van Leeuwen 的问题原文；111 与 104 为使用者报告的预期数和显示数。Berners-Lee 对行数限制的解释仍是猜测，本信不证明缺陷已经修复。
[^confuses]: Tim Berners-Lee 致 Willem van Leeuwen，题为 “spires - confuses most people.”，1992 年 2 月 25 日，抄送 Kunz、Hung 及 CERN 的 www 信箱；Kunz 同日转给 Addis 与 Crane。见 notebook 脚注所引邮件日志。这封信与上一条 www-talk 公开回信是同一天的两封信；本文用其“做起来的人不负责维护”一句、要求指定联系人，以及对双重 `find` 的解释。引文为本文自译。
[^news]: Tim Berners-Lee，[《WorldWideWeb news: New software includes Gopher, News, Telnet access》](https://ksi.cpsc.ucalgary.ca/archives/WWW-TALK/www-talk-1992.messages/1.html)，1992 年 1 月 24 日。SLAC 安装范围是项目通讯对 Kunz 消息的转述；具体机器见 2 月 5 日纪要。该通讯记 HyperText '91 的演示反响热烈，并记 1 月法国会议的演示者为 Jean-François Groff。
[^hepix]: Willem van Leeuwen 在 hepnet.hepix 新闻组的帖子，经 Paul Kunz 于 1992 年 2 月 26 日转给 Addis，见 notebook 脚注所引邮件日志。原帖未单独查到，本文只用转发件中引用的段落：1991 年 11 月在 NIKHEF 装浏览器的目的、SPIRES 上线后热情上涨、当月在 Sun 上装服务器、“EXTREMELY simple” 及 “humbly suggest” 的原话、署名 Wwwillem。引用段落中 “SPIRES preprint database at SLAC” 下方有一行标记符号，出自转发件，本文不认定是谁加的。引文为本文自译。
[^gopher]: F. Anklesaria 等，[RFC 1436《The Internet Gopher Protocol》](https://www.rfc-editor.org/rfc/rfc1436)，1993 年 3 月，作者均署明尼苏达大学。这是 1993 年的规范文件，本文只用它说明 Gopher 的出处和菜单式层级浏览的形态，不据此推断 1992 年 2 月 SLAC 大型机上那个客户端的版本或用法。
