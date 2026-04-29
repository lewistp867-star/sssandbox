// MODULE: KINETIC_INJECTOR_v1
// TARGET: sssandboxPLUS v31.2+
(function() {
    console.log("INJECTING_KINETIC_KERNEL_HOOKS...");

    // Override the default context menu so we can right-click
    window.addEventListener('contextmenu', e => e.preventDefault());

    // Add the Right-Click Momentum Logic
    canvas.addEventListener('mousedown', e => {
        // Only trigger on Right Click (button 2)
        if (e.button !== 2) return;

        const wx = (e.clientX - width / 2) / zoom + camX;
        const wy = (e.clientY - height / 2) / zoom + camY;

        // Find the body you're clicking on
        for (let b of bodies) {
            const dist = Math.hypot(b.x - wx, b.y - wy);
            
            // Check if the click is within the body's radius (with a little padding)
            if (dist < b.getRadius() + 15/zoom) {
                console.log("APPLYING_BOOST: " + b.name);
                
                // Momentum change: p = m * v -> v = p / m
                // We add 500 momentum in the direction it's already traveling
                const boostAmount = 500 / b.mass;
                
                // Get current velocity direction
                const vMag = Math.hypot(b.vx, b.vy) || 1;
                const dirX = b.vx / vMag;
                const dirY = b.vy / vMag;

                // Apply the "Cooked" Energy
                b.vx += dirX * boostAmount;
                b.vy += dirY * boostAmount;

                // Visual Feedback: Flash the kernel status
                const status = document.getElementById('kernel-status');
                status.innerText = "KINETIC_BOOST: " + b.name + " (+500p)";
                status.style.color = "#ff0";
                
                return; // Only boost one body at a time
            }
        }
    });

    document.getElementById('kernel-status').innerText = "STATUS: INJECTOR_ACTIVE";
    console.log("RIGHT_CLICK_MOD_LOADED: Try boosting the Moon into Earth.");
})();