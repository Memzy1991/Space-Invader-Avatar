// ! Grid Creation
const grid = document.querySelector('.grid')
const width = 13
const cells = []
let deadEnemies = []
let changeDirection = 1
let right = true
let start
let lives = 3
let score = 0


for (let i = 0; i < width ** 2; i++) {
  // Creation of the the element with class
  const cell = document.createElement('div')
  // cell.classList.add('cell')
  // Appending the new element as a child to the grid - Storing the element in an array
  grid.appendChild(cell)
  cells.push(cell)
  // ? Temporary - To show numbers to help with maths and placement
  cell.innerHTML = i
  // Styling the size of the created element
  cell.style.width = `${100 / width}%`
  cell.style.height = `${100 / width}%`
}

// ! User and enemy AI creation
let userSpaceShip = 149
let enemyAi = [
  0, 1, 2, 3, 4, 5, 6, 7,
  13, 14, 15, 16, 17, 18, 19, 20,
  26, 27, 28, 29, 30, 31, 32, 33,
  39, 40, 41, 42, 43, 44, 45, 46
]

// Adding user to the grid
cells[userSpaceShip].classList.add('userSpaceShip')


// Adding enemy to the grid
function createEnemyAI (){
  for (let index = 0; index < enemyAi.length; index++) {
    const enemy = enemyAi[index]
    cells[enemy].classList.add('enemyAi')
  }
}

function removeEnemyAI (){
  for (let index = 0; index < enemyAi.length; index++) {
    const removeEnemy = enemyAi[index]
    cells[removeEnemy].classList.remove('enemyAi')
  }
}

createEnemyAI()

// ! Movement of user
function userMovement() {
  document.addEventListener('keydown', (event) => {
    const key = event.key
    if (key === 'a' && !(userSpaceShip % width === 0)) {
      cells[userSpaceShip].classList.add('userSpaceShip')
      cells[userSpaceShip].classList.remove('userSpaceShip')
      userSpaceShip -= 1
      cells[userSpaceShip].classList.add('userSpaceShip')
    } else if (key === 'd' && !(userSpaceShip % width === width - 1)) {
      cells[userSpaceShip].classList.add('userSpaceShip') 
      cells[userSpaceShip].classList.remove('userSpaceShip')
      userSpaceShip += 1
      cells[userSpaceShip].classList.add('userSpaceShip')
    } 
  })
}

userMovement()

// ! User Shoot

function shooting(event) {
  const key = event.key
  let bulletId
  let bullet = userSpaceShip
  function moveShot(){if (key === 'w'){
    cells[bullet].classList.remove('bullet')
    bullet -= width
    cells[bullet].classList.add('bullet') 

    if (cells[bullet].classList.contains('enemyAi')){
      clearInterval(bulletId)
      cells[bullet].classList.remove('bullet')

    }
      
  
  }
  }
  bulletId = setInterval(moveShot, 100)
  
  console.log(bullet)

  }

document.addEventListener('keydown', shooting)



// ! AI movement

function aiMovement() {
  removeEnemyAI()

  if (enemyAi[enemyAi.length - 1] % width === width - 1 && right) {
    for (let index = 0; index < enemyAi.length; index++) {
      enemyAi[index] += width + 1
      changeDirection = -1
      right = false
    }
  }

  if (enemyAi[0] % width === 0 && !right) {
    for (let index = 0; index < enemyAi.length; index++) {
      enemyAi[index] += width - 1
      changeDirection = 1
      right = true
    } 
  }
 
  for (let index = 0; index < enemyAi.length; index++) {
    enemyAi[index] += changeDirection
  }



  createEnemyAI()

  endgame()
}

start = setInterval(aiMovement, 100)

function endgame() {
  for (let index = 0; index < enemyAi.length; index++) {
    if (userSpaceShip === enemyAi[index] || lives === 0) {
      clearInterval(start)
      removeEnemyAI()
      document.getElementById('game-over').innerHTML = 'GAME OVER'
    }
  }
}

