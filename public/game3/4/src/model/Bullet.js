/**
 * HTML5游戏源码教程
 * http://longwenjunjie.github.io/games
 *
 * QQ群:236030520
 *
 */
var Bullet = Entity.extend({
    m_power:5, // 子弹威力

    show:function(){
        this.setVisible(true);
    },

    hide:function(){
        this.setVisible(false);
    },

    reset:function(player){
        if(this.getSprite() != null){
            var playerSize = player.getSprite().getContentSize();
            var playerPos = player.getPosition();

            this.setPositionY(playerPos.y + playerSize.height/2);
        }
    },

    getPower:function(){
        return this.m_power;
    }
})