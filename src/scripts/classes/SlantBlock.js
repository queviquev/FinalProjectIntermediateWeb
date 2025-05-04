class SlantBlock extends CollisionBlock {
    constructor({ position, slope, type }) {
        super({ position });
        this.slope = slope; // Positive or negative slope
        this.type = type; // 'rightRamp' or 'leftRamp'
    }

    draw(camera) {
        if (this.type === 'rightRamp') {
            ctx.moveTo(this.position.x + camera.position.x, this.position.y + camera.position.y + this.height);
            ctx.lineTo(this.position.x + camera.position.x + this.width, this.position.y + camera.position.y + this.height);
            ctx.lineTo(this.position.x + camera.position.x + this.width, this.position.y + camera.position.y);
        }
        else if (this.type === 'leftRamp') {
            ctx.moveTo(this.position.x + camera.position.x, this.position.y + camera.position.y + this.height);
            ctx.lineTo(this.position.x + camera.position.x, this.position.y + camera.position.y);
            ctx.lineTo(this.position.x + camera.position.x + this.width, this.position.y + camera.position.y + this.height);
        }
    }
}