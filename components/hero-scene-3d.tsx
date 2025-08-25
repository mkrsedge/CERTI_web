'use client'

import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { Mesh } from 'three'

interface ComplianceNodeProps {
  position: [number, number, number]
  size: number
  color: string
  rotationSpeed: number
  type: 'quality' | 'compliance' | 'ai'
}

function ComplianceNode({ position, size, color, rotationSpeed, type }: ComplianceNodeProps) {
  const meshRef = useRef<Mesh>(null!)

  useFrame((state) => {
    if (meshRef.current) {
      // More subtle, precise movements for professional feel
      meshRef.current.rotation.x = state.clock.elapsedTime * rotationSpeed * 0.3
      meshRef.current.rotation.y = state.clock.elapsedTime * rotationSpeed * 0.2
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.8) * 0.2
      
      // Add pulsing effect for AI nodes
      if (type === 'ai') {
        const scale = 1 + Math.sin(state.clock.elapsedTime * 2) * 0.1
        meshRef.current.scale.setScalar(scale)
      }
    }
  })

  // Different geometries for different types
  const geometry = type === 'ai' ? (
    <octahedronGeometry args={[size, 0]} />
  ) : type === 'compliance' ? (
    <boxGeometry args={[size, size, size]} />
  ) : (
    <cylinderGeometry args={[size * 0.7, size * 0.7, size * 1.2, 8]} />
  )

  return (
    <mesh ref={meshRef} position={position}>
      {geometry}
      <meshStandardMaterial 
        color={color} 
        metalness={type === 'ai' ? 0.8 : 0.3}
        roughness={type === 'ai' ? 0.2 : 0.7}
      />
    </mesh>
  )
}

function DataConnection({ position, size, color }: { position: [number, number, number], size: number, color: string }) {
  const meshRef = useRef<Mesh>(null!)

  useFrame((state) => {
    if (meshRef.current) {
      // Subtle orbital movement representing data flow
      meshRef.current.rotation.z = state.clock.elapsedTime * 0.5
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 1.2) * 0.15
    }
  })

  return (
    <mesh ref={meshRef} position={position}>
      <torusGeometry args={[size, size * 0.3, 8, 16]} />
      <meshStandardMaterial 
        color={color} 
        wireframe 
        opacity={0.7}
        transparent
      />
    </mesh>
  )
}

export function HeroScene3D() {
  // Quality, Compliance, and AI themed nodes
  const complianceNodes = useMemo(() => [
    { position: [-2, 0, -1] as [number, number, number], size: 0.6, color: '#22c55e', rotationSpeed: 0.4, type: 'quality' as const },
    { position: [2, 1, -2] as [number, number, number], size: 0.5, color: '#3b82f6', rotationSpeed: -0.3, type: 'compliance' as const },
    { position: [0, -1, -1.5] as [number, number, number], size: 0.7, color: '#a9aecf', rotationSpeed: 0.5, type: 'ai' as const },
    { position: [-1.5, 2, -3] as [number, number, number], size: 0.4, color: '#8b5cf6', rotationSpeed: -0.2, type: 'ai' as const },
  ], [])

  // Data connection rings
  const dataConnections = useMemo(() => [
    { position: [2.5, -0.5, -2.5] as [number, number, number], size: 0.4, color: '#64748b' },
    { position: [-2.2, 1.8, -2.2] as [number, number, number], size: 0.3, color: '#94a3b8' },
    { position: [0.5, 0.8, -3] as [number, number, number], size: 0.35, color: '#cbd5e1' },
  ], [])

  return (
    <>
      {/* Professional lighting setup */}
      <ambientLight intensity={0.4} />
      <pointLight position={[10, 10, 10]} intensity={0.8} color="#ffffff" />
      <pointLight position={[-5, -5, -5]} intensity={0.3} color="#3b82f6" />
      <pointLight position={[5, -5, 5]} intensity={0.3} color="#22c55e" />
      
      {complianceNodes.map((node, index) => (
        <ComplianceNode key={index} {...node} />
      ))}
      
      {dataConnections.map((connection, index) => (
        <DataConnection key={index} {...connection} />
      ))}
    </>
  )
}
