
const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = window.innerWidth
canvas.height =window.innerHeight

// Variables
const mouse = {
  x: innerWidth / 2,
  y: innerHeight / 2
}

const gravity = 1;
const friction = 0.99;


const colors = ['#8C1F66', '#323673', '#33A6A6', '#F29544','#F25041']

function randomIntFromRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

function randomColor(colors) {
  return colors[Math.floor(Math.random() * colors.length)]
}

// Event Listeners
addEventListener('mousemove', (event) => {
  mouse.x = event.clientX
  mouse.y = event.clientY
})

addEventListener('resize', () => {
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight
})

// Objects
class Ball {
  constructor(x, y,dx,dy, radius, color) {
    this.x = x
    this.y = y
    this.dx = dx;
    this.dy = dy
    this.radius = radius
    this.color = color
  }

  draw() {
    c.beginPath()
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
    c.fillStyle = this.color
    c.fill()
    c.strokeStyle = 'white'
    c.stroke()
    c.closePath()
  }

  update() {
    if(this.y + this.radius + this.dy > canvas.height){
      this.dy = -this.dy * friction; 
    }else{
      this.dy +=gravity;
    }
    if(this.x + this.radius + this.dx > canvas.width || this.x - this.radius + this.dx <= 0 ){
      this.dx = -this.dx;
    }
    this.y += this.dy;
    this.x += this.dx;
    this.draw()
  }
}

// Implementation


let ballArray = [];
function init() {
  for(let i=0; i<200; i++){
    let radius = randomIntFromRange(10,20);
    let x = randomIntFromRange(0,canvas.width - radius);
    let y = randomIntFromRange(0,canvas.height - radius);
    let dx = randomIntFromRange(-2,2);
    let dy = randomIntFromRange(-2,2);
    let color = randomColor(colors);
  
    ballArray.push(new Ball(x,y,dx,dy,radius,color));
  }
  

  animate()
}

// Animation Loop
function animate() {
  requestAnimationFrame(animate)
  c.clearRect(0, 0, canvas.width, canvas.height)

  for(let i=0; i<ballArray.length; i++){
    ballArray[i].update();
  }
}

init()

