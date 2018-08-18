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

//登入拦截功能,登入页面不需要拦截
//前后分离.前端是不知道该用户是否登录了.后台知道登入没
//发送ajax请求,查询用户状态即可
//1. 用户已登入,让用户继续访问
//2.用户未登入,拦截到登入页
if(location.href.indexOf("login.html")=== -1){
  $.ajax({
    type:"get",
    url:"/employee/checkRootLogin",
    success:function(info){
      console.log(info);
      if(info.success){
        console.log("用户已登入")
      }
      if(info.error === 400){
        console.log("拦截到登入页");
        location.href="login.html";
      }
    }
  })
}


$(function(){
  // 1.分类管理的的切换功能
  $('.nav .category').click(function(){
    $('.nav .child').stop().slideToggle();
  })
  // 2.左侧侧边栏切换功能
  $('.icon_menu').click(function(){
    $('.lt-aside').toggleClass('hideMenu');
    $('.lt_main').toggleClass('hideMenu');
    $('.lt_topbar').toggleClass('hideMenu');
  })

  // 3.点击退出按钮弹出模态框

  $('.icon_logout').click(function(){
    $('#logOut_modal').modal('show')
  })

//点击模态框的退出按钮
$('#logout_btn').click(function(){
  $.ajax({
    type:"get",
    url:"/employee/employeeLogout",
    dataType:"json",
    success:function(info){
      console.log(info);
      if(info.success){
        //退出成功
        location.href="login.html";
      }
      ;
      
    }
  })
})

})