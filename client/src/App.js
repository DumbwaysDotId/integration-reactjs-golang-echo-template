import { useContext, useEffect, useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { UserContext } from './context/userContext';

import AddCategoryAdmin from './pages/AddCategoryAdmin';
import AddProductAdmin from './pages/AddProductAdmin';
import Auth from './pages/Auth';
import CategoryAdmin from './pages/CategoryAdmin';
import Complain from './pages/Complain';
import ComplainAdmin from './pages/ComplainAdmin';
import DetailProduct from './pages/DetailProduct';
import Product from './pages/Product';
import ProductAdmin from './pages/ProductAdmin';
import Profile from './pages/Profile';
import UpdateCategoryAdmin from './pages/UpdateCategoryAdmin';
import UpdateProductAdmin from './pages/UpdateProductAdmin';

function App() {
  let navigate = useNavigate();

  return (
    <>
      <Routes>
        <Route path="/auth" element={<Auth />} />
        <Route exact path="/" element={<Product />} />
        <Route path="/product/:id" element={<DetailProduct />} />
        <Route path="/complain" element={<Complain />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/complain-admin" element={<ComplainAdmin />} />
        <Route path="/category-admin" element={<CategoryAdmin />} />
        <Route path="/update-category/:id" element={<UpdateCategoryAdmin />} />
        <Route path="/add-category" element={<AddCategoryAdmin />} />
        <Route path="/product-admin" element={<ProductAdmin />} />
        <Route path="/add-product" element={<AddProductAdmin />} />
        <Route path="/update-product/:id" element={<UpdateProductAdmin />} />
      </Routes>
    </>
  );
}

export default App;
