var width,height;
function playBlock(){
    var curbox;
    var iBox,lBox,oBox,tBox,xBox;
    // var point,playerPoint=0;
    var gameOverText;
    var cursors;
    var jumpButton;
    var customBounds;
    var player;
    var yAxis = p2.vec2.fromValues(0, 1);

    this.init = function(){
        //获取当前可用分辨率
        if(!isPc){
            game.width = Math.floor(window.innerWidth/16)*16;
            game.height = Math.floor(window.innerHeight/16)*16;
        }

        height = game.height;
        width = game.width;
    }
    this.create = function () {
        //开启物理引擎
        game.physics.startSystem(Phaser.Physics.P2JS);
        game.physics.p2.gravity.y = 150;
        // game.physics.p2.restitution = 0.1;
        game.physics.p2.world.defaultContactMaterial.friction = 0.3;
        game.physics.p2.world.setGlobalStiffness(1e5);
    

        //背景图片
        var background = game.add.image(0,100,'background');
        // background.scale.set(1.14);

        //设定边界
        var bounds = new Phaser.Rectangle(80, 0, 270, 770);
        var flash = new  Phaser.Rectangle(80, 240, 270, 530);

        //让边界可见 
        var graphics = game.add.graphics(bounds.x, bounds.y);
        graphics.lineStyle(4, 0xffd900, 1);
        graphics.drawRect(0, 0, bounds.width, bounds.height);

        customBounds = { left: null, right: null, top: null, bottom: null };
        createPreviewBounds(bounds.x, bounds.y, bounds.width, bounds.height);

        //黑洞
        // var bug = game.add.sprite(200,150,'bug');
        // bug.scale.set(1.5);
        // bug.anchor.setTo(0.5,0.5);
        

        //添加玩家
        player = game.add.sprite(100,730,'player');
        // player = game.add.sprite(100,800,'walk');
        var tween = game.add.tween(player.body).to({y: 100}, 500, Phaser.Easing.Linear.None, false,);
        tween.start();
        player.scale.set(0.7); //要先放大缩小再开启物理引擎



        
        game.physics.p2.enable(player,true); // true 开始调试
        player.body.fixedRotation = true; //不会旋转
        player.body.setCircle(35);
        

        
        //掉落固定的方块 
        // var boxarray = [[0,80],[1,125],[0,325],[2,200],[1,125],[0,100],[3,300],[4,100],[3,105],[2,325],[2,200],[1,125],[0,100],[3,300],[1,100],[2,150]]; //700
        
        // var boxarray = [[0,80],[0,325],[2,200],[0,150],[2,200],[0,325],[2,200],[0,325],[2,90],[0,75],[0,325],[2,200],[2,250],[0,325],[2,200],[0,150],[0,325],[2,90],[0,75],[0,80],[0,325],[2,200],[0,150],[0,80],[0,325],[2,200],[0,80],[0,325],[2,200],[0,80],[0,325],[2,200],[0,325],[2,200],[0,150],[2,250],[0,325]];
        var boxarray =[[0,80],[0,325]];
        function createBox(){
            var box = boxarray.shift();
            if(!box){
                var flashview = game.add.graphics(flash.x, flash.y);
                flashview.beginFill(0xFFFFFF);
                flashview.drawRect(0, 0, flash.width, flash.height);
        var flashtween = game.add.tween(flashview).from({ alpha: 0 }, 500, Phaser.Easing.Linear.None, false, 0, 1,);
        flashtween.start();

                return;
            }
            switch (box[0]){
                case 0:
                    curbox = game.add.sprite(box[1],100,'iBox');
                    curbox.scale.set(0.3);
                    game.physics.p2.enable(curbox, true);
                break;
                case 1:
                    curbox = game.add.sprite(box[1],100,'lBox');
                    curbox.scale.set(0.3);
                    game.physics.p2.enable(curbox,true);
                    curbox.body.clearShapes();
                    curbox.body.loadPolygon('blockdata','LBox');
                break;
                case 2:
                    curbox = game.add.sprite(box[1],100,'oBox');
                    curbox.scale.set(0.3);
                    game.physics.p2.enable(curbox,true);
                break;
                case 3:
                    curbox = game.add.sprite(box[1],100,'tBox');
                    curbox.scale.set(0.3);
                    game.physics.p2.enable(curbox,true);
                    curbox.body.clearShapes();
                    curbox.body.loadPolygon('blockdata','TBox');
                break;
                case 4:
                    curbox = game.add.sprite(box[1],100,'xBox');
                    curbox.scale.set(0.3);
                    game.physics.p2.enable(curbox,true);
                    curbox.body.clearShapes();
                    curbox.body.loadPolygon('blockdata','XBox');
                break;
                

            }
            // curbox.body.damping=0.01;
            curbox.body.onBeginContact.addOnce(blockHit, this);
        }
        // 每隔1s掉落一个方块
        game.time.events.loop(2000, function() {
            createBox();
        });

        //碰撞檢測
        function blockHit(body, bodyB, shapeA, shapeB, equation){
            if(body){
                // console.log(body.sprite.key);
                if(body.sprite.key == 'player'){
                    game.add.text(120,game.height/2,'游戏结束 !!')
                    setTimeout(() => {
                        game.state.start('playblock')
                    }, 1000);
                }
            }  
            // curbox.body.onBeginContact.addOnce(blockHit, this);
        }


        cursors = game.input.keyboard.createCursorKeys();
        jumpButton = game.input.keyboard.addKey(Phaser.Keyboard.UP);



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

        // if(player.body.y < 200){
        //     game.state.start('loadball');
        // }

        player.body.velocity.x = 0;

        if (cursors.left.isDown)
        {
            player.body.velocity.x = -200;
    
            // if (facing != 'left' )
            // {
            //     player.animations.play('left');
            //     facing = 'left';
            // }
        }
        else if (cursors.right.isDown )
        {
            player.body.velocity.x = 200;
    
            // if (facing != 'right' )
            // {
            //     player.animations.play('right');
            //     facing = 'right';
            // }
        }
        else
        {
            // if (facing != 'idle')
            // {
            //     player.animations.stop();
    
            //     if (facing == 'left')
            //     {
            //         player.frame = 6;
            //     }
            //     else
            //     {
            //         player.frame = 0;
            //     }
    
            //     facing = 'idle';
            // }
        }
        
        if (jumpButton.isDown && checkIfCanJump())
        {
            player.body.velocity.y = -230;
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
    this.render = function (){

    }
}