"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";

export type ThreeBackgroundProps = {
  className?: string;
  speed?: number;
  scale?: number;
  turb?: number;
  pixelRatioLimit?: number;
};

export default function ThreeBackground({
  className = "fixed inset-0 -z-10",
  speed = 1.0,
  // <<< 1. ĐÃ SỬA: Tăng Scale để khói trông lớn và dày hơn
  scale = 1.5,
  turb = 1.0,
  pixelRatioLimit = 2,
}: ThreeBackgroundProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const stateRef = useRef({
    renderer: null as THREE.WebGLRenderer | null,
    scene: null as THREE.Scene | null,
    camera: null as THREE.OrthographicCamera | null,
    material: null as THREE.ShaderMaterial | null,
    cleanup: null as (() => void) | null,
  });

  const prevMouse = useRef(new THREE.Vector2(0.5, 0.5));
  const velocity = useRef(new THREE.Vector2(0, 0));

  useEffect(() => {
    let mounted = true;

    const vertexShader = `
      void main(){ 
        gl_Position = vec4(position, 1.0); 
      }
    `;

    const fragmentShader = `
      precision highp float;
      uniform vec2 u_resolution;
      uniform float u_time;
      uniform vec2 u_mouse;
      uniform vec2 u_mouse_velocity;
      uniform float u_speed;
      uniform float u_scale;
      uniform float u_turb;

      // ... (Các hàm hash2, noise, fbm giữ nguyên) ...
      vec2 hash2(vec2 p) {
        p = vec2(dot(p, vec2(127.1,311.7)),
                 dot(p, vec2(269.5,183.3)));
        return -1.0 + 2.0*fract(sin(p)*43758.5453123);
      }
      float noise(vec2 p){
        vec2 i = floor(p);
        vec2 f = fract(p);
        vec2 u = f*f*(3.0-2.0*f);
        float a = dot(hash2(i + vec2(0.0,0.0)), f - vec2(0.0,0.0));
        float b = dot(hash2(i + vec2(1.0,0.0)), f - vec2(1.0,0.0));
        float c = dot(hash2(i + vec2(0.0,1.0)), f - vec2(0.0,1.0));
        float d = dot(hash2(i + vec2(1.0,1.0)), f - vec2(1.0,1.0));
        return mix(mix(a,b,u.x), mix(c,d,u.x), u.y);
      }
      float fbm(vec2 p){
        float v = 0.0;
        float a = 0.5;
        mat2 rot = mat2(0.80, 0.60, -0.60, 0.80);
        for(int i=0;i<6;i++){
          v += a * noise(p);
          p = rot * p * 1.8;
          a *= 0.5;
        }
        return v;
      }

      void main(){
        vec2 uv = gl_FragCoord.xy / u_resolution.xy;
        vec2 pos = (uv - 0.5) * vec2(u_resolution.x/u_resolution.y, 1.0);
        vec2 npos = pos * u_scale;
        vec2 mousePos = (u_mouse - 0.5) * vec2(u_resolution.x/u_resolution.y, 1.0);
        
        vec2 diff = pos - mousePos;
        float dist = length(diff);
        
        float influence = exp(-dist*15.0) * 1.0; 
        float t = u_time * u_speed;
        
        vec2 vel = u_mouse_velocity * vec2(u_resolution.x/u_resolution.y, 1.0);
        float trail_strength = 5.0; 
        npos -= vel * trail_strength * influence;

        float angle = atan(diff.y, diff.x);
        float flow = cos(angle*2.0 + t*0.6) * 0.05;
        npos += (normalize(diff + 0.0001) * flow) * (0.5 + influence * 1.0);
        
        float f1 = fbm(npos + vec2(t*0.05, -t*0.02));
        float f2 = fbm(npos*1.8 + vec2(-t*0.1, t*0.08));
        float f3 = fbm(npos*3.6 + vec2(t*0.12, -t*0.06));
        
        float noise_val = f1*0.6 + f2*0.28 + f3*0.12;
        
        // <<< 2. ĐÃ SỬA: Giảm 0.15 -> 0.1 để khói dày hơn (hiển thị nhiều noise hơn)
        float smoke = smoothstep(0.4, 0.9, (noise_val + 1.0) * 0.5); 

        float turbulence = u_turb * influence * fbm(npos*8.0 + t*0.8);
        smoke += turbulence * 0.45;
        
        vec3 base = vec3(0.02, 0.05, 0.04);
        vec3 smokeColorDark = vec3(0.0, 0.5, 0.3);
        vec3 smokeColorLight = vec3(0.1, 0.8, 0.5);
        vec3 smokeColor = mix(smokeColorDark, smokeColorLight, f2*0.5 + f3*0.2); 
        vec3 col = mix(base, smokeColor, clamp(smoke, 0.0, 1.0));
        
        float glow = exp(-dist*6.0) * 0.3 * (0.7 + f1*0.5);
        vec3 glowColor = vec3(0.0, 0.8, 0.5);
        col += glow * glowColor;

        // <<< 3. ĐÃ SỬA: Tắt Vignette (tối viền) để khói lan full màn hình
        // float vign = smoothstep(0.9, 0.3, length(pos));
        // col *= vign;
        
        col = pow(col, vec3(0.9));
        
        gl_FragColor = vec4(col, 1.0);
      }
    `;

    const setup = () => {
      if (!mounted || !containerRef.current) return;
      const container = containerRef.current;
      const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, pixelRatioLimit));
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.outputColorSpace = THREE.SRGBColorSpace;
      container.appendChild(renderer.domElement);

      const scene = new THREE.Scene();
      const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
      const geometry = new THREE.PlaneGeometry(2, 2);

      const material = new THREE.ShaderMaterial({
        fragmentShader,
        vertexShader,
        uniforms: {
          u_time: { value: 0.0 },
          u_resolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
          u_mouse: { value: new THREE.Vector2(0.5, 0.5) },
          u_mouse_velocity: { value: new THREE.Vector2(0, 0) },
          u_speed: { value: speed },
          u_scale: { value: scale },
          u_turb: { value: turb },
        },
        depthWrite: false,
      });

      const mesh = new THREE.Mesh(geometry, material);
      scene.add(mesh);

      stateRef.current.renderer = renderer;
      stateRef.current.scene = scene;
      stateRef.current.camera = camera;
      stateRef.current.material = material;

      function onResize() {
        if (!stateRef.current.renderer || !stateRef.current.material) return;
        const w = window.innerWidth;
        const h = window.innerHeight;
        stateRef.current.renderer.setSize(w, h);
        stateRef.current.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, pixelRatioLimit));
        stateRef.current.material.uniforms.u_resolution.value.set(w, h);
      }
      window.addEventListener("resize", onResize, { passive: true });

      function setPointer(x: number, y: number) {
        if (!stateRef.current.material) return;
        const newX = x / window.innerWidth;
        const newY = 1.0 - y / window.innerHeight;
        stateRef.current.material.uniforms.u_mouse.value.set(newX, newY);
      }
      function onPointerMove(e: PointerEvent) { setPointer(e.clientX, e.clientY); }
      function onTouchMove(e: TouchEvent) { if (e.touches && e.touches[0]) setPointer(e.touches[0].clientX, e.touches[0].clientY); }
      window.addEventListener("pointermove", onPointerMove, { passive: true });
      window.addEventListener("touchmove", onTouchMove, { passive: true });

      const clock = new THREE.Clock();
      function animate() {
        if (!stateRef.current.renderer || !stateRef.current.scene || !stateRef.current.camera || !stateRef.current.material) {
          rafRef.current = requestAnimationFrame(animate);
          return;
        }
        const material = stateRef.current.material;
        const currentMouse = material.uniforms.u_mouse.value;
        const vX = currentMouse.x - prevMouse.current.x;
        const vY = currentMouse.y - prevMouse.current.y;
        velocity.current.x += vX;
        velocity.current.y += vY;
        velocity.current.multiplyScalar(0.95);
        prevMouse.current.copy(currentMouse);
        material.uniforms.u_mouse_velocity.value.copy(velocity.current);
        material.uniforms.u_time.value = clock.getElapsedTime();
        stateRef.current.renderer.render(stateRef.current.scene, stateRef.current.camera);
        rafRef.current = requestAnimationFrame(animate);
      }
      rafRef.current = requestAnimationFrame(animate);

      const cleanup = () => {
        if (rafRef.current) cancelAnimationFrame(rafRef.current);
        window.removeEventListener("resize", onResize);
        window.removeEventListener("pointermove", onPointerMove);
        window.removeEventListener("touchmove", onTouchMove);
        try {
          if (stateRef.current.renderer) {
            if (container.contains(stateRef.current.renderer.domElement)) {
              container.removeChild(stateRef.current.renderer.domElement);
            }
            stateRef.current.renderer.dispose();
          }
          stateRef.current.material?.dispose();
          geometry.dispose();
        } catch (e) { console.error("Lỗi khi dọn dẹp Three.js:", e); }
        stateRef.current.renderer = null;
        stateRef.current.material = null;
        stateRef.current.scene = null;
        stateRef.current.camera = null;
        rafRef.current = null;
      };
      stateRef.current.cleanup = cleanup;
    };
    setup();

    return () => {
      mounted = false;
      if (stateRef.current.cleanup) {
        stateRef.current.cleanup();
      }
    };
  }, [speed, scale, turb, pixelRatioLimit]);

  return <div ref={containerRef} className={className} aria-hidden />;
}