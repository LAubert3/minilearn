var chimeSound = new Audio('./sounds/chime.mp3')
var dingSound = new Audio('./sounds/ding.mp3')
var beepSound = new Audio('./sounds/beep.mp3')

const meditate = document.getElementById('meditate')
const workout = document.getElementById('workout')
const img = document.getElementById('timer-image')
const group = document.getElementById('group')
const start = document.getElementById('timer')
const minutes = document.getElementById('minutes')
const seconds = document.getElementById('seconds')
const min = document.getElementById('numberInput')
const sec = document.getElementById('numberInputTwo')
const dials = document.getElementById('w-cont')
const interV = document.getElementById('intervals')

dials.style.display = 'none'
let meditateClicked = true
let workoutClicked = false
let minClicked = false
let secClicked = false
let startedM = false
let startedW = false
let working = 0
let int = 0
let iCount = 0

meditate.style.backgroundColor = 'aquamarine'
img.style.background =
  'linear-gradient(45deg, aquamarine, rgba(222, 35, 178, 0.741))'
minutes.style.background =
  'linear-gradient(45deg, aquamarine, rgba(222, 35, 178, 0.741))'
seconds.style.background =
  'linear-gradient(45deg, aquamarine, rgba(222, 35, 178, 0.741))'

meditate.addEventListener('click', function () {
  if (timeM === 0 && timeS === 0) {
    meditateClicked = true
    workoutClicked = false
    cancelTimeout()
    colorButtons()
    dials.style.display = 'none'
  }
  if (startedM === false && startedW === false) {
    meditateClicked = true
    workoutClicked = false
    colorButtons()
    dials.style.display = 'none'
  }
})

workout.addEventListener('click', function () {
  if (timeM === 0 && timeS === 0) {
    workoutClicked = true
    meditateClicked = false
    colorButtons()
    cancelTimeout()
    dials.style.display = 'flex'
  }
  if (startedM === false && startedW === false) {
    workoutClicked = true
    meditateClicked = false
    colorButtons()
    dials.style.display = 'flex'
  }
})

start.addEventListener('mouseenter', function () {
  if (meditateClicked === true && workoutClicked === false) {
    start.style.backgroundColor = 'aquamarine'
  }

  if (meditateClicked === false && workoutClicked === true) {
    start.style.backgroundColor = 'rgb(255, 174, 0)'
  }
})

start.addEventListener('mouseout', function () {
  start.style.backgroundColor = 'whitesmoke'
})

function colorButtons() {
  if (meditateClicked === true && workoutClicked === false) {
    meditate.style.backgroundColor = 'aquamarine'
    workout.style.backgroundColor = 'whitesmoke'
    img.src = './img/meditate.png'
    img.style.background =
      'linear-gradient(45deg, aquamarine, rgba(222, 35, 178, 0.741))'
    minutes.style.background =
      'linear-gradient(45deg, aquamarine, rgba(222, 35, 178, 0.741))'
    seconds.style.background =
      'linear-gradient(45deg, aquamarine, rgba(222, 35, 178, 0.741))'
  }

  if (workoutClicked === true && meditateClicked === false) {
    workout.style.backgroundColor = 'rgb(255, 174, 0)'
    meditate.style.backgroundColor = 'whitesmoke'
    img.src = './img/workout.png'
    img.style.background =
      'linear-gradient(45deg, rgba(216, 114, 11, 0.781), rgba(222, 35, 178, 0.741))'
    minutes.style.background =
      'linear-gradient(45deg, rgba(216, 114, 11, 0.781), rgba(222, 35, 178, 0.741))'
    seconds.style.background =
      'linear-gradient(45deg, rgba(216, 114, 11, 0.781), rgba(222, 35, 178, 0.741))'
  }
}
colorButtons()

const inp1 = document.getElementById('minTxt')
const minInput = document.getElementById('numberInput')

inp1.addEventListener('mouseenter', function () {
  inp1.style.display = 'none'
})

minInput.addEventListener('mouseout', function () {
  let myVal1 = minInput.value
  if (myVal1.trim() === '') {
    inp1.style.display = 'inline'
  }
})

minInput.addEventListener('click', function () {
  inp1.style.display = 'none'
})

const inp2 = document.getElementById('secTxt')
const secInput = document.getElementById('numberInputTwo')

inp2.addEventListener('mouseenter', function () {
  inp2.style.display = 'none'
})

secInput.addEventListener('mouseout', function () {
  let myVal2 = secInput.value
  if (myVal2.trim() === '') {
    inp2.style.display = 'inline'
  }
})

secInput.addEventListener('click', function () {
  inp2.style.display = 'none'
})

//timer----------------------------------------------------------------
let timeM, timeS
interV.value = 2

int = parseInt(interV.value)
iCount = int
console.log('iCount: ' + iCount)

let workoutLength = 0
let repLength = 0
let repTracker = 2

interV.addEventListener('change', function () {
  if (workoutClicked === true && startedW === false) {
    if (interV.value <= 2) {
      interV.value = 2
    }
    int = parseInt(interV.value)
    iCount = int
    console.log('iCount: ' + iCount)
    workoutLength = parseInt(timeM * 60 + timeS)
    repLength = workoutLength / iCount
    repTracker = repLength
  }
})

let timeoutId

function startTimeout() {
  timeoutId = setTimeout(counter, 1000)
}

function cancelTimeout() {
  clearTimeout(timeoutId)
}

function counter() {
  if (timeM >= 0 && timeS >= 1) {
    timeS -= 1
  }
  if (timeM >= 1) {
    if (timeS === 0) {
      timeM -= 1
      timeS = 60
      if (meditateClicked === true) {
        dingSound.play()
      }
    }
  }
  if (timeS >= 1) {
    if (workoutClicked === true && repTracker >= 1) {
      repTracker -= 1
      console.log('repTracker: ' + repTracker)
      console.log('replength:' + repLength)
    }
    if (workoutClicked === true && repTracker === 0) {
      dingSound.play()
      repTracker = repLength
    }
  }
  if (timeM === 0 && timeS === 0) {
    if (meditateClicked === true) {
      chimeSound.play()
    }
    if (workoutClicked === true) {
      beepSound.play()
    }
    startedM = false
    startedW = false
  }
  if (
    (timeM[0] === '0' && parseInt(timeM[1]) >= 1) ||
    (timeS[0] === '0' && parseInt(timeS[1]) >= 1)
  ) {
    timeS = timeS.substr(1)
  }

  min.value = timeM
  sec.value = timeS
  console.log('min: ' + timeM + ' sec: ' + timeS)
  startTimeout()
}

start.addEventListener('click', function () {
  if (start.textContent === 'Start') {
    if (meditateClicked === true && workoutClicked === false) {
      startedM = true
      startedW = false
    }
    if (meditateClicked === false && workoutClicked === true) {
      startedM = false
      startedW = true
    }
    timeM = parseInt(min.value)
    timeS = parseInt(sec.value) + 1

    inp1.style.display = 'none'
    inp2.style.display = 'none'

    if (isNaN(timeM)) {
      timeM = 0
    }

    if (isNaN(timeS)) {
      timeS = 0
    }

    if (timeM >= 0 && timeS >= 0) {
      start.textContent = 'Stop'
      counter()
      if (workoutClicked === true && startedW === false) {
        iCount = int
      }
    }

    workoutLength = parseInt(timeM * 60 + timeS)
    repLength = workoutLength / iCount

    console.log('workoutLength: ' + workoutLength)
    console.log('repLength: ' + repLength)
  } else {
    start.textContent = 'Start'
    cancelTimeout()
  }
})