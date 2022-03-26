# react-non-conformist-knob.

Knob React component for controlling a range of numerical values.
![knob-gif](https://user-images.githubusercontent.com/16067593/160250050-e91a60fe-43c1-4c59-abbb-8eafb9ce3d5c.gif)

After being un-happy with the current selection of knobs while working on one of my projects, decided to create this using three.js for a cooler user experience.

Demo: https://alexjilkin.github.io/react-non-conformist-knob/

## Usage

```JSX
const [value, setValue] = useState(1)

<Knob onChange={setValue} value={value} color={0x00ffff} />
```

## Types
```JSX
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
```
