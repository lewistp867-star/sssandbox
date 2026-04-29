// MOD: INFINITE_LABEL_SEE_ER
(function() {
    if (typeof Body === 'undefined') return console.error("KERNEL_ERROR: Body class not found.");

    // OVERWRITING THE RENDER KERNEL
    Body.prototype.drawBody = function() {
        if (!this.exists) return;

        // Relative Math for the 100k Scale
        const sX = (this.x - camX) * zoom + width / 2;
        const sY = (this.y - camY) * zoom + height / 2;
        const r = Math.max(0.2, this.getRadius() * zoom);
        
        // 1. Draw the Body
        ctx.beginPath();
        ctx.arc(sX, sY, r, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
        
        // 2. THE INFINITE TEXT-SEE-ER LOGIC
        // We removed the "if (zoom > 0.05)" check entirely.
        if (this.name) {
            // We make the font size slightly dynamic so it doesn't 
            // completely cover the screen when zoomed way out.
            const fontSize = Math.max(8, Math.min(12, 10 * (zoom * 10)));
            
            ctx.fillStyle = "#0f0"; // Retro Terminal Green
            ctx.font = fontSize + "px 'Courier New'";
            
            // Offset the text so it doesn't sit directly on the planet
            ctx.fillText(this.name.toUpperCase(), sX + r + 2, sY + 4);
            
            // Draw a tiny pointer line if we are zoomed out really far
            if (zoom < 0.001) {
                ctx.beginPath();
                ctx.strokeStyle = "rgba(0, 255, 0, 0.2)";
                ctx.moveTo(sX, sY);
                ctx.lineTo(sX + r + 2, sY);
                ctx.stroke();
            }
        }
    };

    if (window.logToKernel) {
        logToKernel("LABEL_CAP_REMOVED: TEXT IS NOW ETERNAL");
    } else {
        console.log("C:\> LABEL_CAP_REMOVED");
    }
})();