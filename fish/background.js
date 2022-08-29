let timeSpan = 1 //多少秒统计一次
let reg= /bytedance|github|feishu|google|csdn|segmentfault|zhihu|volcanicengine|byted|figma|localhost|leetcode|feishu|juejin/g //屏蔽一些工作网站
let timeArr = [[9,12],[14,19]] //什么时间算工作时间

async function init(){
  return new Promise(r=>{
    chrome.storage.local.get('setting',res=>{
      //根据setting修改 工作时间和工作网站配置。
      let bans = res?.setting?.bans
      let time = res?.setting?.time
      if(bans){reg = new RegExp(bans.join('|'))}
      if(time){timeArr=time?.map(item=>item.split('-'))}
      console.log(reg,timeArr)
      r()
    })
  })
}

// 存储网站的访问时间.r是外面promise的resolve，为了让外面可以异步。
async function saveTime(url) {
  if (filterUrl(url)) {return;}
  let domain = extractDomain(url);
  if(isWorkRelatedWeb(domain)){return;}
  if(!isWorkTime()){return;} //哈哈哈非工作时间不统计，非工作时间不能调试这部分功能啦。
  let date = getDateString()
  chrome.storage.local.get(date,obj=>{
    if(!obj[date]){
      obj = {[date]:{[domain]:timeSpan}}
    }else if(!obj[date][domain]){
      obj[date][domain] = timeSpan
    }else{
      obj[date][domain] += timeSpan
    }
    chrome.storage.local.set(obj)
  })
}
//返回一个时间，格式：2018/1/25
function getDateString(millis) {
  if (millis != null) {
      return new Date(millis).toLocaleDateString("zh-Hans-CN");
  } else {
      return new Date().toLocaleDateString("zh-Hans-CN");
  }
}
// 返回根据url求出的域名
function extractDomain(url) {
  var re = /:\/\/(www\.)?(.+?)\//;
  return url.match(re)[2];
}
function filterUrl(url) {
  if (url == null || url == "") {
    return true;
  }

  // 进入Chrome的内置页面，就不用计时了，停止计时状态
  if (url.startsWith("chrome://") || url.startsWith("chrome-extension://") || url.startsWith("file://")) {
    return true;
  }
  // 下载链接类型
  if (url.startsWith("ed2k://")) {
    return true;
  }
}
function isWorkRelatedWeb(domain){
  return reg.test(domain)
}
function isWorkTime(){
  let timeNow = new Date().getHours();//取得当前时间的小时
  return timeArr.some(item => (timeNow >= item[0] && timeNow < item[1]))
}

init().then(
  // 定时循环任务, 每5秒计算一次.
  setInterval(async function () {
    // console.log('interval')
    //下面这一堆就是为了获取当前聚焦的tab。
    chrome.windows.getAll(async function (windows) {
      windows.some(window=>{ //找到focus的tab
          if (window.focused) { 
            chrome.windows.get(window.id, { populate: true }, async function callback(window) {
              window.tabs.forEach(function (tab) {
                if (tab.highlighted) {
                  saveTime(tab.url)
                }
              });
            })
            return true
          }
      })
    });
  }, timeSpan*1000)
)




// //v3版本的extension，开启后过一会自己就死了。试试下面的代码能不能让它一直活着。试试发布了之后还用不用下面这段代码了
// var wakeup = function(){
//   setTimeout(function(){
//       chrome.runtime.sendMessage('ping', function(response){
//           console.log(response);
//       });
//       wakeup();
//   }, 1000);
// }
// wakeup();
// chrome.runtime.onMessage.addListener(function(request, sender, sendResponse){
//   if( request == "ping" ){
//       console.log(request);
//       sendResponse("pong");
//       return;
//   }
//   sendResponse();
// });