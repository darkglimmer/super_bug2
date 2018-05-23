var isPc;
function loadjump(game){
    this.init = function () {
        game.scale.pageAlignHorizontally=true;//水平居中
        function goPC()
        {
            var userAgentInfo = navigator.userAgent;
            var Agents = new Array("Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod");
            isPc = true;
            for (var v = 0; v < Agents.length; v++) {
                if (userAgentInfo.indexOf(Agents[v]) > 0)
                { isPc = false;
                    break; }
            }
            return isPc;
        }
        goPC();//检测pc或移动
    }
    this.preload = function () {
        this.load.image('background', 'assets/img/beijing1.png');
		this.load.image('person', 'assets/img/fly.png');
		this.load.image('platform_0', 'assets/img/taijie3.png');
		this.load.image('platform_3', 'assets/img/taijie5.png');
		this.load.image('platform_1', 'assets/img/taijie2.png');
		this.load.image('platform_2', 'assets/img/taijie4.png');
		this.load.image('spring', 'assets/img/tanhuang.png');
		this.load.image('hole', 'assets/img/heidong0.png');
		this.load.audio('jump','assets/music/jump.mp3');
		this.load.audio('shoot','assets/music/spring.mp3');
		this.load.audio('hole','assets/music/hole.mp3');
		//this.load.audio('click','assets/music/click.mp3');
    }
    this.create = function(){
        game.state.start('playjump');
    }
};