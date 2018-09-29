/**
 * HTML5游戏源码教程
 * http://longwenjunjie.github.io/games
 *
 * QQ群:236030520
 *
 */
var Player = Entity.extend({
    m_bulletNormal:null, // 子弹

    setBulletNormal:function(bullet){
        this.m_bulletNormal = bullet;
    },

    die:function() {

    },

    fire:function() {
        var size = cc.winSize;
        var playerPos = this.getPosition();

        var bullet = this.getBullet();

        bullet.setPositionX(playerPos.x);
        // 向上移动
        bullet.setPositionY(bullet.getPositionY() + 16);
        // 播放子弹声音

        // 子弹超出屏幕顶端
        if(bullet.getPositionY() > size.height) {
            bullet.reset(this);
        }
    },

    getBullet:function(){
          return this.m_bulletNormal;
    }
});
