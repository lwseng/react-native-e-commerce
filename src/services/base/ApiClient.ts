import axios from "axios";
import Api from "../../constants/Api";

const ApiClient = axios.create({
    baseURL: Api.baseURL,
    timeout: Api.timeout
})

export default ApiClient