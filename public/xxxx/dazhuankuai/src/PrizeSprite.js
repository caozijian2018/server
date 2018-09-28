/**
 * HTML5游戏源码教程
 * http://longwenjunjie.github.io/games
 *
 * QQ群:236030520
 *
 */

var PrizeSprite = cc.Sprite.extend({
    isHit: false,//是否被碰撞
    point: 0,//分数
    radius:0 //碰撞半径
});
//叶子
var LeafPrize = PrizeSprite.extend({
    ctor: function () {
        this._super();
        this.initWithFile(s_leaf);//赋予图片元素
    },
    initData:function(){
        this.isHit = false;
        this.point = 10; //分数
        this.radius = 15; //碰撞半径
    }
});
//花
var FlowerPrize = PrizeSprite.extend({
    ctor: function () {
        this._super();
        this.initWithFile(s_flower);//赋予图片元素
    } ,
    initData:function(){
        this.isHit = false;
        this.point = 20; //分数
        this.radius = 15; //碰撞半径
    }
});
//橡子
var AcornPrize = PrizeSprite.extend({
    ctor: function () {
        this._super();
        this.initWithFile(s_acorn);//赋予图片元素
    } ,
    initData:function(){
        this.isHit = false;
        this.point = 30; //分数
        this.radius = 15; //碰撞半径
    }
});