//这个是注入到用户页面的
/*
在manifest加入以下配置
"content_scripts":[
  {
    "matches": ["https://wwwww.wwww.www/*"],
    "js": ["inject.js"]
  }
]
*/
const changeFavicon = link => {
  let $favicon = document.querySelector('link[rel="icon"]')
  // If a <link rel="icon"> element already exists,
  // change its href to the given link.
  if ($favicon !== null) {
    $favicon.href = link
  // Otherwise, create a new element and append it to <head>.
  } else {
    $favicon = document.createElement("link")
    $favicon.rel = "icon"
    $favicon.href = link
    document.head.appendChild($favicon)
  }
}

changeFavicon("https://about.gitlab.com/nuxt-images/ico/favicon.ico")
