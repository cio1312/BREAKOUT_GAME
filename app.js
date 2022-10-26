
const grid = document.querySelector('.grid') // get the grid element
const scoredisplay = document.querySelector('#score')
const blockWidth = 100
const blockHeight = 20
const balldiameter = 20
const boardWidth = 560
const boardheight =300
let timerID
let xDirection = -2 
let yDirection = 2
let score =0;

const userStart = [230, 10];
let currentposition = userStart;

const ballStart = [270, 40];
let ballCurrentPosition = ballStart;

// Create-block
class Block {

    constructor(xAxis, yAxis) {
        this.bottomLeft = [xAxis, yAxis]
        this.bottomRight = [xAxis + blockWidth, yAxis]
        this.topLeft = [xAxis, yAxis + blockHeight]
        this.topRight = [xAxis + blockWidth, yAxis + blockHeight]

    }
}


//All my blocks(array of objects)
const blocks = [
    new Block(10, 270),
    new Block(120, 270),
    new Block(230, 270),
    new Block(340, 270),
    new Block(450, 270),
    new Block(10, 240),
    new Block(120, 240),
    new Block(230, 240),
    new Block(340, 240),
    new Block(450, 240),
    new Block(10, 210),
    new Block(120, 210),
    new Block(230, 210),
    new Block(340, 210),
    new Block(450, 210)
]

//console.log(blocks[0])

// Draw-all-blocks
function addblocks() {

    for (let i = 0; i < blocks.length; i++) {
        const block = document.createElement('div') // make an html element
        block.classList.add('block')                // add a css class to the element
        block.style.left = blocks[i].bottomLeft[0] + 'px' // that is xAxis
        block.style.bottom = blocks[i].bottomLeft[1] + 'px'  // yaxis
        grid.appendChild(block)
    }
}

addblocks()

// Add user
const user = document.createElement('div')
user.classList.add('user')
drawuser()
grid.appendChild(user)


// draw the user
function drawuser() {
    user.style.left = currentposition[0] + 'px' // that is xAxis
    user.style.bottom = currentposition[1] + 'px'  // yaxis
}


//Move User
function moveuser(e) {

    switch (e.key) {   // listening to keyboard clicks
        case 'ArrowLeft':
            if (currentposition[0] > 0) {  // not to go beyond edge
                currentposition[0] -= 10 // move the x axis position 
                drawuser()             // redraw the user
            }
            break;


        case 'ArrowRight':
            if (currentposition[0] < (boardWidth - blockWidth)) {  // not to go beyond edge
                currentposition[0] += 10 // move the x axis position 
                drawuser()             // redraw the user
            }
            break;

    }

}

document.addEventListener('keydown', moveuser)




// add ball
const ball = document.createElement('div')
ball.classList.add('ball')
drawtheball()
grid.appendChild(ball)

// move the ball
function moveball() {
    ballCurrentPosition[0] += xDirection
    ballCurrentPosition[1] += yDirection
    drawtheball()
    cehckforcollisions()
}

timerID = setInterval(moveball, 30) // increase ball speed


// draw the ball
function drawtheball() {
    ball.style.left = ballCurrentPosition[0] + 'px' // that is xAxis
    ball.style.bottom = ballCurrentPosition[1] + 'px'  // yaxis
}

// check for collision
function cehckforcollisions() {
     // check for block collision
     for(let i=0;i<blocks.length;i++){
        if(
            (ballCurrentPosition[0] > blocks[i].bottomLeft[0] && ballCurrentPosition[0]<blocks[i].bottomRight[0] ) &&
            ((ballCurrentPosition[1] + balldiameter) > blocks[i].bottomLeft[1] && ballCurrentPosition[1]<blocks[i].bottomRight[1] )
        ){
            // then ball is in area of block
           const allBlocks = Array.from(document.querySelectorAll('.block'))
          
           allBlocks[i].classList.remove('block')   // we remove block
           blocks.splice(i,1)    // we remove block actually
           //console.log(allBlocks)
           changeDirections()
           score++
           scoredisplay.innerHTML = score;

           // check for win
           if(blocks.length ===0 ){
            scoredisplay.innerHTML = 'You Win';
            clearInterval(timerID)
            document.removeEventListener('keydown',moveuser)
           }
        }
     }

    // check wall collisions
    if (ballCurrentPosition[0] >= (boardWidth - balldiameter) ||
        ballCurrentPosition[1] >= (boardheight - balldiameter) ||
        ballCurrentPosition[0] <= 0
        ) {
        changeDirections()
    }

    // check for user colliosios
    if( 
        (ballCurrentPosition[0] > currentposition[0] && ballCurrentPosition[0] < currentposition[0]+blockWidth) &&
        (ballCurrentPosition[1] > currentposition[1] && ballCurrentPosition[1] < currentposition[1]+blockHeight)
        ){
            changeDirections()
    }

    // check for game over
    if(  ballCurrentPosition[1] <= 0){
        clearInterval(timerID)   // to stop the ball
        scoredisplay.innerHTML = 'You Loose'
        document.removeEventListener('keydown',moveuser)
        
    }
}

function changeDirections() {
    if (xDirection === 2 && yDirection === 2) {
        yDirection = -2
        return
    }

    if (xDirection === 2 && yDirection === -2) {
        xDirection = -2
        return
    }

    if (xDirection === -2 && yDirection === -2) {
        yDirection = 2
        return
    }
    if (xDirection === -2 && yDirection === 2) {
        xDirection = 2
        return
    }

}

