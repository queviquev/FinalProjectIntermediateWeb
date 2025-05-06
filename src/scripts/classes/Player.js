class Player extends Sprite {
    constructor({ position, collisionBlocks, platformCollisionBlocks, slantCollisionBlocks, imageSrc, frameRate, scale = 1, animations, jumpCount = 0 }) {
        super({ imageSrc, frameRate, scale });
        this.position = position;
        this.velocity = {
            x: 0,
            y: 0,
        };

        this.jumpCount = jumpCount;
        this.collisionBlocks = collisionBlocks;
        this.platformCollisionBlocks = platformCollisionBlocks;
        this.slantCollisionBlocks = slantCollisionBlocks;
        this.hitbox = {
            position: {
                x: this.position.x,
                y: this.position.y,
            },
            width: 10,
            height: 10,
        };

        this.animations = animations;
        this.lastDirection = 'right';

        // Load all animations
        for (let key in this.animations) {
            const image = new Image();
            image.src = this.animations[key].imageSrc;
            this.animations[key].image = image;
        }
    }

    // method to swap sprites based off of user input
    swapSprite(key) {
        if (this.image === this.animations[key].image || !this.animations[key]) return;
        this.currentAnimation = 0;
        this.image = this.animations[key].image;
        this.frameBuffer = this.animations[key].frameBuffer;
        this.frameRate = this.animations[key].frameRate;
        this.currentFrame = 0;
    }
    
    // method to help pan the camera to the player
    updateCamerabox() {
        this.camerabox = {
            position: {
                x: this.position.x - 184,
                y: this.position.y - 12,
            },
            width: 420,
            height: 80,
        };
    }

    // method to keep the player from walking off the screen
    checkForHorizontalCanvasCollision() {
        if (this.hitbox.position.x + this.hitbox.width + this.velocity.x >= 1024 || this.hitbox.position.x + this.velocity.x <= 0) {
            this.velocity.x = 0;
        }
    }

    // methods for panning the camera
    shouldPanCameraToLeft({canvas, camera}) {
        const cameraboxRightSide = this.camerabox.position.x + this.camerabox.width;
        const scaledDownCanvasWidth = canvas.width;
        
        if (cameraboxRightSide >= 1024) return;

        if (cameraboxRightSide >= scaledDownCanvasWidth + Math.abs(camera.position.x)) {
            camera.position.x -= this.velocity.x;
        }
    }

    shouldPanCameraToRight({canvas, camera}) {
        if (this.camerabox.position.x <= 0) return;

        if (this.camerabox.position.x <= Math.abs(camera.position.x))
            camera.position.x -= this.velocity.x;
    }

    shouldPanCameraDown({canvas, camera}) {
        if (this.camerabox.position.y + this.velocity.y <= 0) return;

        if (this.camerabox.position.y <= Math.abs(camera.position.y))
            camera.position.y -= this.velocity.y;
    }

    shouldPanCameraUp ({canvas, camera}) {
        if (this.camerabox.position.y + this.camerabox.height  + this.velocity.y >= 576) return;

        if (this.camerabox.position.y + this.camerabox.height >= Math.abs(camera.position.y) + canvas.height)
            camera.position.y -= this.velocity.y;
    }

    // method to check if the player is on the ground or not
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

    // method to update the frames of the sprite
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

    // method to update the hitbox of the player and check for collisions
    updateHitbox() {
        this.hitbox = {
            position: {
                x: this.position.x + 24,
                y: this.position.y + 14,
            },
            width: 16,
            height: 33,
        };
    }

    // method to check for horizontal collisions with the blocks
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
                    this.velocity.x = 0;
                    this.position.x = collisionBlock.position.x - this.hitbox.width - (this.hitbox.position.x - this.position.x);
                    break;
                }

                if (this.velocity.x < 0) {
                    this.velocity.x = 0;
                    this.position.x = collisionBlock.position.x + collisionBlock.width - (this.hitbox.position.x - this.position.x);
                    break;
                }
            }
        }

        // check for slopes
        for (let i = 0; i < this.slantCollisionBlocks.length; i++) {
            const slantCollisionBlock = this.slantCollisionBlocks[i];
            if (
                collision({
                    object1: this.hitbox,
                    object2: slantCollisionBlock,
                })
            ) {
                const slopeHeight = this.calculateSlopeHeight(slantCollisionBlock, this.hitbox.position.x);
                const offset = this.hitbox.position.y - this.position.y + this.hitbox.height;

                if (
                    this.position.y + offset > slantCollisionBlock.position.y + slopeHeight &&
                    this.hitbox.position.x >= slantCollisionBlock.position.x &&
                    this.hitbox.position.x <= slantCollisionBlock.position.x + slantCollisionBlock.width
                ) {
                    if (this.velocity.y >= 0) {
                        this.position.y = slantCollisionBlock.position.y + slopeHeight - offset - 0.01;
                    }
                }
            }
        }
    }

    // method to apply gravity to the player
    applyGravity() {
        this.velocity.y += gravity;
        this.position.y += this.velocity.y;
    }

    // method to check for ceilings and platforms
    checkForVerticalCollision() {
        for (let i = 0; i < this.slantCollisionBlocks.length; i++) {
            const slantCollisionBlock = this.slantCollisionBlocks[i];
            if (
                collision({
                    object1: this.hitbox,
                    object2: slantCollisionBlock,
                })
            ) {
                if (this.velocity.y > 0) {
                    const slopeHeight = this.calculateSlopeHeight(slantCollisionBlock, this.hitbox.position.x);
                    const offset = this.hitbox.position.y - this.position.y + this.hitbox.height;

                    if (
                        this.position.y + offset > slantCollisionBlock.position.y + slopeHeight &&
                        this.hitbox.position.x >= slantCollisionBlock.position.x &&
                        this.hitbox.position.x <= slantCollisionBlock.position.x + slantCollisionBlock.width
                    ) {
                        this.velocity.y = 0;
                        this.position.y = slantCollisionBlock.position.y + slopeHeight - offset - 0.01;
                    }
                }
            }
        }

        for (let i = 0; i < this.collisionBlocks.length; i++) {
            const collisionBlock = this.collisionBlocks[i];
            if (
                collision({
                    object1: this.hitbox,
                    object2: collisionBlock,
                })
            ) {
                if (this.velocity.y > 0) {
                    this.velocity.y = 0;
                    const offset = this.hitbox.position.y - this.position.y + this.hitbox.height;
                    this.position.y = collisionBlock.position.y - offset - 0.01;
                    break;
                }

                if (this.velocity.y < 0) {
                    this.velocity.y = 0;
                    const offset = this.hitbox.position.y - this.position.y;
                    this.position.y = collisionBlock.position.y + collisionBlock.height - offset + 0.01;
                    break;
                }
            }
        }

        for (let i = 0; i < this.platformCollisionBlocks.length; i++) {
            const platformCollisionBlock = this.platformCollisionBlocks[i];
            if (
                platformCollision({
                    object1: this.hitbox,
                    object2: platformCollisionBlock,
                })
            ) {
                if (this.velocity.y > 0) {
                    this.velocity.y = 0;
                    const offset = this.hitbox.position.y - this.position.y + this.hitbox.height;
                    this.position.y = platformCollisionBlock.position.y - offset - 0.01;
                    break;
                }
            }
        }
    }

    // method to calculate the slope height to help the player walk up and down slopes
    calculateSlopeHeight(slopeBlock, x) {
        const slopeWidth = slopeBlock.width;
        const slopeHeight = slopeBlock.height;
        const relativeX = x - slopeBlock.position.x;

        if (relativeX < 0 || relativeX > slopeWidth) return 0;

        if (slopeBlock.slope > 0) {
            return (relativeX / slopeWidth) * slopeHeight;
        } else if (slopeBlock.slope < 0) {
            return slopeHeight - (relativeX / slopeWidth) * slopeHeight;
        }

        return 0;
    }

    // method to check if the player is colliding with a block
    isCollidingWith(block) {
        return (
            this.position.x + this.width > block.position.x &&
            this.position.x < block.position.x + block.width &&
            this.position.y + this.height > block.position.y &&
            this.position.y < block.position.y + block.height
        );
    }

    // method to draw the player on the canvas
    draw() {
        ctx.save();

        if (this.lastDirection === 'left') {
            ctx.scale(-1, 1);
            ctx.drawImage(
                this.image,
                this.currentFrame * (this.image.width / this.frameRate),
                0,
                this.image.width / this.frameRate,
                this.image.height,
                -(this.position.x + this.width),
                this.position.y,
                this.width,
                this.height
            );
        } 
        else {
            ctx.drawImage(
                this.image,
                this.currentFrame * (this.image.width / this.frameRate),
                0,
                this.image.width / this.frameRate,
                this.image.height,
                this.position.x,
                this.position.y,
                this.width,
                this.height
            );
        }

        ctx.restore();
    }
}

// function to check for collisions between the player and the blocks
function collision({ object1, object2 }) {
    return (
        object1.position.x < object2.position.x + object2.width &&
        object1.position.x + object1.width > object2.position.x &&
        object1.position.y < object2.position.y + object2.height &&
        object1.position.y + object1.height > object2.position.y
    );
}

// toggle controls for touchscreens
const touchControls = document.getElementById('touch-controls');
const toggleButton = document.getElementById('toggle-controls-button');