import React from 'react';
import { Container, Row, Col, Button } from 'reactstrap';
import Router from 'next/router';
import _get from 'lodash.get';

const FormHeader = (props) => {
  const { heading } = props;
  return (
    <>
      <div
        className="header pb-2 pt-2 d-flex align-items-center"
        style={{
          minHeight: '120px',
          backgroundImage: '/img/theme/profile-cover.jpg',
          backgroundSize: 'cover',
          backgroundPosition: 'center top',
        }}
      >
        <span className="mask bg-gradient-default opacity-8" />
        <Container className="d-flex align-items-center" fluid>
          <Row className="form-header-row w-100">
            <Col>
              <Button
                size="small"
                className="back-button"
                onClick={() => Router.back()}
              >
                <i className="ni ni-bold-left" />
              </Button>
            </Col>
            <Col lg="11">
              <h3 className="display-2 text-white">{heading || 'Create'}</h3>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export { FormHeader };
