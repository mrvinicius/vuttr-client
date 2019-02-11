import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: `http://localhost:3000`
});

async function addTool(tool) {
    const response = await axiosInstance.post('/tools', tool);

    return response.data;
}

async function getAllTools() {
    const response = await axiosInstance.get('/tools');
    await wait(1000);
    return response.data;
}

function wait(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

export { addTool, getAllTools };