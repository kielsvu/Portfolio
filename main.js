"use strict";

/* ── PROJECTS ────────────────────────────────────────────────────
   Ordered: Websites/Dashboards first, then bots/scripts
   Each has a relevant SVG icon path string matching its theme
──────────────────────────────────────────────────────────────── */
var PROJ = [
  /* ── DASHBOARDS / WEBSITES first ── */
  {
    tag:"Web Dashboard · Firebase",
    title:"Quantum Dashboard",
    desc:"A real-time analytics dashboard for the Quantum subscription service. Tracks active keys, HWID logs, revenue per tier, user activity, and admin actions — all live via Firebase Realtime DB. Clean dark UI with chart visualizations.",
    chips:["Firebase","JavaScript","HTML/CSS","Chart.js","GitHub Pages"],
    grad:"linear-gradient(135deg,rgba(55,110,200,.55) 0%,rgba(14,38,100,.9) 55%,rgba(4,3,14,1) 100%)",
    acc:"rgba(75,140,255,.28)",
    /* monitor/dashboard icon */
    icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.3"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/><path d="M6 8h2M10 8h8M6 11h5M13 11h5"/></svg>'
  },
  {
    tag:"Analytics · Firebase",
    title:"Analytics Panel (Quantum)",
    desc:"Standalone analytics panel tracking key activations, churn rate, HWID collision detection, tier distribution charts, and daily revenue. Deployed as a static web app on GitHub Pages with zero backend costs.",
    chips:["Firebase","Vanilla JS","HTML5/CSS3","GitHub Pages"],
    grad:"linear-gradient(135deg,rgba(160,50,200,.5) 0%,rgba(70,10,100,.9) 55%,rgba(4,3,14,1) 100%)",
    acc:"rgba(190,80,255,.26)",
    /* bar chart icon */
    icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.3"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6"  y1="20" x2="6"  y2="14"/><rect x="3" y="3" width="18" height="18" rx="1" stroke-opacity=".15"/></svg>'
  },
  {
    tag:"Web Panel · Backend",
    title:"Key System Panel",
    desc:"Full key lifecycle management web panel — generate, bind HWID, set expiry, apply tiered cooldowns, revoke/reset. Synced with Discord slash commands and a Firebase backend. Clean admin interface with real-time updates.",
    chips:["Firebase","Discord.js","Node.js","HTML/CSS","Lua Loader"],
    grad:"linear-gradient(135deg,rgba(70,190,110,.48) 0%,rgba(18,72,34,.9) 55%,rgba(4,3,14,1) 100%)",
    acc:"rgba(80,210,120,.26)",
    /* key icon */
    icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.3"><path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4"/></svg>'
  },
  {
    tag:"Web Dashboard · UI",
    title:"UI Panel (Garcia Script)",
    desc:"Custom web-based UI panel for Garcia Script — a Roblox exploit toolkit. Features a dark glassmorphism design with toggle switches, sliders, and category tabs for executor script settings. Fully responsive.",
    chips:["HTML5","CSS3","JavaScript","Glassmorphism","Lua"],
    grad:"linear-gradient(135deg,rgba(200,140,40,.48) 0%,rgba(90,50,10,.9) 55%,rgba(4,3,14,1) 100%)",
    acc:"rgba(220,160,50,.26)",
    /* layout/panel icon */
    icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.3"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 3v18"/></svg>'
  },
  /* ── BOTS / SCRIPTS after ── */
  {
    tag:"Discord Bot · Firebase",
    title:"WhitelistBot Pro",
    desc:"Feature-rich Discord whitelist bot with Monthly/Lifetime subscription tiers, HWID verification, brute-force detection with auto-timeout, tiered cooldowns (30-day / lifetime), and an auto-delivery Lua loader for executors.",
    chips:["Discord.js v14","Firebase","Node.js","Slash Commands","HWID"],
    grad:"linear-gradient(135deg,rgba(200,80,80,.48) 0%,rgba(90,18,18,.9) 55%,rgba(4,3,14,1) 100%)",
    acc:"rgba(220,100,80,.26)",
    /* bot/shield icon */
    icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.3"><path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057c.003.012.01.024.023.031a19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03z"/></svg>'
  },
  {
    tag:"Discord Bot · Vouching",
    title:"Vouchlist Dashboard",
    desc:"A Discord bot + web dashboard combo for managing customer vouches and reviews. Supports adding, verifying, and displaying vouches with a public-facing web leaderboard. Anti-spam and duplicate detection built in.",
    chips:["Discord.js v14","Firebase","Node.js","HTML/CSS","GitHub Pages"],
    grad:"linear-gradient(135deg,rgba(80,140,200,.48) 0%,rgba(18,46,90,.9) 55%,rgba(4,3,14,1) 100%)",
    acc:"rgba(100,160,230,.26)",
    /* list/check icon */
    icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.3"><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>'
  }
];

var lbIdx = 0;

/* ── RENDER PROJECTS ─────────────────────────── */
(function(){
  var grid = document.getElementById("proj-grid");
  PROJ.forEach(function(p, i){
    var card = document.createElement("div");
    card.className = "proj-card";
    card.innerHTML =
      '<div class="proj-thumb">' +
        '<div class="proj-thumb-bg" style="position:absolute;inset:0;background:'+p.grad+'"></div>' +
        '<div style="position:absolute;inset:0;background:radial-gradient(ellipse at 30% 40%,'+p.acc+',transparent 62%)"></div>' +
        '<div class="proj-thumb-icon">'+p.icon+'</div>' +
        '<div class="proj-ov"><div class="proj-expand"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4"><polyline points="15 3 21 3 21 9"/><polyline points="9 21 3 21 3 15"/><line x1="21" y1="3" x2="14" y2="10"/><line x1="3" y1="21" x2="10" y2="14"/></svg></div></div>' +
      '</div>' +
      '<div class="proj-body">' +
        '<div class="proj-tag">'+p.tag+'</div>' +
        '<div class="proj-title">'+p.title+'</div>' +
        '<div class="proj-desc">'+p.desc.substring(0,92)+'…</div>' +
      '</div>';
    card.addEventListener("click", function(){ openLb(i); });
    grid.appendChild(card);
  });
})();

/* ── LIGHTBOX ────────────────────────────────── */
function openLb(i){
  lbIdx = i; renderLb();
  document.getElementById("lb").classList.add("on");
  document.body.style.overflow = "hidden";
}
function closeLb(){
  document.getElementById("lb").classList.remove("on");
  document.body.style.overflow = "";
}
function renderLb(){
  var p = PROJ[lbIdx];
  document.getElementById("lb-title").textContent = p.title;
  document.getElementById("lb-desc").textContent  = p.desc;
  var tc = document.getElementById("lb-chips"); tc.innerHTML = "";
  p.chips.forEach(function(c){ var s=document.createElement("span"); s.className="lb-chip"; s.textContent=c; tc.appendChild(s); });
}
document.getElementById("lb-x").addEventListener("click", closeLb);
document.getElementById("lb").addEventListener("click", function(e){ if(e.target===this) closeLb(); });
document.getElementById("lb-prev").addEventListener("click", function(){ lbIdx=(lbIdx-1+PROJ.length)%PROJ.length; renderLb(); });
document.getElementById("lb-next").addEventListener("click", function(){ lbIdx=(lbIdx+1)%PROJ.length; renderLb(); });
document.addEventListener("keydown", function(e){
  if(!document.getElementById("lb").classList.contains("on")) return;
  if(e.key==="Escape") closeLb();
  if(e.key==="ArrowLeft"){ lbIdx=(lbIdx-1+PROJ.length)%PROJ.length; renderLb(); }
  if(e.key==="ArrowRight"){ lbIdx=(lbIdx+1)%PROJ.length; renderLb(); }
});

/* ── MOBILE MENU ─────────────────────────────── */
var mnav   = document.getElementById("mnav");
var mobov  = document.getElementById("mobov");
var hambtn = document.getElementById("hambtn");
var menuOpen = false;

function openMenu(){
  menuOpen = true;
  mnav.classList.add("open");
  mobov.classList.add("open");
  document.body.style.overflow = "hidden";
  hambtn.setAttribute("aria-expanded","true");
  hambtn.setAttribute("aria-label","Close menu");
}
function closeMenu(){
  menuOpen = false;
  mnav.classList.remove("open");
  mobov.classList.remove("open");
  document.body.style.overflow = "";
  hambtn.setAttribute("aria-expanded","false");
  hambtn.setAttribute("aria-label","Open menu");
}

hambtn.addEventListener("click", function(){ menuOpen ? closeMenu() : openMenu(); });
hambtn.addEventListener("keydown", function(e){
  if(e.key==="Enter"||e.key===" "){ e.preventDefault(); menuOpen ? closeMenu() : openMenu(); }
});
document.querySelectorAll(".mlink").forEach(function(a){
  a.addEventListener("click", function(){ closeMenu(); });
});

/* ── CUSTOM CURSOR — only activates on real mouse ─
   Touch/stylus devices NEVER get .has-mouse
   because touchstart fires before mousemove.
   We block mouse activation for 400ms after any touch.
────────────────────────────────────────────────── */
var curEl   = document.getElementById("cur");
var curRing = document.getElementById("cur-ring");
var mx = -999, my = -999;
var rx = -999, ry = -999;
var hasMouse = false;
var touchBlock = false;
var dotR = 4, dotRTarget = 4;
var ringR = 14, ringRTarget = 14;
var ringLoopStarted = false;

var isTouchDevice = window.matchMedia("(pointer:coarse)").matches;

document.addEventListener("touchstart", function(){
  touchBlock = true;
  setTimeout(function(){ touchBlock = false; }, 800);
}, {passive:true});

document.addEventListener("mousemove", function(e){
  if(touchBlock || isTouchDevice) return;
  mx = e.clientX; my = e.clientY;
  if(!hasMouse){
    hasMouse = true;
    rx = mx; ry = my; /* snap ring to exact mouse pos on first move */
    document.body.classList.add("has-mouse");
    /* Only start the rAF ring loop once a real mouse is confirmed */
    if(!ringLoopStarted){
      ringLoopStarted = true;
      (function animRing(){
        rx += (mx-rx)*0.12;
        ry += (my-ry)*0.12;
        dotR  += (dotRTarget  - dotR)  * 0.18;
        ringR += (ringRTarget - ringR) * 0.18;
        curEl.style.transform  = "translate("+(mx-dotR)+"px,"+(my-dotR)+"px)";
        curRing.style.transform = "translate("+(rx-ringR)+"px,"+(ry-ringR)+"px)";
        requestAnimationFrame(animRing);
      })();
    }
  }
  curEl.style.transform = "translate("+(mx-dotR)+"px,"+(my-dotR)+"px)";
});

document.addEventListener("mouseover", function(e){
  if(!hasMouse || isTouchDevice) return;
  var onBtn = !!(e.target.closest(".btn") || e.target.closest("button") || e.target.closest(".proj-card") || e.target.closest(".svc-card"));
  document.body.classList.toggle("cbtn", onBtn);
  dotRTarget  = onBtn ? 7  : 4;
  ringRTarget = onBtn ? 19 : 14;
});

/* ── NEURON CANVAS ───────────────────────────── */
(function(){
  var canvas = document.getElementById("nc");
  var ctx = canvas.getContext("2d");
  var W, H, nodes = [];
  var isMob = window.innerWidth < 700;
  var N    = isMob ? 28 : 55;
  var DIST = isMob ? 120 : 150;

  function resize(){
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }
  window.addEventListener("resize", function(){ resize(); }, {passive:true});
  resize();

  function mkNode(){
    /* faster speed so movement is clearly visible */
    var speed = isMob ? 0.55 : 0.45;
    return {
      x:  Math.random()*W,
      y:  Math.random()*H,
      vx: (Math.random()-.5)*speed*2,
      vy: (Math.random()-.5)*speed*2,
      r:  Math.random()*1.8+.8,
      o:  Math.random()*.5+.2
    };
  }
  for(var i=0;i<N;i++) nodes.push(mkNode());

  var mouse = {x:-9999, y:-9999};
  document.addEventListener("mousemove", function(e){ mouse.x=e.clientX; mouse.y=e.clientY; }, {passive:true});

  function draw(){
    requestAnimationFrame(draw);
    ctx.clearRect(0,0,W,H);

    /* update positions */
    for(var i=0;i<N;i++){
      var n=nodes[i];
      n.x+=n.vx; n.y+=n.vy;
      if(n.x<0||n.x>W) n.vx*=-1;
      if(n.y<0||n.y>H) n.vy*=-1;
      /* mouse attraction on desktop */
      if(!isMob){
        var dx=mouse.x-n.x, dy=mouse.y-n.y, d=dx*dx+dy*dy;
        if(d<40000){ var dd=Math.sqrt(d); n.vx+=dx/dd*.009; n.vy+=dy/dd*.009; }
      }
      /* gentle damping — keep speed stable */
      n.vx*=.994; n.vy*=.994;
      /* re-energise if too slow */
      var spd=Math.sqrt(n.vx*n.vx+n.vy*n.vy);
      if(spd<0.15){ n.vx+=(Math.random()-.5)*.3; n.vy+=(Math.random()-.5)*.3; }
    }

    /* draw lines */
    for(var i=0;i<N;i++){
      for(var j=i+1;j<N;j++){
        var dx=nodes[i].x-nodes[j].x, dy=nodes[i].y-nodes[j].y;
        var d2=dx*dx+dy*dy;
        if(d2<DIST*DIST){
          var f=1-Math.sqrt(d2)/DIST;
          if(isMob){
            ctx.beginPath();
            ctx.moveTo(nodes[i].x,nodes[i].y);
            ctx.lineTo(nodes[j].x,nodes[j].y);
            ctx.strokeStyle="rgba(155,125,220,"+(f*.35)+")";
            ctx.lineWidth=f*1.1;
            ctx.stroke();
          } else {
            var g=ctx.createLinearGradient(nodes[i].x,nodes[i].y,nodes[j].x,nodes[j].y);
            g.addColorStop(0,"rgba(118,82,190,"+(f*.28)+")");
            g.addColorStop(.5,"rgba(176,144,248,"+(f*.42)+")");
            g.addColorStop(1,"rgba(118,82,190,"+(f*.28)+")");
            ctx.beginPath();
            ctx.moveTo(nodes[i].x,nodes[i].y);
            ctx.lineTo(nodes[j].x,nodes[j].y);
            ctx.strokeStyle=g; ctx.lineWidth=f*1.1; ctx.stroke();
          }
        }
      }
      ctx.beginPath();
      ctx.arc(nodes[i].x,nodes[i].y,nodes[i].r,0,6.2832);
      ctx.fillStyle="rgba(160,130,215,"+nodes[i].o+")";
      ctx.fill();
    }
  }
  draw();
})();

/* ── SCROLL ──────────────────────────────────── */
window.addEventListener("scroll", function(){
  var s=window.scrollY;
  var h=document.documentElement.scrollHeight-window.innerHeight;
  document.getElementById("prog").style.width=(h>0?Math.round(s/h*100):0)+"%";
  mnav.classList.toggle("scrolled", s>50);
  document.getElementById("stop").classList.toggle("show", s>360);
  /* active nav link */
  var ids=["home","about","skill","service","project","contact"], active="home";
  for(var k=0;k<ids.length;k++){
    var el=document.getElementById(ids[k]);
    if(el && el.getBoundingClientRect().top<=130) active=ids[k];
  }
  document.querySelectorAll(".nav-links a").forEach(function(a){
    a.classList.toggle("active", a.getAttribute("href")==="#"+active);
  });
},{passive:true});

/* ── SCROLL REVEAL ───────────────────────────── */
/* Content is always visible (opacity:1 in CSS), observer just removes slide offset */
var ro = new IntersectionObserver(function(en){
  en.forEach(function(e){
    if(e.isIntersecting){ e.target.classList.add("v"); ro.unobserve(e.target); }
  });
},{threshold:0, rootMargin:"0px 0px 0px 0px"});
document.querySelectorAll(".r").forEach(function(el){ ro.observe(el); });
/* Also apply immediately for anything already in view */
setTimeout(function(){
  document.querySelectorAll(".r").forEach(function(el){ el.classList.add("v"); });
}, 100);

/* ── COUNTER ANIMATION ───────────────────────── */
var co = new IntersectionObserver(function(en){
  en.forEach(function(e){
    if(!e.isIntersecting) return;
    var el=e.target, target=+el.dataset.target, t0=Date.now(), dur=1400;
    (function tick(){
      var p=Math.min((Date.now()-t0)/dur,1), ease=1-Math.pow(1-p,3);
      var suffix = el.dataset.suffix !== undefined ? el.dataset.suffix : (target>=10?"+":"");
      el.textContent=Math.round(ease*target)+suffix;
      if(p<1) requestAnimationFrame(tick);
    })();
    co.unobserve(el);
  });
},{threshold:.5});
document.querySelectorAll("[data-target]").forEach(function(el){ co.observe(el); });

/* ── TYPEWRITER ──────────────────────────────── */
(function(){
  var el=document.getElementById("hero-tag-el");
  var words=["Web Developer","Discord Bot Dev","Student Freelancer","Lua Scripter","Creative Coder"];
  var wi=0,ci=0,del=false;
  function tick(){
    var w=words[wi];
    if(!del){ ci++; el.innerHTML=w.slice(0,ci)+'<span class="tw-cur"></span>'; if(ci>=w.length){del=true;setTimeout(tick,1900);return;} }
    else     { ci--; el.innerHTML=w.slice(0,ci)+'<span class="tw-cur"></span>'; if(ci<=0){del=false;wi=(wi+1)%words.length;setTimeout(tick,360);return;} }
    setTimeout(tick,del?50:85);
  }
  setTimeout(tick,1000);
})();

/* ── NAV HIRE BTN — desktop only via JS ─────────
   Hidden on touch devices and narrow viewports
──────────────────────────────────────────────── */
(function(){
  var hireBtn = document.getElementById("nav-hire-btn");
  if(!hireBtn) return;
  var isTouch = window.matchMedia("(pointer:coarse)").matches;
  function checkWidth(){
    var show = !isTouch && window.innerWidth > 1024;
    hireBtn.style.display = show ? "inline-flex" : "none";
  }
  checkWidth();
  window.addEventListener("resize", checkWidth, {passive:true});
})();
