"use strict";
var Blumenwiese2;
(function (Blumenwiese2) {
    window.addEventListener("load", handleLoad);
    let x;
    let golden = 0.38;
    let horizon;
    let layer;
    let backgroundimage;
    let cloud1;
    let cloud2;
    function handleLoad() {
        let canvas = document.querySelector("canvas");
        if (!canvas)
            return;
        Blumenwiese2.crc2 = canvas.getContext("2d");
        horizon = Blumenwiese2.crc2.canvas.height * golden;
        drawBackground();
        cloud1 = new Blumenwiese2.Cloud(new Blumenwiese2.Vector(1250, -10), 0.6, 20, 40);
        cloud2 = new Blumenwiese2.Cloud(new Blumenwiese2.Vector(930, 0), 1, 35, 50);
        cloud1.draw();
        cloud2.draw();
        let bee = new Blumenwiese2.Bee(new Blumenwiese2.Vector(100, 100), new Blumenwiese2.Vector(20, 0), 2);
        bee.draw();
        //drawBeehive();
        //window.setInterval(update, 20);
    }
    function createRandomValueInRange(_min, _max) {
        return _min + Math.random() * (_max - _min);
    }
    Blumenwiese2.createRandomValueInRange = createRandomValueInRange;
    function drawBackground() {
        console.log("Background with mountains and meadow");
        let gradient = Blumenwiese2.crc2.createLinearGradient(0, 0, 0, Blumenwiese2.crc2.canvas.height);
        gradient.addColorStop(0, "lightblue");
        gradient.addColorStop(0.35, "white");
        gradient.addColorStop(0.38, "#B3BF54");
        gradient.addColorStop(1, "#6F8C30");
        Blumenwiese2.crc2.fillStyle = gradient;
        Blumenwiese2.crc2.fillRect(0, 0, Blumenwiese2.crc2.canvas.width, Blumenwiese2.crc2.canvas.height);
        drawSun(new Blumenwiese2.Vector(Blumenwiese2.crc2.canvas.width * 0.15, Blumenwiese2.crc2.canvas.height * 0.1));
        drawMountains(new Blumenwiese2.Vector(0, horizon), 40, 100, "grey", "white", "silver");
        drawMountains(new Blumenwiese2.Vector(0, horizon), 20, 60, "saddleBrown", "tan", "sienna");
        drawMeadow();
        //save image to use for animation:
        backgroundimage = Blumenwiese2.crc2.getImageData(0, 0, Blumenwiese2.crc2.canvas.width, Blumenwiese2.crc2.canvas.height);
    }
    function update() {
        //drawBackground();
        Blumenwiese2.crc2.putImageData(backgroundimage, 0, 0);
        cloud1.move(1 / 50);
        cloud1.draw();
        cloud2.move(1 / 50);
        cloud2.draw();
    }
    function drawSun(_position) {
        let r1 = 40;
        let r2 = 300;
        let gradient = Blumenwiese2.crc2.createRadialGradient(0, 0, r1, 0, 0, r2);
        gradient.addColorStop(0, "HSLA(60, 100%, 90%, 1)");
        gradient.addColorStop(0.1, "HSLA(60, 100%, 90%, 0.5)");
        gradient.addColorStop(0.2, "HSLA(60, 100%, 90%, 0.3)");
        gradient.addColorStop(1, "HSLA(60, 100%, 80%, 0)");
        Blumenwiese2.crc2.save();
        Blumenwiese2.crc2.translate(_position.x, _position.y);
        Blumenwiese2.crc2.fillStyle = gradient;
        Blumenwiese2.crc2.arc(0, 0, r2, 0, 2 * Math.PI);
        Blumenwiese2.crc2.fill();
        Blumenwiese2.crc2.restore();
    }
    function drawMountains(_position, _min, _max, _colorLow, _colorHigh, _strokeColor) {
        let stepMin = 30;
        let stepMax = 70;
        x = 0;
        Blumenwiese2.crc2.save();
        Blumenwiese2.crc2.translate(_position.x, _position.y);
        Blumenwiese2.crc2.beginPath();
        Blumenwiese2.crc2.moveTo(0, 0);
        Blumenwiese2.crc2.lineTo(0, -_max);
        do {
            x += createRandomValueInRange(stepMin, stepMax);
            let y = createRandomValueInRange(-_min, -_max);
            Blumenwiese2.crc2.lineTo(x, y);
        } while (x < Blumenwiese2.crc2.canvas.width);
        Blumenwiese2.crc2.lineTo(x, 0);
        Blumenwiese2.crc2.closePath();
        let gradient = Blumenwiese2.crc2.createLinearGradient(0, 0, 0, -_max);
        gradient.addColorStop(0, _colorLow);
        gradient.addColorStop(0.8, _colorHigh);
        Blumenwiese2.crc2.fillStyle = gradient;
        Blumenwiese2.crc2.fill();
        Blumenwiese2.crc2.strokeStyle = _strokeColor;
        Blumenwiese2.crc2.stroke();
        Blumenwiese2.crc2.restore();
    }
    function drawMeadow() {
        Blumenwiese2.crc2.save();
        Blumenwiese2.crc2.translate(0, horizon);
        let yMin = 0;
        let yMax = 20;
        let scale = 0.5;
        let distance = 2;
        layer = 0;
        do {
            Blumenwiese2.crc2.save();
            Blumenwiese2.crc2.scale(scale, scale);
            drawMeadowLayer(yMin, yMax, distance, layer);
            yMin = yMax * 0.8;
            yMax = yMax * 1.25;
            scale = scale * 1.7;
            distance = distance * 0.8;
            Blumenwiese2.crc2.restore();
            layer++;
        } while (layer < 7);
        Blumenwiese2.crc2.restore();
    }
    function drawMeadowLayer(_yMin, _yMax, _distance, _layer) {
        let y;
        layer = _layer;
        //Grasschicht
        for (let step = 0; step < Blumenwiese2.crc2.canvas.width * 2; step += _distance) {
            y = createRandomValueInRange(_yMin, _yMax);
            Blumenwiese2.crc2.save();
            Blumenwiese2.crc2.translate(step, y);
            let grassblade = new Blumenwiese2.Grassblade();
            grassblade.draw();
            Blumenwiese2.crc2.restore();
        }
        //Blumenschicht
        for (let stepWidth = createRandomValueInRange(0, 60); stepWidth < Blumenwiese2.crc2.canvas.width * 2; stepWidth += createRandomValueInRange(20, 100)) {
            y = createRandomValueInRange(_yMax * 0.9, _yMax * 1.3);
            Blumenwiese2.crc2.save();
            Blumenwiese2.crc2.translate(stepWidth, y);
            let flower = new Blumenwiese2.Flower();
            flower.draw();
            Blumenwiese2.crc2.restore();
        }
        //Bäume
        if (layer == 2) {
            let tree = new Blumenwiese2.Tree(new Blumenwiese2.Vector(Blumenwiese2.crc2.canvas.width / 2, _yMax), "#0A420E");
            tree.draw();
            let tree2 = new Blumenwiese2.Tree(new Blumenwiese2.Vector(0, _yMax), "#025928");
            tree2.draw();
        }
        else if (layer == 1) {
            let tree = new Blumenwiese2.Tree(new Blumenwiese2.Vector(Blumenwiese2.crc2.canvas.width / 2, _yMax), "#015838");
            tree.draw();
        }
        //Bienenkasten
        if (layer == 5) {
            drawBeehive(_yMax);
        }
    }
    function drawBeehive(_ymax) {
        Blumenwiese2.crc2.save();
        Blumenwiese2.crc2.translate(Blumenwiese2.crc2.canvas.width / 12, _ymax - 30);
        Blumenwiese2.crc2.scale(0.4, 0.4);
        // colors
        Blumenwiese2.crc2.fillStyle = "#FFB90F";
        Blumenwiese2.crc2.strokeStyle = "#996633";
        Blumenwiese2.crc2.lineWidth = 4;
        // top bit
        Blumenwiese2.crc2.beginPath();
        Blumenwiese2.crc2.moveTo(0, 0);
        Blumenwiese2.crc2.arc(-18, 0, 10, 0, 2 * Math.PI);
        Blumenwiese2.crc2.arc(18, 0, 10, 0, 2 * Math.PI);
        Blumenwiese2.crc2.rect(-18, -10, 36, 20);
        Blumenwiese2.crc2.stroke();
        Blumenwiese2.crc2.fill();
        // 2nd
        Blumenwiese2.crc2.translate(0, 20);
        Blumenwiese2.crc2.beginPath();
        Blumenwiese2.crc2.arc(-25, 0, 10, 0, 2 * Math.PI);
        Blumenwiese2.crc2.arc(25, 0, 10, 0, 2 * Math.PI);
        Blumenwiese2.crc2.rect(-25, -10, 50, 20);
        Blumenwiese2.crc2.stroke();
        Blumenwiese2.crc2.fill();
        // 3rd
        Blumenwiese2.crc2.translate(0, 20);
        Blumenwiese2.crc2.beginPath();
        Blumenwiese2.crc2.arc(-30, 0, 10, 0, 2 * Math.PI);
        Blumenwiese2.crc2.arc(30, 0, 10, 0, 2 * Math.PI);
        Blumenwiese2.crc2.rect(-30, -10, 60, 20);
        Blumenwiese2.crc2.stroke();
        Blumenwiese2.crc2.fill();
        // 4th
        Blumenwiese2.crc2.translate(0, 20);
        Blumenwiese2.crc2.beginPath();
        Blumenwiese2.crc2.arc(-30, 0, 10, 0, 2 * Math.PI);
        Blumenwiese2.crc2.arc(30, 0, 10, 0, 2 * Math.PI);
        Blumenwiese2.crc2.rect(-30, -10, 60, 20);
        Blumenwiese2.crc2.stroke();
        Blumenwiese2.crc2.fill();
        // entrance hole
        Blumenwiese2.crc2.beginPath();
        Blumenwiese2.crc2.fillStyle = "#663300";
        Blumenwiese2.crc2.arc(0, 0, 8, 0, 2 * Math.PI);
        Blumenwiese2.crc2.fill();
        Blumenwiese2.crc2.restore();
    }
})(Blumenwiese2 || (Blumenwiese2 = {}));
//# sourceMappingURL=Blumenwiese_script.js.map