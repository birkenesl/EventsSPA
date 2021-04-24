import { Row, Col, Form, Button } from 'react-bootstrap';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import DateTimePicker from 'react-datetime-picker';
import { create_post,  fetch_posts } from '../api';

// Much of this code attributed to Nat Tuck's lecture code provided for the photo-blog-spa app

export default function PostsNew() {
  let history = useHistory();
  let [post, setPost] = useState({
    title: "", date: "", description: "",
  });

  function submit(ev) {
    ev.preventDefault();
    console.log(ev);
    console.log(post);
    create_post(post).then((resp) => {
      console.log(resp);
      if (resp["errors"]) {
        console.log("errors", resp.errors);
      }
      else {
        fetch_posts();
        history.push("/");

      }
    });
  }

  function check_fields(title, date, description) {
    if (title == "" || date == "" || description == "") {
      return "Please make sure all fields are filled out below."
    }
    else {
      return "";
    }

  }


  function update(field, ev) {
    let p1 = Object.assign({}, post);
    p1[field] = ev.target.value;
    setPost(p1)
    p1.msg = check_fields(p1.title, p1.date, p1.description);
  }

  function updateDate(ev) {
    let p1 = Object.assign({}, post);
    p1.date = ev;
    setPost(p1)
    p1.msg = check_fields(p1.title, p1.date, p1.description);
  }

  return (
    <Row>
      <Col>
        <h2>New Event</h2>
        <Form onSubmit={submit}>
          <p>{post.msg}</p>
          <Form.Group>
            <Form.Label>Title</Form.Label>
            <Form.Control
                          rows={4}
                          onChange={
                            (ev) => update("title", ev)}
                          value={post.title} />
          </Form.Group>
          <Form.Group>
            <Form.Label>Date</Form.Label>

            <DateTimePicker
              onChange={
                (ev) => updateDate(ev)}
              value={post.date}
            />
          </Form.Group>


          <Form.Group>
            <Form.Label>Description</Form.Label>
            <Form.Control as="textarea"
                          rows={4}
                          onChange={
                            (ev) => update("description", ev)}
                          value={post.description} />
          </Form.Group>


          <Button variant="primary" type="submit"
                  disabled={post.msg !== ""}>
            Post
          </Button>
        </Form>
      </Col>
    </Row>
  );
}
