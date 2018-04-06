var isPc;
function loadMario(game){
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
            game.load.image('background1','assets/img/background1.png');
            game.load.spritesheet('walk','assets/img/walk.png',120,120);
            // game.load.image('land1','assets/land1.gif');
            game.load.image('land2','assets/img/land2.gif');
            game.load.image('pipe','assets/img/pipe.png');
            game.load.image('brick1','assets/brick1.gif');
            // game.load.image('marioJR','assets/marioJR.gif');
            // game.load.image('marioJL','assets/marioJL.gif');
            // game.load.image('monster','monster.png');
            // game.load.image('monsterD','monsterD.gif');
    }
    this.create = function(){
        game.state.start('playmario');
    }
}


// //预加载图片

// (function() {
//     var imageRoot = "images/" //要加载的图片的路径
//     var resourceCache = {};
//     var loading = [];
//     var readyCallbacks = [];

//     // Load an image url or an array of image urls
//     function load(urlOrArr) {
//         if(urlOrArr instanceof Array) {
//             urlOrArr.forEach(function(url) {
//                 _load(url);
//             });
//         }
//         else {
//             _load(urlOrArr);
//         }
//     }

//     function _load(url) {
//         if(resourceCache[url]) {
//             return resourceCache[url];
//         }
//         else {
//             var img = new Image();
//             img.onload = function() {
//                 resourceCache[url] = img;

//                 if(isReady()) {
//                     readyCallbacks.forEach(function(func) { func(); });
//                 }
//             };
//             resourceCache[url] = false;
//             img.src = imageRoot + url;
//         }
//     }

//     function get(url) {
//         return resourceCache[url];
//     }

//     function isReady() {
//         var ready = true;
//         for(var k in resourceCache) {
//             if(resourceCache.hasOwnProperty(k) &&
//                 !resourceCache[k]) {
//                 ready = false;
//             }
//         }
//         return ready;
//     }

//     function onReady(func) {
//         readyCallbacks.push(func);
//     }

//     window.resources = {
//         load: load,
//         get: get,
//         onReady: onReady,
//         isReady: isReady
//     };
// })();