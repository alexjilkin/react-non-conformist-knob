import React, {useState} from 'react';
import ConeKnob from './ConeKnob'

const App = () => {
    const [value, setValue] = useState(0)
    const [value2, setValue2] = useState(0)

    return (
        <>
            <ConeKnob value={value} onChange={setValue} title="Test" />
            <ConeKnob value={value2} onChange={(v) => setValue2(Math.floor(v))} title="Another" min={1} max={10} color="lightgreen"/>
        </>
    )
}

export default App