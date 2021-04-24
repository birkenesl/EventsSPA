import { Nav, Row, Col, Form, Navbar, Container,
         Button, Alert } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';

import { api_login } from './api';

// Much of this code attributed to Nat Tuck's lecture code provided for the photo-blog-spa app



let SessionInfo = connect()(({session, dispatch}) => {
  function logout() {

    dispatch({type: 'session/clear'});

  }
  return (
    <Navbar.Text>
      <p className="color-white">
        Logged in as {session.name} &nbsp;
        <Button  onClick={logout}>Logout</Button>
      </p>
    </Navbar.Text>
  );
});

function LOI({session}) {

  if (session) {
    return <SessionInfo session={session} />;
  }
  else {
    return (
      <Nav className="mr-auto">
        <Link to="/login">Login</Link>
      </Nav>
    )
  }
}

const LoginOrInfo = connect(
  ({session}) => ({session}))(LOI);

function Link({to, children}) {
  return (
    <Nav.Item>
      <NavLink to={to} exact className="nav-link"
               activeClassName="active">
        {children}
      </NavLink>
    </Nav.Item>
  );
}


function AppNav({error}) {
  let error_row = null;

  if (error) {
    error_row = (
      <Row>
        <Col>
          <Alert variant="danger">{error}</Alert>
        </Col>
      </Row>
    );
  }

  return (
    <div>
      <Row>
        <Col>
          <Nav variant="pills">
            <Link to="/">Feed</Link>
            <Link to="/users/new">Register New User</Link>
          </Nav>
        </Col>
        <Col>
          <LoginOrInfo />
        </Col>
      </Row>
      { error_row }
    </div>
  );
}

export default connect(({error}) => ({error}))(AppNav);
