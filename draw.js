"use strict"

import {
    c,
    canvas,
    canvasUpdate
} from './canvas.js';

import {
    Matrix as M
} from "./matrices.js"

import {
    NeuralNetwork
} from "./nNetworks.js";

class Interface {
    constructor() {}

    static drawNetwork(network) {
        let size = 20;
        c.fillStyle = "#ffffff";

        for (let i = 0; i < network.layerAmounts.length; i++) {
            let amount = network.layerAmounts[i];

            let dw = canvas.width / (network.layerAmounts.length);
            let dh = canvas.height / (amount);

            for (let j = 0; j < amount; j++) {
                c.beginPath();
                c.ellipse(-canvas.width * 0.5 + dw * (i + 0.5), canvas.height * 0.5 - dh * (j + 0.5), size, size, 0, 0, Math.PI * 2, false);
                c.fill();

                let nAmount = network.layerAmounts[i + 1];
                let ndh = canvas.height / (nAmount);

                c.strokeStyle = "#ffffff";
                for (let k = 0; k < nAmount; k++) {
                    c.beginPath();
                    c.moveTo(-canvas.width * 0.5 + dw * (i + 0.5), canvas.height * 0.5 - dh * (j + 0.5));
                    c.lineTo(-canvas.width * 0.5 + dw * (i + 1.5), canvas.height * 0.5 - ndh * (k + 0.5));
                    c.stroke();
                }
            }
        }
    }
}

let NN = new NeuralNetwork(2, 20, 20, 20, 20, 1);

let resolution = 10;
let cols = canvas.height / resolution;
let rows = canvas.height / resolution;

setInterval(() => {
    canvasUpdate("#161616");

    for (let i = 0; i < 2000; i++) {
        let x1 = (Math.random() - 0.5) * 2;
        let x2 = (Math.random() - 0.5) * 2;
        let t = Math.sin(10 * x1 ** 2) / 2 + 0.5;

        NN.train([x1, x2], [t], 0.001);
    }

    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            let x1 = (i - cols / 2) / cols;
            let x2 = (j - rows / 2) / rows;
            let inputs = [x1, x2];
            let result = NN.feed(inputs);
            result = result[0] * 255;

            c.fillStyle = `rgb(${result}, ${result}, ${result})`;
            c.fillRect(i * resolution - canvas.width / 4, j * resolution - canvas.height / 2, resolution, resolution);
        }
    }
}, window.delta);