import axios from "axios";


const Axios = axios.create({
    baseURL: import.meta.env.MODE === "production" ? "/api" : "http://localhost:3000/api",
    withCredentials: true,
    headers: {
        "Authorization": "Bearer " + localStorage.getItem("token"),
    },
})


export default Axios;