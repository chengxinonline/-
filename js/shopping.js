define(['jquery', 'jquery-cookie'],function($){
	function shopping(){
		$(function(){
			//清空购物车
			sc_car();		
			//引入商品数据
			$.ajax({
				url:"../data/goods.json",
				success:function(data){
					var phonesArr = data.phones;
					console.log("商品数据加载完成");
					for(var i = 0;i < phonesArr.length;i++){
						$(`<li class="list-item">
								<dl class="desc">
									<dt class="pic">
										<a href="../html/phone.html"><img src="${phonesArr[i].img}" alt=""></a>
									</dt>
									<dd class="cont">
										<span class = "title">${phonesArr[i].title}</span>
										<span class="price">${phonesArr[i].price}</span>

									</dd>
									<dd class="addtns" id = "${phonesArr[i].id}">
										<a href="javacript:void(0);" >加入购物车</a>
									</dd>
								</dl>
								<div class="addsuccess">成功添加至购物车</div>
							</li>
						`).appendTo(".goodsBox .goods .list");
					}
					//li产品移入移出加入购物车按钮样式
					$(".goods .list .list-item").mouseenter(function(){
						$(this).css("border","1px solid red");
						$(this).find(".addtns").css("display","block");
					})
					$(".goods .list .list-item").mouseleave(function(){
						$(this).css("border","1px solid #E4E4E4");
						$(this).find(".addtns").css("display","none");
					})
					//移入移出点击购物车按钮的时候变化
					$(".goods .list .list-item .addtns").mouseenter(function(){
						$(this).css("background"," red url(../images/5[1T@5HK0CLCMY9EH4O$[R1.png) no-repeat 7px 2px");
						$(this).find("a").css("color","white");


					})
					$(".goods .list .list-item .addtns").mouseleave(function(){
						$(this).css("background","#fff url(../images/icon_add_to_cart.png) no-repeat 7px 4px");
						$(this).find("a").css("color","red");
					})
					$(".goods .list .list-item").on("click",function(){

						console.log($(this).find(".addtns").attr("id"))
						$(this).find(".addsuccess").stop().animate({bottom: 0},1000,function(){
						$(".addsuccess").stop().animate({bottom: -36},1000);
						})
					})

				},
				error:function(msg){
					console.log(msg);
				}
			})

			//给购物车按钮添加事件
			$(".goods .list").on("click",".addtns",function(){
				 // alert(this.id);
				//是否是第一次添加cookie
				var id = this.id;
				console.log(id)
				var first = $.cookie("allgoods") == null ? true : false;
				if(first){
					//第一次添加  [{id:id,num:2}]
					$.cookie("allgoods", '[{id:' + id + ',num:1}]', {
						expires: 7
					});
					console.log($.cookie("allgoods"))
				}else{
					var str = $.cookie("allgoods");
					var arr = eval(str);
					var same = false; //代表是否有相同商品

					//遍历所有的对象，判断是否id相同，num++
					for(var i in arr){
						if(arr[i].id == id){
							arr[i].num = arr[i].num + 1;
							var cookieStr = JSON.stringify(arr);
							$.cookie("allgoods", cookieStr,  {
								expires: 7
							});
							same = true;
							break;
						}
					}
					//没有相同的商品
					if(!same){
						var obj = {id: id, num: 1};
						arr.push(obj);
						var cookieStr = JSON.stringify(arr);
						$.cookie("allgoods", cookieStr, {
							expires: 7
						});
					}					
				}
				sc_car();
				// alert($.cookie("allgoods"));
				return false;				
			})
			/*
				mouseenter  移入
				mouseleave  移出
			*/
		
				
			$(".numbox").mouseenter(function(){		
				$(".goods .cart").css("display","block");
				$(".cart").html("");	
					
				sc_msg();
			});
			$(".goods").mouseleave(function(){
				$(".goods .cart").css("display","none");
			});
			//购物车数字
			function sc_car(){
				var sc_str = $.cookie("allgoods");
				console.log($.cookie("allgoods"))
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
						if($.cookie("allgoods")){
							var sc_arr = eval($.cookie("allgoods"));
							var res = res.phones;
							console.log(sc_arr);
							//console.log(sc_arr[0].id);
							// console.log(res[0].img);
							var count=0;
							for(var i in sc_arr){
								
								var _pirce=Number(res[sc_arr[i].id].price.slice(2));
								count+=Number(sc_arr[i].num*_pirce);
								$(`	<ul class="cart-list">
									<li class="cart-item">
										<a class= "a1" href="../html/phone.html"><img src="${res[sc_arr[i].id].img}" alt=""></a>
										<span class = "span0">${res[sc_arr[i].id].price}</span>
										<span class = "span1"><strong>${res[sc_arr[i].id].title}</strong></span>
										<span class="span2">${sc_arr[i].num}</span>
										<a href="" class="a2"></a>
								</li>
								</ul>`).appendTo(".cart");
								
								//html += '<li><div class="sc_goodsPic"><img src="'+res[sc_arr[i].id].img+'" alt=""></div><div class="sc_goodsTitle"><p>'+res[sc_arr[i].id].title+'</p></div><div class="sc_goodsBtn" id="'+sc_arr[i].id+'">购买</div><div class="sc_goodsNum">商品数量:'+sc_arr[i].num+'</div></li>';
							}
							$(`<div class="cart-count">
									<span style = "color:#31373c;">
										共 <b>${sc_car()}</b> 件商品 总计：<b style="color:#e94c30;"> ￥ ${count}</b>
									</span>
									<a href="../html/cart.html">去购物车结算</a>
								</div>`).appendTo(".cart");
							// $(".goods ul").html(html);
						}
					}
				})
			}
			

			//导航栏移入移出有下拉效果
			$(".nav-ul .a").mouseenter(function(){
				$(this).find(".li").css("color","#23ac38");
				// console.log(($(this).index()));
				$(".nav-ul .sublistbox").css("display","none")
				.eq(($(this).index()) - 1).css("display","block");
				$(".sublistbox").eq(5).css("display","none");

			})
						
			$(".nav-ul a").mouseleave(function(){
				$(this).find(".li").css("color","black");
			})
			$(".nav-ul").mouseleave(function(){
				$(this).find(".li").css("color","black");								
				$(".nav-ul .sublistbox").css("display","none")
				;
			})
			//ajax引入数据
			$.ajax({
				url:"../data/shopping.json",
				success:function(data){
					var phonesArr = data.phones;
					var watchsArr = data.watchs;
					var carsArr = data.cars;
					var homesArr = data.homes;
					var routerArr = data.Router;
					var dvArr = data.DV;
					console.log("数据下载完成3");
					//手机数据
					for(var i= 0;i < phonesArr.length;i++){
						$(`<a href="">
							<li>
								<img src="${phonesArr[i].img}" alt="" />
								<span>"${phonesArr[i].title}"</span>
								<i>${phonesArr[i].price}</i>
							</li>
						</a>`).appendTo($(".sublistbox")[0]);
					}
					//行车记录仪数据
					for(var i= 0;i < carsArr.length;i++){
						$(`<a href="">
							<li>
								<img src="${carsArr[i].img}" alt="" />
								<span>"${carsArr[i].title}"</span>
								<i>${carsArr[i].price}</i>
							</li>
						</a>`).appendTo($(".sublistbox")[1]);
					}
					//手表儿童数据
					for(var i= 0;i < watchsArr.length;i++){
						$(`<a href="">
							<li>
								<img src="${watchsArr[i].img}" alt="" />
								<span>"${watchsArr[i].title}"</span>
								<i>${watchsArr[i].price}</i>
							</li>
						</a>`).appendTo($(".sublistbox")[2]);
					}
					//摄像机数据
					for(var i= 0;i < dvArr.length;i++){
						$(`<a href="">
							<li>
								<img src="${dvArr[i].img}" alt="" />
								<span>"${dvArr[i].title}"</span>
								<i>${dvArr[i].price}</i>
							</li>
						</a>`).appendTo($(".sublistbox")[3]);
					}
					//路由器
					for(var i= 0;i < routerArr.length;i++){
						$(`<a href="">
							<li>
								<img src="${routerArr[i].img}" alt="" />
								<span>"${routerArr[i].title}"</span>
								<i>${routerArr[i].price}</i>
							</li>
						</a>`).appendTo($(".sublistbox")[4]);
					}
					//机器人数据
					for(var i= 0;i < homesArr.length;i++){
						$(`<a href="">
							<li>
								<img src="${homesArr[i].img}" alt="" />
								<span>"${homesArr[i].title}"</span>
								<i>${homesArr[i].price}</i>
							</li>
						</a>`).appendTo($(".sublistbox")[6]);
					}

				},
				error:function(msg){
					console.log(msg);	
				}
			})
		})
	}
	return {
		shopping:shopping
	}
})