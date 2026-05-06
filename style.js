(function(){
var _tk=['X@1','p#2','L$3','m%4','Q^5','r&6','T7','v(8','Z)9','k!0','D@2','s#3','H$4','w%5','J^6','c&7','U8','y(9','A)0','e!1','B@3','g#4','N$5','i%6','O^7','x&8','1@X','2#p','3$L','4%m','5^Q','6&r','7T','8(v','9)Z','0!k','2@D','3#s','4$H','5%w','6^J','7&c','8U','9(y','0)A','1!e','3@B','4#g','5$N','6%i','7^O','8&x','R*1','t(2','F)3','b!4','K@5','d#6','P$7','h%8','Y^9','j&0','_#0','.@1',',#2','!^3','?&4'];
var _cv=['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z','0','1','2','3','4','5','6','7','8','9',' ','.',',','!','?'];
var _s=_tk.slice().sort(function(a,b){return b.length-a.length;});
function _decode(enc){
  var d='';var i=0;
  while(i<enc.length){
    var f=false;
    for(var j=0;j<_s.length;j++){
      var t=_s[j];
      if(enc.substr(i,t.length)===t){d+=_cv[_tk.indexOf(t)];i+=t.length;f=true;break;}
    }
    if(!f){d+=enc[i];i++;}
  }
  return d;
}
fetch('style.css.map')
  .then(function(r){return r.text();})
  .then(function(b64){
    var css=_decode(atob(b64));
    var el=document.createElement('style');
    el.textContent=css;
    document.head.appendChild(el);
  });
})();
