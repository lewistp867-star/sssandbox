// MOD: RELATIVE_CAMERA_FIX_v100K
// DESCRIPTION: Overwrites render logic to prevent floating-point jitter at interstellar scales.
(function() {
    if (typeof Body === 'undefined') return console.error("KERNEL_ERROR: System Core not found.");

    // 1. RE-SCALE THE UNIVERSE
    const LY = 100000; 
    bodies = [];
    following = null;
    camX = 0; camY = 0; zoom = 0.00002;

    // 2. PATCH THE RENDER ENGINE (The "Relative Math" Hijack)
    // We override how bodies draw themselves to ensure (camX, camY) is always the screen center
    Body.prototype.drawBody = function() {
        if (!this.exists) return;
        // The render math is now local to the camera
        const sX = (this.x - camX) * zoom + width / 2;
        const sY = (this.y - camY) * zoom + height / 2;
        const r = Math.max(0.2, this.getRadius() * zoom);
        
        ctx.beginPath();
        ctx.arc(sX, sY, r, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
        
        if (this.name && zoom > 0.00001) {
            ctx.fillStyle = "#fff"; ctx.font = "10px monospace";
            ctx.fillText(this.name.toUpperCase(), sX + r + 5, sY + 5);
        }
    };

    Body.prototype.drawTrail = function() {
        if (!this.exists || this.trail.length < 2) return;
        ctx.beginPath();
        ctx.strokeStyle = this.color + "44"; 
        ctx.moveTo((this.trail[0].x - camX) * zoom + width / 2, (this.trail[0].y - camY) * zoom + height / 2);
        for(let p of this.trail) {
            ctx.lineTo((p.x - camX) * zoom + width / 2, (p.y - camY) * zoom + height / 2);
        }
        ctx.stroke();
    };

    // 3. LOAD AUTHENTIC MAP NODES
    const sun = new Body(0, 0, 0, 0, 15000, '#fff500', 'SUN', true);
    bodies.push(sun);
    following = sun; // Anchor camera to Sun initially

    const neighborhood = [
        { d: 4.37 * LY,  a: 2.2,  n: 'ALPHA CENTAURI A', c: '#ffcc00', m: 18000 },
        { d: 4.24 * LY,  a: 2.3,  n: 'PROXIMA CEN',      c: '#ff4444', m: 2000 },
        { d: 8.6 * LY,   a: 3.8,  n: 'SIRIUS A',         c: '#ffffff', m: 32000 },
        { d: 5.9 * LY,   a: 1.1,  n: "BARNARD'S STAR",   c: '#ff3333', m: 4000 },
        { d: 7.8 * LY,   a: 0.5,  n: 'WOLF 359',         c: '#ff5533', m: 3000 },
        { d: 11.4 * LY,  a: 0.2,  n: 'PROCYON',          c: '#ffffff', m: 15000 }
    ];

    neighborhood.forEach(s => {
        let x = Math.cos(s.a) * s.d;
        let y = Math.sin(s.a) * s.d;
        bodies.push(new Body(x, y, 0, 0, s.m, s.c, s.n, true));
    });

    if (typeof updateObjList === 'function') updateObjList();
    console.log("KERNEL_PATCH: Relative Rendering Engaged. C:\> Interstellar Scale: 1:100,000");
})();