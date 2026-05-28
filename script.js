
(function(){
  var entered=false;
  function enter(){
    if(entered)return;entered=true;
    document.removeEventListener('click',enter);
    document.removeEventListener('touchend',enter);
    document.getElementById('intro').classList.add('exit');
    setTimeout(function(){document.body.classList.remove('intro-lock');},700);
  }
  document.addEventListener('click',enter);
  document.addEventListener('touchend',enter,{passive:true});
  document.body.classList.add('intro-lock');

  var st=document.getElementById('stars');
  for(var i=0;i<120;i++){
    var s=document.createElement('div');s.className='s';
    var lo=(Math.random()*.25+.05).toFixed(2),hi=(Math.random()*.6+.3).toFixed(2);
    s.style.cssText='width:'+(Math.random()*2+.5)+'px;height:'+(Math.random()*2+.5)+'px;top:'+(Math.random()*100)+'%;left:'+(Math.random()*100)+'%;--lo:'+lo+';--hi:'+hi+';--d:'+(2+Math.random()*5).toFixed(1)+'s;--dl:'+(-Math.random()*6).toFixed(1)+'s';
    st.appendChild(s);
  }

  var cv=document.getElementById('intro-beam'),ctx=cv.getContext('2d'),W,H;
  function sz(){W=cv.width=window.innerWidth;H=cv.height=window.innerHeight;}sz();
  window.addEventListener('resize',sz,{passive:true});
  var A=28,DS=Array.from({length:80},function(){return{t:Math.random(),s:(Math.random()-.5)*2,sz:Math.random()*1.3+.25,sp:.0003+Math.random()*.0006,op:Math.random()*.5+.1,dr:(Math.random()-.5)*.0004};});
  function cl(v,a,b){return Math.min(b,Math.max(a,v));}
  function dr(){
    ctx.clearRect(0,0,W,H);
    var r=A*Math.PI/180,dx=Math.sin(r),dy=Math.cos(r),bx=-dy,by=dx,ox=W*.18,oy=0,hw=cl(W*.13,60,220),OV=Math.sqrt(W*W+H*H);
    var sx=ox-dx*OV,sy=oy-dy*OV,ex=ox+dx*OV,ey=oy+dy*OV,sp=hw*1.8;
    var g=ctx.createLinearGradient(ox+bx*sp,oy+by*sp,ox-bx*sp,oy-by*sp);
    g.addColorStop(0,'rgba(0,0,0,0)');g.addColorStop(.15,'rgba(213,197,245,.06)');g.addColorStop(.38,'rgba(220,208,255,.22)');g.addColorStop(.5,'rgba(240,234,255,.38)');g.addColorStop(.62,'rgba(220,208,255,.22)');g.addColorStop(.85,'rgba(213,197,245,.06)');g.addColorStop(1,'rgba(0,0,0,0)');
    ctx.save();ctx.beginPath();ctx.moveTo(sx+bx*sp,sy+by*sp);ctx.lineTo(sx-bx*sp,sy-by*sp);ctx.lineTo(ex-bx*sp,ey-by*sp);ctx.lineTo(ex+bx*sp,ey+by*sp);ctx.closePath();ctx.fillStyle=g;ctx.fill();ctx.restore();
    ctx.save();ctx.beginPath();ctx.moveTo(sx,sy);ctx.lineTo(ex,ey);ctx.strokeStyle='rgba(255,248,255,.18)';ctx.lineWidth=1.2;ctx.shadowColor='rgba(213,197,245,.9)';ctx.shadowBlur=18;ctx.stroke();ctx.restore();
    var tl=OV*2;
    DS.forEach(function(p){
      p.t=(p.t+p.sp)%1;p.s+=p.dr;if(Math.abs(p.s)>.45)p.dr*=-1;
      var px=sx+dx*tl*p.t+bx*hw*p.s,py=sy+dy*tl*p.t+by*hw*p.s;
      ctx.save();ctx.beginPath();ctx.arc(px,py,p.sz,0,6.2832);ctx.fillStyle='rgba(213,197,245,'+p.op+')';ctx.shadowColor='rgba(213,197,245,.8)';ctx.shadowBlur=6;ctx.fill();ctx.restore();
    });
    var fg=ctx.createRadialGradient(ox,oy,0,ox,oy,100);
    fg.addColorStop(0,'rgba(255,248,255,.50)');fg.addColorStop(.2,'rgba(220,205,255,.18)');fg.addColorStop(.6,'rgba(184,158,230,.05)');fg.addColorStop(1,'rgba(0,0,0,0)');
    ctx.beginPath();ctx.arc(ox,oy,100,0,6.2832);ctx.fillStyle=fg;ctx.fill();
    requestAnimationFrame(dr);
  }
  dr();
})();

(function(){
  var dot=document.getElementById('cur'),hasMouse=false,touchActive=false,t=null,HALF=4;
  document.addEventListener('touchstart',function(){touchActive=true;clearTimeout(t);t=setTimeout(function(){touchActive=false;},800);},{passive:true});
  document.addEventListener('mousemove',function(e){
    if(!hasMouse&&!touchActive){hasMouse=true;document.body.classList.add('has-mouse');}
    if(!hasMouse)return;
    dot.style.transform='translate('+(e.clientX-HALF)+'px,'+(e.clientY-HALF)+'px)';
  },{passive:true});
  document.addEventListener('mouseover',function(e){
    if(!hasMouse)return;
    var el=e.target,cl=false;
    try{cl=el.matches('a,button,.proj-card,.tech-card,.stat-box,.info-card,.svc-card,.port-tab,.btn,.ham,.contact-item')||!!(el.closest&&el.closest('a,button,.proj-card,.btn'));}catch(err){}
    document.body.classList.toggle('cbtn',cl);
  },{passive:true});
})();

(function(){
  var el=document.getElementById('hero-tag-el');
  var words=['Web Developer','Discord Bot Dev','Student Freelancer','Lua Scripter','Go Developer','Creative Coder'];
  var wi=0,ci=0,del=false;
  function tick(){
    var w=words[wi];
    if(!del){ci++;el.innerHTML=w.slice(0,ci)+'<span class="tw-cur"></span>';if(ci>=w.length){del=true;setTimeout(tick,1900);return;}}
    else{ci--;el.innerHTML=w.slice(0,ci)+'<span class="tw-cur"></span>';if(ci<=0){del=false;wi=(wi+1)%words.length;setTimeout(tick,320);return;}}
    setTimeout(tick,del?44:78);
  }
  setTimeout(tick,4400);
})();

var PROJ=[
  {tag:'Web Dashboard · Firebase',title:'Quantum Dashboard',desc:'Real-time analytics dashboard for the Quantum subscription service. Tracks active keys, HWID logs, revenue per tier, user activity, and admin actions via Firebase Realtime DB.',chips:['Firebase','JavaScript','HTML/CSS','Chart.js','GitHub Pages'],grad:'linear-gradient(135deg,rgba(55,110,200,.55) 0%,rgba(14,38,100,.9) 55%,rgba(4,3,14,1) 100%)',acc:'rgba(75,140,255,.28)',icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.3"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></svg>'},
  {tag:'Analytics · Firebase',title:'Analytics Panel',desc:'Standalone analytics panel tracking key activations, churn rate, HWID collision detection, tier distribution charts, and daily revenue. Static web app on GitHub Pages.',chips:['Firebase','Vanilla JS','HTML5/CSS3','GitHub Pages'],grad:'linear-gradient(135deg,rgba(160,50,200,.5) 0%,rgba(70,10,100,.9) 55%,rgba(4,3,14,1) 100%)',acc:'rgba(190,80,255,.26)',icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.3"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>'},
  {tag:'Web Panel · Backend',title:'Key System Panel',desc:'Full key lifecycle management: generate, bind HWID, set expiry, apply tiered cooldowns, revoke and reset. Synced with Discord slash commands and Firebase.',chips:['Firebase','Discord.js','Node.js','HTML/CSS','Lua Loader'],grad:'linear-gradient(135deg,rgba(70,190,110,.48) 0%,rgba(18,72,34,.9) 55%,rgba(4,3,14,1) 100%)',acc:'rgba(80,210,120,.26)',icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.3"><path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4"/></svg>'},
  {tag:'Web Dashboard · UI',title:'Garcia Script UI',desc:'Custom web UI panel for Garcia Script, a Roblox exploit toolkit. Dark glassmorphism design with toggle switches, sliders, and category tabs. Fully responsive.',chips:['HTML5','CSS3','JavaScript','Glassmorphism','Lua'],grad:'linear-gradient(135deg,rgba(200,140,40,.48) 0%,rgba(90,50,10,.9) 55%,rgba(4,3,14,1) 100%)',acc:'rgba(220,160,50,.26)',icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.3"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 3v18"/></svg>'},
  {tag:'Discord Bot · Firebase',title:'WhitelistBot Pro',desc:'Feature-rich Discord whitelist bot with Monthly and Lifetime subscription tiers, HWID verification, brute-force detection with auto-timeout, and auto-delivery Lua loader.',chips:['Discord.js v14','Firebase','Node.js','Slash Commands','HWID'],grad:'linear-gradient(135deg,rgba(200,80,80,.48) 0%,rgba(90,18,18,.9) 55%,rgba(4,3,14,1) 100%)',acc:'rgba(220,100,80,.26)',icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.3"><path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057c.003.012.01.024.023.031a19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03z"/></svg>'},
  {tag:'Discord Bot · Vouching',title:'Vouchlist Dashboard',desc:'Discord bot and web dashboard combo for managing customer vouches. Supports adding, verifying, and displaying vouches with a public leaderboard. Anti-spam built in.',chips:['Discord.js v14','Firebase','Node.js','HTML/CSS','GitHub Pages'],grad:'linear-gradient(135deg,rgba(80,140,200,.48) 0%,rgba(18,46,90,.9) 55%,rgba(4,3,14,1) 100%)',acc:'rgba(100,160,230,.26)',icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.3"><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>'}
];

var LANG=[
  {name:'HTML5',svg:'<svg viewBox="0 0 24 24" fill="#e34c26"><path d="M1.5 0h21l-1.91 21.563L11.977 24l-8.565-2.438L1.5 0zm7.031 9.75l-.232-2.718 10.059.003.23-2.622L5.412 4.41l.698 8.01h9.126l-.326 3.426-2.91.804-2.955-.81-.188-2.11H6.248l.33 4.171L12 19.351l5.379-1.443.744-8.157H8.531z"/></svg>'},
  {name:'CSS3',svg:'<svg viewBox="0 0 24 24" fill="#2965f1"><path d="M1.5 0h21l-1.91 21.563L11.977 24l-8.565-2.438L1.5 0zm17.09 4.413L5.41 4.41l.213 2.622 10.125.002-.255 2.716h-6.64l.24 2.573h6.182l-.366 3.523-2.91.804-2.956-.81-.188-2.11h-2.61l.29 3.855L12 19.288l5.373-1.53L18.59 4.414z"/></svg>'},
  {name:'JavaScript',svg:'<svg viewBox="0 0 24 24"><rect width="24" height="24" fill="#f7df1e" rx="2"/><path fill="#000" d="M6.5 19.5l1.875-1.133c.361.641.689 1.184 1.477 1.184.754 0 1.23-.295 1.23-1.443V11.5h2.305v6.636c0 2.378-1.394 3.461-3.428 3.461-1.836 0-2.904-1.05-3.459-2.097zm8.5-.16l1.875-1.086c.492.805 1.132 1.394 2.262 1.394 1.05 0 1.722-.526 1.722-1.25 0-.869-.689-1.181-1.845-1.688l-.639-.272c-1.836-.781-3.054-1.762-3.054-3.834 0-1.903 1.444-3.356 3.7-3.356 1.607 0 2.756.558 3.585 2.02l-1.967 1.262c-.44-.787-.918-1.095-1.652-1.095-.755 0-1.233.476-1.233 1.095 0 .766.493 1.07 1.618 1.546l.64.272c2.16.924 3.377 1.87 3.377 3.985 0 2.283-1.793 3.547-4.2 3.547-2.345 0-3.86-1.165-4.19-2.54z"/></svg>'},
  {name:'TypeScript',svg:'<svg viewBox="0 0 24 24"><rect width="24" height="24" fill="#3178c6" rx="2"/><path fill="#fff" d="M13.5 15.5v1.9c.4.2.9.3 1.4.3 1.8 0 2.9-1 2.9-2.5 0-1.1-.6-1.9-1.9-2.5l-.6-.3c-.7-.3-1-.6-1-1.1 0-.4.3-.7.9-.7.5 0 .9.2 1.3.5l1-1.4c-.5-.5-1.3-.8-2.2-.8-1.6 0-2.7.9-2.7 2.4 0 1.2.7 2 1.9 2.5l.6.3c.7.3 1 .6 1 1.1 0 .5-.4.8-1 .8-.7 0-1.2-.3-1.6-.8zm-4.5-4.5H11V9.5H7V19h1.5v-4H11v-1.5H8.5V11z"/></svg>'},
  {name:'Lua',svg:'<svg viewBox="0 0 24 24"><rect width="24" height="24" rx="4" fill="#000080"/><circle cx="8" cy="12" r="3" fill="#fff"/><circle cx="16" cy="6" r="2.2" fill="#fff"/><circle cx="19" cy="12" r="1.5" fill="#fff"/></svg>'},
  {name:'Python',svg:'<svg viewBox="0 0 24 24"><path fill="#3776ab" d="M11.914 0C5.82 0 6.2 2.656 6.2 2.656l.007 2.752h5.814v.826H3.887S0 5.789 0 11.969c0 6.18 3.403 5.963 3.403 5.963h2.031v-2.867s-.109-3.402 3.35-3.402h5.769s3.24.052 3.24-3.131V3.19S18.28 0 11.914 0zm-3.21 1.851a1.047 1.047 0 1 1 0 2.094 1.047 1.047 0 0 1 0-2.094z"/><path fill="#ffd43b" d="M12.086 24c6.094 0 5.714-2.656 5.714-2.656l-.007-2.752h-5.814v-.826h8.134S24 18.211 24 12.031c0-6.18-3.403-5.963-3.403-5.963h-2.031v2.867s.109 3.402-3.35 3.402H9.447s-3.24-.052-3.24 3.131v5.342S5.72 24 12.086 24zm3.21-1.851a1.047 1.047 0 1 1 0-2.094 1.047 1.047 0 0 1 0 2.094z"/></svg>'},
  {name:'Node.js',svg:'<svg viewBox="0 0 24 24" fill="#339933"><path d="M11.998 24a1.4 1.4 0 0 1-.697-.188L8.2 21.845c-.523-.293-.267-.397-.095-.457.664-.231.799-.284 1.508-.687.074-.042.172-.025.248.018l2.393 1.42c.088.048.212.048.292 0l9.317-5.376c.09-.052.146-.156.146-.263V7.5c0-.11-.056-.214-.15-.266l-9.31-5.37a.298.298 0 0 0-.292 0L3.147 7.236c-.096.054-.154.16-.154.266v10.75c0 .107.058.21.148.258l2.552 1.473c1.387.694 2.237-.124 2.237-.95V8.374c0-.152.12-.27.273-.27h1.19c.15 0 .27.118.27.27v10.659c0 1.862-1.014 2.931-2.782 2.931-.543 0-.97 0-2.165-.59L2.017 19.71A1.401 1.401 0 0 1 1.32 18.5V7.5c0-.505.27-.977.697-1.231L11.33.193a1.46 1.46 0 0 1 1.4 0l9.31 5.376a1.424 1.424 0 0 1 .699 1.231v10.75a1.42 1.42 0 0 1-.699 1.232l-9.31 5.376a1.41 1.41 0 0 1-.732.192z"/></svg>'},
  {name:'Go',svg:'<svg viewBox="0 0 24 24"><rect width="24" height="24" rx="3" fill="#00acd7"/><path fill="#fff" d="M3 9.5h1v5H3zm3 0h3c.3 0 .5.2.5.5v1c0 .3-.2.5-.5.5H7v1h2c.3 0 .5.2.5.5v1c0 .3-.2.5-.5.5H6v-5zm7 0h1c.3 0 .5.2.5.5l1.5 3 1.5-3c0-.3.2-.5.5-.5h1c.3 0 .5.2.5.5v4c0 .3-.2.5-.5.5h-1c-.3 0-.5-.2-.5-.5v-2l-1 2-.5.5-.5-.5-1-2v2c0 .3-.2.5-.5.5h-1c-.3 0-.5-.2-.5-.5v-4c0-.3.2-.5.5-.5z"/></svg>'},
  {name:'SQL',svg:'<svg viewBox="0 0 24 24"><rect width="24" height="24" rx="3" fill="#336791"/><path fill="#fff" d="M12 4C8 4 5 5.5 5 7.5v9C5 18.5 8 20 12 20s7-1.5 7-3.5v-9C19 5.5 16 4 12 4zm5 12.5c0 .8-2 2-5 2s-5-1.2-5-2V15c1.2.8 3 1.2 5 1.2s3.8-.4 5-1.2v1.5zm0-4c0 .8-2 2-5 2s-5-1.2-5-2V11c1.2.8 3 1.2 5 1.2s3.8-.4 5-1.2v1.5zm-5-3.5C9 9 7 8 7 7.5S9 6 12 6s5 .8 5 1.5S15 9 12 9z"/></svg>'},
  {name:'Rust',svg:'<svg viewBox="0 0 24 24" fill="#ce422b"><path d="M11.845 20.42l-8.808-5.03V8.61l8.808 5.03v6.78zm.507-7.787L3.544 7.604l8.808-5.03 8.808 5.03-8.808 5.029zm8.3 2.757l-8.808 5.03V13.64l8.808-5.03v6.78z"/></svg>'}
];

var APPS=[
  {name:'Firebase',svg:'<svg viewBox="0 0 24 24"><path fill="#ffca28" d="M3.89 15.672L6.255.461A.542.542 0 0 1 7.27.288l2.543 4.771zm16.794 3.692l-2.25-14a.54.54 0 0 0-.919-.295L3.316 19.365l7.856 4.427a1.621 1.621 0 0 0 1.588 0zM14.3 7.147l-1.82-3.482a.542.542 0 0 0-.96 0L3.53 17.984z"/></svg>'},
  {name:'Discord.js',svg:'<svg viewBox="0 0 24 24" fill="#5865f2"><path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057c.003.012.01.024.023.031a19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03z"/></svg>'},
  {name:'Git',svg:'<svg viewBox="0 0 24 24" fill="#f05032"><path d="M23.546 10.93L13.067.452a1.55 1.55 0 0 0-2.188 0L8.708 2.627l2.76 2.76a1.838 1.838 0 0 1 2.327 2.341l2.658 2.66a1.838 1.838 0 0 1 1.9 3.039 1.837 1.837 0 0 1-2.637-2.564L13.08 8.291v6.732a1.838 1.838 0 0 1 .48 3.314 1.837 1.837 0 0 1-2.191-2.967 1.833 1.833 0 0 1 .611-.394V8.197a1.833 1.833 0 0 1-.611-.394 1.838 1.838 0 0 1 .049-2.637L8.708 2.627.45 10.885a1.55 1.55 0 0 0 0 2.189l10.48 10.477a1.55 1.55 0 0 0 2.187 0l10.43-10.43a1.55 1.55 0 0 0 0-2.19"/></svg>'},
  {name:'GitHub',svg:'<svg viewBox="0 0 24 24" fill="#c8c0e0"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>'},
  {name:'VS Code',svg:'<svg viewBox="0 0 24 24" fill="#007acc"><path d="M23.15 2.587L18.21.21a1.494 1.494 0 0 0-1.705.29l-9.46 8.63-4.12-3.128a.999.999 0 0 0-1.276.057L.327 7.261A1 1 0 0 0 .326 8.74L3.899 12 .326 15.26a1 1 0 0 0 .001 1.479L1.65 17.94a.999.999 0 0 0 1.276.057l4.12-3.128 9.46 8.63a1.492 1.492 0 0 0 1.704.29l4.942-2.377A1.5 1.5 0 0 0 24 19.06V4.94a1.5 1.5 0 0 0-.85-1.353zm-5.146 14.861L10.826 12l7.178-5.448v10.896z"/></svg>'},
  {name:'REST API',svg:'<svg viewBox="0 0 24 24" fill="none" stroke="#6db33f" stroke-width="1.8"><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>'},
  {name:'Dcoder',svg:'<svg viewBox="0 0 24 24"><rect width="24" height="24" rx="4" fill="#1a1a2e"/><path fill="#6c63ff" d="M5 7h4c2.8 0 5 2.2 5 5s-2.2 5-5 5H5V7zm2 2v6h2c1.7 0 3-1.3 3-3s-1.3-3-3-3H7zm7 1l2-2 5 4-5 4-2-2 3-2-3-2z"/></svg>'},
  {name:'Pydroid',svg:'<svg viewBox="0 0 24 24"><rect width="24" height="24" rx="4" fill="#1e3a5f"/><path fill="#ffd43b" d="M12 3.5C9 3.5 7 4.8 7 6.5v1.5h5v.5H6C4.3 8.5 3 9.8 3 11.5v2C3 15.2 4.3 16.5 6 16.5h1v-1.5c0-1.7 1.3-3 3-3h4c1.7 0 3-1.3 3-3V6.5C17 4.8 15 3.5 12 3.5zm-1.5 2a.75.75 0 1 1 0 1.5.75.75 0 0 1 0-1.5z"/><path fill="#4584b6" d="M12 20.5c3 0 5-1.3 5-3v-1.5h-5v-.5h6c1.7 0 3-1.3 3-3v-2c0-1.7-1.3-3-3-3h-1v1.5c0 1.7-1.3 3-3 3H10c-1.7 0-3 1.3-3 3v2c0 1.7 2 3 5 3zm1.5-2a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5z"/></svg>'}
];

(function(){
  var g=document.getElementById('proj-grid');
  PROJ.forEach(function(p,i){
    var c=document.createElement('div');
    c.className='proj-card';
    c.style.transitionDelay=(i*55)+'ms';
    c.innerHTML=
      '<div class="proj-thumb">'+
        '<div class="proj-thumb-bg" style="background:'+p.grad+'"></div>'+
        '<div style="position:absolute;inset:0;background:radial-gradient(ellipse at 30% 40%,'+p.acc+',transparent 62%)"></div>'+
        '<div class="proj-thumb-icon">'+p.icon+'</div>'+
        '<div class="proj-ov"><div class="proj-expand"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4"><polyline points="15 3 21 3 21 9"/><polyline points="9 21 3 21 3 15"/><line x1="21" y1="3" x2="14" y2="10"/><line x1="3" y1="21" x2="10" y2="14"/></svg></div></div>'+
      '</div>'+
      '<div class="proj-body">'+
        '<div class="proj-tag">'+p.tag+'</div>'+
        '<div class="proj-title">'+p.title+'</div>'+
        '<div class="proj-desc">'+p.desc.substring(0,88)+'&#8230;</div>'+
      '</div>';
    c.addEventListener('click',function(){openLb(i);});
    g.appendChild(c);
  });
})();

(function(){
  var gl=document.getElementById('tech-grid-langs');
  LANG.forEach(function(t,i){
    var c=document.createElement('div');c.className='tech-card';
    c.style.transitionDelay=(i*38)+'ms';
    c.innerHTML='<div class="tech-icon">'+t.svg+'</div><div class="tech-name">'+t.name+'</div>';
    gl.appendChild(c);
  });
  var ga=document.getElementById('tech-grid-apps');
  APPS.forEach(function(t,i){
    var c=document.createElement('div');c.className='tech-card';
    c.style.transitionDelay=(i*38)+'ms';
    c.innerHTML='<div class="tech-icon">'+t.svg+'</div><div class="tech-name">'+t.name+'</div>';
    ga.appendChild(c);
  });
})();

function animateProjCards(){
  var cards=document.querySelectorAll('.proj-card');
  cards.forEach(function(c){c.classList.remove('visible');});
  var panel=document.getElementById('tab-projects');
  void panel.offsetWidth;
  requestAnimationFrame(function(){
    requestAnimationFrame(function(){
      cards.forEach(function(c){c.classList.add('visible');});
    });
  });
}

function animateTechCards(){
  var cards=document.querySelectorAll('.tech-card');
  cards.forEach(function(c){c.classList.remove('visible');});
  var panel=document.getElementById('tab-techstack');
  void panel.offsetWidth;
  requestAnimationFrame(function(){
    requestAnimationFrame(function(){
      cards.forEach(function(c){c.classList.add('visible');});
    });
  });
}

(function(){
  var tabs=document.querySelectorAll('.port-tab');
  var ink=document.getElementById('tab-ink');
  var panels={projects:document.getElementById('tab-projects'),techstack:document.getElementById('tab-techstack')};
  function posInk(btn){ink.style.width=btn.offsetWidth+'px';ink.style.transform='translateX('+btn.offsetLeft+'px)';}
  window.addEventListener('load',function(){
    var a=document.querySelector('.port-tab.active');
    if(a){ink.style.transition='none';posInk(a);requestAnimationFrame(function(){ink.style.transition='';});}
  });
  setTimeout(function(){var a=document.querySelector('.port-tab.active');if(a)posInk(a);},100);
  tabs.forEach(function(tab){
    tab.addEventListener('click',function(){
      tabs.forEach(function(t){t.classList.remove('active');t.setAttribute('aria-selected','false');});
      tab.classList.add('active');tab.setAttribute('aria-selected','true');posInk(tab);
      var id=tab.dataset.tab;
      Object.keys(panels).forEach(function(k){panels[k].classList.toggle('hidden',k!==id);});
      if(id==='techstack')animateTechCards();
      if(id==='projects')animateProjCards();
    });
  });
  animateProjCards();
})();

var lbIdx=0;
function openLb(i){lbIdx=i;renderLb();document.getElementById('lb').classList.add('on');document.body.style.overflow='hidden';}
function closeLb(){document.getElementById('lb').classList.remove('on');document.body.style.overflow='';}
function renderLb(){
  var p=PROJ[lbIdx];
  document.getElementById('lb-title').textContent=p.title;
  document.getElementById('lb-desc').textContent=p.desc;
  var tc=document.getElementById('lb-chips');tc.innerHTML='';
  p.chips.forEach(function(c){var s=document.createElement('span');s.className='lb-chip';s.textContent=c;tc.appendChild(s);});
}
document.getElementById('lb-x').addEventListener('click',closeLb);
document.getElementById('lb').addEventListener('click',function(e){if(e.target===this)closeLb();});
document.getElementById('lb-prev').addEventListener('click',function(){lbIdx=(lbIdx-1+PROJ.length)%PROJ.length;renderLb();});
document.getElementById('lb-next').addEventListener('click',function(){lbIdx=(lbIdx+1)%PROJ.length;renderLb();});
document.addEventListener('keydown',function(e){
  if(!document.getElementById('lb').classList.contains('on'))return;
  if(e.key==='Escape')closeLb();
  if(e.key==='ArrowLeft'){lbIdx=(lbIdx-1+PROJ.length)%PROJ.length;renderLb();}
  if(e.key==='ArrowRight'){lbIdx=(lbIdx+1)%PROJ.length;renderLb();}
});

document.getElementById('form-send-btn').addEventListener('click',function(e){
  e.preventDefault();
  var n=document.getElementById('f-name').value.trim();
  var em=document.getElementById('f-email').value.trim();
  var s=document.getElementById('f-subject').value.trim();
  var m=document.getElementById('f-msg').value.trim();
  if(!n||!em||!m)return;
  var ml='mailto:kiel.svu@gmail.com?subject='+encodeURIComponent(s||'Portfolio Inquiry')+'&body='+encodeURIComponent('Name: '+n+'\nEmail: '+em+'\n\n'+m);
  window.location.href=ml;
});

var mnav=document.getElementById('mnav'),mobov=document.getElementById('mobov'),hambtn=document.getElementById('hambtn'),menuOpen=false;
function openMenu(){menuOpen=true;mnav.classList.add('open');mobov.classList.add('open');document.body.style.overflow='hidden';hambtn.setAttribute('aria-expanded','true');hambtn.setAttribute('aria-label','Close menu');}
function closeMenu(){menuOpen=false;mnav.classList.remove('open');mobov.classList.remove('open');document.body.style.overflow='';hambtn.setAttribute('aria-expanded','false');hambtn.setAttribute('aria-label','Open menu');}
hambtn.addEventListener('click',function(){menuOpen?closeMenu():openMenu();});
hambtn.addEventListener('keydown',function(e){if(e.key==='Enter'||e.key===' '){e.preventDefault();menuOpen?closeMenu():openMenu();}});
mobov.addEventListener('click',function(e){if(e.target===this)closeMenu();});
document.querySelectorAll('.mlink').forEach(function(a){a.addEventListener('click',closeMenu);});

(function(){
  var btn=document.getElementById('nav-hire-btn');if(!btn)return;
  var mq=window.matchMedia('(min-width:900px)');
  function chk(){btn.style.display=mq.matches?'inline-flex':'none';}
  mq.addEventListener('change',chk);chk();
})();

var lastSY=0;
var dMQ=window.matchMedia('(min-width:600px)');
window.addEventListener('scroll',function(){
  var s=window.scrollY;
  var h=document.documentElement.scrollHeight-window.innerHeight;
  document.getElementById('prog').style.width=(h>0?Math.round(s/h*100):0)+'%';
  if(dMQ.matches){
    if(s<=80)mnav.classList.remove('nav-hidden');
    else if(s>lastSY+4)mnav.classList.add('nav-hidden');
    else if(s<lastSY-4)mnav.classList.remove('nav-hidden');
  } else {
    mnav.classList.remove('nav-hidden');
  }
  mnav.classList.toggle('scrolled',s>40);
  document.getElementById('stop').classList.toggle('show',s>300);
  var ids=['home','about','service','portfolio','timeline','testimonials','contact'],active='home';
  for(var k=0;k<ids.length;k++){var el=document.getElementById(ids[k]);if(el&&el.getBoundingClientRect().top<=140)active=ids[k];}
  document.querySelectorAll('.nav-links a').forEach(function(a){a.classList.toggle('active',a.getAttribute('href')==='#'+active);});
  lastSY=s;
},{passive:true});

var ro=new IntersectionObserver(function(en){
  en.forEach(function(e){if(e.isIntersecting){e.target.classList.add('v');ro.unobserve(e.target);}});
},{threshold:.04,rootMargin:'0px 0px -28px 0px'});
document.querySelectorAll('.r').forEach(function(el){ro.observe(el);});

var co=new IntersectionObserver(function(en){
  en.forEach(function(e){
    if(!e.isIntersecting)return;
    var el=e.target,target=+el.dataset.target,t0=Date.now(),dur=1100;
    (function tick(){var p=Math.min((Date.now()-t0)/dur,1),ease=1-Math.pow(1-p,3);var suf=el.dataset.suffix||'';el.textContent=Math.round(ease*target)+suf;if(p<1)requestAnimationFrame(tick);})();
    co.unobserve(el);
  });
},{threshold:.5});
document.querySelectorAll('[data-target]').forEach(function(el){co.observe(el);});

(function(){
  var c=document.getElementById('grain-c'),ctx=c.getContext('2d'),W,H,frame=0;
  function resize(){W=c.width=window.innerWidth;H=c.height=window.innerHeight;}
  resize();
  window.addEventListener('resize',resize,{passive:true});
  function drawGrain(){
    frame++;
    if(frame%3!==0){requestAnimationFrame(drawGrain);return;}
    var img=ctx.createImageData(W,H),d=img.data;
    for(var i=0;i<d.length;i+=4){var v=Math.random()*255|0;d[i]=v;d[i+1]=v;d[i+2]=v;d[i+3]=Math.random()*28|0;}
    ctx.putImageData(img,0,0);
    requestAnimationFrame(drawGrain);
  }
  drawGrain();
})();

var toastTimer;
function showToast(msg){
  var t=document.getElementById('toast'),m=document.getElementById('toast-msg');
  m.textContent=msg||'Copied!';
  clearTimeout(toastTimer);
  t.classList.add('show');
  toastTimer=setTimeout(function(){t.classList.remove('show');},2200);
}

document.querySelectorAll('.contact-item').forEach(function(item){
  item.style.cursor='pointer';
  item.addEventListener('click',function(){
    var val=item.querySelector('.contact-item-val');
    if(!val)return;
    var a=val.querySelector('a');
    var text=(a?a.textContent:val.textContent).trim();
    if(navigator.clipboard&&navigator.clipboard.writeText){
      navigator.clipboard.writeText(text).then(function(){showToast('Copied: '+text);});
    } else {
      var tmp=document.createElement('textarea');
      tmp.value=text;tmp.style.position='fixed';tmp.style.opacity='0';
      document.body.appendChild(tmp);tmp.select();
      document.execCommand('copy');document.body.removeChild(tmp);
      showToast('Copied: '+text);
    }
  });
});

var STAR_SVG='<svg class="tst-star" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>';
var STAR_EMPTY='<svg class="tst-star" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" style="opacity:.25"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>';
var DEFAULT_REVIEWS=[
  {id:'default-1',name:'AJ Reyes',role:'Discord Server Owner',stars:5,text:'Kiel delivered the bot ahead of schedule and it worked perfectly out of the box. The key system with HWID binding was exactly what I needed. Would definitely work with him again.',date:'2026-03-10T00:00:00Z'},
  {id:'default-2',name:'Marco C.',role:'Freelance Designer',stars:5,text:'The portfolio he built for me looks genuinely premium. Clean design, fast load, works great on mobile. He was easy to talk to and made revisions without any fuss.',date:'2026-02-20T00:00:00Z'},
  {id:'default-3',name:'Rx_Dev',role:'Roblox Community',stars:5,text:'Hired him for a Lua script and he nailed the anti-detection side of things. Solid work and he actually explained what he did and why. Rare to find that level of communication.',date:'2026-01-15T00:00:00Z'}
];
function getInitials(name){return name.split(' ').map(function(w){return w[0]||'';}).join('').substring(0,2).toUpperCase();}
function buildStars(n){var s='';for(var i=1;i<=5;i++)s+=i<=n?STAR_SVG:STAR_EMPTY;return s;}
var TST={idx:0,perPage:1,total:0};
function tstPerPage(){var w=window.innerWidth;if(w>=900)return 3;if(w>=520)return 2;return 1;}
function tstMaxIdx(){return Math.max(0,TST.total-TST.perPage);}
function tstGoTo(n){
  TST.idx=Math.max(0,Math.min(n,tstMaxIdx()));
  var track=document.getElementById('tst-grid');
  if(!track)return;
  var card=track.querySelector('.tst-card');
  if(!card){track.style.transform='translateX(0)';return;}
  track.style.transform='translateX(-'+((card.offsetWidth+12)*TST.idx)+'px)';
  var dotsEl=document.getElementById('tst-dots');
  if(dotsEl)Array.from(dotsEl.children).forEach(function(d,i){d.classList.toggle('active',i===TST.idx);});
  var prev=document.getElementById('tst-prev'),next=document.getElementById('tst-next');
  if(prev)prev.disabled=TST.idx<=0;
  if(next)next.disabled=TST.idx>=tstMaxIdx();
}
function buildDots(){
  var dotsEl=document.getElementById('tst-dots');
  if(!dotsEl)return;
  dotsEl.innerHTML='';
  var count=tstMaxIdx()+1;
  for(var i=0;i<count;i++){
    var d=document.createElement('button');
    d.className='tst-dot'+(i===0?' active':'');
    d.setAttribute('aria-label','Review '+(i+1));
    (function(idx){d.addEventListener('click',function(){tstGoTo(idx);});})(i);
    dotsEl.appendChild(d);
  }
}
function renderReviews(list){
  var track=document.getElementById('tst-grid');
  if(!track)return;
  if(!list||!list.length){
    track.innerHTML='<div class="tst-card visible" style="flex:0 0 100%"><p style="color:var(--t3);font-size:.82rem;text-align:center;padding:2rem 0">No reviews yet.</p></div>';
    TST.total=1;buildDots();tstGoTo(0);return;
  }
  var sorted=list.slice().sort(function(a,b){return new Date(b.date)-new Date(a.date);});
  TST.total=sorted.length;TST.perPage=tstPerPage();
  track.innerHTML='';
  sorted.forEach(function(r,i){
    var card=document.createElement('div');
    card.className='tst-card';
    card.style.transitionDelay=(i*60)+'ms';
    card.innerHTML=
      '<div class="tst-stars">'+buildStars(r.stars)+'</div>'
      +'<div class="tst-quote">\u201c</div>'
      +'<div class="tst-text">'+r.text.split('<').join('&lt;')+'</div>'
      +'<div class="tst-author">'
        +'<div class="tst-avatar">'+getInitials(r.name)+'</div>'
        +'<div><div class="tst-name">'+r.name.split('<').join('&lt;')+'</div>'
        +'<div class="tst-role">'+r.role.split('<').join('&lt;')+'</div></div>'
      +'</div>';
    track.appendChild(card);
    requestAnimationFrame(function(){requestAnimationFrame(function(){card.classList.add('visible');});});
  });
  TST.idx=0;buildDots();tstGoTo(0);
}
(function(){
  var prev=document.getElementById('tst-prev'),next=document.getElementById('tst-next');
  if(prev)prev.addEventListener('click',function(){tstGoTo(TST.idx-1);});
  if(next)next.addEventListener('click',function(){tstGoTo(TST.idx+1);});
  var outer=document.getElementById('tst-track-outer');
  if(outer){
    var startX=0,dragging=false;
    outer.addEventListener('touchstart',function(e){startX=e.touches[0].clientX;dragging=true;},{passive:true});
    outer.addEventListener('touchend',function(e){
      if(!dragging)return;dragging=false;
      var dx=e.changedTouches[0].clientX-startX;
      if(Math.abs(dx)>40){dx<0?tstGoTo(TST.idx+1):tstGoTo(TST.idx-1);}
    },{passive:true});
  }
  window.addEventListener('resize',function(){
    TST.perPage=tstPerPage();
    if(TST.idx>tstMaxIdx())TST.idx=tstMaxIdx();
    buildDots();tstGoTo(TST.idx);
  },{passive:true});
})();
(function(){
  fetch('./secret/reviews.json?_='+Date.now())
    .then(function(r){if(!r.ok)throw new Error('no file');return r.json();})
    .then(function(data){renderReviews(Array.isArray(data)?data:DEFAULT_REVIEWS);})
    .catch(function(){renderReviews(DEFAULT_REVIEWS);});
})();

(function(){
  var photo=document.querySelector('.about-photo');
  var shield=document.getElementById('img-shield');
  function block(e){e.preventDefault();return false;}
  if(photo){photo.addEventListener('contextmenu',block);photo.addEventListener('dragstart',block);}
  if(shield){
    shield.addEventListener('contextmenu',block);
    shield.addEventListener('dragstart',block);
    shield.addEventListener('touchstart',function(e){e.stopPropagation();},{passive:false});
    shield.addEventListener('touchend',function(e){e.stopPropagation();},{passive:false});
    shield.addEventListener('touchmove',function(e){e.preventDefault();},{passive:false});
  }
  var frame=document.querySelector('.about-frame');
  if(frame)frame.addEventListener('contextmenu',block);
})();

(function(){
  var buf='';
  document.addEventListener('keydown',function(e){
    var t=e.target.tagName;
    if(t==='INPUT'||t==='TEXTAREA'||e.target.isContentEditable)return;
    if(e.key.length===1){
      buf=(buf+e.key).toLowerCase().slice(-8);
      if(buf.slice(-8)==='francine')openFrancine();
      if(buf.slice(-5)==='maica')openMaica();
      if(buf.slice(-4)==='kiel')openDiary();
    } else {buf='';}
  });
})();

var _audio=null;
var _audioFadeTimer=null;
var FADE_IN_MS=1800;
var FADE_OUT_MS=1400;

function songPlay(url){
  if(!url)return;
  songStop(false);
  try{
    _audio=new Audio(url);
    _audio.loop=true;
    _audio.volume=0;
    _audio.play().then(function(){
      clearInterval(_audioFadeTimer);
      var step=0.016,target=0.72,interval=FADE_IN_MS/(target/step);
      _audioFadeTimer=setInterval(function(){
        if(!_audio)return clearInterval(_audioFadeTimer);
        _audio.volume=Math.min(_audio.volume+step,target);
        if(_audio.volume>=target)clearInterval(_audioFadeTimer);
      },interval);
    }).catch(function(){});
  }catch(e){}
}

function songStop(fade){
  clearInterval(_audioFadeTimer);
  if(!_audio)return;
  var a=_audio;
  if(fade===false){a.pause();a.src='';_audio=null;return;}
  var step=0.018,interval=FADE_OUT_MS/(a.volume/step||1);
  _audioFadeTimer=setInterval(function(){
    a.volume=Math.max(a.volume-step,0);
    if(a.volume<=0){clearInterval(_audioFadeTimer);a.pause();a.src='';if(_audio===a)_audio=null;}
  },interval);
}

var DIARY_OPEN=false;
function openDiary(){
  if(DIARY_OPEN)return;
  DIARY_OPEN=true;
  var ov=document.getElementById('diary-ov');
  if(!ov)return;
  ov.classList.add('open');
  document.body.style.overflow='hidden';
  loadDiary();
}
function closeDiary(){
  DIARY_OPEN=false;
  var ov=document.getElementById('diary-ov');
  if(!ov)return;
  ov.classList.remove('open');
  document.body.style.overflow='';
}
function loadDiary(){
  var list=document.getElementById('diary-list');
  if(!list)return;
  list.innerHTML='<div class="diary-loading"><div class="diary-spin"></div></div>';
  fetch('./secret/diary.json?_='+Date.now())
    .then(function(r){if(!r.ok)throw new Error();return r.json();})
    .then(function(data){
      renderDiary(Array.isArray(data)?data:(data.entries?data:[]));
      if(data&&data.song)songPlay(data.song);
    })
    .catch(function(){renderDiary([]);});
}
function closeDiary(){
  DIARY_OPEN=false;
  var ov=document.getElementById('diary-ov');
  if(!ov)return;
  ov.classList.remove('open');
  document.body.style.overflow='';
  songStop(true);
}var MOODS={
  happy:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M8 13s1.5 2 4 2 4-2 4-2"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/></svg>',
  productive:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>',
  tired:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M8 15h8"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/></svg>',
  creative:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>',
  grateful:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>',
  chill:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 1 4 1 4-1 4-1"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/></svg>',
  frustrated:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M16 16s-1.5-2-4-2-4 2-4 2"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/></svg>',
  excited:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>',
  default:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>'
};
function renderDiary(data){
  var list=document.getElementById('diary-list');
  if(!list)return;
  var entries=[];
  if(Array.isArray(data)){entries=data;}
  else if(data&&Array.isArray(data.entries)){entries=data.entries;}
  if(!entries.length){
    list.innerHTML='<div class="diary-empty">No entries yet.</div>';
    return;
  }
  list.innerHTML='';
  entries.forEach(function(e,i){
    var card=document.createElement('div');
    card.className='diary-card';
    card.style.animationDelay=(i*55)+'ms';
    var text=typeof e==='string'?e:(e.body||e.text||'');
    var title=typeof e==='string'?'':(e.title||'');
    var mood=typeof e==='string'?'':(e.mood||'');
    var moodSvg=mood&&MOODS[mood]?'<div class="diary-mood">'+MOODS[mood]+'</div>':'<div class="diary-mood">'+MOODS.default+'</div>';
    card.innerHTML=
      '<div class="diary-card-top">'
        +moodSvg
        +'<div class="diary-date-wrap">'
          +(title?'<div class="diary-date">'+title.split('<').join('&lt;')+'</div>':'<div class="diary-date">Entry '+(i+1)+'</div>')
        +'</div>'
      +'</div>'
      +'<div class="diary-body">'+text.split('<').join('&lt;').replace(/\n/g,'<br>')+'</div>';
    list.appendChild(card);
  });
}

var MAICA_OPEN=false;
function openMaica(){
  if(MAICA_OPEN)return;
  MAICA_OPEN=true;
  var ov=document.getElementById('maica-ov');
  if(!ov)return;
  ov.classList.add('open');
  document.body.style.overflow='hidden';
  spawnHearts();
  fetch('./secret/maica.json?_='+Date.now())
    .then(function(r){if(!r.ok)throw new Error();return r.json();})
    .then(function(d){renderMaica(d);})
    .catch(function(){});
}
function renderMaica(d){
  var toEl=document.getElementById('maica-name');
  var linesEl=document.getElementById('maica-lines');
  var signEl=document.getElementById('maica-sign');
  if(toEl&&d.to)toEl.textContent=d.to;
  if(signEl&&d.sign&&d.from)signEl.textContent=d.sign+', '+d.from;
  if(linesEl&&d.lines&&d.lines.length){
    linesEl.innerHTML='';
    d.lines.forEach(function(line){
      var div=document.createElement('div');
      div.className='maica-letter-line';
      div.textContent=line;
      linesEl.appendChild(div);
    });
  }
  if(d.song)songPlay(d.song);
}
function closeMaica(){
  MAICA_OPEN=false;
  var ov=document.getElementById('maica-ov');
  if(!ov)return;
  ov.classList.remove('open');
  document.body.style.overflow='';
  songStop(true);
}
function spawnHearts(){
  var HEART='<svg viewBox="0 0 24 24" fill="currentColor"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>';
  var colors=['#f87171','#fb923c','#f472b6','#e879f9','#c084fc','#ff6b9d'];
  for(var i=0;i<18;i++){(function(idx){
    setTimeout(function(){
      var h=document.createElement('div');
      var size=14+Math.random()*18;
      var startX=10+Math.random()*80;
      var dur=2.8+Math.random()*2.2;
      var color=colors[Math.floor(Math.random()*colors.length)];
      h.style.cssText='position:fixed;bottom:-30px;left:'+startX+'%;width:'+size+'px;height:'+size+'px;color:'+color+';opacity:0;pointer-events:none;z-index:999998;animation:heartFloat '+dur+'s ease-in forwards';
      h.innerHTML=HEART;
      document.body.appendChild(h);
      setTimeout(function(){h.remove();},dur*1000+100);
    },idx*160);
  })(i);}
}

var FRANCINE_OPEN=false;
function openFrancine(){
  if(FRANCINE_OPEN)return;
  FRANCINE_OPEN=true;
  var ov=document.getElementById('francine-ov');
  if(!ov)return;
  ov.classList.add('open');
  document.body.style.overflow='hidden';
  spawnStars();
  fetch('./secret/francine.json?_='+Date.now())
    .then(function(r){if(!r.ok)throw new Error();return r.json();})
    .then(function(d){renderFrancine(d);})
    .catch(function(){});
}
function renderFrancine(d){
  var toEl=document.getElementById('francine-name');
  var linesEl=document.getElementById('francine-lines');
  var signEl=document.getElementById('francine-sign');
  if(toEl&&d.to)toEl.textContent=d.to;
  if(signEl&&d.sign&&d.from)signEl.textContent=d.sign+', '+d.from;
  if(signEl&&d.sign&&!d.from)signEl.textContent=d.sign;
  if(linesEl&&d.lines&&d.lines.length){
    linesEl.innerHTML='';
    d.lines.forEach(function(line){
      var div=document.createElement('div');
      div.className='francine-letter-line';
      div.textContent=line;
      linesEl.appendChild(div);
    });
  }
  if(d.song)songPlay(d.song);
}
function closeFrancine(){
  FRANCINE_OPEN=false;
  var ov=document.getElementById('francine-ov');
  if(!ov)return;
  ov.classList.remove('open');
  document.body.style.overflow='';
  songStop(true);
}
function spawnStars(){
  var STAR='<svg viewBox="0 0 24 24" fill="currentColor"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>';
  var colors=['#a78bfa','#818cf8','#c4b5fd','#e0d7ff','#7c3aed','#ddd6fe'];
  for(var i=0;i<20;i++){(function(idx){
    setTimeout(function(){
      var h=document.createElement('div');
      var size=10+Math.random()*14;
      var startX=8+Math.random()*84;
      var dur=3+Math.random()*2.5;
      var color=colors[Math.floor(Math.random()*colors.length)];
      h.style.cssText='position:fixed;bottom:-30px;left:'+startX+'%;width:'+size+'px;height:'+size+'px;color:'+color+';opacity:0;pointer-events:none;z-index:999998;animation:heartFloat '+dur+'s ease-in forwards';
      h.innerHTML=STAR;
      document.body.appendChild(h);
      setTimeout(function(){h.remove();},dur*1000+100);
    },idx*140);
  })(i);}
}

