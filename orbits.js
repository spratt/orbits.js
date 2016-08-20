"use strict";
var Orbits = (function() {
    var canvas = document.getElementById('c');
    var context = canvas.getContext('2d');
    var mainBody = {
        get x() { return canvas.width/2; },
        get y() { return canvas.height/2; },
        radius: 100,
    };
    var orbits = [];

    function addOrbit(body, radiusMaj, radiusMin, rotation) {
        body = (typeof body === 'undefined') ? mainBody : body;
        if(radiusMaj >= radiusMin) {
            var temp = radiusMaj;
            radiusMaj = radiusMin;
            radiusMin = temp;
        }
        // smaller than 255, since we don't want overly light colors
        var max_color = 200;
        var r = Math.floor(Math.random() * max_color);
        var g = Math.floor(Math.random() * max_color);
        var b = Math.floor(Math.random() * max_color);
        var color = 'rgb(' + r + ',' + g + ',' + b + ')';
        console.log('random color: ' + color);
        orbits.push({body:body, radiusX:radiusMaj, radiusY:radiusMin,
                     rotation:rotation, color:color});
    }

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
        orbits = [];
        draw();
    }

    function draw() {
        console.log('drawing');
        context.clearRect(0, 0, canvas.width, canvas.height);
        orbits.forEach(function(o) {
            drawEllipse(o.body.x, o.body.y, o.radiusX, o.radiusY,
                        o.rotation, o.color);
        });
        drawDisk(mainBody.x, mainBody.y, mainBody.radius);
    }

    function resize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight - 70;
        draw();
    }

    function onLoad() {
        var useCapture = false;
        window.addEventListener('resize', resize, useCapture);
        resize();
        var addButton = document.getElementById('add');
        addButton.onclick = function() {
            var rmin = Number.parseInt(
                document.getElementById('radiusMin').value,
                10);
            var rmaj = Number.parseInt(
                document.getElementById('radiusMaj').value,
                10);
            addOrbit(mainBody, rmin, rmaj, Math.PI/2);
            draw();
        }
        addButton.onclick();
        document.getElementById('clear').onclick = clear;
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
