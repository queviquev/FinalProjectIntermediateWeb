const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')

canvas.width = 576,
canvas.height = 420

const scaledCanvas = {
    width: canvas.width,
    height: canvas.height,
}

const floorCollisions2D = []

// break down the collision blocks into a 2d array
for (let i = 0; i < floorCollisions.length; i += 32) {
    floorCollisions2D.push(floorCollisions.slice(i, i + 32));
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
        else if (symbol === 2) {
            collisionBlocks.push(
                new CollisionBlock({
                    position: {
                        x: x * 32,
                        y: y * 32,
                        type: 'rightRamp',
                        slope: 1,
                    }
                })
            )
        }

        else if (symbol === 3) {
            collisionBlocks.push(
                new CollisionBlock({
                position: {
                    x: x * 32,
                    y: y * 32,
                    type: 'leftRamp',
                    slope: -1,
                }
            })
        )}
    })
})

const gravity = .05

// Create the Player instance
const player1 = new Player({
    position: {
        x: 100,
        y: 0,
    },
    collisionBlocks, 
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
    if(keys.d.pressed) {
        player1.swapSprite('Run')
        player1.velocity.x = 1
        player1.lastDirection = 'right'
        player1.shouldPanCameraToLeft({ canvas, camera })
    }
    else if(keys.a.pressed) {
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

    collisionBlocks.forEach((collisionBlock) => {
        collisionBlock.update()
    })

    
}

animate()

window.addEventListener('keydown', (event) => {
    switch (event.key) {
        case 'd':
            keys.d.pressed = true
            break
        case 'a':
            keys.a.pressed = true
            break
        case 'w':
            player1.velocity.y = -2.13
            break
    }
})

window.addEventListener('keyup', (event) => {
    switch (event.key) {
        case 'd':
            keys.d.pressed = false
            break
        case 'a':
            keys.a.pressed = false
            break
    }
})