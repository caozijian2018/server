/**
 * HTML5游戏源码教程
 * http://longwenjunjie.github.io/games
 *
 * QQ群:236030520
 *
 */
var OuterSpaceLayer = cc.Layer.extend({
    m_bgSprite1:null, // 背景图1
    m_bgSprite2:null, // 背景图2
    m_player:null, // 玩家飞机
    m_touchArea:null,// 飞机活动区域
    m_distanceFingerPlaneX:0, // 手指与玩家飞机的x距离
    m_distanceFingerPlaneY:0, // 手指与玩家飞机的y距离

    init:function () {
        this._super(); // 调用父类init方法

        this._initImgCache(); // 加载图片
        this._initBG(); // 初始化背景图
        this._initPlayer(); // 初始化玩家
        this._initEnemy(); // 初始化敌人
        this._initBullet();

        var self = this;

        cc.eventManager.addListener({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: true,
            onTouchBegan: function(touch){
                var touchPoint = touch.getLocation();

                var playerPoint = self.m_player.getPosition();

                self.m_distanceFingerPlaneX = touchPoint.x - playerPoint.x;
                self.m_distanceFingerPlaneY = touchPoint.y - playerPoint.y;

                return true;
            },

            onTouchMoved:function(touch, event){
                var touchPoint = touch.getLocation();
                //cc.Director.getInstance().convertToUI(posInView);
                var newPoint = cc.p(touchPoint.x - self.m_distanceFingerPlaneX, touchPoint.y - self.m_distanceFingerPlaneY);
                var desPos = self._buildMoveArea(newPoint);

                if (self._isMoveArea(desPos)) {
                    self.m_player.setPosition(desPos);
                }

            }
        }, this);

        this.scheduleUpdate(); // 启动update循环

    },

    onTouchBegan:function(touch){
        var touchPoint = touch.getLocation();

        var playerPoint = this.m_player.getPosition();

        this.m_distanceFingerPlaneX = touchPoint.x - playerPoint.x;
        this.m_distanceFingerPlaneY = touchPoint.y - playerPoint.y;

        return true;
    },

    onTouchMoved:function(touch,event){
        var touchPoint = touch.getLocation();
        //cc.Director.getInstance().convertToUI(posInView);
        var newPoint = cc.p(touchPoint.x - this.m_distanceFingerPlaneX ,touchPoint.y - this.m_distanceFingerPlaneY);
        var desPos = this._buildMoveArea(newPoint);

        if (this._isMoveArea(desPos)) {
            this.m_player.setPosition(desPos);
        }

    },

    // 构建玩家飞机可移动区域
    _buildMoveArea:function(newPoint){
        if (newPoint.x>=cc.rectGetMaxX(this.m_touchArea)) {
            newPoint.x = cc.rectGetMaxX(this.m_touchArea);
        }

        if (newPoint.x <= cc.rectGetMinX(this.m_touchArea)) {
            newPoint.x = cc.rectGetMinX(this.m_touchArea);
        }

        if (newPoint.y >= cc.rectGetMaxY(this.m_touchArea)) {
            newPoint.y = cc.rectGetMaxY(this.m_touchArea);
        }

        if (newPoint.y <= cc.rectGetMinY(this.m_touchArea)) {
            newPoint.y = cc.rectGetMinY(this.m_touchArea);
        }

        return newPoint;
    },

    // 是否在移动范围
    _isMoveArea:function(ccp) {
        return cc.rectContainsPoint(this.m_touchArea,ccp);
    },

    _initImgCache:function() {
        cc.spriteFrameCache.addSpriteFrames(s_plistFileName);
    },

    // 创建敌人
    _initEnemy:function(){
        // 创建怪物管理器
        var enemyMgr = new EnemyManager();
        enemyMgr.setPlayer(this.m_player);
        this.addChild(enemyMgr, 3);
    },

    _initBullet:function() {
        // 设置普通子弹
        this.m_player.setBulletNormal(this._buildBullet("#bullet_normal.png"));
    },

    _buildBullet:function(imgName) {
        var playerSize = this.m_player.getSprite().getContentSize();
        var playerPos = this.m_player.getPosition();

        var bullet = new Bullet();
        bullet.bindSprite(cc.Sprite.createWithSpriteFrameName(imgName));
        // 子弹从飞机头部发出
        bullet.setPositionY(playerPos.y + playerSize.height/2);

        this.addChild(bullet,2);

        return bullet;
    },

    /**
     * 初始化背景图
     */
    _initBG:function(){
        //var size = cc.Director.getInstance().getVisibleSize();
        var size = cc.winSize;

            this.m_bgSprite1 = cc.Sprite.create(s_BG);
        this.m_bgSprite1.setPosition(size.width/2,size.height/2);
        this.addChild(this.m_bgSprite1,0);

        this.m_bgSprite2 = cc.Sprite.create(s_BG);
        // 让地图二紧跟在地图1的后面
        this.m_bgSprite2.setPosition(size.width/2,size.height + size.height/2);
        // 垂直翻转图片
        this.m_bgSprite2.setFlippedY(true);
        this.addChild(this.m_bgSprite2,0);
    }

    ,_initPlayer:function(){
        //var size = cc.Director.getInstance().getVisibleSize();
        var size = cc.winSize;

        // 创建角色
        this.m_player = new Player();

        this.m_player.bindSprite(cc.Sprite.createWithSpriteFrameName("#player.png"));
        this.m_player.setPosition(size.width/2,100);

        this.addChild(this.m_player,1);
        var playerSize = this.m_player.getSprite().getContentSize();
        // 初始化飞机活动区域
        this.m_touchArea = cc.rect(
            playerSize.width/2 - 8
            ,playerSize.height/2 - 5
            ,size.width - playerSize.width + 18
            ,size.height - playerSize.height + 13);
    },

    _scrollBG:function(){
        var posY1 = this.m_bgSprite1.getPositionY();
        var posY2 =this. m_bgSprite2.getPositionY();

        var speed =1;

        posY1 -=speed;
        posY2 -=speed;

        var mapSize = this.m_bgSprite1.getContentSize();
        /*
         当第一个地图完全离开屏幕时,让第二个地图完全出现在屏幕上,
         同时让第一个地图紧贴在第二个地图之后
         */
        if(posY1< -mapSize.height/2){
            posY2 = mapSize.height/2;
            posY1 = mapSize.height + mapSize.height/2;
        }
        /*
         当第二个地图完全离开屏幕时,让第一个地图完全出现在屏幕上,
         同时让第二个地图紧贴在第一个地图之后
         */
        if(posY2<-mapSize.height/2){
            posY1 = mapSize.height/2;
            posY2 = mapSize.height + mapSize.height/2;
        }
        this.m_bgSprite1.setPositionY(posY1);
        this.m_bgSprite2.setPositionY(posY2);
    },

    update:function(dt){
        this._scrollBG();
        this.m_player.fire();
    }
});

var OuterSpaceScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new OuterSpaceLayer();
        this.addChild(layer);
        layer.init();
    }
});
