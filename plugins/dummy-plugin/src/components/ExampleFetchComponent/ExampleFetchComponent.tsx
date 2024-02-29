import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Table, TableColumn, Progress, ResponseErrorPanel } from '@backstage/core-components';
import useAsync from 'react-use/lib/useAsync';

const useStyles = makeStyles({
  avatar: {
    height: 32,
    width: 32,
    borderRadius: '50%',
  },
});

type Product = {
  id?: number;
  title?: string;
  description?: string;
  price?: number;
  discountPercentage?: number;
  rating?: number;
  stock?: number;
  brand?: string;
  category?: string;
  thumbnail?: string;
  images?: string[];
};

type DenseTableProps = {
  product: Product;
};

export const DenseTable = ({ product }: DenseTableProps) => {
  const classes = useStyles();

  const columns: TableColumn[] = [
    { title: 'Thumbnail', field: 'thumbnail' },
    { title: 'Title', field: 'title' },
    { title: 'Description', field: 'description' },
    { title: 'Price', field: 'price' },
    { title: 'Brand', field: 'brand' },
    { title: 'Category', field: 'category' },
  ];

  // Vérification si le produit est défini
  if (!product) {
    return <p>No product data available</p>;
  }

  const data = [{
    thumbnail: product.thumbnail ? <img src={product.thumbnail} alt={product.title} className={classes.avatar} /> : null,
    title: product.title || '-',
    description: product.description || '-',
    price: product.price ? `$${product.price}` : '-',
    brand: product.brand || '-',
    category: product.category || '-',
  }];

  return (
    <Table
      title="Product Information"
      options={{ search: false, paging: false }}
      columns={columns}
      data={data}
    />
  );
};

export const ExampleFetchComponent = () => {

  const { value, loading, error } = useAsync(async (): Promise<Product> => {
    try {
      const response = await fetch('https://dummyjson.com/products/1');
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      throw new Error('Failed to fetch data');
    }
  }, []);

  if (loading) {
    return <Progress />;
  } else if (error) {
    return <ResponseErrorPanel error={error} />;
  }

  // Vérification si value est défini
  return value ? <DenseTable product={value} /> : null;
};
