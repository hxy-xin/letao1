
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
          }
        }
      },
      password:{
        validators:{
          notEmpty:{
            message:"密码不能为空"
          }
        },
        stringLength:{
          min:6,
          max:12,
          message:"密码长度必须是6-12位"
        }
      }
    }
  });
})