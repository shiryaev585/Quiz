import React from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";
import classes from "./QuizList.module.css";
import Loader from "../../components/UI/Loader/Loader";

export default class QuizList extends React.Component {

  state = {
    quizes: [],
    loading: true
  }

  renderQuizes() {
      return this.state.quizes.map((quiz) => {
        return (
            <li
                key={quiz.id}
            >
                <NavLink to={'/quiz/' + quiz.id}>
                    { quiz.name }
                </NavLink>
            </li>
        )
      })
  }

  async componentDidMount() {
    try {
      const res = await axios.get('https://quiz-4415a-default-rtdb.firebaseio.com/quizes.json');

      const quizes = [];

      Object.keys(res.data).forEach((key, index) => {
        quizes.push({
          id: key,
          name: `Тест № ${index + 1}`
        })
      });

      this.setState({ quizes, loading: false })
    } catch (error) {
      console.log(error)
    }
  }

  render() {
    return (
      <div className={classes.QuizList}>
        <div>
          <h1>Список тестов</h1>

          { 
            this.state.loading 
            ? <Loader />
            : <ul>{this.renderQuizes()}</ul>
          }
        </div>
      </div>
    );
  }
}
