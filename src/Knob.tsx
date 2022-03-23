import * as React from 'react'
import useMouseRotation from './useMouseRotation'
import * as THREE from 'three'

const {useEffect, useRef} = React;
const addLights = (scene: THREE.Scene, color: THREE.Color) => {
  let light = new THREE.DirectionalLight(0xffffff, 0.4)
  light.position.set(-90, 400, 0)

  const hemiLight = new THREE.HemisphereLight(color, color, 0.3)
  scene.add(hemiLight)
  scene.add(light)

  return [light, hemiLight]
}

const addCone = (scene: THREE.Scene, color: THREE.Color, width: number, height: number, radialSegments: number) => {
  const geometry = new THREE.ConeGeometry(width / 8, height / 5.4, radialSegments)
  const cone = new THREE.Mesh(
    geometry,
    new THREE.MeshPhysicalMaterial({
      color,
    })
  )
  cone.rotation.x += 1
  cone.position.set(0, 5, 0)

  scene.add(cone)

  return cone
}

const createScene = (
  ref: React.RefObject<HTMLDivElement>,
  color: THREE.Color,
  orbitRadius: number,
  width: number,
  height: number
) => {
  const scene = new THREE.Scene()
  const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000)
  const renderer = new THREE.WebGLRenderer({antialias: true, alpha: true})
  addLights(scene, color)

  renderer.setClearColor(0xffffff, 0)
  renderer.setSize(width, height)

  scene.background = null
  camera.position.set(0, orbitRadius, orbitRadius)

  ref.current?.appendChild(renderer.domElement)

  function animate() {
    requestAnimationFrame(animate)

    renderer.render(scene, camera)
  }

  animate()

  return scene
}

const twoPI = 2 * Math.PI

type Props = {
  onChange: (value: number) => void
  min?: number
  max?: number
  value: number
  color: number
  title?: string
  width?: number
  height?: number
  radialSegments?: number
}

const Knob = ({
  onChange,
  min = 0,
  max = 1,
  value = 0,
  color,
  title = '',
  width = 150,
  height = 150,
  radialSegments = 8,
}: Props) => {
  const ref = useRef<HTMLDivElement>(null)
  const {addRotationHandler} = useMouseRotation(document)
  let scene = useRef<THREE.Scene>();
  let cone = useRef<THREE.Mesh>();

  useEffect(() => {
    scene.current = createScene(ref, new THREE.Color(color), width / 8, width, height)
    cone.current = addCone(scene.current, new THREE.Color(color), width, height, radialSegments)
    cone.current.rotation.y += ((value / max) % twoPI) * 100

    addRotationHandler(ref.current, handleRotation)
  }, [ref])

  const handleRotation = (deltaX: number, deltaY: number) => {
    if (!cone.current) {
      return;
    }

    cone.current.rotation.y += deltaX / 100
    cone.current.rotation.x += deltaY / 100

    const nornalisedRotation = (cone.current.rotation.y % twoPI) / twoPI
    const val = min + nornalisedRotation * (max - min)

    const roundedVal = Math.abs(Math.round(val * 10) / 10)

    onChange(roundedVal)
  }

  return (
    <div>
      <div style={{width, height, cursor: 'grab'}} ref={ref}></div>
      {title && <div style={{textAlign: 'center'}}>{title}</div>}
      <div style={{display: 'flex', justifyContent: 'center'}}>
        <div
          style={{
            borderTop: `solid 3px ${colorHexToString(new THREE.Color(color))}`,
            borderRadius: 1,
            textAlign: 'center',
            padding: 5,
            marginTop: 5,
          }}
        >
          {value}
        </div>
      </div>
    </div>
  )
}

const colorHexToString = (color: THREE.Color) => `#${('00000' + (color.getHex() | 0).toString(16)).slice(-6)}`

export default Knob
