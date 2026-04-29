// MOD: PROXIMA_SYSTEM_AUTHENTIC_v3
// DESCRIPTION: Spatially relative Alpha Centauri system.
(function() {
    if (typeof Body === 'undefined') return console.error("KERNEL_ERROR: Body class not found.");

    // 1. The Anchors (Deep Space Sector: ~437,000 units out)
    const offsetX = 437000;
    const offsetY = 150000;

    // Alpha Centauri A & B (The Binary Pair)
    const acA = new Body(offsetX, offsetY, 0, 0, 18000, '#ffcc00', 'Alpha Centauri A', true);
    const acB = new Body(offsetX + 800, offsetY + 200, 0, 0, 13000, '#ff9900', 'Alpha Centauri B', true);
    
    // Proxima Centauri (The distant third wheel - ~15,000 units away from A/B)
    const proxima = new Body(offsetX - 10000, offsetY + 12000, 0, 0, 2000, '#ff4444', 'Proxima Centauri', true);

    bodies.push(acA, acB, proxima);

    // 2. Proxima's Planets (The Real Names & Proportional Dists)
    const proxPlanets = [
        {dist: 45, m: 0.3, c: '#666', n: 'Proxima d'},   // Closest
        {dist: 75, m: 1.1, c: '#842', n: 'Proxima b'},   // Earth-sized-ish
        {dist: 450, m: 7.0, c: '#468', n: 'Proxima c'}   // Way out there
    ];

    proxPlanets.forEach(p => {
        // Orbital velocity around Proxima's 2000 mass units
        const v = Math.sqrt((G * 2000) / p.dist);
        const a = Math.random() * 6.28;
        bodies.push(new Body(
            proxima.x + Math.cos(a) * p.dist,
            proxima.y + Math.sin(a) * p.dist,
            proxima.vx - Math.sin(a) * v,
            proxima.vy + Math.cos(a) * v,
            p.m, p.c, p.n
        ));
    });

    if (typeof updateObjList === 'function') updateObjList();
    console.log("KERNEL_MSG: Proxima System relocated to Authentic Deep Space Sector.");
})();