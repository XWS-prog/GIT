Open WebUI 是一个**开源的、可自托管的 AI 图形界面**，它的主要目标是为本地运行的大语言模型（LLM）提供一个功能丰富、类似 ChatGPT 的交互体验[](https://cloud.tencent.cn/developer/article/2624052?policyId=1003)[](https://openwebui-doc-zh.pages.dev/mission/#%e6%88%91%e4%bb%ac%e7%9a%84%e6%84%bf%e6%99%af%e5%85%b1%e5%90%8c%e5%a1%91%e9%80%a0%e6%9c%aa%e6%9d%a5)。

你可以把它看作是为本地AI模型配备的一个功能强大的“操作面板”[](https://cloud.tencent.cn/developer/article/2624052?policyId=1003)。它解决了运行大模型时只有命令行界面的痛点，让你能在浏览器中轻松使用、管理AI能力，同时所有数据都掌握在自己手中[](https://cloud.tencent.cn/developer/article/2624052?policyId=1003)[](https://openwebui-doc-zh.pages.dev/mission/#%e6%88%91%e4%bb%ac%e7%9a%84%e6%84%bf%e6%99%af%e5%85%b1%e5%90%8c%e5%a1%91%e9%80%a0%e6%9c%aa%e6%9d%a5)。

### 💡 核心功能一览

Open WebUI 并非一个简单的聊天框，它集成了许多实用功能：

- **多模型管理**：可以轻松地在界面内切换和管理不同的模型（如通过 Ollama 运行的 Llama 3、Qwen 等）[](https://cloud.tencent.cn/developer/article/2624052?policyId=1003)。
    
- **检索增强生成**：支持上传 PDF、Word、图片等文件，让 AI 基于你的文档内容进行回答，适合构建**个人知识库**[](https://huggingface.co/spaces/open-webui/open-webui/blob/main/README.md?code=true)[](https://cloud.tencent.cn/developer/article/2624052?policyId=1003)[](https://huggingface.co/spaces/jscheah/open-webui/blob/cff9619267b1235ad26f899d294d5833b3acd81b/README.md?code=true)。
    
- **联网搜索**：可集成搜索引擎，让模型获取实时信息，回答时效性问题[](https://cloud.tencent.cn/developer/article/2624052?policyId=1003)[](https://github.com/tedsluis/open-webui)[](https://huggingface.co/spaces/jscheah/open-webui/blob/cff9619267b1235ad26f899d294d5833b3acd81b/README.md?code=true)。
    
- **高级对话功能**：支持对话分支、消息编辑、Markdown 渲染、代码高亮等，提供更专业的聊天体验[](https://cloud.tencent.cn/developer/article/2624052?policyId=1003)[](https://github.com/open-webui/docs/blob/3d45edbe/docs/features/chat-conversations/chat-features/index.mdx?plain=1)[](https://openwebui-doc-zh.pages.dev/features/)。
    
- **多用户与权限控制**：支持多用户环境，并具备基于角色的访问控制，适合团队或家庭共享使用[](https://huggingface.co/spaces/open-webui/open-webui/blob/main/README.md?code=true)[](https://cloud.tencent.cn/developer/article/2624052?policyId=1003)[](https://huggingface.co/spaces/jscheah/open-webui/blob/cff9619267b1235ad26f899d294d5833b3acd81b/README.md?code=true)。
    
- **图像生成与编辑**：集成多种图像生成引擎（如 DALL-E、ComfyUI），可直接在对话中创建和编辑图片[](https://huggingface.co/spaces/open-webui/open-webui/blob/main/README.md?code=true)[](https://huggingface.co/spaces/jscheah/open-webui/blob/cff9619267b1235ad26f899d294d5833b3acd81b/README.md?code=true)。
    
- **社区与可扩展性**：通过“Pipelines”插件框架支持自定义功能扩展，如函数调用、使用监控等[](https://huggingface.co/spaces/open-webui/open-webui/blob/main/README.md?code=true)[](https://huggingface.co/spaces/jscheah/open-webui/blob/cff9619267b1235ad26f899d294d5833b3acd81b/README.md?code=true)。
    

### 🚀 如何快速上手

Open WebUI 的部署方式非常灵活，最推荐的方式是使用 Docker，一条命令即可运行[](https://cloud.tencent.cn/developer/article/2624052?policyId=1003)[](https://huggingface.co/spaces/jscheah/open-webui/blob/cff9619267b1235ad26f899d294d5833b3acd81b/README.md?code=true)：

bash

docker run -d -p 3000:8080 \
  -v open-webui:/app/backend/data \
  --name open-webui \
  --restart always \
  ghcr.io/open-webui/open-webui:main

启动后，通过浏览器访问 `http://localhost:3000` 即可[](https://cloud.tencent.cn/developer/article/2624052?policyId=1003)。首次访问需要注册一个管理员账户，之后在设置中连接你的模型后端（如 Ollama）就可以开始使用了[](https://cloud.alauda.cn/knowledge/zh/solutions/How_to_Deploy_and_use_OpenWebUI.html)[](https://cloud.tencent.cn/developer/article/2624052?policyId=1003)。

### ⚠️ 重要提醒：关注许可证更新

需要留意的是，从 v0.6.6 版本（2025年4月）开始，Open WebUI 在 BSD-3-Clause 许可证的基础上，新增了**品牌保护条款**[](https://openwebui-doc-zh.pages.dev/license/#%e4%bf%9d%e6%8c%81-open-webui-%e8%87%aa%e7%94%b1%e5%85%ac%e5%b9%b3%e5%92%8c%e5%8f%af%e6%8c%81%e7%bb%ad)。

这意味着，虽然代码本身仍然是自由开源的，但在部署和分发时，**不能随意更改或删除“Open WebUI”的品牌标识（如名称、Logo）**，除非满足特定条件（如30天内用户数少于50人、是获得书面许可的贡献者等）[](https://openwebui-doc-zh.pages.dev/license/#%e4%bf%9d%e6%8c%81-open-webui-%e8%87%aa%e7%94%b1%e5%85%ac%e5%b9%b3%e5%92%8c%e5%8f%af%e6%8c%81%e7%bb%ad)。这是一个为了保护项目不被恶意利用而采取的措施[](https://openwebui-doc-zh.pages.dev/license/#%e4%bf%9d%e6%8c%81-open-webui-%e8%87%aa%e7%94%b1%e5%85%ac%e5%b9%b3%e5%92%8c%e5%8f%af%e6%8c%81%e7%bb%ad)。