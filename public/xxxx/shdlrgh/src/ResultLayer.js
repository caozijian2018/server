/**
 * HTML5游戏源码教程
 * http://longwenjunjie.github.io/games
 *
 * QQ群:236030520
 *
 */
var ResultLayer = cc.Layer.extend({
    ctor:function(){
        this._super();
        var size = cc.winSize;
        var score = GameModel.getInstance().getCurrentScore();
        var maxScore = GameModel.getInstance().getMaxScore();
        var scoreLabel = new cc.LabelTTF("score:"+score, "Arial", 30);
        scoreLabel.attr({
            x:size.width/3,
            y:size.height/8*5,
            anchorX:0,
        });
        var scoreMaxScore = new cc.LabelTTF("maxScore:"+maxScore, "Arial", 30);
        scoreMaxScore.attr({
            x:size.width/3,
            y:size.height/4*2,
            anchorX:0,
        });
        this.addChild(scoreLabel,10);
        this.addChild(scoreMaxScore,10);

        var bk = new cc.Sprite(res.resultPanel);
        bk.attr({
            x:size.width/2,
            y:size.height/2,
            anchorX:0.5,
            anchorY:0.5,
        });
        this.addChild(bk,1);

        var touchListener = cc.EventListener.create({
            event:cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches:true,
            onTouchBegan:function(touch,event){
                return true;
            },
            onTouchMoved:function(touch,event){

            },
            onTouchEnded:function(touch,event){
                var target = event.getCurrentTarget();
                var pos = touch.getLocation();
                if (cc.rectContainsPoint(target.getBoundingBox(),pos)){
                    GameModel.getInstance().getGameLayer().reset();
                    target.getParent().removeFromParent(true);

                }
            }
        });

        var againSprite = new cc.Sprite(res.reStart);
        againSprite.attr({
            x:size.width/2,
            y:size.height/3,
        });
        this.addChild(againSprite,10);
        cc.eventManager.addListener(touchListener,againSprite);
    }
});
