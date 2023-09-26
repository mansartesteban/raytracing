import Camera from "./Engine/Camera";
import Color from "./Engine/Color";
import Engine from "./Engine/Engine";
import Light from "./Engine/Light";
import BasicMaterial from "./Engine/Material/BasicMaterial";
import Renderer from "./Engine/Renderer";
import Scene from "./Engine/Scene";
import Sphere from "./Engine/Sphere";
import Vector2 from "./Engine/Vector2";
import Vector3 from "./Engine/Vector3";

// https://ursatile.github.io/jsray/03-03-rays-scenes-and-camera.html
const canvas = document.createElement("canvas");
const engine = new Engine(canvas);

engine.init((ctx) => {

    ctx.renderer = new Renderer(new Vector2(ctx.canvas.width, ctx.canvas.height));
    ctx.camera = new Camera(new Vector3(0, 5, -20), Vector3.Z, 1, 1);

    const objects = [
        new Sphere(new Vector3(-4, -40, 50), 10, new BasicMaterial(Color.Yellow)),
        new Sphere(new Vector3(-2, 0, 20), 5, new BasicMaterial(Color.Red)),
        new Sphere(new Vector3(0, 0, 10), 2, new BasicMaterial(Color.White)),
        new Sphere(new Vector3(2, 0, 2), 1, new BasicMaterial(Color.Green)),
        new Sphere(new Vector3(4, 0, 6), 3, new BasicMaterial(Color.Blue)),
    ];

    const lights = [
        new Light(new Vector3(10, 10, 10), Color.White, 1),
        new Light(new Vector3(-10, 20, -5), new Color(0xff, 0xc5, 0x9b), .5),
    ];

    ctx.scene = new Scene(ctx.camera, Color.Black, objects, lights);
});


engine.loop((ctx) => {
    ctx.camera.position.z -= .3;
    ctx.scene.lights[0].position.x -= .3;
    // ctx.camera.lookAt.y -=0.003
    ctx.renderer.render(ctx.scene, ctx.draw.bind(ctx));
    // ctx.renderer.onFinished(ctx.next());

    // return new Promise((r) => setTimeout(r, 1000));
    // ctx.next();
});

engine.start(false);