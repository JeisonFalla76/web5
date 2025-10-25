/* ==============================
   web5.js — GYS IMPORTPLAST
   Interfaz moderna con fondo dinámico
   ============================== */

// ==============================
// MENÚ MÓVIL
// ==============================
document.addEventListener("DOMContentLoaded", () => {
  const menuBtn = document.getElementById("menu-btn");
  const navLinks = document.querySelector(".nav-links");

  menuBtn.addEventListener("click", () => {
    navLinks.classList.toggle("show");
    menuBtn.classList.toggle("active");
  });

  document.querySelectorAll(".nav-links a").forEach(link => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("show");
      menuBtn.classList.remove("active");
    });
  });
});

// ==============================
// ANIMACIONES AL HACER SCROLL
// ==============================
const fadeElements = document.querySelectorAll(".fade-in, .slide-up");

function mostrarEnScroll() {
  const trigger = window.innerHeight * 0.85;
  fadeElements.forEach(el => {
    const top = el.getBoundingClientRect().top;
    if (top < trigger) {
      el.classList.add("visible");
    }
  });
}

window.addEventListener("scroll", mostrarEnScroll);
window.addEventListener("load", mostrarEnScroll);

// ==============================
// FORMULARIOS CON FEEDBACK
// ==============================
function mensajeFlotante(texto, color = "#00ff9d") {
  const div = document.createElement("div");
  div.textContent = texto;
  div.style.position = "fixed";
  div.style.bottom = "30px";
  div.style.left = "50%";
  div.style.transform = "translateX(-50%)";
  div.style.background = color;
  div.style.color = "white";
  div.style.padding = "1rem 2rem";
  div.style.borderRadius = "40px";
  div.style.boxShadow = "0 4px 20px rgba(0,0,0,0.3)";
  div.style.fontWeight = "600";
  div.style.opacity = "0";
  div.style.transition = "opacity 0.6s, transform 0.6s";
  div.style.zIndex = "1000";
  document.body.appendChild(div);

  setTimeout(() => {
    div.style.opacity = "1";
    div.style.transform = "translate(-50%, -10px)";
  }, 100);

  setTimeout(() => {
    div.style.opacity = "0";
    div.style.transform = "translate(-50%, 20px)";
    setTimeout(() => div.remove(), 600);
  }, 3000);
}

const formCot = document.getElementById("formCotizacion");
if (formCot) {
  formCot.addEventListener("submit", (e) => {
    e.preventDefault();
    mensajeFlotante("✅ Cotización enviada correctamente");
    formCot.reset();
  });
}

const formEnc = document.getElementById("formEncuesta");
if (formEnc) {
  formEnc.addEventListener("submit", (e) => {
    e.preventDefault();
    mensajeFlotante("💬 ¡Gracias por tu opinión!");
    formEnc.reset();
  });
}

// ==============================
// SCROLL SUAVE ENTRE SECCIONES
// ==============================
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener("click", e => {
    e.preventDefault();
    const destino = document.querySelector(link.getAttribute("href"));
    if (destino) {
      window.scrollTo({
        top: destino.offsetTop - 70,
        behavior: "smooth"
      });
    }
  });
});

// ==============================
// FONDO ANIMADO (AURORA DINÁMICA)
// ==============================
const canvas = document.getElementById("bgCanvas");
const ctx = canvas.getContext("2d");
let w, h, t = 0;

function ajustarCanvas() {
  w = canvas.width = window.innerWidth;
  h = canvas.height = window.innerHeight;
}
ajustarCanvas();
window.addEventListener("resize", ajustarCanvas);

function aurora(tiempo) {
  const grad = ctx.createLinearGradient(0, 0, w, h);
  grad.addColorStop(0, `hsl(${(tiempo / 20) % 360}, 100%, 60%)`);
  grad.addColorStop(1, `hsl(${(tiempo / 10 + 180) % 360}, 100%, 60%)`);
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, w, h);

  // Ondas sutiles
  ctx.beginPath();
  for (let x = 0; x < w; x++) {
    const y = h / 2 + Math.sin(x * 0.01 + tiempo / 40) * 80;
    ctx.lineTo(x, y);
  }
  ctx.lineTo(w, h);
  ctx.lineTo(0, h);
  ctx.closePath();
  ctx.fillStyle = "rgba(255,255,255,0.05)";
  ctx.fill();
}

function animar() {
  t += 1;
  aurora(t);
  requestAnimationFrame(animar);
}
animar();
