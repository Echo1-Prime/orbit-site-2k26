/* AGENT ORBIT — ACCENT LINES
   Running background lines for both themes: inclined orbital curves carrying comets with fading
   trails (the mark's own vocabulary), plus thin racing streaks that cross the surface.
   Colours are read from --ao-orbit / --ao-stellar / --ao-agent / --ao-bd-* on the canvas, so the
   same canvas follows dark and light. Under prefers-reduced-motion it paints one still frame.

   Always a background layer: it sits under cards, and cards carry an opaque page-ground backing
   so no line ever crosses a number. `dim` (0..1, default 1) sets the overall strength.

   const stop = AOAccentLines(canvas, { mode: 'both' | 'curves' | 'racing', speed: 0.9, dim: 1 });
   stop();  // tears down RAF + observers */
(function () {
  function AOAccentLines(canvas, opts) {
    opts = opts || {};
    var mode = opts.mode || 'both';
    var speed = opts.speed || 0.9;
    var dim = opts.dim == null ? 1 : opts.dim; /* approved: full strength; cards still occlude */
    var curves = mode !== 'racing', racing = mode !== 'curves';
    var ctx = canvas.getContext('2d');
    var host = canvas.parentElement;
    var reduce = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
    var w = 0, h = 0, raf = 0, col = {}, frame = 0, racers = [], nextRace = 0, prev = 0, clock = 0;

    var orbits = [
      /* sp = laps per second (4–6 min a lap); dr = plane rotation in rad/s (~25–35 min a turn) */
      { cx: 0.70, cy: 0.16, rx: 0.95, ry: 0.24, rot: -0.14, dr:  0.0030, c: 'orbit',   sp:  0.0036, ph: 0.4, comets: [0, Math.PI] },
      { cx: 0.12, cy: 0.88, rx: 0.85, ry: 0.34, rot: 0.22,  dr: -0.0024, c: 'stellar', sp: -0.0045, ph: 2.1, comets: [0] },
      { cx: 0.58, cy: 0.64, rx: 1.15, ry: 0.15, rot: -0.30, dr:  0.0020, c: 'agent',   sp:  0.0030, ph: 4.0, comets: [0] }
    ];

    function read() {
      var cs = getComputedStyle(canvas);
      var g = function (n) { return cs.getPropertyValue(n).trim(); };
      col = { orbit: g('--ao-orbit'), stellar: g('--ao-stellar'), agent: g('--ao-agent'), line: g('--ao-bd-1'), dim: g('--ao-bd-0') };
    }
    function size() {
      var r = host.getBoundingClientRect(), dpr = Math.min(2, window.devicePixelRatio || 1);
      w = r.width; h = r.height;
      canvas.width = Math.max(1, Math.round(w * dpr)); canvas.height = Math.max(1, Math.round(h * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      read();
      if (reduce) draw(0);
    }
    function pt(o, a) {
      var rot = o.rot + o.dr * clock * speed;
      var ex = Math.cos(a) * o.rx * w, ey = Math.sin(a) * o.ry * h, c = Math.cos(rot), s = Math.sin(rot);
      return [o.cx * w + ex * c - ey * s, o.cy * h + ex * s + ey * c];
    }
    function trail(points, color, width) {
      var n = points.length - 1;
      ctx.strokeStyle = color; ctx.lineCap = 'round';
      for (var i = 0; i < n; i++) {
        var k = 1 - i / n;
        ctx.globalAlpha = Math.pow(k, 1.7) * 0.85 * dim;
        ctx.lineWidth = 0.4 + width * k;
        ctx.beginPath(); ctx.moveTo(points[i][0], points[i][1]); ctx.lineTo(points[i + 1][0], points[i + 1][1]); ctx.stroke();
      }
    }
    function head(p, color, r) {
      ctx.globalAlpha = dim; ctx.fillStyle = color; ctx.shadowColor = color; ctx.shadowBlur = 6;
      ctx.beginPath(); ctx.arc(p[0], p[1], r, 0, Math.PI * 2); ctx.fill();
      ctx.shadowBlur = 0;
    }
    /* satellites: short lit streaks gliding across at 7–14 px/s, a minute or more to cross */
    function spawn(t, seeded) {
      var len = 60 + Math.random() * 80;
      racers.push({
        y: h * (0.08 + Math.random() * 0.84), x: seeded ? len + Math.random() * w : -len, len: len,
        v: (7 + Math.random() * 7) * speed, slope: -0.08 + Math.random() * 0.06,
        c: Math.random() < 0.6 ? 'stellar' : 'orbit'
      });
      nextRace = t + (mode === 'racing' ? 10 + Math.random() * 10 : 18 + Math.random() * 16) / speed;
    }
    function draw(t) {
      ctx.clearRect(0, 0, w, h);
      if (curves) {
        orbits.forEach(function (o) {
          ctx.globalAlpha = dim * 0.5; ctx.strokeStyle = col[o.c]; ctx.lineWidth = 1;
          ctx.beginPath();
          for (var i = 0; i <= 160; i++) { var p = pt(o, (i / 160) * Math.PI * 2); i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1]); }
          ctx.stroke();
          o.comets.forEach(function (off, ci) {
            var a = o.ph + off + o.sp * Math.PI * 2 * t * speed, dir = o.sp > 0 ? -1 : 1, pts = [];
            for (var j = 0; j <= 44; j++) pts.push(pt(o, a + dir * (j / 44) * 0.6));
            var c = col[o.c];
            trail(pts, c, ci ? 0.9 : 1.4);
            head(pts[0], c, ci ? 1.4 : 1.9);
          });
        });
      }
      if (racing) {
        racers.forEach(function (r) {
          var pts = [];
          for (var j = 0; j <= 24; j++) { var x = r.x - (j / 24) * r.len; pts.push([x, r.y + (x - r.x) * r.slope]); }
          trail(pts, col[r.c], 0.9);
        });
      }
      ctx.globalAlpha = 1;
    }
    function tick(now) {
      var dt = prev ? Math.min(0.05, (now - prev) / 1000) : 0;
      prev = now; clock += dt;
      if (++frame % 90 === 0) read();
      if (racing) {
        if (clock >= nextRace && racers.length < (mode === 'racing' ? 5 : 3)) spawn(clock);
        racers.forEach(function (r) { r.x += r.v * dt; r.y += r.v * dt * r.slope; });
        racers = racers.filter(function (r) { return r.x - r.len < w + 20; });
      }
      draw(clock);
      raf = requestAnimationFrame(tick);
    }

    var ro = new ResizeObserver(size);
    ro.observe(host);
    size();
    if (racing) { spawn(0, true); if (mode === 'racing') spawn(0, true); }
    if (!reduce) raf = requestAnimationFrame(tick);
    return function stop() { cancelAnimationFrame(raf); ro.disconnect(); };
  }
  window.AOAccentLines = AOAccentLines;
})();
