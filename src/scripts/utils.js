// Check if the player is falling or jumping through the block
function collision({object1, object2}) {
    return(        
        object1.position.y + object1.height >= object2.position.y && 
        object1.position.y <= object2.position.y + object2.position.height && 
        object1.position.x <= object2.position.x + object2.width && 
        object1.position.x + object1.width >= object2.position.x
    ) 
}

// Check if the player is falling or jumping through the platform
function platformCollision({object1, object2}) {
    return(
        object1.position.y + object1.height >= object2.position.y && 
        object1.position.y + object1.height <= object2.position.y + object2.height && 
        object1.position.x <= object2.position.x + object2.width && 
        object1.position.x + object1.width >= object2.position.x
    ) 
}
