const dingSound = new Audio('./sounds/ding.mp3')
const noSound = new Audio('./sounds/no.mp3')

const title = document.getElementById('title')
const deckImage = document.getElementById('deck_image')
deckImage.style.backgroundColor = '#DFF0FF'
const buttons = document.getElementsByClassName('btnStyle')
const imgs = document.getElementsByClassName('card_image')
let deckImages = []
let qDeck = []
let aDeck = []
let questions = []
let answers = []
let currentImage = 0
let correctButton = 0
let score = 0
let health = 10
let starting = false
const time = document.getElementById('time') //Time Bar
const start = document.getElementById('deck') //Start Button
const select = document.getElementById('mySelect')
const btnOps = document.getElementsByClassName('btnOps')[0]
const btns = document.querySelectorAll('.btnStyle')
const lay = document.getElementById('layEmOut')
const back = document.getElementById('back')
lay.style.display = 'flex'
lay.style.flexDirection = 'row'
const windowWidth = window.innerWidth

//MENU:_______________(Observer Pattern)
const options = {
  main: [
    {
      value: 'main',
      label: 'Select a Deck',
      disabled: true,
      selected: true,
      hidden: true,
    },
    { value: 'language', label: 'Language' },
    { value: 'general', label: 'General' },
  ],
  language: [
    {
      value: 'languageMain',
      label: 'Select a Language',
      disabled: true,
      selected: true,
      hidden: true,
    },
    { value: 'english', label: 'English' },
    { value: 'spanish', label: 'Spanish' },
    { value: 'mandarin', label: 'Mandarin' },
    { value: 'german', label: 'German' },
    { value: 'hebrew', label: 'Hebrew' },
    { value: 'greek', label: 'Greek' },
    { value: 'latin', label: 'Latin' },
    { value: 'oldEng', label: 'Old English' },
    { value: 'egyptian', label: 'Egyptian' },
    { value: 'sumerian', label: 'Sumerian' },
    { value: 'aramaic', label: 'Aramaic' },
    { value: 'sanskrit', label: 'Sanskrit' },
    { value: 'protoIndo', label: 'Proto Indo-European' },
    { value: 'italian', label: 'Italian' },
    { value: 'french', label: 'French' },
    { value: 'farsi', label: 'Farsi' },
    { value: 'arabic', label: 'Arabic' },
    { value: 'japanese', label: 'Japanese' },
    { value: 'portuguese', label: 'Portuguese' },
    { value: 'basque', label: 'Basque' },
    { value: 'piraha', label: 'Piraha' },
    { value: 'cantonese', label: 'Cantonese' },
    { value: 'scripts', label: 'Scripts' },
  ],
  general: [
    {
      value: 'generalMain',
      label: 'Select a Topic',
      disabled: true,
      selected: true,
      hidden: true,
    },
    { value: 'code', label: 'Code & Computer Science' },
    { value: 'math', label: 'Math, Physics & Engineering' },
    { value: 'chemistry', label: 'Chemistry' },
    { value: 'biology', label: 'Biology' },
    { value: 'astro', label: 'Astronomy & Geoscience' },
    { value: 'anthro', label: 'Anthropology' },
  ],
}

//Update dropdown
function updateOptions(category) {
  select.innerHTML = ''
  const categoryOptions = options[category] || []

  //Add new options
  categoryOptions.forEach((option) => {
    const optionElement = document.createElement('option')
    optionElement.value = option.value
    optionElement.textContent = option.label
    if (option.disabled) optionElement.disabled = true
    if (option.selected) optionElement.selected = true
    if (option.hidden) optionElement.hidden = true
    select.appendChild(optionElement)
  })
}
updateOptions('main')

let selectedCategory

select.addEventListener('change', function () {
  selectedCategory = this.value
  starting = true
  updateOptions(selectedCategory)
  getDecks()
})

//----------------------------------------------------
for (var i = 0; i < btns.length; i++) {
  btns[i].disabled = true
}

function reset() {
  for (var i = 0; i < btns.length; i++) {
    btns[i].disabled = true
  }
  starting = false
  qDeck = []
  aDeck = []
  questions = []
  answers = []
  currentImage = 0
  correctButton = 0
  score = 0
  health = 10
  imgs[0].style.display = 'none'
  imgs[1].style.display = 'none'
  imgs[2].style.display = 'none'
  imgs[3].style.display = 'none'
  back.style.display = 'none'
  start.style.display = 'none'

  if (windowWidth <= 600) {
    deckImage.style.width = 'calc(100vw - 80px)'
    deckImage.style.height = 'auto'
  } else {
    deckImage.style.height = '300px'
    deckImage.style.width = '300px'
  }
  cancelReduceWidth()
}

back.addEventListener('click', function () {
  reset()
  time.style.visibility = 'hidden'
  select.style.visibility = 'visible'
  updateOptions('main')
  deckImage.src = './img/hillsunset.png'
  deckImage.style.backgroundColor = '#DFF0FF'
})

//DECKS:________________
const deckList = [
  'language',
  'general',
  'english',
  'spanish',
  'mandarin',
  'german',
  'hebrew',
  'greek',
  'latin',
  'oldEng',
  'egyptian',
  'sumerian',
  'aramaic',
  'sanskrit',
  'protoIndo',
  'italian',
  'french',
  'farsi',
  'arabic',
  'japanese',
  'portuguese',
  'basque',
  'piraha',
  'cantonese',
  'scripts',
  'code',
  'math',
  'chemistry',
  'biology',
  'astro',
  'anthro',
]

//CARD AMMOUNTS PER DECK:
// ["language"[0], "general"[0], "english"[312], "spanish"[103], "mandarin"[80], "german"[89],
// "hebrew"[83], "greek"[50], "latin"[84], "oldEng"[80], "egyptian"[40], "sumerian"[31],
// "aramaic"[36], "sanskrit"[50], "protoIndo"[46], "italian"[61], "french"[61], "farsi"[61],
// "arabic"[61], "japanese"[47], "portuguese"[61], "basque"[60], "piraha"[134],
// "cantonese"[61], "scripts"[306], "code"[251], "math"[105], "chemistry"[65], "biology"[149],
// "astro"[193], "anthro"[310]]

const topicNumbers = [
  0, 0, 312, 103, 80, 89, 83, 50, 84, 80, 40, 31, 36, 50, 46, 61, 61, 61, 61,
  47, 61, 60, 134, 61, 306, 251, 105, 65, 149, 193, 310,
]

function fillDecks(d, q, a) {
  let thisNum = 0
  for (let i = 2; i < deckList.length; i++) {
    if (d === deckList[i]) {
      thisNum = topicNumbers[i]
      console.log('thisNum = ' + thisNum)
      break
    }
  }

  let i = 1
  while (i <= thisNum) {
    const questionImagePath = `./img/decks/${d}/image${i}.png`
    const answerImagePath = `./img/decks/${d}/image${i} (1).png`
    q.push(questionImagePath)
    a.push(answerImagePath)
    i++
  }
}

function getDeck(q, a) {
  for (let i = 0; i < q.length; i++) {
    questions.push(q[i])
  }
  for (let i = 0; i < a.length; i++) {
    answers.push(a[i])
  }
}

function optionLayout() {
  back.style.display = 'flex'
  if (windowWidth <= 600) {
    start.style.width = '70%'
    start.style.transform = 'translate(-5px,-40px)'
  } else {
    start.style.width = '150px'
    start.style.transform = 'translate(65px,-40px)'
  }
}

let thisDeck = ''
function getDecks() {
  optionLayout()
  qDeck = []
  aDeck = []
  questions = []
  answers = []
  start.style.display = 'none'
  deckImage.style.backgroundColor = 'white'

  //select topic
  if (selectedCategory === 'language') {
    deckImage.src = './img/language.png'
    title.textContent = 'language'
  } else if (selectedCategory === 'general') {
    deckImage.src = './img/general.png'
    title.textContent = 'general'
  } else if (
    selectedCategory !== 'language' &&
    selectedCategory !== 'general'
  ) {
    select.style.visibility = 'hidden'
    start.style.display = 'block'
  }

  for (i = 0; i < deckList.length; i++) {
    thisDeck = deckList[i]

    if (selectedCategory === thisDeck) {
      qDeck = []
      aDeck = []
      questions = []
      answers = []
      fillDecks(thisDeck, qDeck, aDeck)
      deckImage.src = `./img/${thisDeck}.png`
      title.textContent = thisDeck
      break
    }
  }
  getDeck(qDeck, aDeck)
}

//-------------------------------
function endGame() {
  time.style.visibility = 'hidden'
  let nextDeck = ''
  var result = window.confirm(
    'Game over! Your score is ' +
      score +
      ' and your health is ' +
      health +
      '. Continue?'
  )

  if (result) {
    for (i = 0; i < deckList.length; i++) {
      thisDeck = deckList[i]
      nextDeck = deckList[i + 1]

      setTimeout(() => {
        deckImage.src = `./img/${thisDeck}.png`
      }, 5)

      if (selectedCategory === thisDeck) {
        selectedCategory = nextDeck
        fillDecks(nextDeck, qDeck, aDeck)
        break
      }
    }
  } else {
    location.reload()
  }
  reset()
  getDecks()
}

//-----------------------------
let interval

function reduceWidth() {
  let currentWidth = parseInt(time.style.width, 10)
  if (currentWidth > 50) {
    let newWidth = currentWidth - currentWidth / 3
    time.style.width = newWidth + 'px'
  } else {
    if (health !== 0) {
      noSound.play()
      health--
      nextQ()
    } else if (health <= 0) {
      cancelReduceWidth()
      health = 10
    }
  }
}

function startReduceWidth() {
  interval = setInterval(reduceWidth, 3000)
}

function cancelReduceWidth() {
  clearInterval(interval)
}

//Fisher-Yates algorithm
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1))
    ;[array[i], array[j]] = [array[j], array[i]]
  }
  return array
}

//START:-----------------------------------------------------------------------
function startGame() {
  for (var i = 0; i < btns.length; i++) {
    btns[i].disabled = false
  }

  if (starting === true) {
    if (window.confirm('Start?')) {
      deckImages = getDeckImages()
      shuffle(deckImages)
      currentImage = Math.floor(Math.random() * deckImages.length)
      score = 0
      health = 10
      deckImage.src = deckImages[currentImage].question
      start.style.display = 'none'
      time.style.visibility = 'visible'

      for (let img of imgs) {
        img.style.visibility = 'visible'
      }
      generateOptions()
    } else {
      location.reload()
    }
  }
}

start.addEventListener('click', function () {
  deckImage.style.backgroundColor = 'white'
  deckImage.style.background = 'white'
  starting = true
  imgs[0].style.display = 'inline'
  imgs[1].style.display = 'inline'
  imgs[2].style.display = 'inline'
  imgs[3].style.display = 'inline'
  if (windowWidth <= 600) {
    time.style.width = `${windowWidth - 60}px`
  } else {
    time.style.width = '300px'
  }
  startGame()
  startReduceWidth()
})

//button functionality--------------------------------------------
function useOp() {
  var buttonIndex = +this.dataset.index

  if (buttonIndex === correctButton) {
    this.style.backgroundColor = 'green'
    dingSound.play()
    score++
    setTimeout(() => {
      this.style.backgroundColor = 'rgb(255, 73, 131)'
    }, 300)
  } else {
    noSound.play()
    health--
    if (health <= 0) {
      endGame()
    }
  }

  if (windowWidth <= 600) {
    time.style.width = `${windowWidth - 60}px`
  } else {
    time.style.width = '300px'
  }
  nextQ()
}

document.addEventListener('DOMContentLoaded', () => {
  const buttons = document.querySelectorAll('.btnStyle')

  buttons.forEach((button, index) => {
    button.dataset.index = index
    button.addEventListener('click', useOp)
  })
})

//Image stuff----------------------
function getDeckImages() {
  var deckImages = []
  for (i = 0; i < questions.length; i++) {
    deckImages.push({
      question: questions[i],
      answer: answers[i],
    })
  }
  return deckImages
}

function nextQ() {
  //loop around when at end of deckImages
  currentImage = (currentImage + 1) % deckImages.length

  if (currentImage === 0) {
    shuffle(deckImages)
  }

  //update question and options
  deckImage.src = deckImages[currentImage].question
  generateOptions()
}

let l = 0
function generateOptions() {
  l += 1
  var correctAnswer = currentImage
  var usedOptions = [correctAnswer]

  //random indices for wrong options
  for (var j = 0; j < buttons.length; j++) {
    if (j !== correctButton) {
      var wrongAnswer
      do {
        wrongAnswer = Math.floor(Math.random() * deckImages.length)
      } while (usedOptions.includes(wrongAnswer))

      usedOptions.push(wrongAnswer)
      buttons[j].querySelector('img').src = deckImages[wrongAnswer].answer
    }
  }
  shuffleButtons()

  //correct answer at randomly chosen button
  buttons[correctButton].querySelector('img').src =
    deckImages[correctAnswer].answer

  if (l > questions.length * 3) {
    endGame()
  }
}

//shuffle the buttons
function shuffleButtons() {
  for (var i = buttons.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1))
    swapButtons(i, j)
  }
}

//swap positions of two buttons
function swapButtons(i, j) {
  var temp = buttons[i].querySelector('img').src

  buttons[i].querySelector('img').src = buttons[j].querySelector('img').src
  buttons[j].querySelector('img').src = temp
  //-----------------------------

  if (i === correctButton) {
    correctButton = j
  } else if (j === correctButton) {
    correctButton = i
  }
}
