
(() => {
  const header=document.querySelector(".site-header");
  const menu=document.querySelector(".menu-toggle");
  const links=document.querySelector(".nav-links");

  window.addEventListener("scroll",()=>header?.classList.toggle("scrolled",window.scrollY>35),{passive:true});
  menu?.addEventListener("click",()=>links?.classList.toggle("open"));

  document.querySelectorAll('a[href^="#"]').forEach(a=>a.addEventListener("click",e=>{
    const target=document.querySelector(a.getAttribute("href"));
    if(target){e.preventDefault();target.scrollIntoView({behavior:"smooth",block:"start"});links?.classList.remove("open")}
  }));

  const reveal=new IntersectionObserver(entries=>{
    entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add("visible");reveal.unobserve(entry.target)}})
  },{threshold:.12});
  document.querySelectorAll(".reveal").forEach(el=>reveal.observe(el));

  document.querySelectorAll("form[data-demo-form]").forEach(form=>form.addEventListener("submit",e=>{
    e.preventDefault();
    const button=form.querySelector("button[type=submit]");
    if(button){const old=button.textContent;button.textContent="Message Sent";button.disabled=true;setTimeout(()=>{button.textContent=old;button.disabled=false;form.reset()},2200)}
  }));
})();
