/**
 * Created by Dan on 2017/6/11.
 */
(function(Fly){
  'use strict';
  var Land = function(config){
    this.img = config.img;
    this.ctx = config.ctx;
    this.x = config.x;
    this.y = config.y;
    this.speed = 0.15;
    this.imgW = this.img.width;
  };

  Land.prototype = {
    constructor: Land,

    draw: function(delta){
      //计算当前坐标
      this.x -= this.speed * delta;
      if(this.x <= -this.imgW){
        this.x += this.imgW * 4;
      }

      this.ctx.drawImage(this.img, this.x, this.y);
    }

  };

  Fly.Land = Land;
})(Fly);