import React from 'react';
import { Button, Col, Container, Row, Table } from 'react-bootstrap';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router';

import DeleteData from '../components/modal/DeleteData';
import NavbarAdmin from '../components/NavbarAdmin';

import imgEmpty from '../assets/empty.svg';

export default function CategoryAdmin() {
  let navigate = useNavigate();

  const title = 'Category admin';
  document.title = 'DumbMerch | ' + title;

  let { data: categories, refetch } = useQuery('categoriesCache', async () => {
    const response = await API.get('/categories');
    return response.data.data;
  });

  const handleEdit = (id) => {
    navigate(`/update-category/${id}`);
  };

  const addCategory = () => {
    navigate('/add-category');
  };

  return (
    <>
      <NavbarAdmin title={title} />

      <Container className="py-5">
        <Row>
          <Col>
            <div className="text-header-category mb-4">List Category</div>
          </Col>
          <Col className="text-end">
            <Button
              onClick={addCategory}
              className="btn-dark"
              style={{ width: '100px' }}
            >
              Add
            </Button>
          </Col>
          <Col xs="12">
            {categories?.length !== 0 ? (
              <Table striped hover size="lg" variant="dark">
                <thead>
                  <tr>
                    <th>No</th>
                    <th>Category Name</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {categories?.map((item, index) => (
                    <tr key={index}>
                      <td width="10%" className="align-middle">
                        {index + 1}
                      </td>
                      <td width="60%" className="align-middle">
                        {item.name}
                      </td>
                      <td width="30%">
                        <Button
                          onClick={() => {
                            handleEdit(item.id);
                          }}
                          className="btn-sm btn-success me-2"
                          style={{ width: '135px' }}
                        >
                          Edit
                        </Button>
                        <Button
                          onClick={() => {
                            handleDelete(item.id);
                          }}
                          className="btn-sm btn-danger"
                          style={{ width: '135px' }}
                        >
                          Delete
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            ) : (
              <div className="text-center pt-5">
                <img
                  src={imgEmpty}
                  className="img-fluid"
                  style={{ width: '40%' }}
                  alt="empty"
                />
                <div className="mt-3">No data category</div>
              </div>
            )}
          </Col>
        </Row>
      </Container>
      <DeleteData
        setConfirmDelete={setConfirmDelete}
        show={show}
        handleClose={handleClose}
      />
    </>
  );
}
