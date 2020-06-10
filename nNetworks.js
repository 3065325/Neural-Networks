"use strict"

import {
    Matrix as M, Matrix
} from "./matrices.js"

function sigmoid(x) {
    return 1 / (1 + Math.exp(-x));
}

export class NeuralNetwork {
    constructor() {
        this.layerAmounts = Array.from(arguments);

        this.W = new Array(this.layerAmounts.length - 1);
        for (let i = 0; i < this.W.length; i++) {
            this.W[i] = M.toRandom(this.layerAmounts[i + 1], this.layerAmounts[i], -1, 1);
        }

        this.B = new Array(this.layerAmounts.length - 1);
        for (let i = 0; i < this.B.length; i++) {
            this.B[i] = M.toRandom(this.layerAmounts[i + 1], 1, -1, 1);
        }
    }

    feedLayer(inputs, layer) {
        if (layer >= this.layerAmounts.length - 1) {
            console.log(`Can't feed from layer ${layer} into non-existant layer ${layer + 1} when final layer is ${this.layerAmounts.length - 1}`);
            return;
        }

        let A1 = M.map(M.add(this.B[layer], M.multM(this.W[layer], inputs)), sigmoid);
        return A1;
    }

    feedForward(inputs) {
        let A1 = this.feedLayer(M.toVector(inputs), 0);

        for (let i = 1; i < this.layerAmounts.length - 1; i++) {
            A1 = this.feedLayer(A1, i);
        }
        
        return A1;
    }

    propogateLayer(errors, layer) {

    }

    backPropogate(inputs, targets) {
        let O = this.feedForward(M.toVector(inputs));

        let tW = Matrix.transpose(this.W[this.W.length - 1]);
        let E = M.sub(M.toVector(targets), O);

        O = Matrix.multM(tW1, E);

        for (let i = 1; i < this.W.length - 1; i++) {
            tW = Matrix.transpose(this.W[this.W.length - 1 - i]);
            E1 = M.sub(M.toVector(targets), O);
        }

        return E1;
    }
}