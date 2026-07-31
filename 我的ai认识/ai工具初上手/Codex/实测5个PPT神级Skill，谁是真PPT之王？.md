---
title: "实测5个PPT神级Skill，谁是真PPT之王？"
source: "https://zhuanlan.zhihu.com/p/2042569361387415436"
author:
  - "[[吾鳴]]"
published:
created: 2026-07-29
description: "大家好，我是吾鳴。专注于分享提升工作与生活效率的工具，无偿分享AI领域相关的精选报告，持续关注AI的前沿动向。 前面有很多朋友都后台私信过我，问有没有好用的用来生成PPT的AI 工具，平常日常的工作中经常需要…"
tags:
  - "clippings"
---
[收录于 · AI](https://www.zhihu.com/column/c_1886681489426581324)

45 人赞同了该文章

大家好，我是吾鳴。专注于分享提升工作与生活效率的工具，无偿分享AI领域相关的精选报告，持续关注AI的前沿动向。

前面有很多朋友都后台私信过我，问有没有好用的用来生成PPT的AI 工具，平常日常的工作中经常需要写PPT。

最近我一直在逛 [GitHub](https://zhida.zhihu.com/search?content_id=275590210&content_type=Article&match_order=1&q=GitHub&zd_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ6aGlkYV9zZXJ2ZXIiLCJleHAiOjE3ODU0ODQ3OTYsInEiOiJHaXRIdWIiLCJ6aGlkYV9zb3VyY2UiOiJlbnRpdHkiLCJjb250ZW50X2lkIjoyNzU1OTAyMTAsImNvbnRlbnRfdHlwZSI6IkFydGljbGUiLCJtYXRjaF9vcmRlciI6MSwiemRfdG9rZW4iOm51bGx9.UZREPYm7Qhhxq_iYpSv-XJwm-heKNa3RcNFHVamWX98&zhida_source=entity) ，平常看到有是做PPT的工具，看到评分不错的，都会把它给收藏起来。

在开始分享这些AI PPT 技能之前我想先分享一下现在使用AI生成PPT都有哪些类型。

## AI PPT 类型

我总结了一下，现在使用AI生成的PPT类型一共有三大类，分别是网页版PPT、图片版PPT、真PPT。

首先，我们先聊聊 **网页版PPT** ，这种类型的PPT是通过HTML的方式来组装的PPT风格，PPT中的图片、文字、颜色等元素都是通过HTML/CSS来实现的，可以直接通过浏览器进行访问演示，但没法放到PowerPoint中编辑，修改困难。

其次，便是 **图片版PPT** ，顾名思义，图片版PPT就是把PPT中的每一页内容中的图片、文字等元素都渲染成了图片，这种内容形式之所以最近火起来，主要还是因为生图模型对文字的处理有了质的飞跃才得到人们的青睐，修改起来巨困难。

最后，是我们用了非常多年的PPTX格式，它能直接在PowerPoint中打开编辑，所以我把它叫做像真男人的真PPT，修改起来容易。

分享完AI PPT的类型，下面便开始介绍可以用来制作PPT的Skill，我收集了5个高评分的Skill，分别是ppt-master、 [guizang-ppt-skill](https://zhida.zhihu.com/search?content_id=275590210&content_type=Article&match_order=1&q=guizang-ppt-skill&zd_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ6aGlkYV9zZXJ2ZXIiLCJleHAiOjE3ODU0ODQ3OTYsInEiOiJndWl6YW5nLXBwdC1za2lsbCIsInpoaWRhX3NvdXJjZSI6ImVudGl0eSIsImNvbnRlbnRfaWQiOjI3NTU5MDIxMCwiY29udGVudF90eXBlIjoiQXJ0aWNsZSIsIm1hdGNoX29yZGVyIjoxLCJ6ZF90b2tlbiI6bnVsbH0.oso82LlT-TQPXTu0scJq-n-Xdc1fts7Xa4zlWMMcr-k&zhida_source=entity) 、frontend-slides、html-ppt-skill和huashu-design。

我使用了WorkBuddy来安装这些Skill，并且在WorkBuddy中分别使用这些Skill各制作一份电影《 [给阿嬷的情书](https://zhida.zhihu.com/search?content_id=275590210&content_type=Article&match_order=1&q=%E7%BB%99%E9%98%BF%E5%AC%B7%E7%9A%84%E6%83%85%E4%B9%A6&zd_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ6aGlkYV9zZXJ2ZXIiLCJleHAiOjE3ODU0ODQ3OTYsInEiOiLnu5npmL_lrLfnmoTmg4XkuaYiLCJ6aGlkYV9zb3VyY2UiOiJlbnRpdHkiLCJjb250ZW50X2lkIjoyNzU1OTAyMTAsImNvbnRlbnRfdHlwZSI6IkFydGljbGUiLCJtYXRjaF9vcmRlciI6MSwiemRfdG9rZW4iOm51bGx9.6QBlS5YGgpx9Y6Pq18KqYq07QrGWaLRku52R4Qv1X78&zhida_source=entity) 》的介绍PPT，看看不同的Skill制作出来的PPT效果如何。

```
//提示词说明（为了公平性，采用百度百科网页内容，让WorkBuddy生成PPT，模型都用DeepSeek-V4-Flash）

这是百度百科关于电影《给阿嫲的情书》的介绍（https://baike.baidu.com/item/%E7%BB%99%E9%98%BF%E5%AC%B7%E7%9A%84%E6%83%85%E4%B9%A6/63869435），
基于这个网页帮我制作一份PPT。
```

## ppt-master

这是一个开源的PPT制作Skill，目前在GitHub上已经获得了19.2K的星星，它是能制作成能直接导入PowerPoint里面修改的PPT，是一个“真PPT”。

它支持导入PDF、DOCX、URL或者是Markdown的方式来获得一个可以直接编辑的pptx文件，它的核心原理是先生成SVG，然后再导出pptx文件。

这个Skill的安装不复杂，只需要把下面的这个命令拷贝给WorkBuddy，让它帮你安装就可以了。

```
npx skills add hugohe3/ppt-master 帮我安装一下这个Skill。
```

安装好之后，便可以拷贝上面的制作PPT的提示词发送给它，在生成的过程中，这个Skill会把它计划制作PPT的方案和我确认，有需要修改的可以调整。

![](https://pic1.zhimg.com/v2-49076755427f7410af2fa14437870ab8_1440w.jpg)

最后生成的效果如下。

![动图](https://picx.zhimg.com/v2-eea212e1ec1da5a534cb238d869d8f7d_b.webp)

## guizang-ppt-skill

这个Skill是开源的，它支持 [电子杂志](https://zhida.zhihu.com/search?content_id=275590210&content_type=Article&match_order=1&q=%E7%94%B5%E5%AD%90%E6%9D%82%E5%BF%97&zd_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ6aGlkYV9zZXJ2ZXIiLCJleHAiOjE3ODU0ODQ3OTYsInEiOiLnlLXlrZDmnYLlv5ciLCJ6aGlkYV9zb3VyY2UiOiJlbnRpdHkiLCJjb250ZW50X2lkIjoyNzU1OTAyMTAsImNvbnRlbnRfdHlwZSI6IkFydGljbGUiLCJtYXRjaF9vcmRlciI6MSwiemRfdG9rZW4iOm51bGx9.TSo8AlUXbnUW7AkEqLKwjoti-dA93kSPDDBL38A9vJQ&zhida_source=entity) 风格和瑞士国际主义风格，适合叙事、观点分享、产品、分析等多种场景使用，它是以html页面来输出PPT内容。

安装也不复杂，只需要把GitHub地址丢给WorkBuddy，让它帮忙安装即可。

```
#安装提示词

请帮助我安装 guizang-ppt-skill 插件，按以下流程操作：
运行命令克隆项目：git clone https://github.com/op7418/guizang-ppt-skill.git ~/.workbuddy/skills/guizang-ppt-skill
执行 ls ~/.workbuddy/skills/guizang-ppt-skill/ 进行核验
若目录内显示 SKILL.md、assets 文件夹、references 文件夹，即代表安装完成，告知我即可
```

安装好之后，便开始制作了，为了保证公平性，我们需要保证制作PPT的时候的模型一致性，避免不同的模型对不同的Skill会造成干扰，模型都选择DeepSeek-V4-Flash。

这个Skill会根据内容帮我推荐不同的PPT主题让我去选择，给我推荐了墨水经典、森林黑和牛皮纸这几个主题，并且还会说明不同主题给人的感觉，墨水经典给人通用沉稳的感觉、牛皮纸给人怀旧复古的感觉等，那我选择牛皮纸。

![](https://pica.zhimg.com/v2-12497ac8d6f565375161142ddf4ba046_1440w.jpg)

最后生成的PPT效果如下。

![动图封面](https://pic2.zhimg.com/v2-14ac3adcb7c615c711d7f53ee579fab1_b.jpg)

## frontend-slides

这个技能可以创建出动画丰富的HTML演示文稿，它支持你从零开始制作PPT，也可以把现有的pptx文件转换成动画丰富的演示文稿。

使用上也不复杂，只需要拷贝下面的命令发送给WorkBuddy，便可以让WorkBuddy把这个Skill给安装上了。

```
https://github.com/zarazhangrui/frontend-slides，帮我安装一下这个Skill
```

WorkBuddy对这种第三方的Skill安装前会进行审计，确定第三方的Skill是否有风险，这个还是很好用的。

![](https://pic4.zhimg.com/v2-9fe56654b42d950ec69cfa434a453223_1440w.jpg)

安装好之后，便可以让用它来制作PPT了，我们输入文章开头的制作《给阿嫲的情书》的电影介绍PPT。

这个Skill在制作PPT之前，会先询问你的PPT演示文稿的用途、需要多少张PPT、生成后是否可以在浏览器里面编辑文字，按照自己的需求进行选择即可。

![](https://pic1.zhimg.com/v2-e022b9ec82e6e439839dfc8fd8acdf26_1440w.jpg)

除此之外，frontend-slides还会询问是否要自己选择演示文稿的风格？以及期望PPT受众阅读后什么感受？

![](https://pic4.zhimg.com/v2-8b96b733a9333a40feffeb5f5958a303_1440w.jpg)

在回答完上面的问题之后，frontend-slides还会给提供几种风格的PPT让你选择，我选择style-c（纸与墨）风格。

![](https://pica.zhimg.com/v2-0827043b1413db9643c75f028b58436a_1440w.jpg)

看看frontend-slides这个Skill给生成的PPT的效果。

![动图封面](https://pic1.zhimg.com/v2-d8eea22f6cbc51a381a8b76a3671b852_b.jpg)

## html-ppt-skill

html-ppt-skill这个Skill内置了36套PPT主题、多种页面布局、多种动效动画，生成的PPT虽然是HTML，但是它却也有演讲者模式，能看到PPT演讲时的逐字稿和已经演讲的时长。

安装也比较简单，就是复制下面的这段提示词给到WorkBuddy，让它自己去读文档学习安装即可。

```
https://github.com/lewislulu/html-ppt-skill，帮我安装一下这个Skill
```

安装成功之后，便可以让WorkBuddy按照文章开头的任务去制作PPT了，只需要把制作PPT的提示词丢给它，让它使用html-ppt-skill来制作PPT。

这个Skill也会和你确认PPT的受众、风格的偏好以及PPT的内容布局排版。

![](https://pic2.zhimg.com/v2-01067d396a54219e4420f61c330bd38b_1440w.jpg)

我选择ppt观众是电影分享会、风格希望是sunset-warm、单页布局按需组合，可以看看PPT的效果。

![动图封面](https://pic4.zhimg.com/v2-5bdaf358000fa2dbb499d3c8fe9815f1_b.jpg)

左右键可以控制PPT的上一页和下一页，同时比较逆天的是，按下S键居然可以还可以开启演讲者模式，还有逐字稿，这感觉都能直接开讲了。

![](https://pic3.zhimg.com/v2-249b48c55f3d081d8811ee2e49898eac_1440w.jpg)

## huashu-design

这个Skill能做的东西比较多，除了能做PPT外，还能做动画、制作信息图等，它做出来的PPT也是html格式的。

Skill的按照比较简单，就是把Github的连接丢给WorkBuddy，让它帮忙安装即可。

```
https://github.com/alchaincyf/huashu-design，帮我安装一下这个Skill
```

这个Skill和frontend-slides类似，会先做两张PPT让你看看效果，满意则再继续，不满意的话可以调整。

![](https://pic2.zhimg.com/v2-1fcd51fcb258f4f25fbcd26dbed93379_1440w.jpg)

我就没有再调整了，让它继续生成，可以看看生成的PPT效果。

![动图封面](https://pic1.zhimg.com/v2-4347a80c96d0ecdceadca7c2baa71d48_b.jpg)

## 写到最后

分享的这5个Skill我使用下来的效果觉得都不错，交给WorkBuddy安装完成之后，基本上都是一句话需求就能交付出来想要的PPT，很方便。

frontend-slides给我的使用体验最好，虽然只能生成HTML格式的演示文稿，但是演示文稿中的文字是可以按下“E”快捷键进行修改的，修改起来很方便。

如果你需要生成pptx格式的文件，那么可以选择ppt-master和huashu-design这两个Skill，它们都是支持直接生成pptx格式的演示文稿的。

好了，本文的分享就到这里，如果您觉得有收获的话，可以给个一键三连，您的鼓励是吾鳴持续输出的最大动力。

发布于 2026-05-26 11:36・浙江

赞同 45