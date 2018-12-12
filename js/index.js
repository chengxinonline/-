define(["jquery"],function($){
	function index(){
		$(function(){
			//右侧侧边栏
			$(".banner-ul a").mouseenter(function(){
				$(this).find("li").css({
					color:"#23ac38",
					background:"white"
				});
				$(".banner-ul .left-sub-list").css("display","none").eq($(this).index()).css({display:"block",background:"white"});
				// $(".banner-ul .left-sub-list .second-list").css("background","white");
				$(".banner-ul .left-sub-list .second-list li").css("background","white");
			})
			$(".banner-ul a").mouseleave(function(){
				$(this).find("li").css({
					background: "#e7e2f7",
					color:"black"
				})
			})
			$(".banner-ul").mouseleave(function(){
				$(this).find("li").css({
					background: "#e7e2f7",
					color:"black"
				});
				$(".banner-ul .left-sub-list").css("display","none");
			})
			//右侧侧边栏数据导入
			console.log("数据下载完成4");
			$.ajax({
				url:"../data/left.json",
				success:function(data){
					var Arr = data;
			
					for(var i = 0; i < Arr.length; i++){
						$(`<div class="left-sub-list">
								<ul class="second-list">
								</ul>								
							</div>`).appendTo($(".banner-ul"));
						for(var j = 0; j < Arr[i].child.length; j++){
							$(`<li><p>${Arr[i].child[j].name}</p></li>`).appendTo($(`.left-sub-list:eq(${i}) .second-list`));
							for(var k = 0; k < Arr[i].child[j].child.length; k++){
								$(`
									<div class = "imgspan"><a href="">
										<img src="${Arr[i].child[j].child[k].img}" alt="">
										<span>${Arr[i].child[j].child[k].title}</span></a>
									</div>
								`).appendTo($(`.banner-ul .left-sub-list:eq(${i}) li:eq(${j}) `));
							}
						}
						
					}
					
				},
				error:function(msg){
					console.log(msg);
				}
				})
						// for(var h = 0; h < Arr[i].childs.length;h++){
						// 	console.log(Arr[i].childs[h].name);
						// 	$(`
						// 		<li>${Arr[i].childs[h]}
						// 			<p></p>
						// 		</li>
						// 	`).appendTo($(".left-sub-list"));
						// 	for(var j = 0;j < Arr[i].childs[h].child.length;j++){
						// 		$(`<div class = "imgspan"><a href="">
						// 		<img src="${Arr[i].childs[h].child[j].img}" alt="">
						// 		<span>${Arr[i].childs[h].child[j].label}</span></a>
						// 	</div>`).appendTo("li");
						// 	}
						// }
						
						// for(var j = 0 ; j < childArr["child"].length;j++){
						// 	$(`<div class = "imgspan"><a href="">
						// 		<img src="${childArr["child"][i].img}" alt="">
						// 		<span>"${childArr["child"][i].label}"</span></a>
						// 	</div>`).appendTo($(".second-list"));
						// }


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
				url:"../data/index.json",
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
						$(`<a href="../html/phone.html">
							<li>
								<img src="${phonesArr[i].img}" alt="" />
								<span>"${phonesArr[i].title}"</span>
								<i>${phonesArr[i].price}</i>
							</li>
						</a>`).appendTo($(".sublistbox")[0]);
					}
					//行车记录仪数据
					for(var i= 0;i < carsArr.length;i++){
						$(`<a href="../html/phone.html">
							<li>
								<img src="${carsArr[i].img}" alt="" />
								<span>"${carsArr[i].title}"</span>
								<i>${carsArr[i].price}</i>
							</li>
						</a>`).appendTo($(".sublistbox")[1]);
					}
					//手表儿童数据
					for(var i= 0;i < watchsArr.length;i++){
						$(`<a href="../html/phone.html">
							<li>
								<img src="${watchsArr[i].img}" alt="" />
								<span>"${watchsArr[i].title}"</span>
								<i>${watchsArr[i].price}</i>
							</li>
						</a>`).appendTo($(".sublistbox")[2]);
					}
					//摄像机数据
					for(var i= 0;i < dvArr.length;i++){
						$(`<a href="../html/phone.html">
							<li>
								<img src="${dvArr[i].img}" alt="" />
								<span>"${dvArr[i].title}"</span>
								<i>${dvArr[i].price}</i>
							</li>
						</a>`).appendTo($(".sublistbox")[3]);
					}
					//路由器
					for(var i= 0;i < routerArr.length;i++){
						$(`<a href="../html/phone.html">
							<li>
								<img src="${routerArr[i].img}" alt="" />
								<span>"${routerArr[i].title}"</span>
								<i>${routerArr[i].price}</i>
							</li>
						</a>`).appendTo($(".sublistbox")[4]);
					}
					//机器人数据
					for(var i= 0;i < homesArr.length;i++){
						$(`<a href="../html/phone.html">
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




			//明星单品下轮播图引入数据
			$.ajax({
				url:"../data/index.json",
				success:function(data){
					var goodsArr = data.goods;
					console.log("数据下载完成");
					//取出数据
					for(var i = 0;i < goodsArr.length;i++){
						//创建li，插入ul
						$(`<a href="../html/phone.html">
						<li>
							<div class="imgBox"><img src="${goodsArr[i].img}" alt="" /></div>
							<h5 class="proname">${goodsArr[i].title}</h5>
							<p class="proprice">${goodsArr[i].price}</p>
						</li>
					</a>`).appendTo($(".starbox ul"));
					}
				},
				error:function(msg){
					console.log(msg);
				}

			})
			//让轮播按钮移入移出
			$(".starbox").hover(function(){
				$(".starbox img").css("z-index",990);	
			},function(){
				$(".starbox img").css("z-index",0);
			})
			var cont = 0,i = 0;
			$(".img2").on("click",function(){
				cont++;
				i = -1255*cont + "px";
				$(".starbox ul").css("left",i);
				if(cont == 3){
					cont = 0;
					$(".starbox ul").css("left",0);
				}
				// console.log(cont)
				// console.log(i)
			})
			$(".img1").on("click",function(){
				cont--;
				if(cont == -1){
					cont = 2;
					$(".starbox ul").css("left","-2510px");
				}else{
					 i = -1255*cont + "px";
					$(".starbox ul").css("left",i);
				}
				// console.log(cont)
				// console.log(i)
			})


			//手机配件数据请求
			$.ajax({
				url:"../data/index.json",
				success:function(data){
					var leftArr = data.left;
					var phonesArr = data.phones;
					var watchsArr = data.watchs;
					var carsArr = data.cars;
					var homesArr = data.homes;
					console.log("数据下载完成2");

					//取出左侧left数据
					for(var i = 0; i < leftArr.length;i++){
						//创建
						$(`<div class="floorleft">
								<div class="topimgbox">
									<a href="../html/phone.html"><img src="${leftArr[i].img1}" alt="" /></a>
								</div>
								<div class="bottomimgbox">
									<a href="#"><img src="${leftArr[i].img2}" alt="" /></a>
								</div>
							</div>`).appendTo($(".floorbox")[i]);
					}
					//list1数据
					for(var i= 0;i < phonesArr.length;i++){
						$(`<a href="../html/phone.html">
							<li>
								<div class="imgbox"><img src="${phonesArr[i].img}" alt="" /></div>
								<h5 class="proname">${phonesArr[i].title}</h5>
								<p class="proprice">${phonesArr[i].price}</p>
							</li>
						</a>`).appendTo($(".floorlist")[0]);
					}
					//list2数据
					for(var i= 0;i < watchsArr.length;i++){
						$(`<a href="../html/phone.html">
							<li>
								<div class="imgbox"><img src="${watchsArr[i].img}" alt="" /></div>
								<h5 class="proname">${watchsArr[i].title}</h5>
								<p class="proprice">${watchsArr[i].price}</p>
							</li>
						</a>`).appendTo($(".floorlist")[1]);
					}
					//list3数据
					for(var i= 0;i < carsArr.length;i++){
						$(`<a href="../html/phone.html">
							<li>
								<div class="imgbox"><img src="${carsArr[i].img}" alt="" /></div>
								<h5 class="proname">${carsArr[i].title}</h5>
								<p class="proprice">${carsArr[i].price}</p>
							</li>
						</a>`).appendTo($(".floorlist")[2]);
					}
					//list4数据
					for(var i= 0;i < homesArr.length;i++){
						$(`<a href="../html/phone.html">
							<li>
								<div class="imgbox"><img src="${homesArr[i].img}" alt="" /></div>
								<h5 class="proname">${homesArr[i].title}</h5>
								<p class="proprice">${homesArr[i].price}</p>
							</li>
						</a>`).appendTo($(".floorlist")[3]);
					}
				
				},
				error:function(msg){
					alert(msg);
				}

			})

		})	
	}
	return {
		index:index
	}

})