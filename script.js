
const nav = document.querySelector('.nav');
const menu = document.querySelector('.menu');
const toggle = document.querySelector('.menu-toggle');

function onScroll(){
  if(window.scrollY > 30){
    nav.classList.add('scrolled');
  }else{
    nav.classList.remove('scrolled');
  }
}
window.addEventListener('scroll', onScroll);
onScroll();

if(toggle){
  toggle.addEventListener('click', () => {
    menu.classList.toggle('open');
    document.body.classList.toggle('menu-open');
  });
}

document.querySelectorAll('.menu a').forEach(a => {
  a.addEventListener('click', () => {
    menu.classList.remove('open');
    document.body.classList.remove('menu-open');
  });
});

const reveals = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, {threshold: .14});

reveals.forEach(el => observer.observe(el));

const target = new Date('2026-10-10T18:00:00+02:00');

function countdown(){
  const wrap = document.querySelector('[data-countdown]');
  if(!wrap) return;

  const diff = target - new Date();
  const parts = {
    days: document.getElementById('days'),
    hours: document.getElementById('hours'),
    minutes: document.getElementById('minutes'),
    seconds: document.getElementById('seconds')
  };

  if(diff <= 0){
    Object.values(parts).forEach(el => el.textContent = '0');
    return;
  }

  const days = Math.floor(diff / 86400000);
  const hours = Math.floor(diff / 3600000) % 24;
  const minutes = Math.floor(diff / 60000) % 60;
  const seconds = Math.floor(diff / 1000) % 60;

  parts.days.textContent = days;
  parts.hours.textContent = String(hours).padStart(2,'0');
  parts.minutes.textContent = String(minutes).padStart(2,'0');
  parts.seconds.textContent = String(seconds).padStart(2,'0');
}
countdown();
setInterval(countdown, 1000);
