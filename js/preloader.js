
(() => {
  const loader=document.querySelector("#sitePreloader");
  if(!loader)return;
  const count=document.querySelector("#preloaderCount");
  const line=document.querySelector("#preloaderLine");
  const image=document.querySelector("#preloaderImage");
  const reduce=matchMedia("(prefers-reduced-motion: reduce)").matches;
  const sources=[
    "assets/images/hero/luxury-home-01.jpg",
    "assets/images/hero/hero-02.svg",
    "assets/images/hero/hero-03.svg"
  ];

  let loaded=0;
  const minimumTime=reduce?0:1100;
  const started=performance.now();

  const update=(percent)=>{
    if(count) count.textContent=String(percent);
    if(line) line.style.transform=`scaleX(${percent/100})`;
  };

  function finish(){
    const wait=Math.max(0,minimumTime-(performance.now()-started));
    setTimeout(()=>{
      update(100);
      loader.classList.add("is-ready");
      document.body.classList.remove("is-loading");
      setTimeout(()=>loader.classList.add("is-hidden"),reduce?50:1050);
    },wait);
  }

  if(reduce){
    if(image) image.style.backgroundImage=`url("${sources[0]}")`;
    finish();
    return;
  }

  if(image) image.style.backgroundImage=`url("${sources[0]}")`;

  sources.forEach(src=>{
    const img=new Image();
    img.onload=img.onerror=()=>{
      loaded++;
      update(Math.min(96,Math.round(loaded/sources.length*96)));
      if(loaded===sources.length) finish();
    };
    img.src=src;
  });

  // Never block the homepage indefinitely if a remote/local image fails.
  setTimeout(()=>{if(!loader.classList.contains("is-ready"))finish()},3200);
})();
