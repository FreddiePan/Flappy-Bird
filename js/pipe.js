/**
 * Created by Dan on 2017/6/11.
 */
(function(Fly){
  'use strict';
  var Pipe = function(config){
    this.imgTop = config.imgTop;
    this.imgBottom = config.imgBottom;
    this.ctx = config.ctx;
    this.x = config.x;
    this.pipeSpace = config.pipeSpace;
    //纵坐标随机生成
    this.topY = 0;
    this.bottomY = 0;
    this.imgW = this.imgTop.width;
    this.imgH = this.imgTop.height;
    this.speed = 0.15;
    //new pipe时就生成管道高度
    this.initPipeHeight();
  };
  Pipe.prototype = {
    constructor: Pipe,
    draw: function(delta){
      this.x -= this.speed * delta;
      //管道之间的宽度是管道宽度的两倍
      if(this.x <= -this.imgW * 3){
        //乘以3是一组的宽度，乘以6是需要6组
        this.x += this.imgW * 3 * 6;
        //管道跑到最后去，需要重新调用让纵坐标随机生成
        this.initPipeHeight();
      }
      
      this.ctx.drawImage(this.imgTop, this.x, this.topY);
      this.ctx.drawImage(this.imgBottom, this.x, this.bottomY);
      //绘制管道路径
      
      this.ctx.rect(this.x, this.topY, this.imgW, this.imgH);
      this.ctx.rect(this.x, this.bottomY, this.imgW, this.imgH);
      //this.ctx.fill();
      
    },
    //随机生成管道的高度,每初始化对象就来调用一次这个方法，不能放draw里，draw每画一次就生成一次
    initPipeHeight: function(){
      var pipeTopHeight = Math.random()*150+100;
      this.bottomY = pipeTopHeight + this.pipeSpace;
      this.topY = pipeTopHeight - this.imgH;
    }
  };

  Fly.Pipe = Pipe;
})(Fly);