
//配置的字段和input框中指定的name关联,所以必须给input加name
$(function(){

  $("#form").bootstrapValidator({

    //2. 指定校验时的图标显示，默认是bootstrap风格
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',//效验成功的图表
      invalid: 'glyphicon glyphicon-remove',//校验失败
      validating: 'glyphicon glyphicon-refresh'//校验中
    },

    //配置字段
    fields:{
      username:{
        validators:{
          notEmpty:{
            message:"用户名不能为空"
          },
          stringLength: {
            min: 2,
            max: 6,
            message: "用户名长度必须在 2-6 位"
          },//专门用于配置回调提示的规则
          callback:{
            message:"用户名不存在!"
          }
        }

      },
      password:{
        validators:{
          notEmpty:{
            message:"密码不能为空"
          },
          stringLength:{
            min:6,
            max:12,
            message:"密码长度必须是6-12位"
          },
          callback:{
            message:"密码错误"
          }
        }
      }
    }
  });

  //表单校验插件会在提交表单时进行效验
  //1.校验成功,默认提交发生跳转,阻止默认提交,通过ajax进行发送请求
  $('#form').on("success.form.bv",function(e){
    e.preventDefault();
    //阻止默认的表单提交
    // console.log('效验成功后的,表单提交被阻止了')
    //通过ajax进行提交
    $.ajax({
      type:"post",
      url:"/employee/employeeLogin",
      data:$('#form').serialize(),
      dataType:"json",
      success:function(info){
         console.log(info);
        if(info.success){
          location.href = "index.html";
        }
        if(info.error === 1000){
          // alert("当前用户名不存在");
          //更新效验状态, 1. 字段名称,2校验状态,VALID, INVALID,NOT_VALIDATED未校验, VALIDATING校验中
          //3. 
          $("#form").data('bootstrapValidator').updateStatus("username","INVALID","callback");
        }
        if(info.error === 1001){
          // alert("密码错误!");
          $("#form").data('bootstrapValidator').updateStatus("password","INVALID","callback");
        }
      }
    })
  })

  $('[type="reset"]').click(function(){
    //调用插件的方法.进行重置校验状态
    //resetForm(boolean)传true重置内容以及校验状态.false只重置校验状态.默认false
    $("#form").data("bootstrapValidator").resetForm();
  })
})