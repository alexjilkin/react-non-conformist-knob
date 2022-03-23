# react-non-conformist-knob.

A non conformist knob to use with react.
After being un-happy with current selection of knobs while working on one of my projects, decided to create this using three.js for some cooler user experience.

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
