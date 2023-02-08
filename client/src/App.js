import { useContext, useEffect, useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { UserContext } from './context/userContext';

import Auth from './pages/Auth';
import Product from './pages/Product';
import DetailProduct from './pages/DetailProduct';
import Complain from './pages/Complain';
import Profile from './pages/Profile';
import ComplainAdmin from './pages/ComplainAdmin';
import CategoryAdmin from './pages/CategoryAdmin';
import ProductAdmin from './pages/ProductAdmin';
import UpdateCategoryAdmin from './pages/UpdateCategoryAdmin';
import AddCategoryAdmin from './pages/AddCategoryAdmin';
import AddProductAdmin from './pages/AddProductAdmin';
import UpdateProductAdmin from './pages/UpdateProductAdmin';

import { API, setAuthToken } from './config/api';
import { PrivateRouteLogin, PrivateRouteUser, PrivateRouteAdmin } from './components/PrivateRoute';

function App() {
  let navigate = useNavigate();
  const [state, dispatch] = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Redirect Auth but just when isLoading is false
    if (!isLoading) {
      if (state.isLogin === false) {
        navigate('/auth');
      }
    }
  }, [isLoading]);

  useEffect(() => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
      checkUser();
    } else {
      setIsLoading(false)
    }
  }, []);

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

  return (
    <>
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
    </>
  );
}

export default App;
