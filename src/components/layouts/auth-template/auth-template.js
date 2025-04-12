import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import { SecureHead } from '@/layouts/secure-template';

function AuthTemplate(props) {
  const { children, title } = props;
  React.useEffect(() => {
    // eslint-disable-next-line no-undef
    document.body.classList.add('bg-default');
    return function cleanup() {
      // eslint-disable-next-line no-undef
      document.body.classList.remove('bg-default');
    };
  }, []);
  return (
    <>
      <SecureHead title={title} />
      <div className="main-content">
        <div className="header bg-gradient-info py-7 py-lg-8">
          <Container>
            <div className="header-body text-center mb-7">
              <Row className="justify-content-center">
                <Col lg="5" md="6">
                  <h1 className="text-white">Welcome!</h1>
                  <p className="text-lead">Login to admin dashboard.</p>
                </Col>
              </Row>
            </div>
          </Container>
        </div>
        <Container className="mt--8 pb-5">
          <Row className="justify-content-center">{children}</Row>
        </Container>
      </div>
    </>
  );
}
export default AuthTemplate;
