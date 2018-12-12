console.log("加载成功cartbox");

//配置要引入的模块路径

require.config({
	paths:{
		"jquery":"jquery-1.10.1.min",
		"jquery-cookie":"jquery.cookie",
		"cart":"cart",

	},
	shim:{
		//设置依赖关系
		"jquery-cookie":["jquery"]
	},
	//定义不存从AMD规范的js文件
	"parabola":{
		exports:"_"
	}

})

//引用模块调用
require(["cart"],function(cart){
	console.log(cart);
	cart.cart();
})