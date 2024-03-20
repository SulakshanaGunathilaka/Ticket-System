import axios from "axios";
import urls from "../common/Urls";



const login = async (username, password) => {

    await axios
        .post(urls.LOGIN_URL, {
            username: username,
            password: password,
        }).then((response) => {
            if (response.status === 200) {

                //if (response.data.body.user) {
                    localStorage.removeItem("user");
                    localStorage.setItem("user", JSON.stringify(response.data.body));
                    //console.log("token saved angi ",response.data.body);
               // }
                return response.data;
            }

        }).catch((e) => {
                if(e.response.status === 403)
                throw new Error("Error. Username or Password Incorrect")
                else{
                    throw new Error("Error: Something Went Wrong")
                }
            

        });





};



const logout = () => {
    localStorage.removeItem("user");
};

const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem("user"));
};

const AuthService = {
    login,
    logout,
    getCurrentUser

}

export default AuthService;