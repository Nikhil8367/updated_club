document.addEventListener('DOMContentLoaded', () => {
    // 1. Noise Mesh Canvas
    const canvas = document.getElementById('bg-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let w, h, particles = [];

        function resize() {
            w = canvas.width = window.innerWidth;
            h = canvas.height = window.innerHeight;
        }

        function create() {
            particles = [];
            for(let i = 0; i < 40; i++) {
                particles.push({
                    x: Math.random() * w,
                    y: Math.random() * h,
                    r: Math.random() * 200 + 100,
                    vx: (Math.random() - 0.5) * 0.3,
                    vy: (Math.random() - 0.5) * 0.3,
                    color: Math.random() > 0.5 ? 'rgba(0, 242, 254, 0.03)' : 'rgba(112, 0, 255, 0.03)'
                });
            }
        }

        function draw() {
            ctx.clearRect(0, 0, w, h);
            particles.forEach(p => {
                p.x += p.vx;
                p.y += p.vy;
                if(p.x < -200) p.x = w + 200;
                if(p.x > w + 200) p.x = -200;
                if(p.y < -200) p.y = h + 200;
                if(p.y > h + 200) p.y = -200;

                const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r);
                grad.addColorStop(0, p.color);
                grad.addColorStop(1, 'transparent');
                ctx.fillStyle = grad;
                ctx.fillRect(p.x - p.r, p.y - p.r, p.r * 2, p.r * 2);
            });
            requestAnimationFrame(draw);
        }

        window.addEventListener('resize', resize);
        resize();
        create();
        draw();
    }

    // 2. Intersection Observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

    // 3. Navbar Scrolled
    const nav = document.querySelector('nav');
    function checkScroll() {
        if (window.scrollY > 50) nav.classList.add('scrolled');
        else nav.classList.remove('scrolled');
    }
    window.addEventListener('scroll', checkScroll);
    checkScroll(); // Immediate check on load

    // 4. Smooth Anchor
    document.querySelectorAll('a[href^="#"]').forEach(a => {
        a.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) target.scrollIntoView({ behavior: 'smooth' });
        });
    });
});
