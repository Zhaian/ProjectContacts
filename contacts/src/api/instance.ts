import axios from "axios";


const instance = axios.create({
    baseURL:'https://contacts-12167-default-rtdb.europe-west1.firebasedatabase.app/'
})

export default instance;