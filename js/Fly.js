/**
 * Created by Dan on 2017/6/10.
 */
//游戏中唯一的全局对象Fly
//Fly.Bird/ Fly.Sky/ Fly.Land/ Fly.Pipe/ Fly.Game
//一些工具性函数，也挂到Fly上
//Fly.loadImages/ Fly.toRadian

(function (window) {
  'use strict';
  var Flyobj = {};
  //角度转弧度
  Flyobj.toRadian = function(angle) {
    return angle / 180  *Math.PI;
  };
  
  //等所有图片加载完执行callback函数
  Flyobj.loadImages = function(srcList, callback) {
    //有一个变量记录加载完成的图片数量，只要有一个图片加载完成，就加1，如果这个数量与所有图片数量相同，就加载完成了
    var count = 0;
    var allLength = srcList.length;
    //把图片存到这个对象中
    var imgsObj = {};
    srcList.forEach(function (src){
      //创建图片对象
      var img = new Image();
      img.src = './images/' + src + '.png';
      
      imgsObj[src] = img;
      img.onload = function () {
        count++;
        if(count >= allLength){
          callback(imgsObj);
        };
      };
    });
  };
  
  //暴露到全局环境
  window.Fly = Flyobj;
})(window);