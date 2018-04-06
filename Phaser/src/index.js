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

