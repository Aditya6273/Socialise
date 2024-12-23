import axios from "axios";


const Axios = axios.create({
    baseURL: "http://localhost:3000/api",
    withCredentials: true,
    headers: {
        "Authorization": "Bearer " + localStorage.getItem("token"),
    },
})


export default Axios;