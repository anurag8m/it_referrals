import axios from 'axios';

export const register = newUser => {
    return axios
        .post("users/register", {
            first_name: newUser.first_name,
            last_name: newUser.last_name,
            email: newUser.email,
            password: newUser.password
        })
        .then(res => {
            console.log("Registered!");
        });
};

export const login = user => {
    return axios
        .post("http://18.207.190.61:4000/login", {
            email: user.email,
            password: user.password
        })
        .then(res => {
            localStorage.setItem("usertoken", res.data.token);
            return res.data;
        })
        .catch(err => {

            console.log(err.response.data.msg);

        });
};

export const myprofile = user => {
    var headers = {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("usertoken")
    };
    return axios
        .get("/profile", { headers: headers })
        .then(res => {
            return res.data;
        })
        .catch(err => {

            console.log(err);

        });
}

// code to refer the candidate
export const referCandidate = user1 => {
    if (localStorage.usertoken && localStorage.usertoken != 'undefined') {

        var user = {

            "userId": user1.userid
        }

    }
    else {

        var user = {

            "name": user1.username,
            "password": user1.userpassword,
            "email": user1.useremail
        }

    }
    return axios
        .post("http://18.207.190.61:4000/referCandidate", {


            user,

            "candidate": {
                "referredName": user1.referredName,
                "referredLinkedIn": user1.referredLinkedIn,
                "referredResumeLink": user1.referredResumeLink,
                "jobId": user1.jobid
            }

        })
        .then(res => {

            return res.data;
        })
        .catch(err => {

            console.log(err.response.data.msg);

        });
};


// code to refer the job
export const referJob = user1 => {
    if (localStorage.usertoken && localStorage.usertoken != 'undefined') {

        var user = {

            "userId": user1.userid
        }

    }
    else {

        var user = {

            "name": user1.username,
            "password": user1.userpassword,
            "email": user1.useremail
        }

    }
    return axios
        .post("http://18.207.190.61:4000/referJob", {


            user,

            "job": {
                "companyName": user1.companyName,
                "contactPerson": user1.companyContactPersoon,
                "jobTitle": user1.jobTitle,
                "category": user1.jobCategory,
                "duration": user1.duration,
                "descriptionLink": "",
                "description": user1.jobDescription,
            }

        })
        .then(res => {

            return res.data;
        })
        .catch(err => {

            console.log(err.response.data.msg);

        });
};