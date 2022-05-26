import axios from "axios";

const API_URL = "http://localhost:5000/api/condidats/";

// Create
const updateCondidat = async(Data, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    const response = await axios.patch(API_URL + Data._id, Data, config);

    return response.data;
};


const getCondidatById = async(id, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    const response = await axios.get(API_URL + id, config);

    return response.data;
};


const condidatService = {
    updateCondidat,
    getCondidatById

};


export default condidatService;