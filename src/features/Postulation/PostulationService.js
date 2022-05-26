import axios from "axios";

const API_URL = "http://localhost:5000/api/postulations/";

// Create
const create = async(Data) => {
    const response = await axios.post(`${API_URL}`, Data);

    return response.data;
};

const getByC = async(id) => {
    const response = await axios.get(
        "http://localhost:5000/api/postulations/condidat/" + id
    );

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

const getById = async(Id, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
    const response = await axios.get(API_URL + Id, config);

    return response.data;
};

const update = async(data) => {
    const response = await axios.put(
        `http://localhost:5000/api/postulations/${data._id}`,
        data
    );
    return response.data;
};

const service = {
    create,
    deleteById,
    getById,
    update,
    getByC,
};

export default service;