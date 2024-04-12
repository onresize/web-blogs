/* jshint esversion: 6 */
import MyDrawUtil from "./zdrawutil.js";

new window.Vue({
  el: ".flow_outer",
  data: {
    type_list: [
      { type: "start", label: "开始节点", pic: "./imgs/start.svg",icon_bg:"#4478ff" },
      { type: "end", label: "结束节点", pic: "./imgs/end.svg" ,icon_bg: "#ff5733"}
    ],
    my_draw_util: null,
    draw_data: { nodes: [], edges: [], groups: [] }, //已经绘制的图形列表
    node_index: -1, //选中节点索引
    group_index: -1, //选中分组的索引
    select_type: "", //node group
    show_detail: false
  },
  mounted: function () {
    this.init_draw();
  },
  computed: {
    select_sharp: function () {
      let nodes = this.draw_data.nodes;
      if (this.node_index < nodes.length) {
        return nodes[this.node_index];
      } else {
        return {};
      }
    },
    select_group: function () {
      const groups = this.draw_data.groups;
      if (this.group_index < groups.length) {
        return groups[this.group_index];
      } else {
        return {};
      }
    }
  },
  methods: {
    init_draw: function () {
      let my_draw_util = new MyDrawUtil();
      my_draw_util.init(
          this.$refs.m_canvas,
          this.$refs.preview_canvas,
          "./imgs/group.svg"
      );
      this.my_draw_util = my_draw_util;
      my_draw_util.cb_draw_data_change = (draw_data) => {
        this.draw_data = draw_data;
        console.info("数据变更", draw_data);
      };

      my_draw_util.cb_select_change = (select_type, node_index) => {
        this.select_type = select_type;
        if (select_type === "node") {
          this.node_index = node_index;
        } else if (select_type === "group") {
          this.group_index = node_index;
        } else {
          this.node_index = -1;
          this.group_index = -1;
        }
      };

      my_draw_util.cb_show_change = (show) => {
        this.show_detail = show;
      };
    },
    get_sharp_name(type) {
      return this.my_draw_util.get_sharp_name(type);
    },
    //左侧图形点击
    sharp_click: function (sharp_type, detail) {
      this.my_draw_util.set_draw_type(sharp_type, detail);
    },
    undo_action: function () {
      this.my_draw_util.undo();
    },
    redo_action: function () {
      this.my_draw_util.redo();
    },
    delete_sharp: function () {
      this.my_draw_util.sharp_del();
    },
    zoom_big_action() {
      this.my_draw_util.zoom_big();
    },
    zoom_small_action() {
      this.my_draw_util.zoom_small();
    },
    zoom_default_action() {
      this.my_draw_util.zoom_default();
    },
    zoom_fit_action() {
      this.my_draw_util.zoom_fit();
    },
    group_select_action() {
      this.my_draw_util.group_select();
    },
    group_add_action() {
      this.my_draw_util.group_add();
    },
    group_del_action() {
      this.my_draw_util.group_del();
    }
  }
});
