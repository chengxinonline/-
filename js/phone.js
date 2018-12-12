define(["jquery"],function($){
    function phone(){
        $(function(){

            // 鼠标移出隐藏选择框
            $(".winSelector").mouseleave(function(){
              $('.position_box').css('display','none');
              $('.rightbox').css('display','none');
            });
             // 鼠标移入展示选择框
            $(".winSelector").mousemove(function(ev) {
                $('.position_box').css('display','block');
                $('.rightbox').css('display','block');
             });

            //鼠标定位
             $(".winSelector").mousemove(function(ev) {
                var left = ev.offsetX - ($(".position_box").width())/2;
                var awidth= $('.bigImg')[0].offsetWidth-$(".position_box")[0].offsetWidth;
                // 设置定位框移动left偏移量
                if(left<0){
                    left=0;
                }
                if(left>awidth){
                    left=awidth;
                    console.log(left)
                }
                $(".position_box").css('left',left+'px');

                // 设置定位框移动top偏移量
                var top = ev.offsetY - $(".position_box").height()/2;
                var atop = $('.bigImg')[0].offsetHeight-$(".position_box")[0].offsetHeight;
                if(top<0){
                    top=0;
                }else if(top>atop){
                    top=atop;
                }
                $(".position_box").css('top',top+'px');

             //移动的比例  把X值和Y值换算成比例;

            var proportionX=left/($('.bigImg')[0].offsetWidth-$(".position_box")[0].offsetWidth);
            var proportionY=top/($('.bigImg')[0].offsetHeight-$(".position_box")[0].offsetHeight);

            console.log(proportionX+':'+proportionY)

            //利用比例去算出大小不同的元素的偏移距离；
            $('.rightimg').css('left',-proportionX*($('.rightimg')[0].offsetWidth-$('.rightbox')[0].offsetWidth)+'px');
            $('.rightimg').css('top',-proportionY*($('.rightimg')[0].offsetHeight-$('.rightbox')[0].offsetHeight)+'px');

             });

        })




    }
    return{
        phone:phone
    }
})