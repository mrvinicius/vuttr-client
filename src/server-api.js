import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: `http://localhost:3000`
});

async function add(tool) {
    const { data } = await axiosInstance.post('/tools', tool);
    await wait(1000);
    return data;
}

async function getAll() {
    const { data } = await axiosInstance.get('/tools');
    await wait(1000);
    return data;
}

async function remove(id) {
    axiosInstance.delete(`/tools/${id}`)
}

function wait(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

export default { add, getAll, remove };