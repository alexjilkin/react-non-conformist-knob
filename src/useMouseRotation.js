import React from 'react'

export default (document, min, max) => {
    let mouseDown = false,
    mouseX = 0,
    mouseY = 0,
    _onChange

    function onMouseMove(evt) {
        if (!mouseDown) {
            return;
        }

        evt.preventDefault();

        var deltaX = evt.clientX - mouseX,
            deltaY = evt.clientY - mouseY;
            mouseX = evt.clientX;
            mouseY = evt.clientY;
            _onChange(deltaX, 0);
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

    function addRotationHandler(canvas, onChange) {
        _onChange = onChange;

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

    return {addRotationHandler}
}