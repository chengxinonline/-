define(["jquery","jquery-cookie"],function($){
    function register(){

        $(function(){
    
            //验证手机号
            $(".centerBox .center .username").blur(function(){
                var ovalue = $(".username").val();
                if(!(/^1[34578]\d{9}$/.test(ovalue))){
                     $(".user-p").html("手机号码格式错误");
                }else{
                    $(".user-p").html("手机号码格式正确").css("color","green");
                }
            })

            //验证密码
             $(".centerBox .center .password").blur(function(){
                 var ovalue = $(".password").val();
                 ovalue = ovalue.replace(/ /g,"");
                if(ovalue.length > 16 || ovalue.length < 6){
                    $(".pass-p") .html("密码长度应为6 - 16 个字符").css({
                        color:"red",
                        fontSize:12,
                        marginLeft:200,
                    });
                }else{
                    $(".pass-p") .html("可以使用该密码").css({
                        color:"green",
                        fontSize:12,
                        marginLeft:200,
                    });
                }   
             })
             //获取焦点是更新验证码
             $(".centerBox .center .codeBox .inp1").focus(function(){
                 $(".code-span").html(code(4));
             })
             //验证码
            $(".centerBox .center .codeBox .code-span").click(function(){
                $(".code-span").html(code(4));
            })

            //验证验证码
            $(".centerBox .center .codeBox .inp1").blur(function(){
                //验证码不区分大小写
                var ovalue = $(".inp1").val().toLowerCase();
                var ohtml = $(".code-span").html().toLowerCase();
                if(ovalue != ohtml){
                    $(".code-p").html("验证码错误,请重新输入").css({
                        color:"red",
                        fontSize:12,
                        marginLeft:40,
                        paddingTop:20, 
                    });
                    $(".code-span").html(code(4));
                    $(".inp1").val("");
                }else{
                   $(".code-p").html("验证码输入正确").css({
                        color:"green",
                        fontSize:12,
                        marginLeft:40, 
                        paddingTop:20,
                    }); 
                }

            })
                    
            //给下一步添加点击事件
            $(".inp3").click(function(){
                //需要传输数据的拼接  username=用户名&password=密码
                var str = `username=${$(".username").val()}&password=${$(".password").val()}`;
                $.ajax({
                    method: "post",
                    url: "../php/register.php",
                    data: str,
                    success: function(data){
                        alert("ok");
                    },
                    error: function(msg){
                        alert("no");
                    }
                })

            })




        })
        // 验证码：
        function code (n){
            var arr = [];
            for(var i = 0; i < n; i++){
                var num = parseInt(Math.random() * 10000);
                if(num >= 0 && num <= 9){
                    arr.push(num);
                }else if(num >= 65 && num <= 90){
                    var str = String.fromCharCode(num);
                    arr.push(str);
                }else if(num >= 17 && num <= 42){
                    var str = String.fromCharCode(num + 80);
                    arr.push(str);
                }else{
                    i--;
                }
            }
            return arr.join("");
        }
    }
    return {
        register:register
    }
})

