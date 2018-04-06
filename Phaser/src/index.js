import 'pixi'
import 'p2'
import Phaser from 'phaser'

import config from './config/index'
import Load from './states/jump_load'
import MyGame from './states/jump_game'
import ball from './states/ball'

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
			game.state.start('XXXX');	
			var game = new Phaser.Game(640, 1136 , Phaser.CANVAS,"game");//设置游戏高度
			document.getElementById("forhorview").style.setProperty("display", "none");
			isStart = true;
		}else{
			game.paused = false;
			document.getElementById("forhorview").style.setProperty("display", "none");
		};
	};
};

