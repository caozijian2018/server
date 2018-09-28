/**
 * HTML5游戏源码教程
 * http://longwenjunjie.github.io/games
 *
 * QQ群:236030520
 *
 */
var Enemy = Entity.extend({
    m_isAlive : true, // 活动状态
    m_defHP : 0,     // 初始化血量,正数
    m_loseHP : 0,    // 扣除的血量,正数
    m_cloth : "",      // 衣服,即精灵图片

    setDefHP:function(hp){
        this.m_defHP = hp;
    },

    setCloth:function(cloth){
        this.m_cloth = cloth;
    },

    show:function(){
        if(this.getSprite() != null){
            this.setVisible(true);
        }
    },

    hide:function(){
        if(this.getSprite() != null){
            this.setVisible(false);
            this.reset();
        }
    },

    /**
     * 受伤
     */
    hurt:function(hp){

        this.m_loseHP = this.m_loseHP + hp;
        if(this.m_loseHP >= this.m_defHP){
            this.die();
        }
    },

    /**
     * 死亡
     */
    die:function(){

        var c_cloth = this.m_cloth;

        var imgName = c_cloth.substring(1, c_cloth.indexOf('.')) + "_hurt";
        // 敌机爆炸动画
        var animation = AnimateUtil.createWithSingleFrameN(imgName, 0.1, 1);
        // 动画结束后调用
        var callfunction = cc.CallFunc.create(this.reset,this);

        var actions = cc.Sequence.create(cc.Animate.create(animation),callfunction);
        // 运行动画效果
        this.getSprite().runAction(actions);
    },

    /**
     * 重置状态
     */
    reset:function(){

        if(this.getSprite()){
            var size = cc.winSize;
            var planeSize = this.getSprite().getContentSize();

            var posX = planeSize.width/2 + cc.random0To1() * (size.width - planeSize.width/2);
            var posY = cc.random0To1() * 4000 + size.height;

            this.setPosition(cc.p(posX,posY));
            // 设置初始图片
            //this.getSprite().initWithSpriteFrameName(this.m_cloth);
            this.m_loseHP = 0;

            this.show();
        }
    },

    /**
     * 判断是否与玩家碰撞
     */
    isCollideWithPlayer:function(player){
        var entityRec = player.getBoundingBox();

        var enemyPos = this.getPosition();

        return cc.rectContainsPoint(entityRec,enemyPos);
    },

    /**
     * 是否与子弹碰撞
     */
    isCollideWithBullet:function(bullet){
        var enemyRec = this.getBoundingBox();

        var bulletPos = bullet.getPosition();

        return cc.rectContainsPoint(enemyRec,bulletPos)
    }
});
