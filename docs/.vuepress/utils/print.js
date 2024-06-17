// (function(root, factory){
//   if(typeof define === 'function' && define.amd){
//    define([], factory);
//   }else{
//    root.Printer = factory(root);
//   }
//  }(this, function(root){
//   var Printer = {};
//   Printer.printer = {"version": "0.0.1"};
//   var init_options = {
//    "speed" : 50,  //文字的速度
//    "selector" : 'canvas',  //要打印到的标签的ID
//    "startIndex" : 0,  //从第几个字符开始打印
//    "endIndex" : 0,  //打印到第几个字符结束
//    "hasCur" : true,  //是否有光标
//    "curId" : 'cur',  //光标的ID
//    "curStr" : '_',  //光标字符
//    "curStyle" : 'font-weight: bold;', //光标的样式（CSS样式）
//    "curSpeed" : 100,  //光标的速度（ms）
//    "lnStr": ""
//   };

//   var str = "", options = init_options;
//   var flwCurTimer, dom, curObj, reStr='', curSwitch,index=0;

//   Printer.init = function(arg_str, arg_options){
//    str = arg_str;
//    for( var option in arg_options ){
//     options[option] = arg_options[option];
//    }
//    dom = document.getElementById(options.selector);
//    index = options.startIndex;
//    options.endIndex = options.endIndex == 0 ? str.length : options.endIndex
//    options.hasCur && flwCur();
//    return this;
//   }

//   Printer.print = function(){ //打印函数
//    for(var i=0; i<str.length; i++) {
//     (function(index){
//      setTimeout(function(){
//       if (str.charAt(index) === '\n'){
//        reStr += '<br>' + options.lnStr;
//       } else {
//        reStr += str.charAt(index);
//       }
//       dom.innerHTML= options.lnStr + reStr
//      }, options.speed * (index + 1))
//     })(i);
//    }

//    setTimeout(function(){
//     if(options.hasCur){
//      var element = document.createElement("span");
//      element.id = options.curId
//      dom.appendChild(element);

//      curObj = document.getElementById(options.curId);
//      clearTimeout(flwCurTimer);
//      setInterval(chCur, options.curSpeed);
//     }
//    }, options.speed * str.length)
//   }

//   function flwCur(){ //跟随光标
//    dom.innerHTML += '<span id="'+options.curId+'" style="'+options.curStyle+'">'+options.curStr+'</span>';
//    flwCurTimer = setTimeout(flwCur, 1.5 * options.speed);
//   }

//   function chCur(){ //闪烁光标
//    curObj.innerHTML = curSwitch ? options.curStr : "";
//    curSwitch = !curSwitch
//   }

//   return Printer;
//  }));

// var str = 'itclanCoder\n';
// Printer.init(str, {
//     selector: 'main-title',
//     lnStr: 'root@itclanCoder ~/ # '
// }).print();

const autoWriting = (index = 0) => {
  let str = 'Hi there 👋, Welcome to my blog!'
  const dom = document.getElementById('main-title')
  let ret = ''
  if (index < str.length) {
    ret += str[index]
    if (!dom?.innerHTML) return
    dom.innerHTML += ret
    setTimeout(autoWriting, 80, ++index)
  }
}
export default autoWriting
