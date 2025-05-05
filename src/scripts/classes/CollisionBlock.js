class CollisionBlock {
    constructor({ position, height = 32, slope = 0 }) {
        this.position = position;
        this.width = 32;
        this.height = height;
        this.slope = slope; // Slope value (-1 for left, 1 for right, 0 for flat)
    }

    draw(camera) {
        if (this.slope === 0) {
            // Flat block
            ctx.fillStyle = 'rgba(255, 0, 0, 0.5)';
            ctx.fillRect(
                this.position.x + camera.position.x,
                this.position.y + camera.position.y,
                this.width,
                this.height
            );
        } 
        else {
            // Slanted block
            ctx.beginPath();

            if (this.slope > 0) {
                // Right slope
                ctx.moveTo(this.position.x + camera.position.x, this.position.y + camera.position.y); // Top-left
                ctx.lineTo(this.position.x + camera.position.x + this.width, this.position.y + camera.position.y + this.height); // Bottom-right
                ctx.lineTo(this.position.x + camera.position.x, this.position.y + camera.position.y + this.height); // Bottom-left
            } else {
                // Left slope
                ctx.moveTo(this.position.x + camera.position.x, this.position.y + camera.position.y + this.height); // Bottom-left
                ctx.lineTo(this.position.x + camera.position.x + this.width, this.position.y + camera.position.y); // Top-right
                ctx.lineTo(this.position.x + camera.position.x + this.width, this.position.y + camera.position.y + this.height); // Bottom-right
            }

            ctx.closePath();
            ctx.fill();
        }
    }

    update(camera) {
        this.draw(camera);
    }
}
