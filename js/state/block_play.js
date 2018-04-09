var width,height;
function playBlock(game){
    var layer;
    var curbox;
    var iBox,lBox,oBox,tBox,xBox;
    var overGroup,gameOver=false;
    // var point,playerPoint=0;
    var gameOverText;
    var keys;
    var xNumber,yNumber;

    var player;

    // var width = game.width,height = game.height;
    var groundSound;
    this.init = function(){
        //获取当前可用分辨率
        if(!isPc){
            game.width = Math.floor(window.innerWidth/16)*16;
            game.height = Math.floor(window.innerHeight/16)*16;
        }

        groundSound = game.add.sound('ground_sound');

        height = game.height;
        width = game.width;
    }
    this.create = function () {
        game.physics.startSystem(Phaser.Physics.P2JS);
        game.physics.p2.gravity.y=150;

            var map = game.add.tilemap('map_1');
            map.addTilesetImage('mario','mario');
            layer = map.createLayer('bg');
            layer.resizeWorld();//设置世界大小等于图层大小
            map.setCollision(40);

        var background = game.add.image(-45,100,'background');
        background.scale.set(1.12);

        game.physics.p2.convertTilemap(map, layer);
    

        player = game.add.sprite(100,800,'flyplayer');
        game.physics.p2.enable(player,false);
        player.scale.set(1);
        
        //随机产生box
        // function createBox(){
        //     var random = Math.floor(Math.random()*5);
            
        //     switch (random){
        //         case 0:
        //             curbox = game.add.sprite(width/2,200,'iBox');
        //             curbox.scale.set(0.4);
        //             game.physics.p2.enable(curbox,false);
        //             // player.body.clearShapes();
        //             // player.body.loadPolygon('physicsData','iBox');
        //         break;
        //         case 1:
        //             curbox = game.add.sprite(width/2,200,'lBox');
        //             game.physics.p2.enable(curbox,false);
        //             curbox.scale.set(0.4);
        //             // curbox.body.clearShapes();
        //             // curbox.body.loadPolygon('physicsData','LBox');
        //         break;
        //         case 2:
        //             curbox = game.add.sprite(width/2,200,'oBox');
        //             game.physics.p2.enable(curbox,false);
        //             curbox.scale.set(0.4);
        //         break;
        //         case 3:
        //             curbox = game.add.sprite(width/2,200,'tBox');
        //             game.physics.p2.enable(curbox,false);
        //             curbox.scale.set(0.4);
        //             // player.body.clearShapes();
        //             // player.body.loadPolygon('physicsData','TBox');
        //         break;
        //         case 4:
        //             curbox = game.add.sprite(width/2,200,'xBox');
        //             game.physics.p2.enable(curbox,false);
        //             curbox.scale.set(0.4);
        //             // player.body.clearShapes();
        //             // player.body.loadPolygon('physicsData','XBox');
        //         break;

        //     }
        //     curbox.body.damping=0.1;
        //     curbox.body.onBeginContact.addOnce(blockHit, this);
        // }

        var boxarray = [[0,80],[1,125],[0,325],[2,200],[1,125],[0,100],[3,300],[4,100],[3,105],[2,325],[2,200],[1,125],[0,100],[3,300],[1,100],[2,150]]; //700
        function createBox(){
            var box = boxarray.shift();
            if(!box){
                return;
            }
            switch (box[0]){
                case 0:
                    curbox = game.add.sprite(box[1],100,'iBox');
                    curbox.scale.set(0.3);
                    game.physics.p2.enable(curbox,false);
                    // player.body.clearShapes();
                    // player.body.loadPolygon('physicsData','iBox');
                break;
                case 1:
                    curbox = game.add.sprite(box[1],100,'lBox');
                    curbox.scale.set(0.3);
                    game.physics.p2.enable(curbox,false);
                    // curbox.body.clearShapes();
                    // curbox.body.loadPolygon('physicsData','LBox');
                break;
                case 2:
                    curbox = game.add.sprite(box[1],100,'oBox');
                    curbox.scale.set(0.3);
                    game.physics.p2.enable(curbox,false);
                break;
                case 3:
                    curbox = game.add.sprite(box[1],100,'tBox');
                    curbox.scale.set(0.3);
                    game.physics.p2.enable(curbox,false);
                    // curbox.body.clearShapes();
                    // curbox.body.loadPolygon('physicsData','TBox');
                break;
                case 4:
                    curbox = game.add.sprite(box[1],100,'xBox');
                    curbox.scale.set(0.3);
                    game.physics.p2.enable(curbox,false);
                    // curbox.body.clearShapes();
                    // curbox.body.loadPolygon('physicsData','XBox');
                break;

            }
            curbox.body.damping=0.01;
            curbox.body.onBeginContact.addOnce(blockHit, this);

        }
        createBox();
        //碰撞檢測
        function blockHit(body, bodyB, shapeA, shapeB, equation){
            if(!gameOver){
                if(body){
                    groundSound.play();
                    if(body.sprite==null){
                        createBox();
                    }else if(body.sprite.key == 'player'){
                        // game.state.start('gameover');
                        // gameOver = true;
                        // // createBox();
                    }
                    else if(body.sprite.key != 'bird'){//
                        // getPoint();
                        createBox();
                    }
                    else{
                        curbox.body.onBeginContact.removeAll();
                        curbox.body.onBeginContact.addOnce(blockHit, this);
                    }
                }
            }
        }
        
        //在底部添加碰撞的组.如果被碰撞游戏结束
        // overGroup=game.add.group();
        // overGroup.enableBody=true;
        // overGroup.physicsBodyType=Phaser.Physics.P2JS;
        // for (var i=0;i<width/16/2;i++){
        //     var over = overGroup.create(i*32+10,height-8,'down');
        //     over.body.kinematic = true;//保持固定
        //     over.body.onBeginContact.add(function(body, bodyB, shapeA, shapeB, equation){
        //         if(body){
        //             gameOver=true;
        //             game.input.onDown.add(
        //                 function(){
        //                     game.state.start('play');
        //                     gameOver=false;
        //                     // playerPoint = 0;
        //                     // gameOverText=null;
        //                 }
        //             );
        //         }
        //     },this);
        // }

        player.body.kinematic = true;//保持固定
        player.body.onBeginContact.add(function(body, bodyB, shapeA, shapeB, equation){
            if(body){
                if(body.sprite.key == "iBox" || body.sprite.key == "xBox"|| body.sprite.key == "lBox"|| body.sprite.key == "oBox" || body.sprite.key == "tBox"){
                    gameOver=true;
                    game.input.onDown.add(
                        function(){
                            game.state.start('playblock');
                            gameOver=false;
                            // playerPoint = 0;
                            gameOverText=null;
                        }
                    );
                }

            }
        },this);



        //添加触屏按钮
        if(!isPc){
            var btn_change = game.add.button(width-150,height/3*2,'change',actionOnClick,this);
            btn_change.scale.setTo(1.2);
            btn_change.alpha=0.3;
            var btn_left = game.add.button(0,height/3*2,'fxj',left_go,this);
            var btn_right = game.add.button(200,height/3*2,'fxj',right_go,this);
            var btn_up = game.add.button(100,height/3*2-100,'fxj',up_go,this);
            var btn_down = game.add.button(100,height/3*2+100,'fxj',down_go,this);
            btn_left.alpha = 0.3;
            btn_left.scale.setTo(1.2);
            btn_right.alpha = 0.3;
            btn_right.scale.setTo(1.2);
            btn_up.alpha = 0.3;
            btn_up.scale.setTo(1.2);
            btn_down.alpha = 0.3;
            btn_down.scale.setTo(1.2);
            function actionOnClick(){
                // btnSound.play();
                player.body.angle = player.body.angle + 90;
            }
            function left_go(key){
                // btnSound.play();
                player.body.velocity.x = -120;
            }
            function right_go(key){
                // btnSound.play();
                player.body.velocity.x = 120;
            }
            function up_go(key){
                // btnSound.play();
                player.body.velocity.y = 0;
            }
            function down_go(key){
                // btnSound.play();
                player.body.velocity.y += 100;
            }
        }else{
            //按键
            keys = game.input.keyboard.addKeys({ left: Phaser.Keyboard.LEFT, right: Phaser.Keyboard.RIGHT, up: Phaser.Keyboard.UP,down:Phaser.Keyboard.DOWN,spin: Phaser.Keyboard.SPACEBAR });
            keys.left.onDown.add(keyDown,this);
            keys.right.onDown.add(keyDown,this);
            keys.up.onDown.add(keyDown,this);
            keys.spin.onDown.add(keyDown,this);
            keys.down.onDown.add(keyDown,this);
            function keyDown(key){
                if(!gameOver){
                    switch (key.keyCode){
                        case Phaser.Keyboard.LEFT:
                            // btnSound.play();
                            player.body.velocity.x = -80;
                            break;
                        case Phaser.Keyboard.RIGHT:
                            // btnSound.play();
                            player.body.velocity.x = 80;
                            break;
                        case Phaser.Keyboard.UP:
                            // btnSound.play();
                            player.body.velocity.y = -30;
                            break;
                        case Phaser.Keyboard.DOWN:
                            // btnSound.play();
                            player.body.velocity.y += 30;

                            break;
                        case Phaser.Keyboard.SPACEBAR:
                            // btnSound.play();
                            player.body.angle = player.body.angle + 90;
                            break;
                    }
                }
            }

        }

    }
    this.update = function () {

        if(player.body.y < 200){
            game.state.start('loadball');
        }
        if(gameOver){
            // game.state.start('playblock');
            createGameOverText();
        }
    }
    function createGameOverText(){
        if(gameOverText==null){
            if(player.body.y==50){
                playerPoint--;
                player.kill();
                point.text=playerPoint;
            }
            // scoreSound.play();
            gameOverText = game.add.text(game.width/2,game.height/2,'游戏结束 !!\n点击屏幕重新开始'); //+ playerPoint+
            gameOverText.anchor.setTo(0.5);
            gameOverText.font = 'Arial Black';
            gameOverText.fontWeight = 'bold';
            gameOverText.fill = '#ec008c';
            gameOverText.fontSize=40;
            gameOverText.setShadow(5, 5, 'rgba(0, 0, 0, 0.5)', 5);

        }
    }
}