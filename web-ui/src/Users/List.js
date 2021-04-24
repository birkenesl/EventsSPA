import { Row, Col, Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';


// Much of this code attributed to Nat Tuck's lecture code provided for the photo-blog-spa app

function UsersList({users}) {
  let rows = users.map((user) => (
    <tr key={user.id}>
      <td>{user.name}</td>
      <td>
        [ Edit ]
      </td>
    </tr>
  ));

  return (
    <div>
      <Row>
        <Col>
          <h2>List Users</h2>
          <p>
            <Link to="/users/new">
              New User
            </Link>
          </p>
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Name</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              { rows }
            </tbody>
          </table>
        </Col>
      </Row>
    </div>
  );

}

function state2props({users}) {
  return { users};
}

export default connect(state2props)(UsersList);
