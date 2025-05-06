const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')

// set dimensions of canvas to zoom in on the game
canvas.width = 450,
canvas.height = 360

const scaledCanvas = {
    width: canvas.width,
    height: canvas.height,
}

// declare arrays for different collision types
const floorCollisions2D = []
const platformCollisions2D = []
const slantCollisions2D = []

// break the collision data into 2D arrays to render the map
for (let i = 0; i < floorCollisions.length; i += 32) {
    floorCollisions2D.push(floorCollisions.slice(i, i + 32));
}

for (let i = 0; i < floorCollisions.length; i += 32) {
    platformCollisions2D.push(floorCollisions.slice(i, i + 32));
}

for (let i = 0; i < floorCollisions.length; i += 32) {
    slantCollisions2D.push(floorCollisions.slice(i, i + 32));
}

// create collision blocks for the different types of collisions
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
        } else if (symbol === 2) {
            slantCollisionBlocks.push(
                new CollisionBlock({
                    position: {
                        x: x * 32,
                        y: y * 32,
                    },
                    slope: -1,
                })
            )
        } else if (symbol === 6) {
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
        } else if (symbol === 7) {
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

// gravity variable to be used in the game
const gravity = .05

// create a character object
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

// default the touch controls to be hidden
let controlsVisible = false;
toggleButton.addEventListener('click', () => {
    controlsVisible = !controlsVisible;
    touchControls.style.display = controlsVisible ? 'block' : 'none';
    toggleButton.textContent = controlsVisible ? 'Hide Touch Controls' : 'Show Touch Controls';
});

// inputs for the game
const keys = {
    d: {
        pressed: false
    },
    a: {
        pressed: false
    },
    w: {
        pressed: false
    },
    RightArrow: {
        pressed: false
    },
    LeftArrow: {
        pressed: false
    },
    UpArrow: {
        pressed: false
    }
}

const leftButton = document.getElementById('left-button');
const rightButton = document.getElementById('right-button');
const jumpButton = document.getElementById('jump-button');

// set the initial state of the touch controls
let isMovingLeft = false;
let isMovingRight = false;

// create a background object
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

// animate the game by checking for the keys pressed and updating the player position
function animate() {
    window.requestAnimationFrame(animate)
    ctx.fillStyle = 'lavender'
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    // this is for keeping the camera and background in sync
    ctx.save()
    ctx.scale(1, 1)
    ctx.translate(camera.position.x, camera.position.y)
    background.update()

    // this checks for the camera position and updates it accordingly
    player1.checkForHorizontalCanvasCollision()
    player1.update()
    
    player1.velocity.x = 0
   
    // this checks for user input and updates the player position accordingly 
    if (keys.d.pressed || isMovingRight || keys.RightArrow.pressed) {
        player1.swapSprite('Run')
        player1.velocity.x = 1
        player1.lastDirection = 'right'
        player1.shouldPanCameraToLeft({ canvas, camera })
    } else if (keys.a.pressed || isMovingLeft || keys.LeftArrow.pressed) {
        player1.lastDirection = 'left'
        player1.swapSprite('RunLeft')
        player1.velocity.x = -1
        player1.shouldPanCameraToRight({ canvas, camera })
    } else if (player1.velocity.y === 0) {
        player1.swapSprite('Idle')
    }

    // this checks for the player's vertical position and updates the player position accordingly
    if (player1.velocity.y < 0) {
        player1.shouldPanCameraDown({ canvas, camera })
        player1.swapSprite('Jump')
    } else if (player1.velocity.y > 0) {
        player1.shouldPanCameraUp({ canvas, camera })
        if (player1.lastDirection === 'left') {
            player1.swapSprite('FallLeft')
        } else {
            player1.swapSprite('Fall')
        }
        player1.swapSprite('Fall')
    }

    // Reset jumpCount when the player lands
    if (player1.velocity.y === 0) {
        player1.jumpCount = 0;
    }
    // restore the canvas to its original state
    ctx.restore()

    // checks for collision with the camera and updates the camera position accordingly
    collisionBlocks.forEach((CollisionBlock) => {
        CollisionBlock.update(camera);
    })
    platformCollisionBlocks.forEach((CollisionBlock) => {
        CollisionBlock.update(camera);
    })
}

// this is the main function that draws and updates the game
animate()

// gets keyboard input and updates the player position accordingly
window.addEventListener('keydown', (event) => {
    switch (event.key) {
        case 'd':
        case 'ArrowRight':
            keys.d.pressed = true;
            keys.RightArrow.pressed = true;
            break;
        case 'a':
        case 'ArrowLeft':
            keys.a.pressed = true;
            keys.LeftArrow.pressed = true;
            break;
        case 'w':
        case 'ArrowUp':
            if (player1.jumpCount < 2) {
                player1.velocity.y = -2.13;
                player1.jumpCount++;
            }
            break;
    }
});

// this checks for the keyup event and updates the player position accordingly
window.addEventListener('keyup', (event) => {
    switch (event.key) {
        case 'd':
        case 'ArrowRight':
            keys.d.pressed = false;
            keys.RightArrow.pressed = false;
            break;
        case 'a':
        case 'ArrowLeft':
            keys.a.pressed = false;
            keys.LeftArrow.pressed = false;
            break;
        case 'w':
        case 'ArrowUp':
            keys.w.pressed = false;
            keys.UpArrow.pressed = false;
            break;    
    }
})

// this checks for the touch events and updates the player position accordingly
// passive: true is used to improve performance by allowing the browser to handle touch events without blocking the main thread
leftButton.addEventListener('touchstart', () => {
    isMovingLeft = true;
    player1.velocity.x = -5;
}, { passive: true });

leftButton.addEventListener('touchend', () => {
    isMovingLeft = false;
    if (!isMovingRight) player1.velocity.x = 0;
}, { passive: true });

rightButton.addEventListener('touchstart', () => {
    isMovingRight = true;
    player1.velocity.x = 5;
}, { passive: true });

rightButton.addEventListener('touchend', () => {
    isMovingRight = false;
    if (!isMovingLeft) player1.velocity.x = 0;
}, { passive: true });

jumpButton.addEventListener('touchstart', () => {
    if (player1.velocity.y === 0) {
        player1.velocity.y = -2.13;
    }
}, { passive: true });