/**@type{HTMLCanvasElement} */

const canvas=document.getElementById('canvas1')
const ctx=canvas.getContext('2d')

// let rectangles=prompt('Enter number of rectangles', 50)
// let rectangles=100
let height=0

let a=0
let b=4

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

let x=0
let y=0

function loop(){

    width=widthValue
    width=width/50
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
    ctx.fillText(areaX-20,areaX+(canvas.width/2)-20,canvas.height/2,999)
    // ctx.moveTo(canvas.width/2,0)
    // ctx.lineTo(canvas.width/2,canvas.height)
    
    ctx.stroke()
    draw()
    drawDaNumbers()
    drawShadedArea()
    findIntegral()

    requestAnimationFrame(loop)
}

function f(a){
    // return(((1/90)*(a*a))+300)
    return(((200)*(Math.sin(a/60)))+(canvas.height/2))
    // return(((1/3000)*(a-4)*(a-2)*(a+4))+450)
}

function findIntegral(){
    for(let i = 1; i<rectangles; i++){
        height=f(a+(i*base))
        area=base*height
        totalArea+=area
    }
}

function draw(){
    for(let i = -canvas.width;i<canvas.width;i++){
        x=i+canvas.width/2
        y=f(i)

        ctx.lineWidth=5
        ctx.beginPath()
        ctx.strokeStyle='#FF0000'
        ctx.moveTo((i-1)+canvas.width/2,f(i-1))
        ctx.lineTo(x,y)
        ctx.stroke()
        
        
    }
}

function drawShadedArea(){

    for(let i = 0;i<rectangles;i++){
        x=areaX+(i*base)
        console.log(x)
        height=f(x)
        ctx.beginPath()
        area=-base*f(x)
        if(((canvas.height/2)-height)*-base>0){
            ctx.fillStyle='blue'
        }else{
            ctx.fillStyle='darkblue'
        }
        ctx.fillRect(x+(canvas.width/2),height,base,(canvas.height/2)-height)
        ctx.fill()
        area=-base*f(x)
        totalArea+=area
    }

    ctx.font='20px Verdana'
    ctx.beginPath()
    ctx.fillText((Math.round(totalArea*100000)/100000),areaX-45+canvas.width/2,90,1100)
    ctx.fill()

    
}

function drawDaNumbers(){


    ctx.strokeStyle='black'
    ctx.beginPath()
    ctx.lineWidth=2
    ctx.moveTo(areaX+(canvas.width/2),100)
    ctx.lineTo(areaX+(canvas.width/2),canvas.height/2)
    ctx.stroke()
    ctx.beginPath()
    ctx.lineWidth=5
    ctx.moveTo(areaX+(canvas.width/2)-45,100)
    ctx.lineTo(areaX+(canvas.width/2)+45,100)
    ctx.stroke()
}

window.addEventListener('mousemove',function(e){
    if(pause==false){
        areaX=e.clientX+(20*width)-(canvas.width/2)-canvasPosition.left
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
})



loop()