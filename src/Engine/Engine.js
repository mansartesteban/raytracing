import Vector2 from "./Vector2";

class Engine {
    constructor(canvas) {
        this.canvas = canvas;
        this.callLoop = true;
    }

    init(callback) {
        callback(this);
    }

    start(callLoop = true) {
        if (!window.requestAnimationFrame) {
            throw "Browser doesn't have requestAnimationFrame API";
        }

        this.callLoop = callLoop;

        this.initCanvas();
        this._loop();
    }

    initCanvas() {
        this.ctx = this.canvas.getContext("2d");
        if (!this.ctx) {
            alert("2D Context not found");
            return;
        }

        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;

        const app = document.getElementById("app");
        if (!app) {
            alert("No app found");
            return;
        }

        app.appendChild(this.canvas);

    }

    draw(x, y, color) {
        this.ctx.fillStyle = color.html;
        this.ctx.fillRect(x, y, 1, 1);
    }



    recalculateRatio() {
        this.ctx.width = window.innerWidth;
        this.ctx.height = window.innerHeight;

        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;

        this.renderer.canvasSize = new Vector2(this.canvas.width, this.canvas.height);
        // if (this.renderer !== null) {
        //     this.renderer.setSize(this.mountOn.clientWidth, this.mountOn.clientHeight);
        // }
        // if (this.composer) {
        //     this.composer.setSize(this.mountOn.clientWidth, this.mountOn.clientHeight);
        // }

        // if (this.camera) {
        //     this.camera.aspect = (this.mountOn.clientWidth) / this.renderer.domElement.height;
        //     this.camera.updateProjectionMatrix();
        // }
    }

    loop(callback) {
        this.loopCallback = callback;
    }

    next() {
        // window.requestAnimationFrame(this._loop.bind(this));
    }

    _loop() {

        this.recalculateRatio();

        let promise = new Promise((r) => r());

        if (this.loopCallback) {
            promise = Promise.resolve(this.loopCallback(this));
        }

        if (this.callLoop) {
            promise.then(() => {
                window.requestAnimationFrame(this._loop.bind(this));
            });
        }

    }
}

export default Engine;