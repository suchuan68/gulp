window.onload = function(){
	var banner = document.getElementById("banner");
	var oul = document.getElementById("banner1");
	var oli = oul.getElementsByTagName("li");
	var liwidth = oul.getElementsByTagName("li")[0].offsetWidth;
	var lilength = oul.getElementsByTagName("li").length;
	var obutton = document.getElementById("button");
	var abutton = obutton.getElementsByTagName("a");
	obutton.style.width = obutton.offsetWidth+"px";//设置按钮长度使其可以居中
	oul.style.left = -liwidth+"px";//设置初始left值
	var prev = document.getElementById("prev");
	var next = document.getElementById("next");
	
	var oli1 = document.createElement("li");
	oli1.innerHTML = oli[oli.length-1].innerHTML;
	banner1.insertBefore(oli1,oli[0]);//插入辅助图实现无缝轮播,第一张
	
	var oli2 = document.createElement("li");
	oli2.innerHTML = oli[1].innerHTML;
	banner1.appendChild(oli2);//插入辅助图实现无缝轮播,最后一张
	
	lilength = oul.getElementsByTagName("li").length;//重新赋值li的正确长度
	oul.style.width = liwidth*lilength+"px";//设置ul的长度
	
	var animate = false;//判断动画是否执行的对象,animate为false时执行动画
	var index = 1;//储存当前圆点位置/图片位置
	var timetwo;
	
	function start(){//自动播放函数.通过循环触发next.onclick执行
		timetwo = setInterval(function(){
			next.onclick();
		},3000)
	}
	
	function stop(){//触摸停止函数
		clearInterval(timetwo);
	}
	
	function buttonn(){//圆点切换函数
		for (var i=0;i<abutton.length;i++) {
			abutton[i].className = "";
		}
		abutton[index-1].className = "on";
	}
	
	function pn(oleft){//图片位移函数

		animate = true;
		var newleft = oul.offsetLeft+oleft;//当前left值加上传入的偏移量等于新图片所在位置
		var time = 600;//位移需要的时间
		var interval = 10;//每次位移间隔时间,如果不需要动画可以将两个值设置成一样
		var speed = oleft/(time/interval);//每次位移的距离
		
		function go(){//动画函数
			if((speed<0 && oul.offsetLeft>newleft) || (speed>0 && oul.offsetLeft<newleft)){
				oul.style.left = parseInt(oul.offsetLeft)+speed+"px";
				setTimeout(go,interval);
			}
			else{
				oul.style.left = newleft+"px";
				if(newleft > -liwidth){//判断当前left值是否到了附属图上(第一个li),是则复位到最后一张
					oul.style.left = -(liwidth*(lilength-2))+"px";
				}
				if(Math.abs(newleft) > liwidth*(lilength-2)){//与上面相同
					oul.style.left = -liwidth+"px";
				}
				animate = false;
			}
		}
		go();
	}
	
	next.onclick = function(){
		if(!animate){
			if(index == abutton.length){
				index = 1;
			}
			else{
				index += 1;
			}
		}
		buttonn();
		if(!animate){
			pn(-liwidth);
		}
	}
	
	prev.onclick = function(){
		if(!animate){
			if(index == 1){
			index = abutton.length;
			}
			else{
				index -= 1;
			}
		}
		buttonn();
		if(!animate){
			pn(liwidth);
		}
	}
	
	for(var i=0;i<abutton.length;i++){
		abutton[i].index = i;
		abutton[i].onclick = function(){
			if(!animate){
				if(this.className == "on"){
					return;
				}
				var myindex = this.index;
				var oleft = -liwidth*((myindex+1)-index);
				if(!animate){
					pn(oleft);
				}
				index = myindex+1;
				buttonn();
			}
			debugger
		}
	}
	
	banner.onmouseover = stop;
	banner.onmouseout = start;
	start();
}