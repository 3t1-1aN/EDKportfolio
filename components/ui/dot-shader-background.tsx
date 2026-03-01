'use client'

import { useMemo, useEffect } from 'react'

import { Canvas, ThreeEvent, useFrame, useThree } from '@react-three/fiber'

import { shaderMaterial, useTrailTexture } from '@react-three/drei'

import { useTheme } from 'next-themes'

import * as THREE from 'three'

const DotMaterial = shaderMaterial(
  {
    time: 0,
    resolution: new THREE.Vector2(),
    dotColor: new THREE.Color('#FFFFFF'),
    bgColor: new THREE.Color('#121212'),
    mouseTrail: null,
    render: 0,
    rotation: 0,
    gridSize: 50,
    dotOpacity: 0.05
  },
  /* glsl */ `
    void main() {
      gl_Position = vec4(position.xy, 0.0, 1.0);
    }
  `,
  /* glsl */ `
    uniform float time;
    uniform int render;
    uniform vec2 resolution;
    uniform vec3 dotColor;
    uniform vec3 bgColor;
    uniform sampler2D mouseTrail;
    uniform float rotation;
    uniform float gridSize;
    uniform float dotOpacity;
    vec2 rotate(vec2 uv, float angle) {
        float s = sin(angle);
        float c = cos(angle);
        mat2 rotationMatrix = mat2(c, -s, s, c);
        return rotationMatrix * (uv - 0.5) + 0.5;
    }
    vec2 coverUv(vec2 uv) {
      vec2 s = resolution.xy / max(resolution.x, resolution.y);
      vec2 newUv = (uv - 0.5) * s + 0.5;
      return clamp(newUv, 0.0, 1.0);
    }
    float sdfCircle(vec2 p, float r) {
        return length(p - 0.5) - r;
    }
    void main() {
      vec2 screenUv = gl_FragCoord.xy / resolution;
      vec2 uv = coverUv(screenUv);
      vec2 rotatedUv = rotate(uv, rotation);
      // Create a grid
      vec2 gridUv = fract(rotatedUv * gridSize);
      vec2 gridUvCenterInScreenCoords = rotate((floor(rotatedUv * gridSize) + 0.5) / gridSize, -rotation);
      // Calculate distance from the center of each cell
      float baseDot = sdfCircle(gridUv, 0.25);
      // Screen mask
      float screenMask = smoothstep(0.0, 1.0, 1.0 - uv.y); // 0 at the top, 1 at the bottom
      vec2 centerDisplace = vec2(0.7, 1.1);
      float circleMaskCenter = length(uv - centerDisplace);
      float circleMaskFromCenter = smoothstep(0.5, 1.0, circleMaskCenter);
      
      float combinedMask = screenMask * circleMaskFromCenter;
      float circleAnimatedMask = sin(time * 2.0 + circleMaskCenter * 10.0);
      // Mouse trail effect
      float mouseInfluence = texture2D(mouseTrail, gridUvCenterInScreenCoords).r;
      
      float scaleInfluence = max(mouseInfluence * 0.5, circleAnimatedMask * 0.3);
      // Create dots with animated scale, influenced by mouse
      float dotSize = min(pow(circleMaskCenter, 2.0) * 0.3, 0.3);
      float sdfDot = sdfCircle(gridUv, dotSize * (1.0 + scaleInfluence * 0.5));
      float smoothDot = smoothstep(0.05, 0.0, sdfDot);
      float opacityInfluence = max(mouseInfluence * 50.0, circleAnimatedMask * 0.5);
      // Mix background color with dot color, using animated opacity to increase visibility
      vec3 composition = mix(bgColor, dotColor, smoothDot * combinedMask * dotOpacity * (1.0 + opacityInfluence));
      gl_FragColor = vec4(composition, 1.0);
      #include <tonemapping_fragment>
      #include <colorspace_fragment>
    }
  `
)

function Scene() {
  const size = useThree((s) => s.size)
  const viewport = useThree((s) => s.viewport)
  const { theme } = useTheme()

  const rotation = 0
  const gridSize = 100
  const getThemeColors = () => {
    switch (theme) {
      case 'dark':
        return {
          dotColor: '#FFFFFF', // White for dark theme
          bgColor: '#030301',
          dotOpacity: 0.08
        }
      case 'light':
        return {
          dotColor: '#666666', // Gray for light theme
          bgColor: '#F4F5F5',
          dotOpacity: 0.15
        }
      default:
        return {
          dotColor: '#FFFFFF', // White
          bgColor: '#030301',
          dotOpacity: 0.08
        }
    }
  }
  const themeColors = getThemeColors()
  const [trail, onMove] = useTrailTexture({
    size: 512,
    radius: 0.1,
    maxAge: 400,
    interpolate: 1,
    ease: function easeInOutCirc(x) {
      return x < 0.5 ? (1 - Math.sqrt(1 - Math.pow(2 * x, 2))) / 2 : (Math.sqrt(1 - Math.pow(-2 * x + 2, 2)) + 1) / 2
    }
  })
  const dotMaterial = useMemo(() => {
    return new DotMaterial()
  }, [])

  useEffect(() => {
    dotMaterial.uniforms.dotColor.value.setHex(themeColors.dotColor.replace('#', '0x'))
    dotMaterial.uniforms.bgColor.value.setHex(themeColors.bgColor.replace('#', '0x'))
    dotMaterial.uniforms.dotOpacity.value = themeColors.dotOpacity
  }, [theme, dotMaterial, themeColors])

  useFrame((state) => {
    dotMaterial.uniforms.time.value = state.clock.elapsedTime
  })

  // Global mouse tracking - listen to window events since Canvas is behind content
  useEffect(() => {
    const handleGlobalMouseMove = (e: MouseEvent) => {
      // The shader uses coverUv which scales coordinates based on aspect ratio
      // coverUv: vec2 s = resolution.xy / max(resolution.x, resolution.y);
      //         vec2 newUv = (uv - 0.5) * s + 0.5;
      // We need to apply coverUv transformation to match what the shader expects

      // Normalize mouse coordinates to [0-1] range
      const xNormalized = e.clientX / window.innerWidth
      const yNormalized = e.clientY / window.innerHeight

      // Calculate coverUv scale factors to match shader transformation
      const maxDim = Math.max(size.width, size.height)
      const scaleX = size.width / maxDim
      const scaleY = size.height / maxDim

      // Apply coverUv transformation to both X and Y
      const xCovered = ((xNormalized - 0.5) * scaleX) + 0.5
      const yCovered = ((yNormalized - 0.5) * scaleY) + 0.5

      // Flip Y for WebGL coordinate system (0=bottom, 1=top)
      const y = 1 - yCovered

      // Clamp to valid range [0-1]
      const clampedX = Math.max(0, Math.min(1, xCovered))
      const clampedY = Math.max(0, Math.min(1, y))

      // Create a synthetic Three.js event-like object
      // useTrailTexture will use these UV coordinates to update the trail texture
      const syntheticEvent = {
        uv: new THREE.Vector2(clampedX, clampedY),
        point: new THREE.Vector3((clampedX - 0.5) * 2, (clampedY - 0.5) * 2, 0),
        clientX: e.clientX,
        clientY: e.clientY,
        pointer: {
          x: e.clientX,
          y: e.clientY,
        },
      } as unknown as ThreeEvent<PointerEvent>

      onMove(syntheticEvent)
    }

    window.addEventListener('mousemove', handleGlobalMouseMove, { passive: true })

    return () => {
      window.removeEventListener('mousemove', handleGlobalMouseMove)
    }
  }, [onMove, size.width, size.height])

  const handlePointerMove = (e: ThreeEvent<PointerEvent>) => {
    onMove(e)
  }

  // Update material uniforms when size/viewport changes
  useEffect(() => {
    dotMaterial.uniforms.resolution.value.set(size.width * viewport.dpr, size.height * viewport.dpr)
    dotMaterial.uniforms.mouseTrail.value = trail
  }, [dotMaterial, size.width, size.height, viewport.dpr, trail])

  const scale = Math.max(viewport.width, viewport.height) / 2
  return (
    <mesh scale={[scale, scale, 1]} onPointerMove={handlePointerMove}>
      <planeGeometry args={[2, 2]} />
      <primitive
        object={dotMaterial}
        rotation={rotation}
        gridSize={gridSize}
        render={0}
      />
    </mesh>
  )
}

export const DotScreenShader = () => {
  return (
    <div className="w-full h-full">
      <Canvas
        gl={{
          antialias: true,
          powerPreference: 'high-performance',
          outputColorSpace: THREE.SRGBColorSpace,
          toneMapping: THREE.NoToneMapping
        }}
        style={{ width: '100%', height: '100%' }}
        camera={{ position: [0, 0, 1], fov: 75 }}
      >
        <Scene />
      </Canvas>
    </div>
  )
}

