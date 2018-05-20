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
        game.load.image('backgroud', 'assets/img/bejing1.png');
        game.load.image('person', 'assets/img/renwuzhengmian0.png');
        game.load.image('normalstep', 'assets/img/taijie3.png');
        game.load.image('movestep', 'assets/img/taijie2.png');
        game.load.image('oncestep', 'assets/img/taijie5.png');
        game.load.image('broke', 'assets/img/taijie4.png');
        game.load.image('string', 'assets/img/tanhuang.png');
        game.load.image('hole', 'assets/img/heidong0.png');
    }
    this.create = function(){
        game.state.start('playjump');
    }
};