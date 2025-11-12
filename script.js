const input = document.querySelector(".styled-input")
const inputArea = document.querySelector(".input-area")
const honeycomb = document.querySelector(".honeycomb")
let cells = document.querySelectorAll('.cell');
const backspace = document.getElementById("delete-button")
const submit = document.getElementById("submit-button")
const messageBox = document.querySelector(".message-box")
const userWordList = document.querySelector(".user-word-list>ul")
const scoreText = document.querySelector(".score")
const progressMarker = document.querySelector(".progress-marker")
const rankTitle = document.querySelector(".progress-rank-title")
const statusMessage = document.querySelector(".status-message")
const shuffleButton = document.getElementById("shuffle-button")

let userFoundWords = getFoundWords()
let userScore = getUserScore()

function addToFoundWords(word) {
  userFoundWords.push(word)
  localStorage.setItem("foundWords", JSON.stringify(userFoundWords))
}

function getFoundWords() {
  return JSON.parse(localStorage.getItem("foundWords")) ?? []
}

function addToUserScore(points) {
  userScore += points
  localStorage.setItem("score", userScore)
}

function getUserScore() {
  return JSON.parse(localStorage.getItem("score")) ?? 0
}

scoreText.textContent = getUserScore()

const alphabet = [
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
    "i",
    "j",
    "k",
    "l",
    "m",
    "n",
    "o",
    "p",
    "q",
    "r",
    "s",
    "t",
    "u",
    "v",
    "w",
    "x",
    "y",
    "z",
    "à", "è", "é", "ì", "í", "ò", "ó", "ù", "ú"]

// const gameLetters = ["f", "e", "o", "l", "q", "u", "b"]
const gameLetters = ['a', 'f', 'o', 'p', 'r', 't', 'v']
const specialLetter = "v"
// const wordList = ['cage', 'caged', 'bagged', 'gaff', 'gaffe', 'fade', 'cabbage', 'facade', 'bagface', 'dabbed', 'cafe', 'face', 'faced']
const wordList = ['vapa', 'portava', 'pravo', 'trovava', 'foravo', 'rattoppavo', 'varavo', 'paravo', 'proava', 'trattava', 'arrotavo', 'approvo', 'frappavo', 'approvata', 'approvato', 'rapavo', 'atrovavo', 'rapportavo', 'trattavo', 'appoppava', 'varava', 'appartavo', 'tarpava', 'voro', 'ovro', 'trottava', 'ovra', 'ovattato', 'ovrato', 'proavo', 'vorrò', 'vaporavo', 'atrovò', 'atrovava', 'atrovo', 'atrovato', 'tarpavo', 'trovator', 'optava', 'ottavo', 'rotavo', 'ovrata', 'appartava', 'avara', 'travata', 'ovatta', 'arraffavo', 'orava', 'rotava', 'varato', 'fava', 'varrò', 'rappava', 'favo', 'appoppavo', 'ottava', 'avrò', 'varroa', 'atavo', 'pavé', 'potava', 'arrappava', 'rappavo', 'trovò', 'vaporò', 'orravo', 'trova', 'vafro', 'votata', 'portavo', 'vaffa', 'traforava', 'torvo', 'trovata', 'arrotava', 'approvavo', 'ovatto', 'vaporo', 'torva', 'vorava', 'traforavo', 'toppavo', 'atrovata', 'approvato', 'travato', 'rapava', 'avatar', 'toppava', 'pappavo', 'ovattata', 'oravo', 'forava', 'avatara', 'votato', 'vorata', 'provavo', 'approvava', 'vota', 'tappava', 'arrapava', 'frappava', 'parafava', 'vota', 'varrà', 'potavo', 'vora', 'ovrò', 'provato', 'votato', 'varata', 'vara', 'rovo', 'ovatta', 'tappavo', 'tarava', 'provar', 'opravo', 'trovato', 'trovavo', 'approvò', 'pappava', 'prova', 'prava', 'vorò', 'traportavo', 'vaporava', 'approva', 'favorì', 'vopa', 'vara', 'rapportava', 'vora', 'vorato', 'parava', 'arraffava', 'taravo', 'varo', 'ovrava', 'rattoppava', 'provò', 'vapora', 'arrapavo', 'provava', 'trottavo', 'trovato', 'aravo', 'ovattato', 'orrava', 'vaporato', 'optavo', 'vopo', 'ovravo', 'arrappavo', 'votava', 'avvarrò', 'vaporata', 'favata', 'avvarrà', 'apportava', 'apportavo', 'avrà', 'votavo', 'trovo', 'provata', 'prova', 'apparava', 'provo', 'trovata', 'apparavo', 'poppavo', 'atrova', 'traportava', 'oprava', 'provato', 'avaro', 'voravo', 'vorrà', 'trovar', 'voto', 'voto', 'portaovo', 'votò', 'parafavo', 'arava', 'varo', 'poppava']

const rankThresholds = [5, 10, 15, 20, 25, 30, 25, 30, 35, 40]
const rankTitles = ["Beginner", "Good Start", "Moving Up", "Good", "Solid", "Nice", "Great", "Amazing", "Genius"]
let rank = 0

const inputPlaceholder = document.createElement('span')
inputPlaceholder.classList.add('input-placeholder')
inputPlaceholder.textContent = 'Type or tap...'
inputArea.appendChild(inputPlaceholder)
input.focus()

const variableLetters = {
  "a": {
    "grave": "à"
  },
  "e": {
    "grave": "è",
    "acute": "é",
  },
  "i": {
    "grave": "ì",
    "acute": "í",
  },
  "o": {
    "grave": "ò",
    "acute": "ó",
  },
  "u": {
    "grave": "ù",
    "acute": "ú",
  },
}

function stripAccent(char) {
  return char.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
}

function createVariantCell(letter, variationName, index) {
  variantCell = document.createElement("div")
  variantCell.textContent = letter.toUpperCase()
  variantCell.classList.add("cell")
  variantCell.classList.add("variant")
  variantCell.classList.add(variationName)
  if (stripAccent(letter) === specialLetter) {
    variantCell.classList.add("center")
  } else {
    variantCell.style = `--n: ${index}`
  }
  return variantCell
}

function createCell(letter, index) {
  cell = document.createElement("div")
  cell.textContent = letter.toUpperCase()
  cell.classList.add("cell")
  if (letter === specialLetter) {
    cell.classList.add("center")
  } else {
    cell.style = `--n: ${index}`
  }
  return cell
}

function createMenuCellAndOptions(letter, index) {
  accentCells = []
  letterVariants = variableLetters[letter]
  for ([variantType, letterVariant] of Object.entries(letterVariants)) {
    accentClassName = `accent-${variantType}`

    accentCell = createCell(letterVariant, index)
    accentCell.removeAttribute('style')
    accentCell.classList.add("cell", "variant", accentClassName)
    if (letter === specialLetter) {
      accentCell.classList.add("center")
    } else {
      accentCell.style = `--n: ${index}`
    }
      accentCells.push(accentCell)
    }

  menuCell = document.createElement("div")
  menuCell.textContent = letter.toUpperCase()
  menuCell.classList.add("cell")
  menuCell.classList.add("variable")
  if (letter === specialLetter) {
    menuCell.classList.add("center")
  } else {
    menuCell.style = `--n: ${index}`
  }
  addClickAndHoldListener(menuCell, 300, toggleExpandableCell, inputLetter)
  return [menuCell, accentCells]
}

function isVariableLetter(letter) {
  if (Object.keys(variableLetters).includes(letter)) return true;
}


function createHoneyComb() {
  if (isVariableLetter(specialLetter)){
    [centerCell, accentCells] = createMenuCellAndOptions(specialLetter)
    accentCells.forEach((cell) => honeycomb.append(cell))
    honeycomb.append(centerCell)
  } else {
    centerCell = createCell(specialLetter)
    honeycomb.append(centerCell)
  }

  const letters = gameLetters.filter(letter => letter !== specialLetter)
  console.log(letters)
  for (let i = 0; i < letters.length; i++) {
    letter = letters[i]
    if (Object.keys(variableLetters).includes(letter)) {
      [menuCell, accentCells] = createMenuCellAndOptions(letter, i)
      accentCells.forEach((cell) => honeycomb.append(cell))
      honeycomb.append(menuCell)
    } else {
      cell = createCell(letter, i)
      honeycomb.append(cell)
    }

  cells = document.querySelectorAll(".cell") }
}

createHoneyComb()

// menuCells = document.querySelectorAll('.cell.variable')
// menuCells.forEach((cell) => {
//   addClickAndHoldListener(cell, 400, toggleExpandableCell, inputLetter)
// })


function shuffleNumbers() {
  let randomMap = [0, 1, 2, 3, 4, 5]
  for (let i=0; i<6; i++) {
    const j = Math.floor(Math.random() * (i + 1));

    [randomMap[i], randomMap[j]] = [randomMap[j], randomMap[i]]
  }
  return randomMap
}

function shuffleAllNumbers() {
  let randomMap = shuffleNumbers()
  for (let i=0; i< randomMap.length; i++) {
    if (randomMap[i] === i)
      return shuffleAllNumbers()
  }
  return randomMap
}

function shuffleCells() {
  collapseMenuCells()
  const randomMap = shuffleAllNumbers()

  for (cell of cells) {
    let oldIndex = cell.style.cssText.match(/\d/)
    console.log(cell.style.cssText)
    console.log(oldIndex)
    cell.style.cssText = `--n: ${randomMap[oldIndex]}`
  }
}

function clearInputPlaceholder(){
  console.log(inputPlaceholder)
  inputPlaceholder.remove()
}

inputArea.addEventListener("click", clearInputPlaceholder)
inputArea.addEventListener("click", () => input.focus())
input.addEventListener("input", (e) => {
  e.preventDefault()

  clearInputPlaceholder()
})
input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') { 
        e.preventDefault();
    }
});

function handleKeydown(e) {
  key = e.key
  console.log(`${key} pressed`)
  clearInputPlaceholder()
  collapseMenuCells()

  if (key === 'Enter') {
    submitHandler()
    return;
  }

  if (key === 'Backspace') {
    deleteHandler()
    return;
  }

  if (input.textContent.length > 32) return;

  letter = key.toLowerCase()

  if (!alphabet.includes(letter)) {
    console.log(`${letter} not in alphabet`)
    return;
  } else if (!gameLetters.includes(letter)) {
    console.log(`${letter} not in game letters`)
    invalidLetterSpan = document.createElement("span")
    invalidLetterSpan.classList.add("invalid-letter")
    invalidLetterSpan.textContent = letter.toUpperCase()
    input.appendChild(invalidLetterSpan)
  } else if (letter === specialLetter) {
    console.log(`${letter} is special letter`)
    specialLetterSpan = document.createElement("span")
    specialLetterSpan.classList.add("special-letter")
    specialLetterSpan.textContent = letter.toUpperCase()
    input.appendChild(specialLetterSpan)
  } else {
    console.log(`${letter} is normal valid letter`)
    letterSpan = document.createElement("span")
    letterSpan.textContent = letter.toUpperCase()
    input.appendChild(letterSpan)
  }
}


/** 
 * format input when cell buttons are pressed .
 * the 'input' and 'beforeinput' events are only triggered by user input.
 * */
function inputLetter(cell) {
  if (input.textContent.length > 32) return;
  clearInputPlaceholder()
  let letter = cell.textContent
  if (letter === specialLetter.toUpperCase()) {
    coloredLetter = document.createElement('span')
    coloredLetter.style = "color:var(--honey-color);"
    coloredLetter.textContent = letter
    input.appendChild(coloredLetter)
  } else {
    letterSpan = document.createElement('span')
    letterSpan.textContent = letter
    input.appendChild(letterSpan)
  }
  collapseMenuCells()
}

function collapseMenuCells() {
  cells.forEach((cell) => {cell.classList.remove('expanded')})
}

function cellClickHandler(e) {
  console.log(`cell ${e.target.textContent} clicked`)
  inputLetter(e.target)
}

function toggleExpandableCell(cell) {
  if (cell.classList.contains('center')) {
    variants = document.querySelectorAll(".cell.center.variant")
    variants.forEach((cell) => {
      if (cell.classList.contains('expanded')) {
        cell.classList.remove('expanded')
      } else {
        cell.classList.add('expanded')
      }
    })
  } else {
    cellIndex = cell.style.cssText
    variants = document.querySelectorAll(`.cell.variant[style*="${cellIndex}"]`)
    variants.forEach((cell) => {
      if (cell.classList.contains('expanded')) {
        cell.classList.remove('expanded')
      } else {
        cell.classList.add('expanded')
      }
    })
  }
}


function deleteHandler() {
  lastCharacter = input.lastElementChild
  if (lastCharacter) {
    input.removeChild(lastCharacter)
  }
}

function updateScore(points) {
  addToUserScore(points)
}

function updateRank() {
  for (let i = 0; i < rankThresholds.length; i++) {
    if (userScore < rankThresholds[i]) {
      rank = i
      console.log(`your rank is ${rank}`)
      break
    }
  }
}

function moveProgressMarker() {
  progressMarker.setAttribute('style', `--rank: ${rank}`)
  console.log(`progressMarker style is now ${progressMarker.style}`)
}

function colorProgressDot(rank) {
  if (rank > 0) {
    passedDot = document.querySelector(`.progress-dot:nth-child(${rank})`)
    passedDot.classList.add('completed')
  }
}

function updateRankTitleText() {
  rankTitle.textContent = rankTitles[rank]
}

function capitalizeFirstLetter(word) {
  word = word.toLowerCase()
  return word.charAt(0).toUpperCase() + word.slice(1)
}


function updateScoreboard(word) {
  const userWord = document.createElement('li')
  userWord.textContent = capitalizeFirstLetter(word)
  userWordList.append(userWord)
  scoreText.textContent = getUserScore()
}

function updateStatusMessage() {
  statusMessage.textContent = `You have found ${userFoundWords.length} words.`
}

function updateMessageBox(text) {
  console.log(`message text is ${text}`)
  messageBox.classList.add("visible")
  messageBox.textContent = text
  setTimeout(() => messageBox.classList.remove("visible"), 
  1500)
}

function addValidWord(word) {
    addToFoundWords(word)
    points = word.length - 3
    updateScore(points)
    updateRank()

    updateMessageBox(`Nice! +${points}`)
    updateScoreboard(word)
    updateRankTitleText()
    moveProgressMarker()
    colorProgressDot(rank)
    updateStatusMessage()
}

function checkWord(inputWord) {
  const word = inputWord.toLowerCase()
  console.log(word)
  const inWordList = wordList.includes(word)
  const found = userFoundWords.includes(word)
  let message = ""
  if (word.length < 4) {
    message = "Too short!"
    updateMessageBox(message)
  } else if (!word.includes(specialLetter)) {
    message = "Missing center letter!"
    updateMessageBox(message)
  } else if (!inWordList) {
    message = "Not in word list"
    updateMessageBox(message)
  } else if (inWordList && found) {
    message = "Already found!"
    updateMessageBox(message)
  } else if (inWordList && !found) {
    return true
  } else {
    message = "??? uncaught case"
    updateMessageBox(message)
  }
  return false
}


function submitHandler() {
  console.log(`input value was ${input.textContent}`)
  word = input.textContent.toLowerCase()
  isValid = checkWord(word)
  if (isValid) {
    addValidWord(word)
    input.textContent = ""
  }
  else {
    inputArea.classList.add('shake')
    setTimeout(() => {
    input.textContent = ""
    inputArea.classList.remove('shake')}
    , 1000)
  }
}

function cellMouseDownHandler(event) {
  event.target.classList.add("shrink")
}

function cellMouseUpHandler(event) {
  event.target.classList.remove("shrink")
}

function cellMouseLeaveHandler(event) {
  event.target.classList.remove("shrink")
}


cells.forEach((item) => {
  if (!item.classList.contains('variable')) {
    item.addEventListener('pointerdown', cellClickHandler)
  }
  item.addEventListener('pointerdown', cellMouseDownHandler)
  item.addEventListener('pointerup', cellMouseUpHandler)
  item.addEventListener('mouseleave', cellMouseLeaveHandler)
})

function addClickAndHoldListener(element, timeout, clickHoldCallback, clickOnlyCallback) {
  let holdCanceled = false;
  let holdCompleted = false;
  const onMouseDown = () => {
    holdCanceled = false;
    holdCompleted = false;
    console.log(`moused down, holdCanceled = ${holdCanceled}`)
    setTimeout(() => {
      console.log(`mousedown timeout triggered, holdCanceled = ${holdCanceled}`)
      if (!holdCanceled) {
        console.log('clicked and held')
        clickHoldCallback(element)
        holdCompleted = true;
      }
    }, timeout)
  }
  const onMouseUp = (e) => {
    if (!holdCompleted) {
      console.log('clicked')
      clickOnlyCallback(element)
      holdCanceled = true
    }
  }
  const onMouseLeave = () => holdCanceled = true
  element.addEventListener("pointerdown", onMouseDown)
  element.addEventListener("pointerup", onMouseUp)
  element.addEventListener("pointerleave", onMouseLeave)
}


backspace.addEventListener('click', deleteHandler)
submit.addEventListener('click', submitHandler)
document.addEventListener('keydown', handleKeydown)

centerCells = document.querySelectorAll(".cell.center")

shuffleButton.addEventListener("click", shuffleCells)
shuffleButton.addEventListener("click", () => {
  centerCells.forEach((cell) => {
  cell.classList.add('wiggle')
  setTimeout(() => cell.classList.remove("wiggle"), 500)
  })
})



///////////////dev tools////////////
// const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay))
// function sleep(delay) {
//   return new Promise((resolve) => setTimeout(resolve, delay));
// }
//
//
// async function mockWordAttempt(word) {
//   for (letter of word) {
//     await sleep(150)
//     input.value += letter
//     await sleep(150)
//   }
//   await sleep(1000)
//   submit.click()
//   await sleep(1000)
// }
//
// async function demoUI () {
//   for (let i=0; i<wordList.length; i++) {
//     await mockWordAttempt(wordList[i])
//     await sleep(1000)
//   }
// }
//
//
// function createDebugOverlay() {
//   overlay = document.createElement('div')
//   overlay.textContent = "Debug Menu"
//   overlay.classList.add('debug-overlay')
//
//
//
//   let expanded = true
//   let toggleIcon = "v"
//   function toggleOverlay() {
//     if (expanded) {
//       overlay.classList.add('hide')
//       overlay.classList.remove('show')
//       toggleIcon = 'v'
//     } else {
//       overlay.classList.remove('hide')
//       overlay.classList.add('show')
//       toggleIcon = '^'
//     }
//     expanded = !expanded
//   }
//   toggleButton = document.createElement('button')
//   toggleButton.textContent = toggleIcon
//   toggleButton.addEventListener("click", toggleOverlay)
//   toggleButton.style = 'position: absolute; top:3rem; left:3rem;'
//
//
//   demoButton = document.createElement('button')
//   demoButton.textContent = 'start demo'
//   demoButton.addEventListener("click", demoUI)
//
//   consoleMessage = document.createElement('div')
//
//   overlay.append(demoButton)
//   overlay.append(consoleMessage)
//
//   body = document.querySelector('body')
//   body.append(overlay)
//   body.append(toggleButton)
// }
//
// createDebugOverlay()
//
// const console = (function(oldCons){
//     return {
//         log: function(text){
//             oldCons.log(text);
//             messageDiv = document.createElement('div')
//             messageDiv.textContent = text
//             consoleMessage.append(messageDiv)
//         },
//         info: function (text) {
//             oldCons.info(text);
//         },
//         warn: function (text) {
//             oldCons.warn(text);
//         },
//         error: function (text) {
//             oldCons.error(text);
//         }
//     };
// }(window.console));
//
// window.console = console;
//
//
// // demoUI()
// //
// console.log(shuffleButton)
