import React, {useState} from 'react';
import Knob from './Knob'

const App = () => {
    const [value, setValue] = useState(0)
    const [value2, setValue2] = useState(0)
    const [value3, setValue3] = useState(0)

    return (
        <div style={{display: 'flex', fontFamily: 'Roboto', fontWeight: 800}}>
            <span style={{margin: 10}}>
                <Knob value={value} onChange={setValue} title="Opacity" color="yellow"/>
            </span>
            <span style={{margin: 10}}>
                <Knob value={value2} onChange={(v) => setValue2(Math.floor(v))} title="Distortion" min={1} max={10} color="lightgreen" width={125} height={125}/>
            </span>
            <span style={{margin: 10}}>
                <Knob value={value3} onChange={setValue3} title="Blur" min={0} max={0.5} color="lightgreen" width={100} height={100}/>
            </span>
        </div>
    )
}

export default App