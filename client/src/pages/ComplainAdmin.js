import React, { useState, useContext } from 'react';
import { Container, Row, Col } from 'react-bootstrap';

import { UserContext } from '../context/userContext';

import NavbarAdmin from '../components/NavbarAdmin';
import Contact from '../components/complain/Contact';
import Chat from '../components/complain/Chat';

import dataContact from '../fakeData/contact';

export default function ComplainAdmin() {
  const [state] = useContext(UserContext);
  const [contact, setContact] = useState(null);

  const title = 'Complain admin';
  document.title = 'DumbMerch | ' + title;

  return (
    <>
      <NavbarAdmin title={title} />
      <Container fluid style={{ height: '89.5vh' }}>
        <Row>
          <Col
            md={3}
            style={{ height: '89.5vh' }}
            className="px-3 border-end border-dark overflow-auto"
          >
            <Contact
              dataContact={dataContact}
              setContact={setContact}
              contact={contact}
            />
          </Col>
          <Col md={9} style={{ maxHeight: '89.5vh' }} className="px-0">
            <Chat contact={contact} />
          </Col>
        </Row>
      </Container>
    </>
  );
}
