class CollisionBlock {
    constructor({ position, height = 32, slope = 0 }) {
        this.position = position;
        this.width = 32;
        this.height = height;
        this.slope = slope;
    }

    // draws collision blocks based on slope value
    draw(camera) {
        if (this.slope === 0) {
            ctx.fillStyle = 'rgba(255, 0, 0, 0)';
            ctx.fillRect(
                this.position.x + camera.position.x,
                this.position.y + camera.position.y,
                this.width,
                this.height
            );
        } else {
            ctx.beginPath();

            // handle slope value to determine the shape of the block
            if (this.slope > 0) {
                ctx.moveTo(this.position.x + camera.position.x, this.position.y + camera.position.y);
                ctx.lineTo(this.position.x + camera.position.x + this.width, this.position.y + camera.position.y + this.height);
                ctx.lineTo(this.position.x + camera.position.x, this.position.y + camera.position.y + this.height);
            } else {
                ctx.moveTo(this.position.x + camera.position.x, this.position.y + camera.position.y + this.height);
                ctx.lineTo(this.position.x + camera.position.x + this.width, this.position.y + camera.position.y);
                ctx.lineTo(this.position.x + camera.position.x + this.width, this.position.y + camera.position.y + this.height);
            }

            ctx.closePath();
            ctx.fill();
        }
    }

    update(camera) {
        this.draw(camera);
    }
}
