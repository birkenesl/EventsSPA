import { Row, Col, Card, Form, Button, Container } from 'react-bootstrap';
import { Link} from 'react-router-dom';
import { useState } from 'react';
import { connect } from 'react-redux';
import { useHistory, useParams} from 'react-router-dom';
import { create_post, fetch_posts, create_response, create_comment, fetch_users } from '../api';



function Show({posts, session}) {

  let history = useHistory();


  let params = useParams();
  let id = params.id;

  function grabPost(id) {
    for (var i = 0, len = posts.length; i < len; i++) {
      //console.log(posts[i].id);
      if (posts[i].id == id) {
        //console.log(posts[i]);
        return posts[i];
      }
    }
  }

  let post = grabPost(id);

  const [resp, setResp] = useState({
    body: "", rating: 1, post_id: id,
  });

  const [comment, setComment] = useState({
    body: "", post_id: id,
  });


  console.log(id);

  function onSubmitResponse(ev) {
    ev.preventDefault();
    console.log(ev)


    create_response(resp).then((resps) => {
      console.log(resps);
      if (resps["errors"]) {
        console.log("errors", resps.errors);
      }
      else {
        fetch_posts();
        history.push("/");

      }
    });

  }

  function onSubmitComment(ev) {
    ev.preventDefault();
    console.log(ev)


    create_comment(comment).then((resps) => {
      console.log(resps);
      if (resps["errors"]) {
        console.log("errors", resps.errors);
      }
      else {
        fetch_posts();
        history.push("/");

      }
    });

  }


  function Comment ({comment}) {
    return (
            <Card border="dark" className="text-center">
              <Card.Body>
                <Card.Title>Posted by {comment.user.name}</Card.Title>
                <Card.Text>
                  {comment.body}
                </Card.Text>
              </Card.Body>
            </Card>
    );
  }

  function update(field, ev) {
    let u1 = Object.assign({}, comment);
    u1[field] = ev.target.value;
    //console.log(id);
    u1.post_id = parseInt(id);
    //u1.post_id = id;
    setComment(u1);
  }

  let cards = <div> </div>;
  if (post.comments != null) {
    let cards = post.comments.map((comment) => (
      <Comment comment={comment} key={post.id} />
    ));
  }


  return (
    <div>
      <Col md="4">
        <Card border="dark" className="text-center">
          <Card.Body>
            <Card.Title>{post.title}</Card.Title>
            <Card.Title>Posted by {post.user.name}</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">{post.date}</Card.Subtitle>
            <Card.Text>
              {post.description}
            </Card.Text>
          </Card.Body>
          <br/>
        </Card>
      </Col>

      <Col md="4">


      </Col>

      <Form onSubmit={onSubmitComment}>
        <Form.Group>
          <Form.Label>New Comment</Form.Label>
          <Form.Control type="text"
                        as="textarea"
                        onChange={
                          (ev) => update("body", ev)}
            value={comment.body} />
        </Form.Group>


        <Button variant="primary" type="submit"
                >
          Post Comment
        </Button>
      </Form>

      <Container>
        <Row className="text-center">{cards}</Row>
      </Container>
    </div>

  );


}


export default connect(
  ({posts, session}) => ({posts, session}))(Show);
