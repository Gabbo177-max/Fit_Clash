
document.addEventListener("DOMContentLoaded", function () {

    /* =========================================
       MOSTRA / NASCONDI PASSWORD
    ========================================= */

    const passwordInput = document.getElementById("password");
    const togglePassword = document.getElementById("togglePassword");
    const eyeIcon = document.getElementById("eyeIcon");

    if (passwordInput && togglePassword && eyeIcon) {

        togglePassword.addEventListener("click", function () {

            const isPassword = passwordInput.type === "password";

            passwordInput.type = isPassword ? "text" : "password";
            eyeIcon.textContent = isPassword ? "◎" : "◉";

            this.setAttribute(
                "aria-label",
                isPassword ? "Nascondi password" : "Mostra password"
            );

            this.setAttribute("aria-pressed", isPassword ? "true" : "false");

        });

    }


    /* =========================================
       ANIMAZIONE SCINTILLE - CANVAS
    ========================================= */

    const canvas = document.getElementById("sparksCanvas");

    if (!canvas) return;

    const ctx = canvas.getContext("2d");

    let width, height;
    let sparks = [];

    function resize() {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    }

    window.addEventListener("resize", resize);
    resize();


    /* CLASSE SCINTILLA */

    class Spark {

        constructor() {
            this.reset();
            this.y = Math.random() * height;
        }

        reset() {
            this.x = Math.random() * width;
            this.y = height + Math.random() * 100;

            this.size = Math.random() * 2 + 0.5;
            this.speedY = Math.random() * 1.5 + 0.5;
            this.speedX = (Math.random() - 0.5) * 0.8;

            this.opacity = Math.random() * 0.7 + 0.3;

            this.color = Math.random() > 0.25
                ? "232, 121, 36"
                : "255, 77, 77";
        }

        update() {

            this.y -= this.speedY;

            this.x += this.speedX + Math.sin(this.y * 0.01) * 0.5;

            this.opacity -= 0.0015;

            if (this.opacity <= 0 || this.y < 0) {
                this.reset();
            }

        }

        draw() {

            ctx.beginPath();

            ctx.arc(
                this.x,
                this.y,
                this.size,
                0,
                Math.PI * 2
            );

            ctx.fillStyle = `rgba(${this.color}, ${this.opacity})`;

            ctx.shadowBlur = 10;
            ctx.shadowColor = `rgba(${this.color}, ${this.opacity})`;

            ctx.fill();

            ctx.shadowBlur = 0;

        }

    }


    /* CREAZIONE SCINTILLE */

    for (let i = 0; i < 60; i++) {
        sparks.push(new Spark());
    }


    /* ANIMAZIONE */

    function animate() {

        ctx.clearRect(0, 0, width, height);

        sparks.forEach(spark => {
            spark.update();
            spark.draw();
        });

        requestAnimationFrame(animate);

    }

    animate();

});
