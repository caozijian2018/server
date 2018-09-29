/**
 * HTML5游戏源码教程
 * http://longwenjunjie.github.io/games
 *
 * QQ群:236030520
 *
 */
var GameModel = (function(){
    var instance = null;
    function getInstance(){
        if (instance == null){
            instance = new ConStruct();
        }
        return instance;
    }
    function ConStruct(){
        this.maxScore = 0;
        this.currentScore = 0;
        this.gameLayer = null;
        this.resultLayer = null;
    }
    ConStruct.prototype.setScore = function(score){
        this.currentScore = score;
        if (score>this.maxScore){
            this.maxScore = score;
        }
    };
    ConStruct.prototype.getCurrentScore = function(){
        return this.currentScore;
    };
    ConStruct.prototype.getMaxScore = function(){
        return this.maxScore;
    };
    ConStruct.prototype.setGameLayer = function(gameLayer){
        this.gameLayer = gameLayer;
    };
    ConStruct.prototype.setResultLayer = function(resultLayer){
        this.resultLayer = resultLayer;
    };
    ConStruct.prototype.getGameLayer = function(){
        return this.gameLayer;
    };
    ConStruct.prototype.getResultLayer = function(){
        return this.resultLayer;
    };
    return {
        getInstance:getInstance
    }
})();