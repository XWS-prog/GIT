---
title: "(新版中英!) B站公认最好的【吴恩达机器学习】教程！附课件代码 Machine Learning Specialization"
source: "https://www.bilibili.com/video/BV16jyuBBEom?spm_id_from=333.788.player.switch&vd_source=944d279541b8d6f5497a19b5f9fc6bff&p=14"
author:
  - "[[吴恩达机器学习]]"
published: 2025-11-21
created: 2026-08-14
description: "deep learning.ai相信很多同学认识吴恩达大佬，在这门课上( machine earning specialization)你将自己编程实现机器学习。数百万人参加了这门课程的早期版本许多学习者，最终建立了令人兴奋的机器学习系统，甚至在人工智能AI领域获得非常成功的职业生涯。欢迎你的到来(配套课件、笔记已整理，求三连！ )"
tags:
  - "clippings"
---
<iframe width="560" height="315" src="https://player.bilibili.com/player.html?bvid=BV16jyuBBEom&amp;page=14&amp;high_quality=1&amp;danmaku=0" title="Bilibili video player" frameborder="0" allowfullscreen=""></iframe>

deep learning.ai  
相信很多同学认识吴恩达大佬，在这门课上( machine earning specialization)你将自己编程实现机器学习。数百万人参加了这门课程的早期版本许多学习者，最终建立了令人兴奋的机器学习系统，甚至在人工智能AI领域获得非常成功的职业生涯。欢迎你的到来  
(配套课件、笔记已整理，求三连！ )

## Transcript

**0:03** · 下面我们来看一些关于W和B的可视化示例 Let's look at some more visualizations of W and B. 这是一个例子 Here's one example. 在这里 你有一个在J图中的特定点 Over here, you have a particular point on the graph J. 对于这个点 W大约等于负0.15 B大约等于800 For this point, W equals about negative 0.15 and B equals about 800. 所以这个点对应于一对特定的W和B值 这对值会产生特定的成本J So this point corresponds to one pair of values for W and B that yields a particular cost J.

**0:30** · 事实上 这对特定的W和B值对应于这个函数 And in fact, this particular pair of values for W and B corresponds to this function, 即你在左边看到的这条线 f of x, which is this line that you can see on the left. 由于B等于800 这条线与垂直轴相交于800 线的斜率为负0.15 因为W This line intersects the vertical axis at 800 because B equals 800 and the slope of the line is negative 0.15 because W 等于负0.15 equals negative 0.15. 现在 如果你查看训练集中的数据点 Now, if you look at the data points in the training set,

**0:57** · 你可能会注意到这条线不适合这些数据 you may notice that this line is not a good fit to the data. 对于这个函数f(x) For this function f of x, 使用这些W和B值 with these values of W and B, 许多预测的y值和训练数据中的实际目标值差距较大 many of the predictions for the value of y are quite far from the actual target value of y that is in the training data. 因为这条线不适合 Because this line is not a good fit, 如果你查看J图 if you look at the graph of J, 这条线的成本在这里 the cost of this line is out here, 离最小值相当远 which is pretty far from the minimum.

**1:27** · 成本很高 因为这个W和B的选择不太适合训练集 It's a pretty high cost because this choice of W and B is just not that good a fit to the training set. 现在 我们来看另一个选择不同的W和B的例子 Now, let's look at another example with a different choice of W and B. 现在 这里还有一个函数 Now, here's another function that is, 你知道的 仍然不太适合这些数据 you know, still not a great fit for the data, 但可能稍微不那么糟糕 but maybe slightly less bad. 所以 这里的这一点代表了这个特定的W和B组合所产生的线的成本 So this point here represents the cost for this particular pair of W and B that creates that line.

**1:56** · W的值等于0 The value of W is equal to 0, B的值大约是360 and the value of B is about 360. 这个参数对对应这个函数 This pair of parameters corresponds to this function, 是一条平坦的线 which is a flat line, 因为f(x)等于0乘x加360 because f of x equals 0 times x plus 360. 希望这能说得清楚 I hope that makes sense. 我们再看另一个例子 Let's look at yet another example. 这是另一个W和B的选择 Here's one more choice for W and B. 用这些值 And with these values, 你最终得到这条线f(x) you end up with this line f of x.

**2:25** · 同样 不太适合这些数据 Again, not a great fit to the data. 实际上 和前一个例子相比 它离最小值更远 It's actually further away from the minimum compared to the previous example. 记住 最小值在那个最小椭圆的中心 And remember that the minimum is at the center of that smallest ellipse. 最后一个例子 Last example. 如果你看左边的f(x) If you look at f of x on the left, 它看起来非常适合训练集 this looks like a pretty good fit to the training set. 你可以看到右边 You can see on the right,

**2:49** · 代表代价的这个点非常接近小椭圆的中心 this point representing the cost is very close to the center of the small ellipse. 它不完全是最小值 It's not quite exactly the minimum, 但已经很接近了 but it's pretty close. 对于这个W和B的值 For this value of W and B, 你得到这条线f(x) you get this line f of x. 你可以看到 如果你测量数据点和直线预测值之间的垂直距离 You can see that if you measure the vertical distances between the data points and the predicted values on the straight 你就能得到每个数据点的误差 line, you get the error for each data point.

**3:18** · 所有这些数据点的平方误差和非常接近可能的最小平方误差和 The sum of squared errors for all of these data points is pretty close to the minimum possible sum of squared errors 在所有可能的直线拟合中 among all possible straight line fits. 希望通过观察这些图形 I hope that by looking at these figures, 你能更好地理解参数的不同选择如何影响直线f(x) 以及这如何对应于 you can get a better sense of how different choices of the parameters affect the line f of x and how this corresponds to 代价J的不同值 different values for the cost J.

**3:45** · 并且希望你能看到 拟合更好的直线对应于J图表上更接近 And hopefully, you can see how the better fit lines correspond to points on the graph of J that are closer to the 此代价函数J的最小可能代价的点 minimum possible cost for this cost function J of W and B. 在这段视频之后的可选实验中 In the optional lab that follows this video, 你可以运行一些代码 you get to run some code. 记住 所有代码都是提供的 And remember, all of the code is given, 所以你只需要按Shift+Enter来运行并观察 so you just need to hit shift enter to run it and take a look at it.

**4:13** · 实验会向你展示如何在代码中实现代价函数 And the lab will show you how the cost function is implemented in code. 给定一个小的训练集和不同的参数选择 And given a small training set and different choices for the parameters, 你将能够看到模型拟合数据的效果如何影响代价的变化 you'll be able to see how the cost varies depending on how well the model fits the data. 在可选实验中 你还可以玩一个交互式等高线图 In the optional lab, you also can play with an interactive contour plot. 看看这个 Check this out. 你可以用鼠标光标点击等高线图上的任何地方 你会看到直线由 You can use your mouse cursor to click anywhere on the contour plot and you will see the straight line defined by the

**4:42** · 你选择的参数W和B定义 values you chose for the parameters W and B. 你还会看到一个点出现在显示代价的3D表面图上 You see a dot appear also on the 3D surface plot showing the cost. 最后 可选实验还有一个3D表面图 你可以手动旋转和转动 用 Finally, the optional lab also has a 3D surface plot that you can manually rotate and spin around using your mouse 鼠标光标更好地观察代价函数的样子 cursor to take a better look at what the cost function looks like. 希望你喜欢玩这个可选实验 I hope you enjoy playing with the optional lab. 现在 在线性回归中 Now, in linear regression,

**5:10** · 不必手动尝试读取等高线图来找出最优的W和B值 rather than having to manually try to read a contour plot for the best value for W and B, 这实际上不是一个好的方法 而且一旦我们进入更复杂的机器学习模型 这种方法也行不通 which isn't really a good procedure and also won't work once we get to more complex machine learning models, 你真正需要的是一个高效的算法 可以用代码编写 自动找到 what you really want is an efficient algorithm that you can write in code for automatically finding the values of 能给出最优拟合线且最小化代价函数J的参数W和B值 parameters W and B that give you the best fit line that minimizes the cost function J. 有一个叫做梯度下降的算法可以做到这一点 There is an algorithm for doing this called gradient descent.

**5:38** · 这个算法是机器学习中最重要的算法之一 This algorithm is one of the most important algorithms in machine learning. 梯度下降及其变种不仅用于训练线性回归 还用于训练一些 Gradient descent and variations on gradient descent are used to train not just linear regression but some of the biggest 最大和最复杂的AI模型 and most complex models in all of AI. 所以让我们进入下一个视频 深入了解这个非常重要的算法——梯度下降 So let's go to the next video to dive into this really important algorithm called gradient descent.