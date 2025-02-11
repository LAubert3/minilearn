const cstart = document.getElementById('c-inp-btn')
const cone = document.getElementById('one1')
const ctwo = document.getElementById('two1')
const cthree = document.getElementById('three1')
const cfour = document.getElementById('four1')
const cfive = document.getElementById('five1')
const csix = document.getElementById('six1')
const cseven = document.getElementById('seven1')
const ceight = document.getElementById('eight1')
const cnine = document.getElementById('nine1')

let clist = [1, 2, 3, 4, 5, 6, 7, 8, 9]
let cbatch = [cone, ctwo, cthree, cfour, cfive, csix, cseven, ceight, cnine]
let nt, nl, ct, cl

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[array[i], array[j]] = [array[j], array[i]]
  }
}

function setRand() {
  shuffle(clist)
  cbatch.forEach((element, i) => {
    element.textContent = clist[i]
  })
}

function getRand() {
  nt = Math.floor(Math.random() * 3)
  nl = Math.floor(Math.random() * 3)

  switch (nt) {
    case 0:
      ct = '5%'
      break
    case 1:
      ct = '15%'
      break
    case 2:
      ct = '33%'
      break
  }

  switch (nl) {
    case 0:
      cl = '15%'
      break
    case 1:
      cl = '33%'
      break
    case 2:
      cl = '66%'
      break
  }
}

const pTags = document.getElementsByClassName('c-p')
let theFlags = Array(9).fill(false)
let loading = false

function endsGame() {
  clist = [1, 2, 3, 4, 5, 6, 7, 8, 9]
  cbatch.forEach((element) => {
    element.style.display = 'flex'
    element.style.backgroundColor = 'black'
    element.style.color = 'white'
  })

  //Reset flags etc.
  theFlags = Array(9).fill(false)
  loading = false

  //Clear existing event listeners
  Array.from(pTags).forEach((pTag) => {
    pTag.removeEventListener('click', handleTagClick)
  })

  setTimeout(() => {
    setRand()
    placeOne()
  }, 2500)
}

function handleTagClick() {
  const num = parseInt(this.textContent)

  if (num === 1 && !theFlags[0]) {
    cbatch.forEach((element) => {
      element.style.backgroundColor = 'white'
      element.style.color = 'white'
    })

    this.style.display = 'none'
    theFlags[0] = true
    dingSound.play()
  } else if (num > 1 && theFlags[num - 2]) {
    this.style.display = 'none'
    theFlags[num - 1] = true
    dingSound.play()
    setTimeout(() => {
      theFlags[num - 2] = false
    }, 100)
    if (num === 9) {
      setTimeout(function () {
        praiseSound.play()
        cheerSound.play()
        setTimeout(() => {
          endsGame()
        }, 200)
      }, 100)
    }
  } else {
    loading = true
    noSound.play()
    clist = [1, 2, 3, 4, 5, 6, 7, 8, 9]
    setTimeout(function () {
      laughSound.play()
      setRand()
      setTimeout(endsGame, 100)
    }, 100)
  }
}

function placeOne() {
  cbatch.forEach((element) => {
    getRand()
    element.style.display = 'flex'
    element.style.backgroundColor = 'black'
    element.style.color = 'white'
    element.style.marginTop = ct
    element.style.marginLeft = cl
  })

  Array.from(pTags).forEach((pTag) => {
    pTag.addEventListener('click', handleTagClick)
  })
}

const cElements = document.querySelectorAll('.c-p')

cstart.addEventListener('click', function () {
  if (!loading) {
    setRand()
    placeOne()

    if (window.innerWidth <= 800) {
      cElements.forEach((element) => {
        element.style.width = '30px'
        element.style.height = '30px'
      })
    }
  }
})
