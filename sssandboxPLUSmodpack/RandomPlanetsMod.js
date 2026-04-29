// MOD: RandomPlanetsMod.js
(function() {
    if (typeof Body === 'undefined') return console.error("KERNEL_ERROR: Body class missing.");

    // 1. REGISTER THE KEYBOARD LISTENER
    window.addEventListener('keydown', (e) => {
        if (e.key.toLowerCase() === 'r') {
            generateRandomChaos();
        }
    });

    // 2. THE CHAOS ENGINE
    window.generateRandomChaos = function() {
        if (window.logToKernel) logToKernel("INITIATING RANDOM_PLANET_GEN...");

        // Keep the Sun, delete the rest
        const sun = bodies.find(b => b.name === "SUN");
        bodies = sun ? [sun] : [];
        
        if (bodies.length === 0) {
            // Re-partition Sun if it was missing
            bodies.push(new Body(0, 0, 0, 0, 15000, '#fff500', 'SUN', true));
        }

        const PLANET_COUNT = 500;
        const RANGE = 1500000; // Fits the 1:100,000 scale neighborhood

        for (let i = 0; i < PLANET_COUNT; i++) {
            // Random Coordinates
            const ang = Math.random() * Math.PI * 2;
            const dist = 50000 + Math.random() * RANGE;
            const x = Math.cos(ang) * dist;
            const y = Math.sin(ang) * dist;

            // Random Physics
            const mass = 10 + Math.random() * 500;
            const color = `hsl(${Math.random() * 360}, 70%, 60%)`;
            
            // Random Velocity (Roughly orbital, but chaotic)
            const orbitVel = Math.sqrt((G * 15000) / dist) * (0.5 + Math.random());
            const vx = -Math.sin(ang) * orbitVel;
            const vy = Math.cos(ang) * orbitVel;

            const newPlanet = new Body(x, y, vx, vy, mass, color, `EXT-${i}`);
            bodies.push(newPlanet);
        }

        updateObjList();
        if (window.logToKernel) logToKernel(`SUCCESS: 100 PLANETS MOUNTED TO DRIVE`);
    };

    console.log("C:\> RandomPlanetsMod.js LOADED. PRESS 'R' FOR CHAOS.");
})();