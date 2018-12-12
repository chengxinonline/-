define(["jquery","jquery-cookie"],function($){
    function login(){
        $(function(){
            var type = 1;
            //选择登录方式添加点击事件
            //第一种账号登陆
            $(".login-top-right .login-select .span1").click(function(){
                $(".span2").removeClass('aaa');
                $(".span1").addClass("aaa");
                //短信登陆隐藏
                $(".phoneBox").css("display","none");
                $(".formBox").css("display","block");
                type = 1;
            })
            //第二种手机号登陆
            $(".login-top-right .login-select .span2").click(function(){
                $(".span1").removeClass('aaa');
                $(".span2").addClass("aaa");
                //账号登陆隐藏，手机登陆显现
                $(".formBox").css("display","none");
                $(".phoneBox").css("display","block");
                type = 2;
            })

             //手机格式正确，验证和数据库的数据是否一致
            $(".login-top-right .login-button .btn").on('click',function(){
                //判断执行的哪个登陆方式。或者在选择登陆方式的时候，给登陆按钮添加class名
                if(type == 1){
                     var ovalue = $(".username").val();
                     console.log(ovalue)
                    if(!(/^1[34578]\d{9}$/.test(ovalue))){
                        alert("手机号码格式错误,请输入正确的手机号");
                        return;
                    }
                    var pasvalue = $(".password").val();
                    // console.log(pasvalue)
                    if(!pasvalue){
                        alert("请输入密码!");
                        return;
                    }
                    //需要传输数据的拼接  username=用户名&password=密码
                    var str = `username=${$(".username").val()}&password=${$(".password").val()}`;
                    $.ajax({
                        method: "post",
                        url: "../php/login.php",
                        data: str,
                        success: function(data){
                            location.href = "../index.html";
                            
                        },
                        error: function(msg){
                            console.log(msg);
                        }
                    })
                }else{
                    var ovalue = $(".username").val();
                    if(!(/^1[34578]\d{9}$/.test(ovalue))){
                        alert("手机号码格式错误");
                        return;
                    }
                //需要传输数据的拼接  username=用户名
                    var str = `username=${$(".username").val()}`;
                    $.ajax({
                        method: "post",
                        url: "../php/login.php",
                        data: str,
                        success: function(data){
                            alert("手机号码错误，请重新输入");
                        },
                        error: function(msg){
                            alert(msg);
                        }
                    })
                }
            })  

        })

    }
    return {
        login:login
    }

})






