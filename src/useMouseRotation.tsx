// @ts-nocheck

const useMouseRotation = (document: Document) => {
  let mouseDown = false,
    mouseX = 0,
    _onChange

  function onMouseMove(evt) {
    if (!mouseDown) {
      return
    }

    evt.preventDefault()

    var deltaX = evt.clientX - mouseX
  
    mouseX = evt.clientX
    _onChange(deltaX, 0)
  }

  function onMouseDown(evt) {
    evt.preventDefault()

    mouseDown = true
    mouseX = evt.clientX
  }

  function onMouseUp(evt) {
    evt.preventDefault()

    mouseDown = false
  }

  function addRotationHandler(canvas, onChange) {
    _onChange = onChange

    document.addEventListener(
      'mousemove',
      function (e) {
        onMouseMove(e)
      },
      false
    )
    canvas.addEventListener(
      'mousedown',
      function (e) {
        onMouseDown(e)
      },
      false
    )
    document.addEventListener(
      'mouseup',
      function (e) {
        onMouseUp(e)
      },
      false
    )
  }

  return {addRotationHandler}
}

export default useMouseRotation;