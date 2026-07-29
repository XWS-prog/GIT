## Codex 简要介绍

Codex 是 OpenAI 推出的 AI 编程智能体，定位为“智能体的指挥中心”[](https://openai.com/zh-Hans-CN/index/introducing-the-codex-app/?video=1161130375&source=post_page-----ed1328e6ec11---------------------------------------)。它基于 GPT-5-Codex 模型，能够端到端处理复杂、长期运行的编程任务，从设计、编码、测试到部署覆盖软件全生命周期[](https://openai.com/zh-Hans-CN/index/introducing-the-codex-app/?video=1161130375&source=post_page-----ed1328e6ec11---------------------------------------)[](https://openai.com/zh-Hant/index/introducing-codex/)。

核心能力包括：

- **多智能体并行协作**：支持同时运行多个智能体处理不同任务，内置工作树支持避免代码冲突[](https://openai.com/zh-Hans-CN/index/introducing-the-codex-app/?video=1161130375&source=post_page-----ed1328e6ec11---------------------------------------)
    
- **Skill 技能系统**：通过技能包将 Codex 能力从代码生成扩展至信息收集、问题解决、文档撰写等任务，支持 Figma 设计转 UI 代码、图像生成、项目管理和云部署等场景[](https://openai.com/zh-Hans-CN/index/introducing-the-codex-app/?video=1161130375&source=post_page-----ed1328e6ec11---------------------------------------)
    
- **自动化功能**：可按定时任务在后台运行重复性工作，如每日问题分流、CI 失败总结、发布简报生成等[](https://openai.com/zh-Hans-CN/index/introducing-the-codex-app/?video=1161130375&source=post_page-----ed1328e6ec11---------------------------------------)
    
- **多端覆盖**：支持桌面应用（macOS/Windows）、CLI 命令行、IDE 插件和云端环境，通过 ChatGPT 账号统一登录[](https://openai.com/zh-Hans-CN/index/introducing-the-codex-app/?video=1161130375&source=post_page-----ed1328e6ec11---------------------------------------)[](https://openai.com/zh-Hans-CN/index/codex-now-generally-available/?utm_source=www.theaienterprise.io&utm_medium=newseltter&utm_campaign=openai-devday-2025-announces-huge-ai-updates&_bhlid=39da1da03fc86b50fe284a689c827d4f1b0581de)
    
- **Slack 集成与 SDK**：支持在 Slack 中 @Codex 委派任务；提供 SDK 将智能体嵌入自有工作流[](https://openai.com/zh-Hans-CN/index/codex-now-generally-available/?utm_source=www.theaienterprise.io&utm_medium=newseltter&utm_campaign=openai-devday-2025-announces-huge-ai-updates&_bhlid=39da1da03fc86b50fe284a689c827d4f1b0581de)
    

---

## 实际应用展示

### 1. Datadog：系统级代码审查，预防生产事故

Datadog 将 Codex 集成到 PR 审查流程中。通过重建历史事故的拉取请求进行回溯测试，Codex 成功识别出约 **22%** 的事故若经过其审查本可被预防，效果超过其他评估工具[](https://openai.com/zh-Hant/index/datadog/#main)。

工程师反馈：Codex 能指出差异中未涉及模块间的交互、识别跨服务耦合区域缺失的测试覆盖、强调有下游风险的 API 变更——这些都是传统静态分析工具无法捕获的系统级风险[](https://openai.com/zh-Hant/index/datadog/#main)。目前已有 **超过 1,000 名 Datadog 工程师** 定期使用 Codex 进行代码审查。

### 2. Harness：零手写代码构建百万行级产品

Harness 团队进行了一项极限实验：**完全不用手写代码**，仅靠 Codex 构建并交付了一款内部 Beta 版产品。从空代码库开始，五个月后该产品包含约 **100 万行代码**，累计合并约 **1,500 个 PR**，由最初 3 人、后来 7 人的小团队完成——相当于每人每天平均完成 3.5 个 PR[](https://openai.com/zh-Hant-HK/index/harness-engineering/#main)。

关键经验：

- 工程团队重心从“写代码”转向“系统设计与提示工程”
    
- 将知识沉淀为结构化的 `docs/` 目录和精炼的 `AGENTS.md`（约100行）作为导航地图，而非让智能体被海量指令淹没[](https://openai.com/zh-Hant-HK/index/harness-engineering/#main)
    
- 为 Codex 构建可读的观测性工具（日志、指标、追踪），使其能自主调试和验证
    

### 3. 思科：PR 审核时间缩短 50%

思科工程师借助 Codex 加速复杂 PR 审核流程，将审核时间缩短高达 **50%**，使团队能将更多精力投入核心创新工作[](https://openai.com/zh-Hans-CN/index/codex-now-generally-available/?utm_source=www.theaienterprise.io&utm_medium=newseltter&utm_campaign=openai-devday-2025-announces-huge-ai-updates&_bhlid=39da1da03fc86b50fe284a689c827d4f1b0581de)。

---

## Codex vs Claude Code 功能对标矩阵

> 以下对比整合了功能特性、性能基准和实际体验差异。Claude Code 在功能发布节奏上先行优势明显——24项共有功能中，Claude Code 先发布18项，Codex 先发布4项[](https://36kr.com/p/3843714346748424)。

|维度|Codex|Claude Code|
|---|---|---|
|**产品定位**|多端智能体指挥中心（桌面App + CLI + IDE + 云端）[](https://openai.com/zh-Hans-CN/index/introducing-the-codex-app/?video=1161130375&source=post_page-----ed1328e6ec11---------------------------------------)|终端内的自主编程助手[](https://support.claude.com/zh-TW/articles/14553517-claude-code-%E5%B8%B8%E8%A6%8B%E9%96%8B%E7%99%BC%E8%80%85%E4%BD%BF%E7%94%A8%E6%A1%88%E4%BE%8B)|
|**运行模式**|云端异步 + 本地执行，支持后台长时间运行（数小时至数天）[](https://openai.com/zh-Hans-CN/index/introducing-the-codex-app/?video=1161130375&source=post_page-----ed1328e6ec11---------------------------------------)[](https://openai.com/zh-Hant-HK/index/harness-engineering/#main)|终端命令执行，需人工确认破坏性操作[](https://support.claude.com/zh-TW/articles/14553517-claude-code-%E5%B8%B8%E8%A6%8B%E9%96%8B%E7%99%BC%E8%80%85%E4%BD%BF%E7%94%A8%E6%A1%88%E4%BE%8B)|
|**多智能体并行**|✅ 内置多智能体并行协作，支持工作树隔离[](https://openai.com/zh-Hans-CN/index/introducing-the-codex-app/?video=1161130375&source=post_page-----ed1328e6ec11---------------------------------------)|✅ 支持子智能体（Subagents）隔离上下文[](https://36kr.com/p/3843714346748424)|
|**技能系统**|✅ Skill 技能包（采用 SKILL.md 格式）[](https://openai.com/zh-Hans-CN/index/introducing-the-codex-app/?video=1161130375&source=post_page-----ed1328e6ec11---------------------------------------)|✅ 技能系统（采用 SKILL.md 格式）[](https://support.claude.com/zh-TW/articles/14553517-claude-code-%E5%B8%B8%E8%A6%8B%E9%96%8B%E7%99%BC%E8%80%85%E4%BD%BF%E7%94%A8%E6%A1%88%E4%BE%8B)[](https://36kr.com/p/3843714346748424)|
|**目标模式**|✅ Goal mode：设定目标后自主持续运行直至完成[](https://36kr.com/p/3843714346748424)|✅ /goal 命令：跨多回合执行直到条件满足[](https://36kr.com/p/3843714346748424)|
|**沙箱安全**|✅ 开源系统级沙箱，默认限制文件编辑范围，需授权网络访问[](https://openai.com/zh-Hans-CN/index/introducing-the-codex-app/?video=1161130375&source=post_page-----ed1328e6ec11---------------------------------------)|✅ 需用户确认破坏性操作[](https://support.claude.com/zh-TW/articles/14553517-claude-code-%E5%B8%B8%E8%A6%8B%E9%96%8B%E7%99%BC%E8%80%85%E4%BD%BF%E7%94%A8%E6%A1%88%E4%BE%8B)|
|**云端任务**|✅ 云端沙盒环境，任务可脱离本地运行[](https://openai.com/zh-Hant/index/introducing-codex/)|不支持（纯本地）|
|**Slack 集成**|✅ 支持 @Codex 在 Slack 中委派任务[](https://openai.com/zh-Hans-CN/index/codex-now-generally-available/?utm_source=www.theaienterprise.io&utm_medium=newseltter&utm_campaign=openai-devday-2025-announces-huge-ai-updates&_bhlid=39da1da03fc86b50fe284a689c827d4f1b0581de)|不支持|
|**SDK / API**|✅ 提供 TypeScript SDK，支持嵌入自有工作流[](https://openai.com/zh-Hans-CN/index/codex-now-generally-available/?utm_source=www.theaienterprise.io&utm_medium=newseltter&utm_campaign=openai-devday-2025-announces-huge-ai-updates&_bhlid=39da1da03fc86b50fe284a689c827d4f1b0581de)|可通过 MCP 协议扩展[](https://support.claude.com/zh-TW/articles/14553517-claude-code-%E5%B8%B8%E8%A6%8B%E9%96%8B%E7%99%BC%E8%80%85%E4%BD%BF%E7%94%A8%E6%A1%88%E4%BE%8B)|
|**上下文窗口**|标准配置|多云部署可达 **1M 上下文**[](https://zhuanlan.zhihu.com/p/1963924549595824350)|
|**SWE-bench Verified**|**74.5% - 77%**[](https://zhuanlan.zhihu.com/p/1963924549595824350)|**77.2% - 82.0%**[](https://zhuanlan.zhihu.com/p/1963924549595824350)|
|**端到端项目成本**|约 **$2.50**（显著更低）[](https://zhuanlan.zhihu.com/p/1963924549595824350)|约 **$10.26**（约 4 倍）[](https://zhuanlan.zhihu.com/p/1963924549595824350)|
|**表现稳定性**|长任务完成率高，被评价为“更倾向真正完成整个 PR”[](https://zhuanlan.zhihu.com/p/1963924549595824350)[](https://36kr.com/p/3843714346748424)|部分用户反馈会“假装完成”或中途卡住[](https://zhuanlan.zhihu.com/p/1963924549595824350)[](https://36kr.com/p/3843714346748424)|
|**前端 UI 还原度**|一般|**更高**，UI 保真度出色[](https://zhuanlan.zhihu.com/p/1963924549595824350)|
|**适用场景**|后端/算法开发、数据分析、成本敏感的长任务、生产级代码|前端开发、大规模重构、架构规划、文档与图表生成[](https://zhuanlan.zhihu.com/p/1963924549595824350)|
|**周活跃用户**|**500 万+**（含 20% 非开发者）[](https://36kr.com/p/3843714346748424)|约 200 万（第三方估算）[](https://36kr.com/p/3843714346748424)|
|**npm 下载量（30天）**|约 1,400 万次（CLI版）[](https://36kr.com/p/3843714346748424)|约 **4,630 万次**[](https://36kr.com/p/3843714346748424)|

---

### 总结

**Codex** 的优势在于**成本效益、多端覆盖和长任务可靠性**——它更像一个能独立完成端到端工作的 AI 工程师，适合预算有限或需要批量产出生产级代码的场景。Harness 用 7 人团队 + Codex 在 5 个月完成百万行级产品，是这种定位的极致体现[](https://openai.com/zh-Hant-HK/index/harness-engineering/#main)。

**Claude Code** 的优势在于**功能成熟度、前端 UI 还原度和复杂架构规划能力**——它更像一个能力超强的结对编程伙伴，在需要精细控制和高质量文档/图表的场景中表现突出[](https://zhuanlan.zhihu.com/p/1963924549595824350)。Claude Code 在功能发布节奏上领先约 80 天起步[](https://36kr.com/p/3843714346748424)，但 Codex 正在快速追赶，功能差异化窗口正在迅速关闭