/**
 * HTML游戏源码教程
 * http://longwenjunjie.github.io/games
 *
 * 合作QQ:465936140
 *
 */
var AnimateUtil = {
    createWithSingleFrameN:function(imgName, delay, loops) {

        var framesArr = [];
        var index = 1;

        do
        {
            var spriteImgName = imgName + index + ".png";
            var frame = cc.spriteFrameCache.getSpriteFrame(spriteImgName);
            if(!frame) {
                break;
            }

            framesArr.push(frame);

            index++
        } while (true);

        var animation = cc.Animation.create(framesArr, delay);

        animation.setLoops(loops || 1);
        animation.setRestoreOriginalFrame(true);
        animation.setDelayPerUnit(delay);

        return animation;
    }
}