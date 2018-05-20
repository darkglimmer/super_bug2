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
        this.load.image('background', 'images/beijing1.png');
		this.load.image('person', 'images/renwuzhengmian0.png');
		this.load.image('platform_0', 'images/taijie3.png');
		this.load.image('platform_3', 'images/taijie5.png');
		this.load.image('platform_1', 'images/taijie2.png');
		this.load.image('platform_2', 'images/taijie4.png');
		this.load.image('spring', 'images/tanhuang.png');
		this.load.image('hole', 'images/heidong0.png');
		this.load.audio('jump','music/jump.mp3');
		this.load.audio('shoot','music/spring.mp3');
		this.load.audio('hole','music/hole.mp3');
		//this.load.audio('click','music/click.mp3');
    }
    this.create = function(){
        game.state.start('playjump');
    }
};