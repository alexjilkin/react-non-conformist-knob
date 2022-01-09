
import React, {useEffect, useRef} from 'react';
import useMouseRotation from './useMouseRotation';
import * as THREE from 'three'

const addLights = (scene, color) => {
    let light = new THREE.DirectionalLight( 0xffffff, 0.40 );
    light.position.set( -90, 400, 0 )

    const hemiLight = new THREE.HemisphereLight(color, color, 0.3);
    scene.add( hemiLight );
    scene.add( light );

    return [light, hemiLight]
}


const addCone = (scene, color = 'yellow', width, height) => {
    const geometry = new THREE.ConeGeometry( width / 8, height / 5.4, 9);
    const cone = new THREE.Mesh(geometry, new THREE.MeshPhysicalMaterial( {
        color
    }));
    cone.rotation.x += 1; 
    cone.position.set(0, 5, 0)

    scene.add(cone);

    return cone;
}

let initialValue;
const twoPI = 2 * Math.PI

const Knob = ({onChange, min = 0, max = 1, value = 0, color, title = '', width = 150, height = 150, radialSegments = 8}) => {
    const ref = useRef()
    const {addRotationHandler} = useMouseRotation(document, min, max);
    let cone;

    useEffect(() => {
        const orbitRadius = width / 8 ;
        initialValue = value;

        const scene = new THREE.Scene();
        scene.background = null;
        const camera = new THREE.PerspectiveCamera( 75, 1, 0.1, 1000 );
        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha:true });
        renderer.setClearColor( 0xffffff, 0 );
        renderer.setSize(width, height);        

        const [light1, _] = addLights(scene, color);
        cone = addCone(scene, color, width, height, radialSegments)
        cone.rotation.y += ((value / max) % twoPI) * 100
        camera.position.set(0, orbitRadius, orbitRadius)
        
        ref.current.appendChild( renderer.domElement );
        addRotationHandler(ref.current, handleRotation);

        function animate() {
            requestAnimationFrame(animate);
            
            renderer.render(scene, camera);
        }
        animate();
    }, [ref])

    const handleRotation = (deltaX, deltaY) => {
        cone.rotation.y += deltaX / 100;
        cone.rotation.x += deltaY / 100;
        
        const nornalisedRotation = (cone.rotation.y % twoPI) / (twoPI)
        const roundedVal = Math.abs(Math.round(nornalisedRotation * 10) / 10);
        
        onChange(min + (roundedVal * (max - min)))
    }

    return (
        <div>
            <div style={{width, height, cursor: 'grab'}} ref={ref}>
            </div>
            {title && <div style={{ textAlign: 'center'}}>
                {title}
            </div>
            }
            <div style={{display: 'flex', justifyContent: 'center'}}>
                <div style={{borderTop: `solid 3px ${colorHexToString(color)}`, borderRadius: 1, textAlign: 'center', padding: 5, marginTop: 5}}>
                    {value}
                </div>
            </div>
        </div>
        
    )
  }

const colorHexToString = (color) => `#${('00000' + (color | 0).toString(16)).slice(-6)}`
  
export default Knob