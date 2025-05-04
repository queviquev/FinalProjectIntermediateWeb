class CollisionBlock {
    constructor({ position }) {
        this.position = position;
        this.width = 32;
        this.height = 32;
    }

    draw(camera) {
        ctx.fillStyle = 'rgba(255, 0, 0, 0.0)';
        ctx.fillRect(
            this.position.x + camera.position.x, // Adjust for camera position
            this.position.y + camera.position.y, // Adjust for camera position
            this.width,
            this.height
        );
    }

    update(camera) {
        this.draw(camera);
    }
}
