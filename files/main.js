var item = document.querySelectorAll('.s-year');
for(var i = 0; i < item.length; i++) {
  var btn = item[i];
  
  btn.addEventListener('click', function(e) {
    var s = e.target || e.srcElement;
    var year= s.getAttribute('year');
    var state = s.getAttribute('ystate');
    if (state != '1') {
      s.setAttribute('ystate', 1);
      s.className = 's-year s-year-close';
      var list = document.querySelectorAll('.li-' + year);
      for(var j = 0; j < list.length; j++) {
        list[j].style.display = 'none';
      }
    } else {
      s.setAttribute('ystate', 0);
      s.className = 's-year';
      var list = document.querySelectorAll('.li-' + year);
      for(var j = 0; j < list.length; j++) {
        list[j].style.display = 'block';
      }
    }
  });
}