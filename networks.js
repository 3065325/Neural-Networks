"use strict"

import {
    Matrix as M
} from "./matrices.js"

function sigmoid(x) {
    return 1 / (1 + Math.exp(-x));
}

function pseudoSigmoidDer(x) {
    return x * (1 - x);
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

    feedForward(inputs) {
        let A1 = new Array(this.layerAmounts.length);
        A1[0] = M.toVector(inputs);

        for (let i = 0; i < A1.length - 1; i++) {
            A1[i + 1] = M.map(M.add(this.B[i], M.multM(this.W[i], A1[i])), sigmoid);
        }

        return A1;
    }

    backPropogate(activations, targets, learnRate) {
        let A = activations;

        let a1 = A[A.length - 1];
        let a2 = A[A.length - 2];
        let w = this.W[A.length - 2];
        let b = this.B[A.length - 2];

        let E = M.sub(M.toVector(targets), a1);

        let G = M.multS(learnRate, M.multH(E, M.map(a1, pseudoSigmoidDer)));

        let a2T = M.transpose(a2);
        let dW = M.multM(G, a2T);
        let dB = G
        this.W[A.length - 2] = M.add(dW, w);
        this.B[A.length - 2] = M.add(dB, b);

        for (let i = A.length - 3; i >= 0; i--) {
            a1 = A[i + 1];
            a2 = A[i];
            w = this.W[i];
            b = this.B[i];

            E = M.multM(M.transpose(this.W[i + 1]), E);

            G = M.multS(learnRate, M.multH(E, M.map(a1, pseudoSigmoidDer)));

            a2T = M.transpose(a2);
            dW = M.multM(G, a2T);
            dB = G;
            this.W[i] = M.add(dW, w);
            this.B[i] = M.add(dB, b);
        }

    }

    train(inputs, targets, learnRate) {
        this.backPropogate(this.feedForward(inputs), targets, learnRate);
    }

    feed(inputs) {
        let A = this.feedForward(inputs);
        return M.toArray(A[A.length-1]);
    }
}