/**
 * HTML5游戏源码教程
 * http://longwenjunjie.github.io/games
 *
 * QQ群:236030520
 *
 */
var StartLayer = cc.Layer.extend({
    ctor:function(){
        this._super();

        var size = cc.winSize;

        var bg = new cc.Sprite(res.bg);
		bg.setScale(size.width/bg.width, size.height/bg.height);;
        bg.attr({
            x:size.width / 2,
            y:size.height / 2,
        });
        this.addChild(bg);

	    cc.eventManager.addListener(cc.EventListener.create({
		    event: cc.EventListener.TOUCH_ONE_BY_ONE,
		    swallowTouches: true,
		    onTouchBegan: function(touch, event) {
			    cc.director.runScene(new GameScene());
		    }
	    }), this);

	    this.schedule(this.addSnow, 1);
    },

	addSnow:function(){
		var snow = new cc.Sprite(res.snow);
		var size = cc.winSize;
		snow.attr({
			x : cc.random0To1() * (size.width - snow.width) + snow.width / 2,
			y : size.height + snow.height / 2,
			scale : cc.random0To1()*0.6 + 0.2,
		});
		snow.runAction(cc.sequence(
			cc.moveBy(3.0, 0, -(size.height + snow.height)),
			cc.callFunc(function(){
				snow.removeFromParent(true);
			})
		));
		this.addChild(snow);
	}
});

var StartScene = cc.Scene.extend({
    onEnter:function(){
        this._super();
        var layer = new StartLayer();
        this.addChild(layer);
    }
})
