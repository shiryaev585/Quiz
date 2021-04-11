import React from "react";
import classes from "./Quiz.module.css";
import ActiveQuiz from "../../components/ActiveQuiz/ActiveQuiz";
import FinishedQuiz from "../../components/FinishedQuiz/FinishedQuiz";

class Quiz extends React.Component {
  state = {
    results: {},
    isFinished: false,
    activeQuestion: 0,
    answerState: null,
    quiz: [
      {
        question: "Какого цвета небо?",
        rightAnswerId: 2,
        id: 1,
        answers: [
          { id: 1, text: "Чёрный" },
          { id: 2, text: "Синий" },
          { id: 3, text: "Красный" },
          { id: 4, text: "Зелёный" },
        ],
      },
      {
        question: "В каком году основали Санкт-Петербург?",
        rightAnswerId: 3,
        id: 2,
        answers: [
          { id: 1, text: "1700" },
          { id: 2, text: "1702" },
          { id: 3, text: "1703" },
          { id: 4, text: "1803" },
        ],
      },
    ],
  };

  onAnswerClickHandler = (answerId) => {

    //фикс бага с двойным кликом по правильному ответу
    if (this.state.answerState) {
      const key = Object.keys(this.state.answerState)[0];
      if (this.state.answerState[key] === 'success') {
        return 
      }
    }

    const question = this.state.quiz[this.state.activeQuestion];
    const results = this.state.results;

    //проверка на правильность ответа
    if (question.rightAnswerId === answerId) {
      if (!results[question.id]) {
        results[question.id] = 'success'
      }

      this.setState({
        answerState: {[answerId]: 'success'},
        results
      });
      
    //ответ правильный  
      const timeout = window.setTimeout(() => {

        //проверка на конец опроса
        if (this.isQuizFinished()) {
          this.setState({
            isFinished: true
          })

        } else {
          //переключает на следующий вопрос
          this.setState({
            activeQuestion: this.state.activeQuestion + 1,
            answerState: null
          });
        }
        window.clearTimeout(timeout)
      }, 1000)
      
    // ответ неправильный  
    } else {
      results[question.id] = 'error'
      this.setState({
        answerState: {[answerId]: 'error'},
        results
      })
    }
  };

  isQuizFinished() {
    return this.state.activeQuestion + 1 === this.state.quiz.length
  }

  retryHandler = () => {
    this.setState({
      results: {},
      isFinished: false,
      activeQuestion: 0,
      answerState: null,
    })
  }

  componentDidMount() {
    console.log("Quiz ID = ", this.props.match.params.id)
  }

  render() {
    return (
      <div className={classes.Quiz}>
        <div className={classes.QuizWrapper}>
          <h1>Ответьте на все вопросы</h1>

          {
            this.state.isFinished
             ? <FinishedQuiz 
                results={this.state.results}
                quiz={this.state.quiz}
                onRetry={this.retryHandler}
              />
             : <ActiveQuiz
                answers={this.state.quiz[this.state.activeQuestion].answers}
                question={this.state.quiz[this.state.activeQuestion].question}
                onAnswerClick={this.onAnswerClickHandler}
                quizLength={this.state.quiz.length}
                answerNumber={this.state.activeQuestion + 1}
                state={this.state.answerState}
              />
          }
        </div>
      </div>
    );
  }
}

export default Quiz;
