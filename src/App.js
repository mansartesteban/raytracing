import Camera from "./Engine/Camera";
import Color from "./Engine/Color";
import Engine from "./Engine/Engine";
import Light from "./Engine/Light";
import BasicMaterial from "./Engine/Material/BasicMaterial";
import Renderer from "./Engine/Renderer";
import Scene from "./Engine/Scene";
import Sphere from "./Engine/Shapes/Sphere";
import Vector2 from "./Engine/Geometry/Vector2";
import Vector3 from "./Engine/Geometry/Vector3";
import Plane from "./Engine/Shapes/Plane";
import Box from "./Engine/Shapes/Box";
import Appearance from "./Engine/Appearance";
import Finish from "./Engine/Finish";

// https://ursatile.github.io/jsray/03-03-rays-scenes-and-camera.html
const canvas = document.createElement("canvas");
const engine = new Engine(canvas);

engine.init((ctx) => {

    ctx.renderer = new Renderer(new Vector2(ctx.canvas.width, ctx.canvas.height));
    ctx.camera = new Camera(new Vector3(0, 5, -70), new Vector3(0, -.2, 1).normalize(), 1, 1);

    const objects = [
        new Sphere(
            new Vector3(-18, -4, 12),
            8,
            new Appearance(
                new BasicMaterial(Color.White),
                new Finish({ ambient: 1, diffuse: 1, shiny: 1, reflexion: 1 })
            )
        ),
        new Sphere(
            new Vector3(-3, 0, 0),
            2,
            new Appearance(
                new BasicMaterial(Color.Yellow),
                new Finish({ ambient: 0.0, diffuse: 1.0, shiny: 1.0, reflexion:.2 })
            )
        ),
        new Sphere(
            new Vector3(20, 0, 20),
            12,
            new Appearance(
                new BasicMaterial(Color.Red),
                new Finish({ ambient: 0.0, diffuse: .5, shiny: .8, reflexion: .5 })
            )
        ),
        new Sphere(
            new Vector3(2, -10, 2),
            1,
            new Appearance(
                new BasicMaterial(Color.White),
                new Finish({ ambient: 0.0, diffuse: 1.0, shiny: 1.0, reflexion: .7 })
            )
        ),
        new Sphere(
            new Vector3(4, 0, 30),
            3,
            new Appearance(
                new BasicMaterial(Color.Green),
                new Finish({ ambient: 0.0, diffuse: 1.0, shiny: 1.0, reflexion:.9 })
            )
        ),
        new Plane(
            new Vector3(0, -20, 0),
            Vector3.Y,
            new Appearance(
                new BasicMaterial(Color.Cyan),
                new Finish({ ambient: 0.0, diffuse: 1.0, shiny: 1.0, reflexion: .2 })
            )
        ),
        // new Box(
        //     new Vector3(-5, -5, 5),
        //     new Vector3(-10, 0, 20),
        //     new Appearance(
        //         new BasicMaterial(Color.Fuchsia),
        //         new Finish({ ambient: 0.0, diffuse: .2, shiny: 1.0 })
        //     )
        // )
    ];

    const lights = [
        new Light(new Vector3(10, 5, 10).multiply(10), Color.White, 1),
        // new Light(new Vector3(6, 10, 10), Color.Yellow, 1),
        new Light(new Vector3(-20, 7, 7).multiply(10), Color.Red, 1),
        new Light(new Vector3(-2, 10, -10).multiply(10), Color.Fuchsia, .33),
        // new Light(new Vector3(-6, 10, 10), Color.Red, .33),
        new Light(new Vector3(-10, 10, 10).multiply(10), Color.Green, .33),
        new Light(new Vector3(-10, 20, -5).multiply(10), new Color(0xff, 0xc5, 0x9b), .5),
    ];

    ctx.scene = new Scene(ctx.camera, Color.Black, objects, lights);
});


engine.loop((ctx) => {
    ctx.camera.position.z -= 3;
    ctx.scene.lights[0].position.x -= .3;
    // ctx.camera.lookAt.y -=0.003
    ctx.renderer.render(ctx.scene, ctx.draw.bind(ctx));
    // ctx.renderer.onFinished(ctx.next());

    // return new Promise((r) => setTimeout(r, 1000));
    // ctx.next();
});

engine.start(false);




/*
TODO:
- Softness of the light
- Different type of light :
  - Point
  - Diretional
  - Spot
  - Ambiant
- Occlusion ambiante
- Reflection
- Difraction
- If an object is between a light and another object, make a shadow
- Shadows
- Transparency
- Glass effect/shiny
*/