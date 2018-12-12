console.log("加载成功goods");

//配置要引入的模块路径

require.config({
	paths:{
		"jquery":"jquery-1.10.1.min",
		"jquery-cookie":"jquery.cookie",
		"shopping":"shopping",
		"phone":"phone",

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
require(["shopping","phone"],function(shopping,phone){
	shopping.shopping();
	phone.phone();
})