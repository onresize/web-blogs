/*
 * @Date: 2022-05-16 21:06:45
 * @LastEditors: zhangjian 183518918@qq.com
 * @LastEditTime: 2023-04-15 02:33:16
 * @FilePath: \myblog\source\zjtools\z\flow1\js\zdrawutil.js
 */

import { draw_type, sharputil } from "./zsharputil.js";

const devicePixelRatio = window.devicePixelRatio;
console.info(window.innerWidth);

class MyDrawUtil {
  constructor() {
    this.m_canvas = null;
    this.ctx = null;

    this.preview_canvas = null;
    this.preview_ctx = null;

    this.zoom = window.innerWidth / 1440;
    this.draw_type = -1;
    this.draw_data = {
      nodes: [],
      edges: [],
      groups: []
    };
    this.is_draw_line = false; //是否在连线
    this.sharp_type = draw_type;

    this.select_type = ""; //node group

    this.nodedetail = {
      type: "node",
      label: "普通节点"
    };

    this.line_obj = {
      fromX: 0,
      fromY: 0,
      toX: 0,
      toY: 0,
      source: "",
      sourceAnchor: -1,
      target: "",
      targetAnchor: -1
    };

    this.select_line_index = -1;//选中线的索引
    this.select_node_index = -1; //选中元素的索引
    this.move_index = -1; //正在移动的元素索引
    // 是否正在设置组
    this.is_group = false;
    this.is_group_begin = false;
    this.is_group_move = false;
    // 组选中的图形id
    this.group_ids = [];
    this.group_xy = {
      from_x: 0,
      from_y: 0,
      to_x: 0,
      to_y: 0
    };
    // 选中组的索引
    this.select_group_index = -1;

    // 历史
    this.undo_arr = [JSON.parse(JSON.stringify(this.draw_data))];
    this.redo_arr = [];

    this.cb_draw_data_change = null; //绘制图形数组变更
    this.cb_select_change = null; //选中的图形变更 (node/group,index)
    this.cb_show_change = null; //查看节点回调

    //辅助线的数量
    this.line_fz_num = 0;

    // 鼠标按下位置的类型 -1:未按下 10:图形 11:角标 20:分组 30:线 99:空白
    this.mdown_type = -1;
    this.mdown_xy = {
      x: 0,
      y: 0
    };
  }

  /**
   * @description: 
   * @param {*} m_canvas
   * @param {*} preview_canvas
   * @param {*} group_img
   * @return {*}
   */
  init (m_canvas, preview_canvas, group_img) {
    m_canvas.oncontextmenu = function () {
      return false;
    };

    this.group_img = group_img;
    this.m_canvas = m_canvas;
    this.ctx = this.m_canvas.getContext("2d");
    this.canvas_resize();
    this.add_event();
    window.addEventListener("resize", () => {
      this.canvas_resize();
    });

    if (preview_canvas) {
      this.preview_canvas = preview_canvas;
      this.preview_ctx = this.preview_canvas.getContext("2d");

      this.preview_canvas.width =
        this.preview_canvas.offsetWidth * devicePixelRatio;
      this.preview_canvas.height =
        this.preview_canvas.offsetHeight * devicePixelRatio;
      this.add_preview_event();
    }

    this.addStyle();

    // 删除之前添加的DOM 否则事件有问题
    let menu_div = document.querySelector(".zmenu");
    if (menu_div) {
      menu_div.remove();
    }

    this.redraw_all();
  }

  init_data (draw_data) {
    this.draw_data = draw_data;
    this.redraw_all();
  }

  // 绘制辅助线
  draw_line_fz (from_x, from_y, to_x, to_y) {
    let m_x = from_x + (to_x - from_x) / 2;
    let m_y = from_y + (to_y - from_y) / 2;
    let zoom = this.zoom;

    let nodes = this.draw_data.nodes;
    for (let i = 0; i < nodes.length; i++) {
      const edge = nodes[i];
      let { x, y, width, height } = edge;
      x = x * zoom;
      y = y * zoom;
      width = width * zoom;
      height = height * zoom;
      let from_x2 = x - width / 2;
      let from_y2 = y - height / 2;
      let to_x2 = x + width / 2;
      let to_y2 = y + height / 2;
      let m_x2 = x;
      let m_y2 = y;
      let x_arr = [m_x, from_x, to_x];
      let y_arr = [m_y, from_y, to_y];

      let x_arr2 = [m_x2, from_x2, to_x2];
      let y_arr2 = [m_y2, from_y2, to_y2];

      let min_y = Math.min(from_y, to_y, from_y2, to_y2);
      let max_y = Math.max(from_y, to_y, from_y2, to_y2);

      let min_x = Math.min(from_x, to_x, from_x2, to_x2);
      let max_x = Math.max(from_x, to_x, from_x2, to_x2);

      if (
        from_x === from_x2 &&
        from_y === from_y2 &&
        to_x === to_x2 &&
        to_y === to_y2
      ) {
        continue;
      } else {
        for (let j = 0; j < x_arr.length; j++) {
          const x1 = x_arr[j];
          for (let k = 0; k < x_arr2.length; k++) {
            const x2 = x_arr2[k];
            if (Math.abs(x1 - x2) < 1) {
              sharputil.line_fz(this.ctx, x1, min_y, x1, max_y);
              this.line_fz_num += 1;
            }
          }
        }

        for (let j = 0; j < y_arr.length; j++) {
          const y1 = y_arr[j];
          for (let k = 0; k < y_arr2.length; k++) {
            const y2 = y_arr2[k];
            if (Math.abs(y1 - y2) < 1) {
              sharputil.line_fz(this.ctx, min_x, y1, max_x, y1);
              this.line_fz_num += 1;
            }
          }
        }
      }
    }
  }

  addStyle () {
    let css = `
    .zmenu{
      background:#ffffff;
      border:1px solid #ddd;
      border-radius:4px;
      overflow:hidden;
      width:86px;
    }

    .zmenu_item{
      height:36px;
      width:100%;
      display:flex;
      align-items:center;
      justify-content: center;
      cursor:pointer;
      color:#666;
    }

    .zmenu_item:hover{
      background:#f0f0f0;
      color:#2A82E4;
    }
    `;
    let style = document.createElement("style");

    if (style.styleSheet) {
      style.styleSheet.cssText = css;
    } else {
      style.appendChild(document.createTextNode(css));
    }

    document.getElementsByTagName("head")[0].appendChild(style);
  }

  //显示右键菜单
  show_menu (x, y) {
    let menu_div = document.querySelector(".zmenu");
    if (menu_div) {
      menu_div.style.top = y + "px";
      menu_div.style.left = x + "px";
      menu_div.style.display = "block";
    } else {
      menu_div = document.createElement("div");
      menu_div.classList.add("zmenu");
      menu_div.style.position = "absolute";
      menu_div.style.top = y + "px";
      menu_div.style.left = x + "px";
      document.body.appendChild(menu_div);
      menu_div.oncontextmenu = function () {
        return false;
      };

      let item1 = document.createElement("div");
      item1.classList.add("zmenu_item");
      item1.classList.add("zmenu_item_edit");
      item1.innerHTML = "<span class='iconfont_flow icon-bianji'></span>&nbsp;编辑";
      menu_div.appendChild(item1);
      item1.onclick = () => {
        if (this.cb_show_change) {
          this.cb_show_change(true);
          this.hide_menu();
        }
      };

      let item2 = document.createElement("div");
      item2.classList.add("zmenu_item");
      item2.classList.add("zmenu_item_del");
      item2.innerHTML = "<span class='iconfont_flow icon-shanchu'></span>&nbsp;删除";
      menu_div.appendChild(item2);

      item2.onclick = () => {
        console.info("删除:" + this.select_type);
        if (this.select_type === "line") {
          this.line_del();
        } else if (this.select_type === "node") {
          this.sharp_del();
        } else if (this.select_type === "group") {
          this.group_del();
        }

        this.hide_menu();
        if (this.cb_show_change) {
          this.cb_show_change(false);
        }
      };
    }

    let zmenu_item_edit = document.querySelector(".zmenu_item_edit");
    if (this.select_type === "line") {
      zmenu_item_edit.style.display = "none";
    } else {
      zmenu_item_edit.style.display = "flex";
    }
  }

  //隐藏右键菜单
  hide_menu () {
    let menu_div = document.querySelector(".zmenu");
    if (menu_div) {
      menu_div.style.display = "none";
    }
  }

  //鼠标事件
  add_event () {
    let that = this;
    this.m_canvas.onmousedown = function (event) {
      let nodes = that.draw_data.nodes;
      let x = event.offsetX * devicePixelRatio;
      let y = event.offsetY * devicePixelRatio;


      that.mdown_xy.x = x;
      that.mdown_xy.y = y;

      that.hide_menu();
      //正在分组选择
      if (that.is_group) {
        that.m_canvas.style.cursor = "crosshair";
        //正在分组操作 框选中
        let x = event.offsetX * devicePixelRatio;
        let y = event.offsetY * devicePixelRatio;

        that.group_xy.from_x = x;
        that.group_xy.from_y = y;
        that.is_group_begin = true;
      } else {
        let c_index = that.get_corner_index_by_point(x, y);
        if (c_index[0] !== -1) {
          //选中的是角标
          let sharp = nodes[c_index[0]];
          that.is_draw_line = true;
          that.line_obj.fromX = x;
          that.line_obj.fromY = y;
          that.line_obj.source = sharp.id;
          that.line_obj.sourceAnchor = c_index[1];
          that.m_canvas.style.cursor = "default";
          that.redraw_all();
        } else {
          let line_index = that.get_line_index_by_point(x, y);
          if (line_index > -1) {
            //选中了线
            if (event.button === 2) {
              that.uncheck_all_node();
              that.select_type = "line";
              that.select_line_index = line_index;
              that.draw_data.edges[line_index].checked = true;
              that.redraw_all();
              that.show_menu(event.clientX, event.clientY);
            }
          } else {
            let node_index = that.get_sharp_index_by_point(x, y);
            if (node_index > -1) {
              that.uncheck_all_node();
              //选中的是图形
              let sharp_item = nodes[node_index];
              sharp_item.checked = true;
              that.select_node_index = node_index;
              that.select_type = "node";
              that.select_group_index = -1;
              if (that.cb_select_change) {
                that.cb_select_change(that.select_type, node_index);
              }
              //取消其他按钮的选中状态
              for (let i = 0; i < nodes.length; i++) {
                if (i !== node_index) {
                  let item2 = nodes[i];
                  item2.checked = false;
                  item2.status = 0;
                }
              }

              that.redraw_all();
              if (event.button === 0) {
                sharp_item.status = 2;
                that.move_index = node_index;
              } else if (event.button === 2) {
                sharp_item.status = 2;
                that.show_menu(event.clientX, event.clientY);
              }
            } else {
              let group_index = that.get_group_index_by_point(x, y);
              if (group_index > -1) {
                //选中分组
                that.uncheck_all_node();
                that.select_group_index = group_index;
                that.select_type = "group";
                that.select_node_index = -1;

                if (that.cb_select_change) {
                  that.cb_select_change(that.select_type, that.select_group_index);
                }

                if (event.button === 0) {
                  that.is_group_move = true;
                } else if (event.button === 2) {
                  that.show_menu(event.clientX, event.clientY);
                }
                that.redraw_all();
              } else {
                //选中的是空白
                that.uncheck_all_node();
                that.mdown_type = 99;
                //空白区域点击取消所有选中和悬浮状态
                that.select_group_index = -1;
                for (let i = 0; i < nodes.length; i++) {
                  let item2 = nodes[i];
                  item2.checked = false;
                  item2.status = 0;
                }
                that.redraw_all();
                if (that.select_node_index !== -1) {
                  that.select_node_index = -1;
                  this.select_group_index = -1;
                  that.select_type = "";
                  if (that.cb_select_change) {
                    that.cb_select_change(that.select_type, -1);
                  }
                }

                if (that.cb_show_change) {
                  that.cb_show_change(false);
                }
              }
            }
          }
        }
      }
    };
    this.m_canvas.onmousemove = function (event) {
      let nodes = that.draw_data.nodes;
      let zoom = that.zoom;
      let o_x = event.offsetX * devicePixelRatio;
      let o_y = event.offsetY * devicePixelRatio;

      let x_space = o_x - that.mdown_xy.x;
      let y_space = o_y - that.mdown_xy.y;
      let node_index = that.get_sharp_index_by_point(o_x, o_y);

      if (that.is_group && that.is_group_begin) {
        //正在分组框选中
        that.group_xy.to_x = o_x;
        that.group_xy.to_y = o_y;
        //进行画线
        that.redraw_all();
        sharputil.group_sharp(
          that.ctx,
          that.group_xy.from_x,
          that.group_xy.from_y,
          that.group_xy.to_x,
          that.group_xy.to_y,
          false,
          "",
          that.group_img
        );
      } else if (that.is_draw_line) {
        // 划线中
        that.line_obj.toX = o_x;
        that.line_obj.toY = o_y;
        //进行画线
        that.redraw_all();
        sharputil.line(
          that.ctx,
          that.line_obj.fromX,
          that.line_obj.fromY,
          o_x,
          o_y
        );
      } else if (that.draw_type > -1) {
        // 添加图形中
        that.redraw_all();
        let width;
        let height;
        if (that.draw_type === 0 || that.draw_type === 2) {
          height = 80 * devicePixelRatio;
          width = 80 * devicePixelRatio;
        } else {
          width = 160 * devicePixelRatio;
          height = 40 * devicePixelRatio;
        }
        sharputil.sharp_xv_kuang(
          that.ctx,
          o_x,
          o_y,
          width * zoom,
          height * zoom
        );

        let half_width = (width * zoom) / 2;
        let half_height = (height * zoom) / 2;
        that.draw_line_fz(
          o_x - half_width,
          o_y - half_height,
          o_x + half_width,
          o_y + half_height
        );
      } else if (that.move_index !== -1) {
        that.m_canvas.style.cursor = "move";
        // 拖动图形中
        let index = that.move_index;
        //获取到图形
        let sharp_item = nodes[index];
        //status 0默认状态 1鼠标悬浮 2鼠标按下 3鼠标抬起
        if (sharp_item.status === 0) {
          sharp_item.status = 1;
          //其他未选中的项恢复默认状态
          for (let i = 0; i < nodes.length; i++) {
            if (i !== index) {
              let item2 = nodes[i];
              if (!item2.checked) {
                item2.status = 0;
              }
            }
          }

          that.mdown_xy.x = o_x;
          that.mdown_xy.y = o_y;
        } else if (sharp_item.status === 2) {
          if (that.line_fz_num > 0) {
            if (Math.abs(x_space) >= 1) {
              sharp_item.x += x_space / zoom;
              that.line_fz_num = 0;
            }

            if (Math.abs(y_space) >= 1) {
              sharp_item.y += y_space / zoom;
              that.line_fz_num = 0;
            }
          } else {
            sharp_item.x += x_space / zoom;
            sharp_item.y += y_space / zoom;
          }
          that.mdown_xy.x = o_x;
          that.mdown_xy.y = o_y;
        }
        that.redraw_all();

        let { x, y, width, height } = sharp_item;
        let half_width = (width * zoom) / 2;
        let half_height = (height * zoom) / 2;
        that.draw_line_fz(
          x * zoom - half_width,
          y * zoom - half_height,
          x * zoom + half_width,
          y * zoom + half_height
        );
      } else if (that.select_group_index > -1) {
        // 拖动分组
        if (that.is_group_move) {
          let gids = [];
          let group = that.draw_data.groups[that.select_group_index];
          gids.push(group.id);

          let add_son_group = function (id) {
            let son_group = that.get_son_group_by_id(id);
            if (son_group.length > 0) {
              for (let i = 0; i < son_group.length; i++) {
                let g2 = son_group[i];
                gids.push(g2.id);
                add_son_group(g2.id);
              }
            }
          };
          add_son_group(group.id);

          let nodes = that.draw_data.nodes;
          for (let i = 0; i < nodes.length; i++) {
            const node = nodes[i];
            if (node.parent && gids.indexOf(node.parent) !== -1) {
              node.x += x_space / zoom;
              node.y += y_space / zoom;
            }
          }
          that.mdown_xy.x = o_x;
          that.mdown_xy.y = o_y;
          that.redraw_all();
        }
      } else {
        //悬浮到图形上
        for (let j = 0; j < nodes.length; j++) {
          let item3 = nodes[j];
          if (node_index === j) {
            item3.status = 1;
          } else {
            if (!item3.checked) {
              item3.status = 0;
            }
          }
        }
        that.redraw_all();
        if (that.is_group) {
          that.m_canvas.style.cursor = "crosshair";
        } else {
          that.m_canvas.style.cursor = "move";
        }

        if (that.mdown_type === 99) {
          //处理元素的移动逻辑
          let zoom = that.zoom;
          for (let i = 0; i < nodes.length; i++) {
            let node = nodes[i];
            node.x += x_space;
            node.y += y_space;
          }
        }
        that.mdown_xy.x = o_x;
        that.mdown_xy.y = o_y;

        that.redraw_all();
      }
    };

    this.m_canvas.onmouseup = function (event) {
      that.m_canvas.style.cursor = "move";
      that.line_fz_num = 0;
      let nodes = that.draw_data.nodes;
      that.mdown_type = -1;
      let zoom = that.zoom;
      that.move_index = -1;
      let x = event.offsetX * devicePixelRatio;
      let y = event.offsetY * devicePixelRatio;
      let node_index = that.get_sharp_index_by_point(x, y);
      let c_index = that.get_corner_index_by_point(x, y);

      if (that.is_group) {
        //正在分组框选中
        let draw_data = that.draw_data;
        let nodes = draw_data.nodes;
        for (let i = 0; i < nodes.length; i++) {
          const node = nodes[i];
          let nodex = node.x * zoom;
          let nodey = node.y * zoom;
          if (
            that.is_in_area(
              nodex,
              nodey,
              that.group_xy.from_x,
              that.group_xy.from_y,
              that.group_xy.to_x,
              that.group_xy.to_y
            )
          ) {
            that.group_ids.push(node.id);
            node.checked = true;
          }
        }

        that.is_group = false;
        that.is_group_begin = false;
        that.m_canvas.style.cursor = "move";
      } else if (that.is_draw_line) {
        if (c_index[0] !== -1) {
          let sharp = nodes[c_index[0]];
          let corner_arr = that.get_corner_arr_by_sharp(sharp);
          let corner = corner_arr[c_index[1]];
          //选中的是角标
          that.is_draw_line = true;
          that.line_obj.toX = corner.x;
          that.line_obj.toY = corner.y;
          that.line_obj.target = sharp.id;
          that.line_obj.targetAnchor = c_index[1];
          //结束的对象不能和开始的相同
          if (that.line_obj.target !== that.line_obj.source) {
            that.add_line(
              that.line_obj.source,
              that.line_obj.sourceAnchor,
              that.line_obj.target,
              that.line_obj.targetAnchor,
              that.line_obj.fromX,
              that.line_obj.fromY,
              that.line_obj.toX,
              that.line_obj.toY
            );
          }
        }
        that.is_draw_line = false;
        that.redraw_all();
      } else if (that.draw_type > -1) {
        // 添加图形
        let width = 0;
        let height;
        if (that.draw_type === 0 || that.draw_type === 2) {
          height = 80 * devicePixelRatio;
          width = 80 * devicePixelRatio;
        } else {
          width = 160 * devicePixelRatio;
          height = 40 * devicePixelRatio;
        }

        let label = that.nodedetail.label;
        let zoom = that.zoom;
        that.add_sharp(
          that.draw_type,
          x / zoom,
          y / zoom,
          width,
          height,
          label,
          that.nodedetail.type,
          that.nodedetail.pic,
          that.nodedetail.icon_bg
        );

        that.draw_type = -1;
      } else if (node_index > -1) {
        let sharp_item = nodes[node_index];
        if (sharp_item.status === 2) {
          sharp_item.status = 0;
        }
      } else if (that.select_group_index > -1) {
        that.is_group_move = false;
      }
      that.redraw_all();
      that.generate_url();
    };
  }

  add_preview_event () {
    let that = this;
    that.preview_begin = {
      start: false,
      x: 0,
      y: 0
    };
    this.preview_canvas.onmousedown = function (event) {
      let x = event.offsetX * devicePixelRatio;
      let y = event.offsetY * devicePixelRatio;
      that.preview_begin.x = x;
      that.preview_begin.y = y;
      that.preview_begin.start = true;
    };
    this.preview_canvas.onmousemove = function (event) {
      if (that.preview_begin.start) {
        let x = event.offsetX * devicePixelRatio;
        let y = event.offsetY * devicePixelRatio;
        let x_space = x - that.preview_begin.x;
        let y_space = y - that.preview_begin.y;
        //处理元素的移动逻辑
        let zoom = that.zoom;
        let nodes = that.draw_data.nodes;
        for (let i = 0; i < nodes.length; i++) {
          let node = nodes[i];
          node.x += x_space / zoom;
          node.y += y_space / zoom;
        }
        that.preview_begin.x = x;
        that.preview_begin.y = y;
        that.redraw_all();
      }
    };

    this.preview_canvas.onmouseup = function (event) {
      that.preview_begin.start = false;
      that.generate_url();
    };
  }

  // 判断点是否在区域内
  is_in_area (px, py, x1, y1, x2, y2) {
    if (x2 < x1) {
      let temp = x2;
      x2 = x1;
      x1 = temp;
    }

    if (y2 < y1) {
      let temp = y2;
      y2 = y1;
      y1 = temp;
    }

    return px > x1 && px < x2 && py > y1 && py < y2;
  }

  canvas_resize () {
    setTimeout(() => {
      this.m_canvas.width = this.m_canvas.offsetWidth * devicePixelRatio;
      this.m_canvas.height = this.m_canvas.offsetHeight * devicePixelRatio;
      this.redraw_all();
    });
  }

  set_draw_type (draw_type, detail) {
    this.draw_type = draw_type;
    if (detail) {
      this.nodedetail = detail;
    } else {
      this.nodedetail = {
        type: "node",
        label: "普通节点"
      };
    }
    if (this.select_group_index !== -1) {
      this.select_group_index = -1;
      if (this.select_type === "group") {
        this.select_type = "";
        if (this.cb_select_change) {
          this.cb_select_change(this.select_type, -1);
        }
      }
    }
  }

  get_time_unix () {
    return new Date().getTime();
  }

  //获取两点的距离
  get_dis_2_point (x1, y1, x2, y2) {
    let dx = Math.abs(x1 - x2);
    let dy = Math.abs(y1 - y2);
    return Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));
  }

  get_sharp_name (type) {
    switch (type) {
      case this.sharp_type.yuan:
        return "开始";
      case this.sharp_type.jv:
        return "一般";
      case this.sharp_type.ling:
        return "条件";
      case this.sharp_type.jv2:
        return "实体";
    }
  }

  add_sharp (sharp_type, x, y, width, height, label, nodetype, pic, icon_bg) {
    let sharp_obj = {
      id: this.get_time_unix(),
      type: nodetype, //node 图形
      sharp_type: sharp_type,
      x: x,
      y: y,
      width: width,
      height: height,
      label: label,
      pic: pic,
      icon_bg,
      status: 0, //0默认状态 1鼠标悬浮 2鼠标按下 3鼠标抬起
      checked: false, //是否选中
      attribute: {} //逻辑参数
    };
    this.draw_data.nodes.push(sharp_obj);
    this.draw_data_change();
  }

  add_line (source, sourceAnchor, target, targetAnchor, sourceX, sourceY, targetX, targetY) {
    let line_obj = {
      id: this.get_time_unix(),
      type: "line", // line 连线
      source: source,
      sourceAnchor: sourceAnchor,
      target: target,
      targetAnchor: targetAnchor,
      status: 0, //0默认状态 1鼠标悬浮 2鼠标按下 3鼠标抬起
      checked: false,//是否选中
      sourceX, sourceY, targetX, targetY
    };
    this.draw_data.edges.push(line_obj);
    this.draw_data_change();
  }

  //获取图形的四个角
  get_corner_arr_by_sharp (sharp_obj) {
    let x = sharp_obj.x,
      y = sharp_obj.y,
      width = sharp_obj.width,
      height = sharp_obj.height;
    let width_half = width / 2;
    let height_half = height / 2;
    let corner_size = 12;
    let corner_arr = [];
    corner_arr.push({
      sharp_type: this.sharp_type.corner,
      x: x - width_half,
      y: y,
      width: corner_size,
      height: corner_size
    });
    corner_arr.push({
      sharp_type: this.sharp_type.corner,
      x: x,
      y: y - height_half,
      width: corner_size,
      height: corner_size
    });
    corner_arr.push({
      sharp_type: this.sharp_type.corner,
      x: x + width_half,
      y: y,
      width: corner_size,
      height: corner_size
    });
    corner_arr.push({
      sharp_type: this.sharp_type.corner,
      x: x,
      y: y + height_half,
      width: corner_size,
      height: corner_size
    });

    return corner_arr;
  }

  //获取点是不是角标
  get_corner_index_by_point (x, y) {
    let zoom = this.zoom;
    for (let i = 0; i < this.draw_data.nodes.length; i++) {
      let item = this.draw_data.nodes[i];
      let corner_arr = this.get_corner_arr_by_sharp(item);
      for (let j = 0; j < corner_arr.length; j++) {
        let item2 = corner_arr[j];
        let left = (item2.x - item2.width / 2) * zoom;
        let right = (item2.x + item2.width / 2) * zoom;
        let top = (item2.y - item2.height / 2) * zoom;
        let bottom = (item2.y + item2.height / 2) * zoom;
        if (x > left && x < right && y > top && y < bottom) {
          return [i, j];
        }
      }
    }
    return [-1, -1];
  }


  /**
   * 根据给定点获取控制点
   * @param x
   * @param y
   * @param pos
   * @returns {{x, y}|{x: *, y: *}}
   */
  getKzPointByPoint (x, y, pos) {
    const py = 80;
    const posMap = {
      0: { x: -py, y: 0 },
      1: { x: 0, y: -py },
      2: { x: py, y: 0 },
      3: { x: 0, y: py },
    };
    if (typeof pos != "undefined") {
      const _pos = posMap[pos];
      return {
        x: x + _pos.x,
        y: y + _pos.y,
      };
    } else {
      return { x: x, y: y };
    }
  }

  isMouseOnBezierCurve (curve, mouseX, mouseY) {
    const { x1, y1, x2, y2, cx1, cy1, cx2, cy2 } = curve;
    const tValues = new Array(100).fill(0).map((_, i) => i / 100);
    const xValues = tValues.map(curveX);
    const yValues = tValues.map(curveY);
    const buffer = 5;
    return tValues.some((_, i) => Math.sqrt(Math.pow(mouseX - xValues[i], 2) + Math.pow(mouseY - yValues[i], 2)) < buffer);

    function curveX (t) {
      return Math.pow(1 - t, 3) * x1 + 3 * Math.pow(1 - t, 2) * t * cx1 + 3 * (1 - t) * Math.pow(t, 2) * cx2 + Math.pow(t, 3) * x2;
    }

    function curveY (t) {
      return Math.pow(1 - t, 3) * y1 + 3 * Math.pow(1 - t, 2) * t * cy1 + 3 * (1 - t) * Math.pow(t, 2) * cy2 + Math.pow(t, 3) * y2;
    }
  }

  //获取点是不是线
  get_line_index_by_point (x, y) {
    let edges = this.draw_data.edges;
    for (let i = 0; i < edges.length; i++) {
      let item = edges[i];
      let { sourceAnchor, targetAnchor, sourceX, sourceY, targetX, targetY } = item;
      let sourceKz = this.getKzPointByPoint(sourceX, sourceY, sourceAnchor);
      let targetKz = this.getKzPointByPoint(targetX, targetY, targetAnchor);
      let x1 = sourceX;
      let y1 = sourceY;
      let x2 = targetX;
      let y2 = targetY;
      let cx1 = sourceKz.x;
      let cy1 = sourceKz.y;
      let cx2 = targetKz.x;
      let cy2 = targetKz.y;
      let result = this.isMouseOnBezierCurve({ x1, y1, x2, y2, cx1, cy1, cx2, cy2 }, x, y);
      if (result) {
        return i;
      }
    }
    return -1;
  }

  //获取点是不是图形
  get_sharp_index_by_point (x, y) {
    let zoom = this.zoom;
    let corner_width = 6;
    for (let i = 0; i < this.draw_data.nodes.length; i++) {
      let item = this.draw_data.nodes[i];
      //图形
      let left = (item.x - item.width / 2) * zoom;
      let right = (item.x + item.width / 2) * zoom;
      let top = (item.y - item.height / 2) * zoom;
      let bottom = (item.y + item.height / 2) * zoom;
      if (
        x > left - corner_width &&
        x < right + corner_width &&
        y > top - corner_width &&
        y < bottom + corner_width
      ) {
        return i;
      }
    }
    return -1;
  }

  //获取点是不是分组
  get_group_index_by_point (x, y) {
    let zoom = this.zoom;
    for (let i = 0; i < this.draw_data.groups.length; i++) {
      let group = this.draw_data.groups[i];
      //图形
      let left = group.min_x * zoom;
      let right = group.max_x * zoom;
      let top = group.min_y * zoom;
      let bottom = group.max_y * zoom;
      if (x > left && x < right && y > top && y < bottom) {
        return i;
      }
    }
    return -1;
  }

  //获取角标对象
  get_corner_by_id (id, index) {
    let nodes = this.draw_data.nodes;
    for (let i = 0; i < nodes.length; i++) {
      let item = nodes[i];
      let corner_arr = this.get_corner_arr_by_sharp(item);
      if (item.id === id) {
        return corner_arr[index];
      }
    }
    return null;
  }

  //取消所有的选中节点
  uncheck_all_node () {
    let nodes = this.draw_data.nodes;
    let ischange = false;
    for (let i = 0; i < nodes.length; i++) {
      let item2 = nodes[i];
      if (item2.checked) {
        item2.checked = false;
        item2.status = 0;
        ischange = true;
      }
    }

    let edges = this.draw_data.edges;
    for (let i = 0; i < edges.length; i++) {
      let item2 = edges[i];
      if (item2.checked) {
        item2.checked = false;
        ischange = true;
      }
    }
    if (ischange) {
      this.redraw_all();
    }
  }

  //重新绘制
  redraw_all () {
    let m_canvas = this.m_canvas;
    let ctx = m_canvas.getContext("2d");
    let zoom = this.zoom;
    ctx.clearRect(0, 0, m_canvas.width, m_canvas.height);

    let linex = 0;
    while (linex < m_canvas.width - 20 * zoom) {
      linex += 20 * zoom;
      sharputil.line_fz(
        this.ctx,
        linex,
        0,
        linex,
        m_canvas.height,
        "#dddddd",
        1
      );
    }

    let liney = 0;
    while (liney < m_canvas.height - 20 * zoom) {
      liney += 20 * zoom;
      sharputil.line_fz(
        this.ctx,
        0,
        liney,
        m_canvas.width,
        liney,
        "#dddddd",
        1
      );
    }

    let nodes = this.draw_data.nodes;
    for (let i = 0; i < nodes.length; i++) {
      let item = nodes[i];
      //画图形
      let sharp_type = item.sharp_type;
      let x = item.x * zoom,
        y = item.y * zoom,
        width = item.width * zoom,
        height = item.height * zoom,
        label = item.label;
      let fontsize = 18 * zoom;

      let border_color = "#2A82E4";

      switch (sharp_type) {
        case this.sharp_type.yuan:
          if (item.checked) {
            border_color = "#2A82E4";
          } else {
            border_color = "#fde3ba";
          }
          sharputil.sharp_yuan(this.ctx, x, y, width, height, label, fontsize, border_color);
          break;
        case this.sharp_type.jv:
          if (item.checked) {
            border_color = "#2A82E4";
          } else {
            border_color = "#ffffff";
          }
          sharputil.sharp_jv(
            this.ctx,
            x,
            y,
            width,
            height,
            label,
            fontsize,
            border_color,
            "#ffffff",
            item.pic,
            item.icon_bg
          );
          break;
        case this.sharp_type.ling:
          if (item.checked) {
            border_color = "#2A82E4";
          } else {
            border_color = "#7ce3dc";
          }
          sharputil.sharp_ling(this.ctx, x, y, width, height, label, fontsize, border_color);
          break;
        case this.sharp_type.jv2:
          if (item.checked) {
            border_color = "#2A82E4";
          } else {
            border_color = "#d1b0f3";
          }
          sharputil.sharp_jv2(this.ctx, x, y, width, height, label, fontsize, border_color);
          break;
      }

      if (item.checked || item.status > 0 || this.is_draw_line) {
        let corner_arr = this.get_corner_arr_by_sharp(item);
        for (let j = 0; j < corner_arr.length; j++) {
          let corner_item = corner_arr[j];
          sharputil.sharp_corner(
            this.ctx,
            corner_item.x * zoom,
            corner_item.y * zoom
          );
        }
      }
    }

    //绘制线
    let edges = this.draw_data.edges;
    for (let i = 0; i < edges.length; i++) {
      let item = edges[i];
      let source = item.source,
        sourceAnchor = item.sourceAnchor,
        target = item.target,
        targetAnchor = item.targetAnchor;
      let from_corder = this.get_corner_by_id(source, sourceAnchor);
      let to_corder = this.get_corner_by_id(target, targetAnchor);
      item.sourceX = from_corder.x * zoom;
      item.sourceY = from_corder.y * zoom;
      item.targetX = to_corder.x * zoom;
      item.targetY = to_corder.y * zoom;
      let line_color = "#ccc";
      if (item.checked) {
        line_color = "#2A82E4";
      }
      //画线
      sharputil.drawLineBezier(
        this.ctx,
        {
          x: from_corder.x * zoom,
          y: from_corder.y * zoom,
          pos: sourceAnchor
        },
        {
          x: to_corder.x * zoom,
          y: to_corder.y * zoom,
          pos: targetAnchor
        },
        line_color
      );
    }

    let groups = this.draw_data.groups;

    for (let i = 0; i < groups.length; i++) {
      const group = groups[i];
      let gid = group.id;
      let min_x = -1;
      let min_y = -1;
      let max_x = -1;
      let max_y = -1;
      for (let j = 0; j < nodes.length; j++) {
        const node = nodes[j];
        if (node.parent && node.parent === gid) {
          let width_half = node.width / 2;
          let height_half = node.height / 2;
          if (min_x === -1) {
            min_x = node.x - width_half;
            min_y = node.y - height_half;
            max_x = node.x + width_half;
            max_y = node.y + height_half;
          } else {
            if (node.x - width_half < min_x) {
              min_x = node.x - width_half;
            }
            if (node.y - height_half < min_y) {
              min_y = node.y - height_half;
            }
            if (node.x + width_half > max_x) {
              max_x = node.x + width_half;
            }
            if (node.y + height_half > max_y) {
              max_y = node.y + height_half;
            }
          }
        }
      }

      let space = 10 * devicePixelRatio;
      min_x -= space;
      min_y -= space * 2;
      max_x += space;
      max_y += space;

      let fontheight = 16 * devicePixelRatio;

      min_y -= fontheight;

      if (group.parent) {
        const group2 = this.get_group_by_id(group.parent);
        if (group2) {
          group2.min_x = Math.min(min_x, group2.min_x - space);
          group2.min_y = Math.min(min_y, group2.min_y - fontheight - space * 2);
          group2.max_x = Math.max(max_x, group2.max_x + space);
          group2.max_y = Math.max(max_y, group2.max_y + space);
        }
      }
      group.min_x = min_x;
      group.min_y = min_y;
      group.max_x = max_x;
      group.max_y = max_y;
      for (let j = 0; j < groups.length; j++) {
        const group2 = groups[j];
        if (group2.parent && group2.parent === group.id) {
          group.min_x = Math.min(group.min_x, group2.min_x - space);
          group.min_y = Math.min(group.min_y, group2.min_y - fontheight - space * 2);
          group.max_x = Math.max(group.max_x, group2.max_x + space);
          group.max_y = Math.max(group.max_y, group2.max_y + space);
        }
      }

      sharputil.group_sharp(
        this.ctx,
        group.min_x * zoom,
        group.min_y * zoom,
        group.max_x * zoom,
        group.max_y * zoom,
        this.select_group_index !== i,
        group.label,
        this.group_img,
        fontheight * zoom,
        space * zoom
      );
    }
  }

  // 清除没有使用的分组
  clean_group () {
    let groups = this.draw_data.groups;
    let nodes = this.draw_data.nodes;
    for (let i = groups.length - 1; i >= 0; i--) {
      const group = groups[i];
      let count = 0;
      for (let j = 0; j < nodes.length; j++) {
        const node = nodes[j];
        if (node.parent && node.parent === group.id) {
          count += 1;
        }
      }
      if (count === 0) {
        groups.splice(i, 1);
        this.draw_data_change();
      }
    }
  }

  draw_data_change () {
    if (this.cb_draw_data_change) {
      this.cb_draw_data_change(this.draw_data);
    }
    if (this.redo_arr.length > 0) {
      for (let i = 0; i < this.redo_arr.length; i++) {
        const item = this.redo_arr[i];
        this.undo_arr.push(JSON.parse(JSON.stringify(item)));
      }
      this.redo_arr = [];
    }
    this.undo_arr.push(JSON.parse(JSON.stringify(this.draw_data)));
  }

  generate_url () {
    if (this.preview_ctx) {
      let img = new Image();
      img.src = this.m_canvas.toDataURL();
      let that = this;
      img.onload = function () {
        //图片加载完成后，执行此方法
        that.preview_ctx.clearRect(
          0,
          0,
          that.preview_canvas.width,
          that.preview_canvas.height
        );
        that.preview_ctx.drawImage(
          this,
          0,
          0,
          that.preview_canvas.width,
          that.preview_canvas.height
        );
      };
    }
  }

  // 生成新的对象
  objnew (obj) {
    return JSON.parse(JSON.stringify(obj));
  }

  undo () {
    if (this.undo_arr.length > 1) {
      let item = this.undo_arr.splice(this.undo_arr.length - 1, 1);
      this.redo_arr.push(item[0]);

      this.draw_data = this.objnew(this.undo_arr[this.undo_arr.length - 1]);
      this.redraw_all();
      if (this.cb_draw_data_change) {
        this.cb_draw_data_change(this.draw_data);
      }
    }
  }

  redo () {
    if (this.redo_arr.length > 0) {
      let item = this.redo_arr.splice(this.redo_arr.length - 1, 1);
      this.undo_arr.push(item[0]);

      this.draw_data = this.objnew(this.undo_arr[this.undo_arr.length - 1]);
      this.redraw_all();
      if (this.cb_draw_data_change) {
        this.cb_draw_data_change(this.draw_data);
      }
    }
  }

  // 放大
  zoom_big () {
    if (this.zoom < 1.4) {
      this.zoom += 0.2;
    }
    this.redraw_all();
  }

  // 缩小
  zoom_small () {
    if (this.zoom > 0.6) {
      this.zoom -= 0.2;
    }
    this.redraw_all();
  }

  // 恢复默认
  zoom_default () {
    this.zoom = 1;
    this.redraw_all();
  }

  // 放大缩小适配窗口
  zoom_fit () {
    let draw_data = this.draw_data;
    let nodes = draw_data.nodes;
    let min_x = 0;
    let max_x = 0;
    let min_y = 0;
    let max_y = 0;

    let min_space = 100 * devicePixelRatio;

    let c_width = this.m_canvas.width;
    let c_height = this.m_canvas.height;

    for (let i = 0; i < nodes.length; i++) {
      const node = nodes[i];
      if (i === 0) {
        min_x = node.x;
        max_x = node.x;
        min_y = node.y;
        max_y = node.y;
      } else {
        if (node.x < min_x) {
          min_x = node.x;
        }
        if (node.x > max_x) {
          max_x = node.x;
        }

        if (node.y < min_y) {
          min_y = node.y;
        }
        if (node.y > max_y) {
          max_y = node.y;
        }
      }
    }

    let s_width = max_x - min_x;
    let s_height = max_y - min_y;

    let zoom_x = c_width / (s_width + min_space * 2);
    let zoom_y = c_height / (s_height + min_space * 2);

    this.zoom = zoom_x < zoom_y ? zoom_x : zoom_y;
    for (let i = 0; i < nodes.length; i++) {
      const node = nodes[i];
      node.x -= min_x;
      node.y -= min_y;

      node.x += 100 * devicePixelRatio;
      node.y += 100 * devicePixelRatio;
    }
    this.redraw_all();
  }

  line_del () {
    console.info("删除线:", this.select_line_index);
    if (this.select_line_index !== -1) {
      let edges = this.draw_data.edges;
      edges.splice(this.select_line_index, 1);
      this.clean_group();
      this.draw_data_change();
      this.redraw_all();
      this.select_line_index = -1;
    }
  }

  sharp_del () {
    if (this.select_node_index !== -1) {
      let nodes = this.draw_data.nodes;
      let id = nodes[this.select_node_index].id;
      nodes.splice(this.select_node_index, 1);

      let edges = this.draw_data.edges;
      for (let i = edges.length - 1; i >= 0; i--) {
        const line = edges[i];
        if (line.source === id || line.target === id) {
          edges.splice(i, 1);
        }
      }

      this.clean_group();
      this.draw_data_change();
      this.redraw_all();
      this.select_node_index = -1;
    }
  }

  group_select () {
    this.is_group = true;
    this.m_canvas.style.cursor = "crosshair";
    this.group_ids = [];
    this.uncheck_all_node();
  }

  // 获取子分组
  get_son_group_by_id (id) {
    let son_group = [];
    let groups = this.draw_data.groups;
    for (let i = 0; i < groups.length; i++) {
      const group = groups[i];
      if (group.parent && group.parent === id) {
        son_group.push(group);
      }
    }
    return son_group;
  }

  get_group_by_id (id) {
    let groups = this.draw_data.groups;
    for (let i = 0; i < groups.length; i++) {
      const group = groups[i];
      if (group.id === id) {
        return group;
      }
    }

    return null;
  }

  // 添加分组
  group_add () {
    let draw_data = this.draw_data;
    if (this.group_ids.length > 0) {
      let id = this.get_time_unix();
      let group_new = {
        id: id,
        label: "分组",
        level: 0
      };
      draw_data.groups.push(group_new);

      // 选中的Node
      let select_nodes_has_parent = [];
      let select_nodes_no_parent = [];

      let nodes = draw_data.nodes;
      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];
        if (this.group_ids.indexOf(node.id) > -1) {
          if (node.parent) {
            select_nodes_has_parent.push(node);
          } else {
            select_nodes_no_parent.push(node);
          }
        }

        node.checked = false;
      }

      if (
        select_nodes_no_parent.length > 0 &&
        select_nodes_has_parent.length === 0
      ) {
        // 所有的节点都没有父元素
        for (let i = 0; i < select_nodes_no_parent.length; i++) {
          const node = select_nodes_no_parent[i];
          node.parent = id;
        }
      } else if (
        select_nodes_no_parent.length === 0 &&
        select_nodes_has_parent.length > 0
      ) {
        //所有的节点都有父元素
        let pids = [];
        for (let i = 0; i < select_nodes_has_parent.length; i++) {
          const node = select_nodes_has_parent[i];
          if (pids.indexOf(node.parent) === -1) {
            pids.push(node.parent);
          }
        }

        //所有选择的元素在同一个分组中 如果在不同的分组中则不处理
        if (pids.length === 1) {
          group_new.parent = pids[0];
          let pnode = this.get_group_by_id(pids[0]);
          group_new.level = pnode.level - 1;
          for (let i = 0; i < select_nodes_has_parent.length; i++) {
            const node = select_nodes_has_parent[i];
            node.parent = group_new.id;
          }
        }
      } else {
        //一部分有父元素 一部分没有
        //所有顶层组的ID数组
        let all_top_group_ids = [];
        for (let i = 0; i < select_nodes_has_parent.length; i++) {
          let node = select_nodes_has_parent[i];
          let pgroup = this.get_group_by_id(node.parent);
          if (pgroup) {
            while (pgroup.parent) {
              pgroup = this.get_group_by_id(pgroup.parent);
            }

            if (all_top_group_ids.indexOf(pgroup.id) === -1) {
              all_top_group_ids.push(pgroup.id);
            }
          }
        }

        for (let i = 0; i < all_top_group_ids.length; i++) {
          let gid = all_top_group_ids[i];
          let pgroup = this.get_group_by_id(gid);
          if (pgroup) {
            pgroup.parent = group_new.id;
            pgroup.level -= 1;
          }
        }

        for (let i = 0; i < select_nodes_no_parent.length; i++) {
          const node = select_nodes_no_parent[i];
          node.parent = id;
        }
      }

      let groups = this.draw_data.groups;
      groups.sort((a, b) => {
        return a.level - b.level;
      });

      this.clean_group();
      this.redraw_all();

      this.draw_data_change();
      this.group_ids = [];
    }
  }

  group_del () {
    let draw_data = this.draw_data;
    if (this.select_group_index > -1) {
      let gid = this.draw_data.groups[this.select_group_index].id;

      let nodes = draw_data.nodes;
      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];
        if (node.parent === gid) {
          node.parent = "";
        }
      }
      this.clean_group();
      this.redraw_all();

      this.draw_data_change();

      if (this.select_group_index !== -1) {
        this.select_group_index = -1;
        if (this.select_type === "group") {
          this.select_type = "";
          if (this.cb_select_change) {
            this.cb_select_change(this.select_type, -1);
          }
        }
      }
    }
  }
}

export default MyDrawUtil;
