import axios from 'axios';

const API_URL = "https://jelou-prueba-tecnica1-frontend.rsbmk.workers.dev";

export const BooksData = async () => {
    try {
        const response = await axios.get(API_URL);
        return response.data.default && response.data.default.library;
    } catch (error) {
        console.error("Error fetching data:", error);
        return null;
    }
};