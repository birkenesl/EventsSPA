import { Row, Col, Form, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import pick from 'lodash/pick';

import { create_user, fetch_users, fetch_posts, api_login} from '../api';

// Much of this code attributed to Nat Tuck's lecture code provided for the photo-blog-spa app

function UsersNew() {
  let history = useHistory();
  const [user, setUser] = useState({
    name: "", email: "", pass1: "", pass2: "",
  });

  function onSubmit(ev) {
    ev.preventDefault();
    console.log(ev);
    console.log(user);

    let data = pick(user, ['name', 'email', 'password']);
    create_user(data).then(() => {
      fetch_users();
      fetch_posts();
      api_login(user.email, user.password).then(() => {
        history.push("/");
      });
    });
  }

  function check_pass(p1, p2) {
    // This is for user experience only,
    // validation logic goes on the server.
    if (p1 !== p2) {
      return "Passwords don't match.";
    }

    if (p1.length < 8) {
      return "Password too short.";
    }

    return "";
  }

  function check_name(nm) {
    if (nm == "") {
      return "Name can't be blank."
    }

    return "";
  }


  function check_email(nm) {
    if (nm == "") {
      return "Email can't be blank."
    }

    return "";
  }

  function update(field, ev) {
    let u1 = Object.assign({}, user);
    u1[field] = ev.target.value;
    u1.password = u1.pass1;
    u1.pass_msg = check_pass(u1.pass1, u1.pass2);
    u1.name_msg = check_name(u1.name)
    u1.email_msg = check_email(u1.email)
    setUser(u1);
  }

  return (
    <div>
      <br/>
      <h2 class="text-center"> Register New User</h2>

      <Form onSubmit={onSubmit}>
        <Form.Group>
          <Form.Label>Name</Form.Label>
          <Form.Control type="text"
                        onChange={
                          (ev) => update("name", ev)}
            value={user.name} />
          <p>{user.name_msg}</p>
        </Form.Group>
        <Form.Group>
          <Form.Label>Email</Form.Label>
          <Form.Control type="text"
                        onChange={
                          (ev) => update("email", ev)}
            value={user.email} />
          <p>{user.email_msg}</p>
        </Form.Group>



        <Form.Group>
          <Form.Label>Password</Form.Label>
          <Form.Control type="password"
            onChange={
              (ev) => update("pass1", ev)}
            value={user.pass1} />
          <p>{user.pass_msg}</p>

        </Form.Group>
        <Form.Group>
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control type="password"
            onChange={
              (ev) => update("pass2", ev)}
            value={user.pass2} />
        </Form.Group>
        <Button variant="primary" type="submit"
                disabled={user.pass_msg !== "" || user.name_msg != "" || user.email_msg != ""}>
          Save
        </Button>
      </Form>
    </div>
  );
}

function state2props(_state) {
  return {};
}

export default connect(state2props)(UsersNew);
