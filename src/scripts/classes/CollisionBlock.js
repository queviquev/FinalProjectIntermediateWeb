class CollisionBlock {
    constructor({position, imageSrc}) {
        this.position = position
        this.width = 32,
        this.height = 32
    }

    draw() {
        ctx.fillStyle = 'rgba(255, 0, 0, 0)'
        ctx.fillRect(this.position.x, this.position.y, this.width, this.height)
    }

    update() {
        this.draw()
    }
}
