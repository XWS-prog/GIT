## 一、Harness Engineering 简要解析

**Harness Engineering（驾驭工程）** 指的是为 AI Agent（智能体）设计并构建一套完整的**运行环境、约束规则与反馈闭环**的工程方法论[](https://www.sohu.com/a/1022015392_114986?scm=10001.325_13-325_13.0.0-0-0-0-0.5_1334&spm=smpc.channel_248.block3_308_NDdFbm_1_fd.4.1778655109067bAfMeqr_324&_trans_=060008_lym)[](https://zhuanlan.zhihu.com/p/2025639164599608541)。它的核心目标，是让大模型从能“回答问题”的智力引擎，进化为能在真实业务场景中**稳定、可靠、可控**地完成复杂任务的自主执行者[](https://cloud.tencent.com.cn/developer/article/2684701)。

可以用一个经典比喻来理解：**模型是“马”，提供智能与动力；Harness 是“马具”（缰绳、鞍具、控制系统），负责把握方向、控制速度、确保安全**[](https://cloud.tencent.com.cn/developer/article/2684701)[](https://36kr.com/p/3849719632673664)。一个完整的 AI Agent 系统 = **大模型 + Harness**[](https://zhuanlan.zhihu.com/p/2025667582208812643)[](https://cloud.tencent.com.cn/developer/article/2671147)。

Harness Engineering 解决的是 **“执行过程问题”**——如何让模型持续做对、在出错时自我修复，并确保其行为始终在预设边界内[](https://36kr.com/p/3849719632673664)[](https://cloud.tencent.com.cn/developer/article/2700315?policyId=1003)。其典型实践包括：为 Agent 设定项目规则文件（如 `AGENTS.md`）、接入验证闭环（如自动运行测试并将错误反馈给 Agent）、设置权限护栏与沙箱环境等[](https://zhuanlan.zhihu.com/p/2025667582208812643)[](https://36kr.com/p/3849719632673664)[](https://cloud.tencent.com.cn/developer/article/2671147)。

---

## 二、从 Prompt Engineering 到 Context Engineering 到 Harness Engineering 的演变

这一演变并非新旧替代，而是**逐层扩展与包含**的递进关系。每一次演进，都是因为上一阶段解决了“表达”或“信息”问题后，暴露出更深层次的“执行”与“系统”问题[](https://m.sohu.com/a/1047704258_115207/?pvid=000115_3w_a&scm=10001.325_13-325_13.0.0-0-0-0-0.5_1334&spm=smpc.channel_248.block3_308_NDdFbm_1_fd.3.1783537122912aEu2S2Y)[](https://cloud.tencent.com.cn/developer/article/2700315?policyId=1003)。

|阶段|时间|核心问题|关注焦点|关键手段|
|---|---|---|---|---|
|**Prompt Engineering**|2023年[](https://m.sohu.com/a/1047704258_115207/?pvid=000115_3w_a&scm=10001.325_13-325_13.0.0-0-0-0-0.5_1334&spm=smpc.channel_248.block3_308_NDdFbm_1_fd.3.1783537122912aEu2S2Y)|**怎么说清楚？**|**单次输入-输出**的表达优化[](https://zhuanlan.zhihu.com/p/2025667582208812643)。解决人类意图到模型输入的接口问题[](https://zhuanlan.zhihu.com/p/2025667582208812643)。|角色设定、思维链、少样本示例、输出格式约束[](https://cloud.tencent.com.cn/developer/article/2671147)[](https://cloud.tencent.com.cn/developer/article/2700315?policyId=1003)。|
|**Context Engineering**|2024-2025年[](https://cloud.tencent.com.cn/developer/article/2684701)|**给什么信息？**|**模型决策时的完整信息环境**[](https://zhuanlan.zhihu.com/p/2025667582208812643)。管理上下文窗口中的所有内容：系统指令、工具描述、检索到的知识、对话历史[](https://zhuanlan.zhihu.com/p/2025667582208812643)[](https://cloud.tencent.com.cn/developer/article/2684701)。|RAG、上下文压缩与检索、记忆系统、工具调用架构[](https://cloud.tencent.com.cn/developer/article/2684701)[](https://cloud.tencent.com.cn/developer/article/2671147)。|
|**Harness Engineering**|2026年至今[](https://www.sohu.com/a/1022015392_114986?scm=10001.325_13-325_13.0.0-0-0-0-0.5_1334&spm=smpc.channel_248.block3_308_NDdFbm_1_fd.4.1778655109067bAfMeqr_324&_trans_=060008_lym)[](https://m.sohu.com/a/1047704258_115207/?pvid=000115_3w_a&scm=10001.325_13-325_13.0.0-0-0-0-0.5_1334&spm=smpc.channel_248.block3_308_NDdFbm_1_fd.3.1783537122912aEu2S2Y)|**如何让它持续做对？**|**模型运行其中的整个控制系统**[](https://zhuanlan.zhihu.com/p/2025667582208812643)。在 Context 之上，增加执行编排、权限护栏、自动验证、状态持久化、错误恢复与观测性[](https://cloud.tencent.com.cn/developer/article/2684701)[](https://cloud.tencent.com.cn/developer/article/2700315?policyId=1003)。|规则文件（如 `AGENTS.md`）、验证钩子（Hooks）、沙箱环境、子智能体隔离、反馈闭环[](https://zhuanlan.zhihu.com/p/2025667582208812643)[](https://cloud.tencent.com.cn/developer/article/2671147)[](https://github.com/ThibautMelen/agentic-ai-systems/blob/main/foundations/what-changed-2026.md)。|

---

## 三、功能对标矩阵

|功能维度|Prompt Engineering|Context Engineering|Harness Engineering|演进说明|
|---|---|---|---|---|
|**核心关注**|**如何提问**|**看到什么信息**|**如何可靠运行**|从“对话技巧”到“信息环境”再到“系统治理”[](https://cloud.tencent.com.cn/developer/article/2684701)[](https://cloud.tencent.com.cn/developer/article/2700315?policyId=1003)。|
|**优化对象**|单次输入的**措辞与结构**|上下文窗口中的**全部信息**（提示词+检索+工具返回+历史）|包裹模型的**整套外围系统**（规则、工具、验证、状态、观测）|Harness 包含了前两者的优化[](https://m.sohu.com/a/1047704258_115207/?pvid=000115_3w_a&scm=10001.325_13-325_13.0.0-0-0-0-0.5_1334&spm=smpc.channel_248.block3_308_NDdFbm_1_fd.3.1783537122912aEu2S2Y)[](https://zhuanlan.zhihu.com/p/2025667582208812643)。|
|**上下文管理**|仅关注用户输入的提示词。|动态管理整个上下文窗口：注入、检索、压缩、排序。|在前者基础上，增加**上下文隔离**（如用子智能体隔离上下文）和**渐进式披露**（按需加载规范）[](https://zhuanlan.zhihu.com/p/2025667582208812643)[](https://cloud.tencent.com.cn/developer/article/2671147)。|从“写满窗口”到“智慧地管理窗口预算”。|
|**工具调用**|无法直接处理。|在上下文中定义工具，让模型能“看到”并调用[](https://m.sohu.com/a/1047704258_115207/?pvid=000115_3w_a&scm=10001.325_13-325_13.0.0-0-0-0-0.5_1334&spm=smpc.channel_248.block3_308_NDdFbm_1_fd.3.1783537122912aEu2S2Y)。|**管理工具的生命周期**：选择、调用、结果筛选与重构、防止工具过载[](https://zhuanlan.zhihu.com/p/2025667582208812643)[](https://cloud.tencent.com.cn/developer/article/2700315?policyId=1003)。|从“能调用”到“可控、高效地调用”。|
|**状态与记忆**|无状态，每次对话独立。|管理短期记忆（对话缓冲）和长期记忆（持久化存储）[](https://zhuanlan.zhihu.com/p/2025667582208812643)。|在前者基础上，支持**跨会话的复杂任务状态持久化**，实现断点续作[](https://cloud.tencent.com.cn/developer/article/2684701)[](https://zhuanlan.zhihu.com/p/2041595801856725998)。|让 Agent 从“金鱼记忆”升级为能处理小时级任务。|
|**验证与纠错**|无系统级验证，依赖人工判断输出质量。|提供信息以提高正确性，但无自动验证机制[](https://zhuanlan.zhihu.com/p/2025667582208812643)。|**内建验证闭环**：强制运行测试、Lint 检查，将错误反馈给 Agent 驱动修复（Hooks）[](https://zhuanlan.zhihu.com/p/2025667582208812643)[](https://cloud.tencent.com.cn/developer/article/2671147)[](https://github.com/ThibautMelen/agentic-ai-systems/blob/main/foundations/what-changed-2026.md)。|“声称完成”变为“验证完成”[](https://cloud.tencent.com.cn/developer/article/2671147)。|
|**安全与约束**|依赖提示词中的“软性”约束。|无系统级护栏，依赖输入信息的安全性。|**硬性护栏**：权限控制、操作沙箱、敏感操作人工审批（背压机制）[](https://cloud.tencent.com.cn/developer/article/2684701)[](https://zhuanlan.zhihu.com/p/2025639164599608541)[](https://m.bjnews.com.cn/detail/1775178643129477.html)。|从“口头约定”到“机制保障”。|
|**可观测性**|几乎为零。|可追踪信息注入来源，但无执行过程审计。|**全链路可观测**：追踪 Agent 每一步决策、工具调用、成本、错误归因[](https://cloud.tencent.com.cn/developer/article/2684701)[](https://zhuanlan.zhihu.com/p/2041595801856725998)[](https://www.163.com/dy/article/KOKBCPAS05568W0A.html?spss=adap_pc)。|系统从“黑盒”走向“白盒”。|

**一句话总结**：模型决定了智能的**上限**，而 Harness 决定了 AI 能否在真实世界中**可靠地触及**这个上限[](https://cloud.tencent.com.cn/developer/article/2700315?policyId=1003)。