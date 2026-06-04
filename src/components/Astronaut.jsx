import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Points } from "@react-three/drei";
import * as THREE from "three";

export function Astronaut(props) {
  const groupRef = useRef();
  const sphereRef = useRef();
  const ring1Ref = useRef();
  const ring2Ref = useRef();
  const ring3Ref = useRef();

  useFrame((state, delta) => {
    const time = state.clock.getElapsedTime();

    // Soft rotation of the main group based on time
    if (groupRef.current) {
      groupRef.current.rotation.y = time * 0.12;
      groupRef.current.rotation.x = Math.sin(time * 0.1) * 0.1;
    }

    // Spin the inner wireframe core sphere
    if (sphereRef.current) {
      sphereRef.current.rotation.y = -time * 0.3;
      sphereRef.current.rotation.z = time * 0.15;
    }

    // Rotate concentric rings on separate axes for a complex gyroscope look
    if (ring1Ref.current) {
      ring1Ref.current.rotation.x = time * 0.6;
      ring1Ref.current.rotation.y = time * 0.2;
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.y = -time * 0.45;
      ring2Ref.current.rotation.z = time * 0.3;
    }
    if (ring3Ref.current) {
      ring3Ref.current.rotation.z = time * 0.7;
      ring3Ref.current.rotation.x = -time * 0.4;
    }
  });

  // Pre-generate random point coordinates for the cyber particle cloud
  const particleCount = 120;
  const positions = new Float32Array(particleCount * 3);
  for (let i = 0; i < particleCount; i++) {
    const u = Math.random();
    const v = Math.random();
    const theta = u * 2.0 * Math.PI;
    const phi = Math.acos(2.0 * v - 1.0);
    const r = 1.3 + Math.random() * 0.45; // radius boundaries
    positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
    positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
    positions[i * 3 + 2] = r * Math.cos(phi);
  }

  return (
    <group ref={groupRef} {...props} dispose={null}>
      {/* 1. Core Pulsing 3D Holographic Sphere */}
      <mesh ref={sphereRef}>
        <icosahedronGeometry args={[0.75, 2]} />
        <meshBasicMaterial
          color="#33c2cc"
          wireframe
          transparent
          opacity={0.55}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* 2. Gyroscope Outer Rings */}
      {/* Ring 1 (Cyan/Aqua) */}
      <mesh ref={ring1Ref}>
        <torusGeometry args={[1.25, 0.025, 8, 64]} />
        <meshBasicMaterial 
          color="#33c2cc" 
          transparent 
          opacity={0.8} 
          blending={THREE.AdditiveBlending} 
        />
      </mesh>

      {/* Ring 2 (Magenta/Coral) */}
      <mesh ref={ring2Ref}>
        <torusGeometry args={[1.45, 0.02, 8, 64]} />
        <meshBasicMaterial 
          color="#ea4884" 
          transparent 
          opacity={0.7} 
          blending={THREE.AdditiveBlending} 
        />
      </mesh>

      {/* Ring 3 (Lavender) */}
      <mesh ref={ring3Ref}>
        <torusGeometry args={[1.65, 0.015, 8, 64]} />
        <meshBasicMaterial 
          color="#7a57db" 
          transparent 
          opacity={0.65} 
          blending={THREE.AdditiveBlending} 
        />
      </mesh>

      {/* 3. Orbiting Cyber Particle Cloud */}
      <Points positions={positions} stride={3}>
        <pointsMaterial
          color="#33c2cc"
          size={0.06}
          sizeAttenuation={true}
          transparent
          opacity={0.85}
          blending={THREE.AdditiveBlending}
        />
      </Points>
    </group>
  );
}
