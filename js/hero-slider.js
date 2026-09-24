
(() => {
  const slider=document.querySelector("#heroSlider");
  if(!slider)return;
  const slides=[...slider.querySelectorAll(".hero-slide")];
  const dots=[...slider.querySelectorAll(".hero-dot")];
  const next=slider.querySelector(".hero-next");
  const prev=slider.querySelector(".hero-prev");
  const progress=slider.querySelector(".hero-progress span");
  const duration=6500;
  let current=0,timer,startX=0;

  function goTo(index){
    current=(index+slides.length)%slides.length;
    slides.forEach((s,i)=>s.classList.toggle("is-active",i===current));
    dots.forEach((d,i)=>d.classList.toggle("is-active",i===current));
    restart();
  }
  function restart(){
    clearInterval(timer);
    if(progress){progress.classList.remove("run");void progress.offsetWidth;progress.classList.add("run")}
    timer=setInterval(()=>goTo(current+1),duration);
  }
  next?.addEventListener("click",()=>goTo(current+1));
  prev?.addEventListener("click",()=>goTo(current-1));
  dots.forEach(d=>d.addEventListener("click",()=>goTo(Number(d.dataset.slide))));
  slider.addEventListener("mouseenter",()=>clearInterval(timer));
  slider.addEventListener("mouseleave",restart);
  slider.addEventListener("touchstart",e=>startX=e.changedTouches[0].clientX,{passive:true});
  slider.addEventListener("touchend",e=>{const delta=e.changedTouches[0].clientX-startX;if(Math.abs(delta)>45)delta<0?goTo(current+1):goTo(current-1)},{passive:true});
  document.addEventListener("keydown",e=>{if(e.key==="ArrowRight")goTo(current+1);if(e.key==="ArrowLeft")goTo(current-1)});
  document.addEventListener("visibilitychange",()=>document.hidden?clearInterval(timer):restart());
  goTo(0);
})();
