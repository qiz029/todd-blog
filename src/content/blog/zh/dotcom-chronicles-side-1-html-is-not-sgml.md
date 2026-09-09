---
title: "Dotcom编年史 番外一：HTML 不是 SGML"
description: "1992 年，一个在得州做文档工具的工程师在邮件列表上追问：一页纸的标签清单，要不要变成有人验证的标准？跟着 Dan Connolly 的信，看 HTML 怎样从“像 SGML”走到 RFC 1866。"
pubDate: 2026-09-09T04:40:18Z
updatedDate: 2026-09-09
tags: ["互联网历史", "Dotcom", "科技史", "万维网", "HTML"]
series: dotcom-chronicles
seriesOrder: 4
---

1992 年 6 月 7 日凌晨零点十二分，得州 Convex 计算机公司的 Dan Connolly 往 www-talk 邮件列表发了一封短信，主题写的是“HTML is not SMGL”，四个字母里有两个换了位置。信里说，他把 HTML 转成 MIME 和 SGML 的那套“宏大方案”跑通了，MIME 是那年刚定下的电子邮件附件标准，规定一封信怎样装进多个部分、每部分贴一个类型标签，他想拿它来装网页。回过头想给现有的 HTML 写一份 DTD，却写不出来。[^notsgml]

SGML 是“标准通用标记语言”，1986 年成为国际标准，前身是 IBM 在 1969 年做的 GML。它不是一种文件格式，是一套定义文件格式的规则：用尖括号里的标签标出文档的结构，再用一份叫 DTD 的定义写明这种文档有哪些元素、谁能套在谁里面，读文件的程序，也就是解析器，拿着 DTD 就能判断一份文档合不合规矩。HTML 借的是它的语法，尖括号、属性、`&amp;` 这类写法都从这里来，自己加的只有锚，把一段文字指向另一处地址的那个标签。[^sgml]HTML 的麻烦是结构太松，文字几乎哪里都能出现，一写就撞上 SGML 里叫“混合内容”的坑，文字和标签在同一层里混着放，DTD 很难对这种东西提要求。他接着问了两句：外面到底有多少现成的 HTML？其中多少是服务器和网关这类程序临时生成的？[^notsgml]

![“HTML is not SMGL”，1992 年 6 月 7 日](https://toddzheng.net/media/connolly-1992-06-07-not-smgl-115129a6.png)

*这封信在 Calgary 存档里的全文。文字取自 [www-talk 1992 年第 80 号](https://ksi.cpsc.ucalgary.ca/archives/WWW-TALK/www-talk-1992.messages/80.html)，以等宽字体重新渲染，省去 Received 行与空邮件头，两处底色为本文所加；主题行的拼写错误照原样。不是 1992 年终端上的显示效果。邮件作者为 Dan Connolly，此处作史料节选引用。*

我原以为 HTML 的来历是 Berners-Lee 一个人的事，标签清单是他写的，浏览器是他写的。把 1992 年 www-talk 的四百多封信按发信人数了一遍，<mark>才发现那一年为 HTML 操心最多的不是他。</mark>Connolly 一个人发了八十五封。他不在 CERN，也不写浏览器，他在一家超级计算机公司做文档工具，想让 FrameMaker 读写 HTML，那是排长篇技术手册用的软件。他从头到尾问的是一件事：<mark>一页纸的标签清单，要不要变成一个有人验证的标准？</mark>[^archive]

## “为什么不干脆用 RTF”

Web 为什么需要一种自己的文档语言，得从它要面对的机器说起。第一篇里 CERN 的问题是各种机器互不相通，同一份文档要在 NeXT 的窗口里带着字体显示，也要在只认字符的终端上一行行打出来；SLAC 那份 2 月的纪要记着浏览器装在了 Unix 集群、NeXT、大型机和 VMS 机器上。<mark>一份文件要在这些地方都能读，就不能写死字号和字体，只能写“这是一个标题”“这是一个列表”，让每台机器自己决定标题在它那里长什么样。</mark>Berners-Lee 1992 年 6 月比较 HTML 和 MIME 的富文本格式时说的就是这个：HTML 对逻辑标题层级的处理，“在不同平台上提供了比直接指定字号灵活得多的排版”。另一个好处是它只是文本，一个数据库、一段脚本都能生成，第二篇里 SPIRES 的检索结果就是这样变成网页的。SGML 是现成的、专门做这种结构标记的规范，Berners-Lee 借了它的语法，没有借它的全部规矩。[^why]

第二篇里 Addis 让 SPIRES 数据库直接输出 HTML，靠的是 CERN 那份一页纸的标签清单：尖括号里写 TITLE、H1、P、A，浏览器认得就行，不认识的标签直接忽略。[^tags]当时的人分不清两者并不奇怪，SLAC 那份 2 月的纪要把网页文件直接叫作 SGML，Kunz 交接的文件清单里也这么写。这套办法对写网页的人友好，对写第二个程序的人不友好。Connolly 6 月 6 日的第一封长信列了三条理由，头一条就是：需要一份 DTD，好让 WWW 项目公开发布的那个浏览器之外的程序也能解析 HTML，也好验证从别的文档系统转过来的文档，他点了三个名字，GNU info、Andrew 的 EZ 和 FrameMaker。<mark>只要世上只有一个读 HTML 的程序，HTML 是什么由那个程序的源代码说了算；一旦有第二个，就得有一份两边都认的定义。</mark>[^notsgml]

![CERN 的 HTML 标签清单，1992 年 11 月快照](https://toddzheng.net/media/tags-19921103-render-5e95521d.png)

*CERN 的 HTML 标签清单页 Tags.html 的开头部分，取自 [W3C 保存的 1992 年 11 月 3 日快照](https://www.w3.org/History/19921103-hypertext/hypertext/WWW/MarkUp/Tags.html)，用现代浏览器渲染原始标记，只截到 Anchors 一节，其后 IsIndex、Plaintext、Listing、Paragraph、Headings、Address 等条目未收入。字体、链接颜色都是今天浏览器的默认样式，不是 1992 年任何浏览器的显示效果；原始标记除去掉 NEXTID 与 TITLE 两个标签外逐字保留。© CERN／W3C，按 [W3C 文档许可](https://www.w3.org/copyright/document-license-2023/)节选。*

Berners-Lee 6 月 25 日回信说，他想要一份“尽可能贴近现有 HTML”的 DTD。Connolly 答，写得出来，但不知道有什么价值：HTML 允许标签“差不多想撒哪儿就撒哪儿”，能容纳这种自由的 DTD 只会是“每个元素都是所有元素的任意重复”，解析器什么都查不了。他说眼下的 HTML 和地址语法是个不错的概念验证，“但我们得往正式定义走，才能有信心让正确的实现互相兼容”。第二天 Berners-Lee 解释了 HTML 为什么这么平：很多富文本对象只存样式不存结构，Word 从标题样式推出大纲，WWW 从一串标着 LI 的列表项推出一个列表；而且真正提供信息的人，“比如小组秘书”，未必愿意写嵌套的元素，样式也许才是他们习惯的界面。“HTML 的结构就是这么简单的原因。我对更复杂的替代方案持开放态度。”[^dtdtalk]

7 月 14 日，Connolly 把话说得更彻底。他试着写 DTD，结论是“HTML 几乎没有结构，而且这是有意设计的”。SGML 的价值在于验证，出版商可以在 DTD 里规定参考文献的格式、摘要的位置；“WWW 项目没有这样的编辑规范要执行”，它的规范只是“你可以有个标题，我们会把它显示出来；标题、段落、列表用得大致传统，就会排得还行；还可以有锚”。那么为什么要用 SGML？他的答案是，因为 NeXT 上那个编辑器好用。既然如此，为什么不干脆用 RTF？那是微软定的文字处理软件之间交换文件的富文本格式，更成熟，NeXT、Mac、PC 都支持，缺的只是几个公开的渲染程序。“除非我们想让 WWW 系统的某个部分去验证文档的结构，否则为什么要用 SGML，而且用得这么糟？”[^rtf]

Berners-Lee 第二天凌晨回了。NeXT 编辑器生成的 HTML 确实不好，属性值该加引号的没加，但现在的解析器能解析真正的 SGML。高层标记是有用的：只认字符的行模式浏览器靠它排出和 Unix 图形界面 X 窗口不同的样式，把整棵文档树排成一本“WWW 书”的 LaTeX 排版脚本也靠它。HTML 没有深层结构，是为了兼容处理不了嵌套元素的软件，“有一个简单的 SGML DTD 作基础没什么不对，SGML 不是非得复杂”。至于 RTF，他的疑虑是标题靠特殊命名的样式来冒充结构，格式信息总是塞在样式名旁边，各家的扩展互不相同。这一来一回里没有谁说服谁。Connolly 当天夜里把 DTD 贴了出来，附了一段 perl 脚本，功能是把现有的 HTML 文件“合法化”，给属性值补上引号。[^rtf]

那份 DTD 是什么样子，看一行就够：`<!ELEMENT HTML O O ((TITLE? & NEXTID? & ISINDEX?), BODY, ADDRESS?)>`。它说的是，一份 HTML 文档由这几部分组成，标题、NEXTID、ISINDEX 各自可有可无、顺序随意，然后必须有一个 BODY，末尾可以有一个 ADDRESS；两个 O 表示 HTML 这个标签本身的开头和结尾都可以省略，由解析器补上。解析器拿着这样几十行，就能对照一份文件，标题跑到 BODY 后面、列表项掉到列表外面，都能报出来。他的困难在于，真实的 HTML 文件里文字和标签混着随便放，要容纳这种自由，清单只能写成“任何元素里都能放任何元素”，那对解析器等于什么都没说。8 月 19 日他报告 FrameMaker 已经能直接打开和保存 HTML。<mark>他要的从来不是更复杂的 HTML，是一个第二个程序也能读懂的 HTML。</mark>[^dtdfiles]

## “SGML 警察退一步”

秋天的事从一个登记开始。11 月，有人提议把 text/html 登记为 MIME 的正式类型，让网页在邮件和传输系统里有一个公认的名字，这意味着 HTML 得有一份能拿给外人看的定义。Connolly 11 月 19 日的信题为“冻结 HTML 规范”：Berners-Lee 老在谈“HTML 的未来”，未决的问题一大堆，“到某个时候我们得把工程师毙了，把东西发出去”。他列了一份章程，第一条是 HTML 和 SGML 的关系要说清楚，规范里不能有任何和 SGML 冲突的东西；第二条是拿行模式浏览器当参考实现。他也说，现在“把建议寄给 Tim、指望他有空改”的做法行不通。同一封信的下半截回答别人关于注释的问题，他把 SGML 的注释、处理指令、标记区段逐条讲了一遍，讲到一半写了一句：“SGML 是一团糟！”[^freeze]

两天前他已经退过一步。11 月 17 日的信主题是“SGML 警察退一步”，警察是他自称的。他原先坚持每份 HTML 文件都得带 SGML 的“框架”，声明、序言、实例一样不缺，否则“就不是 SGML 文档”。读了标准、收到出版社 O'Reilly 和 HaL 计算机公司寄来的 DocBook 材料，那是他们为技术书籍定的一套 SGML 文档类型，又装了 SLAC 的 Tony Johnson 写的图形界面浏览器 MidasWWW 以后，他改了主意：把 text/html 当作 SGML 的文本实体而不是文档实体，DTD 默认前置，就像假定每个 C 程序编译前都会自动包含标准库的头文件 stdlib.h。<mark>假设一直都在，只是换个说法。</mark>信末他还替 MidasWWW 做了个广告，说它“来得太迟，但值得等”。[^freeze]

11 月 30 日，他往 CERN 的 FTP 上传了一个包，叫 html_spec-0.3，里面有规范的根页面、一篇 SGML 语法入门、一份 DTD，还有一组“构成验证套件”的示例文件和一个解析库。信里分头喊话：“Tim，请把它链进 Web”；“实现者们，请整个取走，拿你们的实现来验”；“Tony，我有几个给 MidasWWW 的补丁”。第二天他单独给 Berners-Lee 写了一封：“我注意到你在改 info.cern.ch 上的 HTML 文件，属性加了引号，i 上加了点，t 上画了横。但那些文件还是不合 SGML。”请他去挪威的服务器上取 James Clark 写的 sgmls 解析器，用一条命令检查自己的文件，有错“要么修软件，要么改 DTD，改到能过为止”。同一封信的后半段却是另一种语气。他说自己在文档头和正文的结构上“折腾了很久”，写不出一份既能让大多数现有 HTML 合法、又能施加任何结构的 DTD，“我差不多要放弃结构这件事了”，干脆把 HTML 定义成“标签汤”，什么都能放在任何地方。三天后他上传新版，把一个自己起的标签名改回了大家习惯的 PRE，就是保留原样排版那种文字用的标签，附了一句新座右铭：“只描述，不规定。”[^freeze]

![Connolly 致 Berners-Lee，1992 年 12 月 1 日](https://toddzheng.net/media/connolly-1992-12-01-sgmls-9cd4130b.png)

*12 月 1 日那封信的节选：前半段请 Berners-Lee 去装 sgmls，后半段说自己快要放弃结构。文字取自 [www-talk 1992 年第 390 号](https://ksi.cpsc.ucalgary.ca/archives/WWW-TALK/www-talk-1992.messages/390.html)，以等宽字体重新渲染，中间三十三行关于 DTD 混合内容的技术说明以方括号标明省略，四处底色为本文所加；不是 1992 年终端上的显示效果。邮件作者为 Dan Connolly，此处作史料节选引用。*

<mark>用今天的话说，他在 1992 年秋天做的东西，是一个 HTML 的校验器和一套测试用例，外加一份没人指定他写的规范草案。</mark>这些东西放在 CERN 的 FTP 上，谁装谁用。装了多少，信里看不出来。

## “谁负责验证”

1993 年 1 月 21 日，他发了一封题为“关于 HTML 未来的想法”的长信，开头是一段用他自己的话讲的 HTML 简史。HTML 设计得很简单，人拿文本编辑器就能敲出来，同时它又要被“全球各地的很多机器”处理。他说 SGML 当时“看起来是自然的选择”，于是“Tim 在他的 WWW 客户端里实现了一个非正式的 SGML 解析器”。<mark>这是他 1993 年的追述，Berners-Lee 自己在 1992 年给的理由是结构和现成的标准，两种说法不冲突，但不是一回事。</mark>没有人真正清楚 SGML 的门道，“想自动生成 HTML 的信息提供者，只要确认公开的 www 客户端能显示就行了”。然后别人开始写自己的 HTML 解析器，发现许多问题除了 WWW 的源代码之外没有任何规范可查。然后他自己拿 sgmls 做 HTML 到 FrameMaker 的工具，发现 WWW 的源代码和 SGML 标准冲突。“糟了！”<mark>第二篇里 SLAC 图书馆让数据库吐出 HTML，用的正是他说的那种办法：浏览器显示得出来，就算对。</mark>[^future]

<mark>这封信的核心是一个问题：谁负责验证？</mark>他说这其实是 HTTP 的问题，协议是否保证送出的数据流是合法的 HTML，还是由客户端自己处理错误。他的主张是服务器负责：客户端当然应该容错，但当两边对一份文档的理解不一致时，“文档合法则客户端有错，文档不合法则服务器有错”。这会让服务器变复杂，不能再“随手抓起一个 .html 文件就往端口上送”，但可以边送边修，把错误写进日志。他承认现在改已经晚了，当时的传输协议 HTTP 0.9 来不及加，“但未来的服务器应当承担产出合法文档的负担”。信的后半段是他对 HTML2 的设想，更多结构，段落应当是可以数的单位，再往后是 HyTime，一个建在 SGML 上、刚成为国际标准的超媒体规范。同一天晚上他上传了解析库的新版本，说“得走了，这是赶出来的”。[^future]

![“谁负责验证”，1993 年 1 月 21 日](https://toddzheng.net/media/connolly-1993-01-21-who-validates-4d3dc212.png)

*1993 年 1 月 21 日长信的前半部分：他自己讲的 HTML 简史，和“谁负责验证”的提问。文字取自 [www-talk 1993 年第一季度第 89 号](https://ksi.cpsc.ucalgary.ca/archives/WWW-TALK/www-talk-1993q1.messages/89.html)，以等宽字体重新渲染，此后关于 HTML2 结构与 HyTime 的后半段未收入，三处底色为本文所加；不是 1993 年终端上的显示效果。邮件作者为 Dan Connolly，此处作史料节选引用。*

1 月 30 日之后，列表上再没有他的发信。8 月有人问起他，卖 Unix 系统的 SCO 公司的一位技术出版负责人回答，一个月前联系过，他新工作太忙，顾不上 WWW 了，附了新地址。为什么换工作、换到哪里，信里没有说，我也不猜。[^future]

## “就算 Dan C 不在这儿管着我们”

他走后第四周，2 月 25 日晚上九点，伊利诺伊大学国家超级计算应用中心（NCSA）的 Marc Andreessen 提议一个新标签，IMG，带一个 SRC 属性指向一张图片文件，浏览器把图嵌在标签所在的位置。X Mosaic 是 NCSA 一个月前刚放出来的图形界面浏览器，Andreessen 是作者之一。“这是 X Mosaic 必需的功能；我们已经做好了，至少内部要用。”他说自己对怎样放进 HTML 持开放态度，格式问题也承认“模糊”，但除了“让浏览器自己看着办”，他看不到别的办法，“等完美方案出现，MIME，也许有一天”。两个小时后，SLAC 的 Tony Johnson 回信说 MidasWWW 2.0 里有几乎一样的东西，叫 ICON，多一个 NAME 参数，让浏览器可以用内置的图代替下载；标签叫什么他不在乎，“但我们用同样的东西才合理”。[^img]

Berners-Lee 26 日回了两封。他设想的不是新标签，而是给锚加两个关系值，EMBED 表示展示时嵌进来，PRESENT 表示打开原文时一并打开，“不支持的浏览器不会因此坏掉”；他“本来不想要一个专门的标签”。第二封说得更直接：读者而不是作者也许想决定哪些图内嵌、哪些另开窗口，所以用锚加开关更合适；“我现在能不改 HTML 就不改，等它进了 RFC 流程再说”，RFC 是互联网工程任务组（IETF）发布标准用的文件序列。Andreessen 的回答是“我完全同意，每一条都同意”，然后接着说：事情已经到了这一步，有些浏览器无论如何都会以某种方式实现这个功能，哪怕不是标准，“从一开始就保持一致才好，这样 HTML2 来的时候我们还能齐步走”。27 日 Berners-Lee 又写了一封：那好，HTML2 里放一个包含机制，不限于图片；SGML 本来就有正式的做法，“就算 Dan C 不在这儿管着我们，我们也许还是该照规矩来”，然后给出一行写法，用 SGML 里给外部内容起个名字再引用的“实体”机制来嵌图。5 月 18 日，Andreessen 在列表上说明了 Mosaic 1.1 里 IMG 的扩展，标签已经在浏览器里了。[^img]

![IMG 标签的提出与回复，1993 年 2 月](https://toddzheng.net/media/img-1993-02-andreessen-bernerslee-7bb7c32f.png)

*上：1993 年 2 月 25 日 Andreessen 提出 IMG 的信，略去中间五行；下：2 月 27 日 Berners-Lee 的回复全文。文字取自 [www-talk 1993 年第一季度第 174 号](https://ksi.cpsc.ucalgary.ca/archives/WWW-TALK/www-talk-1993q1.messages/174.html)与[第 194 号](https://ksi.cpsc.ucalgary.ca/archives/WWW-TALK/www-talk-1993q1.messages/194.html)，以等宽字体重新渲染，省去 Received 行与空邮件头，两处底色为本文所加；不是 1993 年终端上的显示效果。邮件作者为 Marc Andreessen 与 Tim Berners-Lee，此处作史料节选引用。*

<mark>夏天的争论换了一批人，问题还是那个。</mark>8 月 14 日，Andreessen 列了五条断言，前四条说文档经过正式验证就该在所有浏览器里正常显示，第五条说，如果某个浏览器有标准之外的功能，而很多信息提供者“选择”用它，哪怕别的浏览器因此显示不了，这就证明该功能值得进标准，“市场已经选了”。他在信末写“穿上防火服”。[^robust]

18 日，O'Reilly 数字媒体组的编辑 Terry Allen 写道，“Marc，恕我直言，你的浏览器吐出很多错误信息”，却不报标记错误：他们一位经验丰富的排版编辑写出了 H2 开头、H3 结尾的标题，因为在 Mosaic 里看着没问题，就没去解析。哪怕只提示一句“某文件有标记错误”也好，好让人回去用 sgmls 找。Andreessen 当天回：在 O'Reilly 有人告诉他 Mosaic 了不起，什么都能显示、从不抱怨，现在另一个 O'Reilly 的人说的正相反，“各位，别因为 Mosaic 皮实来抱怨我们”。他把原因写成大写：Mosaic 不报错，是因为报错“需要干活”，手上更要紧的事排着队；另一个原因是 Mosaic 是浏览环境，不是写作工具。建议 O'Reilly 自己派人写一个 HTML-lint，像 Unix 上检查 C 代码的 lint 那样的检查工具。同一天牛津的 Lou Burnard 发了一封题为“谁来验证？”的信，答案是在 Emacs 编辑器里接上 sgmls，写的人自己验。[^robust]

Connolly 1 月的问题在 8 月有了回答，回答的人未必读过他 1 月的信。<mark>服务器不负责，浏览器不负责，写的人自己去装一个解析器。</mark>今天的浏览器仍然照样显示写错的网页，验证器仍然是写的人自己去用的工具，这个分工是 1993 年夏天定下来的，定它的人并没有开会。<mark>没有人接下验证的责任，于是它落在了浏览器的容错上。</mark>

## “只描述，不规定”

1995 年 11 月，HTML 2.0 成为 RFC 1866，进入标准流程。作者两个人，T. Berners-Lee 和 D. Connolly。文档开头说，它“汇集、澄清并正式化了一组功能，大致对应于 1994 年 6 月之前通行的 HTML”，起名 2.0 是为了区别于此前那些“非正式的规范”；第二段写明，HTML 是 ISO 8879 也就是 SGML 的一个应用。<mark>1992 年 6 月他写不出来的那份 DTD，在这里面。</mark>1994 年他怎样回到这件事上，中间的 IETF 工作组做了什么，这一篇的材料没有覆盖，留给以后。[^rfc]

![从一封短信到一份 RFC](https://toddzheng.net/media/html-1992-1995-timeline-f4747bc5.png)

*这一篇覆盖的三年半。日期取自各封邮件的落款与 RFC 1866 的日期，同一天多封信只标最要紧的一件；依据 www-talk 存档与 RFC 1866 自制，非同期图表。1993 年 8 月到 1995 年 11 月之间的 IETF 工作组过程本文未核，故留白。*

RFC 的口径和他 1992 年 12 月 4 日那句座右铭是一致的：只描述，不规定。三年前他要冻结规范、把工程师毙了发出去，要服务器为合法性负责；<mark>三年后以他署名的规范，写的是大家已经在做的事。</mark>

[^notsgml]: Dan Connolly，《HTML is not SMGL》，1992 年 6 月 7 日 00:12 CDT，www-talk，[Calgary 存档 1992 年第 80 号](https://ksi.cpsc.ucalgary.ca/archives/WWW-TALK/www-talk-1992.messages/80.html)；主题行的拼写错误照原样。前一天的《MIME as a hypertext architecture》（[第 78 号](https://ksi.cpsc.ucalgary.ca/archives/WWW-TALK/www-talk-1992.messages/78.html)）列出需要 DTD 的三条理由，本文用第一条。引文为本文自译。DTD 与“混合内容”的解释是本文为读者所加，不出自这两封信。
[^sgml]: SGML 的说明据 CERN 超文本文档 1992 年 11 月 3 日快照中的 [SGML.html](https://www.w3.org/History/19921103-hypertext/hypertext/WWW/MarkUp/SGML.html)（署 Tim BL）：“an ISO standardised derivative of an earlier IBM 'GML'”，结构“can be checked for validity against a 'Document Type Definition', or DTD”。1986 年的年份据 RFC 1866 所引 “ISO Standard 8879:1986”。GML 的起源据 Charles F. Goldfarb，《The Roots of SGML — A Personal Recollection》，1996 年，[Wayback 存档](https://web.archive.org/web/2015/http://www.sgmlsource.com/history/roots.htm)：“Later in 1969, together with Ed Mosher and Ray Lorie, I invented Generalized Markup Language (GML)”，1971 年定名时取三人姓氏首字母“so that our initials would always prove where it had originated”。这是事后回忆。同文还说 ISO 8879 里的 General Document 文档类型经 Anders Berglund 在 CERN 推广 DCF 而成为 HTML 文档类型的来源，本文未核，记此备考。
[^archive]: 本文所用邮件全部出自 Calgary 大学保存的 [www-talk 存档](https://ksi.cpsc.ucalgary.ca/archives/WWW-TALK/)，1992 年 465 封，1993 年四个季度共 3071 封，本文已全文检索。“八十五封”是 1992 年存档中发信人含 Connolly 的邮件数，按存档计，不含他发到别处的信。Connolly 当时在 Convex Computer Corporation，据其邮件地址与信中所述工作；关于他本人的生平本文未另查资料。来源整理见 www-talk 1992–1993 HTML 从标签清单到 DTD（Connolly 线索）。
[^tags]: CERN 超文本文档 1992 年 11 月 3 日快照中的 [Tags.html](https://www.w3.org/History/19921103-hypertext/hypertext/WWW/MarkUp/Tags.html) 与 [MarkUp.html](https://www.w3.org/History/19921103-hypertext/hypertext/WWW/MarkUp/MarkUp.html)，后者写明 “WWW parsers should ignore tags which they do not understand”。SLAC 输出 HTML 一事见 Dotcom 编年史 - 只盼它能在 SLAC 活下来；1992 年 2 月 5 日纪要把文件清单写作 “C programs, SGML, and REXX execs”，见 1991–1992 SLAC WWW 工作笔记本（Addis）。
[^dtdtalk]: Berners-Lee 与 Connolly 6 月 25 日的往来，见 Connolly《Re: HTML DTD》（[第 122 号](https://ksi.cpsc.ucalgary.ca/archives/WWW-TALK/www-talk-1992.messages/122.html)），内引 Berners-Lee 原信 “I'd like a DTD which as closely reflects the current HTML as possible”；Connolly 答 “we need to move toward formal definitions so that we can have confidence that correct implementations will interoperate”。Berners-Lee 6 月 26 日关于样式与“group secretaries”的解释见《Re: HTML DTD》（[第 121 号](https://ksi.cpsc.ucalgary.ca/archives/WWW-TALK/www-talk-1992.messages/121.html)），末句 “So that is why the HTML structure is so simple. I am open to a more sophisticated alternative.” 存档中第 121 号日期为 6 月 26 日、第 122 号为 25 日，系时区与归档顺序所致，本文按落款。
[^why]: 机器的异构见 Dotcom 编年史 - 万维网从一个找资料的问题开始；SLAC 各平台的安装见 Dotcom 编年史 - 只盼它能在 SLAC 活下来所引 1992 年 2 月 5 日纪要。Berners-Lee 的比较出自《MIME, SGML, UDIs, HTML and W3》，1992 年 6 月 11 日（[第 96 号](https://ksi.cpsc.ucalgary.ca/archives/WWW-TALK/www-talk-1992.messages/96.html)），原话 “our treatment of logical heading levels and other structures is much more powerful and has turned out to provide more flexible formatting on different platforms than explicit semi-references to font sizes”。“没有借它的全部规矩”是本文对下文争论的概括。
[^rtf]: Connolly，《rethinking the HTML DTD.》，1992 年 7 月 14 日（[第 144 号](https://ksi.cpsc.ucalgary.ca/archives/WWW-TALK/www-talk-1992.messages/144.html)）；Berners-Lee 7 月 15 日 00:03 的回复（[第 147 号](https://ksi.cpsc.ucalgary.ca/archives/WWW-TALK/www-talk-1992.messages/147.html)），原话 “SGML does not HAVE to be complicated”。“the NeXT implementation has a nifty editor” 译作“NeXT 上那个编辑器好用”；“why are we using SGML (and using it poorly)?” 译作“为什么要用 SGML，而且用得这么糟”。
[^dtdfiles]: 正文引用的 ELEMENT 一行逐字出自《HTML DTD enclosed》，对它的解释是本文所加。《HTML DTD enclosed》与《perl script to legalize HTML files》，1992 年 7 月 15 日 22:35 与 22:49（[第 152](https://ksi.cpsc.ucalgary.ca/archives/WWW-TALK/www-talk-1992.messages/152.html)、[153 号](https://ksi.cpsc.ucalgary.ca/archives/WWW-TALK/www-talk-1992.messages/153.html)）；脚本名为 fix-html.pl，主要功能是重写锚标签并给属性值加引号。《can now read/write html from FrameMaker!》，8 月 19 日（[第 179 号](https://ksi.cpsc.ucalgary.ca/archives/WWW-TALK/www-talk-1992.messages/179.html)）。
[^freeze]: 《Freezing the HTML spec》，11 月 19 日（[第 325 号](https://ksi.cpsc.ucalgary.ca/archives/WWW-TALK/www-talk-1992.messages/325.html)），原话 “shoot the engineers and ship it” “SGML is a mess!”；《SGML Cop backs off》，11 月 17 日（[第 298 号](https://ksi.cpsc.ucalgary.ca/archives/WWW-TALK/www-talk-1992.messages/298.html)）；《An HTML specification and Implementors' Guide》，11 月 30 日（[第 370 号](https://ksi.cpsc.ucalgary.ca/archives/WWW-TALK/www-talk-1992.messages/370.html)）；《HTML providers: please grab sgmls and the DTD》，12 月 1 日（[第 390 号](https://ksi.cpsc.ucalgary.ca/archives/WWW-TALK/www-talk-1992.messages/390.html)），原话 “But the files still don't fit into SGML” “I'm just about to give up on the structure business” “tag soup”；《The spec evolves...》，12 月 4 日（[第 402 号](https://ksi.cpsc.ucalgary.ca/archives/WWW-TALK/www-talk-1992.messages/402.html)），原话 “just describe it; don't prescribe it”。text/html 的 MIME 登记提议见 11 月 10 日前后的线程，提议人本文未查。
[^future]: 《thoughts on the future of HTML [long]》，1993 年 1 月 21 日（[1993 年第一季度第 89 号](https://ksi.cpsc.ucalgary.ca/archives/WWW-TALK/www-talk-1993q1.messages/89.html)），原话 “Enter SGML. It seemed like the natural choice, so Tim implemented an informal SGML parser in his WWW clients” “information providers who wanted to produce HTML automatically just checked to be sure the public www client grokked” “Uh oh!” “the client is at fault if the document is valid, and the server is at fault if the document is not”；同日《libHTML to date》（[第 90 号](https://ksi.cpsc.ucalgary.ca/archives/WWW-TALK/www-talk-1993q1.messages/90.html)），“I gotta go. It's a rush job”。存档中他最后一封信为 1 月 30 日（第 111 号）。Bob Stayton（SCO）8 月 6 日《Re: Dan Connoly》（[1993 年第三季度第 420 号](https://ksi.cpsc.ucalgary.ca/archives/WWW-TALK/www-talk-1993q3.messages/420.html)）：“He is too busy in his new job to be involved with WWW now.” 这是第三方转述，本文不据此推断去向。
[^img]: Marc Andreessen，《proposed new tag: IMG》，1993 年 2 月 25 日 21:09（[第 174 号](https://ksi.cpsc.ucalgary.ca/archives/WWW-TALK/www-talk-1993q1.messages/174.html)）；Tony Johnson 同日回复（[第 175 号](https://ksi.cpsc.ucalgary.ca/archives/WWW-TALK/www-talk-1993q1.messages/175.html)）；Berners-Lee 26 日两封（[第 178](https://ksi.cpsc.ucalgary.ca/archives/WWW-TALK/www-talk-1993q1.messages/178.html)、[183 号](https://ksi.cpsc.ucalgary.ca/archives/WWW-TALK/www-talk-1993q1.messages/183.html)），原话 “I hadn't wanted a special tag” “I don't want to change HTML now if I can help it, until it has gone to RFC track”；Andreessen 的回复（[第 189 号](https://ksi.cpsc.ucalgary.ca/archives/WWW-TALK/www-talk-1993q1.messages/189.html)），“I absolutely agree in all cases”；Berners-Lee 27 日（[第 194 号](https://ksi.cpsc.ucalgary.ca/archives/WWW-TALK/www-talk-1993q1.messages/194.html)），“even if Dan C ain't here to round us up we maybe ought to stick to the track”。Mosaic 1.1 的 IMG 见 Andreessen 5 月 18 日《IMG extension for Mosaic 1.1》（[第二季度第 341 号](https://ksi.cpsc.ucalgary.ca/archives/WWW-TALK/www-talk-1993q2.messages/341.html)），本文只用其主题与日期。“他走后第四周”按 1 月 30 日算。
[^robust]: Andreessen，《adherence to DTD's, etc.》，8 月 14 日（[第三季度第 666 号](https://ksi.cpsc.ucalgary.ca/archives/WWW-TALK/www-talk-1993q3.messages/666.html)），原话 “the market has chosen” “Now donning my fire-proof bodysuit”；Terry Allen，8 月 18 日（[第 721 号](https://ksi.cpsc.ucalgary.ca/archives/WWW-TALK/www-talk-1993q3.messages/721.html)），“Marc, with respect, your browser puts out a lot of error messages”；Andreessen 同日《browsing vs validation, or, why not to make software robust》（[第 722 号](https://ksi.cpsc.ucalgary.ca/archives/WWW-TALK/www-talk-1993q3.messages/722.html)），原话 “Folks, don't complain to us because Mosaic is robust” 及大写的 “DOING SO WOULD REQUIRE WORK”；Lou Burnard，《who validates?》，同日（[第 711 号](https://ksi.cpsc.ucalgary.ca/archives/WWW-TALK/www-talk-1993q3.messages/711.html)）。这几封信里没有人提到 Connolly 1 月的信，“未必读过”是本文的措辞，不是事实陈述。
[^rfc]: [RFC 1866《Hypertext Markup Language - 2.0》](https://www.rfc-editor.org/rfc/rfc1866)，T. Berners-Lee（MIT/W3C）与 D. Connolly，1995 年 11 月，标准轨道（Standards Track）。引文出自其引言：“brings together, clarifies, and formalizes a set of features that roughly corresponds to the capabilities of HTML in common use prior to June 1994”；“HTML is an application of ISO Standard 8879:1986”。本文只核了头部与引言，1994 至 1995 年 IETF HTML 工作组的过程未核，故正文明言不覆盖。
