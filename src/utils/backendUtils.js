import axios from 'axios';

export const getUser = (id) => {
    return new Promise((resolve) => {
        axios({
            method: 'get', 
            url: `https://cs98-duet.herokuapp.com/get/${id}`,
        }).then((response) => resolve(response.data));
    })
}

export const addUser = (user) => {
    return new Promise((resolve) => {
        axios.post(`https://cs98-duet.herokuapp.com/add`, user).then((response) => resolve(response.data));
    })
}

// export const updateUser = (user) => {

// }