// MODULE: THE_FINAL_REGISTRY_PATCH
(function() {
    const missingMoons = [
        { parent: 'JUPITER', moons: [
            { d: 80, m: 0.2, c: '#844', n: 'AMALTHEA' },
            { d: 900, m: 0.3, c: '#777', n: 'HIMALIA' }
        ]},
        { parent: 'SATURN', moons: [
            { d: 110, m: 3.5, c: '#ddd', n: 'RHEA' }, // Missing Giant
            { d: 65, m: 0.4, c: '#999', n: 'MIMAS' },
            { d: 85, m: 0.8, c: '#fff', n: 'ENCELADUS' },
            { d: 230, m: 0.3, c: '#642', n: 'HYPERION' }
        ]},
        { parent: 'URANUS', moons: [
            { d: 130, m: 4.5, c: '#eee', n: 'TITANIA' }, // Missing Giant
            { d: 55, m: 0.8, c: '#888', n: 'MIRANDA' },
            { d: 190, m: 0.2, c: '#555', n: 'PUCK' }
        ]},
        { parent: 'NEPTUNE', moons: [
            { d: 70, m: 0.6, c: '#777', n: 'PROTEUS' },
            { d: 500, m: 0.4, c: '#666', n: 'NEREID' }
        ]}
    ];

    missingMoons.forEach(system => {
        const parent = bodies.find(b => b.name === system.parent);
        if (parent) {
            system.moons.forEach(m => {
                if (!bodies.find(b => b.name === m.n)) {
                    const ang = Math.random() * 6.28;
                    const v = Math.sqrt((G * parent.mass) / m.d);
                    bodies.push(new Body(
                        parent.x + Math.cos(ang)*m.d, 
                        parent.y + Math.sin(ang)*m.d, 
                        parent.vx - Math.sin(ang)*v, 
                        parent.vy + Math.cos(ang)*v, 
                        m.m, m.c, m.n
                    ));
                }
            });
        }
    });
    updateObjList();
    if(window.logToKernel) logToKernel("MISSING_REGISTRY_PATCH: SUCCESSFUL");
})();