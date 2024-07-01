/**@type{HTMLCanvasElement} */

const canvas=document.getElementById('canvas1')
const ctx=canvas.getContext('2d')

let equation='a'

const dropdown=document.getElementById('functions')
dropdown.addEventListener('change',function(e){
    equation=e.target.value
})

let backgroundAudio = new Audio()
backgroundAudio.src='happyDay.mp3'

// let rectangles=prompt('Enter number of rectangles', 50)
// let rectangles=100
let height=0

let a
let b

let aRange=(-canvas.width/2)
let bRange=(canvas.width/2)

let offset=0
let zoom=2
let zoomSpeed=0

const slider = document.getElementById('mySlider');
const output = document.getElementById('sliderValue');
let sliderValue = slider.value;  // Initialize with the initial slider value


// Update the current slider value and the variable (each time you drag the slider handle)
slider.oninput = function() {
    sliderValue = this.value;  // Store the slider value in a JavaScript variable
    output.textContent = sliderValue;  // Update the displayed value
}

const slider2 = document.getElementById('mySlider2');
let widthValue = slider2.value;  // Initialize with the initial slider value


// Update the current slider value and the variable (each time you drag the slider handle)
slider2.oninput = function() {
    widthValue = this.value;  // Store the slider value in a JavaScript variable
}




rectangles=sliderValue

let areaX=-canvas.width/2

let areaWidth=30

let canvasPosition = canvas.getBoundingClientRect()

let base=(b-a)/rectangles
let area=0

let totalArea=0

let pause= false

let lastX=0
let lastY=0

let width=2

let offsetSpeed=0

let x=0
let y=0

let rightPressed=false
let leftPressed=false
let upPressed=false
let downPressed=false

function loop(){
    ctx.beginPath()
    ctx.fillText((-canvas.width/2)-offset,-canvas.width,canvas.height/2,999)
    ctx.fillText((canvas.width/2)-offset,canvas.width,canvas.height/2,999)
    ctx.fillText((canvas.width/2)-(offset/2),canvas.width/2,canvas.height/2.999)
    ctx.fill()

    if(leftPressed){
        offsetSpeed--
    }
    if(rightPressed){
        offsetSpeed++
    }
    if(upPressed){
        zoomSpeed+=0.001
    }
    if(downPressed){
        zoomSpeed-=0.001
    }
    offsetSpeed=0.93*offsetSpeed
    zoomSpeed=0.9*zoomSpeed

    offset+=offsetSpeed
    zoom+=zoomSpeed

    width=widthValue
    width=width/50
    width=width*zoom
    rectangles=sliderValue
    base=(((areaX-20)-(areaX+20))/(rectangles/width))

    // rectangles=5

    // areaX++
    totalArea=0
    ctx.clearRect(0,0,canvas.width,canvas.height)
    ctx.font='20px Verdana'
    ctx.fillStyle='black'
    ctx.fillText('Rectangles:', 5,30,9999)
    ctx.fillText(rectangles, 140,30,9999)
    ctx.beginPath()
    ctx.lineWidth=2
    ctx.strokeStyle='black'
    ctx.moveTo(0,canvas.height/2)
    ctx.lineTo(canvas.width,canvas.height/2)
    // ctx.fillText(areaX-20,areaX+(canvas.width/2)-20,canvas.height/2,999)
    // ctx.moveTo(canvas.width/2,0)
    // ctx.lineTo(canvas.width/2,canvas.height)
    
    ctx.stroke()
    drawDaNumbers()
    drawShadedArea()

    draw()
    // backgroundAudio.play()
    requestAnimationFrame(loop)
}

function f(a){
    switch(equation){

        case 'a':
            return((100*zoom)*(Math.sin(((a/zoom)+offset)/20))+(canvas.height/2))
            break;
        case 'b':
            return((100*zoom)*(Math.cos(((a/zoom)+offset)/20))+(canvas.height/2))
            break;
        case 'c':
            return(((zoom/100)*((((a/zoom)+offset))**2))+(canvas.height/3))
            break;
        case 'd':
            return(((zoom/1000)*((((-a/zoom)+offset))**3))+(canvas.height/2))
            break;
        case 'e':
            return(((200*zoom)*((Math.cos(((a/zoom)+offset)/90))-(Math.sin(((a/zoom)+offset)/80)*Math.cos(((a/zoom)+offset)/100*Math.PI))))+(canvas.height/2))
            break;
        

        
    }
}



function draw(){
    for(let i = -canvas.width/1.8;i<canvas.width/1.8;i++){
        x=i+(canvas.width/2)
        y=f(i)
        ctx.lineWidth=5
        ctx.beginPath()
        // ctx.strokeStyle='#000866'
        ctx.strokeStyle='darkblue'
        ctx.moveTo((i-1)+(canvas.width/2),f(i-1))
        ctx.lineTo(x,y)
        ctx.stroke()
        
    }
}

function drawShadedArea(){

    for(let i = 0;i<rectangles;i++){
        x=areaX+(i*base)
        height=f(x)
        ctx.beginPath()
        area=-base*f(x)
        if(((canvas.height/2)-height)*-base>0){
            ctx.fillStyle='#007B00'
        }else{
            ctx.fillStyle='#A50000'
        }
        
        ctx.fillRect(x+(canvas.width/2),height,base,(canvas.height/2)-height)
        ctx.fill()

        x=(areaX)+(-i*(base))
        console.log((canvas.height/2)-f(x))
        area=(width/rectangles)*Math.abs((canvas.height/2)-f((x)))
        totalArea+=area
    }

    // ctx.font='20px Verdana'
    // ctx.beginPath()
    // ctx.fillText((Math.round(totalArea*1000)/1000),areaX-45+canvas.width/2,90,1100)
    // ctx.fill()

    
}

function drawDaNumbers(){


    // ctx.strokeStyle='black'
    // ctx.beginPath()
    // ctx.lineWidth=2
    // ctx.moveTo(areaX+(canvas.width/2)-(20*width),100)
    // ctx.lineTo(areaX+(canvas.width/2)-(20*width),canvas.height/2)
    // ctx.stroke()
    // ctx.beginPath()
    // ctx.lineWidth=5
    // ctx.moveTo(areaX+(canvas.width/2)-45,100)
    // ctx.lineTo(areaX+(canvas.width/2)+45,100)
    // ctx.stroke()
}

window.addEventListener('mousemove',function(e){
    if(pause==false){
        areaX=e.clientX+(20*width)-(canvas.width/2)-canvasPosition.left-10
    }
    
})

window.addEventListener('keyup',function(e){
    if(e.key=='Escape'){
        if (pause) {
            pause=false
        } else {
            pause=true
        }
    }

    if(e.key=='ArrowLeft'){
        leftPressed=false
    }
    if(e.key=='ArrowRight'){
        rightPressed=false
    }
    if(e.key=='ArrowUp'){
        upPressed=false
    }
    if(e.key=='ArrowDown'){
        downPressed=false
    }
})

window.addEventListener('keydown', function(e){
    if(e.key=='ArrowLeft'){
        leftPressed=true
    }
    if(e.key=='ArrowRight'){
        rightPressed=true
    }
    if(e.key=='ArrowUp'){
        upPressed=true
    }
    if(e.key=='ArrowDown'){
        downPressed=true
    }
})


loop()