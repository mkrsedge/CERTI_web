/* ═══════════════════════════════════════════════════════════
   CERTI — Hero WebGL scene
   An undulating field of points: quality signals converging
   into order. Ink dots on paper, a few red outliers.
   ═══════════════════════════════════════════════════════════ */

(function () {
  const canvas = document.getElementById('webgl');
  if (!canvas || typeof THREE === 'undefined') return;

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
    alpha: true,
    powerPreference: 'high-performance',
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(55, 1, 0.1, 100);
  camera.position.set(0, 2.4, 7.5);
  camera.lookAt(0, 0, 0);

  /* ── Point grid ── */
  const COLS = 160;
  const ROWS = 90;
  const W = 26;
  const H = 15;
  const COUNT = COLS * ROWS;

  const positions = new Float32Array(COUNT * 3);
  const seeds = new Float32Array(COUNT);      // per-point phase
  const accents = new Float32Array(COUNT);    // 1 = red outlier

  let i3 = 0;
  for (let y = 0; y < ROWS; y++) {
    for (let x = 0; x < COLS; x++) {
      const idx = y * COLS + x;
      positions[i3 + 0] = (x / (COLS - 1) - 0.5) * W;
      positions[i3 + 1] = 0;
      positions[i3 + 2] = (y / (ROWS - 1) - 0.5) * H;
      // deterministic pseudo-random from grid position
      const s = Math.sin(x * 12.9898 + y * 78.233) * 43758.5453;
      const r = s - Math.floor(s);
      seeds[idx] = r * Math.PI * 2;
      // 0 = charcoal, 1 = plum (signature), 2 = periwinkle (digital note)
      accents[idx] = r > 0.9925 ? 1 : (r < 0.0075 ? 2 : 0);
      i3 += 3;
    }
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute('aSeed', new THREE.BufferAttribute(seeds, 1));
  geometry.setAttribute('aAccent', new THREE.BufferAttribute(accents, 1));

  const uniforms = {
    uTime: { value: 0 },
    uAmp: { value: reduceMotion ? 0.25 : 0.9 },
    uMouse: { value: new THREE.Vector2(0, 0) },
    uInk: { value: new THREE.Color('#2C2C34') },
    uPlum: { value: new THREE.Color('#51344D') },
    uPeri: { value: new THREE.Color('#8E8EE0') },
    uPixelRatio: { value: Math.min(window.devicePixelRatio, 1.75) },
  };

  const material = new THREE.ShaderMaterial({
    uniforms,
    transparent: true,
    depthWrite: false,
    vertexShader: /* glsl */ `
      uniform float uTime;
      uniform float uAmp;
      uniform vec2 uMouse;
      uniform float uPixelRatio;
      attribute float aSeed;
      attribute float aAccent;
      varying float vElev;
      varying float vAccent;
      varying float vDist;

      void main() {
        vec3 p = position;

        // layered travelling waves — order emerging from noise
        float t = uTime * 0.55;
        float wave =
            sin(p.x * 0.55 + t) * 0.55
          + sin(p.z * 0.85 - t * 1.2) * 0.35
          + sin((p.x + p.z) * 0.35 + t * 0.7) * 0.45
          + sin(aSeed + t * 1.6) * 0.08;

        // mouse ripple: points lift near the cursor
        float md = distance(p.xz * vec2(1.0, 1.6), uMouse * vec2(13.0, 7.5));
        float ripple = smoothstep(3.5, 0.0, md) * 0.9;

        p.y += wave * uAmp + ripple;

        vElev = (wave * 0.5 + 0.5);
        vAccent = aAccent;

        vec4 mv = modelViewMatrix * vec4(p, 1.0);
        vDist = -mv.z;
        gl_Position = projectionMatrix * mv;

        float isAccent = min(aAccent, 1.0);
        float size = (1.4 + vElev * 1.6 + isAccent * 2.4 + ripple * 2.0);
        gl_PointSize = size * uPixelRatio * (6.0 / vDist);
      }
    `,
    fragmentShader: /* glsl */ `
      uniform vec3 uInk;
      uniform vec3 uPlum;
      uniform vec3 uPeri;
      varying float vElev;
      varying float vAccent;
      varying float vDist;

      void main() {
        // round point sprite
        vec2 uv = gl_PointCoord - 0.5;
        float d = length(uv);
        if (d > 0.5) discard;
        float soft = smoothstep(0.5, 0.32, d);

        // 0 = ink, 1 = plum (signature), 2 = periwinkle (digital)
        vec3 color = uInk;
        color = mix(color, uPlum, step(0.5, vAccent) * step(vAccent, 1.5));
        color = mix(color, uPeri, step(1.5, vAccent));
        float isAccent = step(0.5, vAccent);

        // fade with distance + crest emphasis
        float alpha = soft * mix(0.12, 0.5, vElev);
        alpha *= smoothstep(24.0, 8.0, vDist);
        alpha = max(alpha, soft * isAccent * 0.9);

        gl_FragColor = vec4(color, alpha);
      }
    `,
  });

  const points = new THREE.Points(geometry, material);
  points.rotation.x = 0.14;
  scene.add(points);

  /* ── Mouse parallax ── */
  const mouse = { x: 0, y: 0, tx: 0, ty: 0 };
  window.addEventListener('pointermove', (e) => {
    mouse.tx = (e.clientX / window.innerWidth) * 2 - 1;
    mouse.ty = (e.clientY / window.innerHeight) * 2 - 1;
  }, { passive: true });

  /* ── Resize ── */
  function resize() {
    const w = canvas.clientWidth || window.innerWidth;
    const h = canvas.clientHeight || window.innerHeight;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  }
  window.addEventListener('resize', resize);
  resize();

  /* ── Visibility: don't burn GPU offscreen ── */
  let visible = true;
  const hero = document.getElementById('hero');
  if ('IntersectionObserver' in window && hero) {
    new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; }, { threshold: 0 })
      .observe(hero);
  }

  /* ── Loop ── */
  const clock = new THREE.Clock();
  let rendered = false;

  function tick() {
    requestAnimationFrame(tick);
    if (!visible && rendered) return;
    if (reduceMotion && rendered) return; // single static frame

    const t = clock.getElapsedTime();
    uniforms.uTime.value = t;

    mouse.x += (mouse.tx - mouse.x) * 0.05;
    mouse.y += (mouse.ty - mouse.y) * 0.05;
    uniforms.uMouse.value.set(mouse.x, mouse.y);

    camera.position.x = mouse.x * 0.55;
    camera.position.y = 2.4 - mouse.y * 0.3;
    camera.lookAt(0, 0, 0);

    renderer.render(scene, camera);
    rendered = true;
  }
  tick();
})();
