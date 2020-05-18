"use strict"

import {
    Matrix
} from "./matrices.js"

function sigmoid(x) {
    return 1 / (1 + Math.pow(Math.E, -x));
}

function Sigmoid(matrix) {
    let M = new Array(matrix.components.length)
    for (let i = 0; i < M.length; i++) {
        let MRow = new Array(matrix.components[0].length)
        for (let j = 0; j < MRow.length; j++) {
            MRow[j] = sigmoid(matrix.components[i][j]);
        }
        M[i] = MRow;
    }
    return new Matrix(M);
}

class Network {
    constructor() {
        this.neuronAmounts = Array.from(arguments);
        console.log(this.neuronAmounts)

        this.activations = new Array(this.neuronAmounts.length);
        for (let i = 0; i < this.activations.length; i++) {
            let activationsRow = new Array(this.neuronAmounts[i]);
            for (let j = 0; j < activationsRow.length; j++) {
                activationsRow[j] = [2 * (Math.random() - 0.5)];
            }
            this.activations[i] = new Matrix(activationsRow);
        }
        console.log(this.activations)

        this.biases = new Array(this.neuronAmounts.length - 1);
        for (let i = 1; i <= this.biases.length; i++) {
            let biasesRow = new Array(this.neuronAmounts[i]);
            for (let j = 0; j < biasesRow.length; j++) {
                biasesRow[j] = [2 * (Math.random() - 0.5)];
            }
            this.biases[i - 1] = new Matrix(biasesRow);
        }
        console.log(this.biases)

        this.weights = new Array(this.neuronAmounts.length - 1);
        for (let i = 0; i < this.weights.length; i++) {
            let currentLayer = this.neuronAmounts[i];
            let nextLayer = this.neuronAmounts[i + 1];

            let weights = new Array(nextLayer);
            for (let j = 0; j < weights.length; j++) {
                let weightsRow = new Array(currentLayer);

                for (let k = 0; k < weightsRow.length; k++) {
                    weightsRow[k] = 2 * (Math.random() - 0.5);
                }
                weights[j] = weightsRow;
            }
            this.weights[i] = new Matrix(weights);
        }
        console.log(this.weights)
    }

    feedForward(layer) {
        console.log(this.neuronAmounts.length)
        if (layer >= this.neuronAmounts.length - 1) {
            console.log(`Can't feed from layer ${layer} into non-existant layer ${layer + 1} when final layer is ${this.neuronAmounts.length - 1}`);
            return;
        }

        let newActivations = Sigmoid(Matrix.add(Matrix.mult(this.weights[layer], this.activations[layer]), this.biases[layer]));
        this.activations[layer + 1] = newActivations;
    }
}

let N = new Network(1, 16, 1);
N.feedForward(0);
N.feedForward(1);