var dingSound = new Audio('./sounds/ding.mp3')
var noSound = new Audio('./sounds/no.mp3')
const blank = ''
let types = ['arithmatic', 'algebra', 'series', 'parallel']
let termOne = document.getElementsByClassName('term-one')
let operators = document.getElementsByClassName('operator')
let termTwo = document.getElementsByClassName('term-two')
let termThree = document.getElementsByClassName('term-three')
let input = document.getElementsByClassName('term-input')

const btn1 = document.getElementById('arithmatic')
const btn2 = document.getElementById('algebra')
const btn3 = document.getElementById('series')
const btn4 = document.getElementById('parallel')

let tOne = document.getElementsByClassName('t-one')
let o = document.getElementsByClassName('op')
let tTwo = document.getElementsByClassName('vari')
let tThree = document.getElementsByClassName('t-three')
let ins = document.getElementsByClassName('t-input')
let t1, t3

//----------------------------------------
let currentBox = ''
document.addEventListener('click', function (e) {
  for (i = 0; i < types.length; i++) {
    if (e.target.classList.contains(types[i])) {
      currentBox = types[i]
      console.log('currentBox = ', currentBox)
    }
  }
})

document.addEventListener('keydown', function (e) {
  for (i = 0; i < types.length; i++) {
    if (e.target.classList.contains(types[i]) && e.key === 'Enter') {
      inputF()
    }
  }
})

function inputArithmatic() {
  if (parseFloat(input[0].value) === a) {
    termThree[0].style.visibility = 'visible'
    termThree[0].style.backgroundColor = 'rgb(1, 162, 1)'
    dingSound.play()
    input[0].value = blank
  } else {
    termThree[0].style.visibility = 'visible'
    termThree[0].style.backgroundColor = 'red'
    noSound.play()
    input[0].value = blank
  }
}

function inputAlagebra() {
  if (parseFloat(ins[0].value) === t2) {
    tTwo[0].style.visibility = 'visible'
    tTwo[0].style.backgroundColor = 'rgb(1, 162, 1)'
    dingSound.play()
    ins[0].value = blank
  } else {
    tTwo[0].style.visibility = 'visible'
    tTwo[0].style.backgroundColor = 'red'
    noSound.play()
    ins[0].value = blank
  }
}

//Filtration functions
function filter() {
  if (a === Infinity || (typeof a === 'number' && !Number.isInteger(a))) {
    //console.log("newEquation: filtered");
    newEquation()
  }

  if (a.toString().includes('Infinity')) {
    //console.log("newEquation: filtered");
    newEquation()
  }
}

function check() {
  if (a.toString().includes('.')) {
    //console.log("newEquation: filtered");
    newEquation()
  }
}

function aFilter() {
  if (
    t3 === Infinity ||
    (typeof t3 === 'number' && !Number.isInteger(t3)) ||
    t1 === 0
  ) {
    //console.log("newAlg: filtered");
    newAlg()
  }
  if (t3.toString().includes('Infinity')) {
    //console.log("newAlg: filtered");
    newAlg()
  }
}

function aCheck() {
  if (t3.toString().includes('.')) {
    //console.log("newAlg: filtered");
    newAlg()
  }
}

//--------------------------------------------------------------
btn1.addEventListener('click', function () {
  newEquation()
  filter()
  check()
})

btn2.addEventListener('click', function () {
  newAlg()
  aFilter()
  aCheck()
})

btn3.addEventListener('click', function () {
  getSeries()
})

btn4.addEventListener('click', function () {
  getParallel()
})

//--------------------------------------------------------------
function newEquation() {
  input[0].value = ''
  termThree[0].style.backgroundColor = ''
  const randomOp = Math.floor(Math.random() * 4)

  if (randomOp === 0) {
    operators[0].textContent = '+'
  } else if (randomOp === 1) {
    operators[0].textContent = '-'
  } else if (randomOp === 2) {
    operators[0].textContent = '*'
  } else if (randomOp === 3) {
    operators[0].textContent = '/'
  }
  const randomTerm1 = Math.floor(Math.random() * 101)
  termOne[0].textContent = randomTerm1.toString()

  const randomTerm2 = Math.floor(Math.random() * 101)
  termTwo[0].textContent = randomTerm2.toString()

  let t1 = randomTerm1
  let t2 = randomTerm2

  if (randomOp === 0) {
    a = t1 + t2
  } else if (randomOp === 1) {
    a = t1 - t2
  } else if (randomOp === 2) {
    a = t1 * t2
  } else if (randomOp === 3) {
    a = t1 / t2
  }

  termThree[0].style.visibility = 'hidden'
  termThree[0].textContent = a.toString()
  //console.log("newEquation: Term three is " + a);
  return a
}

function newAlg() {
  ins[0].value = ''
  tTwo[0].style.backgroundColor = ''
  const randomOp = Math.floor(Math.random() * 4)

  if (randomOp === 0) {
    o[0].textContent = '+'
  } else if (randomOp === 1) {
    o[0].textContent = '-'
  } else if (randomOp === 2) {
    o[0].textContent = '*'
  } else if (randomOp === 3) {
    o[0].textContent = '/'
  }
  const randomTerm1 = Math.floor(Math.random() * 101)
  tOne[0].textContent = randomTerm1.toString()

  const randomTerm2 = Math.floor(Math.random() * 101)
  tTwo[0].textContent = randomTerm2.toString()

  t1 = randomTerm1
  t2 = randomTerm2

  if (randomOp === 0) {
    t3 = t1 + t2
  } else if (randomOp === 1) {
    t3 = t1 - t2
  } else if (randomOp === 2) {
    t3 = t1 * t2
  } else if (randomOp === 3) {
    t3 = t1 / t2
  }

  tTwo[0].style.visibility = 'hidden'
  tThree[0].textContent = t3.toString()
  //console.log("newAlg: Term one is " + t1 + " term two is " + t2);
  return t2
}

//-----------------------------------------------
const r1 = document.getElementById('r1')
const r2 = document.getElementById('r2')
const r3 = document.getElementById('r3')

function getOhms() {
  let ohm = Math.floor(Math.random() * 6)

  if (ohm === 0) {
    ohm += 1
  }

  const chance = Math.floor(Math.random() * 6)

  if (chance % 2 === 1) {
    ohm += 0.5
  }

  return ohm
}

let rT

function getSeries() {
  const ohms1 = getOhms()
  const ohms2 = getOhms()
  const ohms3 = getOhms()

  r1.textContent = `${ohms1}Ω`
  r2.textContent = `${ohms2}Ω`
  r3.textContent = `${ohms3}Ω`

  rT = ohms1 + ohms2 + ohms3
  return rT
}

const sInput = document.querySelector('.s-input')
sInput.style.borderWidth = '1px'
sInput.style.borderColor = 'black'

function calcSeries() {
  let sVal = parseFloat(sInput.value)
  if (cVar && !sVar) {
    if (sVal === rT) {
      dingSound.play()
      sInput.style.border = 'solid'
      sInput.style.borderWidth = '5px'
      sInput.style.borderColor = 'green'
      sInput.value = ''
    } else {
      noSound.play()
      sInput.style.border = 'solid'
      sInput.style.borderWidth = '5px'
      sInput.style.borderColor = 'red'
      sInput.value = ''
    }
  }
}

//-------------------------------------
const o1 = document.getElementById('o1')
const o2 = document.getElementById('o2')
const o3 = document.getElementById('o3')

let oT

function getParallel() {
  const ohms1 = getOhms()
  const ohms2 = getOhms()
  const ohms3 = getOhms()

  o1.textContent = `${ohms1}Ω`
  o2.textContent = `${ohms2}Ω`
  o3.textContent = `${ohms3}Ω`

  oT = 1 / (1 / ohms1 + 1 / ohms2 + 1 / ohms3)
  console.log('oT = ' + oT)
  return oT
}

const pInput = document.querySelector('.p-input')

pInput.style.borderWidth = '1px'
pInput.style.borderColor = 'black'

function calcParallel() {
  let pVal = parseFloat(pInput.value)
    if (
      pVal === Math.round(oT) ||
      pVal === oT ||
      pVal === parseFloat(oT.toFixed(1))
    ) {
      dingSound.play()
      pInput.style.border = 'solid'
      pInput.style.borderWidth = '5px'
      pInput.style.borderColor = 'green'
      pInput.value = ''
    } else {
      noSound.play()
      pInput.style.border = 'solid'
      pInput.style.borderWidth = '5px'
      pInput.style.borderColor = 'red'
      pInput.value = ''
    }
}
