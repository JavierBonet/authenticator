import { useState, useContext, useEffect } from 'react';
import { Product } from '../../../../common/interfaces';
import EntitiesApi from '../../api/entitiesApi';
import TokenContext from '../../contexts/TokenContext';
import ProductsTable from './Products/ProductsTable';
import { CircularProgress } from '@mui/material';
import styles from './Products.module.scss';
import { toast } from 'react-toastify';

const Products = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const { setToken, tokenRef } = useContext(TokenContext);
  const entitiesApi = new EntitiesApi(setToken, () => tokenRef.current);

  useEffect(() => {
    setLoading(true);
    entitiesApi
      .getProducts()
      .then((response) => {
        setProducts(response.products);
      })
      .catch(() => toast.warn('Could not load products'))
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <div className={styles['products-table']}>
      {loading ? (
        <CircularProgress color="inherit" />
      ) : (
        <ProductsTable products={products} />
      )}
    </div>
  );
};

export default Products;
