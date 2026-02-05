// const canvas = document.getElementById('gameCanvas');
// const ctx = canvas.getContext('2d');

// // Game State
// let gameState = 'START'; // START, PLAYING, WON, PROPOSAL, END
// let score = 0;
// const WIN_SCORE = 15; // Hearts needed to fill the meter
// let player;
// let hearts = [];
// let particles = []; // For effects
// let animationId;
// let loveMeter = document.getElementById('love-fill');

// // DOM Elements
// const startScreen = document.getElementById('start-screen');
// const proposalScreen = document.getElementById('proposal-screen');
// const celebrationScreen = document.getElementById('celebration-screen');
// const startBtn = document.getElementById('start-btn');
// const yesBtn = document.getElementById('yes-btn');
// const noBtn = document.getElementById('no-btn');

// // Resize Handling
// function resize() {
//     canvas.width = window.innerWidth;
//     canvas.height = window.innerHeight;
//     if (player) {
//          player.y = canvas.height - 100;
//     }
// }
// window.addEventListener('resize', resize);

// // Player Object
// class Player {
//     constructor() {
//         this.w = 100; // width
//         this.h = 80;  // height
//         this.x = canvas.width / 2 - this.w / 2;
//         this.y = canvas.height - 100;
//         this.speed = 10;
//         this.dx = 0;
//     }

//     draw() {
//         // Draw a cute basket or cup (using simple shapes for now, can be improved or replaced with image)
//         ctx.fillStyle = '#ff4d6d';
        
//         // Simple semi-circle basket
//         ctx.beginPath();
//         ctx.arc(this.x + this.w/2, this.y, this.w/2, 0, Math.PI, false);
//         ctx.fill();
        
//         // Handle
//         ctx.beginPath();
//         ctx.strokeStyle = '#c9184a';
//         ctx.lineWidth = 5;
//         ctx.arc(this.x + this.w/2, this.y - 10, this.w/2, Math.PI, 0, false);
//         ctx.stroke();
//     }

//     update() {
//         this.x += this.dx;
        
//         // Boundaries
//         if (this.x < 0) this.x = 0;
//         if (this.x + this.w > canvas.width) this.x = canvas.width - this.w;
//     }
// }

// // Heart Object
// class Heart {
//     constructor() {
//         this.size = Math.random() * 20 + 20; // 20-40px
//         this.x = Math.random() * (canvas.width - this.size);
//         this.y = -this.size;
//         this.speed = Math.random() * 3 + 2; // 2-5 speed
//         this.color = `hsl(${Math.random() * 20 + 340}, 100%, 60%)`; // Pinkish/Red variations
//     }

//     draw() {
//         ctx.fillStyle = this.color;
//         ctx.beginPath();
//         let topCurveHeight = this.size * 0.3;
//         ctx.moveTo(this.x, this.y + topCurveHeight);
//         // top left curve
//         ctx.bezierCurveTo(
//             this.x, this.y, 
//             this.x - this.size / 2, this.y, 
//             this.x - this.size / 2, this.y + topCurveHeight
//         );
//         // bottom left curve
//         ctx.bezierCurveTo(
//             this.x - this.size / 2, this.y + (this.size + topCurveHeight) / 2, 
//             this.x, this.y + (this.size + topCurveHeight) / 2, 
//             this.x, this.y + this.size
//         );
//         // bottom right curve
//         ctx.bezierCurveTo(
//             this.x, this.y + (this.size + topCurveHeight) / 2, 
//             this.x + this.size / 2, this.y + (this.size + topCurveHeight) / 2, 
//             this.x + this.size / 2, this.y + topCurveHeight
//         );
//         // top right curve
//         ctx.bezierCurveTo(
//             this.x + this.size / 2, this.y, 
//             this.x, this.y, 
//             this.x, this.y + topCurveHeight
//         );
//         ctx.fill();
//     }

//     update() {
//         this.y += this.speed;
//     }
// }

// // Particle Effect
// class Particle {
//     constructor(x, y) {
//         this.x = x;
//         this.y = y;
//         this.size = Math.random() * 5 + 2;
//         this.speedX = (Math.random() - 0.5) * 4;
//         this.speedY = (Math.random() - 0.5) * 4;
//         this.life = 100;
//         this.color = `rgba(255, 255, 255, 0.8)`;
//     }
//     update() {
//         this.x += this.speedX;
//         this.y += this.speedY;
//         this.life -= 2;
//     }
//     draw() {
//         ctx.fillStyle = this.color;
//         ctx.globalAlpha = this.life / 100;
//         ctx.beginPath();
//         ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
//         ctx.fill();
//         ctx.globalAlpha = 1;
//     }
// }

// // Input Handling
// function handleInput(e) {
//     if (!player) return;
    
//     // Mouse / Touch
//     if (e.type === 'mousemove' || e.type === 'touchmove') {
//         const clientX = e.type === 'mousemove' ? e.clientX : e.touches[0].clientX;
//         player.x = clientX - player.w / 2;
//     }
// }

// window.addEventListener('mousemove', handleInput);
// window.addEventListener('touchmove', handleInput, { passive: false });

// // Game Functions
// function spawnHeart() {
//     if (Math.random() < 0.02) {
//         hearts.push(new Heart());
//     }
// }

// function updateGame() {
//     ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear canvas

//     if (gameState === 'PLAYING') {
//         player.update();
//         player.draw();

//         spawnHeart();

//         hearts.forEach((heart, index) => {
//             heart.update();
//             heart.draw();

//             // Collision Detection
//             // Simple box-ish collision for now
//             if (
//                 heart.y + heart.size > player.y &&
//                 heart.x > player.x &&
//                 heart.x < player.x + player.w
//             ) {
//                 // Catch!
//                 hearts.splice(index, 1);
//                 score++;
//                 createParticles(heart.x, heart.y);
//                 updateScore();
                
//                 if (score >= WIN_SCORE) {
//                     triggerProposal();
//                 }
//             } else if (heart.y > canvas.height) {
//                 hearts.splice(index, 1); // Missed
//             }
//         });

//         particles.forEach((p, idx) => {
//             p.update();
//             p.draw();
//             if (p.life <= 0) particles.splice(idx, 1);
//         });
//     }

//     animationId = requestAnimationFrame(updateGame);
// }

// function createParticles(x, y) {
//     for(let i=0; i<5; i++) {
//         particles.push(new Particle(x, y));
//     }
// }

// function updateScore() {
//     const percentage = (score / WIN_SCORE) * 100;
//     loveMeter.style.width = `${percentage}%`;
// }

// function triggerProposal() {
//     gameState = 'PROPOSAL';
//     // Small delay to let the particle effect finish or just smooth transition
//     setTimeout(() => {
//         proposalScreen.classList.remove('hidden');
//         proposalScreen.classList.add('active');
//         // Stop the loop or keep it running for background? 
//         // Let's keep loop for maybe background falling hearts but pause spawning
//     }, 500);
// }

// function startGame() {
//     resize();
//     player = new Player();
//     hearts = [];
//     score = 0;
//     updateScore();
//     gameState = 'PLAYING';
    
//     startScreen.classList.remove('active');
//     startScreen.classList.add('hidden');
    
//     updateGame();
// }

// // Event Listeners
// startBtn.addEventListener('click', startGame);

// yesBtn.addEventListener('click', () => {
//     proposalScreen.classList.remove('active');
//     proposalScreen.classList.add('hidden');
//     celebrationScreen.classList.remove('hidden');
//     celebrationScreen.classList.add('active');
//     triggerConfetti(); // Optional: Implement confetti
// });

// // "No" button runs away
// noBtn.addEventListener('mouseover', moveNoButton);
// noBtn.addEventListener('touchstart', moveNoButton);

// function moveNoButton() {
//     const x = Math.random() * (window.innerWidth - noBtn.offsetWidth);
//     const y = Math.random() * (window.innerHeight - noBtn.offsetHeight);
//     noBtn.style.position = 'fixed';
//     noBtn.style.left = `${x}px`;
//     noBtn.style.top = `${y}px`;
// }

// function triggerConfetti() {
//     // Simple confetti effect using particles or similar
//     // We can just reuse the heat/particle engine or add a simple CSS class to body
//     // For now, let's just let it be.
// }

// // Initialize
// resize();

const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// ================= GAME STATE =================
let gameState = 'START'; // START, PLAYING, PROPOSAL, END
let score = 0;
const WIN_SCORE = 15;
let player;
let hearts = [];
let particles = [];
let confetti = [];
let animationId;
let loveMeter = document.getElementById('love-fill');

// ================= DOM =================
const startScreen = document.getElementById('start-screen');
const proposalScreen = document.getElementById('proposal-screen');
const celebrationScreen = document.getElementById('celebration-screen');
const startBtn = document.getElementById('start-btn');
const yesBtn = document.getElementById('yes-btn');
const noBtn = document.getElementById('no-btn');

// ================= RESIZE =================
function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    if (player) player.y = canvas.height - 110;
}
window.addEventListener('resize', resize);

// ================= PLAYER =================
class Player {
    constructor() {
        this.w = 100;
        this.h = 80;
        this.x = canvas.width / 2 - this.w / 2;
        this.y = canvas.height - 110;
        this.targetX = this.x;
    }

    draw() {
        ctx.save();
        ctx.shadowColor = '#ff4d6d';
        ctx.shadowBlur = 20;
        ctx.fillStyle = '#ff4d6d';

        ctx.beginPath();
        ctx.arc(this.x + this.w / 2, this.y, this.w / 2, 0, Math.PI);
        ctx.fill();

        ctx.strokeStyle = '#c9184a';
        ctx.lineWidth = 5;
        ctx.beginPath();
        ctx.arc(this.x + this.w / 2, this.y - 10, this.w / 2, Math.PI, 0);
        ctx.stroke();

        ctx.restore();
    }

    update() {
        this.x += (this.targetX - this.x) * 0.15;

        if (this.x < 0) this.x = 0;
        if (this.x + this.w > canvas.width) this.x = canvas.width - this.w;
    }
}

// ================= HEART =================
class Heart {
    constructor() {
        this.size = Math.random() * 20 + 22;
        this.x = Math.random() * (canvas.width - this.size);
        this.y = -this.size;
        this.speed = Math.random() * 2 + 2;
        this.glow = Math.random() * 15 + 10;
        this.color = `hsl(${340 + Math.random() * 20},100%,60%)`;
    }

    draw() {
        ctx.save();
        ctx.shadowColor = this.color;
        ctx.shadowBlur = this.glow;
        ctx.fillStyle = this.color;

        ctx.beginPath();
        ctx.moveTo(this.x, this.y + this.size * 0.3);
        ctx.bezierCurveTo(this.x, this.y, this.x - this.size / 2, this.y, this.x - this.size / 2, this.y + this.size * 0.3);
        ctx.bezierCurveTo(this.x - this.size / 2, this.y + this.size, this.x, this.y + this.size, this.x, this.y + this.size);
        ctx.bezierCurveTo(this.x, this.y + this.size, this.x + this.size / 2, this.y + this.size, this.x + this.size / 2, this.y + this.size * 0.3);
        ctx.bezierCurveTo(this.x + this.size / 2, this.y, this.x, this.y, this.x, this.y + this.size * 0.3);
        ctx.fill();

        ctx.restore();
    }

    update() {
        this.y += this.speed;
    }
}

// ================= PARTICLES =================
class Particle {
    constructor(x, y, heart = false) {
        this.x = x;
        this.y = y;
        this.size = Math.random() * 6 + 2;
        this.dx = (Math.random() - 0.5) * 6;
        this.dy = (Math.random() - 0.5) * 6;
        this.life = 100;
        this.heart = heart;
    }

    draw() {
        ctx.globalAlpha = this.life / 100;
        ctx.fillStyle = '#fff';

        if (this.heart) {
            ctx.font = `${this.size * 4}px serif`;
            ctx.fillText('❤️', this.x, this.y);
        } else {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
        ctx.globalAlpha = 1;
    }

    update() {
        this.x += this.dx;
        this.y += this.dy;
        this.life -= 3;
    }
}

// ================= CONFETTI =================
class Confetti {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = -20;
        this.size = Math.random() * 8 + 4;
        this.dy = Math.random() * 4 + 2;
        this.color = `hsl(${Math.random() * 360},100%,70%)`;
    }
    draw() {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.size, this.size);
    }
    update() {
        this.y += this.dy;
    }
}

// ================= INPUT =================
function handleInput(e) {
    if (!player) return;
    const x = e.type.includes('mouse') ? e.clientX : e.touches[0].clientX;
    player.targetX = x - player.w / 2;
}
window.addEventListener('mousemove', handleInput);
window.addEventListener('touchmove', handleInput, { passive: false });

// ================= GAME LOOP =================
function spawnHeart() {
    if (Math.random() < 0.03) hearts.push(new Heart());
}

function updateGame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (gameState === 'PLAYING') {
        player.update();
        player.draw();
        spawnHeart();

        hearts.forEach((h, i) => {
            h.update();
            h.draw();

            if (h.y + h.size > player.y && h.x > player.x && h.x < player.x + player.w) {
                hearts.splice(i, 1);
                score++;
                createParticles(h.x, h.y);
                updateScore();
                if (score >= WIN_SCORE) triggerProposal();
            } else if (h.y > canvas.height) hearts.splice(i, 1);
        });
    }

    particles.forEach((p, i) => {
        p.update();
        p.draw();
        if (p.life <= 0) particles.splice(i, 1);
    });

    confetti.forEach((c, i) => {
        c.update();
        c.draw();
        if (c.y > canvas.height) confetti.splice(i, 1);
    });

    animationId = requestAnimationFrame(updateGame);
}

// ================= HELPERS =================
function createParticles(x, y) {
    for (let i = 0; i < 12; i++) {
        particles.push(new Particle(x, y, Math.random() < 0.4));
    }
}

function updateScore() {
    loveMeter.style.width = `${(score / WIN_SCORE) * 100}%`;
}

function triggerProposal() {
    gameState = 'PROPOSAL';
    setTimeout(() => {
        proposalScreen.classList.remove('hidden');
        proposalScreen.classList.add('active');
    }, 500);
}

function triggerConfetti() {
    for (let i = 0; i < 150; i++) confetti.push(new Confetti());
}

// ================= EVENTS =================
startBtn.addEventListener('click', () => {
    resize();
    player = new Player();
    hearts = [];
    particles = [];
    score = 0;
    updateScore();
    gameState = 'PLAYING';
    startScreen.classList.add('hidden');
    updateGame();
});

yesBtn.addEventListener('click', () => {
    proposalScreen.classList.add('hidden');
    celebrationScreen.classList.remove('hidden');
    celebrationScreen.classList.add('active');
    triggerConfetti();

    const textEl = document.querySelector('.typewriter');
    typeWriterEffect(finalMessageText, textEl);
});


function moveNoButton() {
    noBtn.style.position = 'fixed';
    noBtn.style.left = Math.random() * (window.innerWidth - 100) + 'px';
    noBtn.style.top = Math.random() * (window.innerHeight - 50) + 'px';
}
noBtn.addEventListener('mouseover', moveNoButton);
noBtn.addEventListener('touchstart', moveNoButton);

// ================= INIT =================
resize();

const finalMessageText =
`This is our first Valentine together,
and I wanted to make it special — just like you.

From catching hearts in this little game
to holding my heart in real life,
you mean everything to me.

I love you, Shona ❤️

<signature>Forever yours,
Aditya ❤️
Ummmmmm Mahhhhhh😘😘
</signature>`;



function typeWriterEffect(text, element, speed = 45) {
    let i = 0;
    element.innerHTML = "";

    const interval = setInterval(() => {
        if (text.substring(i).startsWith("<signature>")) {
            element.innerHTML += `<span class="signature">`;
            i += 11;
            return;
        }
        if (text.substring(i).startsWith("</signature>")) {
            element.innerHTML += `</span>`;
            i += 12;
            return;
        }

        element.innerHTML += text.charAt(i);
        i++;

        if (i >= text.length) clearInterval(interval);
    }, speed);
}



