import { combineReducers } from 'redux';
import authReducer from './authReducer';
import createReducer from './createQuizReducer';
import quizReducer from "./quizReducer";

export default combineReducers({
    quiz: quizReducer,
    create: createReducer,
    auth: authReducer
})