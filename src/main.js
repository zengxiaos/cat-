
    const $siteList = $('.siteList')
    const $lastLi =$siteList.find('li.last')
    const x =localStorage.getItem('X')
    const xObject =JSON.parse(x)
    const hashMap = xObject||[
  {logo:'A',url:"https://www.acfun.cn"},
  {logo:'B',url:"https://m.bilibili.com"},
]
const simplifyUrl=(url)=>{
  return url.replace('https://',"")
  .replace('http://',"")
  .replace('www.',"")
  .replace(/\/.*/,"") //正则表达式
  //repalce并不改变原有值，只是返回修改后的值
}
const render =()=>{
  $siteList.find(`li:not(.last)`).remove()
  hashMap.forEach((node,index)=>{
    const $li=$(`<li>
      <div class="site">
        <div class="logo">${node.logo[0]}</div>
        <div class="link">${simplifyUrl(node.url)}</div>
        <div class="close">
          <svg class="icon">
            <use xlink:href="#icon-close"></use>
          </svg>
        </div>
      </div>
  </li>`).insertBefore($lastLi)
  $li.on('click',()=>{
    window.open(node.url)
  })
  $li.on('click','.close',(e)=>{
    e.stopPropagation()
    console.log(hashMap)
    hashMap.splice(index,1)
    render()
  })
  })
}

render()

$(".addButton")
.on('click',()=>{
    let url=window.prompt('你需要添加什么网址呢？')//字符串记得加引号
    console.log(url)
    if(url.indexOf('http')!==0){
        url='https://'+url //const不可重复赋值，因此需要用let
    }
    console.log(url)
    hashMap.push(
      {logo:simplifyUrl(url)[0].toUpperCase(),
    url:url})
    console.log(hashMap)
    render()
})
window.onbeforeunload =()=>{
  const string = JSON.stringify(hashMap)
localStorage.setItem('x',string)
}

$('.sousuo').on('keypress',(e)=>{
  e.stopPropagation()
})

$(document).on('keypress',(e)=>{
  const {key}=e
  for(let i=0;i<hashMap.length;i++){
    if(hashMap[i].logo.toLowerCase()===key){
      window.open(hashMap[i].url)
    }

  

  }
})