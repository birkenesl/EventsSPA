import { Row, Col, Card, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';

// Some of this code attributed to Nat Tuck's lecture code provided for the photo-blog-spa app



function Post({post, session}) {

  return (
        <Col md="4">
          <Card border="dark" className="text-center">
            <Card.Body>
              <Card.Title>{post.title}</Card.Title>
              <Card.Title>Posted by {post.user.name}</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">{post.date}</Card.Subtitle>
              <Card.Text>
                {post.description}
              </Card.Text>
              <Card.Text>
                <Link to={`/posts/${post.id}`}>View</Link>
              </Card.Text>

            </Card.Body>

          </Card>
        </Col>
  );
}




function getRelevantPosts({posts, session}) {

  //function owner(post) {
    //return post.user.id === session.user_id;
  //}
  //const businessCampaigns = posts.filter(owner);
  //return businessCampaigns;

  return posts;


}

function Feed({posts, session}) {

  console.log(posts);
  let history = useHistory();

  if (session) {

    let rel = getRelevantPosts({posts, session});
    let cards = rel.map((post) => (
      <Post post={post} session={session} key={post.id} />
    ));
    return (
      <div>
        <h2 className="text-center">Feed</h2>
        <Link to="/posts/new">Create New Event</Link>
        <br/>
        <Container>
          <Row className="text-center">{cards}</Row>
        </Container>
      </div>
    );


  }
  else { // users shouldn't be able to get here if they aren't logged in.
    // so let's redirect them to the login page.
    history.push("/");
    return (
      <div>
      You must log in before creating or viewing events.
      </div>
    )


  }

}

export default connect(
  ({posts, session}) => ({posts, session}))(Feed);
