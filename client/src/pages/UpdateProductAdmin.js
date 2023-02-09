import React, { useEffect, useState } from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { useMutation, useQuery } from 'react-query';
import { useNavigate, useParams } from 'react-router';

import CheckBox from '../components/form/CheckBox';
import NavbarAdmin from '../components/NavbarAdmin';


import { API } from '../config/api';

export default function UpdateProductAdmin() {
  const title = 'Product admin';
  document.title = 'DumbMerch | ' + title;

  let navigate = useNavigate();
  const { id } = useParams();

  const [isLoading, setIsLoading] = useState(true); //Store all category data
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


  async function getDataUpdate() {
    const responseProduct = await API.get('/product/' + id);
    const responseCategories = await API.get('/categories');
    setCategories(responseCategories.data.data);
    setPreview(responseProduct.data.data.image);

    const newCategoryId = responseProduct.data.data?.category?.map((item) => {
      return item.id;
    });

    setForm({
      ...form,
      name: responseProduct.data.data.name,
      desc: responseProduct.data.data.desc,
      price: responseProduct.data.data.price,
      qty: responseProduct.data.data.qty,
      category_id: newCategoryId
    });
    setIsLoading(false)
  }

  useEffect(() => {
    getDataUpdate()
  }, []);

  // For handle if category selected
  const handleChangeCategoryId = (e, setIsChecked) => {
    const id = parseInt(e.target.value);
    const checked = e.target.checked;

    if (checked) {
      // Save category id if checked
      setForm({ ...form, category_id: [...form.category_id, id] });
      setIsChecked(true)
    } else {
      // Delete category id from variable if unchecked
      let newCategoryId = form?.category_id?.filter((categoryId) => {
        return categoryId != id;
      });
      setForm({ ...form, category_id: newCategoryId });
      setIsChecked(false)
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
      if (form.image) {
        formData.set('image', form?.image[0], form?.image[0]?.name);
      }
      formData.set('name', form.name);
      formData.set('desc', form.desc);
      formData.set('price', form.price);
      formData.set('qty', form.qty);
      let category_id = form.category_id.map((categoryId) => Number(categoryId))
      formData.set('category_id', JSON.stringify(category_id));


      const response = await API.patch(
        '/product/' + id,
        formData,
        config
      );
      console.log(response.data);

      navigate('/product-admin');
    } catch (error) {
      console.log(error);
    }
  });


  return (
    <>
      <NavbarAdmin title={title} />
      <Container className="py-5">
        <Row>
          <Col xs="12">
            <div className="text-header-category mb-4">Update Product</div>
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
                    alt="preview"
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
              <label htmlFor="upload" className="label-file-add-product">
                Upload file
              </label>
              <input
                type="text"
                placeholder="Product Name"
                name="name"
                onChange={handleChange}
                value={form?.name}
                className="input-edit-category mt-4"
              />
              <textarea
                placeholder="Product Desc"
                name="desc"
                onChange={handleChange}
                value={form?.desc}
                className="input-edit-category mt-4"
                style={{ height: '130px' }}
              ></textarea>
              <input
                type="number"
                placeholder="Price (Rp.)"
                name="price"
                onChange={handleChange}
                value={form?.price}
                className="input-edit-category mt-4"
              />
              <input
                type="number"
                placeholder="Stock"
                name="qty"
                onChange={handleChange}
                value={form?.qty}
                className="input-edit-category mt-4"
              />

              <div className="card-form-input mt-4 px-2 py-1 pb-2">
                <div
                  className="text-secondary mb-1"
                  style={{ fontSize: '15px' }}
                >
                  Category
                </div>
                {!isLoading && categories?.map((item, index) => (
                  <label key={index} className="checkbox-inline me-4">
                    <CheckBox
                      categoryId={form?.category_id}
                      value={item?.id}
                      handleChangeCategoryId={handleChangeCategoryId}
                    />
                    <span className="ms-2">{item?.name}</span>
                  </label>))
                }
              </div>

              <div className="d-grid gap-2 mt-4">
                <Button type="submit" variant="success" size="md">
                  Save
                </Button>
              </div>
            </form>
          </Col>
        </Row>
      </Container>
    </>
  );
}
