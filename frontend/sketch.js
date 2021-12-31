function hashColour(str) {
    var hash = 0;
    if (str.length === 0) return hash;
    for (var i = 0; i < str.length; i++) {
        hash = str.charCodeAt(i) + ((hash << 5) - hash);
        hash = hash & hash;
    }
    var color = '#';
    for (var i = 0; i < 3; i++) {
        var value = (hash >> (i * 8)) & 255;
        color += ('00' + value.toString(16)).substr(-2);
    }
    return color;
}

/** Draw Function **/
function draw() {
    if(id == undefined || globalState.players == undefined || globalState.players[id] == undefined){
        console.log("returned")
        return;   
    }
    // Display World
    background('#222');
    
    push();
    translate(windowWidth/2 + globalState.players[id].cameraX, windowHeight/2 + globalState.players[id].cameraY);
    
    //World Outline
    stroke(255, 255, 255);
    strokeWeight(5);
    noFill();
    rect(0, 0, 800, 800);
    
    //Loop through players
    for (const [userId, user] of Object.entries(globalState.players)) {
        // Display player
        push();
        translate(user.x, user.y)
        rotate(radians(user.r));
        stroke(hashColour(userId));
        rect(-25, -25, 50, 50);
        point(-15,-18);
        point(15,-18);
        pop();
    }
    pop(); 
    
    // globalStateUpdate()
}


/** Input Handling **/
function keyPressed() {
    socket.emit("keyEntered", keyCode, true)
}
function keyReleased() {
    socket.emit("keyEntered", keyCode, false)
}
