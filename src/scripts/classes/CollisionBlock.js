class CollisionBlock {
    constructor({ position, height = 32, slope = 0}) {
        this.position = position;
        this.width = 32;
        this.height = height;
        this.slope = slope; // Slope value (-1 for left, 1 for right, 0 for flat)
    }

    draw(camera) {
        ctx.fillStyle = 'rgba(255, 0, 0, 0.5)';
        ctx.fillRect(
            this.position.x + camera.position.x,
            this.position.y + camera.position.y,
            this.width,
            this.height
        );

        // Optional: Visualize slopes
        if (this.slope !== 0) {
            ctx.strokeStyle = this.slope > 0 ? 'green' : 'blue';
            ctx.beginPath();
            if (this.slope > 0) {
                // Right slope
                ctx.moveTo(this.position.x + camera.position.x, this.position.y + camera.position.y);
                ctx.lineTo(this.position.x + camera.position.x + this.width, this.position.y + camera.position.y + this.height);
            } else {
                // Left slope
                ctx.moveTo(this.position.x + camera.position.x, this.position.y + camera.position.y + this.height);
                ctx.lineTo(this.position.x + camera.position.x + this.width, this.position.y + camera.position.y);
            }
            ctx.stroke();
        }
    }

    update(camera) {
        this.draw(camera);
    }
}
