define(['jquery', 'jquery-cookie'],function($){
	function cart(){
		$(function(){			
			//清空购物车
			sc_car();
			// cookie();
			sc_msg();					
			
			//购物车数字
			function sc_car(){
				var sc_str = $.cookie("allgoods");
				if(sc_str){ //判断字符串是否存在
					var sc_arr = eval(sc_str);
					var goodsnum = 0;
					for(var i in sc_arr){
						goodsnum = Number(sc_arr[i].num) + goodsnum;
						
					}
					$(".numbox .goodsnum").html(goodsnum);
				}
				return goodsnum;
			}

			//已经存储在cookie数据进行加载
			function sc_msg(){
				console.log("cookie数据加载成功");
				$.ajax({
					url: "../data/goods.json",
					type: "get",
					success: function(res){
						console.log(res)
						if($.cookie("allgoods")){
							var sc_arr = eval($.cookie("allgoods"));
							var res = res.phones;
							console.log(sc_arr);
							//console.log(sc_arr[0].id);
							// console.log(res[0].img);
							var count = 0;
							for(var i in sc_arr){
								// console.log(res[sc_arr[i].id])
								var _pirce=Number(res[sc_arr[i].id].price.slice(2));
								count += Number(sc_arr[i].num*_pirce);
								$(`<ul class = "ul2">
									<li class ="li1"><input class = "show" input-id ="${sc_arr[i].id}" type="checkbox" checked></li>
									<li class ="li2">
										<a href="../html/phone.html">
											<img src="${res[sc_arr[i].id].img}" alt="">
											<span>${res[sc_arr[i].id].title}</span>
										</a>
									</li>
									<li class ="li3">${res[sc_arr[i].id].price}</li>
									<li class ="li4 center">
										<div>
											<a href="javascript:void(0);">
												<span class="span1" data-id="${sc_arr[i].id}"> — </span>
												<input type="text" value = "${sc_arr[i].num}" class="inp">
												<span class="span2" data-id="${sc_arr[i].id}"> + </span>
											</a>
										</div>
									</li>
									<li class ="li5">￥ ${(sc_arr[i].num)*(_pirce)}</li>
									<li class ="li6" li6-id = "${i}"><a href="javascript:void(0);">删除</a></li>
								</ul>`).appendTo(".ulbox");
							}

							//点击减少,数量和小计随着改变.
							$(".span1").on("click",function(){
								console.log($(this).parent('a').find('.inp').val());
								var num =$(this).parent('a').find('.inp').val();
								console.log(num)
								num--;
								//判断减到0时候，数量和价格都是0.
								if(num < 0){
									num = 0;
								}
								$(this).parent('a').find('.inp').val(num);
								var tml1 = Number($(this).parents(".ul2").find(".li3").html().slice(2));
								console.log(tml1);
								$(this).parents(".ul2").find(".li5").html("￥ " + tml1*num);
								//获取cookie并改变其数值.
								var sc_arr = eval($.cookie("allgoods"));
								console.log(sc_arr)
								console.log($(this).attr("data-id"));

								for(var i= 0;i<sc_arr.length;i++){
									if(sc_arr[i].id ==$(this).attr("data-id")){
										sc_arr[i].num = num;
									}
								}

								// sc_arr[$(this).attr("data-id")].num = num;
								console.log(num)
								var cookieStr = JSON.stringify(sc_arr);
								$.cookie("allgoods", cookieStr,  {
								expires: 7
								});
								//获取更新后的cookie，把所有的num加起来
								var sc_arr = eval($.cookie("allgoods"));
								var nums = 0;
								var prices = 0;
								for(var i =0;i< sc_arr.length;i++){
									console.log((sc_arr)[i].num);
									//所有购物车商品的总个数。
									nums = Number((sc_arr)[i].num) + nums;
									
									//所有商品的总价格。
									var _pirce = Number(res[sc_arr[i].id].price.slice(2));
									prices += Number(sc_arr[i].num*_pirce);
									
								}
								//修改总价的值
								$(this).parents(".bd").find(".allprice strong").html(nums);
								$(this).parents(".bd").find(".allprice .str").html("￥ " + prices);

							})
							//必须循环后点击,不知道什么时候加载出来.点击增加,数量和小计随着改变.
							$(".span2").on("click",function(){
							console.log($(this).parent('a').find('.inp').val());
							var num =$(this).parent('a').find('.inp').val();
							num++;
							$(this).parent('a').find('.inp').val(num);
							var tml2 = Number($(this).parents(".ul2").find(".li3").html().slice(2));
							console.log(tml2);
							$(this).parents(".ul2").find(".li5").html("￥ " + tml2*num);
							console.log(num);
							//获取cookie并改变其数值.
								var sc_arr = eval($.cookie("allgoods"));
								for(var i= 0;i<sc_arr.length;i++){
									if(sc_arr[i].id ==$(this).attr("data-id")){
										sc_arr[i].num = num;
									}
								}								
								
								var cookieStr = JSON.stringify(sc_arr);
								$.cookie("allgoods", cookieStr,  {
								expires: 7
								});
								//获取更新后的cookie，把所有的num加起来
								var sc_arr = eval($.cookie("allgoods"));
								var nums = 0;
								var prices = 0;
								for(var i =0;i< sc_arr.length;i++){
									console.log((sc_arr)[i].num);
									//所有购物车商品的总个数。
									nums = Number((sc_arr)[i].num) + nums;
									
									//所有商品的总价格。
									var _pirce = Number(res[sc_arr[i].id].price.slice(2));
									prices += Number(sc_arr[i].num*_pirce);
									
								}
								$(this).parents(".bd").find(".allprice strong").html(nums);
								$(this).parents(".bd").find(".allprice .str").html("￥ " + prices);
							})
							
							
							//给删除按钮添加点击事件
							$(".li6").on("click",function(){
								//删除网页内容
								$(this).parents(".ul2").remove();
								//删除cookie内容
								var sc_arr = eval($.cookie("allgoods"));
								sc_arr.splice($(this).attr("li6-id"),1);
								console.log(sc_arr);											
								var cookieStr = JSON.stringify(sc_arr);
								$.cookie("allgoods", cookieStr,  {expires: 7});	
								//获取更新后的cookie，把所有的num加起来
								var sc_arr = eval($.cookie("allgoods"));
								var nums = 0;
								var prices = 0;
								for(var i =0;i< sc_arr.length;i++){
									//所有购物车商品的总个数。
									$(".li6").attr("li6-id","i");
									nums = Number((sc_arr)[i].num) + nums;
									console.log(nums);
									
									//所有商品的总价格。
									var _pirce = Number(res[sc_arr[i].id].price.slice(2));
									prices += Number(sc_arr[i].num*_pirce);
									
								}

								$(".allprice .span1 strong").html(`${nums}`);
								$(".allprice .str ").html("￥ " + prices);

							})
							//给每个ul2里的input加点击事件，让总价因被选中或取消随之改变
							//但需要改页面上的数值，不能改变cookie。

							$(".li1 input").on("click",function(){
								
								if($(this).attr("class") == "show"){
									var num1 = $(this).parents(".ul2").find(".li4 input").val();
									var num2 = $(".allprice .span1 strong").html();
									var price1 = Number($(this).parents(".ul2").find(".li5").html().slice(2));
									var price2 = Number($(".allprice .str").html().slice(2));
									var prices = price2 - price1;
									var nums = num2 - num1;
									$(".allprice .str").html("￥ " + prices);
									$(".allprice .span1 strong").html(nums);
									$(this).removeClass();
								}else{
									var num1 = $(this).parents(".ul2").find(".li4 input").val();
									var num2 = $(".allprice .span1 strong").html();
									var price1 = Number($(this).parents(".ul2").find(".li5").html().slice(2));
									var price2 = Number($(".allprice .str").html().slice(2));
									var prices = Number(price2) + Number(price1);
									var nums = Number(num2) + Number(num1);
									$(".allprice strong").html("￥ " + prices);
									$(".allprice .span1 strong").html(nums);
									$(this).addClass("show");
								}
							})


							$(`<span class = "span1">已选择 <strong>${sc_car()}</strong>件商品</span>
								<span>总价 ：<strong class = "str">￥ ${count}</strong></span>
								<a href="">去结算</a>`).appendTo(".allprice");

						}
					}
				})
			}
		})

	}
		return {
			cart:cart
		}
})

