/*jshint esversion: 6 */

// ---------------------
// Confetti Settings
// ---------------------
let maxParticleCount = 150; // Maximum number of confetti particles
let particleSpeed = 2; // Speed of the confetti animation

// Function declarations for confetti control
let startConfetti; // Function to start the confetti animation
let stopConfetti; // Function to stop adding new confetti particles
let toggleConfetti; // Function to start or stop confetti animation
let removeConfetti; // Function to stop the confetti animation and remove all particles

// Self-invoking function for confetti animation
(function () {
  // ---------------------
  // Internal Functions Definition
  // ---------------------
  startConfetti = startConfettiInner;
  stopConfetti = stopConfettiInner;
  toggleConfetti = toggleConfettiInner;
  removeConfetti = removeConfettiInner;

  // Color options for confetti particles
  let colors = [
    "DodgerBlue",
    "OliveDrab",
    "Gold",
    "Pink",
    "SlateBlue",
    "LightBlue",
    "Violet",
    "PaleGreen",
    "SteelBlue",
    "SandyBrown",
    "Chocolate",
    "Crimson",
  ];

  // Status of confetti animation
  let streamingConfetti = false;

  // Animation timer
  let animationTimer = null;

  // Array to hold confetti particles
  let particles = [];

  // Angle for confetti wave effect
  let waveAngle = 0;

  // Function to reset a confetti particle
  function resetParticle(particle, width, height) {
    particle.color = colors[Math.floor(Math.random() * colors.length)];
    particle.x = Math.random() * width;
    particle.y = Math.random() * height - height;
    particle.diameter = Math.random() * 10 + 5;
    particle.tilt = Math.random() * 10 - 10;
    particle.tiltAngleIncrement = Math.random() * 0.07 + 0.05;
    particle.tiltAngle = 0;
    return particle;
  }

  // Function to start the confetti animation
  function startConfettiInner() {
    let width = window.innerWidth;
    let height = window.innerHeight;

    // Request animation frame cross-browser compatibility
    window.requestAnimFrame = (function () {
      return (
        window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        function (callback) {
          return window.setTimeout(callback, 16.6666667);
        }
      );
    })();

    // Set up canvas for confetti
    let canvas = document.getElementById("confetti-canvas");
    if (canvas === null) {
      canvas = document.createElement("canvas");
      canvas.setAttribute("id", "confetti-canvas");
      canvas.setAttribute(
        "style",
        "display:block;z-index:999999;pointer-events:none"
      );
      document.body.appendChild(canvas);
      canvas.width = width;
      canvas.height = height;

      // Resize canvas with window
      window.addEventListener(
        "resize",
        function () {
          canvas.width = window.innerWidth;
          canvas.height = window.innerHeight;
        },
        true
      );
    }
    let context = canvas.getContext("2d");

    // Create confetti particles
    while (particles.length < maxParticleCount)
      particles.push(resetParticle({}, width, height));

    // Start confetti animation
    streamingConfetti = true;
    if (animationTimer === null) {
      (function runAnimation() {
        context.clearRect(0, 0, window.innerWidth, window.innerHeight);
        if (particles.length === 0) animationTimer = null;
        else {
          updateParticles();
          drawParticles(context);
          animationTimer = requestAnimFrame(runAnimation);
        }
      })();
    }
  }

  // Function to stop adding confetti
  function stopConfettiInner() {
    streamingConfetti = false;
  }

  // Function to remove all confetti
  function removeConfettiInner() {
    stopConfetti();
    particles = [];
  }

  // Function to toggle confetti
  function toggleConfettiInner() {
    if (streamingConfetti) stopConfettiInner();
    else startConfettiInner();
  }

  // Function to draw confetti particles on the canvas
  function drawParticles(context) {
    let particle;
    let x;
    for (let i = 0; i < particles.length; i++) {
      particle = particles[i];
      context.beginPath();
      context.lineWidth = particle.diameter;
      context.strokeStyle = particle.color;
      x = particle.x + particle.tilt;
      context.moveTo(x + particle.diameter / 2, particle.y);
      context.lineTo(x, particle.y + particle.tilt + particle.diameter / 2);
      context.stroke();
    }
  }

  // Function to update confetti particles
  function updateParticles() {
    let width = window.innerWidth;
    let height = window.innerHeight;
    let particle;
    waveAngle += 0.01;
    for (let i = 0; i < particles.length; i++) {
      particle = particles[i];
      if (!streamingConfetti && particle.y < -15) particle.y = height + 100;
      else {
        particle.tiltAngle += particle.tiltAngleIncrement;
        particle.x += Math.sin(waveAngle);
        particle.y +=
          (Math.cos(waveAngle) + particle.diameter + particleSpeed) * 0.5;
        particle.tilt = Math.sin(particle.tiltAngle) * 15;
      }
      if (particle.x > width + 20 || particle.x < -20 || particle.y > height) {
        if (streamingConfetti && particles.length <= maxParticleCount)
          resetParticle(particle, width, height);
        else {
          particles.splice(i, 1);
          i--;
        }
      }
    }
  }
})();
