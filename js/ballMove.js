define(['parabola', 'jquery'], function(parabola, $){
	function ballMove(node){
		//抛物线运动
		$("#ball").css({
			display: "block",
			left: $(node).offset().left,
			top: $(node).offset().top
		})

		var offsetX = $(".sc_pic").offset().left - $("#ball").offset().left;
		var offsetY = $(".sc_pic").offset().top - $("#ball").offset().top;

		//【注】配置参数的
		var bool = new Parabola({
			el: "#ball",
			targetEl: null,
			offset: [offsetX, offsetY],
			curvature: 0.0005,
			duration: 400,
			callback: function(){
				$("#ball").css("display", "none")
			}
			
		})

		bool.start();
	}
	return {
		ballMove: ballMove
	}
})