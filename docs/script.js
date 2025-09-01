// --- Transiciones entre secciones ---
const sections = document.querySelectorAll(".section");
const navItems = document.querySelectorAll(".sidebar ul li");

let current = 0;

function showSection(index){
  sections.forEach((sec, i) => {
    sec.classList.toggle("active", i === index);
  });
  navItems.forEach((item, i) => {
    item.classList.toggle("active", i === index);
  });
  current = index;

  // regenerar burbujas al cambiar de sección
  generateBubbles();
}

// evento click navbar
navItems.forEach((item, i) => {
  item.addEventListener("click", () => {
    showSection(i);
  });
});

// scroll fluido circular
window.addEventListener("wheel", (e)=>{
  if(e.deltaY > 0){ 
    // scroll hacia abajo
    const next = (current + 1) % sections.length; // vuelve al inicio si es el último
    showSection(next);
  } else if(e.deltaY < 0){ 
    // scroll hacia arriba
    const prev = (current - 1 + sections.length) % sections.length; // vuelve al final si es el primero
    showSection(prev);
  }
});

// --- Swipe en celular (circular) ---
let touchstartY = 0;
let touchendY = 0;

document.addEventListener('touchstart', e => {
  touchstartY = e.changedTouches[0].screenY;
}, false);

document.addEventListener('touchend', e => {
  touchendY = e.changedTouches[0].screenY;

  if(touchendY < touchstartY - 50){ 
    // swipe arriba → siguiente
    const next = (current + 1) % sections.length;
    showSection(next);
  }
  if(touchendY > touchstartY + 50){ 
    // swipe abajo → anterior
    const prev = (current - 1 + sections.length) % sections.length;
    showSection(prev);
  }
}, false);

// --- Countdown ---
function countdown(){
  const eventDate = new Date("October 11, 2025 19:00:00").getTime();
  const now = new Date().getTime();
  const diff = eventDate - now;

  if(diff <= 0){
    document.getElementById("countdown").innerHTML = "¡El gran día ha llegado!";
    return;
  }

  const days = Math.floor(diff/(1000*60*60*24));
  const hours = Math.floor((diff%(1000*60*60*24))/(1000*60*60));
  const mins = Math.floor((diff%(1000*60*60))/(1000*60));
  const secs = Math.floor((diff%(1000*60))/1000);

  document.getElementById("countdown").innerHTML = 
    `${days}d ${hours}h ${mins}m ${secs}s`;
}
setInterval(countdown,1000);

// --- Generador de burbujas dinámico ---
function generateBubbles(){
  const bubbles = document.querySelector(".bubbles");
  bubbles.innerHTML = ""; // limpiar anteriores

  const total = 30; // 👈 ráfaga estilo Bob Esponja
  for(let i=0; i<total; i++){
    const span = document.createElement("span");

    // posición aleatoria
    span.style.left = `${Math.random()*100}%`;

    // tamaño aleatorio (burbujas grandes y chicas)
    const size = 10 + Math.random()*40;
    span.style.width = `${size}px`;
    span.style.height = `${size}px`;

    // duración rápida (2–5s)
    span.style.animationDuration = `${2 + Math.random()*3}s`;

    bubbles.appendChild(span);
  }
}

// generar al inicio
generateBubbles();

// mostrar primera sección
showSection(0);

// --- Activar música al primer tap/click ---
/*document.addEventListener("DOMContentLoaded", () => {
      const music = document.getElementById("bg-music");

      function iniciarMusica() {
        if (music.paused) {
          music.play().catch(err => console.log("Audio bloqueado hasta interacción real:", err));
        }
        document.removeEventListener("click", iniciarMusica);
        document.removeEventListener("touchstart", iniciarMusica);
      }

      document.addEventListener("click", iniciarMusica);
      document.addEventListener("touchstart", iniciarMusica);
    });*/



