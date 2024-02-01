 const questions = [
    {
        question: "What is the world's largest ocean?",
        answers: [
            { text: "The Pacific Ocean", correct: true},
            { text: "The Indian Ocean", correct: false},
            { text: "The Atlantic Ocean", correct: false},
            { text: "The Arabian Ocean", correct: false}
        ]
    },
    {
        question: "How many elements are there in the Periodic table?",
        answers: [
            { text: "97", correct: false},
            { text: "103", correct: false},
            { text: "88", correct: false},
            { text: "118", correct: true}
        ]
    },
    {
        question: "What are animals that eat both meat and plants called?",
        answers: [
            { text: "Omnivores", correct: true},
            { text: "Cornivores", correct: false},
            { text: "Non-vegetarians", correct: false},
            { text: "Vegetarians", correct: false}
        ]
    },
    {
        question: "What was the first planet to be discovered using the telescope?",
        answers: [
            { text: "Earth", correct: false},
            { text: "Pluto", correct: false},
            { text: "Saturn", correct: false},
            { text: "Uranus", correct: true}
        ]
    },
    {
        question: "What color is a giraffe's tongue?",
        answers: [
            { text: "Green", correct: false},
            { text: "Blue", correct: false},
            { text: "Purple", correct: true},
            { text: "Red", correct: false}
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButton = document.getElementById("options");
const nextButton = document.getElementById("n-btn");

let currentQuestionNum = 0;
let score = 0;

function beginQuiz(){
    currentQuestionNum = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionNum];
    let questionNo = currentQuestionNum + 1;
    questionElement.innerHTML = questionNo + "." + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButton.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}


function resetState(){
    nextButton.style.display = "none";
    while(answerButton.firstChild){
        answerButton.removeChild(answerButton.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
        
    }
    Array.from(answerButton.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore(){
    resetState();
    questionElement.innerHTML = `Your score is ${score} out of ${questions.length}`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton(){
    currentQuestionNum++;
    if(currentQuestionNum < questions.length){
        showQuestion();
    }
    else{
        showScore();
    }
}

nextButton.addEventListener("click", ()=>{
    if(currentQuestionNum < questions.length){
        handleNextButton();
    }
    else{
        beginQuiz();
    }
});

beginQuiz();
