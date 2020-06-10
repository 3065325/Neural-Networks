"use strict"

import {
    Vector
} from './vectors.js';

export const canvas = document.querySelector('canvas');
export const c = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
export let mouse = new Vector(0, 0);

window.delta = 1000 / 60;

export function canvasUpdate(color) {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    c.fillStyle = color;
    c.fillRect(0, 0, canvas.width, canvas.height);
    c.translate(canvas.width / 2, canvas.height / 2);
}

canvas.addEventListener('mousemove', (e) => {
    mouse.x = e.x - canvas.width / 2;
    mouse.y = e.y - canvas.height / 2;
});