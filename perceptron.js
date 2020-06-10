"use strict"

function Sign(x) {
    return (x >= 0) ? 1 : -1
}

export class TrainingSet {
    constructor(n, s, func) {
        this.dataCount = n;

        this.data = new Array(n);
        this.targets = new Array(n);

        for (let i = 0; i < n; i++) {
            let x = s*(Math.random()-0.5);
            let y = s*(Math.random()-0.5);

            let point = new Array(3);
            point[0] = x;
            point[1] = y;

            this.data[i] = point;

            this.targets[i] = (y >= func(x)) ? 1 : -1;
        }
    }
}

export class Perceptron {
    constructor(n, func) {
        this.inputCount = n;
        this.weights = new Array(n);
        for (let i = 0; i < n; i++) {
            this.weights[i] = 2*(Math.random()-0.5);
        };
        this.bias = 80*(Math.random());

        this.dl = 0.0000001;

        this.func = func;
    }

    estimatedFunction(x) {
        return -this.bias/this.weights[1] - this.weights[0]/this.weights[1] * x;
    }

    guess(inputs) {
        let sum = 0;
        for (let i = 0; i < this.inputCount; i++) {
            sum += inputs[i] * this.weights[i];
        }
        sum += this.bias;

        let output = this.func(sum);

        return output;
    }

    train(inputs, target) {
        let error = target - this.guess(inputs);
        
        for (let i = 0; i < this.inputCount; i ++) {
            this.weights[i] += error * inputs[i] * this.dl;
        }
        this.bias += error * this.dl;
    }

    trainSet(trainingSet) {
        for (let i = 0; i < trainingSet.dataCount; i++) {
            this.train(trainingSet.data[i], trainingSet.targets[i]);
        }
    }
}