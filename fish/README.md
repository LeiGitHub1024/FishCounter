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

# 开发是遇到的问题
在MV3的 background.js 中localStorage被完全禁止使用（注意，只是background），所以需要有替代方案，两个：indexedDB ：如果是简单使用，不太建议，太重
chrome.storage ：简单使用合适，但它有另外的问题
# 参考了 https://xieyufei.com/2021/11/09/Chrome-Plugin.html

