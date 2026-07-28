---
title: "一文看懂：MCP(大模型上下文协议)"
source: "https://zhuanlan.zhihu.com/p/27327515233"
author:
  - "[[AI产品经理大群​]]"
published:
created: 2026-07-28
description: "MCP逐渐被接受，是因为MCP是开放标准。在智能体应用项目开发中可以发现，集成AI模型复杂，现有框架如LangChain Tools、LlamaIndex和Vercel AI SDK存在问题。LangChain和LlamaIndex代码抽象高，商业化过重；Vercel …"
tags:
  - "clippings"
---
[收录于 · 产品与科技前沿](https://www.zhihu.com/column/c_1369676285845929984)

1209 人赞同了该文章

目录

### MCP逐渐被接受，是因为MCP是开放标准。在智能体应用项目开发中可以发现，集成AI模型复杂，现有框架如LangChain Tools、LlamaIndex和Vercel AI SDK存在问题。LangChain和LlamaIndex代码抽象高，商业化过重；Vercel AI SDK与Nextjs绑定过深。

MCP的优势：一是开放标准利于服务商开发 [API](https://zhida.zhihu.com/search?content_id=254488153&content_type=Article&match_order=1&q=API&zd_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ6aGlkYV9zZXJ2ZXIiLCJleHAiOjE3ODUzOTg1NTIsInEiOiJBUEkiLCJ6aGlkYV9zb3VyY2UiOiJlbnRpdHkiLCJjb250ZW50X2lkIjoyNTQ0ODgxNTMsImNvbnRlbnRfdHlwZSI6IkFydGljbGUiLCJtYXRjaF9vcmRlciI6MSwiemRfdG9rZW4iOm51bGx9.2T7LqJZsYMfkjAPZodhH_5p7048em74M2VFUQl0VWtk&zhida_source=entity) ，二是避免重复造轮子，可利用现有MCP服务增强Agent。

> 本文部分参考 [guangzhengli.com/blog/z](https://link.zhihu.com/?target=https%3A//guangzhengli.com/blog/zh/model-context-protocol/)

## 一、什么是MCP（Model Context Protocol）

### 定义

MCP（Model Context Protocol，模型上下文协议） ，2024年11月底，由 [Anthropic](https://zhida.zhihu.com/search?content_id=254488153&content_type=Article&match_order=1&q=Anthropic&zd_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ6aGlkYV9zZXJ2ZXIiLCJleHAiOjE3ODUzOTg1NTIsInEiOiJBbnRocm9waWMiLCJ6aGlkYV9zb3VyY2UiOiJlbnRpdHkiLCJjb250ZW50X2lkIjoyNTQ0ODgxNTMsImNvbnRlbnRfdHlwZSI6IkFydGljbGUiLCJtYXRjaF9vcmRlciI6MSwiemRfdG9rZW4iOm51bGx9.JNM_kvMSrQAkirmnGiZmZfis0EmaoM1AKfzIyCXvk2w&zhida_source=entity) 推出的一种开放标准，旨在统一大模型与 [外部数据源](https://zhida.zhihu.com/search?content_id=254488153&content_type=Article&match_order=1&q=%E5%A4%96%E9%83%A8%E6%95%B0%E6%8D%AE%E6%BA%90&zd_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ6aGlkYV9zZXJ2ZXIiLCJleHAiOjE3ODUzOTg1NTIsInEiOiLlpJbpg6jmlbDmja7mupAiLCJ6aGlkYV9zb3VyY2UiOiJlbnRpdHkiLCJjb250ZW50X2lkIjoyNTQ0ODgxNTMsImNvbnRlbnRfdHlwZSI6IkFydGljbGUiLCJtYXRjaF9vcmRlciI6MSwiemRfdG9rZW4iOm51bGx9.pGCPEYl5s0yJsUIcv1sJvOyuWm2coQ9IhBo0n2PH5EM&zhida_source=entity) 和工具之间的 [通信协议](https://zhida.zhihu.com/search?content_id=254488153&content_type=Article&match_order=1&q=%E9%80%9A%E4%BF%A1%E5%8D%8F%E8%AE%AE&zd_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ6aGlkYV9zZXJ2ZXIiLCJleHAiOjE3ODUzOTg1NTIsInEiOiLpgJrkv6HljY_orq4iLCJ6aGlkYV9zb3VyY2UiOiJlbnRpdHkiLCJjb250ZW50X2lkIjoyNTQ0ODgxNTMsImNvbnRlbnRfdHlwZSI6IkFydGljbGUiLCJtYXRjaF9vcmRlciI6MSwiemRfdG9rZW4iOm51bGx9.coUJHGkAa01gwHVavhf2qtD01MGJQ6Hxn1XvEGZ4UOw&zhida_source=entity) 。MCP 的主要目的在于解决当前 AI 模型因 [数据孤岛](https://zhida.zhihu.com/search?content_id=254488153&content_type=Article&match_order=1&q=%E6%95%B0%E6%8D%AE%E5%AD%A4%E5%B2%9B&zd_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ6aGlkYV9zZXJ2ZXIiLCJleHAiOjE3ODUzOTg1NTIsInEiOiLmlbDmja7lraTlspsiLCJ6aGlkYV9zb3VyY2UiOiJlbnRpdHkiLCJjb250ZW50X2lkIjoyNTQ0ODgxNTMsImNvbnRlbnRfdHlwZSI6IkFydGljbGUiLCJtYXRjaF9vcmRlciI6MSwiemRfdG9rZW4iOm51bGx9.AQY-aKMds1lzm3LFyBluLf8ZjIZY_4g_nwng3BXljOE&zhida_source=entity) 限制而无法充分发挥潜力的难题，MCP 使得 AI 应用能够安全地访问和操作本地及远程数据，为 AI 应用提供了连接万物的接口。

> Function Calling是AI模型调用函数的机制，MCP是一个标准协议，使大模型与API无缝交互，而AI Agent是一个自主运行的智能系统，利用Function Calling和MCP来分析和执行任务，实现特定目标。

### MCP 的价值

举个栗子，在过去，为了让大模型等 AI 应用使用数据，要么复制粘贴，要么上传知识库，非常局限。

即使是最强大模型也会受到数据隔离的限制，形成 [信息孤岛](https://zhida.zhihu.com/search?content_id=254488153&content_type=Article&match_order=1&q=%E4%BF%A1%E6%81%AF%E5%AD%A4%E5%B2%9B&zd_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ6aGlkYV9zZXJ2ZXIiLCJleHAiOjE3ODUzOTg1NTIsInEiOiLkv6Hmga_lraTlspsiLCJ6aGlkYV9zb3VyY2UiOiJlbnRpdHkiLCJjb250ZW50X2lkIjoyNTQ0ODgxNTMsImNvbnRlbnRfdHlwZSI6IkFydGljbGUiLCJtYXRjaF9vcmRlciI6MSwiemRfdG9rZW4iOm51bGx9.m8XYipRyvmA3fXznmG3D2kh-TLIvD-kTcslu5szK-w4&zhida_source=entity) ，要做出更强的大模型，每个新数据源都需要自己重新定制实现，使真正互联的系统难以扩展，存在很多的局限性。

现在，MCP 可以直接在 AI 与数据（包括本地数据和互联网数据）之间架起一座桥梁，通过 MCP 服务器和 [MCP 客户端](https://zhida.zhihu.com/search?content_id=254488153&content_type=Article&match_order=1&q=MCP+%E5%AE%A2%E6%88%B7%E7%AB%AF&zd_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ6aGlkYV9zZXJ2ZXIiLCJleHAiOjE3ODUzOTg1NTIsInEiOiJNQ1Ag5a6i5oi356uvIiwiemhpZGFfc291cmNlIjoiZW50aXR5IiwiY29udGVudF9pZCI6MjU0NDg4MTUzLCJjb250ZW50X3R5cGUiOiJBcnRpY2xlIiwibWF0Y2hfb3JkZXIiOjEsInpkX3Rva2VuIjpudWxsfQ.006tRz9_5KDNma5Lrm0G_EZa4XGtcgeDAVYOpSHg8_0&zhida_source=entity) ，大家只要都遵循这套协议，就能实现“ [万物互联](https://zhida.zhihu.com/search?content_id=254488153&content_type=Article&match_order=1&q=%E4%B8%87%E7%89%A9%E4%BA%92%E8%81%94&zd_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ6aGlkYV9zZXJ2ZXIiLCJleHAiOjE3ODUzOTg1NTIsInEiOiLkuIfniankupLogZQiLCJ6aGlkYV9zb3VyY2UiOiJlbnRpdHkiLCJjb250ZW50X2lkIjoyNTQ0ODgxNTMsImNvbnRlbnRfdHlwZSI6IkFydGljbGUiLCJtYXRjaF9vcmRlciI6MSwiemRfdG9rZW4iOm51bGx9.1WiX48mdaU0JwYKi7YEz5x0-6Q7oYjLBTYuAEiXGnz4&zhida_source=entity) ”。

有了MCP，可以和数据和 [文件系统](https://zhida.zhihu.com/search?content_id=254488153&content_type=Article&match_order=1&q=%E6%96%87%E4%BB%B6%E7%B3%BB%E7%BB%9F&zd_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ6aGlkYV9zZXJ2ZXIiLCJleHAiOjE3ODUzOTg1NTIsInEiOiLmlofku7bns7vnu58iLCJ6aGlkYV9zb3VyY2UiOiJlbnRpdHkiLCJjb250ZW50X2lkIjoyNTQ0ODgxNTMsImNvbnRlbnRfdHlwZSI6IkFydGljbGUiLCJtYXRjaF9vcmRlciI6MSwiemRfdG9rZW4iOm51bGx9.yH7NFUfBPbFgNRDJyiw6DswrDXkcvLVPLDqci9hB7Lg&zhida_source=entity) 、开发工具、Web 和浏览器自动化、生产力和通信、各种社区生态能力全部集成，实现强大的协作工作能力，它的价值远不可估量。

![](https://picx.zhimg.com/v2-fa3cdcd616cd3dc22732fa3f529cc7f7_1440w.jpg)

### MCP 与 Function Calling 的区别

- MCP（Model Context Protocol），模型上下文协议
- Function Calling，函数调用

这两种技术都旨在增强 AI 模型与外部数据的交互能力，但 MCP 不止可以增强 AI 模型，还可以连接其他的应用系统。

![](https://pic4.zhimg.com/v2-b82dc0e2da4a258438b84484d1af8319_1440w.jpg)

### 数据安全性

这样一个理想的“万物互联” [生态系统](https://zhida.zhihu.com/search?content_id=254488153&content_type=Article&match_order=1&q=%E7%94%9F%E6%80%81%E7%B3%BB%E7%BB%9F&zd_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ6aGlkYV9zZXJ2ZXIiLCJleHAiOjE3ODUzOTg1NTIsInEiOiLnlJ_mgIHns7vnu58iLCJ6aGlkYV9zb3VyY2UiOiJlbnRpdHkiLCJjb250ZW50X2lkIjoyNTQ0ODgxNTMsImNvbnRlbnRfdHlwZSI6IkFydGljbGUiLCJtYXRjaF9vcmRlciI6MSwiemRfdG9rZW4iOm51bGx9.1CGJVoI4jGyv8M5AhG6IczMj7s_w4bZbRuAbIWIm9Bk&zhida_source=entity) 看着很让人着迷。

但是大家是不是担心通过 MCP Server 暴露出来的数据会泄露或被非法访问，这个头疼的问题 MCP 也考虑到了。

MCP 通过标准化的数据访问接口，大大减少了直接接触 [敏感数据](https://zhida.zhihu.com/search?content_id=254488153&content_type=Article&match_order=1&q=%E6%95%8F%E6%84%9F%E6%95%B0%E6%8D%AE&zd_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ6aGlkYV9zZXJ2ZXIiLCJleHAiOjE3ODUzOTg1NTIsInEiOiLmlY_mhJ_mlbDmja4iLCJ6aGlkYV9zb3VyY2UiOiJlbnRpdHkiLCJjb250ZW50X2lkIjoyNTQ0ODgxNTMsImNvbnRlbnRfdHlwZSI6IkFydGljbGUiLCJtYXRjaF9vcmRlciI6MSwiemRfdG9rZW4iOm51bGx9.CyvCjyaijHcpq9BS2YX5KnxAUPWEw7gkVMq-Zxlo3nk&zhida_source=entity) 的环节，降低了数据泄露的风险。

还有，MCP 内置了安全机制，确保只有经过验证的请求才能访问特定资源，相当于在 [数据安全](https://zhida.zhihu.com/search?content_id=254488153&content_type=Article&match_order=2&q=%E6%95%B0%E6%8D%AE%E5%AE%89%E5%85%A8&zd_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ6aGlkYV9zZXJ2ZXIiLCJleHAiOjE3ODUzOTg1NTIsInEiOiLmlbDmja7lronlhagiLCJ6aGlkYV9zb3VyY2UiOiJlbnRpdHkiLCJjb250ZW50X2lkIjoyNTQ0ODgxNTMsImNvbnRlbnRfdHlwZSI6IkFydGljbGUiLCJtYXRjaF9vcmRlciI6MiwiemRfdG9rZW4iOm51bGx9.KO-U5QeBLUFvs7yIuTT1fVoitN6WBHpgB0dLD6oocc0&zhida_source=entity) 又加上了一道防线。同时，MCP协议还支持多种 [加密算法](https://zhida.zhihu.com/search?content_id=254488153&content_type=Article&match_order=1&q=%E5%8A%A0%E5%AF%86%E7%AE%97%E6%B3%95&zd_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ6aGlkYV9zZXJ2ZXIiLCJleHAiOjE3ODUzOTg1NTIsInEiOiLliqDlr4bnrpfms5UiLCJ6aGlkYV9zb3VyY2UiOiJlbnRpdHkiLCJjb250ZW50X2lkIjoyNTQ0ODgxNTMsImNvbnRlbnRfdHlwZSI6IkFydGljbGUiLCJtYXRjaF9vcmRlciI6MSwiemRfdG9rZW4iOm51bGx9.R76uP4ekrVp9P6CB4ffPl_5GvSKq9jfTiKCLmD0-OZg&zhida_source=entity) ，以确保数据在传输过程中的安全性。

例如，MCP 服务器自己控制资源，不需要将 [API 密钥](https://zhida.zhihu.com/search?content_id=254488153&content_type=Article&match_order=1&q=API+%E5%AF%86%E9%92%A5&zd_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ6aGlkYV9zZXJ2ZXIiLCJleHAiOjE3ODUzOTg1NTIsInEiOiJBUEkg5a-G6ZKlIiwiemhpZGFfc291cmNlIjoiZW50aXR5IiwiY29udGVudF9pZCI6MjU0NDg4MTUzLCJjb250ZW50X3R5cGUiOiJBcnRpY2xlIiwibWF0Y2hfb3JkZXIiOjEsInpkX3Rva2VuIjpudWxsfQ.4UWGnBaQellekxnJgB_XCqV5O5hrH4T3TidzhlmO0N4&zhida_source=entity) 等敏感信息提供给 [LLM](https://zhida.zhihu.com/search?content_id=254488153&content_type=Article&match_order=1&q=LLM&zd_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ6aGlkYV9zZXJ2ZXIiLCJleHAiOjE3ODUzOTg1NTIsInEiOiJMTE0iLCJ6aGlkYV9zb3VyY2UiOiJlbnRpdHkiLCJjb250ZW50X2lkIjoyNTQ0ODgxNTMsImNvbnRlbnRfdHlwZSI6IkFydGljbGUiLCJtYXRjaF9vcmRlciI6MSwiemRfdG9rZW4iOm51bGx9.cAKWKUHZDDZsJYmKs9i_FYsk6qtXIEFHnQEIXtxuCkg&zhida_source=entity) 提供商。这样一来，即使 LLM 提供商受到攻击，攻击者也无法获取到这些敏感信息。

不过，MCP 这套协议/标准的强大，不仅仅是因为他的理念，还因为其生态的繁荣。

### 工作原理

MCP 协议采用了一种独特的 [架构设计](https://zhida.zhihu.com/search?content_id=254488153&content_type=Article&match_order=1&q=%E6%9E%B6%E6%9E%84%E8%AE%BE%E8%AE%A1&zd_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ6aGlkYV9zZXJ2ZXIiLCJleHAiOjE3ODUzOTg1NTIsInEiOiLmnrbmnoTorr7orqEiLCJ6aGlkYV9zb3VyY2UiOiJlbnRpdHkiLCJjb250ZW50X2lkIjoyNTQ0ODgxNTMsImNvbnRlbnRfdHlwZSI6IkFydGljbGUiLCJtYXRjaF9vcmRlciI6MSwiemRfdG9rZW4iOm51bGx9.PArIqHE4Ls0-hSUAMz4HWv5ulkrlV_rl6RU7eUf5Z3Y&zhida_source=entity) ，它将 LLM 与资源之间的通信划分为三个主要部分：客户端、服务器和资源。

客户端负责发送请求给 MCP 服务器，服务器则将这些请求转发给相应的资源。这种分层的设计使得 MCP 协议能够更好地控制 [访问权限](https://zhida.zhihu.com/search?content_id=254488153&content_type=Article&match_order=1&q=%E8%AE%BF%E9%97%AE%E6%9D%83%E9%99%90&zd_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ6aGlkYV9zZXJ2ZXIiLCJleHAiOjE3ODUzOTg1NTIsInEiOiLorr_pl67mnYPpmZAiLCJ6aGlkYV9zb3VyY2UiOiJlbnRpdHkiLCJjb250ZW50X2lkIjoyNTQ0ODgxNTMsImNvbnRlbnRfdHlwZSI6IkFydGljbGUiLCJtYXRjaF9vcmRlciI6MSwiemRfdG9rZW4iOm51bGx9.Z0TB-b-2ogd2AYKHAS8OlFQAN_vZSQ7l6Oy8aRzJwug&zhida_source=entity) ，确保只有经过授权的用户才能访问特定的资源。

以下是 MCP 的基本工作流程：

- 初始化连接：客户端向服务器发送连接请求，建立通信通道。
- 发送请求：客户端根据需求构建请求消息，并发送给服务器。
- 处理请求：服务器接收到请求后，解析请求内容，执行相应的操作（如查询数据库、读取文件等）。
- 返回结果：服务器将处理结果封装成响应消息，发送回客户端。
- 断开连接：任务完成后，客户端可以主动关闭连接或等待服务器超时关闭。
![](https://pic2.zhimg.com/v2-bb82edf5b8651051be151c279e7679e1_1440w.jpg)

### MCP 核心架构

MCP 遵循客户端-服务器架构（ [client-server](https://zhida.zhihu.com/search?content_id=254488153&content_type=Article&match_order=1&q=client-server&zd_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ6aGlkYV9zZXJ2ZXIiLCJleHAiOjE3ODUzOTg1NTIsInEiOiJjbGllbnQtc2VydmVyIiwiemhpZGFfc291cmNlIjoiZW50aXR5IiwiY29udGVudF9pZCI6MjU0NDg4MTUzLCJjb250ZW50X3R5cGUiOiJBcnRpY2xlIiwibWF0Y2hfb3JkZXIiOjEsInpkX3Rva2VuIjpudWxsfQ.0RzXzLjOORbU-Lh0A-2NQB9BIrrUZw2oeqq94VBHD_Y&zhida_source=entity) ），其中包含以下几个核心概念：

- MCP 主机（MCP Hosts）：发起请求的 LLM 应用程序（例如 [Claude Desktop](https://zhida.zhihu.com/search?content_id=254488153&content_type=Article&match_order=1&q=Claude+Desktop&zd_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ6aGlkYV9zZXJ2ZXIiLCJleHAiOjE3ODUzOTg1NTIsInEiOiJDbGF1ZGUgRGVza3RvcCIsInpoaWRhX3NvdXJjZSI6ImVudGl0eSIsImNvbnRlbnRfaWQiOjI1NDQ4ODE1MywiY29udGVudF90eXBlIjoiQXJ0aWNsZSIsIm1hdGNoX29yZGVyIjoxLCJ6ZF90b2tlbiI6bnVsbH0.6PA6LwOKCTTcTyQsBsLRZ1YYb4iow92DPqjrK8RbvFM&zhida_source=entity) 、IDE 或 AI 工具）。
- MCP 客户端（MCP Clients）：在主机程序内部，与 MCP server 保持 1:1 的连接。
- MCP 服务器（MCP Servers）：为 MCP client 提供上下文、工具和 prompt 信息。
- 本地资源（Local Resources）：本地计算机中可供 MCP server 安全访问的资源（例如文件、数据库）。
- 远程资源（Remote Resources）：MCP server 可以连接到的远程资源（例如通过 API）。
![](https://picx.zhimg.com/v2-492a176fa0a06b585e752dc676d28b77_1440w.jpg)

**MCP Client**

MCP client 充当 LLM 和 MCP server 之间的桥梁，MCP client 的工作流程如下：

- MCP client 首先从 MCP server 获取可用的工具列表。
- 将用户的查询连同工具描述通过 function calling 一起发送给 LLM。
- LLM 决定是否需要使用工具以及使用哪些工具。
- 如果需要使用工具，MCP client 会通过 MCP server 执行相应的工具调用。
- 工具调用的结果会被发送回 LLM。
- LLM 基于所有信息生成自然语言响应。
- 最后将响应展示给用户。

Claude Desktop 和Cursor都支持了MCP Server接入能力，它们就是作为 MCP client来连接某个MCP Server感知和实现调用。

**MCP Server**

[MCP server](https://zhida.zhihu.com/search?content_id=254488153&content_type=Article&match_order=7&q=MCP+server&zd_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ6aGlkYV9zZXJ2ZXIiLCJleHAiOjE3ODUzOTg1NTIsInEiOiJNQ1Agc2VydmVyIiwiemhpZGFfc291cmNlIjoiZW50aXR5IiwiY29udGVudF9pZCI6MjU0NDg4MTUzLCJjb250ZW50X3R5cGUiOiJBcnRpY2xlIiwibWF0Y2hfb3JkZXIiOjcsInpkX3Rva2VuIjpudWxsfQ.ASrZ5c5OAzdneCH6HzIMC57g5YrK_oELMexx-f9ifuI&zhida_source=entity) 是 MCP 架构中的关键组件，它可以提供 3 种主要类型的功能：

- 资源（Resources）：类似文件的数据，可以被客户端读取，如 API 响应或文件内容。
- 工具（Tools）：可以被 LLM 调用的函数（需要用户批准）。
- 提示（Prompts）：预先编写的模板，帮助用户完成特定任务。

这些功能使 MCP server 能够为 AI 应用提供丰富的上下文信息和操作能力，从而增强 LLM 的实用性和灵活性。

你可以在 MCP Servers [Repository](https://zhida.zhihu.com/search?content_id=254488153&content_type=Article&match_order=1&q=Repository&zd_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ6aGlkYV9zZXJ2ZXIiLCJleHAiOjE3ODUzOTg1NTIsInEiOiJSZXBvc2l0b3J5IiwiemhpZGFfc291cmNlIjoiZW50aXR5IiwiY29udGVudF9pZCI6MjU0NDg4MTUzLCJjb250ZW50X3R5cGUiOiJBcnRpY2xlIiwibWF0Y2hfb3JkZXIiOjEsInpkX3Rva2VuIjpudWxsfQ.M2nlamiD_gGc4CswbpK0eNu-ns0Ent3M_Ig11SZsx8E&zhida_source=entity) 和 Awesome MCP Servers 这两个 repo 中找到许多由社区实现的 MCP server。使用 TypeScript 编写的 MCP server 可以通过 npx 命令来运行，使用 [Python](https://zhida.zhihu.com/search?content_id=254488153&content_type=Article&match_order=1&q=Python&zd_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ6aGlkYV9zZXJ2ZXIiLCJleHAiOjE3ODUzOTg1NTIsInEiOiJQeXRob24iLCJ6aGlkYV9zb3VyY2UiOiJlbnRpdHkiLCJjb250ZW50X2lkIjoyNTQ0ODgxNTMsImNvbnRlbnRfdHlwZSI6IkFydGljbGUiLCJtYXRjaF9vcmRlciI6MSwiemRfdG9rZW4iOm51bGx9.sH9MWTKi7m2x0-WNl9HFWje7rUav0jl2glf_ZEE50IA&zhida_source=entity) 编写的 MCP server 可以通过 uvx 命令来运行。

### 通信机制

MCP 协议支持两种主要的通信机制：基于标准输入输出的本地通信和基于 [SSE](https://zhida.zhihu.com/search?content_id=254488153&content_type=Article&match_order=1&q=SSE&zd_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ6aGlkYV9zZXJ2ZXIiLCJleHAiOjE3ODUzOTg1NTIsInEiOiJTU0UiLCJ6aGlkYV9zb3VyY2UiOiJlbnRpdHkiLCJjb250ZW50X2lkIjoyNTQ0ODgxNTMsImNvbnRlbnRfdHlwZSI6IkFydGljbGUiLCJtYXRjaF9vcmRlciI6MSwiemRfdG9rZW4iOm51bGx9.rMDMZetC-VGKH8a69DSLD5jFAwkTop8Vb023aGDqajs&zhida_source=entity) （ [Server-Sent Events](https://link.zhihu.com/?target=https%3A//en.wikipedia.org/wiki/Server-sent_events) ）的远程通信。

这两种机制都使用 [JSON-RPC 2.0](https://link.zhihu.com/?target=https%3A//www.jsonrpc.org/specification) 格式进行消息传输，确保了通信的标准化和 [可扩展性](https://zhida.zhihu.com/search?content_id=254488153&content_type=Article&match_order=1&q=%E5%8F%AF%E6%89%A9%E5%B1%95%E6%80%A7&zd_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ6aGlkYV9zZXJ2ZXIiLCJleHAiOjE3ODUzOTg1NTIsInEiOiLlj6_mianlsZXmgKciLCJ6aGlkYV9zb3VyY2UiOiJlbnRpdHkiLCJjb250ZW50X2lkIjoyNTQ0ODgxNTMsImNvbnRlbnRfdHlwZSI6IkFydGljbGUiLCJtYXRjaF9vcmRlciI6MSwiemRfdG9rZW4iOm51bGx9.wUDtxa0nd-qyUyN3k0SOR5QrPI36D2oH18Uvbe5ERfE&zhida_source=entity) 。

- 本地通信 **：** 通过 stdio 传输数据，适用于在同一台机器上运行的客户端和服务器之间的通信。
- 远程通信 **：** 利用 SSE 与 [HTTP](https://zhida.zhihu.com/search?content_id=254488153&content_type=Article&match_order=1&q=HTTP&zd_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ6aGlkYV9zZXJ2ZXIiLCJleHAiOjE3ODUzOTg1NTIsInEiOiJIVFRQIiwiemhpZGFfc291cmNlIjoiZW50aXR5IiwiY29udGVudF9pZCI6MjU0NDg4MTUzLCJjb250ZW50X3R5cGUiOiJBcnRpY2xlIiwibWF0Y2hfb3JkZXIiOjEsInpkX3Rva2VuIjpudWxsfQ.F560Se8MYKC1TT4ZD-T6umQh0WTotNu095EvJM_87q0&zhida_source=entity) 结合，实现跨网络的实时 [数据传输](https://zhida.zhihu.com/search?content_id=254488153&content_type=Article&match_order=1&q=%E6%95%B0%E6%8D%AE%E4%BC%A0%E8%BE%93&zd_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ6aGlkYV9zZXJ2ZXIiLCJleHAiOjE3ODUzOTg1NTIsInEiOiLmlbDmja7kvKDovpMiLCJ6aGlkYV9zb3VyY2UiOiJlbnRpdHkiLCJjb250ZW50X2lkIjoyNTQ0ODgxNTMsImNvbnRlbnRfdHlwZSI6IkFydGljbGUiLCJtYXRjaF9vcmRlciI6MSwiemRfdG9rZW4iOm51bGx9.RvWpBdjBNEMPn5kGKWIVUwQ_M6ByTOgH_RAYE4vzDpU&zhida_source=entity) ，适用于需要访问远程资源或 [分布式部署](https://zhida.zhihu.com/search?content_id=254488153&content_type=Article&match_order=1&q=%E5%88%86%E5%B8%83%E5%BC%8F%E9%83%A8%E7%BD%B2&zd_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ6aGlkYV9zZXJ2ZXIiLCJleHAiOjE3ODUzOTg1NTIsInEiOiLliIbluIPlvI_pg6jnvbIiLCJ6aGlkYV9zb3VyY2UiOiJlbnRpdHkiLCJjb250ZW50X2lkIjoyNTQ0ODgxNTMsImNvbnRlbnRfdHlwZSI6IkFydGljbGUiLCJtYXRjaF9vcmRlciI6MSwiemRfdG9rZW4iOm51bGx9.66jcUSAj1Pe1lm0k0AHMArAqRqqShTJGZ-Ip9SWN_Xw&zhida_source=entity) 的场景。

## 二、MCP的功能与应用：

### 如何使用 MCP

如果你还没有尝试过如何使用 MCP 的话，我们可以考虑用 Cursor(本人只尝试过 Cursor)，Claude Desktop 或者 Cline 来体验一下。

当然，我们并不需要自己开发 MCP Servers，MCP 的好处就是通用、标准，所以 [开发者](https://zhida.zhihu.com/search?content_id=254488153&content_type=Article&match_order=1&q=%E5%BC%80%E5%8F%91%E8%80%85&zd_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ6aGlkYV9zZXJ2ZXIiLCJleHAiOjE3ODUzOTg1NTIsInEiOiLlvIDlj5HogIUiLCJ6aGlkYV9zb3VyY2UiOiJlbnRpdHkiLCJjb250ZW50X2lkIjoyNTQ0ODgxNTMsImNvbnRlbnRfdHlwZSI6IkFydGljbGUiLCJtYXRjaF9vcmRlciI6MSwiemRfdG9rZW4iOm51bGx9.zG6oyJhRZfRZ1aiP42hJeRtLAppbxiqbB7RKODTpeV0&zhida_source=entity) 并不需要重复造轮子（但是学习可以重复造轮子）。

首先推荐的是官方组织的一些 Server： [官方的 MCP Server 列表](https://link.zhihu.com/?target=https%3A//github.com/modelcontextprotocol/servers) 。

目前社区的 MCP Server 还是比较混乱，有很多缺少教程和文档，很多的代码功能也有问题，我们可以自行尝试一下 [Cursor Directory](https://link.zhihu.com/?target=https%3A//cursor.directory/) 的一些例子，具体的配置和实战笔者就不细讲了，大家可以参考官方文档。

### MCP的功能

MCP通过引入多样化的MCP Server能力，显著增强了AI工具的功能，例如我们常用的Cursor和Claude。以下是一些官方参考服务器，展示了MCP的核心功能和SDK的应用：

[数据与文件系统](https://zhida.zhihu.com/search?content_id=254488153&content_type=Article&match_order=1&q=%E6%95%B0%E6%8D%AE%E4%B8%8E%E6%96%87%E4%BB%B6%E7%B3%BB%E7%BB%9F&zd_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ6aGlkYV9zZXJ2ZXIiLCJleHAiOjE3ODUzOTg1NTIsInEiOiLmlbDmja7kuI7mlofku7bns7vnu58iLCJ6aGlkYV9zb3VyY2UiOiJlbnRpdHkiLCJjb250ZW50X2lkIjoyNTQ0ODgxNTMsImNvbnRlbnRfdHlwZSI6IkFydGljbGUiLCJtYXRjaF9vcmRlciI6MSwiemRfdG9rZW4iOm51bGx9.BGga9fLHR1TFbkMjphDzMFfLCP_G9Iiknek2rqf1i6Y&zhida_source=entity) ：

文件系统：提供安全文件操作，带可配置的 [访问控制](https://zhida.zhihu.com/search?content_id=254488153&content_type=Article&match_order=1&q=%E8%AE%BF%E9%97%AE%E6%8E%A7%E5%88%B6&zd_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ6aGlkYV9zZXJ2ZXIiLCJleHAiOjE3ODUzOTg1NTIsInEiOiLorr_pl67mjqfliLYiLCJ6aGlkYV9zb3VyY2UiOiJlbnRpdHkiLCJjb250ZW50X2lkIjoyNTQ0ODgxNTMsImNvbnRlbnRfdHlwZSI6IkFydGljbGUiLCJtYXRjaF9vcmRlciI6MSwiemRfdG9rZW4iOm51bGx9.Q5xAbJAkrOxRCUOsj84-hDtySjTkY8e4RklcJc17ErQ&zhida_source=entity) 。

[PostgreSQL](https://zhida.zhihu.com/search?content_id=254488153&content_type=Article&match_order=1&q=PostgreSQL&zd_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ6aGlkYV9zZXJ2ZXIiLCJleHAiOjE3ODUzOTg1NTIsInEiOiJQb3N0Z3JlU1FMIiwiemhpZGFfc291cmNlIjoiZW50aXR5IiwiY29udGVudF9pZCI6MjU0NDg4MTUzLCJjb250ZW50X3R5cGUiOiJBcnRpY2xlIiwibWF0Y2hfb3JkZXIiOjEsInpkX3Rva2VuIjpudWxsfQ.eQbz8aN3FUCUDUXajZ5sXr74fQV23aDg0aSNQXSX_Cc&zhida_source=entity) ：提供只读数据库访问，具备架构检查功能。

[SQLite](https://zhida.zhihu.com/search?content_id=254488153&content_type=Article&match_order=1&q=SQLite&zd_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ6aGlkYV9zZXJ2ZXIiLCJleHAiOjE3ODUzOTg1NTIsInEiOiJTUUxpdGUiLCJ6aGlkYV9zb3VyY2UiOiJlbnRpdHkiLCJjb250ZW50X2lkIjoyNTQ0ODgxNTMsImNvbnRlbnRfdHlwZSI6IkFydGljbGUiLCJtYXRjaF9vcmRlciI6MSwiemRfdG9rZW4iOm51bGx9.LhP5sbMZ2KuiAS0wzBilJOxrZCBWSenLO77LoUjbSNM&zhida_source=entity) ：支持数据库交互和 [商业智能](https://zhida.zhihu.com/search?content_id=254488153&content_type=Article&match_order=1&q=%E5%95%86%E4%B8%9A%E6%99%BA%E8%83%BD&zd_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ6aGlkYV9zZXJ2ZXIiLCJleHAiOjE3ODUzOTg1NTIsInEiOiLllYbkuJrmmbrog70iLCJ6aGlkYV9zb3VyY2UiOiJlbnRpdHkiLCJjb250ZW50X2lkIjoyNTQ0ODgxNTMsImNvbnRlbnRfdHlwZSI6IkFydGljbGUiLCJtYXRjaF9vcmRlciI6MSwiemRfdG9rZW4iOm51bGx9.hVofWPZiJH92E_57B4YvN3hcWq4lQ4dn-4dMDMFEQaI&zhida_source=entity) 功能。

Google Drive：实现Google Drive的文件访问和搜索功能。

开发工具：

[Git](https://zhida.zhihu.com/search?content_id=254488153&content_type=Article&match_order=1&q=Git&zd_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ6aGlkYV9zZXJ2ZXIiLCJleHAiOjE3ODUzOTg1NTIsInEiOiJHaXQiLCJ6aGlkYV9zb3VyY2UiOiJlbnRpdHkiLCJjb250ZW50X2lkIjoyNTQ0ODgxNTMsImNvbnRlbnRfdHlwZSI6IkFydGljbGUiLCJtYXRjaF9vcmRlciI6MSwiemRfdG9rZW4iOm51bGx9.Id5Lv5brw5aBEtk79SQNKwqOWqv2f2ENzJgiIbGjPAY&zhida_source=entity) ：工具用于读取、搜索和操作 [Git仓库](https://zhida.zhihu.com/search?content_id=254488153&content_type=Article&match_order=1&q=Git%E4%BB%93%E5%BA%93&zd_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ6aGlkYV9zZXJ2ZXIiLCJleHAiOjE3ODUzOTg1NTIsInEiOiJHaXTku5PlupMiLCJ6aGlkYV9zb3VyY2UiOiJlbnRpdHkiLCJjb250ZW50X2lkIjoyNTQ0ODgxNTMsImNvbnRlbnRfdHlwZSI6IkFydGljbGUiLCJtYXRjaF9vcmRlciI6MSwiemRfdG9rZW4iOm51bGx9.HL_qivCsDsuQF_md0oiA4OAaJaU8odbOOWnOreOnLwU&zhida_source=entity) 。

[GitHub](https://zhida.zhihu.com/search?content_id=254488153&content_type=Article&match_order=1&q=GitHub&zd_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ6aGlkYV9zZXJ2ZXIiLCJleHAiOjE3ODUzOTg1NTIsInEiOiJHaXRIdWIiLCJ6aGlkYV9zb3VyY2UiOiJlbnRpdHkiLCJjb250ZW50X2lkIjoyNTQ0ODgxNTMsImNvbnRlbnRfdHlwZSI6IkFydGljbGUiLCJtYXRjaF9vcmRlciI6MSwiemRfdG9rZW4iOm51bGx9.I1zA7e-SUk6kWTKk7gcGubbC1DTu7-hkq64-0aSEZsA&zhida_source=entity) ：集成 [仓库管理](https://zhida.zhihu.com/search?content_id=254488153&content_type=Article&match_order=1&q=%E4%BB%93%E5%BA%93%E7%AE%A1%E7%90%86&zd_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ6aGlkYV9zZXJ2ZXIiLCJleHAiOjE3ODUzOTg1NTIsInEiOiLku5PlupPnrqHnkIYiLCJ6aGlkYV9zb3VyY2UiOiJlbnRpdHkiLCJjb250ZW50X2lkIjoyNTQ0ODgxNTMsImNvbnRlbnRfdHlwZSI6IkFydGljbGUiLCJtYXRjaF9vcmRlciI6MSwiemRfdG9rZW4iOm51bGx9.Hi2aHMDZTU309LAFDpOPwn-elHQ0vixblFpGSp-Xk6s&zhida_source=entity) 、文件操作和 [GitHub API](https://zhida.zhihu.com/search?content_id=254488153&content_type=Article&match_order=1&q=GitHub+API&zd_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ6aGlkYV9zZXJ2ZXIiLCJleHAiOjE3ODUzOTg1NTIsInEiOiJHaXRIdWIgQVBJIiwiemhpZGFfc291cmNlIjoiZW50aXR5IiwiY29udGVudF9pZCI6MjU0NDg4MTUzLCJjb250ZW50X3R5cGUiOiJBcnRpY2xlIiwibWF0Y2hfb3JkZXIiOjEsInpkX3Rva2VuIjpudWxsfQ.YOKhOUK8zbvpcMPkKPANP1Vl5L8crUVVdjI4ax17eNY&zhida_source=entity) 。

[GitLab](https://zhida.zhihu.com/search?content_id=254488153&content_type=Article&match_order=1&q=GitLab&zd_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ6aGlkYV9zZXJ2ZXIiLCJleHAiOjE3ODUzOTg1NTIsInEiOiJHaXRMYWIiLCJ6aGlkYV9zb3VyY2UiOiJlbnRpdHkiLCJjb250ZW50X2lkIjoyNTQ0ODgxNTMsImNvbnRlbnRfdHlwZSI6IkFydGljbGUiLCJtYXRjaF9vcmRlciI6MSwiemRfdG9rZW4iOm51bGx9.y1ovXM3qP73jscSlpowHR5ry-i7SiybFvD0VznloIec&zhida_source=entity) ：支持 [项目管理](https://zhida.zhihu.com/search?content_id=254488153&content_type=Article&match_order=1&q=%E9%A1%B9%E7%9B%AE%E7%AE%A1%E7%90%86&zd_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ6aGlkYV9zZXJ2ZXIiLCJleHAiOjE3ODUzOTg1NTIsInEiOiLpobnnm67nrqHnkIYiLCJ6aGlkYV9zb3VyY2UiOiJlbnRpdHkiLCJjb250ZW50X2lkIjoyNTQ0ODgxNTMsImNvbnRlbnRfdHlwZSI6IkFydGljbGUiLCJtYXRjaF9vcmRlciI6MSwiemRfdG9rZW4iOm51bGx9.TSsLYS4oCKawWon4vYhZLWQiaZvaXGhgBQSQCwtyqiY&zhida_source=entity) 的GitLab API集成。

Sentry：从 [Sentry.io](https://link.zhihu.com/?target=http%3A//Sentry.io) 获取并分析问题。

网络与浏览器自动化：

Brave Search：利用Brave的搜索API进行网络和本地搜索。

[Fetch](https://zhida.zhihu.com/search?content_id=254488153&content_type=Article&match_order=1&q=Fetch&zd_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ6aGlkYV9zZXJ2ZXIiLCJleHAiOjE3ODUzOTg1NTIsInEiOiJGZXRjaCIsInpoaWRhX3NvdXJjZSI6ImVudGl0eSIsImNvbnRlbnRfaWQiOjI1NDQ4ODE1MywiY29udGVudF90eXBlIjoiQXJ0aWNsZSIsIm1hdGNoX29yZGVyIjoxLCJ6ZF90b2tlbiI6bnVsbH0.j7zP9vQIplRWvRruFF4_fxPv9wGMCNQXd8UcadYxyKo&zhida_source=entity) ：为LLM优化的网络内容获取和转换。

[Puppeteer](https://zhida.zhihu.com/search?content_id=254488153&content_type=Article&match_order=1&q=Puppeteer&zd_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ6aGlkYV9zZXJ2ZXIiLCJleHAiOjE3ODUzOTg1NTIsInEiOiJQdXBwZXRlZXIiLCJ6aGlkYV9zb3VyY2UiOiJlbnRpdHkiLCJjb250ZW50X2lkIjoyNTQ0ODgxNTMsImNvbnRlbnRfdHlwZSI6IkFydGljbGUiLCJtYXRjaF9vcmRlciI6MSwiemRfdG9rZW4iOm51bGx9.3RlMtseEFhbrX6QFMaAGT0zPH-f9dH360Qty3lImqrw&zhida_source=entity) ：提供浏览器自动化和 [网页抓取](https://zhida.zhihu.com/search?content_id=254488153&content_type=Article&match_order=1&q=%E7%BD%91%E9%A1%B5%E6%8A%93%E5%8F%96&zd_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ6aGlkYV9zZXJ2ZXIiLCJleHAiOjE3ODUzOTg1NTIsInEiOiLnvZHpobXmipPlj5YiLCJ6aGlkYV9zb3VyY2UiOiJlbnRpdHkiLCJjb250ZW50X2lkIjoyNTQ0ODgxNTMsImNvbnRlbnRfdHlwZSI6IkFydGljbGUiLCJtYXRjaF9vcmRlciI6MSwiemRfdG9rZW4iOm51bGx9.1Y8pJLQEyk77rmJ7AsTd4Ls8ac5jynafiVTSyO9Oibw&zhida_source=entity) 功能。

生产力和通信：

[Slack](https://zhida.zhihu.com/search?content_id=254488153&content_type=Article&match_order=1&q=Slack&zd_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ6aGlkYV9zZXJ2ZXIiLCJleHAiOjE3ODUzOTg1NTIsInEiOiJTbGFjayIsInpoaWRhX3NvdXJjZSI6ImVudGl0eSIsImNvbnRlbnRfaWQiOjI1NDQ4ODE1MywiY29udGVudF90eXBlIjoiQXJ0aWNsZSIsIm1hdGNoX29yZGVyIjoxLCJ6ZF90b2tlbiI6bnVsbH0.q_Qh1BRIaFT91XMU9JDW2T0Joa_EllKzqoJOl_YlL0I&zhida_source=entity) ：支持频道管理和消息功能。

Google Maps：提供位置服务、路线和地点详情。

Memory：基于 [知识图谱](https://zhida.zhihu.com/search?content_id=254488153&content_type=Article&match_order=1&q=%E7%9F%A5%E8%AF%86%E5%9B%BE%E8%B0%B1&zd_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ6aGlkYV9zZXJ2ZXIiLCJleHAiOjE3ODUzOTg1NTIsInEiOiLnn6Xor4blm77osLEiLCJ6aGlkYV9zb3VyY2UiOiJlbnRpdHkiLCJjb250ZW50X2lkIjoyNTQ0ODgxNTMsImNvbnRlbnRfdHlwZSI6IkFydGljbGUiLCJtYXRjaF9vcmRlciI6MSwiemRfdG9rZW4iOm51bGx9.hQesHoLND5sm6CbF339X5OvNcmaxzucJ0jPkP-lKXnQ&zhida_source=entity) 的持久 [记忆系统](https://zhida.zhihu.com/search?content_id=254488153&content_type=Article&match_order=1&q=%E8%AE%B0%E5%BF%86%E7%B3%BB%E7%BB%9F&zd_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ6aGlkYV9zZXJ2ZXIiLCJleHAiOjE3ODUzOTg1NTIsInEiOiLorrDlv4bns7vnu58iLCJ6aGlkYV9zb3VyY2UiOiJlbnRpdHkiLCJjb250ZW50X2lkIjoyNTQ0ODgxNTMsImNvbnRlbnRfdHlwZSI6IkFydGljbGUiLCJtYXRjaF9vcmRlciI6MSwiemRfdG9rZW4iOm51bGx9.GXjVBEj0TcOG8hryHJ9bDp6AaoCXROx5wE1TgSiTAbo&zhida_source=entity) 。

AI与专业工具：

[EverArt](https://zhida.zhihu.com/search?content_id=254488153&content_type=Article&match_order=1&q=EverArt&zd_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ6aGlkYV9zZXJ2ZXIiLCJleHAiOjE3ODUzOTg1NTIsInEiOiJFdmVyQXJ0IiwiemhpZGFfc291cmNlIjoiZW50aXR5IiwiY29udGVudF9pZCI6MjU0NDg4MTUzLCJjb250ZW50X3R5cGUiOiJBcnRpY2xlIiwibWF0Y2hfb3JkZXIiOjEsInpkX3Rva2VuIjpudWxsfQ.3cwz1W-2l9fEArDiP_JbhN95oM76iCSX21sq4_3N1rE&zhida_source=entity) ：使用多种模型进行AI图像生成。

Sequential Thinking：通过思维序列进行动态问题解决。

[AWS](https://zhida.zhihu.com/search?content_id=254488153&content_type=Article&match_order=1&q=AWS&zd_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ6aGlkYV9zZXJ2ZXIiLCJleHAiOjE3ODUzOTg1NTIsInEiOiJBV1MiLCJ6aGlkYV9zb3VyY2UiOiJlbnRpdHkiLCJjb250ZW50X2lkIjoyNTQ0ODgxNTMsImNvbnRlbnRfdHlwZSI6IkFydGljbGUiLCJtYXRjaF9vcmRlciI6MSwiemRfdG9rZW4iOm51bGx9.eOooD_4eqc8mUXeOGjMjwdIxDfzkXI39wBQZTKHrTnE&zhida_source=entity) KB Retrieval：使用Bedrock Agent Runtime从AWS知识库检索。

官方集成工具：

这些MCP服务器由公司维护，用于其平台：

Axiom：使用自然语言查询和分析日志、跟踪和事件数据。

[Browserbase](https://zhida.zhihu.com/search?content_id=254488153&content_type=Article&match_order=1&q=Browserbase&zd_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ6aGlkYV9zZXJ2ZXIiLCJleHAiOjE3ODUzOTg1NTIsInEiOiJCcm93c2VyYmFzZSIsInpoaWRhX3NvdXJjZSI6ImVudGl0eSIsImNvbnRlbnRfaWQiOjI1NDQ4ODE1MywiY29udGVudF90eXBlIjoiQXJ0aWNsZSIsIm1hdGNoX29yZGVyIjoxLCJ6ZF90b2tlbiI6bnVsbH0.vaiB8Z49fAx3a4Yzc-Ny4bAfdmrU73ojROHQwUkobSQ&zhida_source=entity) ：云端自动化浏览器交互。

[Cloudflare](https://zhida.zhihu.com/search?content_id=254488153&content_type=Article&match_order=1&q=Cloudflare&zd_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ6aGlkYV9zZXJ2ZXIiLCJleHAiOjE3ODUzOTg1NTIsInEiOiJDbG91ZGZsYXJlIiwiemhpZGFfc291cmNlIjoiZW50aXR5IiwiY29udGVudF9pZCI6MjU0NDg4MTUzLCJjb250ZW50X3R5cGUiOiJBcnRpY2xlIiwibWF0Y2hfb3JkZXIiOjEsInpkX3Rva2VuIjpudWxsfQ.R5Et_b_-CnEn8qMw8NHcnGNpsRgH7WdN_0bj_ocSOzg&zhida_source=entity) ：在Cloudflare开发者平台上部署和管理资源。

E2B：在安全的云沙箱中执行代码。

[Neon](https://zhida.zhihu.com/search?content_id=254488153&content_type=Article&match_order=1&q=Neon&zd_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ6aGlkYV9zZXJ2ZXIiLCJleHAiOjE3ODUzOTg1NTIsInEiOiJOZW9uIiwiemhpZGFfc291cmNlIjoiZW50aXR5IiwiY29udGVudF9pZCI6MjU0NDg4MTUzLCJjb250ZW50X3R5cGUiOiJBcnRpY2xlIiwibWF0Y2hfb3JkZXIiOjEsInpkX3Rva2VuIjpudWxsfQ.c2yQuA9di_dn3vUQ7w1biVYU_WTa-5w4Z9pKbpDmrsw&zhida_source=entity) ：与Neon无服务器 [Postgres](https://zhida.zhihu.com/search?content_id=254488153&content_type=Article&match_order=1&q=Postgres&zd_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ6aGlkYV9zZXJ2ZXIiLCJleHAiOjE3ODUzOTg1NTIsInEiOiJQb3N0Z3JlcyIsInpoaWRhX3NvdXJjZSI6ImVudGl0eSIsImNvbnRlbnRfaWQiOjI1NDQ4ODE1MywiY29udGVudF90eXBlIjoiQXJ0aWNsZSIsIm1hdGNoX29yZGVyIjoxLCJ6ZF90b2tlbiI6bnVsbH0.TrXp4yv-7fA6B5Y9A6P7hdVZr4uUqU8N9aFZSWBHz60&zhida_source=entity) 平台交互。

[Obsidian](https://zhida.zhihu.com/search?content_id=254488153&content_type=Article&match_order=1&q=Obsidian&zd_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ6aGlkYV9zZXJ2ZXIiLCJleHAiOjE3ODUzOTg1NTIsInEiOiJPYnNpZGlhbiIsInpoaWRhX3NvdXJjZSI6ImVudGl0eSIsImNvbnRlbnRfaWQiOjI1NDQ4ODE1MywiY29udGVudF90eXBlIjoiQXJ0aWNsZSIsIm1hdGNoX29yZGVyIjoxLCJ6ZF90b2tlbiI6bnVsbH0.WkR_0sNftCP4jXH_1i4Dfx851uGbrJz_-oakMyFI7Y0&zhida_source=entity) Markdown Notes：读取和搜索Obsidian知识库中的Markdown笔记。

[Qdrant](https://zhida.zhihu.com/search?content_id=254488153&content_type=Article&match_order=1&q=Qdrant&zd_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ6aGlkYV9zZXJ2ZXIiLCJleHAiOjE3ODUzOTg1NTIsInEiOiJRZHJhbnQiLCJ6aGlkYV9zb3VyY2UiOiJlbnRpdHkiLCJjb250ZW50X2lkIjoyNTQ0ODgxNTMsImNvbnRlbnRfdHlwZSI6IkFydGljbGUiLCJtYXRjaF9vcmRlciI6MSwiemRfdG9rZW4iOm51bGx9._SdFfLGOwJu5ayp_8b8XMoXZMfLCvv-WBqppImH6VDg&zhida_source=entity) ：使用Qdrant向量搜索引擎实现 [语义记忆](https://zhida.zhihu.com/search?content_id=254488153&content_type=Article&match_order=1&q=%E8%AF%AD%E4%B9%89%E8%AE%B0%E5%BF%86&zd_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ6aGlkYV9zZXJ2ZXIiLCJleHAiOjE3ODUzOTg1NTIsInEiOiLor63kuYnorrDlv4YiLCJ6aGlkYV9zb3VyY2UiOiJlbnRpdHkiLCJjb250ZW50X2lkIjoyNTQ0ODgxNTMsImNvbnRlbnRfdHlwZSI6IkFydGljbGUiLCJtYXRjaF9vcmRlciI6MSwiemRfdG9rZW4iOm51bGx9.63ohaNRh2Lj9NrG9tlzVmbCfpaHcxzreli-tzbl4ldo&zhida_source=entity) 。

[Raygun](https://zhida.zhihu.com/search?content_id=254488153&content_type=Article&match_order=1&q=Raygun&zd_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ6aGlkYV9zZXJ2ZXIiLCJleHAiOjE3ODUzOTg1NTIsInEiOiJSYXlndW4iLCJ6aGlkYV9zb3VyY2UiOiJlbnRpdHkiLCJjb250ZW50X2lkIjoyNTQ0ODgxNTMsImNvbnRlbnRfdHlwZSI6IkFydGljbGUiLCJtYXRjaF9vcmRlciI6MSwiemRfdG9rZW4iOm51bGx9.XM8wHg0NU03iJpgpirFljpUyYOmTRUyyLQL8X0iJwoE&zhida_source=entity) ：访问 [崩溃报告](https://zhida.zhihu.com/search?content_id=254488153&content_type=Article&match_order=1&q=%E5%B4%A9%E6%BA%83%E6%8A%A5%E5%91%8A&zd_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ6aGlkYV9zZXJ2ZXIiLCJleHAiOjE3ODUzOTg1NTIsInEiOiLltKnmuoPmiqXlkYoiLCJ6aGlkYV9zb3VyY2UiOiJlbnRpdHkiLCJjb250ZW50X2lkIjoyNTQ0ODgxNTMsImNvbnRlbnRfdHlwZSI6IkFydGljbGUiLCJtYXRjaF9vcmRlciI6MSwiemRfdG9rZW4iOm51bGx9.9l1uscchEKT_vslEqjul1YlAxUP-qwe7LtjgQkG_W1s&zhida_source=entity) 和监控数据。

Search1API：统一的API用于搜索、 [爬虫](https://zhida.zhihu.com/search?content_id=254488153&content_type=Article&match_order=1&q=%E7%88%AC%E8%99%AB&zd_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ6aGlkYV9zZXJ2ZXIiLCJleHAiOjE3ODUzOTg1NTIsInEiOiLniKzomasiLCJ6aGlkYV9zb3VyY2UiOiJlbnRpdHkiLCJjb250ZW50X2lkIjoyNTQ0ODgxNTMsImNvbnRlbnRfdHlwZSI6IkFydGljbGUiLCJtYXRjaF9vcmRlciI6MSwiemRfdG9rZW4iOm51bGx9.EYghjmPi0FNB3MsYdpOsbZ4yTRCppHsQ5HxZK-RGmjA&zhida_source=entity) 和网站地图。

Tinybird：与Tinybird无服务器 [ClickHouse](https://zhida.zhihu.com/search?content_id=254488153&content_type=Article&match_order=1&q=ClickHouse&zd_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ6aGlkYV9zZXJ2ZXIiLCJleHAiOjE3ODUzOTg1NTIsInEiOiJDbGlja0hvdXNlIiwiemhpZGFfc291cmNlIjoiZW50aXR5IiwiY29udGVudF9pZCI6MjU0NDg4MTUzLCJjb250ZW50X3R5cGUiOiJBcnRpY2xlIiwibWF0Y2hfb3JkZXIiOjEsInpkX3Rva2VuIjpudWxsfQ.9WmgM4rT5kNao30qCX8XznatsnzjyPBlSXR2_VkJISo&zhida_source=entity) 平台交互。

集成工具：

[Docker](https://zhida.zhihu.com/search?content_id=254488153&content_type=Article&match_order=1&q=Docker&zd_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ6aGlkYV9zZXJ2ZXIiLCJleHAiOjE3ODUzOTg1NTIsInEiOiJEb2NrZXIiLCJ6aGlkYV9zb3VyY2UiOiJlbnRpdHkiLCJjb250ZW50X2lkIjoyNTQ0ODgxNTMsImNvbnRlbnRfdHlwZSI6IkFydGljbGUiLCJtYXRjaF9vcmRlciI6MSwiemRfdG9rZW4iOm51bGx9.BB-SsJGnNh4Lb4BWd5xc8vig9j3b1ANgnw9HzbmHKhU&zhida_source=entity) ：管理容器、镜像、卷和网络。

[Kubernetes](https://zhida.zhihu.com/search?content_id=254488153&content_type=Article&match_order=1&q=Kubernetes&zd_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ6aGlkYV9zZXJ2ZXIiLCJleHAiOjE3ODUzOTg1NTIsInEiOiJLdWJlcm5ldGVzIiwiemhpZGFfc291cmNlIjoiZW50aXR5IiwiY29udGVudF9pZCI6MjU0NDg4MTUzLCJjb250ZW50X3R5cGUiOiJBcnRpY2xlIiwibWF0Y2hfb3JkZXIiOjEsInpkX3Rva2VuIjpudWxsfQ.cGVchmBkf8Z7OsZPu8DFCFVJUtX6WqhmYBm2TWMsMJE&zhida_source=entity) ：管理 [pod](https://zhida.zhihu.com/search?content_id=254488153&content_type=Article&match_order=1&q=pod&zd_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ6aGlkYV9zZXJ2ZXIiLCJleHAiOjE3ODUzOTg1NTIsInEiOiJwb2QiLCJ6aGlkYV9zb3VyY2UiOiJlbnRpdHkiLCJjb250ZW50X2lkIjoyNTQ0ODgxNTMsImNvbnRlbnRfdHlwZSI6IkFydGljbGUiLCJtYXRjaF9vcmRlciI6MSwiemRfdG9rZW4iOm51bGx9.1L0QGqk9zTT4UHnLxVAZgubiiYKbUQijGA1iy-AlU8c&zhida_source=entity) 、部署和服务。

[Linear](https://zhida.zhihu.com/search?content_id=254488153&content_type=Article&match_order=1&q=Linear&zd_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ6aGlkYV9zZXJ2ZXIiLCJleHAiOjE3ODUzOTg1NTIsInEiOiJMaW5lYXIiLCJ6aGlkYV9zb3VyY2UiOiJlbnRpdHkiLCJjb250ZW50X2lkIjoyNTQ0ODgxNTMsImNvbnRlbnRfdHlwZSI6IkFydGljbGUiLCJtYXRjaF9vcmRlciI6MSwiemRfdG9rZW4iOm51bGx9.F3LJkcay9yomWwYxSTDKZ_PDdWS-wnY_YWlNHksxdm4&zhida_source=entity) ：项目管理和问题跟踪。

[Snowflake](https://zhida.zhihu.com/search?content_id=254488153&content_type=Article&match_order=1&q=Snowflake&zd_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ6aGlkYV9zZXJ2ZXIiLCJleHAiOjE3ODUzOTg1NTIsInEiOiJTbm93Zmxha2UiLCJ6aGlkYV9zb3VyY2UiOiJlbnRpdHkiLCJjb250ZW50X2lkIjoyNTQ0ODgxNTMsImNvbnRlbnRfdHlwZSI6IkFydGljbGUiLCJtYXRjaF9vcmRlciI6MSwiemRfdG9rZW4iOm51bGx9.2nKKoKwzkO51NA0wUxYzWJGD6GmS1kX7dFA5mvcL-PY&zhida_source=entity) ：与Snowflake数据库交互。

[Spotify](https://zhida.zhihu.com/search?content_id=254488153&content_type=Article&match_order=1&q=Spotify&zd_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ6aGlkYV9zZXJ2ZXIiLCJleHAiOjE3ODUzOTg1NTIsInEiOiJTcG90aWZ5IiwiemhpZGFfc291cmNlIjoiZW50aXR5IiwiY29udGVudF9pZCI6MjU0NDg4MTUzLCJjb250ZW50X3R5cGUiOiJBcnRpY2xlIiwibWF0Y2hfb3JkZXIiOjEsInpkX3Rva2VuIjpudWxsfQ.ilXcAenX5UjVYAvXHEr33ySDA3HIvPXavI36vHuHFTM&zhida_source=entity) ：控制Spotify播放和管理播放列表。

Todoist：任务管理集成。

## 三、怎么使用和开发MCP Server

### 使用

目前支持的部分工具列表（更多见 [这里](https://link.zhihu.com/?target=https%3A//www.pulsemcp.com/clients) ）：

| 客户端 | 资源 | 提示 | 工具 | 采样 | 根目录 | 备注 |
| --- | --- | --- | --- | --- | --- | --- |
| Claude 桌面应用 | ✅ | ✅ | ✅ | ❌ | ❌ | 所有MCP 功能 |
| Zed | ❌ | ✅ | ❌ | ❌ | ❌ | 提示以 [斜杠命令](https://zhida.zhihu.com/search?content_id=254488153&content_type=Article&match_order=1&q=%E6%96%9C%E6%9D%A0%E5%91%BD%E4%BB%A4&zd_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ6aGlkYV9zZXJ2ZXIiLCJleHAiOjE3ODUzOTg1NTIsInEiOiLmlpzmnaDlkb3ku6QiLCJ6aGlkYV9zb3VyY2UiOiJlbnRpdHkiLCJjb250ZW50X2lkIjoyNTQ0ODgxNTMsImNvbnRlbnRfdHlwZSI6IkFydGljbGUiLCJtYXRjaF9vcmRlciI6MSwiemRfdG9rZW4iOm51bGx9.-wl5zLCkb-PD4TCHBHLnpDVK1Ukzo9ewJKbQArO4LYo&zhida_source=entity) 形式出现 |
| Sourcegraph Cody | ✅ | ❌ | ❌ | ❌ | ❌ | 通过OpenCTX 支持资源 |
| Firebase Genkit | ⚠️ | ✅ | ✅ | ❌ | ❌ | 支持资源列表和查找 |
| Continue | ✅ | ✅ | ✅ | ❌ | ❌ | 支持所有MCP功能 |
| GenAIScript | ❌ | ❌ | ✅ | ❌ | ❌ | 支持工具 |
| Cursor | ❌ | ❌ | ✅ | ❌ | ❌ | 支持工具 |

### Claude Desktop 使用示例

以 Claude Desktop 为例，配置 MCP 客户端的步骤如下：

1. 安装 Claude Desktop： 确保已在 macOS 或 Windows 系统上安装最新版本的 Claude Desktop。
2. 配置 MCP 服务器： 在 Claude Desktop 的 [配置文件](https://zhida.zhihu.com/search?content_id=254488153&content_type=Article&match_order=1&q=%E9%85%8D%E7%BD%AE%E6%96%87%E4%BB%B6&zd_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ6aGlkYV9zZXJ2ZXIiLCJleHAiOjE3ODUzOTg1NTIsInEiOiLphY3nva7mlofku7YiLCJ6aGlkYV9zb3VyY2UiOiJlbnRpdHkiLCJjb250ZW50X2lkIjoyNTQ0ODgxNTMsImNvbnRlbnRfdHlwZSI6IkFydGljbGUiLCJtYXRjaF9vcmRlciI6MSwiemRfdG9rZW4iOm51bGx9.gnWujALwK-04jJuYue9tqKcB8RQY31M08NP5y-PCUxI&zhida_source=entity) 中，配置入口Claude Desktop—>菜单—>Settings—>Developer—>Edit Config：
![](https://picx.zhimg.com/v2-5a7b9cf79c11acc919c92d0c7d1a048d_1440w.jpg)

添加所需的 MCP 服务器信息，例如：

```
{
  "mcpServers": {
    "filesystem": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-filesystem", "/path/to/allowed/files"]
    },
    "git": {
      "command": "uvx",
      "args": ["mcp-server-git", "--repository", "path/to/git/repo"]
    }
  }
}
```

这里的@modelcontextprotocol/server-filesystem、mcp-server-git是对应的一些MCP Server，可以是开源找来的，也可以是你自己开发的。

配置完后，在主界面对话题右下角就有个锤子出现了，有几个锤子就是配置几个，然后对话中如果涉及使用该工具的，claude就会自动调用

![](https://pic1.zhimg.com/v2-5db4cd179e868981fd48123022445768_1440w.jpg)

### Cursor中 使用示例

Cursor工具中集成mcp server功能对开发增加效率非常明显，配置入口在：文件—>首选项—>Cursor Settings—>Features—>MCP Server—>Add new MCP Server

![](https://pic3.zhimg.com/v2-5e8e96d0f247bc99103f7f479f6e8fe2_1440w.jpg)

配置完后，你需要画图的地方给它提要求就行了，它会自动感知，按上下文生成prompt并调用工具生成图片：

![](https://pic1.zhimg.com/v2-ea2cbf65eb36cfa89ccb12deaf49ca2c_1440w.jpg)

生成的图片质量还不错，符合开发需要的图片

![](https://pic2.zhimg.com/v2-17ca6e3757fad5b29e230dd54cd1c4c5_1440w.jpg)

## MCP 如何工作

那我们来介绍一下 MCP 的工作原理。首先我们看一下 [官方的 MCP 架构图](https://link.zhihu.com/?target=https%3A//modelcontextprotocol.io/introduction) 。

![](https://pica.zhimg.com/v2-2a3cda8621b4165cfba4debd84eb4b86_1440w.jpg)

总共分为了下面五个部分：

- MCP Hosts: Hosts 是指 LLM 启动连接的应用程序，像 Cursor, Claude Desktop、 [Cline](https://link.zhihu.com/?target=https%3A//github.com/cline/cline) 这样的应用程序。
- MCP Clients: 客户端是用来在 Hosts 应用程序内维护与 Server 之间 1:1 连接。
- MCP Servers: 通过标准化的协议，为 Client 端提供上下文、工具和提示。
- Local Data Sources: 本地的文件、数据库和 API。
- Remote Services: 外部的文件、数据库和 API。

整个 MCP 协议核心的在于 Server，因为 Host 和 Client 相信熟悉 [计算机网络](https://zhida.zhihu.com/search?content_id=254488153&content_type=Article&match_order=1&q=%E8%AE%A1%E7%AE%97%E6%9C%BA%E7%BD%91%E7%BB%9C&zd_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ6aGlkYV9zZXJ2ZXIiLCJleHAiOjE3ODUzOTg1NTIsInEiOiLorqHnrpfmnLrnvZHnu5wiLCJ6aGlkYV9zb3VyY2UiOiJlbnRpdHkiLCJjb250ZW50X2lkIjoyNTQ0ODgxNTMsImNvbnRlbnRfdHlwZSI6IkFydGljbGUiLCJtYXRjaF9vcmRlciI6MSwiemRfdG9rZW4iOm51bGx9.8oQy0UkQeI88bnTfiUKOkKCDaSZJ25Kd6oFzrHGX7c4&zhida_source=entity) 的都不会陌生，非常好理解，但是 Server 如何理解呢？

看看 Cursor 的 AI Agent 发展过程，我们会发现整个 AI [自动化](https://zhida.zhihu.com/search?content_id=254488153&content_type=Article&match_order=5&q=%E8%87%AA%E5%8A%A8%E5%8C%96&zd_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ6aGlkYV9zZXJ2ZXIiLCJleHAiOjE3ODUzOTg1NTIsInEiOiLoh6rliqjljJYiLCJ6aGlkYV9zb3VyY2UiOiJlbnRpdHkiLCJjb250ZW50X2lkIjoyNTQ0ODgxNTMsImNvbnRlbnRfdHlwZSI6IkFydGljbGUiLCJtYXRjaF9vcmRlciI6NSwiemRfdG9rZW4iOm51bGx9.5AW1Bh-NRL1tleW4SfyzCuFHJYYecLKhndLZbZK5SpU&zhida_source=entity) 的过程发展会是从 Chat 到 [Composer](https://zhida.zhihu.com/search?content_id=254488153&content_type=Article&match_order=1&q=Composer&zd_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ6aGlkYV9zZXJ2ZXIiLCJleHAiOjE3ODUzOTg1NTIsInEiOiJDb21wb3NlciIsInpoaWRhX3NvdXJjZSI6ImVudGl0eSIsImNvbnRlbnRfaWQiOjI1NDQ4ODE1MywiY29udGVudF90eXBlIjoiQXJ0aWNsZSIsIm1hdGNoX29yZGVyIjoxLCJ6ZF90b2tlbiI6bnVsbH0.1z1x_QVRJjoBYDiBxKdO1zkSKPpxKe9wHiH82fXuRvA&zhida_source=entity) 再进化到完整的 AI Agent。

AI Chat 只是提供建议，如何将 AI 的 response 转化为行为和最终的结果，全部依靠人类，例如手动复制粘贴，或者进行某些修改。

AI Composer 是可以自动修改代码，但是需要人类参与和确认，并且无法做到除了修改代码之外的其它操作。

AI Agent 是一个完全的自动化程序，未来完全可以做到自动读取 Figma 的图片，自动生产代码，自动读取日志，自动调试代码，自动 push 代码到 GitHub。

而 MCP Server 就是为了实现 AI Agent 的自动化而存在的，它是一个中间层，告诉 AI Agent 目前存在哪些服务，哪些 API，哪些数据源，AI Agent 可以根据 Server 提供的信息来决定是否调用某个服务，然后通过 Function Calling 来执行函数。

### MCP Server 的工作原理

我们先来看一个简单的例子，假设我们想让 AI Agent 完成自动搜索 GitHub Repository，接着搜索 Issue，然后再判断是否是一个已知的 bug，最后决定是否需要提交一个新的 Issue 的功能。

那么我们就需要创建一个 [Github](https://zhida.zhihu.com/search?content_id=254488153&content_type=Article&match_order=1&q=Github&zd_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ6aGlkYV9zZXJ2ZXIiLCJleHAiOjE3ODUzOTg1NTIsInEiOiJHaXRodWIiLCJ6aGlkYV9zb3VyY2UiOiJlbnRpdHkiLCJjb250ZW50X2lkIjoyNTQ0ODgxNTMsImNvbnRlbnRfdHlwZSI6IkFydGljbGUiLCJtYXRjaF9vcmRlciI6MSwiemRfdG9rZW4iOm51bGx9.f4z55CY-LhI4t0nwNkTCLMA8k7nFngpkiW3FVdeITwM&zhida_source=entity) MCP Server，这个 Server 需要提供查找 Repository、搜索 Issues 和创建 Issue 三种能力。

我们直接来看看代码：

```
const server = new Server(
  {
    name: "github-mcp-server",
    version: VERSION,
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [
      {
        name: "search_repositories",
        description: "Search for GitHub repositories",
        inputSchema: zodToJsonSchema(repository.SearchRepositoriesSchema),
      },
      {
        name: "create_issue",
        description: "Create a new issue in a GitHub repository",
        inputSchema: zodToJsonSchema(issues.CreateIssueSchema),
      },
      {
        name: "search_issues",
        description: "Search for issues and pull requests across GitHub repositories",
        inputSchema: zodToJsonSchema(search.SearchIssuesSchema),
      }
    ],
  };
});

server.setRequestHandler(CallToolRequestSchema, async (request) => {
  try {
    if (!request.params.arguments) {
      throw new Error("Arguments are required");
    }

    switch (request.params.name) {
      case "search_repositories": {
        const args = repository.SearchRepositoriesSchema.parse(request.params.arguments);
        const results = await repository.searchRepositories(
          args.query,
          args.page,
          args.perPage
        );
        return {
          content: [{ type: "text", text: JSON.stringify(results, null, 2) }],
        };
      }

      case "create_issue": {
        const args = issues.CreateIssueSchema.parse(request.params.arguments);
        const { owner, repo, ...options } = args;
        const issue = await issues.createIssue(owner, repo, options);
        return {
          content: [{ type: "text", text: JSON.stringify(issue, null, 2) }],
        };
      }

      case "search_issues": {
        const args = search.SearchIssuesSchema.parse(request.params.arguments);
        const results = await search.searchIssues(args);
        return {
          content: [{ type: "text", text: JSON.stringify(results, null, 2) }],
        };
      }

      default:
        throw new Error(\`Unknown tool: ${request.params.name}\`);
    }
  } catch (error) {}
});

async function runServer() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("GitHub MCP Server running on stdio");
}

runServer().catch((error) => {
  console.error("Fatal error in main():", error);
  process.exit(1);
});
```

上面的代码中，我们通过 `server.setRequestHandler` 来告诉 Client 端我们提供了哪些能力，通过 `description` 字段来描述这个能力的作用，通过 `inputSchema` 来描述完成这个能力需要的输入参数。

我们再来看看具体的实现代码：

```
export const SearchOptions = z.object({
  q: z.string(),
  order: z.enum(["asc", "desc"]).optional(),
  page: z.number().min(1).optional(),
  per_page: z.number().min(1).max(100).optional(),
});

export const SearchIssuesOptions = SearchOptions.extend({
  sort: z.enum([
    "comments",
    ...
  ]).optional(),
});

export async function searchUsers(params: z.infer<typeof SearchUsersSchema>) {
  return githubRequest(buildUrl("https://api.github.com/search/users", params));
}

export const SearchRepositoriesSchema = z.object({
  query: z.string().describe("Search query (see GitHub search syntax)"),
  page: z.number().optional().describe("Page number for pagination (default: 1)"),
  perPage: z.number().optional().describe("Number of results per page (default: 30, max: 100)"),
});

export async function searchRepositories(
  query: string,
  page: number = 1,
  perPage: number = 30
) {
  const url = new URL("https://api.github.com/search/repositories");
  url.searchParams.append("q", query);
  url.searchParams.append("page", page.toString());
  url.searchParams.append("per_page", perPage.toString());

  const response = await githubRequest(url.toString());
  return GitHubSearchResponseSchema.parse(response);
}
```

可以很清晰的看到，我们最终实现是通过了 `https://api.github.com` 的 API 来实现和 Github 交互的，我们通过 `githubRequest` 函数来调用 GitHub 的 API，最后返回结果。

在调用 Github 官方的 API 之前，MCP 的主要工作是描述 Server 提供了哪些能力(给 LLM 提供)，需要哪些参数(参数具体的功能是什么)，最后返回的结果是什么。

所以 MCP Server 并不是一个新颖的、高深的东西，它只是一个具有共识的协议。

如果我们想要实现一个更强大的 AI Agent，例如我们想让 AI Agent 自动的根据本地错误日志，自动搜索相关的 GitHub Repository，然后搜索 Issue，最后将结果发送到 Slack。

那么我们可能需要创建三个不同的 MCP Server，一个是 Local Log Server，用来查询本地日志；一个是 GitHub Server，用来搜索 Issue；还有一个是 Slack Server，用来发送消息。

AI Agent 在用户输入 `我需要查询本地错误日志，将相关的 Issue 发送到 Slack` 指令后，自行判断需要调用哪些 MCP Server，并决定调用顺序，最终根据不同 MCP Server 的返回结果来决定是否需要调用下一个 Server，以此来完成整个任务。

## 一些经验分享

实际做过MCP Server的几个坑：

1) Streamable HTTP transport的session要在handleRequest之后存，不能提前，因为sessionId是在处理过程中才设置的；

2) 扣子等国内平台不发Accept header，必须nginx层proxy\_set\_header补上，否则SDK直接拒绝；

3) 要兼容所有client得同时支持Streamable HTTP + Legacy SSE双协议。MCP Server（quanttogo-mcp），同一套tool定义跑在npm/stdio、远程SSE、Streamable HTTP三种transport上，一次开发全平台可用，这确实是MCP最大的实际价值。

## 参考资源

下面是个人推荐的一些 MCP 的资源，大家可以参考一下。

### MCP 官方资源

- [官方的开源组织 Model Context Protocol](https://link.zhihu.com/?target=https%3A//github.com/modelcontextprotocol) 。
- [官方的文档 modelcontextprotocol](https://link.zhihu.com/?target=https%3A//guangzhengli.com/blog/zh/model-context-protocol/%255Bmodelcontextprotocol%255D%28https%3A//modelcontextprotocol.io/introduction%29) 。
- [官方的 MCP Server 列表](https://link.zhihu.com/?target=https%3A//github.com/modelcontextprotocol/servers)
- [Claude Blog](https://link.zhihu.com/?target=https%3A//www.anthropic.com/news/model-context-protocol)

### 社区的 MCP Server 的列表

- [Cursor Directory](https://link.zhihu.com/?target=https%3A//cursor.directory/)
- [Pulsemcp](https://link.zhihu.com/?target=https%3A//www.pulsemcp.com/)
- [Glama MCP Servers](https://link.zhihu.com/?target=https%3A//glama.ai/mcp/servers)

编辑于 2026-05-24 08:40・广东[大模型](https://www.zhihu.com/topic/25402720)[Agent](https://www.zhihu.com/topic/28352669)

赞同 1209