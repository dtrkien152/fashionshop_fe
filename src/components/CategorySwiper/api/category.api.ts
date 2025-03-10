import axios from 'axios';

export const getAllCategories = async () => {
  return await axios.get('http://localhost:5000/api/Categories/getAll')
}
