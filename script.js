
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
