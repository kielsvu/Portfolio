"use strict";

/* ═══════════════════════════════════════════════════
   INTRO — particle canvas + "Kiel.Dev" typewriter
═══════════════════════════════════════════════════ */
(function(){
  var ic   = document.getElementById("intro-canvas");
  var ictx = ic.getContext("2d");
  var iW, iH, iRunning = true;
  var iParticles = [];

  function iResize(){
    iW = ic.width  = window.innerWidth;
    iH = ic.height = window.innerHeight;
  }
  iResize();
  window.addEventListener("resize", iResize, {passive:true});

  for(var i=0; i<55; i++){
    iParticles.push({
      x:     Math.random()*100,
      y:     Math.random()*100,
      size:  Math.random()*2.5 + 0.8,
      opacity: Math.random()*0.45 + 0.08,
      speed: Math.random()*0.4  + 0.1,
      angle: Math.random()*Math.PI*2
    });
  }

  function iDraw(){
    if(!iRunning){ return; }
    requestAnimationFrame(iDraw);
    ictx.clearRect(0,0,iW,iH);
    for(var pi=0; pi<iParticles.length; pi++){
      var p = iParticles[pi];
      p.angle += (Math.random()-0.5)*0.04;
      p.x += Math.cos(p.angle)*p.speed*0.08;
      p.y += Math.sin(p.angle)*p.speed*0.06;
      if(p.x < -2)  p.x = 102;
      if(p.x > 102) p.x = -2;
      if(p.y < -2)  p.y = 102;
      if(p.y > 102) p.y = -2;
      ictx.beginPath();
      ictx.arc(p.x/100*iW, p.y/100*iH, p.size, 0, 6.2832);
      ictx.fillStyle = "rgba(180,150,240,"+p.opacity+")";
      ictx.fill();
    }
    for(var a=0; a<iParticles.length; a++){
      for(var b=a+1; b<iParticles.length; b++){
        var dx = (iParticles[a].x - iParticles[b].x)/100*iW;
        var dy = (iParticles[a].y - iParticles[b].y)/100*iH;
        var dist = Math.sqrt(dx*dx + dy*dy);
        if(dist < 130){
          var alpha = (1 - dist/130)*0.18;
          ictx.beginPath();
          ictx.moveTo(iParticles[a].x/100*iW, iParticles[a].y/100*iH);
          ictx.lineTo(iParticles[b].x/100*iW, iParticles[b].y/100*iH);
          ictx.strokeStyle = "rgba(150,120,220,"+alpha+")";
          ictx.lineWidth   = 0.8;
          ictx.stroke();
        }
      }
    }
  }
  iDraw();

  /* Typewriter: "Kiel.Dev" */
  var intro   = document.getElementById("intro");
  var twEl    = document.getElementById("intro-title");
  var fillEl  = document.getElementById("intro-fill");
  var tagEl   = document.getElementById("intro-tagline");
  var TEXT    = "Kiel.Dev";
  var CURSOR  = '<span class="intro-cursor-blink"></span>';
  var ci      = 0;
  document.body.classList.add("intro-lock");

  function typeChar(){
    ci++;
    twEl.innerHTML = TEXT.slice(0, ci) + CURSOR;
    if(ci < TEXT.length){
      setTimeout(typeChar, 110);
    } else {
      setTimeout(function(){
        tagEl.style.opacity    = "1";
        tagEl.style.transition = "opacity .5s ease";
      }, 350);
      setTimeout(startBar, 600);
    }
  }
  setTimeout(typeChar, 500);

  var BAR_DUR = 700, barT0;
  function startBar(){
    barT0 = performance.now();
    requestAnimationFrame(tickBar);
  }
  function tickBar(now){
    var p = Math.min((now - barT0) / BAR_DUR, 1);
    fillEl.style.width = (p*100) + "%";
    if(p < 1){
      requestAnimationFrame(tickBar);
    } else {
      setTimeout(function(){
        iRunning = false;
        intro.classList.add("done");
        setTimeout(function(){
          document.body.classList.remove("intro-lock");
        }, 700);
      }, 250);
    }
  }
})();

/* ═══════════════════════════════════════════════════
   CUSTOM CURSOR — fixed for wired + Bluetooth mice
═══════════════════════════════════════════════════ */
(function(){
  var dot        = document.getElementById("cur");
  var hasMouse   = false;
  var touchActive = false;
  var touchTimer  = null;
  var HALF        = 4.5;

  document.addEventListener("touchstart", function(){
    touchActive = true;
    clearTimeout(touchTimer);
    touchTimer = setTimeout(function(){ touchActive = false; }, 800);
  }, {passive:true});

  document.addEventListener("mousemove", function(e){
    if(!hasMouse && !touchActive){
      hasMouse = true;
      document.body.classList.add("has-mouse");
    }
    if(!hasMouse){ return; }
    dot.style.transform = "translate("+(e.clientX-HALF)+"px,"+(e.clientY-HALF)+"px)";
  }, {passive:true});

  document.addEventListener("mouseover", function(e){
    if(!hasMouse){ return; }
    var el = e.target;
    var clickable = false;
    try {
      clickable = el.matches("a,button,.proj-card,.tech-card,.stat-box,.info-card,.svc-card,.port-tab,.btn,.ham")
                  || !!(el.closest && el.closest("a,button,.proj-card,.btn"));
    } catch(err){}
    document.body.classList.toggle("cbtn", clickable);
  }, {passive:true});
})();

/* ═══════════════════════════════════════════════════
   NEURON NETWORK CANVAS — replaces moon/meteor
═══════════════════════════════════════════════════ */
(function(){
  var canvas = document.getElementById("nc");
  var ctx    = canvas.getContext("2d");
  var W, H;
  var isMob  = window.innerWidth < 700;
  var N      = isMob ? 28 : 55;
  var DIST   = isMob ? 115 : 145;
  var nodes  = [];

  function resize(){
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }
  window.addEventListener("resize", resize, {passive:true});
  resize();

  function mkNode(){
    var s = isMob ? 0.50 : 0.40;
    return {
      x:  Math.random()*W,
      y:  Math.random()*H,
      vx: (Math.random()-0.5)*s*2,
      vy: (Math.random()-0.5)*s*2,
      r:  Math.random()*1.6+0.6,
      o:  Math.random()*0.40+0.12
    };
  }
  for(var i=0;i<N;i++){ nodes.push(mkNode()); }

  var mouse = {x:-9999, y:-9999};
  document.addEventListener("mousemove", function(e){
    mouse.x = e.clientX; mouse.y = e.clientY;
  }, {passive:true});

  function draw(){
    requestAnimationFrame(draw);
    ctx.clearRect(0,0,W,H);

    /* Update nodes */
    for(var i=0;i<N;i++){
      var n = nodes[i];
      n.x += n.vx; n.y += n.vy;
      if(n.x<0||n.x>W) n.vx*=-1;
      if(n.y<0||n.y>H) n.vy*=-1;
      /* Mouse attraction (desktop only) */
      if(!isMob){
        var dx=mouse.x-n.x, dy=mouse.y-n.y, dd=dx*dx+dy*dy;
        if(dd<38000){ var dl=Math.sqrt(dd); n.vx+=dx/dl*.008; n.vy+=dy/dl*.008; }
      }
      n.vx*=.994; n.vy*=.994;
      var sp=Math.sqrt(n.vx*n.vx+n.vy*n.vy);
      if(sp<0.12){ n.vx+=(Math.random()-.5)*.28; n.vy+=(Math.random()-.5)*.28; }
    }

    /* Draw connections */
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
            ctx.strokeStyle="rgba(150,120,215,"+(f*0.28)+")";
            ctx.lineWidth=f*0.9; ctx.stroke();
          } else {
            var g=ctx.createLinearGradient(nodes[i].x,nodes[i].y,nodes[j].x,nodes[j].y);
            g.addColorStop(0,"rgba(110,75,185,"+(f*0.26)+")");
            g.addColorStop(.5,"rgba(170,138,245,"+(f*0.40)+")");
            g.addColorStop(1,"rgba(110,75,185,"+(f*0.26)+")");
            ctx.beginPath();
            ctx.moveTo(nodes[i].x,nodes[i].y);
            ctx.lineTo(nodes[j].x,nodes[j].y);
            ctx.strokeStyle=g; ctx.lineWidth=f*0.9; ctx.stroke();
          }
        }
      }
      /* Draw node */
      ctx.beginPath();
      ctx.arc(nodes[i].x,nodes[i].y,nodes[i].r,0,6.2832);
      ctx.fillStyle="rgba(155,125,215,"+nodes[i].o+")";
      ctx.fill();
    }
  }
  draw();
})();

/* ═══════════════════════════════════════════════════
   PROJECT DATA
═══════════════════════════════════════════════════ */
var PROJ = [
  {tag:"Web Dashboard · Firebase",title:"Quantum Dashboard",desc:"Real-time analytics dashboard for the Quantum subscription service. Tracks active keys, HWID logs, revenue per tier, user activity, and admin actions via Firebase Realtime DB.",chips:["Firebase","JavaScript","HTML/CSS","Chart.js","GitHub Pages"],grad:"linear-gradient(135deg,rgba(55,110,200,.55) 0%,rgba(14,38,100,.9) 55%,rgba(4,3,14,1) 100%)",acc:"rgba(75,140,255,.28)",icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.3"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></svg>'},
  {tag:"Analytics · Firebase",title:"Analytics Panel",desc:"Standalone analytics panel tracking key activations, churn rate, HWID collision detection, tier distribution charts, and daily revenue. Static web app on GitHub Pages.",chips:["Firebase","Vanilla JS","HTML5/CSS3","GitHub Pages"],grad:"linear-gradient(135deg,rgba(160,50,200,.5) 0%,rgba(70,10,100,.9) 55%,rgba(4,3,14,1) 100%)",acc:"rgba(190,80,255,.26)",icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.3"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>'},
  {tag:"Web Panel · Backend",title:"Key System Panel",desc:"Full key lifecycle management: generate, bind HWID, set expiry, apply tiered cooldowns, revoke and reset. Synced with Discord slash commands and Firebase.",chips:["Firebase","Discord.js","Node.js","HTML/CSS","Lua Loader"],grad:"linear-gradient(135deg,rgba(70,190,110,.48) 0%,rgba(18,72,34,.9) 55%,rgba(4,3,14,1) 100%)",acc:"rgba(80,210,120,.26)",icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.3"><path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4"/></svg>'},
  {tag:"Web Dashboard · UI",title:"Garcia Script UI",desc:"Custom web UI panel for Garcia Script, a Roblox exploit toolkit. Dark glassmorphism design with toggle switches, sliders, and category tabs. Fully responsive.",chips:["HTML5","CSS3","JavaScript","Glassmorphism","Lua"],grad:"linear-gradient(135deg,rgba(200,140,40,.48) 0%,rgba(90,50,10,.9) 55%,rgba(4,3,14,1) 100%)",acc:"rgba(220,160,50,.26)",icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.3"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 3v18"/></svg>'},
  {tag:"Discord Bot · Firebase",title:"WhitelistBot Pro",desc:"Feature-rich Discord whitelist bot with Monthly and Lifetime subscription tiers, HWID verification, brute-force detection with auto-timeout, and auto-delivery Lua loader.",chips:["Discord.js v14","Firebase","Node.js","Slash Commands","HWID"],grad:"linear-gradient(135deg,rgba(200,80,80,.48) 0%,rgba(90,18,18,.9) 55%,rgba(4,3,14,1) 100%)",acc:"rgba(220,100,80,.26)",icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.3"><path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057c.003.012.01.024.023.031a19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03z"/></svg>'},
  {tag:"Discord Bot · Vouching",title:"Vouchlist Dashboard",desc:"Discord bot and web dashboard combo for managing customer vouches. Supports adding, verifying, and displaying vouches with a public leaderboard. Anti-spam built in.",chips:["Discord.js v14","Firebase","Node.js","HTML/CSS","GitHub Pages"],grad:"linear-gradient(135deg,rgba(80,140,200,.48) 0%,rgba(18,46,90,.9) 55%,rgba(4,3,14,1) 100%)",acc:"rgba(100,160,230,.26)",icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.3"><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>'}
];

/* ═══════════════════════════════════════════════════
   TECH DATA — Languages + Apps/Tools
═══════════════════════════════════════════════════ */
var LANG = [
  {name:"HTML5",     svg:'<svg viewBox="0 0 24 24" fill="#e34c26"><path d="M1.5 0h21l-1.91 21.563L11.977 24l-8.565-2.438L1.5 0zm7.031 9.75l-.232-2.718 10.059.003.23-2.622L5.412 4.41l.698 8.01h9.126l-.326 3.426-2.91.804-2.955-.81-.188-2.11H6.248l.33 4.171L12 19.351l5.379-1.443.744-8.157H8.531z"/></svg>'},
  {name:"CSS3",      svg:'<svg viewBox="0 0 24 24" fill="#2965f1"><path d="M1.5 0h21l-1.91 21.563L11.977 24l-8.565-2.438L1.5 0zm17.09 4.413L5.41 4.41l.213 2.622 10.125.002-.255 2.716h-6.64l.24 2.573h6.182l-.366 3.523-2.91.804-2.956-.81-.188-2.11h-2.61l.29 3.855L12 19.288l5.373-1.53L18.59 4.414z"/></svg>'},
  {name:"JavaScript",svg:'<svg viewBox="0 0 24 24"><rect width="24" height="24" fill="#f7df1e" rx="2"/><path fill="#000" d="M6.5 19.5l1.875-1.133c.361.641.689 1.184 1.477 1.184.754 0 1.23-.295 1.23-1.443V11.5h2.305v6.636c0 2.378-1.394 3.461-3.428 3.461-1.836 0-2.904-1.05-3.459-2.097zm8.5-.16l1.875-1.086c.492.805 1.132 1.394 2.262 1.394 1.05 0 1.722-.526 1.722-1.25 0-.869-.689-1.181-1.845-1.688l-.639-.272c-1.836-.781-3.054-1.762-3.054-3.834 0-1.903 1.444-3.356 3.7-3.356 1.607 0 2.756.558 3.585 2.02l-1.967 1.262c-.44-.787-.918-1.095-1.652-1.095-.755 0-1.233.476-1.233 1.095 0 .766.493 1.07 1.618 1.546l.64.272c2.16.924 3.377 1.87 3.377 3.985 0 2.283-1.793 3.547-4.2 3.547-2.345 0-3.86-1.165-4.19-2.54z"/></svg>'},
  {name:"TypeScript",svg:'<svg viewBox="0 0 24 24"><rect width="24" height="24" fill="#3178c6" rx="2"/><path fill="#fff" d="M13.5 15.5v1.9c.4.2.9.3 1.4.3 1.8 0 2.9-1 2.9-2.5 0-1.1-.6-1.9-1.9-2.5l-.6-.3c-.7-.3-1-.6-1-1.1 0-.4.3-.7.9-.7.5 0 .9.2 1.3.5l1-1.4c-.5-.5-1.3-.8-2.2-.8-1.6 0-2.7.9-2.7 2.4 0 1.2.7 2 1.9 2.5l.6.3c.7.3 1 .6 1 1.1 0 .5-.4.8-1 .8-.7 0-1.2-.3-1.6-.8zm-4.5-4.5H11V9.5H7V19h1.5v-4H11v-1.5H8.5V11z"/></svg>'},
  {name:"Python",    svg:'<svg viewBox="0 0 24 24"><path fill="#3776ab" d="M11.914 0C5.82 0 6.2 2.656 6.2 2.656l.007 2.752h5.814v.826H3.887S0 5.789 0 11.969c0 6.18 3.403 5.963 3.403 5.963h2.032v-2.867s-.109-3.402 3.35-3.402h5.766s3.24.052 3.24-3.131V3.19S18.28 0 11.914 0zm-3.21 1.843a1.037 1.037 0 1 1 0 2.073 1.037 1.037 0 0 1 0-2.073z"/><path fill="#ffd343" d="M12.086 24c6.094 0 5.714-2.656 5.714-2.656l-.007-2.752h-5.814v-.826h8.134S24 18.211 24 12.031c0-6.18-3.403-5.963-3.403-5.963h-2.032v2.867s.109 3.402-3.35 3.402H9.449s-3.24-.052-3.24 3.131v5.342S5.72 24 12.086 24zm3.21-1.843a1.037 1.037 0 1 1 0-2.073 1.037 1.037 0 0 1 0 2.073z"/></svg>'},
  {name:"PHP",       svg:'<svg viewBox="0 0 24 24"><rect width="24" height="24" rx="3" fill="#777bb3"/><ellipse cx="12" cy="12" rx="10" ry="6.5" fill="#8892bf"/><path fill="#fff" d="M7.5 9.5H9l.6 3 1.1-3h1.1l1.1 3 .6-3h1.5l-1.2 5h-1.3L11 11l-1.4 3.5H8.3L7.5 9.5zm6.7 0h2.7c1.2 0 1.8.6 1.8 1.6 0 1.3-.9 2-2.2 2H15l-.2 1.4h-1.4l.8-5zm1.3 2.5h.8c.5 0 .8-.2.8-.7 0-.3-.2-.5-.6-.5h-.8l-.2 1.2z"/></svg>'},
  {name:"Rust",      svg:'<svg viewBox="0 0 24 24" fill="#ce422b"><path d="M11.845 20.42l-8.808-5.03V8.61l8.808 5.03v6.78zm.507-7.787L3.544 7.604l8.808-5.03 8.808 5.03-8.808 5.029zm8.3 2.757l-8.808 5.03V13.64l8.808-5.03v6.78z"/></svg>'},
  {name:"SQL",       svg:'<svg viewBox="0 0 24 24"><rect width="24" height="24" rx="3" fill="#336791"/><path fill="#fff" d="M12 4C8 4 5 5.5 5 7.5v9C5 18.5 8 20 12 20s7-1.5 7-3.5v-9C19 5.5 16 4 12 4zm5 12.5c0 .8-2 2-5 2s-5-1.2-5-2V15c1.2.8 3 1.2 5 1.2s3.8-.4 5-1.2v1.5zm0-4c0 .8-2 2-5 2s-5-1.2-5-2V11c1.2.8 3 1.2 5 1.2s3.8-.4 5-1.2v1.5zm-5-3.5C9 9 7 8 7 7.5S9 6 12 6s5 .8 5 1.5S15 9 12 9z"/></svg>'},
  {name:"Lua",       svg:'<svg viewBox="0 0 64 64"><circle cx="32" cy="32" r="32" fill="#2c2d72"/><circle cx="32" cy="20" r="10" fill="#fff"/><circle cx="50" cy="12" r="6" fill="#fff"/><circle cx="32" cy="44" r="8" fill="#fff"/></svg>'},
  {name:"Node.js",   svg:'<svg viewBox="0 0 24 24" fill="#339933"><path d="M11.998 24a1.4 1.4 0 0 1-.697-.188L8.2 21.845c-.523-.293-.267-.397-.095-.457.664-.231.799-.284 1.508-.687.074-.042.172-.025.248.018l2.393 1.42c.088.048.212.048.292 0l9.317-5.376c.09-.052.146-.156.146-.263V7.5c0-.11-.056-.214-.15-.266l-9.31-5.37a.298.298 0 0 0-.292 0L3.147 7.236c-.096.054-.154.16-.154.266v10.75c0 .107.058.21.148.258l2.552 1.473c1.387.694 2.237-.124 2.237-.95V8.374c0-.152.12-.27.273-.27h1.19c.15 0 .27.118.27.27v10.659c0 1.862-1.014 2.931-2.782 2.931-.543 0-.97 0-2.165-.59L2.017 19.71A1.401 1.401 0 0 1 1.32 18.5V7.5c0-.505.27-.977.697-1.231L11.33.193a1.46 1.46 0 0 1 1.4 0l9.31 5.376a1.424 1.424 0 0 1 .699 1.231v10.75a1.42 1.42 0 0 1-.699 1.232l-9.31 5.376a1.41 1.41 0 0 1-.732.192z"/></svg>'},
  {name:"Java",      svg:'<svg viewBox="0 0 24 24"><path fill="#f89820" d="M8.851 18.56s-.917.534.653.714c1.902.218 2.874.187 4.969-.211 0 0 .552.346 1.321.646-4.699 2.013-10.633-.118-6.943-1.149M8.276 15.933s-1.028.761.542.924c2.032.209 3.636.227 6.413-.308 0 0 .384.389.987.602-5.679 1.661-12.007.13-7.942-1.218"/><path fill="#ea2d2e" d="M13.116 11.475c1.158 1.333-.304 2.533-.304 2.533s2.939-1.518 1.589-3.418c-1.261-1.772-2.228-2.652 3.007-5.688 0-.001-8.216 2.051-4.292 6.573"/><path fill="#f89820" d="M19.33 20.504s.679.559-.747.991c-2.712.822-11.288 1.069-13.669.033-.856-.373.75-.89 1.254-.998.527-.114.828-.093.828-.093-.953-.671-6.156 1.317-2.643 1.887 9.58 1.553 17.462-.7 14.977-1.82M9.292 12.83s-4.362 1.036-1.544 1.412c1.189.159 3.561.123 5.77-.062 1.806-.152 3.618-.477 3.618-.477s-.637.272-1.098.587c-4.429 1.165-12.986.623-10.522-.568 2.082-1.006 3.776-.892 3.776-.892M17.116 17.584c4.503-2.34 2.421-4.589.968-4.285-.355.074-.515.138-.515.138s.132-.207.385-.297c2.875-1.011 5.086 2.981-.928 4.562 0-.001.07-.062.09-.118"/><path fill="#ea2d2e" d="M14.401 0s2.494 2.494-2.365 6.33c-3.896 3.077-.888 4.832-.001 6.836-2.274-2.053-3.943-3.858-2.824-5.539 1.644-2.469 6.197-3.665 5.19-7.627"/><path fill="#f89820" d="M9.734 23.924c4.322.277 10.959-.153 11.116-2.198 0 0-.302.775-3.572 1.391-3.688.694-8.239.613-10.937.168 0-.001.553.457 3.393.639"/></svg>'},
  {name:"Go",        svg:'<svg viewBox="0 0 24 24"><rect width="24" height="24" rx="3" fill="#00acd7"/><path fill="#fff" d="M3 9.5h1v5H3zm3 0h3c.3 0 .5.2.5.5v1c0 .3-.2.5-.5.5H7v1h2c.3 0 .5.2.5.5v1c0 .3-.2.5-.5.5H6v-5zm7 0h1c.3 0 .5.2.5.5l1.5 3 1.5-3c0-.3.2-.5.5-.5h1c.3 0 .5.2.5.5v4c0 .3-.2.5-.5.5h-1c-.3 0-.5-.2-.5-.5v-2l-1 2-.5.5-.5-.5-1-2v2c0 .3-.2.5-.5.5h-1c-.3 0-.5-.2-.5-.5v-4c0-.3.2-.5.5-.5z"/></svg>'},
  {name:"Kotlin",    svg:'<svg viewBox="0 0 24 24"><rect width="24" height="24" rx="3" fill="#7f52ff"/><path fill="#fff" d="M4 4h8l-8 8V4zm0 16l8-8 8 8H4zm8-8l8-8v16L12 12z"/></svg>'},
  {name:"Swift",     svg:'<svg viewBox="0 0 24 24"><rect width="24" height="24" rx="3" fill="#fa7343"/><path fill="#fff" d="M18.5 15.8c.3-1.1.1-2.3-.5-3.3 1.3-1.8 1.2-4.1.2-5.5-.4.3-.9.7-1.4.9 1.3 2.4.3 5-1.2 6.2-2.3 1.7-5.5 1.5-7.6-.5C6.8 12 6.4 10 7 8.2c.6-1.8 2-3.1 3.6-3.7-1.7-.3-3.5.1-4.9 1.2-1 .8-1.7 2-1.9 3.2-.5 2.5.8 5.1 3.2 6.5 3.8 2.2 8.5 1.4 11.5-1.6z"/></svg>'},
  {name:"T-SQL",     svg:'<svg viewBox="0 0 24 24"><rect width="24" height="24" rx="3" fill="#cc2927"/><path fill="#fff" d="M4 6h16v2H4zm4 4h8v2H8zm-2 4h12v2H6zm2 4h8v1H8z"/><path fill="#fff" d="M12 4C9 4 6.5 5.5 6 7.5v9c.5 2 3 3.5 6 3.5s5.5-1.5 6-3.5V7.5C17.5 5.5 15 4 12 4zm4 12c0 .8-1.8 2-4 2s-4-1.2-4-2V10c.8.7 2.3 1.2 4 1.2s3.2-.5 4-1.2v6z"/></svg>'},
  {name:"PL/SQL",    svg:'<svg viewBox="0 0 24 24"><rect width="24" height="24" rx="3" fill="#f80000"/><path fill="#fff" d="M12 4C8 4 5 5.5 5 7.5v9C5 18.5 8 20 12 20s7-1.5 7-3.5v-9C19 5.5 16 4 12 4zm5 12c0 .9-2.2 2.2-5 2.2S7 16.9 7 16v-1.8c1.3.8 3 1.2 5 1.2s3.7-.4 5-1.2V16zm0-4c0 .9-2.2 2.2-5 2.2S7 12.9 7 12v-1.5c1.3.8 3 1.2 5 1.2s3.7-.4 5-1.2V12zm-5-3C9.2 9 7 7.8 7 7s2.2-1.8 5-1.8S17 6.2 17 7s-2.2 2-5 2z"/></svg>'},
  {name:"Ruby",      svg:'<svg viewBox="0 0 24 24"><path fill="#cc342d" d="M20.156 6.268l-7.21 12.484L2.773 6.268 12 2.25l8.156 4.018zm-8.156 9.358L4.04 7.6 12 3.95l7.96 3.65-7.96 8.026z"/><path fill="#cc342d" d="M12 16.5l-8.5-9.5h17L12 16.5z"/><path fill="#a72828" d="M12 16.5V22l-8.5-15 8.5 9.5zm0 0V22l8.5-15L12 16.5z"/></svg>'}
];

var APPS = [
  {name:"Firebase",  svg:'<svg viewBox="0 0 24 24"><path fill="#ffca28" d="M3.89 15.672L6.255.461A.542.542 0 0 1 7.27.288l2.543 4.771zm16.794 3.692l-2.25-14a.54.54 0 0 0-.919-.295L3.316 19.365l7.856 4.427a1.621 1.621 0 0 0 1.588 0zM14.3 7.147l-1.82-3.482a.542.542 0 0 0-.96 0L3.53 17.984z"/></svg>'},
  {name:"Discord.js",svg:'<svg viewBox="0 0 24 24" fill="#5865f2"><path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057c.003.012.01.024.023.031a19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03z"/></svg>'},
  {name:"Git",       svg:'<svg viewBox="0 0 24 24" fill="#f05032"><path d="M23.546 10.93L13.067.452a1.55 1.55 0 0 0-2.188 0L8.708 2.627l2.76 2.76a1.838 1.838 0 0 1 2.327 2.341l2.658 2.66a1.838 1.838 0 0 1 1.9 3.039 1.837 1.837 0 0 1-2.637-2.564L13.08 8.291v6.732a1.838 1.838 0 0 1 .48 3.314 1.837 1.837 0 0 1-2.191-2.967 1.833 1.833 0 0 1 .611-.394V8.197a1.833 1.833 0 0 1-.611-.394 1.838 1.838 0 0 1 .049-2.637L8.708 2.627.45 10.885a1.55 1.55 0 0 0 0 2.189l10.48 10.477a1.55 1.55 0 0 0 2.187 0l10.43-10.43a1.55 1.55 0 0 0 0-2.19"/></svg>'},
  {name:"GitHub",    svg:'<svg viewBox="0 0 24 24" fill="#c8c0e0"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>'},
  {name:"VS Code",   svg:'<svg viewBox="0 0 24 24" fill="#007acc"><path d="M23.15 2.587L18.21.21a1.494 1.494 0 0 0-1.705.29l-9.46 8.63-4.12-3.128a.999.999 0 0 0-1.276.057L.327 7.261A1 1 0 0 0 .326 8.74L3.899 12 .326 15.26a1 1 0 0 0 .001 1.479L1.65 17.94a.999.999 0 0 0 1.276.057l4.12-3.128 9.46 8.63a1.492 1.492 0 0 0 1.704.29l4.942-2.377A1.5 1.5 0 0 0 24 19.06V4.94a1.5 1.5 0 0 0-.85-1.353zm-5.146 14.861L10.826 12l7.178-5.448v10.896z"/></svg>'},
  {name:"REST API",  svg:'<svg viewBox="0 0 24 24" fill="none" stroke="#6db33f" stroke-width="1.8"><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>'},
  {name:"Dcoder",    svg:'<svg viewBox="0 0 24 24"><rect width="24" height="24" rx="4" fill="#1a1a2e"/><path fill="#6c63ff" d="M5 7h4c2.8 0 5 2.2 5 5s-2.2 5-5 5H5V7zm2 2v6h2c1.7 0 3-1.3 3-3s-1.3-3-3-3H7zm7 1l2-2 5 4-5 4-2-2 3-2-3-2z"/></svg>'},
  {name:"Pydroid",   svg:'<svg viewBox="0 0 24 24"><rect width="24" height="24" rx="4" fill="#1e3a5f"/><path fill="#ffd43b" d="M12 3.5C9 3.5 7 4.8 7 6.5v1.5h5v.5H6C4.3 8.5 3 9.8 3 11.5v2C3 15.2 4.3 16.5 6 16.5h1v-1.5c0-1.7 1.3-3 3-3h4c1.7 0 3-1.3 3-3V6.5C17 4.8 15 3.5 12 3.5zm-1.5 2a.75.75 0 1 1 0 1.5.75.75 0 0 1 0-1.5z"/><path fill="#4584b6" d="M12 20.5c3 0 5-1.3 5-3v-1.5h-5v-.5h6c1.7 0 3-1.3 3-3v-2c0-1.7-1.3-3-3-3h-1v1.5c0 1.7-1.3 3-3 3H10c-1.7 0-3 1.3-3 3v2c0 1.7 2 3 5 3zm1.5-2a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5z"/></svg>'}
];

/* ═══════════════════════════════════════════════════
   RENDER PROJECTS
═══════════════════════════════════════════════════ */
(function(){
  var g = document.getElementById("proj-grid");
  PROJ.forEach(function(p, i){
    var c = document.createElement("div");
    c.className = "proj-card";
    c.innerHTML =
      '<div class="proj-thumb">' +
        '<div class="proj-thumb-bg" style="position:absolute;inset:0;background:'+p.grad+'"></div>' +
        '<div style="position:absolute;inset:0;background:radial-gradient(ellipse at 30% 40%,'+p.acc+',transparent 62%)"></div>' +
        '<div class="proj-thumb-icon">'+p.icon+'</div>' +
        '<div class="proj-ov"><div class="proj-expand"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4"><polyline points="15 3 21 3 21 9"/><polyline points="9 21 3 21 3 15"/><line x1="21" y1="3" x2="14" y2="10"/><line x1="3" y1="21" x2="10" y2="14"/></svg></div></div>' +
      '</div>' +
      '<div class="proj-body">' +
        '<div class="proj-tag">'+p.tag+'</div>' +
        '<div class="proj-title">'+p.title+'</div>' +
        '<div class="proj-desc">'+p.desc.substring(0,85)+'&#8230;</div>' +
      '</div>';
    c.addEventListener("click", function(){ openLb(i); });
    g.appendChild(c);
  });
})();

/* ═══════════════════════════════════════════════════
   RENDER TECH STACK — two separate grids
═══════════════════════════════════════════════════ */
(function(){
  var gl = document.getElementById("tech-grid-langs");
  LANG.forEach(function(t){
    var c = document.createElement("div");
    c.className = "tech-card";
    c.innerHTML = '<div class="tech-icon">'+t.svg+'</div><div class="tech-name">'+t.name+'</div>';
    gl.appendChild(c);
  });
  var ga = document.getElementById("tech-grid-apps");
  APPS.forEach(function(t){
    var c = document.createElement("div");
    c.className = "tech-card";
    c.innerHTML = '<div class="tech-icon">'+t.svg+'</div><div class="tech-name">'+t.name+'</div>';
    ga.appendChild(c);
  });
})();

function animateTechCards(){
  var cards = document.querySelectorAll(".tech-card");
  cards.forEach(function(c, i){
    c.classList.remove("visible");
    void c.offsetWidth;
    setTimeout(function(){ c.classList.add("visible"); }, i*32);
  });
}

/* ═══════════════════════════════════════════════════
   PORTFOLIO TABS
═══════════════════════════════════════════════════ */
(function(){
  var tabs   = document.querySelectorAll(".port-tab");
  var ink    = document.getElementById("tab-ink");
  var panels = {
    projects:  document.getElementById("tab-projects"),
    techstack: document.getElementById("tab-techstack")
  };
  function posInk(btn){
    ink.style.width     = btn.offsetWidth + "px";
    ink.style.transform = "translateX(" + btn.offsetLeft + "px)";
  }
  window.addEventListener("load", function(){
    var a = document.querySelector(".port-tab.active");
    if(a){ ink.style.transition="none"; posInk(a); requestAnimationFrame(function(){ ink.style.transition=""; }); }
  });
  setTimeout(function(){ var a=document.querySelector(".port-tab.active"); if(a) posInk(a); }, 120);
  tabs.forEach(function(tab){
    tab.addEventListener("click", function(){
      tabs.forEach(function(t){ t.classList.remove("active"); t.setAttribute("aria-selected","false"); });
      tab.classList.add("active"); tab.setAttribute("aria-selected","true"); posInk(tab);
      var id = tab.dataset.tab;
      Object.keys(panels).forEach(function(k){ panels[k].classList.toggle("hidden", k!==id); });
      if(id==="techstack"){ animateTechCards(); }
    });
  });
})();

/* ═══════════════════════════════════════════════════
   LIGHTBOX
═══════════════════════════════════════════════════ */
var lbIdx = 0;
function openLb(i){ lbIdx=i; renderLb(); document.getElementById("lb").classList.add("on"); document.body.style.overflow="hidden"; }
function closeLb(){ document.getElementById("lb").classList.remove("on"); document.body.style.overflow=""; }
function renderLb(){
  var p=PROJ[lbIdx];
  document.getElementById("lb-title").textContent=p.title;
  document.getElementById("lb-desc").textContent=p.desc;
  var tc=document.getElementById("lb-chips"); tc.innerHTML="";
  p.chips.forEach(function(c){ var s=document.createElement("span"); s.className="lb-chip"; s.textContent=c; tc.appendChild(s); });
}
document.getElementById("lb-x").addEventListener("click",closeLb);
document.getElementById("lb").addEventListener("click",function(e){ if(e.target===this) closeLb(); });
document.getElementById("lb-prev").addEventListener("click",function(){ lbIdx=(lbIdx-1+PROJ.length)%PROJ.length; renderLb(); });
document.getElementById("lb-next").addEventListener("click",function(){ lbIdx=(lbIdx+1)%PROJ.length; renderLb(); });
document.addEventListener("keydown",function(e){
  if(!document.getElementById("lb").classList.contains("on")) return;
  if(e.key==="Escape") closeLb();
  if(e.key==="ArrowLeft"){ lbIdx=(lbIdx-1+PROJ.length)%PROJ.length; renderLb(); }
  if(e.key==="ArrowRight"){ lbIdx=(lbIdx+1)%PROJ.length; renderLb(); }
});

/* ═══════════════════════════════════════════════════
   MOBILE MENU
═══════════════════════════════════════════════════ */
var mnav=document.getElementById("mnav"),mobov=document.getElementById("mobov"),hambtn=document.getElementById("hambtn"),menuOpen=false;
function openMenu(){ menuOpen=true; mnav.classList.add("open"); mobov.classList.add("open"); document.body.style.overflow="hidden"; hambtn.setAttribute("aria-expanded","true"); hambtn.setAttribute("aria-label","Close menu"); }
function closeMenu(){ menuOpen=false; mnav.classList.remove("open"); mobov.classList.remove("open"); document.body.style.overflow=""; hambtn.setAttribute("aria-expanded","false"); hambtn.setAttribute("aria-label","Open menu"); }
hambtn.addEventListener("click",function(){ menuOpen?closeMenu():openMenu(); });
hambtn.addEventListener("keydown",function(e){ if(e.key==="Enter"||e.key===" "){ e.preventDefault(); menuOpen?closeMenu():openMenu(); }});
document.querySelectorAll(".mlink").forEach(function(a){ a.addEventListener("click",closeMenu); });

/* Hire Me — show on wide screens */
(function(){
  var btn=document.getElementById("nav-hire-btn"); if(!btn) return;
  var mq=window.matchMedia("(min-width:900px)");
  function chk(){ btn.style.display=mq.matches?"inline-flex":"none"; }
  mq.addEventListener("change",chk); chk();
})();

/* ═══════════════════════════════════════════════════
   SCROLL — hide pill on scroll-down, show on scroll-up
═══════════════════════════════════════════════════ */
var lastSY=0;
var desktopMQ=window.matchMedia("(min-width:600px)");
window.addEventListener("scroll",function(){
  var s=window.scrollY;
  var h=document.documentElement.scrollHeight-window.innerHeight;
  document.getElementById("prog").style.width=(h>0?Math.round(s/h*100):0)+"%";
  if(desktopMQ.matches){
    if(s<=80){ mnav.classList.remove("nav-hidden"); }
    else if(s>lastSY+4){ mnav.classList.add("nav-hidden"); }
    else if(s<lastSY-4){ mnav.classList.remove("nav-hidden"); }
  } else {
    mnav.classList.remove("nav-hidden");
  }
  mnav.classList.toggle("scrolled",s>40);
  document.getElementById("stop").classList.toggle("show",s>300);
  var ids=["home","about","service","portfolio","contact"],active="home";
  for(var k=0;k<ids.length;k++){ var el=document.getElementById(ids[k]); if(el&&el.getBoundingClientRect().top<=140) active=ids[k]; }
  document.querySelectorAll(".nav-links a").forEach(function(a){ a.classList.toggle("active",a.getAttribute("href")==="#"+active); });
  lastSY=s;
},{passive:true});

/* ═══════════════════════════════════════════════════
   SCROLL REVEAL
═══════════════════════════════════════════════════ */
var ro=new IntersectionObserver(function(en){
  en.forEach(function(e){ if(e.isIntersecting){ e.target.classList.add("v"); ro.unobserve(e.target); }});
},{threshold:.04,rootMargin:"0px 0px -30px 0px"});
document.querySelectorAll(".r").forEach(function(el){ ro.observe(el); });

/* ═══════════════════════════════════════════════════
   COUNTER ANIMATION
═══════════════════════════════════════════════════ */
var co=new IntersectionObserver(function(en){
  en.forEach(function(e){
    if(!e.isIntersecting) return;
    var el=e.target,target=+el.dataset.target,t0=Date.now(),dur=1200;
    (function tick(){ var p=Math.min((Date.now()-t0)/dur,1),ease=1-Math.pow(1-p,3);var suf=el.dataset.suffix||"";el.textContent=Math.round(ease*target)+suf;if(p<1) requestAnimationFrame(tick); })();
    co.unobserve(el);
  });
},{threshold:.5});
document.querySelectorAll("[data-target]").forEach(function(el){ co.observe(el); });

/* ═══════════════════════════════════════════════════
   CURSOR — single dot, fixed for BT/wired mouse
═══════════════════════════════════════════════════ */
(function(){
  var dot=document.getElementById("cur"),hasMouse=false,touchActive=false,touchTimer=null,HALF=4.5;
  document.addEventListener("touchstart",function(){ touchActive=true; clearTimeout(touchTimer); touchTimer=setTimeout(function(){ touchActive=false; },800); },{passive:true});
  document.addEventListener("mousemove",function(e){
    if(!hasMouse&&!touchActive){ hasMouse=true; document.body.classList.add("has-mouse"); }
    if(!hasMouse) return;
    dot.style.transform="translate("+(e.clientX-HALF)+"px,"+(e.clientY-HALF)+"px)";
  },{passive:true});
  document.addEventListener("mouseover",function(e){
    if(!hasMouse) return;
    var el=e.target,cl=false;
    try{ cl=el.matches("a,button,.proj-card,.tech-card,.stat-box,.info-card,.svc-card,.port-tab,.btn,.ham")||!!(el.closest&&el.closest("a,button,.proj-card,.btn")); }catch(err){}
    document.body.classList.toggle("cbtn",cl);
  },{passive:true});
})();

/* ═══════════════════════════════════════════════════
   HERO TYPEWRITER
═══════════════════════════════════════════════════ */
(function(){
  var el=document.getElementById("hero-tag-el");
  var words=["Web Developer","Discord Bot Dev","Student Freelancer","Lua Scripter","Go Developer","Creative Coder"];
  var wi=0,ci=0,del=false;
  function tick(){
    var w=words[wi];
    if(!del){
      ci++;
      el.innerHTML=w.slice(0,ci)+'<span class="tw-cur"></span>';
      if(ci>=w.length){ del=true; setTimeout(tick,1900); return; }
    } else {
      ci--;
      el.innerHTML=w.slice(0,ci)+'<span class="tw-cur"></span>';
      if(ci<=0){ del=false; wi=(wi+1)%words.length; setTimeout(tick,320); return; }
    }
    setTimeout(tick,del?45:80);
  }
  /* Start after intro completes (~4.2s total: 8chars*110ms + 500ms + 600ms + 700ms + 250ms + 700ms) */
  setTimeout(tick,4200);
})();
