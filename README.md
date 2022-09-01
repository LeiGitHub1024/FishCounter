# FishScientifically
chrome插件，科学摸鱼，摸鱼时间统计

# 核心功能
展示每天、每周的「摸鱼时间」，摸鱼时间，是指工作时间（工作日9-12,2-7）内访问非工作网站的时间。工作网站主要是字节员工常访问的网站。
工作时间可工作网站都可以配置。

# done
1.写一个工作网站判断器 
2.写一个工作时间统计器 这个结合项目来写吧 
3.借鉴时间都去哪了，记录时间 done，已经存到storage里了 
4.写一个popup页面，展示今天的摸鱼时间分布图
5.写一个popup页面，展示本周的摸鱼时间分布图。

# 开发时遇到的问题
1. 在MV3的 background.js 中localStorage被完全禁止使用（注意，只是background），所以需要有替代方案，两个：indexedDB ：如果是简单使用，不太建议，太重
chrome.storage ：简单使用合适，但它有另外的问题(异步)
2. 我写了一个正则，把它包在函数里，结果同样的输入，输出的结果确实一次true，一次false.代码如下：
```
let reg= /bytedance|github|feishu/g //屏蔽一些工作网站
function isWorkRelatedWeb(domain){
  return reg.test(domain)
}
isWorkRelatedWeb('github')

```
最后发现是「 /g 」捣的鬼，它会保存上次test的index，下次从index往后来查询，导致这次true，下次false。
网上有详细的解析：https://stackoverflow.com/questions/20463349/why-the-results-from-running-exactly-the-same-regular-expression-twice-are-diffe
# 参考了 https://xieyufei.com/2021/11/09/Chrome-Plugin.html


为了通过验证，先把这个放开。
let reg= /bytedance|github|feishu|google|csdn|segmentfault|zhihu|volcanicengine|byted|figma|localhost|leetcode|feishu|juejin/i //屏蔽一些工作网站
let timeArr = [[9,12],[14,19]] //什么时间算工作时间