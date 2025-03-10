import axios from 'axios';

export const getProductArrival = async () => {
  return await axios.get('http://localhost:5000/api/Categories/getAll')
}
