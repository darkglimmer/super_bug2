//load.js
var Load = function() {};
Load.prototype = {
	setScale: function(val){
		val = val * gameScale * 2;
		return val;
	},
	startLoad: function() {
		this.load.image('bg', './images/bg.jpg');
		this.load.atlas('atlas', 'images/atlas.png', './images/atlas.json');
		this.load.audio('bg','./music/bg.mp3');
		this.load.audio('jump','./music/jump.mp3');
		this.load.audio('spring','./music/spring.mp3');
		this.load.audio('false1','./music/false1.mp3');
		this.load.audio('false2','./music/false2.mp3');
		this.load.audio('click','./music/click.mp3');
		this.load.start();
	},
	loadStart: function() {
		this.text.setText("加载中 ...");
	},
	fileComplete: function(progress) {
		this.text.setText( + progress + "%");
	},
	loadComplete: function() {
		this.text.setText("启动中 ...");
		music[0] = this.add.audio('bg', 0.4, true);
		music[1] = this.add.audio('jump');
		music[2] = this.add.audio('spring');
		music[3] = this.add.audio('false1',0.2);
		music[4] = this.add.audio('false2');
		music[5] = this.add.audio('click');
		this.bg = this.add.sprite(0, 0,'bg');
		this.bg.width = gameWidth * 2;
		this.bg.height = gameHeight * 2;
		
	},
	create: function() {
		//this.stage.backgroundColor = '#edffd9';//屏幕背景
		//适应屏幕
		this.scale.scaleMode = Phaser.ScaleManager.EXACT_FIT;
		this.scale.setGameSize(gameWidth * 2, gameHeight * 2);
		this.scale.setMinMax(320,480,640,1136);
		//失去焦点是否继续游戏
		this.stage.disableVisibilityChange = true;
		//load提示
		this.text = this.add.text(this.world.centerX, this.world.centerY, '', {font: this.setScale(50)+"px myFont", fill: '#6c6f3a' });
		this.text.anchor.set(0.5);
		//this.text.setShadow(3, 3, 'rgba(0,0,0,0.2)', 2);
		this.load.onLoadStart.add(this.loadStart, this);//开始
		this.load.onFileComplete.add(this.fileComplete, this);//加载中
		this.load.onLoadComplete.add(this.loadComplete, this);//加载结束
		this.startLoad();
		game.state.start("jump_game");//开始游戏
	},
};

export default Load;