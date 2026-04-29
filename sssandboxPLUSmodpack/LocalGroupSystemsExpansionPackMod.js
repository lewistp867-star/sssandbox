// MOD: LOCAL_GROUP_MEGAKERNEL_v2_SCALED
(function() {
    if (typeof Body === 'undefined') return console.error("KERNEL_ERROR: Body class not found.");
    
    bodies = [];
    following = null;
    camX = 0; camY = 0; zoom = 0.001; // Zoom out even further

    // 1. THE SOLAR SYSTEM (The Core Partition)
    const sun = new Body(0, 0, 0, 0, 15000, '#fff500', 'SUN', true);
    bodies.push(sun);
    
    const solarPlanets = [
        { d: 250, m: 20, c: '#A5A5A5', n: 'MERCURY' },
        { d: 450, m: 50, c: '#E3BB76', n: 'VENUS' },
        { d: 750, m: 60, c: '#2271B3', n: 'EARTH', moons: [{ d: 45, m: 5, c: '#ddd', n: 'MOON' }] },
        { d: 1100, m: 40, c: '#E27B58', n: 'MARS', moons: [{ d: 25, m: 1, c: '#666', n: 'PHOBOS' }] },
        { d: 2400, m: 600, c: '#D39C7E', n: 'JUPITER', moons: [{ d: 90, m: 10, c: '#fff', n: 'IO' }] },
        { d: 3800, m: 500, c: '#C5AB6E', n: 'SATURN', moons: [{ d: 140, m: 15, c: '#fca', n: 'TITAN' }] },
        { d: 5200, m: 200, c: '#B5E2E2', n: 'URANUS' },
        { d: 6800, m: 210, c: '#3E54E8', n: 'NEPTUNE' },
        { d: 8200, m: 5, c: '#937D64', n: 'PLUTO' }    ];
    solarPlanets.forEach(p => {
        let v = Math.sqrt((G * 15000) / p.d), a = Math.random() * 6.28;
        bodies.push(new Body(Math.cos(a)*p.d, Math.sin(a)*p.d, -Math.sin(a)*v, Math.cos(a)*v, p.m, p.c, p.n));
    });

    // 2. ALPHA CENTAURI SYSTEM (~4.37 ly -> ~43,700 units)
    // We'll scale it slightly for "gameplay" but keep the 4:1 ratio
    const acX = 40000, acY = 15000;
    const acA = new Body(acX, acY, 0, 0, 18000, '#ffcc00', 'Alpha Centauri A', true);
    const acB = new Body(acX + 150, acY + 50, 0, 0, 13000, '#ff9900', 'Alpha Centauri B', true);
    const proxima = new Body(acX - 1200, acY + 3000, 0, 0, 2000, '#ff4444', 'Proxima Centauri', true);
    bodies.push(acA, acB, proxima);

    [{d: 60, m: 5, n: 'Proxima b'}, {d: 400, m: 15, n: 'Proxima c'}]
    .forEach(p => {
        let v = Math.sqrt((G * 2000) / p.d), a = Math.random() * 6.28;
        bodies.push(new Body(proxima.x + Math.cos(a)*p.d, proxima.y + Math.sin(a)*p.d, -Math.sin(a)*v, Math.cos(a)*v, p.m, '#0f0', p.n));
    });

    // 3. THE OUTER NEIGHBORHOOD (Scaled from Sun center)
    const outerStars = [
        {x: -65000, y: 55000, m: 32000, c: '#ffffff', n: 'Sirius A', p: 'Sirius b'},   // ~8.6 ly
        {x: 15000, y: -58000, m: 4000, c: '#ff3333', n: "Barnard's Star", p: "Barnard's b"}, // ~5.9 ly
        {x: -35000, y: 72000, m: 3000, c: '#ff5533', n: 'Wolf 359', p: 'Wolf 359 b'}, // ~7.8 ly
        {x: -85000, y: -45000, m: 12000, c: '#ffaa44', n: 'Epsilon Eridani', p: 'AEgir'} // ~10.5 ly
    ];

    outerStars.forEach(s => {
        let host = new Body(s.x, s.y, 0, 0, s.m, s.c, s.n, true);
        bodies.push(host);
        let pDist = 400, pMass = s.n === 'Sirius A' ? 10000 : 50;
        let v = Math.sqrt((G * s.m) / pDist);
        bodies.push(new Body(s.x + pDist, s.y, 0, v, pMass, '#aaaaff', s.p));
    });

    if (typeof updateObjList === 'function') updateObjList();
    console.log("KERNEL_MSG: Interstellar Scale Mounted. Zoom way out!");
})();