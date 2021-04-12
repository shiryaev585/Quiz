import axios from "axios";

export default axios.create({
    baseURL: 'https://quiz-4415a-default-rtdb.firebaseio.com/'
})