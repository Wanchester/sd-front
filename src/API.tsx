import react from "react";
import axios from "axios";
const BASE_URL = "http://54.210.74.109/api/";

const defaultConfig = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    }
};

const apiMethods = {
    getPlayer : async (userID: {userID: string}) => {
        const endpoint = `${BASE_URL}/profile/${userID}`
        return await(await(fetch(endpoint))).json();
    }
}

export default apiMethods;