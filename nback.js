let inp = document.getElementById('inp')
let start = document.getElementById('inp-btn')
let stopBtn = document.getElementById('stop')
stopBtn.style.display = 'none'
//settings
let settings = document.getElementById('settings')
let setBtn = document.getElementById('set-btn')
let nLevel = document.getElementById('n-level')
let time = document.getElementById('inp-time')
let one = document.getElementById('one')
let two = document.getElementById('two')
let three = document.getElementById('three')
let four = document.getElementById('four')
let five = document.getElementById('five')
let six = document.getElementById('six')
let seven = document.getElementById('seven')
let eight = document.getElementById('eight')
let nine = document.getElementById('nine')
//controls:
let position = document.getElementById('position')
let color = document.getElementById('color')
settings.style.display = 'none'
setBtn.style.display = 'none'
inp.value = 2
time.value = 2
let interval = time.value * 1000
let opened = false
let n, correctP, incorrectP, correctC, incorrectC
let its = 0
let nBack = 0
let target = nBack
let match = 0
let place = []
let batch = []

function handleEvents(v, e) {
  v.addEventListener(e, function () {
    switch (true) {
      case v === setBtn:
        switch (e) {
          case 'click':
            document.addEventListener('click', function (event) {
              if (opened && !settings.contains(event.target)) {
                settings.style.display = 'none'
                setBtn.style.backgroundColor = '#F0F0F0'
                setTimeout(function () {
                  opened = false
                }, 200)
              } else if (!opened && setBtn.contains(event.target)) {
                settings.style.display = 'block'
                setBtn.style.backgroundColor = '#7FFFD4'
                setTimeout(function () {
                  opened = true
                }, 200)
              }
            })
            break
          case 'mouseenter':
            if (!opened) {
              setBtn.style.backgroundColor = '#7FFFD4'
            }
            break
          case 'mouseout':
            if (!opened) {
              setBtn.style.backgroundColor = '#F0F0F0'
            }
            break
        }
        break
      case v === stopBtn:
        switch (e) {
          case 'click':
            location.reload()
        }
        break
      case v === inp:
        switch (e) {
          case 'input':
            let num = inp.value.toString()
            nLevel.textContent = `n = ${num}`

            if (isNaN(num) || num <= 0) {
              inp.value = 1
              nLevel.textContent = 'n = 1'
            } else {
              nLevel.textContent = `n = ${num}`
            }
        }
        break
      case v === time:
        switch (e) {
          case 'input':
            let t = time.value

            if (isNaN(t) || t <= 1) {
              time.value = 1
            }
            if (t > 5) {
              time.value = 5
            }
            interval = time.value * 1000
        }
        break
      case v === position:
        switch (e) {
          case 'click':
            if (correctP) {
              dingSound.play()
            } else {
              noSound.play()
            }
        }
        break
      case v === color:
        switch (e) {
          case 'click':
            if (correctC) {
              dingSound.play()
            } else {
              noSound.play()
            }
        }
        break
      case v === start:
        switch (e) {
          case 'click':
            settings.style.display = 'none'
            opened = false
            if (n <= 0) {
              n = 1
            } else {
              n = inp.value
            }
            start.style.display = 'none'
            stopBtn.style.display = 'inline'
            startGame()
        }
        break
    }
  })
}
handleEvents(setBtn, 'click')
handleEvents(setBtn, 'mouseenter')
handleEvents(setBtn, 'mouseout')
handleEvents(stopBtn, 'click')
handleEvents(inp, 'input')
handleEvents(time, 'input')
handleEvents(start, 'click')

function endGame() {
  if (its >= 21) {
    result = window.confirm('Finished!')

    if (result) {
      location.reload()
    } else {
      location.reload()
    }
  }
}

function startGame() {
  nBack = parseInt(inp.value)
  its += 1

  const elements = [one, two, three, four, five, six, seven, eight, nine]
  const colors = [
    'black',
    'red',
    'orange',
    'yellow',
    'green',
    'blue',
    'purple',
    'white',
  ]

  function getRandomColor() {
    const c = Math.floor(Math.random() * colors.length)
    return colors[c]
  }

  function setTiles() {
    const p = Math.floor(Math.random() * 9)
    const cVal = getRandomColor()

    elements.forEach((element, index) => {
      element.style.backgroundColor = 'black'
      if (index === p) {
        setTimeout(() => {
          element.style.backgroundColor = cVal
        }, 300)
      }
    })

    //track changes
    if (batch.length >= 3) {
      batch.splice(0, 3)
    }
    batch.push(p, cVal)
    place.push([...batch]) //spread operator to copy array

    for (let i = 0; i < place.length; i++) {
      const current = place[i]
      const previous = place[i - nBack]

      if (current && previous) {
        const currentP = current[0]
        const previousP = previous[0]
        const currentC = current[1]
        const previousC = previous[1]

        if (currentP === previousP) {
          correctP = true
        } else {
          correctP = false
        }

        if (currentC === previousC) {
          correctC = true
        } else {
          correctC = false
        }
      }
    }
  }
  setTiles()
  handleEvents(position, 'click')
  handleEvents(color, 'click')
  endGame()
  setTimeout(startGame, interval)
}
