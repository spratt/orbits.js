"use strict";
var Orbits = (function() {
    var canvas = document.getElementById('c');
    var context = canvas.getContext('2d');

    function drawDisk(x, y, radius, color) {
        x = (typeof x === 'undefined') ? canvas.width/2 : x;
        y = (typeof y === 'undefined') ? canvas.height/2 : y;
        color = (typeof color === 'undefined') ? 'black' : color;
        radius = (typeof radius === 'undefined') ? 100 : radius;
        console.log('Drawing a disk at ' + x + ',' + y);
        context.beginPath();
        var start = 0;
        var end = 2 * Math.PI;
        var anticlockwise = false;
        context.arc(x, y, radius, start, end, anticlockwise);
        context.fillStyle = color;
        context.fill();
    }

    function drawEllipse(x, y, radiusX, radiusY, rotation, color) {
        x = (typeof x === 'undefined') ? canvas.width/2 : x;
        y = (typeof y === 'undefined') ? canvas.height/2 : y;
        radiusX = (typeof radiusX === 'undefined') ? 200 : radiusX;
        radiusY = (typeof radiusY === 'undefined') ? 150 : radiusY;
        rotation = (typeof rotation === 'undefined') ? 0 : rotation;
        color = (typeof color === 'undefined') ? 'black' : color;
        console.log('Drawing an ellipse at ' + x + ',' + y);
        context.beginPath();
        var start = 0;
        var end = 2 * Math.PI;
        var anticlockwise = false;
        context.ellipse(x, y, radiusX, radiusY,
                        rotation, start, end, anticlockwise);
        context.lineWidth = 1;
        context.strokeStyle = color;
        context.stroke();
    }

    function clear() {
        console.log('clearing');
        context.clearRect(0, 0, canvas.width, canvas.height);
    }

    function draw() {
        console.log('drawing');
        // draw planet
        drawDisk();
        // draw orbit
        drawEllipse();
    }

    function onLoad() {
        draw();
    }

    (function setupOnLoad() {
        var fn = function() {};
        
        if(typeof window.onload === 'function') {
            fn = window.onload;
        }
        
        window.onload = function() {
            onLoad();
            fn();
        }
    })();

    return {
        isWorking: true, canvas: canvas, context: context
    };
})();