//开启进度条
NProgress.start();
setTimeout(function(){
NProgress.done();
},2000)

//实现在第一个ajax发送的时候开启进度条
//在所有ajax结束的时候结束进度条
//ajax全局事件
//1.ajaxComplate() 当ajax请求完成是后触发.调用(不管成功还是失败都调用)
//2.ajaxError() 当ajax请求失败的的时候调用
//3.ajaxSuccess() 当ajax成功的时候调用
//4.ajaxSend() 在ajax发送之前调用.
//5.ajaxStart() 在第一个ajax发送时调用
//6.ajaxStop() 在所有的ajax请求都完成是调用

//在第一个ajax发送时调用
$(document).ajaxStart(function(){
  NProgress.start();
})

//在ajaxStop在所有的ajax完成是调用
$(document).ajaxStop(function(){
  
  setTimeout(function(){
    NProgress.done();
  },1000)
})