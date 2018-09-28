/**
 * HTML5游戏源码教程
 * http://longwenjunjie.github.io/games
 *
 * QQ群:236030520
 *
 */
var Entity = cc.Node.extend({
    m_sprite:null,

    /**
     * 获得精灵对象
     */
    getSprite:function(){
        return this.m_sprite;
    },

    /**
     * 绑定精灵对象
     */
    bindSprite:function(sprite){
        this.m_sprite = sprite;
        this.addChild(this.m_sprite);
    },

    // 获取碰撞体积
    getBoundingBox:function(){
        if (this.getSprite() == null)
        {
            return cc.rect(0,0,0,0);
        }
        var spriteSize = this.getSprite().getContentSize();
        var entityPos = this.getPosition();

        return cc.rect(
            entityPos.x - spriteSize.width/2
            ,entityPos.y - spriteSize.height/2
            ,spriteSize.width
            ,spriteSize.height
        );
    }
});
