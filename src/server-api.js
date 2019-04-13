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
    await wait(1000);
    const { data } = await axiosInstance.get('/tools');
    return data;
}

async function remove(id) {
    axiosInstance.delete(`/tools/${id}`);
}

async function search(title) {
    const { data } = await axiosInstance.get(`/tools?q=${title}`);
    await wait(1000);
    return data;
}

async function searchInTags(tag) {
    const { data } = await axiosInstance.get(`/tools?tags_like=${tag}`);
    await wait(1000);
    return data;
}

function wait(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

export default { add, getAll, remove, search, searchInTags };
