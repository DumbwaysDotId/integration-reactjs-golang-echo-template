## Fetching data

- Fetching product data

  > File product for customer : `client/src/pages/Product.js`

  > File product for admin : `client/src/pages/ProductAdmin.js`

  Get useQuery from `react-query` :

  ```javascript
  import { useQuery, useMutation } from 'react-query';
  ```

  Get API config :

  ```javascript
  import { API } from '../config/api';
  ```

  Fetching product data process :

  ```javascript
  // Fetching product data from database
  let { data: products } = useQuery('productsCache', async () => {
    const response = await API.get('/products');
    return response.data.data;
  });
  ```

* Fetching detail product data

  > File : `client/src/pages/DetailProduct.js`

* Fetching profile data

  > File : `client/src/pages/Profile.js`

* Fetching transaction data

  > File : `client/src/pages/Profile.js`

* Fetching category data

  > File : `client/src/pages/CategoryAdmin.js`

* Insert transaction (buy)

  **This step after fetching product detail data**

  > File : `client/src/pages/DetailProduct.js`

  Don't forget to Get `useMutation` :

  ```javascript
  import { useQuery, useMutation } from 'react-query';
  ```

  Get API config :

  ```javascript
  import { API } from '../config/api';
  ```

  `We get product data from fetching product data process`

  Handle buy process & insert transaction data to database :

  ```javascript
  const handleBuy = useMutation(async (e) => {
    try {
      e.preventDefault();

      const config = {
        headers: {
          'Content-type': 'application/json',
        },
      };

      const data = {
        idProduct: product.id,
        idSeller: product.user.id,
        price: product.price,
      };

      const body = JSON.stringify(data);

      await API.post('/transaction', body, config);

      navigate('/profile');
    } catch (error) {
      console.log(error);
    }
  });
  ```
