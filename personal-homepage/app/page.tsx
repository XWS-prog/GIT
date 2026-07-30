type SocialLink = {
  label: string;
  value: string;
  href: string;
  external?: boolean;
};

type Profile = {
  name: string;
  initials: string;
  role: string;
  location: string;
  availability: string;
  intro: string;
  about: string[];
  skills: string[];
  socials: SocialLink[];
};

type Project = {
  number: string;
  title: string;
  category: string;
  description: string;
  tags: string[];
  href: string;
};

type Experience = {
  period: string;
  role: string;
  company: string;
  description: string;
};

const profile: Profile = {
  name: "林川",
  initials: "LC",
  role: "产品设计师 × 创意开发者",
  location: "中国 · 杭州",
  availability: "开放合作中",
  intro: "在设计与技术之间，做清晰而有温度的数字产品。",
  about: [
    "我关注人如何理解和使用数字产品，也享受把一个模糊想法逐渐变成清晰体验的过程。",
    "过去几年，我参与过从 0 到 1 的产品设计、设计系统搭建与前端实现。对我来说，好设计不仅关乎外观，更关乎信息、节奏与每一次恰到好处的反馈。",
  ],
  skills: [
    "产品策略",
    "用户体验",
    "界面设计",
    "设计系统",
    "交互原型",
    "创意开发",
    "React",
    "Design Ops",
  ],
  socials: [
    {
      label: "邮箱",
      value: "hello@linchuan.design",
      href: "mailto:hello@linchuan.design",
    },
    {
      label: "GitHub",
      value: "@linchuan",
      href: "https://github.com/",
      external: true,
    },
    {
      label: "即刻",
      value: "@林川",
      href: "https://web.okjike.com/",
      external: true,
    },
    {
      label: "小红书",
      value: "林川的设计笔记",
      href: "https://www.xiaohongshu.com/",
      external: true,
    },
  ],
};

const projects: Project[] = [
  {
    number: "01",
    title: "息壤",
    category: "专注与身心状态产品",
    description:
      "把复杂的生理数据转译成轻盈、可理解的日常反馈，让用户在忙碌中重新感知自己的节奏。",
    tags: ["产品设计", "交互原型", "视觉系统"],
    href: "#contact",
  },
  {
    number: "02",
    title: "浮光",
    category: "独立创作者内容平台",
    description:
      "为小型创作团队设计从编辑、发布到读者订阅的完整体验，并建立可持续演进的组件体系。",
    tags: ["体验策略", "设计系统", "React"],
    href: "#contact",
  },
  {
    number: "03",
    title: "一页之间",
    category: "数字阅读实验",
    description:
      "探索屏幕阅读中的留白、节奏与交互，让长内容依然拥有纸张般安静而沉浸的感受。",
    tags: ["创意开发", "网页设计", "动效"],
    href: "#contact",
  },
];

const experiences: Experience[] = [
  {
    period: "2023 — 至今",
    role: "独立产品设计师",
    company: "Freelance",
    description:
      "与早期团队和独立品牌合作，负责产品定义、体验设计与高保真实现。",
  },
  {
    period: "2020 — 2023",
    role: "高级体验设计师",
    company: "远山工作室",
    description:
      "主导两款核心产品的体验升级，并推动跨产品设计系统从零落地。",
  },
  {
    period: "2018 — 2020",
    role: "产品设计师",
    company: "微光科技",
    description:
      "参与移动端与 Web 端产品设计，建立以用户研究驱动迭代的工作方式。",
  },
];

const navItems = [
  { label: "关于", href: "#about" },
  { label: "项目", href: "#projects" },
  { label: "经历", href: "#experience" },
  { label: "联系", href: "#contact" },
];

export default function Home() {
  return (
    <>
      <a className="skip-link" href="#main">
        跳至主要内容
      </a>

      <header className="site-header">
        <a className="wordmark" href="#top" aria-label="返回首页">
          {profile.initials}
        </a>
        <nav aria-label="主要导航">
          <ul className="nav-list">
            {navItems.map((item) => (
              <li key={item.href}>
                <a href={item.href}>{item.label}</a>
              </li>
            ))}
          </ul>
        </nav>
        <a className="header-contact" href="mailto:hello@linchuan.design">
          <span>聊聊</span>
          <span aria-hidden="true">↗</span>
        </a>
      </header>

      <main id="main">
        <section className="hero section-shell" id="top" aria-labelledby="hero-title">
          <div className="hero-grid">
            <div className="hero-copy reveal reveal-one">
              <p className="eyebrow">
                <span className="status-dot" aria-hidden="true" />
                {profile.availability}
              </p>
              <h1 id="hero-title">
                你好，我是
                <span>{profile.name}</span>
              </h1>
              <p className="hero-intro">{profile.intro}</p>
              <div className="hero-actions">
                <a className="button button-primary" href="#contact">
                  联系我
                  <span aria-hidden="true">↘</span>
                </a>
                <a className="text-link" href="#projects">
                  浏览精选项目
                  <span aria-hidden="true">↓</span>
                </a>
              </div>
            </div>

            <aside className="identity-card reveal reveal-two" aria-label="个人信息">
              <div className="identity-mark" aria-hidden="true">
                <span>{profile.initials}</span>
                <i />
              </div>
              <div className="identity-details">
                <div>
                  <span>身份</span>
                  <strong>{profile.role}</strong>
                </div>
                <div>
                  <span>坐标</span>
                  <strong>{profile.location}</strong>
                </div>
              </div>
            </aside>
          </div>
          <div className="hero-index reveal reveal-three" aria-hidden="true">
            <span>Portfolio / 2026</span>
            <span>Scroll to explore</span>
          </div>
        </section>

        <section className="section-shell content-section" id="about" aria-labelledby="about-title">
          <div className="section-heading">
            <p className="section-index">01 / 关于</p>
            <h2 id="about-title">
              在复杂里寻找秩序，
              <br />
              在细节中保留温度。
            </h2>
          </div>
          <div className="about-grid">
            <div className="about-copy">
              {profile.about.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
            <div className="skills-block">
              <p className="mini-label">关注与能力</p>
              <ul className="skill-list" aria-label="技能列表">
                {profile.skills.map((skill, index) => (
                  <li key={skill}>
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    {skill}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="section-shell content-section" id="projects" aria-labelledby="projects-title">
          <div className="section-heading section-heading-inline">
            <div>
              <p className="section-index">02 / 精选项目</p>
              <h2 id="projects-title">近期做过的一些事</h2>
            </div>
            <p className="section-note">从问题定义到最终体验</p>
          </div>
          <div className="project-list">
            {projects.map((project) => (
              <article className="project-card" key={project.title}>
                <div className="project-number">{project.number}</div>
                <div className="project-main">
                  <p>{project.category}</p>
                  <h3>{project.title}</h3>
                  <p className="project-description">{project.description}</p>
                  <ul className="tag-list" aria-label={`${project.title} 项目技能`}>
                    {project.tags.map((tag) => (
                      <li key={tag}>{tag}</li>
                    ))}
                  </ul>
                </div>
                <a
                  className="project-link"
                  href={project.href}
                  aria-label={`咨询 ${project.title} 项目详情`}
                >
                  <span aria-hidden="true">↗</span>
                </a>
              </article>
            ))}
          </div>
        </section>

        <section className="section-shell content-section" id="experience" aria-labelledby="experience-title">
          <div className="section-heading">
            <p className="section-index">03 / 经历</p>
            <h2 id="experience-title">持续学习，也持续创造</h2>
          </div>
          <ol className="timeline">
            {experiences.map((item) => (
              <li key={item.period}>
                <time>{item.period}</time>
                <div>
                  <h3>{item.role}</h3>
                  <p className="company">{item.company}</p>
                </div>
                <p>{item.description}</p>
              </li>
            ))}
          </ol>
        </section>

        <section className="contact-section" id="contact" aria-labelledby="contact-title">
          <div className="section-shell">
            <p className="section-index">04 / 联系</p>
            <div className="contact-lead">
              <h2 id="contact-title">
                有一个有趣的想法？
                <br />
                一起把它做出来。
              </h2>
              <a className="contact-mail" href="mailto:hello@linchuan.design">
                hello@linchuan.design
                <span aria-hidden="true">↗</span>
              </a>
            </div>
            <ul className="social-list">
              {profile.socials.map((social) => (
                <li key={social.label}>
                  <a
                    href={social.href}
                    target={social.external ? "_blank" : undefined}
                    rel={social.external ? "noreferrer" : undefined}
                    aria-label={
                      social.external
                        ? `在新窗口打开${social.label}`
                        : `通过${social.label}联系`
                    }
                  >
                    <span>{social.label}</span>
                    <strong>{social.value}</strong>
                    <i aria-hidden="true">↗</i>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="section-shell">
          <p>© 2026 {profile.name}</p>
          <p>用好奇心设计，用耐心创造。</p>
          <a href="#top">回到顶部 ↑</a>
        </div>
      </footer>
    </>
  );
}
