// Site-wide translations. Add new keys as pages grow.
// Usage: import { t } from '../i18n/translations';  t('nav.home', Astro.currentLocale)

const dict: Record<string, Record<string, string>> = {
  // Nav
  'nav.home':       { en: 'Home',       zh: '首页' },
  'nav.blog':       { en: 'Blog',       zh: '文章' },
  'nav.about':      { en: 'About',      zh: '关于' },
  'nav.projects':   { en: 'Projects',   zh: '项目' },

  // Home page
  'home.heading':   { en: 'Todd Zheng', zh: 'Todd Zheng' },
  'home.metaTitle': { en: 'Todd Zheng — Engineer, Builder, Writer', zh: 'Todd Zheng — 工程师、产品构建者、写作者' },
  'home.role':      { en: 'Engineer · Builder · Writer', zh: '工程师 · 产品构建者 · 写作者' },
  'home.intro': {
    en: 'I build systems that help people and teams do complex work with less friction — from release platforms used by thousands of engineers to AI tools and independent products.',
    zh: '我构建让个人和团队更轻松完成复杂工作的系统——从服务数千名工程师的发布平台，到 AI 工具和独立产品。',
  },
  'home.cta.projects': { en: 'Explore my work', zh: '看看我的作品' },
  'home.cta.writing':  { en: 'Read my thinking', zh: '阅读我的思考' },
  'home.cta.contact':  { en: 'Work with me', zh: '和我合作' },
  'home.proof.label':     { en: 'Selected outcomes', zh: '代表性成果' },
  'home.proof.engineers': { en: 'engineers on the release platform', zh: '名工程师使用发布平台' },
  'home.proof.services':  { en: 'services managed', zh: '个服务纳入管理' },
  'home.proof.approvals': { en: 'fewer compliance approvals', zh: '合规审批量降低' },
  'home.proof.repos':     { en: "repos in my developer agent's ownership area", zh: '个代码库纳入开发者 Agent 的负责范围' },
  'home.building.kicker': { en: 'From platforms to products', zh: '从平台到产品' },
  'home.building':        { en: "What I'm building", zh: '我正在构建' },
  'home.building.intro':  { en: 'Independent products and experiments where I turn engineering ideas into things people can use.', zh: '把工程实践中的想法变成真正有人使用的独立产品和实验。' },
  'home.allProjects':     { en: 'All projects', zh: '全部项目' },
  'home.writing.kicker':  { en: 'Ideas from the work', zh: '来自实践的思考' },
  'home.writing':   { en: 'Writing',    zh: '文章' },
  'home.allWriting': { en: 'All writing', zh: '全部文章' },
  'home.empty':     { en: 'Nothing here yet. Working on it.', zh: '还没有文章，正在建设中。' },

  // About page
  'about.heading':  { en: 'About',      zh: '关于' },
  'about.meta': {
    en: 'About Todd Zheng, an engineer and product builder working on AI agents, developer platforms, and independent software products.',
    zh: '关于 Todd Zheng：专注 AI Agent、开发者平台和独立软件产品的工程师与产品构建者。',
  },
  'about.p1': {
    en: "I'm Todd Zheng, a senior software engineer and tech lead based in Bothell, Washington. I work on AI engineering tools, release platforms, and developer productivity.",
    zh: '我是 Todd Zheng（郑秋石），资深软件工程师 & 技术负责人，现居美国华盛顿州 Bothell。我从事 AI 工程工具、发布平台和研发效能方面的工作。',
  },
  'about.p2': {
    en: 'I grew up in a household where technology was always around, and I started young — hacking games, figuring out how to make pirated copies run, and generally taking things apart to see how they worked. I graduated from UC San Diego in 2017 with a degree in Mathematics and Computer Science.',
    zh: '我从小在技术氛围浓厚的家庭长大，很早就开始折腾——破解游戏、研究盗版游戏怎么跑起来、把各种东西拆开看个究竟。2017 年从加州大学圣地亚哥分校（UCSD）毕业，获数学与计算机科学学士学位。',
  },
  'about.what':     { en: 'What I do',  zh: '工作经历' },
  'about.ai':       { en: 'AI Engineering', zh: 'AI 工程' },
  'about.building': { en: "What I'm building now", zh: '我正在构建' },
  'about.building.intro': {
    en: 'I use independent products to explore how software, AI, and better workflows can make specialized work easier:',
    zh: '我通过独立产品探索如何用软件、AI 和更好的工作流，让专业工作变得更简单：',
  },
  'about.building.pax': {
    en: 'conversion-focused websites, connected workflows, and practical AI systems for small businesses.',
    zh: '面向小型企业的转化型网站、互联工作流和实用 AI 系统。',
  },
  'about.building.pluginHub': {
    en: 'an independent registry for discovering, verifying, and installing DeepSeek Harness plugins and profiles.',
    zh: '用于发现、验证和安装 DeepSeek Harness 插件与 Profiles 的独立注册中心。',
  },
  'about.building.roundtable': {
    en: 'an experiment in agent-native knowledge sharing through structured, multi-perspective discussion.',
    zh: '通过结构化、多视角讨论探索 Agent 原生知识共享。',
  },
  'about.tech':     { en: 'Tech Stack', zh: '技术栈' },
  'about.outside':  { en: 'Outside of work', zh: '工作之外' },
  'about.site':     { en: 'About this site', zh: '关于本站' },
  'about.elsewhere':{ en: 'Elsewhere',  zh: '其他链接' },

  // About: What I do — TikTok
  'about.tiktok1': {
    en: 'At TikTok, I was the founding engineer of <strong>Ouroboros</strong>, Global E-Commerce\'s unified release platform. Built from scratch, it now manages release workflows for ~5,000 services across ~4,000 engineers — handling approval, compliance, observability, quality gates, scheduling, and rollback, with an NPS of 85.',
    zh: '在 TikTok，我是 <strong>Ouroboros</strong> 的 founding engineer。该平台是全球电商的统一发布平台，从零开始设计与建设，目前已管理约 5,000 个服务的发布流程，服务约 4,000 名工程师——涵盖发布审批、合规审批、可观测性、质量门禁、调度与回滚，NPS 85。',
  },
  'about.tiktok2': {
    en: 'I also built <strong>Ticket Stamper</strong>, which aggregates compliance approvals and reuses eligible test-environment results, cutting org-wide approval volume by ~80%.',
    zh: '我还主导开发了 <strong>Ticket Stamper</strong>，聚合全球电商发布合规审批，并在满足条件时复用测试环境审批结果，使组织整体合规审批量下降约 80%。',
  },
  'about.google': {
    en: 'Before TikTok, I spent five years at Google, where I worked on early proof-of-concepts for Google\'s low-code platform initiative (which informed the AppSheet acquisition), Apigee SSO (OAuth, RBAC, multi-tenancy), and catastrophic recovery for Google Core infrastructure.',
    zh: '在 TikTok 之前，我在 Google 工作了五年。参与了 Google 企业低代码平台早期技术验证（为 AppSheet 收购提供了工程输入）、Apigee SSO（OAuth、RBAC、多租户授权），以及 Google Core 基础设施的灾难级故障恢复系统。',
  },

  // About: AI Engineering
  'about.ai1': {
    en: "Recently I've been building LLM agents with RAG, tool calling, persistent memory, and eval loops — applied to the messy, undersolved parts of engineering work: debugging, cross-timezone handoffs, release reviews, and team knowledge management.",
    zh: '近期我一直在实践 LLM Agent，结合 RAG、Tool Calling、持久化 Memory 和评测闭环——应用于工程工作中那些混乱且尚未被充分解决的问题：调试、跨时区协作、发布评审和团队知识管理。',
  },
  'about.ai2': {
    en: 'My personal developer agent, built on the open-source <a href="https://github.com/nousresearch/hermes-agent">Hermes</a> framework, is used daily by me and 10+ teammates. It combines layered memory, persistent notes, team SOPs, and custom tools to handle platform-wide Q&amp;A and guided debugging across a 20-repo ownership area.',
    zh: '我的个人开发者 Agent 基于开源的 <a href="https://github.com/nousresearch/hermes-agent">Hermes</a> 框架搭建，目前我自己和 10 多位同事每天都在使用。它结合了分层 memory、持久化笔记、团队 SOP 和定制工具，覆盖约 20 个代码库的平台技术负责人工作中的问答和引导式调试。',
  },

  // About: Tech Stack
  'about.tech.lang':    { en: 'Languages', zh: '编程语言' },
  'about.tech.lang.v':  { en: 'Go, Java, Python', zh: 'Go、Java、Python' },
  'about.tech.sys':     { en: 'Systems', zh: '系统与平台' },
  'about.tech.sys.v':   { en: 'Distributed systems, CI/CD, release platforms, developer experience', zh: '分布式系统、CI/CD、发布平台、研发效能' },
  'about.tech.ai':      { en: 'AI', zh: 'AI 工程' },
  'about.tech.ai.v':    { en: 'LLM agents, RAG, tool calling, persistent memory, evals', zh: 'LLM Agent、RAG、Tool Calling、持久化 Memory、Evals' },
  'about.tech.infra':   { en: 'Infrastructure', zh: '基础设施' },
  'about.tech.infra.v': { en: 'Kubernetes, Docker, MySQL, Redis, RocketMQ', zh: 'Kubernetes、Docker、MySQL、Redis、RocketMQ' },

  // About: Outside of work
  'about.wow': {
    en: "I started playing World of Warcraft seriously in 2019. I've been a raid leader, earned Cutting Edge multiple times, and pushed high Mythic+ keys. These days I play casually — the game taught me more about how to think and how to work with people than I expected from a twenty-year-old MMO.",
    zh: '我从 2019 年开始大量玩魔兽世界。当过团长，拿过多次 Cutting Edge，也冲过高分大秘境。现在已经休闲了——但这款二十年的老游戏教会了我许多关于思考和待人接物的东西，远超我的预期。',
  },
  'about.cats': {
    en: 'I live with my wife and four cats. They contribute to my code reviews by walking on the keyboard.',
    zh: '我和妻子以及四只猫一起生活。它们经常通过踩键盘的方式参与我的代码审查。',
  },

  // About: About this site
  'about.site.text': {
    en: 'Built with <a href="https://astro.build">Astro</a>, deployed on Cloudflare Pages. I write in Markdown and push to deploy. No tracking, no analytics, no comments. Just text on a page.',
    zh: '本站用 <a href="https://astro.build">Astro</a> 构建，部署在 Cloudflare Pages。我用 Markdown 写作，git push 即发布。没有追踪、没有分析、没有评论。只是页面上的文字。',
  },

  // Elsewhere
  'about.gh':  { en: 'GitHub',    zh: 'GitHub' },
  'about.li':  { en: 'LinkedIn',  zh: 'LinkedIn' },
  'about.x':   { en: 'X',         zh: 'X' },
  'about.rss': { en: 'RSS',       zh: 'RSS' },

  // Footer
  'footer.copy': { en: '&copy; 2026 Todd Zheng', zh: '&copy; 2026 Todd Zheng' },

  // Blog post layout
  'blog.updated': { en: 'Last updated on', zh: '最后更新于' },
  'blog.readingTime': { en: '{min} min read · {words} words', zh: '约 {min} 分钟 · {words} 字' },
  'post.toc':      { en: 'On this page', zh: '本页目录' },
  'post.share':    { en: 'Share',        zh: '分享' },
  'post.copyLink': { en: 'Copy link',    zh: '复制链接' },
  'post.copied':   { en: 'Copied!',      zh: '已复制' },
  'post.readNext': { en: 'Read next',    zh: '接着读' },
  'post.older':    { en: 'Older',        zh: '上一篇' },
  'post.newer':    { en: 'Newer',        zh: '下一篇' },
  'post.authorBio': {
    en: 'Senior software engineer & tech lead. I write about AI engineering, developer tooling, and the messy parts of building software at scale.',
    zh: '资深软件工程师 & 技术负责人。写 AI 工程、开发者工具，以及规模化软件建设中那些混乱的部分。',
  },

  // Tags
  'tags.heading': { en: 'Tags', zh: '标签' },
  'tags.allTags': { en: 'All tags', zh: '全部标签' },

  // Projects page
  'projects.heading':  { en: 'Projects',       zh: '项目' },
  'projects.featured': { en: "Products I've built", zh: '我做的产品' },
  'projects.recent':   { en: 'On GitHub', zh: 'GitHub 项目' },
  'projects.pax.desc': {
    en: 'I build conversion-focused websites, connected workflows, and practical AI systems that help small businesses grow with less manual work.',
    zh: '我为小型企业构建以转化为导向的网站、互联工作流和实用 AI 系统，帮助业务增长并减少重复劳动。',
  },
  'projects.pluginHub.desc': {
    en: 'I built this independent registry to make DeepSeek Harness plugins and reusable profiles easier to discover, verify, and install.',
    zh: '我做的独立社区注册中心，让 DeepSeek Harness 插件与可复用 Profiles 更容易被发现、验证和安装。',
  },
  'projects.roundtable.desc': {
    en: 'Agent-native knowledge sharing — ask a question, and AI agents with distinct expert personas debate and answer it roundtable-style.',
    zh: 'Agent 原生的知识分享平台——提出问题，由各具专家人设的 AI Agent 以圆桌形式讨论并作答。',
  },
  'projects.updated':  { en: 'updated', zh: '更新于' },
  'projects.weekly':   { en: '{n} commits this week', zh: '本周 {n} 次提交' },
  'projects.fallback': {
    en: 'GitHub data was unavailable at build time. See <a href="https://github.com/qiz029">github.com/qiz029</a>.',
    zh: '构建时未能获取 GitHub 数据，请访问 <a href="https://github.com/qiz029">github.com/qiz029</a>。',
  },
};

export function t(key: string, locale?: string): string {
  const entry = dict[key];
  if (!entry) {
    console.warn(`Missing translation key: ${key}`);
    return key;
  }
  const l = locale || 'en';
  return entry[l] || entry['en'] || key;
}
