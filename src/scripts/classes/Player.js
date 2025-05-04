class Player extends Sprite {
    constructor({ position, collisionBlocks, imageSrc, frameRate, scale = 1, animations }) {
        super({ imageSrc, frameRate, scale });
        this.position = position;
        this.velocity = {
            x: 0,
            y: 0,
        };

        this.collisionBlocks = collisionBlocks;
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
        
        // for testing camerabox and hitbox
        // ctx.fillStyle = 'rgba(0, 255, 0, .2)';
        // ctx.fillRect(this.camerabox.position.x, this.camerabox.position.y, this.camerabox.width, this.camerabox.height);
        // ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
        // ctx.fillStyle = 'rgba(0, 0, 255, .2)';
        
        
        this.draw();

        this.position.x += this.velocity.x;
        this.updateHitbox();
                


        this.checkForHorizontalCollision();
        this.updateHitbox();
        this.checkRampCollision();
        this.updateHitbox();
        
        this.applyGravity();
        this.updateHitbox();
        this.checkForVerticalCollision();

        // Visualize player's hitbox
        // ctx.fillStyle = 'rgba(255, 0, 0, 0.16)';
        // ctx.fillRect(this.hitbox.position.x, this.hitbox.position.y, this.hitbox.width, this.hitbox.height);

        // Visualize ramps
        // this.collisionBlocks.forEach((block) => {
        //     if (block instanceof SlantBlock) {
        //         ctx.fillStyle = block.type === 'rightRamp' ? 'rgba(0, 255, 0, 0.5)' : 'rgba(0, 0, 255, 0.5)';
        //         ctx.beginPath();

        //         if (block.type === 'rightRamp') {
        //             ctx.moveTo(block.position.x, block.position.y + block.height);
        //             ctx.lineTo(block.position.x + block.width, block.position.y + block.height);
        //             ctx.lineTo(block.position.x + block.width, block.position.y);
        //         } else if (block.type === 'leftRamp') {
        //             ctx.moveTo(block.position.x, block.position.y + block.height);
        //             ctx.lineTo(block.position.x, block.position.y);
        //             ctx.lineTo(block.position.x + block.width, block.position.y + block.height);
        //         }

        //         ctx.closePath();
        //         ctx.fill();
        //     }
        // });
    }

    updateFrames() {
        if (!this.frameBuffer) return;

        this.frameBuffer--;

        if (this.frameBuffer <= 0) {
            this.frameBuffer = this.animations[this.currentAnimation]?.frameBuffer || 10;

            this.currentFrame++;
            if (this.currentFrame >= this.frameRate) {
                this.currentFrame = 0; // Loop back to the first frame
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
    }

    checkRampCollision() {
        this.collisionBlocks.forEach((block) => {
            if (block instanceof SlantBlock) {
                const withinXBounds = this.hitbox.position.x + this.hitbox.width > block.position.x &&
                                      this.hitbox.position.x < block.position.x + block.width;
                const withinYBounds = this.hitbox.position.y + this.hitbox.height > block.position.y &&
                                      this.hitbox.position.y < block.position.y + block.height;

                if (withinXBounds && withinYBounds) {
                    const relativeX = this.hitbox.position.x - block.position.x;
                    const rampHeight = block.slope * relativeX;

                    const targetY = block.position.y + block.height - rampHeight - this.hitbox.height;

                    if (this.velocity.y >= 0) {
                        // Adjust the player's position to align with the ramp
                        this.position.y = targetY - (this.hitbox.position.y - this.position.y);
                        this.velocity.y = 0;

                        // Recalculate the hitbox position after adjusting the player's position
                        this.updateHitbox();
                    }
                }
            }
        });
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

document.getElementById('left-button').addEventListener('touchstart', () => {
    player.velocity.x = -5; // Move left
});

document.getElementById('left-button').addEventListener('touchend', () => {
    player.velocity.x = 0; // Stop moving
});

document.getElementById('right-button').addEventListener('touchstart', () => {
    player.velocity.x = 5; // Move right
});

document.getElementById('right-button').addEventListener('touchend', () => {
    player.velocity.x = 0; // Stop moving
});

document.getElementById('jump-button').addEventListener('touchstart', () => {
    if (player.velocity.y === 0) {
        player.velocity.y = -10; // Jump
    }
});

const touchControls = document.getElementById('touch-controls');
const toggleButton = document.getElementById('toggle-controls-button');

// Initially show the controls

