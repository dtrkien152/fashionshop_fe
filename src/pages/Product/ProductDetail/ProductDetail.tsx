import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
}

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    const fetchProductDetail = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`/api/products/${id}`);
        setProduct(response.data);
        setError(null);
      } catch (e) {
        setError('Failed to fetch product details.');
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };

    fetchProductDetail();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!product) return <p>Product not found.</p>;

  return (
    <div>
      <h1>{product.name}</h1>
      <p>{product.description}</p>
      <p>Price: ${product.price}</p>
    </div>
  );
};

export default ProductDetail;
