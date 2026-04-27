// ===== DATA =====
const reasons = [
  { emoji: "😊", text: "Your smile lights up every room you walk into" },
  { emoji: "🌙", text: "You make even the quietest nights feel magical" },
  { emoji: "🤗", text: "Your hugs feel like home — warm, safe, forever" },
  { emoji: "🧠", text: "Your mind is brilliant and endlessly fascinating" },
  { emoji: "😂", text: "You make me laugh harder than anyone ever has" },
  { emoji: "💪", text: "You're stronger than you ever give yourself credit for" },
  { emoji: "🌸", text: "You're kind to everyone, even when no one's watching" },
  { emoji: "✨", text: "You make the ordinary feel absolutely extraordinary" },
];

const worldCards = [
  { emoji: "🌅", title: "Every Morning", text: "Waking up knowing you exist makes every morning worth it" },
  { emoji: "🍕", title: "Every Bite", text: "Even food tastes better when shared with you" },
  { emoji: "🎵", title: "Every Song", text: "Every song I hear, I think of you first" },
  { emoji: "🌧️", title: "Rainy Days", text: "You are my sunshine on the cloudiest days" },
  { emoji: "⭐", title: "Every Night", text: "I count stars and wish for more time with you" },
];

const surpriseMessages = [
  "In every lifetime, I'd choose you again 💖",
  "You are my favourite notification 📱💕",
  "If love was a language, you'd be my whole vocabulary 📖",
  "My heart does a little happy dance every time I see you 💃",
  "You're the best thing I never planned for 🎁",
];

const angryMessages = [
  "How DARE you!! 😤💔 (just kidding, I still love you endlessly)",
  "You pressed NO?! Try again or I'm sulking 😡❤️",
  "ERROR 404: Correct answer not found. Please try YES 🙃💕",
  "That's NOT the right answer! My heart is broken 💔 (but not really hehe)",
  "Excuse me?? My lawyers will hear about this 😤💖",
];

// ===== INIT =====
document.addEventListener("DOMContentLoaded", () => {
  createParticles();
  createBalloons();
  startTyping();
  renderReasons();
  renderWorldCards();
  setTimeout(showSurprisePopup, 5000);
  document.addEventListener("click", spawnFloatingHeart);
});

// ===== PARTICLES =====
function createParticles() {
  const container = document.getElementById("particles");
  const colors = ["#ffb3c6", "#d4b8e0", "#b8d8f0", "#ffe4c8", "#c8f0d4"];
  for (let i = 0; i < 28; i++) {
    const p = document.createElement("div");
    p.className = "particle";
    const size = Math.random() * 14 + 6;
    p.style.cssText = `
      width: ${size}px; height: ${size}px;
      left: ${Math.random() * 100}%;
      background: ${colors[Math.floor(Math.random() * colors.length)]};
      animation-duration: ${Math.random() * 18 + 12}s;
      animation-delay: ${Math.random() * 15}s;
    `;
    container.appendChild(p);
  }
}

// ===== BALLOONS =====
function createBalloons() {
  const container = document.getElementById("balloons");
  const balloonEmojis = ["🎈", "🎀", "🎈", "💖", "🎈", "✨"];
  for (let i = 0; i < 10; i++) {
    const b = document.createElement("div");
    b.className = "balloon";
    b.textContent = balloonEmojis[Math.floor(Math.random() * balloonEmojis.length)];
    b.style.cssText = `
      left: ${Math.random() * 95}%;
      font-size: ${Math.random() * 1.5 + 2}rem;
      animation-duration: ${Math.random() * 12 + 14}s;
      animation-delay: ${Math.random() * 20}s;
    `;
    container.appendChild(b);
  }
}

// ===== TYPING ANIMATION =====
const typingLines = [
  "Hello, my love 💌",
  "This was made just for you ✨",
  "Keep scrolling — there's magic ahead 🌸",
];
let lineIdx = 0, charIdx = 0, deleting = false;

function startTyping() {
  const el = document.getElementById("typingText");
  function tick() {
    const line = typingLines[lineIdx];
    if (!deleting) {
      el.textContent = line.slice(0, ++charIdx);
      if (charIdx === line.length) {
        deleting = true;
        setTimeout(tick, 2200);
        return;
      }
    } else {
      el.textContent = line.slice(0, --charIdx);
      if (charIdx === 0) {
        deleting = false;
        lineIdx = (lineIdx + 1) % typingLines.length;
      }
    }
    setTimeout(tick, deleting ? 45 : 80);
  }
  tick();
}

// ===== RENDER REASONS =====
function renderReasons() {
  const grid = document.getElementById("reasonsGrid");
  reasons.forEach((r, i) => {
    const card = document.createElement("div");
    card.className = "reason-card";
    card.style.animationDelay = `${i * 0.1}s`;
    card.innerHTML = `<span class="emoji">${r.emoji}</span><p>${r.text}</p>`;
    grid.appendChild(card);
  });
}

// ===== RENDER WORLD CARDS =====
function renderWorldCards() {
  const container = document.getElementById("worldCards");
  worldCards.forEach((c, i) => {
    const card = document.createElement("div");
    card.className = "world-card";
    card.style.animationDelay = `${i * 0.12}s`;
    card.innerHTML = `<span class="wc-emoji">${c.emoji}</span><h3>${c.title}</h3><p>${c.text}</p>`;
    container.appendChild(card);
  });
}

// ===== YES BUTTON =====
function handleYes() {
  const overlay = document.getElementById("celebrationOverlay");
  overlay.classList.add("show");
  const confetti = document.getElementById("confettiRow");
  confetti.textContent = "🎊💖🥳🌸✨🎀💕🎉🌷💗";
  launchHearts();
}
function closeCelebration() {
  document.getElementById("celebrationOverlay").classList.remove("show");
}

// ===== NO BUTTON =====
let noClickCount = 0;
function runAway() {
  const btn = document.getElementById("noBtn");
  const section = btn.closest(".love-button-section");
  const rect = section.getBoundingClientRect();
  const x = Math.random() * (rect.width - 130);
  const y = Math.random() * 60 - 30;
  btn.style.position = "absolute";
  btn.style.left = x + "px";
  btn.style.top = y + "px";
  btn.style.transform = `rotate(${Math.random() * 20 - 10}deg)`;
}
function handleNo() {
  const note = document.getElementById("angryNote");
  note.textContent = angryMessages[noClickCount % angryMessages.length];
  note.style.animation = "none";
  requestAnimationFrame(() => { note.style.animation = "shake 0.5s"; });
  noClickCount++;
  runAway();
}

// ===== FLOATING HEARTS ON CLICK =====
function spawnFloatingHeart(e) {
  if (e.target.closest("button, .celebration-overlay, .surprise-popup, .music-btn")) return;
  const hearts = ["💖", "💕", "💗", "💝", "❤️", "💓", "🌸"];
  const h = document.createElement("div");
  h.className = "floating-heart";
  h.textContent = hearts[Math.floor(Math.random() * hearts.length)];
  h.style.left = e.clientX + "px";
  h.style.top = e.clientY + "px";
  document.body.appendChild(h);
  setTimeout(() => h.remove(), 1600);
}

// ===== LAUNCH CELEBRATION HEARTS =====
function launchHearts() {
  for (let i = 0; i < 14; i++) {
    setTimeout(() => {
      const h = document.createElement("div");
      h.className = "floating-heart";
      h.textContent = ["💖", "💕", "✨", "🌸", "💗"][Math.floor(Math.random() * 5)];
      h.style.left = Math.random() * window.innerWidth + "px";
      h.style.top = Math.random() * window.innerHeight + "px";
      h.style.fontSize = `${Math.random() * 1.5 + 1.2}rem`;
      document.body.appendChild(h);
      setTimeout(() => h.remove(), 1600);
    }, i * 120);
  }
}

// ===== SURPRISE POPUP =====
function showSurprisePopup() {
  const popup = document.getElementById("surprisePopup");
  const msg = document.getElementById("surpriseMessage");
  msg.textContent = surpriseMessages[Math.floor(Math.random() * surpriseMessages.length)];
  popup.style.display = "block";
  setTimeout(() => popup.classList.add("show"), 50);
  setTimeout(() => closePopup(), 8000);
}
function closePopup() {
  const popup = document.getElementById("surprisePopup");
  popup.classList.remove("show");
  setTimeout(() => {
    popup.style.display = "none";
    // Show a new surprise after a while
    setTimeout(showSurprisePopup, 25000);
  }, 500);
}

// ===== MUSIC TOGGLE =====
let musicPlaying = false;
function toggleMusic() {
  const audio = document.getElementById("bgMusic");
  const btn = document.getElementById("musicBtn");
  if (musicPlaying) {
    audio.pause();
    btn.textContent = "🎵";
    btn.classList.remove("playing");
  } else {
    audio.play().catch(() => {});
    btn.textContent = "🎶";
    btn.classList.add("playing");
  }
  musicPlaying = !musicPlaying;
}

// ===== INTERSECTION OBSERVER for scroll animations =====
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.style.opacity = "1";
      e.target.style.transform = "translateY(0)";
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll(".section").forEach(s => {
  s.style.opacity = "0";
  s.style.transform = "translateY(40px)";
  s.style.transition = "opacity 0.7s ease, transform 0.7s ease";
  observer.observe(s);
});
