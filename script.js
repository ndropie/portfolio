
const cur=document.getElementById('cursor');
const ring=document.getElementById('cursor-ring');
let cx=0,cy=0,rx=0,ry=0;
document.addEventListener('mousemove',e=>{cx=e.clientX;cy=e.clientY;cur.style.left=(cx-5)+'px';cur.style.top=(cy-5)+'px';});
function animRing(){rx+=(cx-rx)*0.12;ry+=(cy-ry)*0.12;ring.style.left=(rx-15)+'px';ring.style.top=(ry-15)+'px';requestAnimationFrame(animRing);}animRing();
document.querySelectorAll('a,button').forEach(el=>{
  el.addEventListener('mouseenter',()=>{ring.style.transform='scale(1.8)';ring.style.opacity='0.8'});
  el.addEventListener('mouseleave',()=>{ring.style.transform='scale(1)';ring.style.opacity='0.5'});
});

(function(){
  const canvas=document.getElementById('hero-canvas');
  const renderer=new THREE.WebGLRenderer({canvas,antialias:true,alpha:true});
  renderer.setPixelRatio(Math.min(window.devicePixelRatio,2));
  renderer.setSize(window.innerWidth,window.innerHeight);
  const scene=new THREE.Scene();
  const cam=new THREE.PerspectiveCamera(65,window.innerWidth/window.innerHeight,0.1,500);
  cam.position.set(0,0,40);
  const gridHelper=new THREE.GridHelper(200,40,0x00ff88,0x0d1117);
  gridHelper.position.y=-15;gridHelper.material.opacity=0.35;gridHelper.material.transparent=true;scene.add(gridHelper);
  const cubes=[];
  const wMat=new THREE.MeshBasicMaterial({color:0x00ff88,wireframe:true,transparent:true,opacity:0.15});
  const wMat2=new THREE.MeshBasicMaterial({color:0x00d4ff,wireframe:true,transparent:true,opacity:0.1});
  for(let i=0;i<18;i++){const s=1.5+Math.random()*3;const g=new THREE.BoxGeometry(s,s,s);const m=new THREE.Mesh(g,i%2===0?wMat:wMat2);m.position.set((Math.random()-0.5)*80,(Math.random()-0.5)*40,(Math.random()-0.5)*30-10);m.userData={rx:(Math.random()-0.5)*0.008,ry:(Math.random()-0.5)*0.01,fy:Math.random()*0.3,origY:m.position.y};scene.add(m);cubes.push(m);}
  const pCount=1500;const pPos=new Float32Array(pCount*3);const pCol=new Float32Array(pCount*3);
  for(let i=0;i<pCount;i++){pPos[i*3]=(Math.random()-0.5)*150;pPos[i*3+1]=(Math.random()-0.5)*80;pPos[i*3+2]=(Math.random()-0.5)*60;if(Math.random()<0.6){pCol[i*3]=0;pCol[i*3+1]=1;pCol[i*3+2]=0.53;}else{pCol[i*3]=0;pCol[i*3+1]=0.83;pCol[i*3+2]=1;}}
  const pg=new THREE.BufferGeometry();pg.setAttribute('position',new THREE.BufferAttribute(pPos,3));pg.setAttribute('color',new THREE.BufferAttribute(pCol,3));
  const pm=new THREE.PointsMaterial({size:0.25,vertexColors:true,transparent:true,opacity:0.6});scene.add(new THREE.Points(pg,pm));
  let t=0,mx=0,my=0;
  window.addEventListener('mousemove',e=>{mx=(e.clientX/window.innerWidth-0.5)*2;my=(e.clientY/window.innerHeight-0.5)*2});
  function tick(){requestAnimationFrame(tick);t+=0.008;cubes.forEach(c=>{c.rotation.x+=c.userData.rx;c.rotation.y+=c.userData.ry;c.position.y=c.userData.origY+Math.sin(t+c.userData.fy)*1.5});cam.position.x+=(mx*4-cam.position.x)*0.04;cam.position.y+=(-my*2-cam.position.y)*0.04;cam.lookAt(0,0,0);renderer.render(scene,cam);}tick();
  window.addEventListener('resize',()=>{cam.aspect=window.innerWidth/window.innerHeight;cam.updateProjectionMatrix();renderer.setSize(window.innerWidth,window.innerHeight);});
})();

const obs=new IntersectionObserver(entries=>{entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add('visible')})},{threshold:0.1});
document.querySelectorAll('.reveal').forEach(el=>obs.observe(el));



(function(){
  // 👉 Replace each `img` path below with your own certificate image
  //    (e.g. "images/aws-cert.png", "/certs/gcp.jpg", or an absolute URL).
  const CERTS = [

     {
      issuer: "HackerRank",
      title: "Software Engineer Intern",
      date: "Jul 2026",
      color: "#4d9fff",
      img: "images/software_engineer_intern certificate.png"
    },

    
    {
      issuer: "DATACOM",
      title: "Software Development Job Simulation",
      date: "Jul 2026",
      color: "#4d9fff",
      img: "images/Datacom Software Development.png"
    },
    {
      issuer: "FORAGE & MasterCard",
      title: "CyberSecurity job Simulation - Certificate",
      date: "Jul 2026",
      color: "#8f7dff",
      img: "images/Mastercard Cybersecurity Job Simulation.png"
    },
    {
      issuer: "NIELIT",
      title: "O LEVEL",
      date: "Nov 2023",
      color: "#ff9f4d",
      img: "images/NIELIT O Level Certificate.png"
    },

    {        
      issuer: "ALISON",
      title: "Styling Websites with CSS",
      date: "Nov 2024",
      color: "#ff9f4d",
      img: "images/Alison - Styling Websites with CSS.png"
    },
    {
      issuer: "Solo Learn",
      title: "HTML COURSE",
      date: "July 2022",
      color: "#4dffb0",
      img: "images/Sololearn HTML Course.png"
    }
  ];

  const track = document.getElementById('cgTrack');
  const stage = document.getElementById('cgStage');
  const dotsWrap = document.getElementById('cgDots');
  const N = CERTS.length;

  // Certificate image viewer// ------------------------------------------------- viewers starts
  const certificateViewer = document.getElementById('certificateViewer');
  const certificateViewerImage = document.getElementById('certificateViewerImage');
  const certificateClose = document.getElementById('certificateClose');

  function openCertificate(imagePath, title) {
    certificateViewerImage.src = imagePath;
    certificateViewerImage.alt = title + " certificate";
    
    certificateViewer.classList.add('active');
    document.documentElement.classList.add('certificate-open');
  document.body.classList.add('certificate-open');
  }

  function closeCertificate() {
    certificateViewer.classList.remove('active');
      document.documentElement.classList.remove('certificate-open');
  document.body.classList.remove('certificate-open');
  }

  certificateClose.addEventListener('click', closeCertificate);

  // Close when clicking the dark background
  certificateViewer.addEventListener('click', (e) => {
    if (e.target === certificateViewer) {
      closeCertificate();
    }
  });

  // Close with Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeCertificate();
    }
  });

  // locking the screen preventing overflow of other sections over the image
  
  certificateViewer.addEventListener('wheel', function(e) {
  e.preventDefault();
}, { passive: false });

  // ---------------------------------- viewers end

  // Placeholder shown inline (as a data-URI) until you swap in a real <img src>.
  const placeholderFor = (color, label) =>
    `data:image/svg+xml;utf8,${encodeURIComponent(`
      <svg xmlns="http://www.w3.org/2000/svg" width="400" height="500">
        <defs>
          <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stop-color="${color}" stop-opacity="0.35"/>
            <stop offset="100%" stop-color="#05060a" stop-opacity="1"/>
          </linearGradient>
        </defs>
        <rect width="400" height="500" fill="url(#g)"/>
        <text x="200" y="255" fill="#ffffffaa" font-family="monospace" font-size="15" text-anchor="middle">${label}</text>
      </svg>`)}`;

  const verifiedSVG = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>`;

  const filenameOf = (path) => path.split('/').pop();

  // Build cards + dots
  const cardEls = CERTS.map((c, i) => {
    const el = document.createElement('div');
    el.className = 'cg-card';
    el.innerHTML = `
      <div class="cg-card-glow"></div>
      <div class="cg-shadow"></div>
      <div class="cg-titlebar">
        <span class="cg-tl-dots"><span></span><span></span><span></span></span>
        <span class="cg-filename">${filenameOf(c.img)}</span>
      </div>
      <div class="cg-img-frame">
        <img class="cg-cert-img" src="${c.img}"
             alt="${c.title} certificate"
             onerror="this.onerror=null; this.src='${placeholderFor(c.color, 'Add cert image')}';">
        <div class="cg-verified-chip">${verifiedSVG}Verified</div>
      </div>
      <div class="cg-footer">
        <span class="cg-date-pill">${c.date}</span>
      </div>
    `;
    el.addEventListener('click', () => {
      if (dragMoved) return;
      openCertificate(c.img, c.title);
    });
    track.appendChild(el);
    return el;
  });

  CERTS.forEach((_, i) => {
    const d = document.createElement('button');
    d.className = 'cg-dot';
    d.setAttribute('aria-label', 'Go to certificate ' + (i+1));
    d.addEventListener('click', () => goTo(i));
    dotsWrap.appendChild(d);
  });
  const dotEls = Array.from(dotsWrap.children);

  // ---- Physics state ----
  let offset = 0;      // continuous position
  let velocity = 0;
  let target = 0;
  let dragging = false;
  let dragMoved = false;
  let startX = 0, startOffset = 0, lastX = 0, lastT = 0, lastVX = 0;
  let rafId = null;

  const sectionEl = document.getElementById('certgallery');
  function getSpacing(){
    return parseFloat(getComputedStyle(sectionEl).getPropertyValue('--spacingX'));
  }
  function getTilt(){
    return parseFloat(getComputedStyle(sectionEl).getPropertyValue('--tilt'));
  }
  function getCenterScale(){
    return parseFloat(getComputedStyle(sectionEl).getPropertyValue('--center-scale'));
  }
  function getSideScale(){
    return parseFloat(getComputedStyle(sectionEl).getPropertyValue('--side-scale'));
  }
  function getSideOpacity(){
    return parseFloat(getComputedStyle(sectionEl).getPropertyValue('--side-opacity'));
  }

  function lerp(a,b,t){ return a + (b-a)*t; }

  function wrapDiff(i, off){
    let d = ((i - off + N/2) % N + N) % N - N/2;
    return d;
  }

  function render(){
    const spacing = getSpacing();
    const tilt = getTilt();
    const centerScale = getCenterScale();
    const sideScale = getSideScale();
    const sideOpacity = getSideOpacity();

    cardEls.forEach((el, i) => {
      const diff = wrapDiff(i, offset);
      const abs = Math.abs(diff);

      // opacity: 1 at 0 -> sideOpacity at 1 -> 0 at N/2
      let opacity;
      if (abs <= 1) opacity = lerp(1, sideOpacity, abs);
      else opacity = lerp(sideOpacity, 0, Math.min(1, (abs-1)/(N/2-1 || 1)));

      const scale = abs <= 1 ? lerp(centerScale, sideScale, abs) : lerp(sideScale, sideScale*0.55, Math.min(1,(abs-1)/(N/2-1||1)));
      const tx = diff * spacing;
      const tz = abs < 0.05 ? 80 : -Math.min(abs,2) * 140;
      const rotY = Math.max(-58, Math.min(58, -diff * tilt));
      const blur = abs > 1 ? Math.min(4, (abs-1)*3) : 0;
      const zIndex = Math.round((2 - abs) * 100);
      const glow = Math.max(0, 1 - abs * 1.6);

      el.style.transform = `translateX(${tx}px) translateZ(${tz}px) rotateY(${rotY}deg) scale(${scale})`;
      el.style.opacity = opacity.toFixed(3);
      el.style.zIndex = zIndex;
      el.style.filter = blur ? `blur(${blur.toFixed(2)}px)` : 'none';
      el.style.pointerEvents = abs > 1.35 ? 'none' : 'auto';
      const glowEl = el.querySelector('.cg-card-glow');
      glowEl.style.opacity = glow.toFixed(3);
      el.querySelector('.cg-shadow').style.opacity = (0.85 - abs*0.3).toFixed(2);
    });

    const active = ((Math.round(offset) % N) + N) % N;
    dotEls.forEach((d, i) => d.classList.toggle('active', i === active));
  }

  function stepSpring(){
    const stiffness = 0.12;
    const damping = 0.78;
    const diff = target - offset;
    velocity += diff * stiffness;
    velocity *= damping;
    offset += velocity;
    render();

    if (Math.abs(diff) > 0.0008 || Math.abs(velocity) > 0.0008) {
      rafId = requestAnimationFrame(stepSpring);
    } else {
      offset = target;
      velocity = 0;
      render();
      rafId = null;
    }
  }

  function settle(){
    target = Math.round(target);
    if (!rafId) rafId = requestAnimationFrame(stepSpring);
  }

  function goTo(i){
    // pick shortest path target (allow crossing multiple of N)
    const cur = target;
    const curMod = ((cur % N) + N) % N;
    let d = i - curMod;
    if (d > N/2) d -= N;
    if (d < -N/2) d += N;
    target = cur + d;
    velocity = 0;
    if (!rafId) rafId = requestAnimationFrame(stepSpring);
  }

  // ---- Pointer / drag handling ----
  function pointerDown(e){
    dragging = true;
    dragMoved = false;
    stage.classList.add('dragging');
    const p = getPoint(e);
    startX = p.x; lastX = p.x; lastT = performance.now();
    startOffset = offset;
    velocity = 0;
    if (rafId) { cancelAnimationFrame(rafId); rafId = null; }
    window.addEventListener('pointermove', pointerMove);
    window.addEventListener('pointerup', pointerUp);
  }

  function getPoint(e){
    return { x: e.clientX };
  }

  function pointerMove(e){
    if (!dragging) return;
    const p = getPoint(e);
    const dx = p.x - startX;
    if (Math.abs(dx) > 4) dragMoved = true;
    const spacing = getSpacing();
    offset = startOffset - dx / spacing;

    const now = performance.now();
    const dt = Math.max(1, now - lastT);
    lastVX = (p.x - lastX) / dt;
    lastX = p.x; lastT = now;

    render();
  }

  function pointerUp(){
    if (!dragging) return;
    dragging = false;
    stage.classList.remove('dragging');
    window.removeEventListener('pointermove', pointerMove);
    window.removeEventListener('pointerup', pointerUp);

    const spacing = getSpacing();
    velocity = -lastVX * 16 / spacing; // convert px/ms flick to offset units per frame-ish
    target = offset - velocity * 4;
    target = Math.round(target);
    if (!rafId) rafId = requestAnimationFrame(stepSpring);
  }

  stage.addEventListener('pointerdown', pointerDown);
  stage.style.touchAction = 'pan-y';

  window.addEventListener('resize', render);

  render();
})(); 
