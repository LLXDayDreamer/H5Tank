
//为了编程方便，我们定义了两个颜色数组
var heroColor=new Array("#BA9658","#FEF26E");
var enemyColor=new Array("#00A285","#00FEFE");
//子弹类
function Bullet(x,y,direct,speed){
	this.x=x;
	this.y=y;
	this.direct=direct;
	this.speed=speed;
	this.timer=null;
	this.isLive=true;
	this.run=function run() {
		//在改变这个子弹的坐标是，我们先判断子弹是否到达边界
		if(this.x <=0||this.x>=400||this.y<=0||this.y>=300){
			//子弹要停止
			window.clearInterval(this.timer);
			//子弹死亡
			this.isLive=false;
		}else{
			//这个可以去修改子弹的坐标
			switch(this.direct){
				case 0:
					this.y-=this.speed;
					break;
				case 1:
					this.x+=this.speed;
					break;
				case 2:
					this.y+=this.speed;
					break;
				case 3:
					this.x-=this.speed;
					break;
			}
		}	
		document.getElementById("aa").innerText="子弹横坐标："+heroBullet.x+"子弹纵坐标："+heroBullet.y;
	}
}

//坦克类
function TankFactory(x,y,direct,color){
	this.x=x;
	this.y=y;
	this.direct=direct;
	//一个坦克需要两个颜色
	this.color=color;
	this.speed=2;

	//向上移动
	this.moveUp=function(){
		this.y-=this.speed;
		this.direct=0;
	}
	//向右移动
	this.moveRight=function(){
		this.x+=this.speed;
		this.direct=1;
	}
	//向下移动
	this.moveDown=function(){
		this.y+=this.speed;
		this.direct=2;
	}
	//向左移动
	this.moveLeft=function(){
		this.x-=this.speed;
		this.direct=3;
	}
} 			

//定义一个hero类
//x表示坦克的横坐标，y表示坦克的纵坐标,direct表示方向
function Hero(x,y,direct,color){
	//下面两句话是通过对象冒充，达到继承效果
	this.tank=TankFactory;
	this.tank(x,y,direct,color);

	//增加一个函数，射击敌人坦克
	this.shotEnemy=function(){
		//创建子弹,子弹的位置应该和hero有关，并且和hero的方向有关
		//this.x就是当前hero的横坐标   this.y代表当前hero的纵坐标
		switch(this.direct){
			case 0://向上
			heroBullet=new Bullet(this.x+9,this.y,this.direct,1);
			break;
			case 1://向右
			heroBullet=new Bullet(this.x+30,this.y+9,this.direct,1);
			break;
			case 2://向下
			heroBullet=new Bullet(this.x+9,this.y+30,this.direct,1);
			break;
			case 3://向左
			heroBullet=new Bullet(this.x,this.y+9,this.direct,1);
			break;
		}
		//把这个子弹对象放入到数组中--->push（）
		heroBullets.push(heroBullet);
		//调用子弹的飞函数run（）
		window.setInterval("heroBullets["+(heroBullets.length-1)+"].run()",50);

		//把这个timer赋值给这个子弹（js对象是引用传递）
		heroBullets[heroBullets.length-1].timer=timer;
	}
} 
//当子弹碰到边缘的时候，就停止定时器

//定义一个EnemyTank类
//x表示坦克的横坐标，y表示坦克的纵坐标,direct表示方向
function EnemyTank(x,y,direct,color){
	//下面两句话是通过对象冒充，达到继承效果
	this.tank=TankFactory;
	this.tank(x,y,direct,color);
} 

//画出自己的子弹，你也可以把该函数封装到hero类中
function drawHeroBullet(){
	for(var i=0;i<heroBullets.length;i++){
		var heroBullet=heroBullets[i];
		if(heroBullet!=null&&heroBullet.isLive){
			cxt.fillStyle="#FEF26E";
			cxt.fillRect(heroBullet.x,heroBullet.y,2,2);
		}
	}
}
//绘制坦克
function drawTank(tank){

	//考虑方向
	switch(tank.direct){
		case 0://上
		case 2://下
			//画出自己的坦克，用绘图技术
			//设置颜色
			cxt.fillStyle=tank.color[0];
			//先死后活
			//先画出左边矩形
			cxt.fillRect(tank.x,tank.y,5,30);
			//画出右边的矩形（这是要有个参照点，以（30,30）为参照点）
			cxt.fillRect(tank.x+15,tank.y,5,30);
			//画出中间的矩形
			cxt.fillRect(tank.x+6,tank.y+5,8,20);
			//画出坦克的盖子
			fillStyle=tank.color[1];
			cxt.arc(tank.x+10,tank.y+15,4,0,2*Math.PI,true);
			cxt.fill();
			//画出炮筒
			cxt.strokeStyle=tank.color[1];
			//设置线条的宽度
			cxt.lineWidth=1.5;
			cxt.beginPath();
			cxt.moveTo(tank.x+10,tank.y+15);
			if(tank.direct==0){//向上
				cxt.lineTo(tank.x+10,tank.y);
			}else if(tank.direct==2){//向下
				cxt.lineTo(tank.x+10,tank.y+30);
			}
			cxt.closePath();
			cxt.stroke();
			break;
		case 1://右
		case 3://左
			//画出自己的坦克，用绘图技术
			//设置颜色
			cxt.fillStyle=tank.color[0];
			//先死后活
			//先画出左边矩形
			cxt.fillRect(tank.x,tank.y,30,5);
			//画出右边的矩形（这是要有个参照点，以（30,30）为参照点）
			cxt.fillRect(tank.x,tank.y+15,30,5);
			//画出中间的矩形
			cxt.fillRect(tank.x+5,tank.y+6,20,8);
			//画出坦克的盖子
			fillStyle="#FEF26E";
			cxt.arc(tank.x+15,tank.y+10,4,0,2*Math.PI,true);
			cxt.fill();
			//画出炮筒
			cxt.strokeStyle="#FEF26E";
			//设置线条的宽度
			cxt.lineWidth=1.5;
			cxt.beginPath();
			cxt.moveTo(tank.x+15,tank.y+10);
			if(tank.direct==1){//向右
				cxt.lineTo(tank.x+30,tank.y+10);
			}else if(tank.direct==3){//向左
				cxt.lineTo(tank.x,tank.y+10);
			}
			cxt.closePath();
			cxt.stroke();
	}
}