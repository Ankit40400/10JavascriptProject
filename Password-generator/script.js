const pwEl = document.getElementById("pw")
const copy = document.getElementById("copy")
const lenEl = document.getElementById("length")
const upperEl = document.getElementById("upper")
const lowerEl = document.getElementById("lower")
const  numberEl= document.getElementById("number")
const symbolEl = document.getElementById("symbol")
const generateEl = document.getElementById("generate")
const copyEl = document.getElementById("copy")

console.log(lenEl)
console.log(pwEl)
const upperLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
const lowerLetter = "abcdefghijklmnopqrstuvwxyz"
const numbers = "0123456789"
const symbols = "!@#$%^&*()_+="


function getLowercase() {
    return lowerLetter[Math.floor(Math.random() *lowerLetter.length)]
}

function getUpppercase() {
    return upperLetters[Math.floor(Math.random() * upperLetters.length)]
}

function getNumber() {
    return numbers[Math.floor(Math.random() * numbers.length)]
}

function getSymbol() {
    return symbols[Math.floor(Math.random() * symbols.length)]
}


// console.log(getLowercase())
// console.log(getUpppercase())
// console.log(getNumber())

// console.log(getSymbol())

function generatePassword() {
    const len = lenEl.value

    let password = ""
    if(upperEl.checked) {
        password += getUpppercase()
        console.log("upper is checked & length is" + password.length, password, len)
    }

    if(lowerEl.checked) {
        password += getLowercase()
        console.log("Lower is checked & length is" + password.length, password)
    }
    if(numberEl.checked) {
        password += getNumber()
        console.log("Number is checked & length is" + password.length, password)
    }
    if(symbolEl.checked) {
        password += getSymbol()
        console.log("Symbol is checked & length is" + password.length, password)
    }

    for(let i = password.length ; i<len; i++){
        const x = generateX()
        password += x
        
    }
    pwEl.innerText = password
}



function generateX(){
    const xs = []
    if(upperEl.checked) {
        xs.push(getUpppercase())
    }

    if(lowerEl.checked) {
        xs.push(getLowercase())
    }
    if(numberEl.checked) {
        xs.push(getNumber())
    }
    if(symbolEl.checked) {
        xs.push(getSymbol())
    }

    if(xs.length === 0) {
        return ""
    }
    console.log("value of Xs" + xs)

    return  xs[Math.floor(Math.random()) * xs.length] 
}


generateEl.addEventListener("click", generatePassword)

copyEl.addEventListener("click", () => {
    const textarea = document.createElement('textarea')
    const password = pwEl.innerText

    if(!password) {
        return;
    }

    textarea.value = password
    document.body.appendChild(textarea)
    textarea.select()
    document.execCommand('copy')
    textarea.remove()
    alert("Password copied to clipboard")
})