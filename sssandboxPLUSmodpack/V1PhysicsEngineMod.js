// MODULE: V1_RETRO_KERNEL
// DESCRIPTION: Reverts physics to the exact v1 logic (unstable integration).
(function() {
    // 1. Reset Global Gravity to v1 value
    window.G = 0.8;

    // 2. Overwrite Body methods with the exact v1 logic
    // This removes the v29 collision/merging and delta-time scaling.
    
    Body.prototype.update = function(all) {
        // v1 used a simple forEach loop with no sub-stepping
        all.forEach(other => {
            if (other === this || !other.exists) return;
            const dx = other.x - this.x;
            const dy = other.y - this.y;
            const distSq = dx * dx + dy * dy;
            
            // Exact v1 distance check (unstable/no merging)
            if (distSq < 10) return;
            
            // v1 force calculation: (G * m1 * m2) / distSq
            const force = (G * this.mass * other.mass) / distSq;
            
            // v1 velocity change (dv = F/m)
            this.vx += (dx / Math.sqrt(distSq)) * (force / this.mass);
            this.vy += (dy / Math.sqrt(distSq)) * (force / this.mass);
        });

        // v1 simple position integration (no dt scaling)
        this.x += this.vx;
        this.y += this.vy;
    };

    // 3. Overwrite the draw method to include the v1 Trajectory Ghost
    Body.prototype.drawBody = function() {
        if (!this.exists) return;
        const screenX = (this.x - camX) * zoom + width / 2;
        const screenY = (this.y - camY) * zoom + height / 2;
        const radius = Math.max(1, Math.sqrt(this.mass) * zoom);

        // v1 Trajectory Logic (100 steps into the future)
        let tx = this.x;
        let ty = this.y;
        let tvx = this.vx;
        let tvy = this.vy;

        ctx.beginPath();
        ctx.strokeStyle = this.color + "55"; // Ghost trail
        ctx.moveTo(screenX, screenY);

        for (let i = 0; i < 100; i++) {
            bodies.forEach(other => {
                if (other === this || !other.exists) return;
                const dx = other.x - tx;
                const dy = other.y - ty;
                const distSq = dx * dx + dy * dy;
                if (distSq < 100) return;
                const force = (G * other.mass) / distSq;
                tvx += (dx / Math.sqrt(distSq)) * force;
                tvy += (dy / Math.sqrt(distSq)) * force;
            });
            tx += tvx;
            ty += tvy;
            const tsx = (tx - camX) * zoom + width / 2;
            const tsy = (ty - camY) * zoom + height / 2;
            ctx.lineTo(tsx, tsy);
        }
        ctx.stroke();

        // Draw the actual body arc
        ctx.beginPath();
        ctx.arc(screenX, screenY, radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
        
        // v1 label handling
        if (this.name && zoom > 0.1) {
            ctx.fillStyle = "#fff"; 
            ctx.font = "10px monospace";
            ctx.fillText(this.name, screenX + radius + 5, screenY + 5);
        }
    };

    console.log("KERNEL_DOWNGRADE: v1 Physics Engine successfully mounted. Larry is confused.");
})();