import React, { useEffect, useState } from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router';

import NavbarAdmin from '../components/NavbarAdmin';

import { API } from '../config/api';

export default function AddProductAdmin() {
  const title = 'Product admin';
  document.title = 'DumbMerch | ' + title;

  let navigate = useNavigate();

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

  // Fetching category data
  const getCategories = async () => {
    try {
      const response = await API.get('/categories');
      setCategories(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  // For handle if category selected
  const handleChangeCategoryId = (e) => {
    const id = e.target.value;
    const checked = e.target.checked;

    if (checked) {
      // Save category id if checked
      setForm({ ...form, category_id: [...form.category_id, id] });
    } else {
      // Delete category id from variable if unchecked
      let newCategoryId = form.category_id.filter((categoryId) => {
        return categoryId != id;
      });
      setForm({ ...form, category_id: newCategoryId });
    }
  };

  // Handle change data on form
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]:
        e.target.type === 'file' ? e.target.files : e.target.value,
    });

    // Create image url for preview
    if (e.target.type === 'file') {
      let url = URL.createObjectURL(e.target.files[0]);
      setPreview(url);
    }
  };

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
      formData.set('categoryId', form.category_id);

      // Insert product data
      const response = await API.post('/product', formData, config);
      console.log("add product success : ", response);

      navigate('/product-admin');
    } catch (error) {
      console.log("add product failed : ", error);
    }
  });

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <>
      <NavbarAdmin title={title} />
      <Container className="py-5">
        <Row>
          <Col xs="12">
            <div className="text-header-category mb-4">Add Product</div>
          </Col>
          <Col xs="12">
            <form onSubmit={(e) => handleSubmit.mutate(e)}>
              {preview && (
                <div>
                  <img
                    src={preview}
                    style={{
                      maxWidth: '150px',
                      maxHeight: '150px',
                      objectFit: 'cover',
                    }}
                    alt={preview}
                  />
                </div>
              )}
              <input
                type="file"
                id="upload"
                name="image"
                hidden
                onChange={handleChange}
              />
              <label for="upload" className="label-file-add-product">
                Upload file
              </label>
              <input
                type="text"
                placeholder="Product Name"
                name="name"
                onChange={handleChange}
                className="input-edit-category mt-4"
              />
              <textarea
                placeholder="Product Desc"
                name="desc"
                onChange={handleChange}
                className="input-edit-category mt-4"
                style={{ height: '130px' }}
              ></textarea>
              <input
                type="number"
                placeholder="Price (Rp.)"
                name="price"
                onChange={handleChange}
                className="input-edit-category mt-4"
              />
              <input
                type="number"
                placeholder="Stock"
                name="qty"
                onChange={handleChange}
                className="input-edit-category mt-4"
              />

              <div className="card-form-input mt-4 px-2 py-1 pb-2">
                <div
                  className="text-secondary mb-1"
                  style={{ fontSize: '15px' }}
                >
                  Category
                </div>
                {categories.map((item, index) => (
                  <label className="checkbox-inline me-4" key={index}>
                    <input
                      type="checkbox"
                      value={item.id}
                      onClick={handleChangeCategoryId}
                    />{' '}
                    {item.name}
                  </label>
                ))}
              </div>

              <div className="d-grid gap-2 mt-4">
                <Button type="submit" variant="success" size="md">
                  Add
                </Button>
              </div>
            </form>
          </Col>
        </Row>
      </Container>
    </>
  );
}
