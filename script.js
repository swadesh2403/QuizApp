const questions=[
    {
        question:"What is the extension of a python file ?",
        answers:[
            {text: ".cpp",correct:false},
            {text: ".py",correct:true},
            {text: ".python",correct:false},
            {text: ".cs",correct:false},

        ]
    },
    {
        question:"What is the full form of HTTP ?",
        answers:[
            {text: "HyperText Transmission Protocol",correct:false},
            {text: "HyperText Transition Paradigm",correct:false},
            {text: "HyperText Transfer Protocol",correct:true},
            {text: "HyperText Transmission Paradigm",correct:false},

        ]
    },
    {
        question:"What is Javascript ?",
        answers:[
            {text: "Operating System",correct:false},
            {text: "Programming Language",correct:true},
            {text: "Software",correct:false},
            {text: "Algorithm",correct:false},

        ]
    },
    {
        question:"What does SOC stands for ?",
        answers:[
            {text: "System on Chip",correct:true},
            {text: "System on Card",correct:false},
            {text: "Synthesis of Card",correct:false},
            {text: "System on Cash",correct:false},

        ]
    }

];

const questionElement=document.getElementById("question");
const answerButton=document.getElementById("answer-buttons");
const nextButton=document.getElementById("next-btn");

let currentQuestionIndex=0;
let score=0;

function startQuiz(){
    currentQuestionIndex=0;
    score=0;
    nextButton.innerHTML="Next";
    showQuestion();

}

function showQuestion(){
    resetState();
    let currentQuestion=questions[currentQuestionIndex];
    let questionNo=currentQuestionIndex+1;
    questionElement.innerHTML=questionNo+". "+currentQuestion.question;

    currentQuestion.answers.forEach(answer=>{
        const button=document.createElement("button");
        button.innerHTML=answer.text;
        button.classList.add("btn");
        answerButton.appendChild(button);
        if(answer.correct){
            button.dataset.correct=answer.correct;
        }
        button.addEventListener("click",selectAnswer);

    })
}

function resetState(){
    nextButton.style.display="none";
    while(answerButton.firstChild){
        answerButton.removeChild(answerButton.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn=e.target;
    const isCorrect=selectedBtn.dataset.correct==="true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }
    else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButton.children).forEach(button=>{
        if(button.dataset.correct==="true"){
            button.classList.add("correct");
        }
        button.disabled=true;
    });
    nextButton.style.display="block"
}

function showScore(){
    resetState();
    questionElement.innerHTML=`You score ${score} out of ${questions.length}`;
    nextButton.innerHTML="Play Again";
    nextButton.style.display="block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex<questions.length){
        showQuestion();
    }
    else{
        showScore();
    }
}

nextButton.addEventListener("click",()=>{
    if(currentQuestionIndex<questions.length){
        handleNextButton();
    }
    else{
        startQuiz();
    }
})

startQuiz();