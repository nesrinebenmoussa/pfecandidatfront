import axios from "axios";

const API_URL = "api/recruters/";

// Create
const create  = async(Data, token) => {
    
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    const response = await axios.post(`${API_URL}register`, Data, config);

    return response.data;
};

// Get all
const getAll = async() => {
    const response = await axios.get(API_URL);
    return response.data;
};

// Delete
const deleteById = async(Id, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
    const response = await axios.delete(API_URL + Id, config);
     
    return response.data;
};

const changeStatus = async(id, token )=>{
    const config = {
        headers: {
            Authorization : `Bearer ${token}` ,
        },
    }
    const response = await axios.put(API_URL+id, config)
    return response.data
}
const getRecruter = async(id) => {
    const response = await axios.get('http://localhost:5000/api/recruters/me/'+id);
    return response.data;
};


const recruterService = {
    create,
    getAll,
    deleteById,
    changeStatus,
    getRecruter
};

export default  recruterService;