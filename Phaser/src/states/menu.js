var game = new Phaser.Game(640, 1136 , Phaser.CANVAS,"game");//设置游戏高度
var Menu = function(){};
Menu.prototype = {
    setScale: function(val){
		val = val * gameScale * 2;
		return val;
    },
    startLoad: function() {
        this.load.image('begin', '././assets/images/begin.jpg');
        this.load.image('bottom', '././assets/images/startbottom.jpg');
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
        this.tips();
    },
    create: function() {
		//适应屏幕
		this.scale.scaleMode = Phaser.ScaleManager.EXACT_FIT;
		this.scale.setGameSize(gameWidth * 2, gameHeight * 2);
		this.scale.setMinMax(320,480,750,1366);
		//失去焦点是否继续游戏
		this.stage.disableVisibilityChange = true;
		//load提示
		this.text = this.add.text(this.world.centerX, this.world.centerY, '', {font: this.setScale(50)+"px myFont", fill: '#6c6f3a' ,});
		this.text.anchor.set(0.5);
		//this.text.setShadow(3, 3, 'rgba(0,0,0,0.2)', 2);
		this.load.onLoadStart.add(this.loadStart, this);//开始
		this.load.onFileComplete.add(this.fileComplete, this);//加载中
		this.load.onLoadComplete.add(this.loadComplete, this);//加载结束
		this.startLoad();
    },
    tips: function(){
		this.begin = this.add.sprite(0, 0,'begin');
		this.begin.width = gameWidth * 2;
        this.begin.height = gameHeight * 2;
        this.tipsBtn = new this.addBtn(this.world.centerX - this.setScale(150), this.setScale(800),this.setScale(2.5),'bottom',this.setScale(36));
		this.tipsBtn.Btn.events.onInputDown.add(function(){
			game.state.start('');
		},this);
    },
    addBtn: function(x,y,scale,img,stroke){
		this.Btn = game.add.sprite(x, y, 'bottom', img);
		this.Btn.scale.set(scale);
		this.BtnText.setTextBounds(x, y, this.Btn.width, this.Btn.height);
		this.BtnText.stroke = stroke;
		this.BtnText.strokeThickness = 8;
		this.Btn.inputEnabled = true;
		return this
	}
};

export default Menu;