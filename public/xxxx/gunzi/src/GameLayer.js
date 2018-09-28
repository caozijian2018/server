/**
 * HTML5游戏源码教程
 * http://longwenjunjie.github.io/games
 *
 * QQ群:236030520
 *
 */
var GameLayer = cc.Layer.extend({
    //parameter
    moveDistance:-10,
    moveTime:0.7,
    bk:null,
    //footstep
    footstep1:null,
    footstep2:null,
    footstepHeight:300,
    //status
    isTouch:false,
    isPlayingAniamtion:false,
    // bridge
    bridgeScaleY:1.0,
    bridgeAddScalePercent:0.3,
    bridgeSprite:null,
    //role
    role:null,
    roleAnimate:null,
    //score
    score:0,
    scoreLabel:null,
    ctor:function() {
        this._super();
        GameModel.getInstance().setGameLayer(this);

        this.bk = new cc.Sprite(res.bk1);
        this.addChild((this.bk));
        this.schedule(this.addSnow,1);
        this.schedule(this.addLeng,0.03);

        // add touch callback
        var touchListener = cc.EventListener.create({
            event:cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches:false,
            onTouchBegan:function(touch,event){
                var pos = touch.getLocation();
                var target = event.getCurrentTarget();
                if (target.isPlayingAniamtion){
                    return false;
                }
                target.isTouch = true;
                target.bridgeLeng = 0;
                return true;
            },
            onTouchMoved:function(touch,event){

            },
            onTouchEnded:function(touch,event){
                var target = event.getCurrentTarget();
                target.isTouch = false;
                var rotate = cc.rotateBy(1.0,90);
                var callback = cc.callFunc(function(){
                    target.move();
                });
                var seq = cc.sequence(rotate,callback);
                target.bridgeSprite.runAction(seq);
                target.isPlayingAniamtion = true;
            }
        });
        cc.eventManager.addListener(touchListener,this);

        this.bridgeSprite = new cc.Sprite(res.bridge);
        this.addChild(this.bridgeSprite,11);

        this.role = new cc.Sprite(res.bird_0);
        var animation = new cc.Animation();
        animation.addSpriteFrameWithFile(res.bird_0);
        animation.addSpriteFrameWithFile(res.bird_1);
        animation.setDelayPerUnit(2.8 / 14);
        animation.setRestoreOriginalFrame(true);
        animation.setLoops(100000);
        this.animate = cc.animate(animation);
        this.addChild(this.role,1100);

        this.scoreLabel = new cc.LabelTTF("score:"+this.score, "Arial", 40);

        var tip = new cc.LabelTTF("come on !!","Arial",60);
        tip.attr({
            x:cc.winSize.width/2,
            y:cc.winSize.height/8*6,
        });
        this.addChild(tip);

        this.addChild(this.scoreLabel);
        this.reset();

    },
    move:function(){
        var deltaPositionX = this.footstep2.getPosition().x-this.footstep1.getPosition().x;
        var roleMoveDistance1 = deltaPositionX + (this.getRealWidth(this.footstep2)-this.getRealWidth(this.footstep1));
        var roleMoveDistance2 = this.getRealHeight(this.bridgeSprite) ;
        var callbackSuccess = cc.callFunc(function(selectTarget){
            selectTarget.getParent().role.stopAllActions();
            var moveAction = cc.moveBy(selectTarget.getParent().moveTime,selectTarget.getParent().moveDistance,0);
            selectTarget.getParent().bk.runAction(moveAction);
            var allMove = cc.moveBy(0.4,-deltaPositionX,0);
            var callbackReset = cc.callFunc(function(){
                selectTarget.getParent().resetLittle();
            });
            selectTarget.getParent().footstep1.runAction(allMove);
            selectTarget.getParent().footstep2.runAction(allMove.clone());
            selectTarget.getParent().role.runAction(cc.sequence(allMove.clone(),callbackReset));
            selectTarget.getParent().bridgeSprite.runAction(allMove.clone());
            selectTarget.getParent().score++;
        },this.role);

        var callbackFailed = cc.callFunc(function(selectTarget){
            selectTarget.getParent().role.stopAllActions();
            var callback = cc.callFunc(function(){
                selectTarget.getParent().getParent().addChild(new ResultLayer());
            });
            var move1 = cc.moveBy(1.0,150,0);
            var move2 = cc.moveBy(1.0,0,-400).easing(cc.easeIn(1.0));
            selectTarget.runAction(move1);
            selectTarget.getParent().role.runAction(move2.clone());
            var rotate = cc.rotateBy(1.0,120).easing(cc.easeIn(3.0));
            selectTarget.getParent().bridgeSprite.runAction(move2);
            selectTarget.getParent().bridgeSprite.runAction(cc.sequence(rotate,callback));
        },this.role);
        var bridgeMinDistance = this.footstep2.getPositionX()-this.footstep1.getPositionX()-
            this.getRealWidth(this.footstep1);
        var bridgeMaxDistance = bridgeMinDistance + this.getRealWidth(this.footstep2);
        if(roleMoveDistance2 > bridgeMaxDistance || roleMoveDistance2 < bridgeMinDistance){
            var roleMoveAction = cc.moveBy(this.moveTime,roleMoveDistance2,0);
            this.role.runAction(cc.sequence( roleMoveAction,callbackFailed));
            this.role.runAction(this.animate.clone());
        }
        else{
            var roleMoveAction = cc.moveBy(this.moveTime,roleMoveDistance1,0);
            this.role.runAction(cc.sequence( roleMoveAction,callbackSuccess));
            this.role.runAction(this.animate.clone());
        }
    },
    addLeng:function(){
        if(this.isTouch && this.isPlayingAniamtion == false){
            this.bridgeScaleY += this.bridgeAddScalePercent;
            this.bridgeSprite.setScaleY(this.bridgeScaleY);
        }
    },
    reset:function(){
        var size = cc.winSize;
        this.bk.attr({
            x: 0,
            y: 0,
            anchorX: 0.0,
            anchorY: 0.0,
        });
        var bkSize = this.bk.getContentSize();
        this.bk.setScale(size.height/bkSize.height);
        if(this.footstep1 != null){
            this.footstep1.removeFromParent(true);
            this.footstep1 = null;
        }
        if (this.footstep2 != null){
            this.footstep2.removeFromParent(true);
            this.footstep2 = null;
        }

        this.scoreLabel.attr({
            x:0,
            y:size.height,
            anchorX:0,
            anchorY:1.0,
        })
        this.score = 0;
        this.resetLittle();

        var x = this.getRealWidth(this.footstep1) - this.getRealWidth(this.bridgeSprite);
        this.role.attr({
            x:x,
            y:this.footstepHeight,
            anchorX:1.0,
            anchorY:0
        });

    },
    resetLittle:function(){
      if(this.footstep1 != null) {
          this.footstep1.removeFromParent(true);
      };
        this.footstep1 = this.footstep2;
        this.footstep2 = null;
        this.addFootStep();

        //reset bridge
        var y = this.footstepHeight - this.bridgeSprite.getContentSize().width;
        var x = this.getRealWidth(this.footstep1);
        this.bridgeSprite.attr({
            x:x,
            y:y,
            anchorX:1.0,
            anchorY:0,
            scale:1.0,
        });
        this.bridgeSprite.setRotation(0);
        this.bridgeScaleY = 1.0;

        this.isPlayingAniamtion = false;

        this.scoreLabel.setString("score:"+this.score);
        GameModel.getInstance().setScore(this.score);

    },
    addFootStep:function(){
        //ad  footstep2
        var size = cc.winSize;
        if (this.footstep1 == null){
            // add footstep
            this.footstep1 = new cc.Sprite(res.footstep);
            this.footstep1.setColor(new cc.Color(125,0,56));
            var stepSize = this.footstep1.getContentSize();
            var bridgeScaleX1 = (cc.random0To1()*150+80)/stepSize.width;
            var scaleY = this.footstepHeight/stepSize.height;
            this.footstep1.setScale(bridgeScaleX1,scaleY);
            this.footstep1.attr({
                x:0,
                y:0,
                anchorX:0,
                anchorY:0,
            });
            this.addChild(this.footstep1,100);
        }
        if (this.footstep2 != null){
            this.footstep2.removeFromParent(true);
        }
        this.footstep2 = new cc.Sprite(res.footstep);
        this.footstep2.setColor(new cc.Color(125,0,56));
        var stepSize = this.footstep2.getContentSize();
        var bridgeScaleX2 = (cc.random0To1()*150+80)/stepSize.width;
        var scaleY = this.footstepHeight/stepSize.height;
        this.footstep2.setScale(bridgeScaleX2,scaleY);
        var x = cc.random0To1()*(size.width-this.getRealWidth(this.footstep1)-20-this.getRealWidth(this.footstep2)) +
            this.getRealWidth(this.footstep1)+20;
        this.footstep2.attr({
            x:size.width,
            y:0,
            anchorX:0,
            anchorY:0,
        });
        var footstepMove = cc.moveTo(0.3,x,0);
        this.addChild(this.footstep2,100);
        this.footstep2.runAction(footstepMove);
    },
    getRealWidth:function(sprite){
        var width = sprite.getContentSize().width;
        var scaleX = sprite.getScaleX();
        return width*scaleX;
    },
    getRealHeight:function(sprite){
        var height = sprite.getContentSize().height;
        var scaleY = sprite.getScaleY();
        return height*scaleY;
    },
    addSnow:function(){
        var apple = new cc.Sprite(res.snow);
        var size = cc.winSize;
        var x = cc.random0To1()*(size.width-apple.width)+apple.width/2;
        var y = size.height + apple.height/2;
        apple.attr({
            x:x,
            y:y,
            scale:cc.random0To1()*0.6+0.2,
        });
        apple.runAction(cc.sequence(
            cc.moveBy(3.0,0,-(size.height+apple.height)),
            cc.callFunc(function(){
                apple.removeFromParent(true);
                cc.log("apple remove from parent");
            })
        ));
        this.addChild(apple);
        var touchListener = cc.EventListener.create({
            event:cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches:false,
            onTouchBegan:function(touch,event){
                var pos = touch.getLocation();
                var target = event.getCurrentTarget();
                if (cc.rectContainsPoint(target.getBoundingBox(),pos)){
                    target.getParent().move();
                    target.removeFromParent(true);
                    cc.log("you click apple");
                    return ;
                }
                return false;
            }
        });
        cc.eventManager.addListener(touchListener,apple);
    }
});

var GameScene = cc.Scene.extend({
    ctor:function(){
        this._super();
        var layer = new GameLayer();
        this.addChild(layer);
    }
});
