"use strict"

import {
    Matrix as M, Matrix
} from "./matrices.js"

function sigmoid(x) {
    return 1 / (1 + Math.exp(-x));
}

function pseudoSigmoidDer(x) {
    return x*(1 - x);
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
        
        return Matrix.toArray(A1);
    }

    // propogateLayer(outputs, layer, learnRate) {
    //     if (layer <= this.layerAmounts.length - 1) {
    //         console.log(`Can't feed from layer ${layer} into non-existant layer ${layer + 1} when final layer is ${this.layerAmounts.length - 1}`);
    //         return;
    //     }
        
    //     let E = 

    //     let dW = Matrix.multS(learnRate, );
    //     return E1;
    // }

    // backPropogate(errors, learnRate) {

    // }

    adjust(inputs, targets, learnRate) {
        let O = Matrix.toVector(this.feedForward(inputs));

        let E = Matrix.sub(Matrix.toVector(targets), O);

        let G = Matrix.multS(learnRate, Matrix.multM(E, Matrix.map(O, pseudoSigmoidDer)));

        let W = this.W[this.W.length - 1];
        let dW = Matrix.multM(G, Matrix.transpose(W));
        this.W[this.W.length -1] = Matrix.add(W, dW)

        for (let i = this.W.length - 2; i >= 0; i++) {
            
        }
    }
}