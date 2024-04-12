/*
 * @Date: 2022-05-16 21:06:45
 * @LastEditors: zhangjian 183518918@qq.com
 * @LastEditTime: 2023-04-15 02:25:16
 * @FilePath: \myblog\source\zjtools\z\flow1\js\zsharputil.js
 */

export const draw_type = {
  yuan: 0, //圆形
  jv: 1, //矩形
  ling: 2, //菱形
  jv2: 3, //圆角矩形
  fang: 4, //方形
  corner: 99 //四个角的圆形
};
const devicePixelRatio = window.devicePixelRatio;
const default_fontsize = 18 * devicePixelRatio;
const default_corner_width = 12 * devicePixelRatio;
const default_line_width = 2 * devicePixelRatio;
const default_border_width = 2 * devicePixelRatio;
let imagecache = {};
export const sharputil = {
  sharp_yuan: function (
    ctx,
    x,
    y,
    width,
    height,
    text,
    font_size,
    border_color,
    bg_color,
    text_color,
    border_width
  ) {
    if (typeof border_width === "undefined") {
      border_width = default_border_width;
    }
    // 开始绘制路径
    ctx.beginPath();
    ctx.setLineDash([]);
    ctx.strokeStyle = border_color || "#fde3ba";
    // 绘制圆的路径
    ctx.arc(x, y, width / 2, 0, Math.PI * 2, false);
    //填充内部
    ctx.fillStyle = bg_color || "#fef2e9";
    ctx.fill();
    //绘制文字
    ctx.fillStyle = text_color || "#666666"; //设置填充颜色为紫色
    font_size = font_size || default_fontsize;
    ctx.font = font_size + 'px "微软雅黑"'; //设置字体
    ctx.textBaseline = "middle"; //设置字体底线对齐绘制基线
    ctx.textAlign = "center"; //设置字体对齐的方式
    ctx.fillText(text, x, y); //填充文字
    ctx.closePath();
    //绘制边框
    if (border_width > 0) {
      ctx.lineWidth = border_width;
      ctx.stroke();
    }
  },
  sharp_jv_left (
    ctx,
    x,
    y,
    width,
    height,
    bgcolor
  ) {
    bgcolor = bgcolor || "#4478ff";
    let radius = 10;
    let leftWidth = height;
    let px = x - width / 2;
    let py = y - height / 2;
    ctx.translate(px, py);
    ctx.beginPath();
    ctx.setLineDash([]);
    ctx.strokeStyle = bgcolor;
    ctx.moveTo(leftWidth, 0);
    ctx.lineTo(leftWidth, height);
    //矩形下边线
    ctx.lineTo(radius, height);
    //左下角圆弧，弧度从1/2PI到PI
    ctx.arc(radius, height - radius, radius, Math.PI / 2, Math.PI);
    //矩形左边线
    ctx.lineTo(0, radius);
    //左上角圆弧，弧度从PI到3/2PI
    ctx.arc(radius, radius, radius, Math.PI, (Math.PI * 3) / 2);
    //上边线
    ctx.lineTo(leftWidth, 0);
    ctx.fillStyle = bgcolor;
    ctx.fill();
    ctx.closePath();
    ctx.translate(-px, -py);
  },
  sharp_jv: function (
    ctx,
    x,
    y,
    width,
    height,
    text,
    font_size,
    border_color,
    bg_color,
    imgurl,
    icon_bg,
    text_color,
    border_width
  ) {
    if (typeof border_width === "undefined") {
      border_width = default_border_width;
    }
    let radius = 10;
    let px = x - width / 2;
    let py = y - height / 2;
    ctx.translate(px, py);
    ctx.beginPath();
    ctx.setLineDash([]);
    ctx.strokeStyle = border_color || "#c6e7fe";
    //从右下角顺时针绘制，弧度从0到1/2PI
    ctx.arc(width - radius, height - radius, radius, 0, Math.PI / 2);
    //矩形下边线
    ctx.lineTo(radius, height);
    //左下角圆弧，弧度从1/2PI到PI
    ctx.arc(radius, height - radius, radius, Math.PI / 2, Math.PI);
    //矩形左边线
    ctx.lineTo(0, radius);
    //左上角圆弧，弧度从PI到3/2PI
    ctx.arc(radius, radius, radius, Math.PI, (Math.PI * 3) / 2);
    //上边线
    ctx.lineTo(width - radius, 0);
    //右上角圆弧
    ctx.arc(width - radius, radius, radius, (Math.PI * 3) / 2, Math.PI * 2);
    //右边线
    ctx.lineTo(width, height - radius);
    ctx.fillStyle = bg_color || "#e7f7fe";
    ctx.fill();
    ctx.closePath();
    ctx.translate(-px, -py);
    if (imgurl) {
      this.sharp_jv_left(ctx, x, y, width, height, icon_bg);
      ctx.fillStyle = text_color || "#666666"; //设置填充颜色
      font_size = font_size || default_fontsize;
      ctx.font = font_size + 'px "微软雅黑"'; //设置字体
      ctx.textBaseline = "middle"; //设置字体底线对齐绘制基线
      ctx.textAlign = "left"; //设置字体对齐的方式
      ctx.fillText(text, x - width / 2 + height + height / 2, y); //填充文字

      let space = height / 6;

      if (imagecache[imgurl]) {
        ctx.drawImage(
          imagecache[imgurl],
          x - width / 2 + space,
          y - height / 2 + space,
          height - space * 2,
          height - space * 2
        );
      } else {
        var img = new Image();
        img.src = imgurl;
        img.onload = function () {
          imagecache[imgurl] = this;
          //图片加载完成后，执行此方法
          ctx.drawImage(
            this,
            x - width / 2 + space,
            y - height / 2 + space,
            height - space * 2,
            height - space * 2
          );
        };
      }
    } else {
      ctx.fillStyle = text_color || "#666666"; //设置填充颜色
      font_size = font_size || default_fontsize;
      ctx.font = font_size + 'px "微软雅黑"'; //设置字体
      ctx.textBaseline = "middle"; //设置字体底线对齐绘制基线
      ctx.textAlign = "center"; //设置字体对齐的方式
      ctx.fillText(text, x, y); //填充文字
    }

    if (border_width > 0) {
      ctx.lineWidth = border_width;
      ctx.stroke();
    }
  },
  sharp_ling: function (
    ctx,
    x,
    y,
    width,
    height,
    text,
    font_size,
    border_color,
    bg_color,
    text_color,
    border_width
  ) {
    if (typeof border_width === "undefined") {
      border_width = default_border_width;
    }
    let width_half = width / 2;
    let height_half = height / 2;
    ctx.beginPath();
    //绘制边框
    ctx.setLineDash([]);
    ctx.strokeStyle = border_color || "#7ce3dc";
    ctx.moveTo(x - width_half, y);
    ctx.lineTo(x, y - height_half);
    ctx.lineTo(x + width_half, y);
    ctx.lineTo(x, y + height_half);
    ctx.lineTo(x - width_half, y);
    //填充内部
    ctx.fillStyle = bg_color || "#e7fefa";
    ctx.fill();
    //文字
    ctx.fillStyle = text_color || "#666666"; //设置填充颜色为紫色
    font_size = font_size || default_fontsize;
    ctx.font = font_size + 'px "微软雅黑"'; //设置字体
    ctx.textBaseline = "middle"; //设置字体底线对齐绘制基线
    ctx.textAlign = "center"; //设置字体对齐的方式
    ctx.fillText(text, x, y); //填充文字
    if (border_width > 0) {
      ctx.lineWidth = border_width;
      ctx.stroke();
    }
  },
  sharp_jv2: function (
    ctx,
    x,
    y,
    width,
    height,
    text,
    font_size,
    border_color,
    bg_color,
    text_color,
    border_width
  ) {
    if (typeof border_width === "undefined") {
      border_width = default_border_width;
    }
    let width_half = width / 2;
    let height_half = height / 2;
    // 开始绘制路径
    ctx.beginPath();
    //绘制边框
    ctx.setLineDash([]);
    ctx.strokeStyle = border_color || "#d1b0f3";
    // 绘制圆的路径**
    ctx.arc(
      x + (width_half - height_half),
      y,
      height_half,
      -Math.PI / 2,
      Math.PI / 2,
      false
    );
    ctx.lineTo(x - (width_half - height_half), y + height_half);
    ctx.arc(
      x - (width_half - height_half),
      y,
      height_half,
      Math.PI / 2,
      (Math.PI / 2) * 3,
      false
    );
    ctx.lineTo(x + (width_half - height_half), y - height_half);

    //填充内部
    ctx.fillStyle = bg_color || "#f8f0fe";
    ctx.fill();
    //文字
    ctx.fillStyle = text_color || "#666666"; //设置填充颜色为紫色
    font_size = font_size || default_fontsize;
    ctx.font = font_size + 'px "微软雅黑"'; //设置字体
    ctx.textBaseline = "middle"; //设置字体底线对齐绘制基线
    ctx.textAlign = "center"; //设置字体对齐的方式
    ctx.fillText(text, x, y); //填充文字
    if (border_width > 0) {
      ctx.lineWidth = border_width;
      ctx.stroke();
    }
  },
  sharp_fang: function (
    ctx,
    x,
    y,
    width,
    height,
    text,
    font_size,
    border_color,
    bg_color,
    text_color,
    border_width
  ) {
    //方形
    if (typeof border_width === "undefined") {
      border_width = default_border_width;
    }
    let width_half = width / 2;
    let height_half = height / 2;
    // 开始绘制路径
    ctx.beginPath();
    //绘制边框
    ctx.strokeStyle = border_color || "#2A82E4";
    ctx.setLineDash([]);
    ctx.moveTo(x - width_half, y - height_half);
    ctx.lineTo(x + width_half, y - height_half);
    ctx.lineTo(x + width_half, y + height_half);
    ctx.lineTo(x - width_half, y + height_half);
    ctx.lineTo(x - width_half, y - height_half);
    ctx.closePath();
    //填充内部
    ctx.fillStyle = bg_color || "#e7f7fe";
    ctx.fill();

    //文字
    ctx.fillStyle = text_color || "#666666"; //设置填充颜色为紫色
    font_size = font_size || default_fontsize;
    ctx.font = font_size + 'px "微软雅黑"'; //设置字体
    ctx.textBaseline = "middle"; //设置字体底线对齐绘制基线
    ctx.textAlign = "center"; //设置字体对齐的方式
    ctx.fillText(text, x, y); //填充文字
    // 描边路径
    if (border_width > 0) {
      ctx.lineWidth = border_width;
      ctx.stroke();
    }
  },
  sharp_corner: function (ctx, x, y) {
    let width = default_corner_width;
    // 开始绘制路径
    ctx.beginPath();
    //绘制边框
    ctx.lineWidth = default_border_width;
    ctx.setLineDash([]);
    ctx.strokeStyle = "#2A82E4";
    // 绘制圆的路径
    ctx.arc(x, y, width / 2, 0, Math.PI * 2, false);

    //填充内部
    ctx.fillStyle = "#ffffff";
    ctx.fill();
    ctx.closePath();
    // 描边路径
    ctx.stroke();
  },
  sharp_xv_kuang: function (ctx, x, y, width, height) {
    //虚线框
    let width_half = width / 2;
    let height_half = height / 2;
    // 开始绘制路径
    ctx.beginPath();
    //绘制边框
    ctx.lineWidth = default_border_width;
    ctx.strokeStyle = "#2A82E4";
    ctx.setLineDash([4, 4]);
    ctx.moveTo(x - width_half, y - height_half);
    ctx.lineTo(x + width_half, y - height_half);
    ctx.lineTo(x + width_half, y + height_half);
    ctx.lineTo(x - width_half, y + height_half);
    ctx.lineTo(x - width_half, y - height_half);
    ctx.closePath();
    //填充内部
    ctx.fillStyle = "#e7f7fe";
    ctx.fill();
    // 描边路径
    ctx.stroke();
  },
  line: function (ctx, fromX, fromY, toX, toY, color) {
    color = color || "#ccc";

    ctx.setLineDash([]);
    ctx.beginPath();
    ctx.lineWidth = default_line_width;
    ctx.strokeStyle = color;
    //画直线
    ctx.moveTo(fromX, fromY);
    ctx.lineTo(toX, toY);

    //画箭头
    let headlen = 8 * devicePixelRatio; //自定义箭头线的长度
    let theta = 30; //自定义箭头线与直线的夹角，个人觉得45°刚刚好
    let arrowX1, arrowY1, arrowX2, arrowY2; //箭头线终点坐标
    // 计算各角度和对应的箭头终点坐标
    let angle = (Math.atan2(fromY - toY, fromX - toX) * 180) / Math.PI;
    let angle1 = ((angle + theta) * Math.PI) / 180;
    let angle2 = ((angle - theta) * Math.PI) / 180;
    let topX = headlen * Math.cos(angle1);
    let topY = headlen * Math.sin(angle1);
    let botX = headlen * Math.cos(angle2);
    let botY = headlen * Math.sin(angle2);
    arrowX1 = toX + topX;
    arrowY1 = toY + topY;
    arrowX2 = toX + botX;
    arrowY2 = toY + botY;
    //画上边箭头线
    ctx.moveTo(arrowX1, arrowY1);
    ctx.lineTo(toX, toY);

    //画下边箭头线
    ctx.lineTo(arrowX2, arrowY2);
    ctx.lineTo(arrowX1, arrowY1);
    ctx.fillStyle = color;
    ctx.fill();
    ctx.stroke();
  },
  drawLineBezier: function (ctx, p1, p2, color) {
    color = color || "#ccc";

    let cp1; // 控制点 1
    let cp2;// 控制点 2

    let py = 80;
    switch (p1.pos) {
      case 0:
        cp1 = {
          x: p1.x - py,
          y: p1.y
        };
        break;
      case 1:
        cp1 = {
          x: p1.x,
          y: p1.y - py
        };
        break;
      case 2:
        cp1 = {
          x: p1.x + py,
          y: p1.y
        };
        break;
      case 3:
        cp1 = {
          x: p1.x,
          y: p1.y + py
        };
        break;
    }
    if (typeof p2.pos != "undefined") {
      switch (p2.pos) {
        case 0:
          cp2 = {
            x: p2.x - py,
            y: p2.y
          };
          break;
        case 1:
          cp2 = {
            x: p2.x,
            y: p2.y - py
          };
          break;
        case 2:
          cp2 = {
            x: p2.x + py,
            y: p2.y
          };
          break;
        case 3:
          cp2 = {
            x: p2.x,
            y: p2.y + py
          };
          break;
      }
    } else {
      cp2 = {
        x: p2.x,
        y: p2.y
      };
    }

    // 设置线条样式
    ctx.strokeStyle = color;
    ctx.lineWidth = 2;

    ctx.beginPath();
    // 绘制贝塞尔曲线
    ctx.moveTo(p1.x, p1.y); // 画笔先落到曲线的起点位置
    ctx.bezierCurveTo(cp1.x, cp1.y, cp2.x, cp2.y, p2.x, p2.y);
    ctx.stroke();
    ctx.closePath();

    //画箭头
    ctx.beginPath();
    let headlen = 8 * devicePixelRatio; //自定义箭头线的长度
    let theta = 25; //自定义箭头线与直线的夹角，个人觉得45°刚刚好
    let arrowX1, arrowY1, arrowX2, arrowY2; //箭头线终点坐标
    // 计算各角度和对应的箭头终点坐标
    let angle = (Math.atan2(p1.y - p2.y, p1.x - p2.x) * 180) / Math.PI;
    if (typeof p2.pos != "undefined") {
      switch (p2.pos) {
        case 0:
          angle = 180;
          break;
        case 1:
          angle = 270;
          break;
        case 2:
          angle = 0;
          break;
        case 3:
          angle = 90;
          break;
      }
    }

    let angle1 = ((angle + theta) * Math.PI) / 180;
    let angle2 = ((angle - theta) * Math.PI) / 180;
    let topX = headlen * Math.cos(angle1);
    let topY = headlen * Math.sin(angle1);
    let botX = headlen * Math.cos(angle2);
    let botY = headlen * Math.sin(angle2);
    arrowX1 = p2.x + topX;
    arrowY1 = p2.y + topY;
    arrowX2 = p2.x + botX;
    arrowY2 = p2.y + botY;
    //画上边箭头线
    ctx.moveTo(arrowX1, arrowY1);
    ctx.lineTo(p2.x, p2.y);

    //画下边箭头线
    ctx.lineTo(arrowX2, arrowY2);
    ctx.lineTo(arrowX1, arrowY1);
    ctx.fillStyle = color;
    ctx.fill();
    ctx.stroke();
    ctx.closePath();
  },
  line_fz: function (ctx, fromX, fromY, toX, toY, color, linewidth) {
    color = color || "#fde3ba";
    ctx.setLineDash([]);
    ctx.beginPath();
    ctx.lineWidth = linewidth || default_line_width;
    ctx.strokeStyle = color;
    //画直线
    ctx.moveTo(fromX, fromY);
    ctx.lineTo(toX, toY);
    ctx.fillStyle = color;
    ctx.stroke();
  },
  group_sharp: function (ctx, fromX, fromY, toX, toY, isdash, label, imgurl, fontsize, space) {
    let radius = 10;
    let width = toX - fromX;
    let height = toY - fromY;
    // 开始绘制路径
    ctx.translate(fromX, fromY);
    ctx.beginPath();
    //绘制边框
    ctx.lineWidth = default_border_width;

    if (isdash) {
      ctx.strokeStyle = "#bbbbbb";
      ctx.setLineDash([4, 4]);
    } else {
      ctx.strokeStyle = "#2A82E4";
      ctx.setLineDash([]);
    }

    //从右下角顺时针绘制，弧度从0到1/2PI
    ctx.arc(width - radius, height - radius, radius, 0, Math.PI / 2);
    //矩形下边线
    ctx.lineTo(radius, height);
    //左下角圆弧，弧度从1/2PI到PI
    ctx.arc(radius, height - radius, radius, Math.PI / 2, Math.PI);
    //矩形左边线
    ctx.lineTo(0, radius);
    //左上角圆弧，弧度从PI到3/2PI
    ctx.arc(radius, radius, radius, Math.PI, (Math.PI * 3) / 2);
    //上边线
    ctx.lineTo(width - radius, 0);
    //右上角圆弧
    ctx.arc(width - radius, radius, radius, (Math.PI * 3) / 2, Math.PI * 2);
    //右边线
    ctx.lineTo(width, height - radius);

    //填充内部
    ctx.fillStyle = "rgba(200,200,200,0.1)";
    ctx.fill();
    ctx.closePath();
    ctx.translate(-fromX, -fromY);
    fontsize = fontsize || 16;
    space = space || 10;
    //文字
    ctx.fillStyle = "#666666"; //
    ctx.font = fontsize + 'px "微软雅黑"'; //设置字体
    ctx.textBaseline = "top"; //设置字体底线对齐绘制基线
    ctx.textAlign = "left"; //设置字体对齐的方式

    if (imgurl) {
      if (label) {
        ctx.fillText(label, fromX + fontsize + space + 4, fromY + space + fontsize / 10); //填充文字
      }

      if (imagecache[imgurl]) {
        ctx.drawImage(
          imagecache[imgurl],
          fromX + space,
          fromY + space,
          fontsize,
          fontsize
        );
      } else {
        var img = new Image();
        img.src = imgurl;
        img.onload = function () {
          imagecache[imgurl] = this;
          //图片加载完成后，执行此方法
          ctx.drawImage(
            this,
            fromX + space,
            fromY + space,
            fontsize,
            fontsize
          );
        };
      }
    } else {
      if (label) {
        ctx.fillText(label, fromX + space, fromY + space); //填充文字
      }
    }

    // 描边路径
    ctx.stroke();
  },
  clear: function (m_canvas) {
    let ctx = m_canvas.getContext("2d");
    ctx.clearRect(0, 0, m_canvas.width, m_canvas.height);
  }
};
