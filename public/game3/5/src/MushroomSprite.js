/**
 * HTML5游戏源码教程
 * http://longwenjunjie.github.io/games
 *
 * QQ群:236030520
 *
 */
var MushroomSprite = cc.Sprite.extend({
    radius:40,
    //构造函数，当new一个当前的实例时，会执行ctor
    ctor:function(){
        this._super();  //调用父类的同名方法，这里是调用cc.Sprite的ctor
        this.initWithFile(s_mushroom);//赋予图片元素
        //cc.Director.getInstance().getTouchDispatcher().addTargetedDelegate(this, 0, true);

        var self = this;
        cc.eventManager.addListener({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: true,
            onTouchBegan:function (touch, event) {
                return self.containsTouchLocation(touch);
            },

            onTouchMoved:function (touch, event) {
                cc.log("onTouchMoved");
                var touchPoint = touch.getLocation();
                self.setPositionX(touchPoint.x);  //设置X轴位置等于触摸的x位置
            }
        }, this);
    },

    //判断触摸点是否在图片的区域上
    containsTouchLocation:function (touch) {
        //获取触摸点位置
        var getPoint = touch.getLocation();

        //物体当前区域所在的位置
        var contentSize  =  this.getContentSize();
        var myRect = cc.rect(0, 0, contentSize.width, contentSize.height);
        myRect.x += this.getPosition().x - this.getContentSize().width / 2;
        myRect.y += this.getPosition().y;
        //判断点击是否在区域上
        return cc.rectContainsPoint(myRect, getPoint);
    }
});