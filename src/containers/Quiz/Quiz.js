import React from "react";
import axios from "../../api/axiosQuiz";
import classes from "./Quiz.module.css";
import ActiveQuiz from "../../components/ActiveQuiz/ActiveQuiz";
import FinishedQuiz from "../../components/FinishedQuiz/FinishedQuiz";
import Loader from "../../components/UI/Loader/Loader"

class Quiz extends React.Component {
  state = {
    results: {},
    isFinished: false,
    activeQuestion: 0,
    answerState: null,
    quiz: [],
    loading: true
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

  async componentDidMount() {
    try {
      const res = await axios.get(`/quizes/${this.props.match.params.id}.json`);
      const quiz = res.data;

      this.setState({ quiz, loading: false })
    } catch (error) {
      console.log(error)
    }
  }

  render() {
    return (
      <div className={classes.Quiz}>
        <div className={classes.QuizWrapper}>
          <h1>Ответьте на все вопросы</h1>

          {
            this.state.loading
            ? <Loader /> 
            : this.state.isFinished
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
