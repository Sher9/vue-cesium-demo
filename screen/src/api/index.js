import axios from 'axios'
// import qs from 'qs'

export const fetchLog = () => {
    return axios.post('/loglist')
}
