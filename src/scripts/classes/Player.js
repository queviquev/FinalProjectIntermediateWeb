class Player extends Sprite {
    constructor({ position, collisionBlocks, platformCollisionBlocks, slantCollisionBlocks, imageSrc, frameRate, scale = 1, animations }) {
        super({ imageSrc, frameRate, scale });
        this.position = position;
        this.velocity = {
            x: 0,
            y: 0,
        };

        this.collisionBlocks = collisionBlocks
        this.platformCollisionBlocks = platformCollisionBlocks
        this.slantCollisionBlocks = slantCollisionBlocks
        this.hitbox = {
            position: {
                x: this.position.x,
                y: this.position.y,
            },
            width: 10,
            height: 10,
        };

        this.animations = animations; // Assign animations to this.animations
        this.lastDirection = 'right'; // Track the last direction the player was facing

        for (let key in this.animations) {
            const image = new Image();
            image.src = this.animations[key].imageSrc;
            this.animations[key].image = image;
        }


    }

    swapSprite(key) {
        if (this.image === this.animations[key].image || !this.animations[key]) return;
        this.currentAnimation = 0;
        this.image = this.animations[key].image;
        this.frameBuffer = this.animations[key].frameBuffer;
        this.frameRate = this.animations[key].frameRate;
        this.currentFrame = 0; // Reset to the first frame of the new animation
    }
    
    updateCamerabox() {
        this.camerabox = {
            position: {
                x: this.position.x - 184,
                y: this.position.y - 12,
            },
            width: 420,
            height: 80,
        }
    }

    checkForHorizontalCanvasCollision() {
        if (this.hitbox.position.x + this.hitbox.width + this.velocity.x >= 1024 || this.hitbox.position.x + this.velocity.x <= 0) {
            this.velocity.x = 0
        }
    }


    shouldPanCameraToLeft({canvas, camera}) {
        const cameraboxRightSide = this.camerabox.position.x + this.camerabox.width
        const scaledDownCanvasWidth = canvas.width
        
        if (cameraboxRightSide >= 1024) return

        if (cameraboxRightSide >= scaledDownCanvasWidth + Math.abs(camera.position.x)) {
            camera.position.x -= this.velocity.x
        }
    }
    shouldPanCameraToRight({canvas, camera}) {
        if (this.camerabox.position.x <= 0) return

        if (this.camerabox.position.x <= Math.abs(camera.position.x))
            camera.position.x -= this.velocity.x
    }

    shouldPanCameraDown({canvas, camera}) {
        if (this.camerabox.position.y + this.velocity.y <= 0) return

        if (this.camerabox.position.y <= Math.abs(camera.position.y))
            camera.position.y -= this.velocity.y
    }

    shouldPanCameraUp ({canvas, camera}) {
        if (this.camerabox.position.y + this.camerabox.height  + this.velocity.y >= 576) return

        if (this.camerabox.position.y + this.camerabox.height >= Math.abs(camera.position.y) + canvas.height)
            camera.position.y -= this.velocity.y
    }

    update() {
        this.updateFrames();
        this.updateHitbox();
        this.updateCamerabox();
        this.draw();
        this.position.x += this.velocity.x;
        this.updateHitbox();
        this.checkForHorizontalCollision();
        this.updateHitbox();
        this.updateHitbox();
        this.applyGravity();
        this.updateHitbox();
        this.checkForVerticalCollision();
    }

    updateFrames() {
        if (!this.frameBuffer) return;

        this.frameBuffer--;

        if (this.frameBuffer <= 0) {
            this.frameBuffer = this.animations[this.currentAnimation]?.frameBuffer || 10;

            this.currentFrame++;
            if (this.currentFrame >= this.frameRate) {
                this.currentFrame = 0;
            }
        }
    }

    updateHitbox() {
        this.hitbox = {
            position: {
                x: this.position.x + 24, // Adjust based on sprite dimensions
                y: this.position.y + 14,  // Adjust based on sprite dimensions
            },
            width: 16, // Width of the hitbox
            height: 33, // Height of the hitbox
        };
    }

    checkForHorizontalCollision() {
        for (let i = 0; i < this.collisionBlocks.length; i++) {
            const collisionBlock = this.collisionBlocks[i];
            if (
                collision({
                    object1: this.hitbox,
                    object2: collisionBlock,
                })
            ) {
                if (this.velocity.x > 0) {
                    // Player is moving right and collides with a block
                    this.velocity.x = 0;
                    this.position.x = collisionBlock.position.x - this.hitbox.width - (this.hitbox.position.x - this.position.x);
                    break;
                }

                if (this.velocity.x < 0) {
                    // Player is moving left and collides with a block
                    this.velocity.x = 0;
                    this.position.x = collisionBlock.position.x + collisionBlock.width - (this.hitbox.position.x - this.position.x);
                    break;
                }
            }
        }
    }

    applyGravity() {
        this.velocity.y += gravity
        this.position.y += this.velocity.y
        
    }

    checkForVerticalCollision() {
        for (let i = 0; i < this.collisionBlocks.length; i++) {
            const collisionBlock = this.collisionBlocks[i];
            if (
                collision({
                    object1: this.hitbox,
                    object2: collisionBlock,
                })
            ) {
                if (this.velocity.y > 0) {
                    // Player is falling
                    this.velocity.y = 0;

                    // Adjust the player's position to sit on top of the block
                    const offset = this.hitbox.position.y - this.position.y + this.hitbox.height;
                    this.position.y = collisionBlock.position.y - offset - 0.01;
                    break;
                }

                if (this.velocity.y < 0) {
                    // Player is jumping and hits the ceiling
                    this.velocity.y = 0;

                    // Adjust the player's position to stop at the bottom of the block
                    const offset = this.hitbox.position.y - this.position.y;
                    this.position.y = collisionBlock.position.y + collisionBlock.height - offset + 0.01;
                    break;
                }
            }
        }

        // for platform collision
        for (let i = 0; i < this.platformCollisionBlocks.length; i++) {
            const platformCollisionBlock = this.platformCollisionBlocks[i];
            if (
                platformCollision({
                    object1: this.hitbox,
                    object2: platformCollisionBlock,
                })
            ) {
                if (this.velocity.y > 0) {
                    // Player is falling
                    this.velocity.y = 0;

                    // Adjust the player's position to sit on top of the block
                    const offset = this.hitbox.position.y - this.position.y + this.hitbox.height;
                    this.position.y = platformCollisionBlock.position.y - offset - 0.01;
                    break;
                }
            }
        }
    }

    handleSlopeCollision(collisionBlock) {
        const relativeX = this.position.x - collisionBlock.position.x;

        // Calculate the player's Y position based on the slope
        const slopeHeight = collisionBlock.slope > 0
            ? relativeX * (collisionBlock.height / collisionBlock.width) // Right slope
            : (collisionBlock.height - (relativeX * (collisionBlock.height / collisionBlock.width))); // Left slope

        const slopeY = collisionBlock.position.y + slopeHeight;

        // Check if the player is above the slope
        if (this.position.y + this.height > slopeY) {
            this.position.y = slopeY - this.height; // Adjust player's Y position
            this.velocity.y = 0; // Stop vertical movement
        }

        // Horizontal collision: Prevent the player from moving into the slope
        if (collisionBlock.slope > 0 && this.position.x + this.width > collisionBlock.position.x + collisionBlock.width) {
            this.position.x = collisionBlock.position.x + collisionBlock.width - this.width; // Push player back
        } else if (collisionBlock.slope < 0 && this.position.x < collisionBlock.position.x) {
            this.position.x = collisionBlock.position.x; // Push player back
        }
    }

    isCollidingWith(block) {
        return (
            this.position.x + this.width > block.position.x &&
            this.position.x < block.position.x + block.width &&
            this.position.y + this.height > block.position.y &&
            this.position.y < block.position.y + block.height
        );
    }

    draw() {
        ctx.save();

        if (this.lastDirection === 'left') {
            ctx.scale(-1, 1);
            ctx.drawImage(
                this.image,
                this.currentFrame * (this.image.width / this.frameRate), // Source X (current frame)
                0, // Source Y
                this.image.width / this.frameRate, // Source width (frame width)
                this.image.height, // Source height
                -(this.position.x + this.width), // Adjust for flipped coordinates
                this.position.y, // Destination Y
                this.width, // Destination width
                this.height // Destination height
            );
        } 
        else {
            ctx.drawImage(
                this.image,
                this.currentFrame * (this.image.width / this.frameRate), 
                0, // Source Y
                this.image.width / this.frameRate, // Source width (frame width)
                this.image.height, // Source height
                this.position.x, // Destination X
                this.position.y, // Destination Y
                this.width, // Destination width
                this.height // Destination height
            );
        }

        ctx.restore();
    }
}

function collision({ object1, object2 }) {
    return (
        object1.position.x < object2.position.x + object2.width &&
        object1.position.x + object1.width > object2.position.x &&
        object1.position.y < object2.position.y + object2.height &&
        object1.position.y + object1.height > object2.position.y
    );
}

const touchControls = document.getElementById('touch-controls');
const toggleButton = document.getElementById('toggle-controls-button');