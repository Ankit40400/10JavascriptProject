// there is issue in this script please go down to see the cooments

//https://www.uidesigndaily.com/uploads/924/day_924.png

const quizData = [
    {
        Question: 'How old is FLorin?',
        a: '10',
        b: '17',
        c: '26',
        d: '110',
        correct: 'c'
    }, {
        Question: 'What is the most used programming language in 2020?',
        a: 'Java',
        b: 'c',
        c: 'Python',
        d: 'javascript',
        correct: 'a'
    }, {
        Question: ' Who is the Presidnet of US?',
        a: 'Florn pop',
        b: 'Donald Trump',
        c: 'Ivan Saldano',
        d: 'Mihai Andrei',
        correct: 'b'
    }, {
        Question: ' What does HTML Stand for',
        a: 'Hypertext markup language',
        b: ' cacsading style Sheet',
        c: 'Jason object Notation',
        d: 'Delicopters Terminal Motorboats Lamborginis',
        correct: 'a'
    }, {
        Question: 'What year was javascript launched?',
        a: '2020',
        b: '1996',
        c: '1994',
        d: '1995',
        correct: 'b'
    }
]

const answerels = document.getElementById("answer")
const questionEl = document.getElementById("question")
const a_text = document.getElementById("a_text")
const b_text = document.getElementById("b_text")
const c_text = document.getElementById("c_text")
const d_text = document.getElementById("d_text")
const submitBtn = document.getElementById("button")
const quiz = document.getElementById("quiz")


let score = 0
let currentQuiz = 0
let answer = undefined
let answerEls = undefined

loadQuiz()


function loadQuiz()
{
    const currentQuizData = quizData[currentQuiz]
    answer = quizData[currentQuiz].correct
    console.log(quizData[currentQuiz])
    console.log("current Quiz " + currentQuiz)
    console.log("correct answer " + answer)
    questionEl.innerText = currentQuizData.Question
    a_text.innerText = currentQuizData.a
    b_text.innerText = currentQuizData.b
    c_text.innerText = currentQuizData.c
    d_text.innerText = currentQuizData.d

}


function getSelected() {

    const answerEls = document.querySelector('input[name="answer"]:checked')
    if (answerEls != null) {
        console.log(answerEls)
        return answerEls.id
    }
    else {
        alert("please select your response")
    }
}

function deselectAnswers() {


}


// I am not getting all questions sometime it happens that only 3 questions comes up
// and sometimes only 4 and sometimes those 3 and 4 are different.
submitBtn.addEventListener("click", () => {
    let currentValue = getSelected()

    if (currentValue) {
        if (currentValue === answer) {
            score++
        }

        if (currentQuiz < quizData.length) {
            currentQuiz++
            loadQuiz()
        } else {
            quiz.innerHTML = `<h2> you answered correctly at ${score}/ ${quizData.length} questions. </h2>`
        }
    }



    // if(currentQuiz < quizData.length){
    //     if(currentValue == answer) {
    //         console.log("you selected the correct answer" + currentValue)
    //         score++
    //     }
    //     console.log("you have selected the wrong answer")
    //     currentQuiz++
    //     loadQuiz()
    // } else{ 
    //      quiz.innerHTML = `<h2> you answered correctly at ${score}/ ${quizData.length} question. </h2>`
    //     }

});