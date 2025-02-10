import axios from 'axios';

export const fetchCategories = async () => {
    const response = await axios.get('https://dummyjson.com/products/categories');
    return response.data;
};

export const submitForm = async (data: { title: string }) => {
    const response = await axios.post('https://dummyjson.com/products/add', data);
    return response.data;
};