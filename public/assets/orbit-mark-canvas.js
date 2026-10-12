/* AGENT ORBIT — the brand mark. Canvas 2D, multi-pass glow.
   Extracted VERBATIM from the authoritative logo sheet (uploads/agent-orbit-logo.html):
   three inclined orbital planes (equatorial orange, 42° cyan, 70° violet) carrying energy
   nodes with fading trails, a precision hexagon core, a 24-tick outer shell, a cyan
   scanline sweep every ~7s, and a click-to-pulse burst.
   Only the class name changed (EchoOrbitMark → AgentOrbitMark) to honour the product-name rule.

   Usage:
     <canvas id="mark" width="380" height="380"></canvas>
     <script src="assets/orbit-mark-canvas.js"></script>
     <script>
       const m = new AgentOrbitMark(document.getElementById('mark'));
       (function loop(){ m.render(); requestAnimationFrame(loop); })();
     </script>
   The canvas must be square. Set m.build = 1 before a single render() for a static,
   fully-materialised frame (thumbnails, print, prefers-reduced-motion). */

class AgentOrbitMark {
  constructor(canvas, opts = {}) {
    this.cv  = canvas;
    this.ctx = canvas.getContext('2d');
    this.S   = canvas.width;          // canvas is always square
    this.C   = this.S / 2;            // center
    this.t   = 0;                     // time counter
    this.build  = 0;                  // 0→1 materialization progress
    this.pulse  = 0;                  // 0→1 for manual pulse burst
    this.scan   = -1;                 // scanline Y position (-1 = inactive)
    this.scanTimer = 0;
    this.hovered = false;
    this.isSmall = this.S <= 32;
    this.isMini  = this.S <= 20;

    const R = this.S * 0.465;         // outer radius reference

    /* Orbital planes — each is an inclined ellipse */
    this.orbits = [
      /* Equatorial — large, orange, 2 nodes */
      {
        rx: R * 0.780, ry: R * 0.780, rot: 0,
        color: '#FF7515', glow: 'rgba(255,117,21,',
        speed: 0.0055, width: 1.0,
        nodes: [{ a: 0 }, { a: Math.PI }],
        trailLen: 0.55,
      },
      /* Inclined ~42° — cyan, 2 nodes */
      {
        rx: R * 0.610, ry: R * 0.210, rot: 0.32,
        color: '#4CC9F0', glow: 'rgba(76,201,240,',
        speed: 0.0095, width: 0.75,
        nodes: [{ a: 0.6 }, { a: 0.6 + Math.PI }],
        trailLen: 0.5,
      },
      /* Inclined ~70° — violet, 1 node */
      {
        rx: R * 0.440, ry: R * 0.100, rot: -0.52,
        color: '#9B5CF6', glow: 'rgba(155,92,246,',
        speed: -0.0120, width: 0.6,
        nodes: [{ a: 1.2 }],
        trailLen: 0.4,
      },
    ];

    /* Outer shell dimensions */
    this.shellR    = R * 0.978;     // outer precision ring
    this.shellRi   = R * 0.930;     // inner ring of outer shell
    this.hexR      = R * 0.142;     // central hexagon radius
    this.innerR    = R * 0.270;     // inner decorative ring

    /* Cardinal lines */
    this.cardinalLen = R * 0.055;
  }

  /* ── Orbital node position ─────────────────────────── */
  nodePos(o, angle) {
    const cosR = Math.cos(o.rot), sinR = Math.sin(o.rot);
    const ca = Math.cos(angle), sa = Math.sin(angle);
    return {
      x: this.C + (o.rx * ca * cosR - o.ry * sa * sinR),
      y: this.C + (o.rx * ca * sinR + o.ry * sa * cosR),
      depth: (Math.sin(angle - o.rot) + 1) / 2,  // 0=back 1=front
    };
  }

  /* ── Multi-pass glow draw ──────────────────────────── */
  withGlow(fn, passes, blur, alpha) {
    const ctx = this.ctx;
    for (let i = passes; i > 0; i--) {
      ctx.save();
      ctx.filter = `blur(${(i * blur)}px)`;
      ctx.globalAlpha = (alpha / passes) * (1 / i);
      fn(ctx);
      ctx.restore();
    }
    ctx.save();
    ctx.filter = 'none';
    ctx.globalAlpha = 1;
    fn(ctx);
    ctx.restore();
  }

  /* ── Draw outer precision shell ───────────────────── */
  drawShell(bp) {
    if (this.isSmall) return;
    const ctx = this.ctx, C = this.C;
    const sR = this.shellR, sRi = this.shellRi;

    // Outer ring
    this.withGlow(() => {
      ctx.beginPath();
      ctx.arc(C, C, sR, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(255,255,255,0.18)';
      ctx.lineWidth = 0.6;
      ctx.globalAlpha = bp;
      ctx.stroke();
    }, 2, 1.5, 0.4);

    // Inner ring of shell
    ctx.beginPath();
    ctx.arc(C, C, sRi, 0, Math.PI * 2);
    ctx.strokeStyle = 'rgba(255,255,255,0.06)';
    ctx.lineWidth = 0.5;
    ctx.globalAlpha = bp;
    ctx.stroke();
    ctx.globalAlpha = 1;

    // 24 tick marks — major at every 6th, minor elsewhere
    const tickCount = 24;
    for (let i = 0; i < tickCount; i++) {
      const angle = (i / tickCount) * Math.PI * 2 - Math.PI / 2;
      const isMajor = i % 6 === 0;
      const outer = sR + (isMajor ? 5.5 : 2.5) * (this.S / 380);
      const inner = sR;
      const x1 = C + Math.cos(angle) * inner;
      const y1 = C + Math.sin(angle) * inner;
      const x2 = C + Math.cos(angle) * outer;
      const y2 = C + Math.sin(angle) * outer;

      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.strokeStyle = isMajor ? 'rgba(255,117,21,0.6)' : 'rgba(255,255,255,0.2)';
      ctx.lineWidth = isMajor ? 1.2 : 0.6;
      ctx.globalAlpha = bp;
      ctx.stroke();
      ctx.globalAlpha = 1;
    }

    // Cardinal cross lines (subtle)
    for (let i = 0; i < 4; i++) {
      const angle = (i / 4) * Math.PI * 2;
      const fromR = sR + (this.S / 380) * 8;
      const toR   = sR + (this.S / 380) * 14;
      ctx.beginPath();
      ctx.moveTo(C + Math.cos(angle) * fromR, C + Math.sin(angle) * fromR);
      ctx.lineTo(C + Math.cos(angle) * toR, C + Math.sin(angle) * toR);
      ctx.strokeStyle = 'rgba(255,117,21,0.45)';
      ctx.lineWidth = 1.0;
      ctx.globalAlpha = bp;
      ctx.stroke();
      ctx.globalAlpha = 1;
    }
  }

  /* ── Draw orbital ellipses ─────────────────────────── */
  drawOrbit(o, idx, bp) {
    const ctx = this.ctx, C = this.C;
    // Progress per orbit: stagger the build-in
    const orbitBp = Math.min(1, Math.max(0, (bp - idx * 0.18) / 0.55));
    if (orbitBp <= 0) return;

    const sweep = Math.PI * 2 * orbitBp;

    ctx.save();
    ctx.translate(C, C);
    ctx.rotate(o.rot);
    ctx.scale(1, o.ry / o.rx);

    this.withGlow(() => {
      ctx.beginPath();
      ctx.arc(0, 0, o.rx, -Math.PI / 2, -Math.PI / 2 + sweep);
      ctx.strokeStyle = o.color;
      ctx.lineWidth = o.width * (this.S / 380) * (1 / (o.ry / o.rx));
      ctx.globalAlpha = 0.28;
      ctx.stroke();
    }, 3, 2.5, 0.8);

    ctx.restore();
  }

  /* ── Draw energy node + trail ──────────────────────── */
  drawNode(o, node, bp) {
    const ctx = this.ctx;
    const orbitBp = Math.min(1, Math.max(0, (bp - 0.45) / 0.55));
    if (orbitBp <= 0) return;
    const nodeAlpha = orbitBp;
    const scale = this.S / 380;

    // Trail (short arc of fading dots)
    const steps = this.isSmall ? 8 : 20;
    for (let i = steps; i >= 0; i--) {
      const ta = node.a - (i / steps) * o.trailLen;
      const p  = this.nodePos(o, ta);
      const fade = (1 - i / steps);
      const r = (this.isSmall ? 1.4 : 2.8) * scale * fade * p.depth * nodeAlpha;
      if (r < 0.1) continue;
      ctx.beginPath();
      ctx.arc(p.x, p.y, r, 0, Math.PI * 2);
      ctx.fillStyle = o.color;
      ctx.globalAlpha = fade * 0.5 * p.depth * nodeAlpha;
      ctx.fill();
    }
    ctx.globalAlpha = 1;

    const p = this.nodePos(o, node.a);

    // Node halo glow
    if (!this.isSmall) {
      const gr = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, 18 * scale);
      gr.addColorStop(0, o.color);
      gr.addColorStop(1, 'transparent');
      ctx.beginPath();
      ctx.arc(p.x, p.y, 18 * scale, 0, Math.PI * 2);
      ctx.fillStyle = gr;
      ctx.globalAlpha = 0.35 * p.depth * nodeAlpha;
      ctx.fill();
      ctx.globalAlpha = 1;
    }

    // Node core — white dot
    const coreR = (this.isSmall ? 1.8 : 4.2) * scale * (0.5 + 0.5 * p.depth) * nodeAlpha;
    this.withGlow(() => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, coreR, 0, Math.PI * 2);
      ctx.fillStyle = '#FFFFFF';
      ctx.globalAlpha = (0.7 + 0.3 * p.depth) * nodeAlpha;
      ctx.fill();
    }, this.isSmall ? 1 : 2, 1.5, 0.6);
    ctx.globalAlpha = 1;
  }

  /* ── Draw central precision hexagon ───────────────── */
  drawCenter(bp) {
    const ctx = this.ctx, C = this.C, scale = this.S / 380;
    const centerBp = Math.min(1, Math.max(0, (bp - 0.55) / 0.45));
    if (centerBp <= 0) return;

    if (!this.isSmall) {
      // Inner decorative ring
      this.withGlow(() => {
        ctx.beginPath();
        ctx.arc(C, C, this.innerR, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(255,255,255,0.10)';
        ctx.lineWidth = 0.5;
        ctx.globalAlpha = centerBp;
        ctx.stroke();
      }, 1, 2, 0.3);
      ctx.globalAlpha = 1;

      // 6 radial spokes from inner ring to hexagon
      const hR = this.hexR;
      const iR = this.innerR * 0.55;
      for (let i = 0; i < 6; i++) {
        const angle = (i / 6) * Math.PI * 2 - Math.PI / 6;
        const x1 = C + Math.cos(angle) * iR;
        const y1 = C + Math.sin(angle) * iR;
        const x2 = C + Math.cos(angle) * hR;
        const y2 = C + Math.sin(angle) * hR;
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.strokeStyle = 'rgba(255,255,255,0.12)';
        ctx.lineWidth = 0.5;
        ctx.globalAlpha = centerBp;
        ctx.stroke();
      }
      ctx.globalAlpha = 1;
    }

    // Hexagon
    const hR = this.hexR;
    const drawHex = () => {
      ctx.beginPath();
      for (let i = 0; i < 6; i++) {
        const angle = (i / 6) * Math.PI * 2 - Math.PI / 6;
        const x = C + Math.cos(angle) * hR;
        const y = C + Math.sin(angle) * hR;
        i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
      }
      ctx.closePath();
      ctx.strokeStyle = 'rgba(255,117,21,0.55)';
      ctx.lineWidth = 0.9 * scale;
      ctx.globalAlpha = centerBp;
      ctx.stroke();
    };
    this.withGlow(drawHex, 2, 3, 0.6);
    ctx.globalAlpha = 1;

    // Center glow core
    const coreSize = (this.isMini ? 3 : 6.5) * scale;
    const gr = ctx.createRadialGradient(C, C, 0, C, C, coreSize * 4);
    gr.addColorStop(0.0, 'rgba(255,245,230,1.0)');
    gr.addColorStop(0.25, 'rgba(255,117,21,0.7)');
    gr.addColorStop(0.6, 'rgba(255,117,21,0.15)');
    gr.addColorStop(1.0, 'transparent');

    ctx.beginPath();
    ctx.arc(C, C, coreSize * 4, 0, Math.PI * 2);
    ctx.fillStyle = gr;
    ctx.globalAlpha = centerBp;
    ctx.fill();

    ctx.beginPath();
    ctx.arc(C, C, coreSize, 0, Math.PI * 2);
    ctx.fillStyle = '#FFF5E4';
    ctx.globalAlpha = centerBp;
    ctx.fill();
    ctx.globalAlpha = 1;
  }

  /* ── Scanline materialization effect ──────────────── */
  drawScanLine() {
    if (this.isSmall || this.scan < 0) return;
    const ctx = this.ctx;
    const y = this.scan;
    const gr = ctx.createLinearGradient(0, y - 12, 0, y + 3);
    gr.addColorStop(0, 'transparent');
    gr.addColorStop(0.6, 'rgba(76,201,240,0.12)');
    gr.addColorStop(1, 'rgba(76,201,240,0.22)');
    ctx.fillStyle = gr;
    ctx.fillRect(0, y - 12, this.S, 15);

    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(this.S, y);
    ctx.strokeStyle = 'rgba(76,201,240,0.45)';
    ctx.lineWidth = 0.8;
    ctx.stroke();
  }

  /* ── Pulse burst (on click) ─────────────────────── */
  drawPulse() {
    if (this.pulse <= 0) return;
    const ctx = this.ctx, C = this.C;
    const r = (1 - this.pulse) * this.shellR * 1.2;
    const alpha = this.pulse;
    ctx.beginPath();
    ctx.arc(C, C, r, 0, Math.PI * 2);
    ctx.strokeStyle = `rgba(255,117,21,${alpha * 0.8})`;
    ctx.lineWidth = 1.5 * alpha;
    ctx.filter = `blur(${(1 - this.pulse) * 4}px)`;
    ctx.stroke();
    ctx.filter = 'none';
  }

  /* ── Main render ────────────────────────────────── */
  render() {
    const ctx = this.ctx;
    ctx.clearRect(0, 0, this.S, this.S);

    const bp = Math.min(1, this.build);
    const speed = this.hovered ? 1.6 : 1.0;

    // Scanline
    this.drawScanLine();

    // Shell
    this.drawShell(bp);

    // Orbits (back pass — dark orbital paths)
    this.orbits.forEach((o, i) => this.drawOrbit(o, i, bp));

    // Nodes — back-facing first (depth sort)
    this.orbits.forEach(o => {
      [...o.nodes]
        .sort((a, b) => this.nodePos(o, a.a).depth - this.nodePos(o, b.a).depth)
        .forEach(n => this.drawNode(o, n, bp));
    });

    // Center
    this.drawCenter(bp);

    // Pulse
    this.drawPulse();

    // Update state
    this.t += 0.016 * speed;
    if (this.build < 1) this.build += 0.006;
    if (this.pulse > 0) this.pulse -= 0.022;

    // Node angle update
    this.orbits.forEach(o => {
      o.nodes.forEach(n => { n.a += o.speed * speed; });
    });

    // Scanline timing
    if (!this.isSmall) {
      this.scanTimer++;
      if (this.scanTimer > 420 && this.scan < 0) {
        this.scan = 0;
        this.scanTimer = 0;
      }
      if (this.scan >= 0) {
        this.scan += 2.2;
        if (this.scan > this.S) this.scan = -1;
      }
    }
  }

  triggerPulse() {
    this.pulse = 1.0;
  }
}

if (typeof window !== 'undefined') window.AgentOrbitMark = AgentOrbitMark;
