import React from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";
import classes from "./QuizList.module.css";

export default class QuizList extends React.Component {

  renderQuizes() {
      return [1, 2, 3].map((quiz, index) => {
        return (
            <li
                key={index}
            >
                <NavLink to={'/quiz/' + quiz}>
                    Тест {quiz}
                </NavLink>
            </li>
        )
      })
  }

  componentDidMount() {
    axios.get('https://quiz-4415a-default-rtdb.firebaseio.com/quiz.json')
    .then((res) => {
      console.log(res)
    })
  }

  render() {
    return (
      <div className={classes.QuizList}>
        <div>
          <h1>Список тестов</h1>
          <ul>{this.renderQuizes()}</ul>
        </div>
      </div>
    );
  }
}
