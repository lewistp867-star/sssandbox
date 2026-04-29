// MODULE: ARCHEO_SOLAR_SYSTEM_3.5BYA_EXTENDED
// DESCRIPTION: Reconstructs the system 3.5BYA, including migrated Ice Giants.
(function() {
    bodies = [];
    following = null;
    camX = 0; camY = 0; zoom = 0.08;

    bodies.push(new Body(0, 0, 0, 0, 15000, '#ffaa00', 'SUN'));

    const archeanSystem = [
        { d: 250, m: 20, c: '#A5A5A5', n: 'MERCURY' },
        { d: 450, m: 50, c: '#E3BB76', n: 'VENUS' },
        { d: 750, m: 60, c: '#1a4d2e', n: 'EARTH', moons: [{ d: 25, m: 8, c: '#888', n: 'MOON' }] },
        { d: 1100, m: 45, c: '#4682b4', n: 'MARS', moons: [{ d: 20, m: 0.1, c: '#666', n: 'PHOBOS' }] },
        { d: 1800, m: 700, c: '#D39C7E', n: 'JUPITER' }, // Slightly closer
        { d: 2800, m: 550, c: '#C5AB6E', n: 'SATURN' },  // Much closer than today
        { d: 3800, m: 210, c: '#3E54E8', n: 'NEPTUNE' }, // Swapped & compact position!
        { d: 4500, m: 200, c: '#B5E2E2', n: 'URANUS' }   
    ];

    archeanSystem.forEach(p => {
        const ang = Math.random() * 6.28;
        const v = Math.sqrt((G * 15000) / p.d);
        const px = Math.cos(ang) * p.d;
        const py = Math.sin(ang) * p.d;
        const pvx = -Math.sin(ang) * v;
        const pvy = Math.cos(ang) * v;
        
        bodies.push(new Body(px, py, pvx, pvy, p.m, p.c, p.n));

        if (p.moons) {
            p.moons.forEach(m => {
                const mAng = Math.random() * 6.28;
                const mV = Math.sqrt((G * p.m) / m.d);
                bodies.push(new Body(
                    px + Math.cos(mAng) * m.d,
                    py + Math.sin(mAng) * m.d,
                    pvx - Math.sin(mAng) * mV,
                    pvy + Math.cos(mAng) * mV,
                    m.m, m.c, m.n
                ));
            });
        }
    });

    console.log("KERNEL_MSG: Archean System v2.0 Booted. Nice Model migration active.");
})();