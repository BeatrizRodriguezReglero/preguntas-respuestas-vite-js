import { QUESTIONS, userAnswers } from './constants';
import { buttonStartElement, gameBoardElement } from './dom';

let currentQuestionIndex = 0;

let isLastQuestion = false;

const printGameContent = content => {
	gameBoardElement.textContent = '';
	gameBoardElement.append(content);
};

const createTitle = () => {
	buttonStartElement.classList.add('hide');
	const newQuestionContainer = document.createElement('div');
	const newQuestion = document.createElement('h2');
	newQuestion.textContent = QUESTIONS[currentQuestionIndex].question;
	newQuestion.classList.add('question');
	const newAnswersContainer = document.createElement('div');
	newAnswersContainer.classList.add('answer-container');
	const options = QUESTIONS[currentQuestionIndex].options;
	options.forEach(answer => {
		const newOption = document.createElement('p');
		newOption.textContent = answer;
		newOption.classList.add('options');
		newOption.dataset.answer = answer;
		newAnswersContainer.append(newOption);
	});
	newAnswersContainer.addEventListener('click', event => {
		const answer = event.target.dataset.answer;
		if (!answer) return;
		saveUserAnswer(answer);
	});
	newQuestionContainer.append(newQuestion, newAnswersContainer);
	printGameContent(newQuestionContainer);
};

const createFinalResults = () => {
	const newResultsContainer = document.createElement('div');
	newResultsContainer.classList.add('results-container');
	const finalResultsTitle = document.createElement('h1');
	finalResultsTitle.textContent = 'FINAL RESULTS';
	finalResultsTitle.classList.add('finalTitle');
	newResultsContainer.append(finalResultsTitle);

	QUESTIONS.forEach((question, index) => {
		const newQuestion = document.createElement('h2');
		newQuestion.textContent = question.question;
		const newCorrectAnswer = document.createElement('span');
		newCorrectAnswer.textContent = question.correctAnswer + ' - ';
		const newUserAnswer = document.createElement('span');
		newUserAnswer.textContent = userAnswers[index];

		if (question.correctAnswer === userAnswers[index]) {
			newUserAnswer.classList.add('correct');
		} else {
			newUserAnswer.classList.add('incorrect');
		}
		newResultsContainer.append(newQuestion, newCorrectAnswer, newUserAnswer);
	});
	printGameContent(newResultsContainer);
};

const updateCounter = () => currentQuestionIndex++;

const checkLastQuestion = () => {
	updateCounter();
	if (currentQuestionIndex === QUESTIONS.length) {
		isLastQuestion = true;
		createFinalResults();
	} else {
		createTitle();
	}
};

const saveUserAnswer = userAnswer => {
	userAnswers.push(userAnswer);
	console.log(userAnswers);
	checkLastQuestion();
};

export {
	currentQuestionIndex,
	isLastQuestion,
	printGameContent,
	createTitle,
	createFinalResults,
	updateCounter,
	checkLastQuestion,
	saveUserAnswer
};
