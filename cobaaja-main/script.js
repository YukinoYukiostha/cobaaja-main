// ==========================================================================
// BACKGROUND CANVAS PARTICLES ENGINE (Hearts & Twinkling Stars)
// ==========================================================================
(function initBgCanvas() {
    const canvas = document.getElementById("bgCanvas");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    window.addEventListener("resize", () => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    });

    const items = [];
    const itemCount = Math.min(Math.floor(window.innerWidth / 20), 45);

    class Particle {
        constructor() {
            this.reset();
        }

        reset() {
            this.x = Math.random() * width;
            this.y = Math.random() * height + height;
            this.size = Math.random() * 14 + 8;
            this.speedY = Math.random() * 1.2 + 0.5;
            this.speedX = Math.sin(Math.random() * Math.PI) * 0.6;
            this.opacity = Math.random() * 0.7 + 0.3;
            this.type = Math.random() > 0.4 ? "heart" : "star";
            this.rotation = Math.random() * Math.PI * 2;
            this.rotSpeed = (Math.random() - 0.5) * 0.02;
        }

        update() {
            this.y -= this.speedY;
            this.x += this.speedX;
            this.rotation += this.rotSpeed;

            if (this.y < -30) {
                this.reset();
                this.y = height + 20;
            }
        }

        draw() {
            ctx.save();
            ctx.translate(this.x, this.y);
            ctx.rotate(this.rotation);
            ctx.globalAlpha = this.opacity;

            if (this.type === "heart") {
                ctx.fillStyle = "#ff85a1";
                ctx.font = `${this.size}px serif`;
                ctx.fillText("❤️", -this.size / 2, this.size / 2);
            } else {
                ctx.fillStyle = "#a7b0ff";
                ctx.font = `${this.size * 0.8}px serif`;
                ctx.fillText("✨", -this.size / 2, this.size / 2);
            }

            ctx.restore();
        }
    }

    for (let i = 0; i < itemCount; i++) {
        const p = new Particle();
        p.y = Math.random() * height; // initial spread
        items.push(p);
    }

    function animate() {
        ctx.clearRect(0, 0, width, height);
        items.forEach((p) => {
            p.update();
            p.draw();
        });
        requestAnimationFrame(animate);
    }

    animate();
})();

// ==========================================================================
// INTERACTIVE CLICK PARTICLES (Floating Heart on Click)
// ==========================================================================
document.addEventListener("click", function (e) {
    const heart = document.createElement("div");
    heart.innerHTML = "💖";
    heart.style.position = "fixed";
    heart.style.left = e.clientX - 12 + "px";
    heart.style.top = e.clientY - 12 + "px";
    heart.style.fontSize = "22px";
    heart.style.pointerEvents = "none";
    heart.style.zIndex = "9999";
    heart.style.transition = "transform 1s cubic-bezier(0.25, 1, 0.5, 1), opacity 1s ease";
    heart.style.transform = "translateY(0) scale(1)";

    document.body.appendChild(heart);

    setTimeout(() => {
        heart.style.transform = "translateY(-60px) scale(1.4)";
        heart.style.opacity = "0";
    }, 20);

    setTimeout(() => {
        heart.remove();
    }, 1000);
});

// ==========================================================================
// BUILT-IN CANVAS CONFETTI BURST (FOR PAGE 6 CELEBRATION)
// ==========================================================================
function launchConfetti() {
    const canvas = document.createElement("canvas");
    canvas.style.position = "fixed";
    canvas.style.top = "0";
    canvas.style.left = "0";
    canvas.style.width = "100vw";
    canvas.style.height = "100vh";
    canvas.style.pointerEvents = "none";
    canvas.style.zIndex = "99999";
    document.body.appendChild(canvas);

    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const pieces = [];
    const colors = ["#ff4b72", "#a7b0ff", "#ffd166", "#06d6a0", "#118ab2", "#ffffff"];

    for (let i = 0; i < 120; i++) {
        pieces.push({
            x: canvas.width / 2,
            y: canvas.height / 2,
            vx: (Math.random() - 0.5) * 18,
            vy: (Math.random() - 0.7) * 20,
            size: Math.random() * 10 + 6,
            color: colors[Math.floor(Math.random() * colors.length)],
            rotation: Math.random() * 360,
            rotSpeed: (Math.random() - 0.5) * 10,
            opacity: 1
        });
    }

    let frame = 0;
    function render() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        let alive = false;

        pieces.forEach((p) => {
            p.x += p.vx;
            p.y += p.vy;
            p.vy += 0.4; // gravity
            p.vx *= 0.98;
            p.rotation += p.rotSpeed;
            p.opacity -= 0.008;

            if (p.opacity > 0) {
                alive = true;
                ctx.save();
                ctx.translate(p.x, p.y);
                ctx.rotate((p.rotation * Math.PI) / 180);
                ctx.globalAlpha = Math.max(0, p.opacity);
                ctx.fillStyle = p.color;
                ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
                ctx.restore();
            }
        });

        frame++;
        if (alive && frame < 180) {
            requestAnimationFrame(render);
        } else {
            canvas.remove();
        }
    }

    render();
}

// ==========================================================================
// PAGE ROUTING & INTERACTION LOGIC
// ==========================================================================
document.addEventListener("DOMContentLoaded", function () {
    const pages = {
        1: document.querySelector(".page-1"),
        2: document.querySelector(".page-2"),
        3: document.querySelector(".page-3"),
        4: document.querySelector(".page-4"),
        5: document.querySelector(".page-5"),
        6: document.querySelector(".page-6"),
        7: document.querySelector(".page-7"),
        8: document.querySelector(".page-8"),
        9: document.querySelector(".page-9")
    };

    function switchPage(fromPageNum, toPageNum) {
        const fromPage = pages[fromPageNum];
        const toPage = pages[toPageNum];

        if (fromPage && toPage) {
            fromPage.classList.remove("active");
            toPage.classList.add("active");
            window.scrollTo({ top: 0, behavior: "smooth" });
        }
    }

    // Page 1 -> Page 2
    const startButton = document.getElementById("startButton");
    if (startButton) {
        startButton.addEventListener("click", () => switchPage(1, 2));
    }

    // Envelope Interactive Click (Page 2 -> Page 3)
    const envelopeWrapper = document.getElementById("envelopeWrapper");
    const readButton = document.getElementById("readButton");

    function openEnvelopeAndNext() {
        const envelope = envelopeWrapper ? envelopeWrapper.querySelector(".envelope") : null;
        if (envelope) {
            envelope.classList.add("open");
            setTimeout(() => {
                switchPage(2, 3);
                // Reset envelope after page transition
                setTimeout(() => envelope.classList.remove("open"), 600);
            }, 650);
        } else {
            switchPage(2, 3);
        }
    }

    if (readButton) readButton.addEventListener("click", openEnvelopeAndNext);
    if (envelopeWrapper) envelopeWrapper.addEventListener("click", openEnvelopeAndNext);

    // Page 2 -> Page 4 (males sama lu)
    const timeButton = document.getElementById("timeButton");
    if (timeButton) {
        timeButton.addEventListener("click", () => switchPage(2, 4));
    }

    // Page 4 -> Page 2 (back / bodo amat)
    const backButton = document.getElementById("backButton");
    if (backButton) {
        backButton.addEventListener("click", () => switchPage(4, 2));
    }

    // Page 3 -> Page 5 (continue)
    const continueButton = document.getElementById("continueButton");
    if (continueButton) {
        continueButton.addEventListener("click", () => switchPage(3, 5));
    }

    // Page 5 -> Page 6 (Iyeee -> YES! + Confetti Burst)
    const yesButton = document.getElementById("yesButton");
    if (yesButton) {
        yesButton.addEventListener("click", () => {
            launchConfetti();
            switchPage(5, 6);
        });
    }

    // Page 6 -> Page 7 (next)
    const nextButton = document.getElementById("nextButton");
    if (nextButton) {
        nextButton.addEventListener("click", () => switchPage(6, 7));
    }

    // Page 5 -> Page 8 (question time button / butuh waktu)
    const questionTimeButton = document.getElementById("questionTimeButton");
    if (questionTimeButton) {
        questionTimeButton.addEventListener("click", () => switchPage(5, 8));
    }

    // Page 8 -> Page 9 (understand button)
    const understandButton = document.getElementById("understandButton");
    if (understandButton) {
        understandButton.addEventListener("click", () => switchPage(8, 9));
    }

    // Page 9 -> Page 5 (back to question)
    const backToQuestionButton = document.getElementById("backToQuestionButton");
    if (backToQuestionButton) {
        backToQuestionButton.addEventListener("click", () => switchPage(9, 5));
    }

    // Page 7 -> Page 3 (back to letter)
    const backToLetterButton = document.getElementById("backToLetterButton");
    if (backToLetterButton) {
        backToLetterButton.addEventListener("click", () => switchPage(7, 3));
    }
});