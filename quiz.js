 const questionNumber = document.querySelector('.question-number');
 const questionText = document.querySelector('.question-text');
 const optionContainer = document.querySelector('.option-container');
const answerIndicatorContainer = document.querySelector('.answers-indicator');
const homeBox = document.querySelector('.home-box');
const quizBox = document.querySelector('.quiz-box');
const resultBox = document.querySelector('.result-box');
const timerBox = document.querySelector('.timer');

const mostRecentScore = localStorage.getItem('mostRecentScore');

 let questionCounter = 0;
 let currentQuestion;
 let availableQuestions = [];
 let availableOptions = [];
 let correctAnswers = 0;
 let attempt = 0;
 let interval;
//push the question into availableQuestions Array
 function setAvailableQuestions(){
    const totalQuestion = quiz.length;
    for(let i=0; i<totalQuestion; i++){
        availableQuestions.push(quiz[i])
    }
 }
 //set question number and option
 function getNewQuestion(){
 
// set question number     
     questionNumber.innerHTML = 'Question ' + (questionCounter + 1) + 
     ' of ' + quiz.length;
//set question text
// get random question     
     const questionIndex = availableQuestions[Math.floor(Math.random()
        * availableQuestions.length )]
        currentQuestion = questionIndex;
        questionText.innerHTML = currentQuestion.q;
// get the position of 'questionIndex' from the availableQuestion array       
        const index1 = availableQuestions.indexOf(questionIndex);
//remove the 'questionIndex' from the availableQuestion array        
        availableQuestions.splice(index1,1);
//set options
//get the length lof options        
        const optionLen = currentQuestion.options.length
// push options into availableOptions array       
        for( let i=0; i<optionLen; i++){
            availableOptions.push(i)
        }
        optionContainer.innerHTML = '';
        let animationDelay = 0.15;
// create options in html        
        for(let i=0; i<optionLen; i++){
// random option            
            const optionIndex = availableOptions[Math.floor(Math.random() * availableOptions.length )];
//get the position of 'optionIndex' from the availableOptions array             
            const index2 = availableOptions.indexOf(optionIndex);
// remove the 'optionIndex' from the availableOptions array            
            availableOptions.splice(index2,1);
            const option = document.createElement('div');
            option.innerHTML = currentQuestion.options[optionIndex];
            option.id = optionIndex;
            option.style.animationDelay = animationDelay + 's';
            animationDelay = animationDelay + 0.15;
            option.className = 'option';
            optionContainer.appendChild(option)
            option.setAttribute('onclick','getResult(this)');
        }
        questionCounter++
 }
//get the result of current attempt question
 function getResult(element){
    const id = parseInt(element.id);
//get the answer by comparing the id of clicked option
    if( id === currentQuestion.answer){
//set the green color to the correct option
       element.classList.add('correct');
       updateAnswersIndicator('correct');
       correctAnswers++;
    }else{
// set the red color to the incorrect option  
        element.classList.add('wrong');
// add the indicatior to wrong mark
        updateAnswersIndicator('wrong');
// if the answer is incorrect show thw correct option by adding green color to the correct one    
        const optionLen = optionContainer.children.length;
        for(let i=0; i<optionLen;i++){
            if(parseInt(optionContainer.children[i].id)=== currentQuestion.answer){
              optionContainer.children[i].classList.add('correct');  
              updateAnswersIndicator('correct');
            }
        }
    }
    attempt++;
    unclickableOption();
 }
 // amke all the options unclickable once the user selects an option (cant change answer)
function unclickableOption(){
    const optionLen = optionContainer.children.length;
    for(let i=0; i<optionLen[i]; i++){
    optionContainer.children.classList.add('already-answered');
    }
}
function answersIndicator(){
    answerIndicatorContainer.innerHTML = '';
    const totalQuestion = quiz.length;
    for(let i=0; i<totalQuestion; i++){
        const indicator = document.createElement('div');
        answerIndicatorContainer.appendChild(indicator);
    }
}

function updateAnswersIndicator(markType){
    answerIndicatorContainer.children[questionCounter -1].classList.add(markType);
}

 function next(){
     if (questionCounter === quiz.length){
        quizOver();
     }
     else{
         getNewQuestion();
     }
 }

 function quizOver(){
     //hide quiz Box
      quizBox.classList.add('hide');
      timerBox.classList.add('hide');
      //show result box
      resultBox.classList.remove('hide');
      quizResult();
 }
 //get the quiz result
 function quizResult(){
     resultBox.querySelector('.total-question').innerHTML = quiz.length;
     resultBox.querySelector('.total-attempt').innerHTML = attempt;
     resultBox.querySelector('.total-correct').innerHTML = correctAnswers;
     resultBox.querySelector('.total-wrong').innerHTML = attempt - correctAnswers;
     const percentage = (correctAnswers/quiz.length)* 100;
     resultBox.querySelector('.percentage').innerHTML = percentage.toFixed(2) + "%";
     resultBox.querySelector('.total-score').innerHTML = correctAnswers + " / " + quiz.length;
     
 }

 
 function resetQuiz(){
    let questionCounter = 0;
    let correctAnswers = 0;
    let attempt = 0;
 }
 function tryAgainQuiz(){
     //hide the resultBox
     resultBox.classList.add('hide');
     timerBox.classList.remove('hide');
     //show the quizbBox
     quizBox.classList.remove('hide');
     resetQuiz();
     startQuiz();
     startTimer();

 }

 function startTimer(){
     let timeLimit = 15;
     timerBox.innerHTML = timeLimit;
     interval = setInterval(()=>{
         timeLimit--;
         if(timeLimit < 10){
             timeLimit = '0' + timeLimit;
         }
         if(timeLimit < 6){
             timerBox.classList.add('less-time');
         }
       timerBox.innerHTML = timeLimit;
       if(timeLimit == 0 ){
           clearInterval(interval);
           timeIsUp();
       }
     }, 1000)
 }
 function timeIsUp(){
     quizBox.classList.add('hide');
     resultBox.classList.remove('hide');
     quizOver();

}
 function stopTimer(){
    clearInterval(interval);
 }
 

 function goToHome(){
     resultBox.classList.add('hide');
//show the quizBox
     homeBox.classList.remove('hide');
     resetQuiz();
 }
 function startQuiz(){
//hide home box
    homeBox.classList.add('hide');
// show quiz box
    quizBox.classList.remove('hide');
    timerBox.classList.remove('hide');
// first we will set all questions in availableQuestions Array
     
    setAvailableQuestions();
// second we will call getNewQuestion(); function 
    getNewQuestion();
// to creat indicator of answers
    answersIndicator();
 }
 window.onload = function(){
     homeBox.querySelector('.total-question').innerHTML = quiz.length;
     startTimer();
 }

