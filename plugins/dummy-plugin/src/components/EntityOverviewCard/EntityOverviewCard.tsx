import React, { useEffect, useState } from 'react';
import { Grid, Typography } from '@material-ui/core';
import { Content, InfoCard } from '@backstage/core-components';
import { useEntity } from '@backstage/plugin-catalog-react';




interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  
}

interface ProductData {
  products: Product[];
}

export const EntityOverviewCard = () => {
  const { entity } = useEntity();
  const [productData, setProductData] = useState<ProductData | null>(null);

  useEffect(() => {
    fetch('https://dummyjson.com/products')
      .then(res => res.json())
      .then((data: ProductData) => setProductData(data))
      .catch(error => console.error('Error fetching product data:', error));
  }, []);

  

  return (
    <Content>
      <Grid container spacing={3} direction="column">
        <Grid item>
          <InfoCard title="Information card">
            <Typography variant="body1">
              Tired of Lorem ipsum ? Try DummyJSON !
              <br />
              You are on EntityPage of {entity.metadata.name}
            </Typography>
          </InfoCard>
        </Grid>

        {/* del ici */}

        <Grid item>
          <InfoCard title="Product Data">
        
            {productData?.products.map(product => (
              <div key={product.id}>
                <Typography variant="body1">
                  Product Name: {product.title}
                </Typography>
              </div>
            ))}

          </InfoCard>
        </Grid>
      </Grid>
    </Content>
  );
};
