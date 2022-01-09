
import React, {useEffect, useRef} from 'react';

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
    
    cone.position.set(0, 5, 0)

    scene.add(cone);

    return cone;
}

let initialValue;

const Knob = ({onChange, min = 0, max = 1, value = 0, color, title = '', width = 150, height = 150, radialSegments = 8}) => {
    const ref = useRef()
    
    let mouseDown = false,
        mouseX = 0,
        mouseY = 0,
        cone

    function onMouseMove(evt) {
        if (!mouseDown) {
            return;
        }

        evt.preventDefault();

        var deltaX = evt.clientX - mouseX,
            deltaY = evt.clientY - mouseY;
            mouseX = evt.clientX;
            mouseY = evt.clientY;
            rotateScene(deltaX, 0);
    }

    function onMouseDown(evt) {
        evt.preventDefault();

        mouseDown = true;
        mouseX = evt.clientX;
        mouseY = evt.clientY;
    }

    function onMouseUp(evt) {
        evt.preventDefault();

        mouseDown = false;
    }

    function addMouseHandler(canvas) {
        document.addEventListener('mousemove', function(e) {
            onMouseMove(e);
        }, false);
        canvas.addEventListener('mousedown', function(e) {
            onMouseDown(e);
        }, false);
        document.addEventListener('mouseup', function(e) {
            onMouseUp(e);
        }, false);
    }

    function rotateScene(deltaX, deltaY) {
        cone.rotation.y += deltaX / 100;
        cone.rotation.x += deltaY / 100;
        console.log(cone.rotation.y % Math.PI)
        const nornalisedRotation = (cone.rotation.y % (2 * Math.PI)) / (2 * Math.PI)

        const roundedVal = Math.abs(Math.round(nornalisedRotation * 10) / 10);
        onChange(((min / max) + roundedVal) * max)
    }

    useEffect(() => {
        const orbitRadius = width / 8.2 ;
        initialValue = value;

        const scene = new THREE.Scene();
        scene.background = null;
        const camera = new THREE.PerspectiveCamera( 75, 1, 0.1, 1000 );
        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha:true });
        renderer.setClearColor( 0xffffff, 0 );
        renderer.setSize(width, height);        

        const [light1, _] = addLights(scene, color);
        cone = addCone(scene, color, width, height, radialSegments)
        
        camera.position.y = orbitRadius

        camera.position.z = orbitRadius
        camera.position.x = 0

        ref.current.appendChild( renderer.domElement );
        // setControls(camera, renderer.domElement);
        addMouseHandler(ref.current);

        function animate() {
            requestAnimationFrame(animate);
            
            renderer.render(scene, camera);
        }
        animate();
    }, [ref])

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