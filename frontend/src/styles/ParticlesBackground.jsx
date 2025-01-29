import { useEffect, useRef } from "react";

const ParticlesBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const particles = [];
    const maxParticles = 100;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();

    // Creating particles here
    const createParticle = () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * 2 + 1,
      dx: Math.random() * 0.3 - 0.15,
      dy: Math.random() * 0.3 - 0.15,
      alpha: Math.random() * 0.5 + 0.3,
    });

    // Drawing a particle
    const drawParticle = (particle) => {
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 255, 255, ${particle.alpha})`;
      ctx.fill();
      ctx.closePath();
    };

    // Updating particle position
    const updateParticle = (particle) => {
      particle.x += particle.dx;
      particle.y += particle.dy;

      if (particle.x < 0 || particle.x > canvas.width) particle.dx *= -1;
      if (particle.y < 0 || particle.y > canvas.height) particle.dy *= -1;
    };

    // Animation loop
    const animateParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((particle) => {
        updateParticle(particle);
        drawParticle(particle);
      });
      requestAnimationFrame(animateParticles);
    };

    // Initializing particles
    for (let i = 0; i < maxParticles; i++) {
      particles.push(createParticle());
    }

    // Handling resize
    window.addEventListener("resize", resizeCanvas);

    animateParticles();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  return <canvas ref={canvasRef} className="particle-bg"></canvas>;
};

export default ParticlesBackground;
