(function(){
  var header = $('#header');
  var example = $('#example');

  header.on('click', 'a', function(){
    var _this = $(this);
    var _rel = this.rel; 
    var _rev = this.rev; 
    
    if (_rel === 'browserVer') {
      _this.addClass('n').siblings().removeClass('n');

      example.removeClass(function(i, c){
        var classlist = c.split(' ');
        var removes = [];
        for (var i = 0, l = classlist.length; i < l; i++) {
          if (classlist[i].indexOf('browser_') === 0) {
            removes.push(classlist[i]);
          };
        }
        return removes.join(' ');
      });
      
      if (typeof _rev === 'string' && _rev.length) {
        example.addClass('browser_' + _rev);
      };
      
      example.trigger('refreshWookmark');
      
      return false;

    } else if (_rel === 'delStyle') {
      _this.addClass('n').siblings().removeClass('n');

      example.removeClass(function(i, c){
        var classlist = c.split(' ');
        var removes = [];
        for (var i = 0, l = classlist.length; i < l; i++) {
          if (classlist[i].indexOf('delete_') === 0) {
            removes.push(classlist[i]);
          };
        }
        return removes.join(' ');
      });
      
      if (typeof _rev === 'string' && _rev.length) {
        example.addClass('delete_' + _rev);
      };
      
      example.trigger('refreshWookmark');
      
      return false;
    };
    
  });
  
  example.find(".col").wookmark({ 
    container: example,
    offset: 10,
    itemWidth: 200,
    flexibleWidth: '50%',
    autoResize: true,
    fillEmptySpace: true
  }); 
})();