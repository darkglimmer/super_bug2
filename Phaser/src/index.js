import 'pixi'
import 'p2'
import Phaser from 'phaser'

import config from './config/index'
import Load from './states/jump_load'
import MyGame from './states/jump_game'
import ball from './states/ball'
import Menu from './states/menu'
import playState from './states/block_play'
import loadState from './states/block_load'
import Gameover from './states/Gameover'

var isStart = false,
music = [],
initScreen=function(callback){//初始化html  font-size
	document.getElementById("html").style.setProperty("font-size",gameWidth/375*312.5+"%");
};
function setSize(){
	gameWidth = window.innerWidth > 640 ? 640 : window.innerWidth;
	gameHeight = window.innerHeight;
	gameScale = gameWidth / 640;
};
function winOrientation(){
	if(window.innerWidth > window.innerHeight && navigator.userAgent.match(/(iPhone|iPod|Android|ios)/i)){
		console.log('横屏')
		if(isStart){
			game.paused = true;
		};
		document.getElementById("forhorview").style.setProperty("display", "flex");
		document.getElementById("forhorview").innerHTML = '请把手机竖着玩呐~~';
	}else{
		console.log('竖屏')
		if(!isStart){
			document.getElementById("forhorview").innerHTML = '正在加载配置文件...';
			game.state.add('jump_load', Load, false)
			game.state.add('jump_game', Mygame, false)
			game.state.add('ball', ball, false)
			game.state.add('menu', Menu,false)
			game.state.add('block_load',loadState,false)
			game.state.add('block_play',playState,false)
			game.state.add('Gameover',Gameover,false)
			game.state.start('menu');	
			document.getElementById("forhorview").style.setProperty("display", "none");
			isStart = true;
		}else{
			game.paused = false;
			document.getElementById("forhorview").style.setProperty("display", "none");
		};
	};
};

export default lives;

// import 'pixi'
// import 'p2'
// import Phaser from 'phaser'

// import ball from './states/ball'

// class Menu extends Phaser.State{
//     create(){
//         // super(640, 1136, Phaser.AUTO, 'content', null);
//         //适应屏幕
// 		this.scale.scaleMode = Phaser.ScaleManager.EXACT_FIT;
// 		this.scale.setGameSize(gameWidth * 2, gameHeight * 2);
// 		this.scale.setMinMax(320,480,750,1366);
// 		//失去焦点是否继续游戏
// 		this.stage.disableVisibilityChange = true;
// 		//load提示
// 		this.text = this.add.text(this.world.centerX, this.world.centerY, '', {font: this.setScale(50)+"px myFont", fill: '#6c6f3a' ,});
// 		this.text.anchor.set(0.5);
// 		//this.text.setShadow(3, 3, 'rgba(0,0,0,0.2)', 2);
// 		this.load.onLoadStart.add(this.loadStart, this);//开始
// 		this.load.onFileComplete.add(this.fileComplete, this);//加载中
// 		this.load.onLoadComplete.add(this.loadComplete, this);//加载结束
//         this.startLoad();
//         this.game.state.add('ball', ball, false)
//         this.game.state.start('ball');
//     }
//     setScale(val){
// 		return val * (this.game.width / 640) * 2;
//     }
//     startLoad(){
//         this.load.image('bottom', '././assets/images/startbottom.jpg');
//         this.load.start();
//     }
//     loadStart(){
//         this.text.setText("加载中 ...");
//     }
//     fileComplete(progress){
//         this.text.setText( + progress + "%");
//     }
//     loadComplete(){
//         this.text.setText("启动中 ...");
//         //this.tips();
//     }
//     tips(){
//         // this.begin = this.add.sprite(0, 0,'begin');
// 		// this.begin.width = gameWidth * 2;
//         // this.begin.height = gameHeight * 2;
//         // this.tipsBtn = new this.addBtn(this.world.centerX - this.setScale(150), this.setScale(800),this.setScale(2.5),'bottom',this.setScale(36));
// 		// this.tipsBtn.Btn.events.onInputDown.add(function(){
// 		// 	game.state.start('');
// 		// },this);
//     }
//     addBtn(x,y,scale,img,stroke){
//         // this.Btn = game.add.sprite(x, y, 'bottom', img);
// 		// this.Btn.scale.set(scale);
// 		// this.BtnText.setTextBounds(x, y, this.Btn.width, this.Btn.height);
// 		// this.BtnText.stroke = stroke;
// 		// this.BtnText.strokeThickness = 8;
// 		// this.Btn.inputEnabled = true;
// 		// return this
//     }
// }
