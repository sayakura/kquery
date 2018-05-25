不知道为啥就是不喜欢jquery，可能因为它太大了，于是想自己写一个自己version，因为平时感觉它很多功能都用不上，这里提供一个思路吧，我瞄了一眼jquery的源代码，全是正则表达式，看着头疼也不知道在干嘛，于是自己想了个骚办法来实现。以下是思路。

我今天吃饭的时候在想，jquery最好用的不就是那个选择器"$()"，这个选择器的参数是css选择器，比如"#el",".el"，于是我脑海里浮现出了

function name(el){

}

然后我突然惊觉，如果我用$做名字，岂不是就能达到这个效果？
于是

var $ = function(element){

}

出现了，这样我就能 $(".el")

所以我直接


var $ = function(element){
  return document.querySelector(element);//暂时先选一个
}

然后问题来了，jquery是允许你 $(".el").onClick(func(){});的，这个写法看上去就像onClick是$(".el")的内部函数一样，于是我脑海里浮现了, prototype.onClick = function(){}

于是我是这样搞的

var $ = function(element){
  this.el = document.querySelector(element);
  this.onClick = function(func){
  	this.el.addEventListener('click',func);
  }
}

这样写有个坏处就是，你得实例化这个对象，必须 var el = new $('.el');
el.onClick(...);
这样明显违不给力，所以我在想，我能怎样绕过去，不用实例化，我脑海里出现了vuejs 里面得method，灵光一闪，如果我把每个el转换成object，不就能直接 .onClick了吗？ 这个onClick是它里面的一个key，对象是支持这样的写法的。。于是——


let $ = function(element){
  let el = {};
  el["self"] = document.querySelectorAll(element);
  el["onClick"] = function(func){
      for(let i = 0; i < el["self"].length; i++){
        el["self"][i].addEventListener("click",func);
      }
  };
  return el;
}

然后我测试：


  $('.el').onClick(function(){
    alert("??");
  })

稳如狗，最后我再造了一个document.ready()的功能，

let ready = function(callback){
  document.addEventListener("DOMContentLoaded", function(event) {
    callback();
  });
}

就完成了大概的骨架了


ready(function(){
  $('.el').onClick(function(){
    alert("??");
  })
  $('#guapi').onClick(function(){
    console.log("test");
  })
});

一共15行，把这个简单的功能实现了，挺好使的， 然后我慢慢加功能吧（基本上用到再加，这样基本上结果就是能做出一个只装经常用的代码的自己的版本的jquery）
