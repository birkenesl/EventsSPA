import { Form, Button} from 'react-bootstrap';
import { useState } from 'react';
import { api_login } from './api';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';

function Login() {
  let history = useHistory();
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");


  function on_submit(ev) {

    ev.preventDefault();

    api_login(email, pass).then(() => {
      history.push("/");
    });
  }

  return (
    <Form onSubmit={on_submit}>
      <Form.Group>
        <Form.Label>Email</Form.Label>
        <Form.Control name="email"
                      type="email"
                      placeholder="Enter email"
                      onChange={(ev) => setEmail(ev.target.value)}
                      value={email} />

        <Form.Label>Password</Form.Label>
        <Form.Control name="password"
                      type="password"
                      placeholder="Password"
                      onChange={(ev) => setPass(ev.target.value)}
                      value={pass} />
        <Button variant="dark" type="submit">
          Login
        </Button>
      </Form.Group>
    </Form>
  );
}
function state2props(_state) {
  return {};
}

export default connect(state2props)(Login);
