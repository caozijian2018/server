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
        var menuItemStart = new cc.MenuItemImage(res.start, res.start, function() {
            cc.log("you clicked startGame menuItem");
            cc.director.runScene(new GameScene());
        }, this);
        menuItemStart.x = size.width/2;
        menuItemStart.y = size.height/2;
        menuItemStart.attr({
            x:size.width/2,
            y:size.height/2,
            anchorX:0.5,
            anchorY:0.5
        });
        var menu = new cc.Menu();
        menu.x = 0;
        menu.y = 0;
        this.addChild(menu, 10);
        menu.addChild(menuItemStart);

        var bkImage = new cc.Sprite(res.startbk);
        var bkSize = bkImage.getContentSize();
        var rate = Math.max(bkSize.width/size.width,bkSize.height/size.height);
        bkImage.setScale(1/rate);
        bkImage.attr({
            x:size.width / 2,
            y:size.height / 2,
            anchorX:0.5,
            anchorY:0.5
        });
        this.addChild(bkImage);
    }
});

var StartScene = cc.Scene.extend({
    onEnter:function(){
        this._super();
        var layer = new StartLayer();
        this.addChild(layer);
    }
})
