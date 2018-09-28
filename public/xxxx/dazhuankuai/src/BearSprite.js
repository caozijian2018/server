/**
 * HTML5游戏源码教程
 * http://longwenjunjie.github.io/games
 *
 * QQ群:236030520
 *
 */

var BearSprite = cc.Sprite.extend({
    velocity: null,
    radius: 25, //碰撞半径
    curSence:null,
    //构造函数，当new一个当前的实例时，会执行ctor
    ctor: function () {
        this._super();
        this.initWithFile(s_bear_eyesopen);//赋予图片元素
        this.velocity = cc.p(100, 100);
    },
    initData:function(){
       this.setPosition(cc.p(240,120));
       this.velocity = cc.p(100, 100);
    },
    beginRotate: function () {
        var rotate = cc.RotateBy.create(2, 360); //旋转角度，第1个参数：时间，第2个参数：在这个时间内旋转的角度
        var rep1 = cc.RepeatForever.create(rotate); //循环旋转
        this.runAction(rep1);//执行
    },
    stopRotate: function () {
        this.stopAllActions();
    },
    update: function (dt) {
        this.setPosition(cc.pAdd(this.getPosition(), cc.pMult(this.velocity, dt)));
        this.checkHitEdge();
    },
    //检查边界碰撞
    checkHitEdge: function () {
        var pos = this.getPosition();
        var contentSize = this.getContentSize();
        var winSize = cc.winSize;
        //熊碰到右边边界
        if (pos.x > winSize.width - this.radius) {
            //假如向右移动
            this.velocity.x *= -1;//改变水平速度方向

        }
        //熊碰到左边边界
        if (pos.x < this.radius) {
            this.velocity.x *= -1;//改变水平速度方向
        }
        //熊碰到下面边界
        if (pos.y <= this.radius) {
            //减少生命
            this.curSence.reduceLives();
        }
        //熊碰到上边边界
        if (pos.y >= winSize.height - this.radius) {
            this.velocity.y *= -1;
        }
    },
    //碰撞检测
    collide: function (gameObject) {
        var hit = false;
        var distance = cc.pDistance(this.getPosition(), gameObject.getPosition());//两者之间的距离
        //计算碰撞角度，往反方向弹回去
        if (distance <= this.radius + gameObject.radius) {
            hit = true;
            //计算碰撞角度
            var hitAngle = cc.pToAngle(cc.pSub(gameObject.getPosition(), this.getPosition()));
            var scalarVelocity = cc.pLength(this.velocity);
            this.velocity = cc.pMult(cc.pForAngle(hitAngle), scalarVelocity);
            //反方向移动
            this.velocity.x *=-1;
            this.velocity.y *=-1;
        }
        return hit;
    }


});