const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')

canvas.width = 450,
canvas.height = 360

const scaledCanvas = {
    width: canvas.width,
    height: canvas.height,
}

const floorCollisions2D = []
const platformCollisions2D = []
const slantCollisions2D = []

// break down the collision blocks into a 2d array
for (let i = 0; i < floorCollisions.length; i += 32) {
    floorCollisions2D.push(floorCollisions.slice(i, i + 32));
}

for(let i = 0; i < floorCollisions.length; i += 32) {
    platformCollisions2D.push(floorCollisions.slice(i, i + 32));
}

for(let i = 0; i < floorCollisions.length; i += 32) {
    slantCollisions2D.push(floorCollisions.slice(i, i + 32));
}

const collisionBlocks = []
floorCollisions2D.forEach((row, y) => {
    row.forEach((symbol, x) => {
        if (symbol === 1) {
            collisionBlocks.push(
                new CollisionBlock({
                    position: {
                        x: x * 32,
                        y: y * 32,
                    },
                })
            );
        }
    });
});


const platformCollisionBlocks = []
platformCollisions2D.forEach((row, y) => {
    row.forEach((symbol, x) => {
        if (symbol === 20 || symbol === 21 || symbol === 22) {
            platformCollisionBlocks.push(
                new CollisionBlock({
                    position: {
                        x: x * 32,
                        y: y * 32,
                    },
                    height: 8,     
                })
            );
        }
    });
})

const slantCollisionBlocks = []
slantCollisions2D.forEach((row, y) => {
    row.forEach((symbol, x) => {
        if (symbol === 3) {
            slantCollisionBlocks.push(
                new CollisionBlock({
                    position: {
                        x: x * 32,
                        y: y * 32,
                    },
                    slope: 1,
                })
            )
        }
        else if (symbol === 2) {
            slantCollisionBlocks.push(
                new CollisionBlock({
                    position: {
                        x: x * 32,
                        y: y * 32,
                    },
                    slope: -1,
                })
            )
        }        
        else if (symbol === 6) {
            slantCollisionBlocks.push(
                new CollisionBlock({
                    position: {
                        x: x * 32,
                        y: y * 32,
                    },
                    height: 16,
                    slope: 0.5,
                })
            );
        }
        else if (symbol === 7) {
            slantCollisionBlocks.push(
                new CollisionBlock({
                    position: {
                        x: x * 32,
                        y: y * 32 + 16,
                    },
                    height: 16,
                    slope: 0.5,
                })
            );
        }

    });
})

const gravity = .05

// Create the Player instance
const player1 = new Player({
    position: {
        x: 100,
        y: 0,
    },
    collisionBlocks,
    platformCollisionBlocks,
    slantCollisionBlocks,
    imageSrc: 'src/imgs/mainChar/Idle.png',
    frameRate: 4,
    animations: {
        Idle: {
            imageSrc: 'src/imgs/mainChar/Idle.png',
            frameRate: 4,
            image: new Image(),
            frameBuffer: 15,
        },
        Run: {
            imageSrc: 'src/imgs/mainChar/mainCharRun.png',
            frameRate: 6,
            image: new Image(),
            frameBuffer: 12,
        },
        Jump: {
            imageSrc: 'src/imgs/mainChar/Jump.png',
            frameRate: 4,
            image: new Image(),
            frameBuffer: 15,
        },
        Fall: {
            imageSrc: 'src/imgs/mainChar/fall.png',
            frameRate: 4,
            image: new Image(),
            frameBuffer: 15,
        },
        FallLeft: {
            imageSrc: 'src/imgs/mainChar/fall.png',
            frameRate: 4,
            image: new Image(),
            frameBuffer: 10,
        },
        RunLeft: {
            imageSrc: 'src/imgs/mainChar/mainCharRun.png',
            frameRate: 6,
            image: new Image(),
            frameBuffer: 12,
        },
        IdleLeft: {
            imageSrc: 'src/imgs/mainChar/Idle.png',
            frameRate: 4,
            image: new Image(),
            frameBuffer: 15,
        },
    }
})

let controlsVisible = false; // Start with touch controls hidden

toggleButton.addEventListener('click', () => {
    controlsVisible = !controlsVisible; // Toggle the visibility state
    touchControls.style.display = controlsVisible ? 'block' : 'none'; // Show or hide the controls
    toggleButton.textContent = controlsVisible ? 'Hide Touch Controls' : 'Show Touch Controls'; // Update button text
});

const keys = {
    d: {
        pressed: false
    },
    a: {
        pressed: false
    },
    w: {
        pressed: false
    }
}

// Select the buttons
const leftButton = document.getElementById('left-button');
const rightButton = document.getElementById('right-button');
const jumpButton = document.getElementById('jump-button');

// Variables to track player movement
let isMovingLeft = false;
let isMovingRight = false;

const background = new Sprite({
    position: {
        x: 0,
        y: 0
    },
    imageSrc: 'src/imgs/ForestMap.png'
})

const backgroundImageHeight = 576

const camera = {
    position: {
        x: 0,
        y: 0,
    },
}

function animate() {
    window.requestAnimationFrame(animate)
    ctx.fillStyle = 'lavender'
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    ctx.save()
    ctx.scale(1, 1)
    ctx.translate(camera.position.x, camera.position.y)
    background.update()

    player1.checkForHorizontalCanvasCollision()
    player1.update()

    player1.velocity.x = 0
    if(keys.d.pressed || isMovingRight) {
        player1.swapSprite('Run')
        player1.velocity.x = 1
        player1.lastDirection = 'right'
        player1.shouldPanCameraToLeft({ canvas, camera })
    }
    else if(keys.a.pressed || isMovingLeft) {
        player1.lastDirection = 'left'
        player1.swapSprite('RunLeft')
        player1.velocity.x = -1
        player1.shouldPanCameraToRight({ canvas, camera })
    }
    else if (player1.velocity.y === 0) {
        player1.swapSprite('Idle')
    }

    if (player1.velocity.y < 0) {
        player1.shouldPanCameraDown({ canvas, camera })
        player1.swapSprite('Jump')
        
    }
    else if (player1.velocity.y > 0) {
        player1.shouldPanCameraUp({ canvas, camera })
        if (player1.lastDirection === 'left') {
            player1.swapSprite('FallLeft')
        } 
        else {
            player1.swapSprite('Fall')
        }
        player1.swapSprite('Fall')
    }


    ctx.restore()

    collisionBlocks.forEach((CollisionBlock) => {
        CollisionBlock.update(camera);
    })
    platformCollisionBlocks.forEach((CollisionBlock) => {
        CollisionBlock.update(camera);
    })   
}

animate()

window.addEventListener('keydown', (event) => {
    switch (event.key) {
        case 'd': // Move right
        case 'ArrowRight': // Right arrow key
            keys.d.pressed = true;
            break;
        case 'a': // Move left
        case 'ArrowLeft': // Left arrow key
            keys.a.pressed = true;
            break;
        case 'w': // Jump
        case 'ArrowUp': // Up arrow key
            if (player1.velocity.y === 0) {
                player1.velocity.y = -2.13; // Adjust jump strength as needed
            }
            break;
    }
});

window.addEventListener('keyup', (event) => {
    switch (event.key) {
        case 'd': // Stop moving right
        case 'ArrowRight': // Right arrow key
            keys.d.pressed = false;
            break;
        case 'a': // Stop moving left
        case 'ArrowLeft': // Left arrow key
            keys.a.pressed = false;
            break;
    }
})

// Add touchstart and touchend listeners for the left button
leftButton.addEventListener('touchstart', () => {
    isMovingLeft = true;
    player1.velocity.x = -5; // Adjust speed as needed
}, { passive: true });

leftButton.addEventListener('touchend', () => {
    isMovingLeft = false;
    if (!isMovingRight) player1.velocity.x = 0; // Stop movement if not moving right
}, { passive: true });

// Add touchstart and touchend listeners for the right button
rightButton.addEventListener('touchstart', () => {
    isMovingRight = true;
    player1.velocity.x = 5; // Adjust speed as needed
}, { passive: true });

rightButton.addEventListener('touchend', () => {
    isMovingRight = false;
    if (!isMovingLeft) player1.velocity.x = 0; // Stop movement if not moving left
}, { passive: true });

// Add touchstart listener for the jump button
jumpButton.addEventListener('touchstart', () => {
    if (player1.velocity.y === 0) {
        player1.velocity.y = -2.13; // Adjust jump strength as needed
    }
}, { passive: true });
