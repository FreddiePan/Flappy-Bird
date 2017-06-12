/**
 * Created by Dan on 2017/6/10.
 */

//小鸟暴露给window, 以后天空、管道、陆地、游戏对象都要暴露给window,让小鸟作为全局对象不合理
//定义一个大的对象把这些都包裹起来，让整个程序只保留一个全局对象Fly，所有其他对象都挂到Fly上
(function (Fly) {
  'use strict';
  //构造函数
  function Bird(config) {
    //把固定的值当成参数传进来，不直接依赖外界
    // this.birdImg = imgsObj.birds;
    this.img = config.img;
    //console.log(birdImg);
    
    this.ctx = config.ctx;
    
    this.imgW = this.img.width/3;
    this.imgH = this.img.height;
    //记录移动到哪一帧
    this.frameIndex = 0;
    //实现小鸟下落，就是改变画布中的y值, 经过事件delta之后小鸟的位置,delta是两帧时间间隔
    this.x = 100;
    this.y = 100;
    this.a = 0.0005;
    this.speed = 0;
    this.curAngle = 0;
    this.maxAngle = 45;
    this.maxSpeed = 0.4;
  };
  //原型对象
  Bird.prototype = {
    constructor: Bird,
    draw: function (delta) {
      //delta通过参数传进来，依赖外界的都通过参数传进来
      //用公式计算小鸟下降速度
      this.speed = this.speed + this.a * delta;
      this.y += this.speed * delta + 1/2*this.a*Math.pow(delta,2);
      //计算当前角度
      this.curAngle = this.speed/this.maxSpeed * this.maxAngle;
      //给curAngle设定一个最大值和最小值，不让小鸟翻转
      if(this.curAngle >= this.maxAngle){
        this.curAngle = this.maxAngle;
      }else if(this.curAngle <= -this.maxAngle) {
        this.curAngle = -this.maxAngle;
      };
      //小鸟绕着自己转，需要先将圆心点坐标移到小鸟上
      this.ctx.translate(this.x, this.y);
      this.ctx.rotate(Fly.toRadian(this.curAngle));
      //让小鸟位于圆心点中心
      this.ctx.drawImage(this.img, this.imgW * this.frameIndex++, 0, this.imgW, this.imgH, -1/2*this.imgW, -1/2*this.imgH, this.imgW, this.imgH);
      if(this.frameIndex >= 3){
        this.frameIndex = 0;
      };
    },
    changeSpeed: function (speed) {
      this.speed = speed;
    }
  };
  
  
  Fly.Bird = Bird;
})(Fly);