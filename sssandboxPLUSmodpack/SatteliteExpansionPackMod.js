// MODULE: TOTAL_AGENCY_OVERHAUL_V6
// DESCRIPTION: The complete fleet. Earth, Mars, Jupiter, Saturn, and Deep Space.
(function() {
    const pEarth = bodies.find(b => b.name === 'EARTH');
    const pMars = bodies.find(b => b.name === 'MARS');
    const pJup = bodies.find(b => b.name === 'JUPITER');
    const pSat = bodies.find(b => b.name === 'SATURN');
    const pMer = bodies.find(b => b.name === 'MERCURY');
    const pEur = bodies.find(b => b.name === 'EUROPA');
    const pPlu = bodies.find(b => b.name === 'PLUTO');
    const pSun = bodies.find(b => b.name === 'SUN');

    const fullFleet = [];

    // --- EARTH SECTOR ---
    if (pEarth) {
        fullFleet.push(
            { p: pEarth, d: 15, m: 0.0001, c: '#fff', n: 'ISS' },
            { p: pEarth, d: 22, m: 0.00005, c: '#0ff', n: 'HUBBLE' },
            { p: pEarth, d: 110, m: 0.00005, c: '#fc0', n: 'JWST' },
            { p: pEarth, d: 35, m: 0.00001, c: '#f0f', n: 'CHANDRA_XRAY' },
            { p: pEarth, d: 45, m: 0.00001, c: '#0f0', n: 'TESS' }
        );
    }

    // --- MARS SECTOR ---
    if (pMars) {
        fullFleet.push(
            { p: pMars, d: 10, m: 0.00001, c: '#f44', n: 'MARS_RECON' },
            { p: pMars, d: 7, m: 0.00001, c: '#fff', n: 'VIKING_1' },
            { p: pMars, d: 15, m: 0.00001, c: '#fa0', n: 'MAVEN' },
            { p: pMars, d: 12, m: 0.00001, c: '#0ff', n: 'MARS_ODYSSEY' }
        );
    }

    // --- JUPITER & MOONS ---
    if (pJup) {
        fullFleet.push(
            { p: pJup, d: 60, m: 0.00002, c: '#f50', n: 'JUNO' },
            { p: pJup, d: 80, m: 0.00002, c: '#ff0', n: 'GALILEO' }
        );
    }
    if (pEur) {
        fullFleet.push({ p: pEur, d: 8, m: 0.00001, c: '#0fa', n: 'EUROPA_CLIPPER' });
    }

    // --- SATURN SECTOR ---
    if (pSat) {
        fullFleet.push({ p: pSat, d: 45, m: 0.00002, c: '#fa0', n: 'CASSINI' });
    }

    // --- MERCURY SECTOR ---
    if (pMer) {
        fullFleet.push({ p: pMer, d: 10, m: 0.00001, c: '#fff', n: 'BEPICOLOMBO' });
    }

    // --- DEEP SPACE / ESCAPE TRAJECTORIES ---
    if (pSun) {
        // Voyager 1 (North)
        bodies.push(new Body(2500, 2500, -12, 12, 0.001, '#f0f', 'VOYAGER_1'));
        // Voyager 2 (South)
        bodies.push(new Body(-2500, -3000, 10, -10, 0.001, '#0f0', 'VOYAGER_2'));
        // Pioneer 10
        bodies.push(new Body(-4000, 500, -11, 2, 0.001, '#f80', 'PIONEER_10'));
        // Pioneer 11
        bodies.push(new Body(1000, 4000, 5, 11, 0.001, '#fa8', 'PIONEER_11'));
        // New Horizons (Pluto Flyby)
        if (pPlu) {
            bodies.push(new Body(pPlu.x - 150, pPlu.y - 100, pPlu.vx + 6, pPlu.vy + 2, 0.001, '#aaf', 'NEW_HORIZONS'));
        }
        // Parker Solar Probe
        fullFleet.push({ p: pSun, d: 85, m: 0.00001, c: '#fb0', n: 'PARKER_PROBE' });
        // Lucy (Trojan seeker)
        bodies.push(new Body(2000, -1500, -7, 9, 0.001, '#0fc', 'LUCY'));
    }

    // --- MOUNTING TO KERNEL ---
    fullFleet.forEach(sat => {
        if (!bodies.find(b => b.name === sat.n)) {
            const ang = Math.random() * 6.28;
            const v = Math.sqrt((G * sat.p.mass) / sat.d);
            bodies.push(new Body(
                sat.p.x + Math.cos(ang) * sat.d,
                sat.p.y + Math.sin(ang) * sat.d,
                sat.p.vx - Math.sin(ang) * v,
                sat.p.vy + Math.cos(ang) * v,
                sat.m, sat.c, sat.n
            ));
        }
    });

    updateObjList();
    if(window.logToKernel) logToKernel("SYSTEM_RESTORE: ALL 25+ SATELLITES MOUNTED.");
})();