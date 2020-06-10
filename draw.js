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
    constructor() {
    }

    static drawNetwork(network) {
        let size = 20;
        c.fillStyle = "#ffffff";

        for (let i = 0; i < network.layerAmounts.length; i++) {
            let amount = network.layerAmounts[i];

            let dw = canvas.width / (network.layerAmounts.length);
            let dh = canvas.height / (amount);

            for (let j = 0; j < amount; j++) {
                c.beginPath();
                c.ellipse(-canvas.width*0.5 + dw*(i + 0.5), canvas.height*0.5 - dh*(j + 0.5), size, size, 0, 0, Math.PI*2, false);
                c.fill();

                let nAmount = network.layerAmounts[i + 1];
                let ndh = canvas.height / (nAmount);

                c.strokeStyle = "#ffffff";
                for (let k = 0; k < nAmount; k++) {
                    c.beginPath();
                    c.moveTo(-canvas.width*0.5 + dw*(i + 0.5), canvas.height*0.5 - dh*(j + 0.5));
                    c.lineTo(-canvas.width*0.5 + dw*(i + 1.5), canvas.height*0.5 - ndh*(k + 0.5));
                    c.stroke();
                }
            }
        }
    }
}

let NN = new NeuralNetwork(2, 3, 3, 1 );

console.log(NN.backPropogate([1, 0], [1]));

setInterval(() => {
    canvasUpdate("#161616");

    Interface.drawNetwork(NN);
}, window.delta);