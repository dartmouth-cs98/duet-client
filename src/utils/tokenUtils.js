

export const storeToken = (token) => {
    localStorage.setItem("token", JSON.stringify({ token, time: new Date() }));
}

export const getToken = () => {
    const tokenObject = JSON.parse(localStorage.getItem("token"));

    if (tokenObject) {
        const token = tokenObject.token;
        const timestamp = Date.parse(tokenObject.time);
        const now = new Date();
        const msDiff = now - timestamp; //in ms
        const minuteDiff = Math.round(msDiff / 60000);
        
        // only return token if it's less than an hour old
        if (minuteDiff < 60)  {
            return token;
        }
    }
    return null;
}