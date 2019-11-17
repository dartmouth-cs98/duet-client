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

export const getAllUsers = () => {
    return new Promise((resolve) => {
        axios({
            method: 'get', 
            url: `https://cs98-duet.herokuapp.com/getall`,
        }).then((response) => resolve(response.data));
    })
}

export const addNewFriend = (userId, friendId) => {
    return new Promise((resolve) => {
        axios.post(`https://cs98-duet.herokuapp.com/addFriend`, {
            "id": userId,
            "user_two_id": friendId,
        }).then((response) => resolve(response.data));
    })
}

export const searchForUsers = (query) => {
    return new Promise((resolve) => {
        getAllUsers()
        .then((users) => {
            let results = [];
            users.forEach((user) => {
                const { display_name, id } = user;
                if (display_name.toLowerCase().includes(query.toLowerCase())) {
                    results = [ ...results, { display_name, id }] ;
                }
            })
            resolve(results);
        })
    })
}

export const storeSurveyData = (data, id) => {
    return new Promise((resolve) => {
        axios.post(`https://cs98-duet.herokuapp.com/postusersurvey/${id}`, data).then((response) => resolve(response.data));
    })
}