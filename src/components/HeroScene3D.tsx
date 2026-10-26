import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import { useTheme } from '../context/ThemeContext';
import { Sliders, Eye, EyeOff, RotateCw, Sparkles, SunMedium } from 'lucide-react';

interface HeroScene3DProps {
  onExploreClick?: () => void;
  onRequestQuoteClick?: () => void;
}

export const HeroScene3D: React.FC<HeroScene3DProps> = ({ onExploreClick, onRequestQuoteClick }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();

  // 3D Control state
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [autoRotate, setAutoRotate] = useState(true);
  const [emberGlow, setEmberGlow] = useState(1.0);
  const [materialFinish, setMaterialFinish] = useState<'graphite' | 'titanium' | 'champagne'>('graphite');

  // Mutable refs for render loop
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const emblemGroupRef = useRef<THREE.Group | null>(null);
  const orbitalRing1Ref = useRef<THREE.Mesh | null>(null);
  const orbitalRing2Ref = useRef<THREE.Mesh | null>(null);
  const embersGroupRef = useRef<THREE.Group | null>(null);
  const innerCoreMaterialRef = useRef<THREE.MeshStandardMaterial | null>(null);
  const outerShellMaterialRef = useRef<THREE.MeshStandardMaterial | null>(null);
  const pointerRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });

  // Update theme colors and scene background
  useEffect(() => {
    if (!sceneRef.current || !rendererRef.current) return;
    const isDark = theme === 'dark';
    const bgCol = isDark ? 0x101113 : 0xF4F0E8;
    sceneRef.current.background = new THREE.Color(bgCol);
    if (sceneRef.current.fog) {
      sceneRef.current.fog.color.setHex(bgCol);
    }
  }, [theme]);

  // Update glow & material finishes
  useEffect(() => {
    if (innerCoreMaterialRef.current) {
      const isDark = theme === 'dark';
      const baseEmissive = isDark ? 0xff5511 : 0xe95620;
      innerCoreMaterialRef.current.emissive.setHex(baseEmissive);
      innerCoreMaterialRef.current.emissiveIntensity = 0.5 * emberGlow;
    }

    if (outerShellMaterialRef.current) {
      if (materialFinish === 'graphite') {
        outerShellMaterialRef.current.color.setHex(0x181a1d);
        outerShellMaterialRef.current.metalness = 0.92;
        outerShellMaterialRef.current.roughness = 0.22;
      } else if (materialFinish === 'titanium') {
        outerShellMaterialRef.current.color.setHex(0x525862);
        outerShellMaterialRef.current.metalness = 0.95;
        outerShellMaterialRef.current.roughness = 0.15;
      } else if (materialFinish === 'champagne') {
        outerShellMaterialRef.current.color.setHex(0xb38a50);
        outerShellMaterialRef.current.metalness = 0.88;
        outerShellMaterialRef.current.roughness = 0.25;
      }
    }
  }, [emberGlow, materialFinish, theme]);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Detect software WebGL to adapt pixelRatio
    const isSoftwareGl = (() => {
      const gl = document.createElement('canvas').getContext('webgl2');
      if (!gl) return true;
      const ext = gl.getExtension('WEBGL_debug_renderer_info');
      const param = ext ? ext.UNMASKED_RENDERER_WEBGL : gl.RENDERER;
      const gpu = String(gl.getParameter(param));
      gl.getExtension('WEBGL_lose_context')?.loseContext();
      return /SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(gpu);
    })();

    // Scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    const isDark = theme === 'dark';
    const initBg = isDark ? 0x101113 : 0xF4F0E8;
    scene.background = new THREE.Color(initBg);
    scene.fog = new THREE.FogExp2(initBg, 0.055);

    // Camera
    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || 600;
    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 100);
    camera.position.set(0, 0.3, 7.5);
    cameraRef.current = camera;

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      antialias: !isSoftwareGl,
      powerPreference: 'high-performance',
      alpha: false,
    });
    rendererRef.current = renderer;
    renderer.setSize(width, height);
    renderer.setPixelRatio(isSoftwareGl ? 1 : Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = isDark ? 1.15 : 1.05;
    renderer.shadowMap.enabled = !isSoftwareGl;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    container.replaceChildren(renderer.domElement);

    // Studio Environment map (RoomEnvironment)
    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    scene.environment = pmremGenerator.fromScene(new RoomEnvironment(), 0.04).texture;
    pmremGenerator.dispose();

    // Lighting Rig
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);

    const hemiLight = new THREE.HemisphereLight(0xffeedd, 0x112233, 0.6);
    scene.add(hemiLight);

    const keyLight = new THREE.DirectionalLight(0xfff3e6, 2.2);
    keyLight.position.set(4, 5, 5);
    keyLight.castShadow = !isSoftwareGl;
    if (keyLight.castShadow) {
      keyLight.shadow.mapSize.width = 1024;
      keyLight.shadow.mapSize.height = 1024;
      keyLight.shadow.bias = -0.0005;
      keyLight.shadow.normalBias = 0.02;
    }
    scene.add(keyLight);

    const emberRimLight = new THREE.PointLight(0xff6a2a, 3.5, 12);
    emberRimLight.position.set(-3, -0.5, 3);
    scene.add(emberRimLight);

    const fillLight = new THREE.DirectionalLight(0xc8a879, 1.2);
    fillLight.position.set(-4, 3, -2);
    scene.add(fillLight);

    // Assemble the Forkframe Sculptural Emblem (Group of 5 composite parts)
    const masterGroup = new THREE.Group();
    emblemGroupRef.current = masterGroup;
    scene.add(masterGroup);

    // Part 1: Outer Graphite Angled Silhouette Frame
    const outerShape = new THREE.Shape();
    // Geometric stylized "F" frame:
    outerShape.moveTo(-1.3, -1.6);
    outerShape.lineTo(-0.7, -1.6);
    outerShape.lineTo(-0.7, 0.2);
    outerShape.lineTo(0.5, 0.2);
    outerShape.lineTo(0.8, 0.5);
    outerShape.lineTo(-0.7, 0.5);
    outerShape.lineTo(-0.7, 1.2);
    outerShape.lineTo(1.2, 1.2);
    outerShape.lineTo(1.5, 1.6);
    outerShape.lineTo(-1.3, 1.6);
    outerShape.closePath();

    const extrudeSettings1 = {
      depth: 0.35,
      bevelEnabled: true,
      bevelSegments: 4,
      steps: 1,
      bevelSize: 0.08,
      bevelThickness: 0.08,
    };

    const outerGeom = new THREE.ExtrudeGeometry(outerShape, extrudeSettings1);
    outerGeom.center();

    const outerMat = new THREE.MeshStandardMaterial({
      color: 0x191A1D,
      metalness: 0.92,
      roughness: 0.22,
    });
    outerShellMaterialRef.current = outerMat;

    const outerMesh = new THREE.Mesh(outerGeom, outerMat);
    outerMesh.castShadow = !isSoftwareGl;
    outerMesh.receiveShadow = !isSoftwareGl;
    masterGroup.add(outerMesh);

    // Part 2: Inner Radiant Ember Orange Fold Core (the triangular play-wedge/facet in the logo)
    const coreShape = new THREE.Shape();
    coreShape.moveTo(-0.25, -0.5);
    coreShape.lineTo(0.9, 0.4);
    coreShape.lineTo(-0.25, 1.0);
    coreShape.closePath();

    const coreExtrudeSettings = {
      depth: 0.42,
      bevelEnabled: true,
      bevelSegments: 4,
      steps: 1,
      bevelSize: 0.06,
      bevelThickness: 0.07,
    };

    const coreGeom = new THREE.ExtrudeGeometry(coreShape, coreExtrudeSettings);
    coreGeom.center();

    const coreMat = new THREE.MeshStandardMaterial({
      color: 0xff6a2a,
      emissive: 0xcc4410,
      emissiveIntensity: 0.5,
      metalness: 0.88,
      roughness: 0.18,
    });
    innerCoreMaterialRef.current = coreMat;

    const coreMesh = new THREE.Mesh(coreGeom, coreMat);
    coreMesh.position.set(0.12, 0.08, 0.05);
    masterGroup.add(coreMesh);

    // Part 3: Champagne Bevel Inset Accent (Secondary silhouette)
    const trimGeom = new THREE.TorusGeometry(1.65, 0.025, 16, 64);
    const trimMat = new THREE.MeshStandardMaterial({
      color: 0xc8a879,
      metalness: 0.95,
      roughness: 0.12,
    });
    const trimMesh = new THREE.Mesh(trimGeom, trimMat);
    trimMesh.rotation.x = Math.PI / 2.3;
    masterGroup.add(trimMesh);

    // Part 4: Orbital Metallic Rings (Tilted concentric luxury arcs)
    const ring1Geom = new THREE.TorusGeometry(2.35, 0.022, 16, 96);
    const ring1Mat = new THREE.MeshStandardMaterial({
      color: 0xff7b39,
      metalness: 0.9,
      roughness: 0.25,
      emissive: 0x331105,
    });
    const orbitalRing1 = new THREE.Mesh(ring1Geom, ring1Mat);
    orbitalRing1.rotation.x = Math.PI / 2.8;
    orbitalRing1.rotation.y = -Math.PI / 7;
    orbitalRing1Ref.current = orbitalRing1;
    masterGroup.add(orbitalRing1);

    const ring2Geom = new THREE.TorusGeometry(2.7, 0.018, 16, 96);
    const ring2Mat = new THREE.MeshStandardMaterial({
      color: 0xc8a879,
      metalness: 0.95,
      roughness: 0.15,
    });
    const orbitalRing2 = new THREE.Mesh(ring2Geom, ring2Mat);
    orbitalRing2.rotation.x = Math.PI / 2.1;
    orbitalRing2.rotation.y = Math.PI / 6;
    orbitalRing2Ref.current = orbitalRing2;
    masterGroup.add(orbitalRing2);

    // Part 5: Floating Glowing Embers / Pearls along orbit
    const embersGroup = new THREE.Group();
    embersGroupRef.current = embersGroup;
    masterGroup.add(embersGroup);

    const sphereGeom = new THREE.SphereGeometry(0.085, 24, 24);
    const sphereMat = new THREE.MeshStandardMaterial({
      color: 0xff8c42,
      emissive: 0xff4d00,
      emissiveIntensity: 0.6,
      metalness: 0.8,
      roughness: 0.2,
    });

    const emberCount = 6;
    for (let i = 0; i < emberCount; i++) {
      const angle = (i / emberCount) * Math.PI * 2;
      const sphere = new THREE.Mesh(sphereGeom, sphereMat);
      const r = 2.35;
      sphere.position.set(Math.cos(angle) * r, Math.sin(angle * 0.4) * 0.5, Math.sin(angle) * r);
      embersGroup.add(sphere);
    }

    // Grounding: Sleek Circular Stage Turntable beneath
    const podiumGeom = new THREE.CylinderGeometry(2.8, 3.1, 0.15, 64);
    const podiumMat = new THREE.MeshStandardMaterial({
      color: 0x141518,
      metalness: 0.85,
      roughness: 0.35,
    });
    const podium = new THREE.Mesh(podiumGeom, podiumMat);
    podium.position.y = -2.1;
    podium.receiveShadow = !isSoftwareGl;
    scene.add(podium);

    // Contact shadow plane directly on podium top
    const shadowPlaneGeom = new THREE.PlaneGeometry(5.2, 5.2);
    const shadowCanvas = document.createElement('canvas');
    shadowCanvas.width = 128;
    shadowCanvas.height = 128;
    const ctx = shadowCanvas.getContext('2d');
    if (ctx) {
      const grad = ctx.createRadialGradient(64, 64, 5, 64, 64, 64);
      grad.addColorStop(0, 'rgba(0, 0, 0, 0.7)');
      grad.addColorStop(0.5, 'rgba(0, 0, 0, 0.3)');
      grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 128, 128);
    }
    const shadowTex = new THREE.CanvasTexture(shadowCanvas);
    const shadowPlaneMat = new THREE.MeshBasicMaterial({
      map: shadowTex,
      transparent: true,
      depthWrite: false,
      opacity: 0.75,
    });
    const shadowPlane = new THREE.Mesh(shadowPlaneGeom, shadowPlaneMat);
    shadowPlane.rotation.x = -Math.PI / 2;
    shadowPlane.position.y = -2.02;
    scene.add(shadowPlane);

    // Pointer Parallax Handler
    const handlePointerMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      pointerRef.current.targetX = Math.max(-1, Math.min(1, x));
      pointerRef.current.targetY = Math.max(-1, Math.min(1, y));
    };

    window.addEventListener('mousemove', handlePointerMove);

    // Resize handler
    const handleResize = () => {
      if (!container || !renderer || !camera) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    // Animation Loop with Smooth Exponential Damping
    let frameId = 0;
    let clock = new THREE.Clock();

    function tick() {
      const delta = clock.getDelta();
      const elapsed = clock.getElapsedTime();

      // Exponential damping on pointer interaction
      pointerRef.current.x = THREE.MathUtils.damp(pointerRef.current.x, pointerRef.current.targetX, 4, delta);
      pointerRef.current.y = THREE.MathUtils.damp(pointerRef.current.y, pointerRef.current.targetY, 4, delta);

      // Parallax camera tilt
      camera.position.x = THREE.MathUtils.damp(camera.position.x, pointerRef.current.x * 0.9, 3, delta);
      camera.position.y = THREE.MathUtils.damp(camera.position.y, 0.3 + pointerRef.current.y * 0.5, 3, delta);
      camera.lookAt(0, 0.1, 0);

      // Emblem idle float and rotation
      if (masterGroup) {
        if (autoRotate) {
          masterGroup.rotation.y += delta * 0.28;
        }
        masterGroup.position.y = Math.sin(elapsed * 1.5) * 0.08;
      }

      // Orbital rings subtle counter-rotations
      if (orbitalRing1) {
        orbitalRing1.rotation.z += delta * 0.18;
      }
      if (orbitalRing2) {
        orbitalRing2.rotation.z -= delta * 0.12;
      }
      if (embersGroup) {
        embersGroup.rotation.y += delta * 0.32;
      }

      renderer.render(scene, camera);
      frameId = requestAnimationFrame(tick);
    }

    frameId = requestAnimationFrame(tick);

    // Clean up
    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      outerGeom.dispose();
      outerMat.dispose();
      coreGeom.dispose();
      coreMat.dispose();
      trimGeom.dispose();
      trimMat.dispose();
      ring1Geom.dispose();
      ring1Mat.dispose();
      ring2Geom.dispose();
      ring2Mat.dispose();
      sphereGeom.dispose();
      sphereMat.dispose();
      podiumGeom.dispose();
      podiumMat.dispose();
      shadowPlaneGeom.dispose();
      shadowPlaneMat.dispose();
      shadowTex.dispose();
    };
  }, []);

  return (
    <div className="relative w-full h-[620px] md:h-[720px] overflow-hidden select-none">
      {/* 3D WebGL Canvas Container */}
      <div ref={mountRef} className="absolute inset-0 w-full h-full cursor-grab active:cursor-grabbing" />

      {/* Atmospheric lighting gradient overlay (pure CSS background warmth) */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-[var(--bg-primary)] via-transparent to-transparent opacity-90" />
      <div className="absolute top-0 inset-x-0 h-32 pointer-events-none bg-gradient-to-b from-[var(--bg-primary)]/80 to-transparent" />

      {/* Hero Headline Overlay: Editorial typography with Zero-Pill and intentional spacing */}
      <div className="absolute inset-0 flex flex-col justify-between p-6 md:p-12 pointer-events-none max-w-7xl mx-auto">
        {/* Top Kicker */}
        <div className="pointer-events-auto flex items-center justify-between">
          <div className="flex items-center gap-3 text-xs tracking-wider uppercase text-[var(--accent-champagne)] font-medium">
            <span>Bespoke Digital Engineering</span>
            <span aria-hidden="true" className="text-white/30">/</span>
            <span>UK Food & Hospitality</span>
          </div>
        </div>

        {/* Center-Bottom Hero Text */}
        <div className="pointer-events-auto max-w-2xl mt-auto pb-16 md:pb-24">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-[var(--text-primary)] font-display leading-[1.08] text-balance">
            Cinematic Digital Experiences for Independent Food Brands.
          </h1>
          <p className="mt-4 text-base md:text-lg text-[var(--text-secondary)] leading-relaxed max-w-xl">
            We build high-performance websites, frictionless online ordering, digital menus, and creative assets designed specifically for UK restaurants, takeaways, and culinary innovators.
          </p>

          {/* Action CTAs */}
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <button
              onClick={onRequestQuoteClick}
              className="px-6 py-3.5 text-sm font-semibold text-white bg-[#FF6A2A] hover:bg-[#e95620] active:scale-[0.98] rounded-xl transition-all shadow-lg shadow-[#FF6A2A]/20 whitespace-nowrap"
            >
              Request a Bespoke Quote
            </button>
            <button
              onClick={onExploreClick}
              className="px-6 py-3.5 text-sm font-semibold text-[var(--text-primary)] bg-[var(--bg-elevated)]/90 hover:bg-[var(--bg-elevated)] border border-[var(--border-subtle)] rounded-xl transition-all whitespace-nowrap backdrop-blur-xs"
            >
              Explore Services & Tools
            </button>
          </div>
        </div>
      </div>

      {/* Ergonomic Collapsible Bottom 3D Dock (per Three.js Directive - Zero Center Viewport Occlusion) */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 pointer-events-auto flex flex-col items-center">
        {/* Toggle Drawer Button */}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="px-3 py-1.5 text-xs font-medium rounded-t-lg bg-[var(--bg-elevated)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] border border-b-0 border-[var(--border-subtle)] flex items-center gap-1.5 transition-colors shadow-md"
        >
          {isCollapsed ? <Eye className="w-3.5 h-3.5 text-[#FF6A2A]" /> : <EyeOff className="w-3.5 h-3.5" />}
          <span>{isCollapsed ? '3D Stage Controls' : 'Hide Controls'}</span>
        </button>

        {/* Collapsible Dock */}
        {!isCollapsed && (
          <div className="flex flex-wrap items-center gap-4 px-5 py-3 rounded-xl bg-[var(--bg-elevated)] border border-[var(--border-subtle)] shadow-2xl backdrop-blur-md max-w-[94vw] text-xs">
            {/* Auto-Rotation Toggle */}
            <button
              onClick={() => setAutoRotate(!autoRotate)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border transition-all ${
                autoRotate
                  ? 'bg-[#FF6A2A]/20 border-[#FF6A2A] text-[#FF6A2A] font-medium'
                  : 'bg-[var(--bg-surface)] border-transparent text-[var(--text-secondary)]'
              }`}
            >
              <RotateCw className="w-3.5 h-3.5" />
              <span>{autoRotate ? 'Rotating' : 'Paused'}</span>
            </button>

            {/* Ember Glow Slider */}
            <div className="flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-[#FF6A2A]" />
              <span className="text-[var(--text-secondary)]">Glow</span>
              <input
                type="range"
                min="0.2"
                max="2.0"
                step="0.1"
                value={emberGlow}
                onChange={(e) => setEmberGlow(parseFloat(e.target.value))}
                className="w-20 accent-[#FF6A2A] cursor-pointer"
              />
            </div>

            {/* Material Finish Swatches */}
            <div className="flex items-center gap-1.5 pl-2 border-l border-white/10">
              <span className="text-[var(--text-secondary)] mr-1">Finish:</span>
              <button
                onClick={() => setMaterialFinish('graphite')}
                className={`px-2.5 py-1 rounded-md border text-[11px] ${
                  materialFinish === 'graphite'
                    ? 'border-[#C8A879] bg-[#191A1D] text-[#F4F0E8] font-medium'
                    : 'border-transparent bg-transparent text-[var(--text-secondary)] hover:text-white'
                }`}
              >
                Graphite
              </button>
              <button
                onClick={() => setMaterialFinish('titanium')}
                className={`px-2.5 py-1 rounded-md border text-[11px] ${
                  materialFinish === 'titanium'
                    ? 'border-[#C8A879] bg-[#2d3037] text-white font-medium'
                    : 'border-transparent bg-transparent text-[var(--text-secondary)] hover:text-white'
                }`}
              >
                Titanium
              </button>
              <button
                onClick={() => setMaterialFinish('champagne')}
                className={`px-2.5 py-1 rounded-md border text-[11px] ${
                  materialFinish === 'champagne'
                    ? 'border-[#FF6A2A] bg-[#3a2e1d] text-[#C8A879] font-medium'
                    : 'border-transparent bg-transparent text-[var(--text-secondary)] hover:text-[#C8A879]'
                }`}
              >
                Champagne
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
