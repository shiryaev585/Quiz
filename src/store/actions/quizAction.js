import axios from "../../api/axiosQuiz";
import { FETCH_QUIZES_ERROR, FETCH_QUIZES_START, FETCH_QUIZES_SUCCESS } from "./types";

export const fetchQuizes = () => {
    return async dispatch => {
        dispatch(fetchQuizesStart())
        try {
            const res = await axios.get('quizes.json');
      
            const quizes = [];
      
            Object.keys(res.data).forEach((key, index) => {
              quizes.push({
                id: key,
                name: `Тест № ${index + 1}`
              })
            });
      
            dispatch(fetchQuizesSuccess(quizes))
          } catch (error) {
            dispatch(fetchQuizesError(error))
          }
    }
}

export const fetchQuizesStart = () => {
    return {
        type: FETCH_QUIZES_START
    }
}

export const fetchQuizesSuccess = (quizes) => {
    return {
        type: FETCH_QUIZES_SUCCESS,
        quizes
    }
}

export const fetchQuizesError = (error) => {
    return {
        type: FETCH_QUIZES_ERROR,
        error
    }
}