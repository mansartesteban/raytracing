import Camera from "./lib/Camera";
import Color from "./lib/Color";
import Renderer from "./lib/Renderer";
import Scene from "./lib/Scene";
import Sphere from "./lib/Sphere";
import Vector2 from "./lib/Vector2";
import Vector3 from "./lib/Vector3";

const canvas = document.createElement("canvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
// canvas.width = 10;
// canvas.height = 10;

const app = document.getElementById("app");
app.appendChild(canvas);

main();

function main() {
    if (!app) {
        alert("No app found");
        return;
    }

    if (!ctx) {
        alert("2D Context not found");
        return;
    }

    // https://ursatile.github.io/jsray/03-03-rays-scenes-and-camera.html

    const renderer = new Renderer(new Vector2(canvas.width, canvas.height))
    const camera = new Camera(new Vector3(0, 5, -8), Vector3.Z, 16/9, 1);

    const objects = [
        new Sphere(new Vector3(-4, -20, 100), 10, Color.Yellow),
        new Sphere(new Vector3(-2, 0, 2), 1, Color.Red),
        new Sphere(new Vector3(0, 0, 1), 1, Color.White),
        new Sphere(new Vector3(2, 0, 2), 1, Color.Green),
        new Sphere(new Vector3(4, 0, 6), 1, Color.Blue),
    ];

    const scene = new Scene(camera, Color.Black, objects);
    renderer.render(scene, paint);
};

function paint(x, y, color) {
    ctx.fillStyle = color.html;
    ctx.fillRect(x, y, 1, 1);
}