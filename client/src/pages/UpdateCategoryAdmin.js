import React from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router';

import NavbarAdmin from '../components/NavbarAdmin';

export default function UpdateCategoryAdmin() {
  const title = 'Category admin';
  document.title = 'DumbMerch | ' + title;

  let navigate = useNavigate();
  const { id } = useParams();

  const handleChange = (e) => {
    setCategory({
      ...category,
      name: e.target.value,
    });
  };

  return (
    <>
      <NavbarAdmin title={title} />
      <Container className="py-5">
        <Row>
          <Col xs="12">
            <div className="text-header-category mb-4">Edit Category</div>
          </Col>
          <Col xs="12">
            <form onSubmit={(e) => handleSubmit.mutate(e)}>
              <input
                onChange={handleChange}
                value={category.name}
                placeholder="category"
                className="input-edit-category mt-4"
              />
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
