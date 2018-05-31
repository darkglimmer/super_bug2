function addword(){
    var tmp;
    this.init = function(){

    }
    this.create = function(){
        var margin = 84;
        var count = 1;
        var mask = new  Phaser.Rectangle(0, 0, game.world.width, game.world.height);
        var i = 1,j = 0;
        function addw(){
            var n=count%7+1;
            if(count == 3 || count == 11 || count == 13 || count == 6 || count == 8){
                j++;
            } else if(count == 7){
                i = 1;
                j = 0;
            }
            
            if(count == 6 || count == 7){
                tmp = game.add.sprite(70*scaleconfig,200 + (84*i +50*j)*scaleconfig,'text1-6_2-1');
                j+=1.5;
            } else if(count > 7){
                tmp = game.add.sprite(70*scaleconfig,200 + (84*i +50*j)*scaleconfig,'text2-'+ n);
                i++;
            }else {
                tmp = game.add.sprite(70*scaleconfig,200 + (84*i +50*j)*scaleconfig,'text1-'+ count);
                i++;
            }
            tmp.scale.set(0.5 * scaleconfig);
            tmp.alpha = 0;
            count++;
            var tween = game.add.tween(tmp).to({alpha: 1}, 1700, Phaser.Easing.Linear.None, true);
            tween.onComplete.add(() => {
                if(count != 14){
                    if(count == 7){
                        var maskview = game.add.graphics(mask.x, mask.y);
                        maskview.beginFill(0x000000);
                        maskview.drawRect(0, 0, mask.width, mask.height);
                        var masktween = game.add.tween(maskview).from({ alpha: 0 }, 2000, Phaser.Easing.Linear.None, true);
                        masktween.onComplete.add(()=>{
                            addw();
                        },this);
                        
                    }else{
                        addw();
                    }
                    

                }
                
            }, this)
        }
        addw();



        


    }
    this.update = function(){

    }
}