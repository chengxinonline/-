console.log("加载成功main");

//配置要引入的模块路径

require.config({
	paths:{
		"jquery":"jquery-1.10.1.min",
		"jquery-cookie":"jquery.cookie",
		"login":"login",
		"register":"register",
		"index":"index",
		"shopping":"shopping"
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
require(["index","login","register","shopping"],function(index,login,register,shopping){
	index.index();
	login.login();
	register.register();

})