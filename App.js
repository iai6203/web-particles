import { getDistance } from "./asset/js/util.js";
import { Particle } from "./asset/js/canvas/particle.js";
import { Line } from "./asset/js/canvas/line.js";
class App {
    constructor() {
        this.customCursor = document.querySelector('.cursor');
        this.theme = 'light';
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
        document.body.appendChild(this.canvas);
        // resize
        this.stageWidth = 0;
        this.stageHeight = 0;
        window.addEventListener('resize', this.resize.bind(this), false);
        this.resize();
        // toggleTheme
        const button = document.querySelector('button');
        const onToggle = () => {
            const changeElem = [];
            this.customCursor && changeElem.push(this.customCursor);
            button && changeElem.push(button);
            const onChange = () => {
                changeElem.forEach(elem => {
                    if (this.theme === 'light') {
                        elem.classList.remove('dark');
                        elem.classList.add('light');
                    }
                    else if (this.theme === 'dark') {
                        elem.classList.remove('light');
                        elem.classList.add('dark');
                    }
                });
            };
            if (this.theme === 'light')
                this.theme = 'dark';
            else if (this.theme === 'dark')
                this.theme = 'light';
            onChange();
        };
        button?.addEventListener('click', onToggle, false);
        // Mouse Move Handler
        this.mousePos = { x: 0, y: 0 };
        const mouseMoveHandler = (evt) => {
            const { clientX, clientY, pageX, pageY } = evt;
            const { top, left } = this.canvas.getBoundingClientRect();
            if (this.customCursor) {
                this.customCursor.style.top = `${pageY}px`;
                this.customCursor.style.left = `${pageX}px`;
            }
            this.mousePos = { x: clientX - left, y: clientY - top };
        };
        window.addEventListener('mousemove', mouseMoveHandler, false);
        // particle init
        this.particles = [];
        const numberOfParticles = 800;
        for (let i = 0; i < numberOfParticles; i++) {
            this.particles.push(new Particle(this.stageWidth, this.stageHeight));
        }
        // animate
        window.requestAnimationFrame(this.animate.bind(this));
    }
    resize() {
        this.stageWidth = document.body.clientWidth;
        this.stageHeight = document.body.clientHeight;
        this.canvas.width = this.stageWidth * 2;
        this.canvas.height = this.stageHeight * 2;
        this.ctx?.scale(2, 2);
    }
    animate() {
        if (!this.ctx)
            return;
        window.requestAnimationFrame(this.animate.bind(this));
        this.ctx.clearRect(0, 0, this.stageWidth, this.stageHeight);
        if (this.theme === 'light') {
            this.ctx.fillStyle = '#FFFFFF';
        }
        else if (this.theme === 'dark') {
            this.ctx.fillStyle = '#000000';
        }
        this.ctx.fillRect(0, 0, this.stageWidth, this.stageHeight);
        this.particles.forEach((p, i) => {
            const mouseDis = getDistance(p.x, p.y, this.mousePos.x, this.mousePos.y);
            if (mouseDis < 100) {
                const mouseLineAlpha = 1 - (mouseDis / 100);
                const mouseLine = new Line(p.x, p.y, this.mousePos.x, this.mousePos.y, mouseLineAlpha);
                mouseLine.update(this.theme);
                // @ts-ignore
                mouseLine.draw(this.ctx);
            }
            if (p.isActive) {
                for (let j = i + 1; j < this.particles.length; j++) {
                    const dis = getDistance(p.x, p.y, this.particles[j].x, this.particles[j].y);
                    if (dis < 100) {
                        const alpha = 1 - (dis / 100);
                        const line = new Line(p.x, p.y, this.particles[j].x, this.particles[j].y, alpha);
                        line.update(this.theme);
                        // @ts-ignore
                        line.draw(this.ctx);
                    }
                }
            }
            p.update(this.stageWidth, this.stageHeight, this.mousePos, this.theme);
            // @ts-ignore
            p.draw(this.ctx);
        });
    }
}
window.onload = () => { new App(); };
