const question = document.getElementById('question');
const choices = Array.from(document.getElementsByClassName('choice-text'));
const questionCounterText = document.getElementById('questionCounter');
const scoreText = document.getElementById('score');
const next = document.getElementById('next-btn')


let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;


let questions = [
{
	question:'The planet earth, is what number in the solar system',

	choice1:'3rd', 
    choice2: '4th', 
    choice3: '5th',
    choice4: '6th',  
    answer: 1
},
{
	question:'what country did coranovirus start from? ',

	choice1:'USA', 
    choice2: 'CHINA', 
    choice3: 'INDIA',
    choice4: 'GERMANY',  
    answer: 2
},
{
	question:'how many states are there in the usa',

	choice1:'50', 
    choice2: '70', 
    choice3: '35',
    choice4: '51',  
     answer: 1
},
{
	question:'which of this is the heart of a music',

	choice1:'piano', 
    choice2: 'tamborine', 
    choice3: 'drums',
    choice4: 'recoorder',  
    answer: 3
},
{
	question:'how would define love',

	choice1:'sacrifice', 
    choice2: 'friends for benefit', 
    choice3: 'you know the levels',
    choice4: 'what they do when they are bored',  
    answer: 1
}
];

//constants
const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 5;

startGame = () => {
	questionCounter = 0;
	score = 0;
	availableQuestions = [...questions];

	getNewQuestion();
};

getNewQuestion = () => {
	if (availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS){
		localStorage.setItem('mostRecentScore', score);
		//go to the end page
		return window.location.assign("./end.html");
	}
	questionCounter++;
	questionCounterText.innerText= `${questionCounter}/${MAX_QUESTIONS}`

	const questionIndex = Math.floor(Math.random() * availableQuestions.length);
	currentQuestion = availableQuestions[questionIndex];
	question.innerText = currentQuestion.question;

	choices.forEach( choice => {
		const number = choice.dataset['number'];
		choice.innerText = currentQuestion['choice'+ number];
	});

	availableQuestions.splice(questionIndex, 1);
    
	acceptingAnswers = true;
};

//to select the right answer
   choices.forEach(choice => {
   	choice.addEventListener('click', e =>{
   		if (!acceptingAnswers) return;

		   acceptingAnswers = false;
		   const selectedChoice = e.target;
		   const selectedAnswer = selectedChoice.dataset['number'];

		   const classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect';

		   if(classToApply === 'correct'){
			   incrementScore(CORRECT_BONUS)
		   }

		selectedChoice.parentElement.classList.add(classToApply);

		setTimeout (() => {
			selectedChoice.parentElement.classList.remove(classToApply);
			getNewQuestion();
		},1000);
		  
   		
   	});
   });

   incrementScore = num => {
	   score += num;
	   scoreText.innerText = score;
   }

startGame();