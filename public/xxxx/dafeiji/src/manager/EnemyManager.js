/**
 * HTML5游戏源码教程
 * http://longwenjunjie.github.io/games
 *
 * QQ群:236030520
 *
 */
// 敌人管理类
var EnemyManager = cc.Node.extend({

    m_player:null,   // 玩家
    m_enemyArr:[],  // 存放敌机

    ctor:function(){
        this._super();
        var ret = false;
        do
        {
            this.createEnemy(); // 创建敌人
            this.scheduleUpdate();
            ret = true;
        } while (0);
        return ret;
    },

    createEnemy:function() {
        // 创建小型飞机
        this._createSmallEnemy(10);
        // 创建中型飞机
        this._createMiddleEnemy(5);
        // 创建大型飞机
        this._createBigEnemy(2);
    },

    _createSmallEnemy:function(enemyNum){
        this._doCreateEnemy(enemyNum, 5, "#enemy_small.png");
    },

    _createMiddleEnemy:function(enemyNum){
        this._doCreateEnemy(enemyNum, 30, "#enemy_middle.png");
    },

    _createBigEnemy:function(enemyNum){
        this._doCreateEnemy(enemyNum, 60, "#enemy_big.png");
    },

    // 创建操作
    _doCreateEnemy:function(enemyNum, hp, imgName){
        var enemy = null;

        for (var i=0;i<enemyNum;i++)
        {
            enemy = new Enemy();
            enemy.bindSprite(cc.Sprite.create(imgName));
            enemy.setDefHP(hp);
            enemy.setCloth(imgName);
            enemy.reset();

            this.addChild(enemy,2);

            this.m_enemyArr.push(enemy);
        }
    },

    setPlayer:function(player){
        this.m_player = player;
    },

    update:function(dt){
        var enemy = null;
        var bullet = this.m_player.getBullet();
        for(var i = 0,len = this.m_enemyArr.length;i<len;i++){
            enemy = this.m_enemyArr[i]; // 取出一个敌人
                // 敌人Y轴位移每次减2,这样就往下飞行了
            enemy.setPositionY(enemy.getPositionY() - 2);
            // cc.log(i)
            // 飞到最底部就消失
            if(enemy.getPositionY() < 0) {
                enemy.hide();
            }

            // 子弹击中敌人
            if(enemy.isCollideWithBullet(bullet)){
                bullet.reset(this.m_player);
                enemy.hurt(bullet.getPower());
            }

            // 如果敌人碰到玩家
            if (enemy.isCollideWithPlayer(this.m_player))
            {
                this.m_player.die();
                enemy.hide();
            }

        }

    }
});