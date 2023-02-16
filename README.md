## Insert data

- Insert data to register account

  > File : `client/src/components/auth/Register.js`

  Get `useMutation` :

  ```javascript
  import { useMutation } from 'react-query';
  ```

  Get API config :

  ```javascript
  import { API } from '../../config/api';
  ```

  Store data with useState :

  ```javascript
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
  });
  ```

  Insert data process using useMutation :

  ```javascript
   const handleSubmit = useMutation(async (e) => {
    try {
      e.preventDefault();

      const response = await API.post('/register', form);

      console.log("register success : ", response)

      const alert = (
        <Alert variant="success" className="py-1">
          Register success!
        </Alert>
      );
      setMessage(alert);
      setForm({
        name: '',
        email: '',
        password: '',
      });
    } catch (error) {
      const alert = (
        <Alert variant="danger" className="py-1">
          Failed to register!
        </Alert>
      );
      setMessage(alert);
      console.log("register failed : ", error);
    }
  });
  ```

  Refactor form element :

  ```html
  <form onSubmit={(e) => handleSubmit.mutate(e)}>
  ```

- Insert data for login process

  > File : `client/src/components/auth/Login.js`

- Insert product data

  > File : `client/src/pages/AddProductAdmin.js`

  ```javascript
  import { useMutation } from 'react-query';
  ```

  Get API config :

  ```javascript
  import { API } from '../../config/api';
  ```

  Create these state for storing some data :
  ```javascript
  const [categories, setCategories] = useState([]); //Store all category data
  const [preview, setPreview] = useState(null); //For image preview
  const [form, setForm] = useState({
    image: '',
    name: '',
    desc: '',
    price: '',
    qty: '',
    category_id: []
  }); //Store product data
  ```

  Type this code :
  ```javascript
  const handleSubmit = useMutation(async (e) => {
    try {
      e.preventDefault();

      // Configuration
      const config = {
        headers: {
          'Content-type': 'multipart/form-data',
        },
      };

      // Store data with FormData as object
      const formData = new FormData();
      formData.set('image', form.image[0], form.image[0].name);
      formData.set('name', form.name);
      formData.set('desc', form.desc);
      formData.set('price', form.price);
      formData.set('qty', form.qty);
      let category_id = form.category_id.map((categoryId) => Number(categoryId))
      formData.set('category_id', JSON.stringify(category_id));

      // Insert product data
      const response = await API.post('/product', formData, config);
      console.log("add product success : ", response);

      navigate('/product-admin');
    } catch (error) {
      console.log("add product failed : ", error);
    }
  });
  ```

- Insert category data

  > File : `client/src/pages/AddCategoryAdmin.js`

* Check Auth for stay login if refresh page

  > File : `client/src/App.js`

  Get API config & setAuthToken :

  ```javascript
  import { API, setAuthToken } from './config/api';
  ```

  Import privateroute that we have in components :

  ```javascript
  import { PrivateRouteAdmin, PrivateRouteLogin, PrivateRouteUser } from './components/PrivateRoute';
  ```

  Import usecontext and UserContext that we have made :

  ```javascript
  import { useContext, useEffect, useState } from 'react';
  import { UserContext } from './context/userContext';
  ```

  Init user context and isloading state :

  ```javascript
  const [state, dispatch] = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(true)
  ```

  Check user token :

  ```javascript
  
  const checkUser = async () => {
    try {
      const response = await API.get('/check-auth');
      console.log("check user success : ", response)
      // Get user data
      let payload = response.data.data;
      // Get token from local storage
      payload.token = localStorage.token;
      // Send data to useContext
      dispatch({
        type: 'USER_SUCCESS',
        payload,
      });
      setIsLoading(false)
    } catch (error) {
      console.log("check user failed : ", error);
      dispatch({
        type: 'AUTH_ERROR',
      });
      setIsLoading(false)
    }
  };

 
  useEffect(() => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
      checkUser();
    } else {
      setIsLoading(false)
    }
  }, []);
  ```

  Redirect Auth :

  ```javascript
  useEffect(() => {
    // Redirect Auth but just when isLoading is false
    if (!isLoading) {
      if (state.isLogin === false) {
        navigate('/auth');
      }
    }
  }, [isLoading]);
  ```

  Make the return become like this :

  ```jsx
  {isLoading ? null :
    <Routes>
      <Route path="/auth" element={<Auth />} />
      <Route element={<PrivateRouteLogin />} >
        <Route element={<PrivateRouteUser />} >
          <Route exact path="/" element={<Product />} />
          <Route path="/product/:id" element={<DetailProduct />} />
          <Route path="/complain" element={<Complain />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
        <Route element={<PrivateRouteAdmin />} >
          <Route path="/complain-admin" element={<ComplainAdmin />} />
          <Route path="/category-admin" element={<CategoryAdmin />} />
          <Route path="/update-category/:id" element={<UpdateCategoryAdmin />} />
          <Route path="/add-category" element={<AddCategoryAdmin />} />
          <Route path="/product-admin" element={<ProductAdmin />} />
          <Route path="/add-product" element={<AddProductAdmin />} />
          <Route path="/update-product/:id" element={<UpdateProductAdmin />} />
        </Route>
      </Route>
    </Routes>
  }
  ```

  > File : `client/src/context/userContext.js`

  Modif the switchcase :

  ```javascript
  switch (type) {
    case 'USER_SUCCESS':
    case 'LOGIN_SUCCESS':
      localStorage.setItem('token', payload.token);
      return {
        isLogin: true,
        user: payload,
      };
    case 'AUTH_ERROR':
    case 'LOGOUT':
      localStorage.removeItem('token');
      return {
        isLogin: false,
        user: {},
      };
    default:
      throw new Error();
  }
  ```
