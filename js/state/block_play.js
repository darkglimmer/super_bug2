var width,height;
function playBlock(){
    var curbox;
    var iBox,lBox,oBox,tBox,xBox;
    // var point,playerPoint=0;
    var overflag = false;
    var cursors;
    var jumpButton;
    var customBounds;
    var player;
    var yAxis = p2.vec2.fromValues(0, 1);
    var isfalling;
    var flashview;
    var hitSound;
    var tmp2;

    this.init = function(){
        //获取当前可用分辨率
        curgame = 2;
        hitSound = game.add.sound('hitsound');
    }
    this.create = function () {
        //开启物理引擎
        game.physics.startSystem(Phaser.Physics.P2JS);
        game.physics.p2.gravity.y = 250;
        // game.physics.p2.damping = 0;
        game.physics.p2.world.defaultContactMaterial.friction = 0.3;
        game.physics.p2.world.setGlobalStiffness(1e5);
        game.physics.p2.setImpactEvents(true);
    

        //背景图片
        var background = game.add.image(0,200*scaleconfig,'background');
        background.scale.set(1*scaleconfig);

        //设定边界
        var bounds = new Phaser.Rectangle(79*scaleconfig, 0, 275*scaleconfig, 870*scaleconfig);game.state
        var flash = new  Phaser.Rectangle(79*scaleconfig, 340*scaleconfig, 273*scaleconfig, 530*scaleconfig);

        //让边界可见 
        // var graphics = game.add.graphics(bounds.x, bounds.y);
        // graphics.lineStyle(4, 0xffd900, 1);
        // graphics.drawRect(0, 0, bounds.width, bounds.height);

        customBounds = { left: null, right: null, top: null, bottom: null };
        createPreviewBounds(bounds.x, bounds.y, bounds.width, bounds.height);

        //黑洞
        // var bug = game.add.sprite(200,150,'bug');
        // bug.scale.set(1.5);
        // bug.anchor.setTo(0.5,0.5);
        

        //掉落效果
        var tmp1 = game.add.sprite(65*scaleconfig, 0,'player');
        tmp1.scale.set(0.8 * scaleconfig);

        var tween = game.add.tween(tmp1).to({y: 720*scaleconfig}, 1500, Phaser.Easing.Linear.None, true);
        tween.onStart.add(function(){
            isfalling  = true;
        },this);
        tween.onComplete.add(()=>{
            tmp1.kill();
            player.alpha = 1;  
            isfalling = false; 
        }
        ,this);


        

        //添加玩家
        // player = game.add.sprite(100,800,'player');
        player = game.add.sprite(130*scaleconfig,730*scaleconfig,'player');
        player.scale.set(0.8 * scaleconfig); //要先放大缩小再开启物理引擎
        player.alpha = 0;


        
        game.physics.p2.enable(player, false); // true 开始调试
        player.body.clearShapes();
        player.body.fixedRotation = true; //不会旋转
        // player.body.setCircle(35);
        player.body.setRectangle(60*scaleconfig, 100*scaleconfig, 0, 0);


        //掉落固定的方块 
        var boxarray = [
            [1,303,90],[0,150,90],
            [1,268,-90],
            [0,97,0],
            [1,166,90],
            // [1,130,-90],
            [2,147,0],
            // [2,318,0],[2,251,0],[0,201,0],
            // [2,115,0],[2,318,0],
            [2,250,0],
            // [1,268,-90],
            [3,320,0],
            // [2,182,0],
            [0,283,90],
            [0,150,90],[2,317,0],[2,250,0],
            [2,115,0],[2,182,0],[0,283,90],
            
            [3,132,-90],[4,183,0],[2,318,0],
            [2,251,0],[3,113,0],[0,283,90],
            // [0,283,90],
            [2,115,0],[0,283,90],
            [1,200,-90],[2,318,0],[2,250,0],
            [1,303,90],[1,268,-90],
        
        ]; 
        function createBox(){
            var box = boxarray.shift();
            if(!box){
                return 0;
            }
            
            // if(boxarray.length == 1){
                // game.time.events.add(Phaser.Timer.SECOND * 4, function(){
                    if(player.body.y < 370 * scaleconfig ){
                        overflag = true;
                        flashview = game.add.graphics(flash.x, flash.y);
                        flashview.beginFill(0xFFFFFF);
                        flashview.drawRect(0, 0, flash.width, flash.height);
        
                        var flashtween = game.add.tween(flashview).from({ alpha: 0 }, 500, Phaser.Easing.Linear.None, false, 0, 1, true);
                        flashtween.start();
                        flashtween.onComplete.add(function(){
                            player.alpha = 0;
                            isfalling = true;
                            tmp2 = game.add.sprite(player.x - 37*scaleconfig,player.y - 37*scaleconfig,'player');
                            tmp2.scale.set(0.8* scaleconfig);
                            var tween2 = game.add.tween(tmp2).to({y: 1100* scaleconfig}, 1000, Phaser.Easing.Linear.None, true);
                            tween2.onComplete.add(function(){
                                game.state.start('playball_1');
                            }, this); 
                        },this);
                    } else if(boxarray.length == 0) {
                        game.time.events.add(Phaser.Timer.SECOND * 2, function(){
                            game.camera.fade(0x000000, 1000,true);
                            game.camera.onFadeComplete.add("gameover", this);
                            // game.add.text(120,game.height/2,'游戏结束 !!')
                            // game.time.events.add(Phaser.Timer.SECOND * 1,function(){game.state.start('playblock');},this);
                        }, this);
                    }
                // }, this);

            // }
            switch (box[0]){
                case 0:
                    curbox = game.add.sprite(box[1]* scaleconfig,100*scaleconfig,'iBox');
                    curbox.scale.set(0.5);
                    game.physics.p2.enable(curbox, false);
                    curbox.body.angle = box[2];
                    curbox.body.velocity.y = 40;

                break;
                case 1:
                    curbox = game.add.sprite(box[1]* scaleconfig,100*scaleconfig,'lBox');
                    initblock(curbox,box[2]);
                    curbox.body.loadPolygon('blockdata','LBox');
                    
                break;
                case 2:
                    curbox = game.add.sprite(box[1]* scaleconfig,100*scaleconfig,'oBox');
                    curbox.scale.set(0.5);
                    game.physics.p2.enable(curbox,false);
                    curbox.body.velocity.y = 40;
                break;
                case 3:
                    curbox = game.add.sprite(box[1]* scaleconfig,100*scaleconfig,'tBox');
                    initblock(curbox,box[2]);
                    curbox.body.loadPolygon('blockdata','TBox');
                break;
                case 4:
                    curbox = game.add.sprite(box[1]* scaleconfig,100*scaleconfig,'xBox');
                    initblock(curbox,box[2]);
                    curbox.body.loadPolygon('blockdata','XBox');

                break;
                

            }
            // curbox.body.damping=0.01;

            function initblock(box,_angle){
                box.scale.set(0.5);
                game.physics.p2.enable(box,false);
                box.body.clearShapes();
                box.body.angle = _angle;
                box.body.velocity.y = 40;
            }
            
            curbox.body.onBeginContact.addOnce(blockHit, this);
            if(flashview)
            game.world.bringToTop(flashview);
            
        }
        // 每隔2s掉落一个方块
        // game.time.events.loop(1500, function() {
        //     if(boxarray.length && !overflag)
        //         createBox();
        // });
        function gameover(){
            game.time.events.add(Phaser.Timer.SECOND * 1,function(){
                // bgm.stop();
                game.state.start('gameover');},this);
        }
        //碰撞檢測
        function blockHit(body, bodyB, shapeA, shapeB, equation){
            if(body){
                if(body.sprite.key == 'player'){
                    game.camera.fade(0x000000, 1000,true);
                    game.camera.onFadeComplete.add(gameover, this);
                } 
            } 
            hitSound.play();
            curbox.body.static = true;
            // curbox.body.velocity.x = 0;
            curbox.body.y -= 5*scaleconfig;
            curbox.body.velocity.y = 0;
            curbox.body.fixedRotation = true;
            if(boxarray.length && !overflag)
            createBox();
        }
        game.time.events.add(Phaser.Timer.SECOND * 1,function(){createBox();},this);

        function touching(something) {
            var result = false;
            for (var i=0; i < game.physics.p2.world.narrowphase.contactEquations.length; i++)
            {
                var c = game.physics.p2.world.narrowphase.contactEquations[i];
                if (c.bodyA === something.data || c.bodyB === something.data)
                {
                    var d = p2.vec2.dot(c.normalA, yAxis);
                    if (c.bodyA === something.data)
                    {
                        d *= -1;
                    }
                    if (d > 0.5)
                    {
                        result = true;
                    }
                }
            }
            return result;
        }


        //设边界 
        function createPreviewBounds(x, y, w, h) {

            var sim = game.physics.p2;
        
            //  If you want to use your own collision group then set it here and un-comment the lines below
            var mask = sim.boundsCollisionGroup.mask;
        
            customBounds.left = new p2.Body({ mass: 0, position: [ sim.pxmi(x), sim.pxmi(y) ], angle: 1.5707963267948966 });
            customBounds.left.addShape(new p2.Plane());
            // customBounds.left.shapes[0].collisionGroup = mask;
        
            customBounds.right = new p2.Body({ mass: 0, position: [ sim.pxmi(x + w), sim.pxmi(y) ], angle: -1.5707963267948966 });
            customBounds.right.addShape(new p2.Plane());
            // customBounds.right.shapes[0].collisionGroup = mask;
        
            customBounds.top = new p2.Body({ mass: 0, position: [ sim.pxmi(x), sim.pxmi(y) ], angle: -3.141592653589793 });
            customBounds.top.addShape(new p2.Plane());
            // customBounds.top.shapes[0].collisionGroup = mask;
        
            customBounds.bottom = new p2.Body({ mass: 0, position: [ sim.pxmi(x), sim.pxmi(y + h) ] });
            customBounds.bottom.addShape(new p2.Plane());
            // customBounds.bottom.shapes[0].collisionGroup = mask;
        
            sim.world.addBody(customBounds.left);
            sim.world.addBody(customBounds.right);
            sim.world.addBody(customBounds.top);
            sim.world.addBody(customBounds.bottom);
        
        }
        

    }
    this.update = function () {
        // if(flashview)
        // game.world.bringToTop(flashview);
        game.world.bringToTop(player);
        if(tmp2){
            game.world.bringToTop(tmp2);
        }
        
        game.input.onDown.add(function(e) {  
            if( checkIfCanJump() && !isfalling){
                player.body.moveUp(300);
            }
        }, this)


        player.body.velocity.x = 0;

        if (game.input.worldX < player.body.x&& !isfalling)
        {
            player.body.moveLeft(250);
        }
        else if (game.input.worldX - 15 > player.body.x && !isfalling)
        {
            player.body.moveRight(250);
        }


        //  跳跃检查
        function checkIfCanJump() {
            var result = false;
            for (var i=0; i < game.physics.p2.world.narrowphase.contactEquations.length; i++)
            {
                var c = game.physics.p2.world.narrowphase.contactEquations[i];
                if (c.bodyA === player.body.data || c.bodyB === player.body.data)
                {
                    var d = p2.vec2.dot(c.normalA, yAxis);
                    if (c.bodyA === player.body.data)
                    {
                        d *= -1;
                    }
                    if (d > 0.5)
                    {
                        result = true;
                    }
                }
            }
            return result;
        }
    }
    // this.render = function (){

    // }
}