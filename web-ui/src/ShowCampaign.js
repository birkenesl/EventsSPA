import { Row, Col, Card, Form, Container, Image, Jumbotron} from 'react-bootstrap';
import { Link, useParams} from 'react-router-dom';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { create_post, fetch_post } from './api';



function photo_path(post) {
  return "http://localhost:4000/photos/" + post.photo_hash;
}

function ShowCampaign({posts, session}) {

  async function chartFetch(opts) {

    let resp = await fetch("https://quickchart.io/wordcloud/", opts);
    return resp.json();

  }





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

  function Response({resp}) {
    return (
      <Row>
        <Col>
          <Card border="primary" className="text-center">
            <Card.Header>Rating: {resp.rating} / 5</Card.Header>
            <Card.Text>
              Customer: {resp.body}
            </Card.Text>
          </Card>
        </Col>
      </Row>

    );
  }

  function ListResponses({post}) {


    let resps = post.responses.map((response) => (
      <Response resp={response} key= {response.id} />
    ));
    return (
      <div>
        {resps}
      </div>
    )
  }

  function NoResponses() {
    return (
      <div>
        <h5 className="text-center">Looks like nobody has responded yet. </h5>
      </div>
  );
  }

  function AverageRating({post}) {

    let len = post.responses.length;
    if (len === 0) {
      return (
        <NoResponses/>
      );
    }

    let soFar = 0;
    for (var i = 0; i < len; i++) {
      soFar += post.responses[i].rating
    }
    let avg = soFar / len;
    return (
      <div>
        <h3 className="text-center">{avg} / 5</h3>
      </div>
    )
  }

  function ToneAnalysis({post}) {

    let len = post.responses.length;

    var analytical = 0;
    var anger = 0;
    var confident = 0;
    var fear = 0;
    var joy = 0;
    var sadness = 0;
    var tentative = 0;

    for (var i = 0; i < len; i++) {
      analytical += post.responses[i].analytical;
      anger += post.responses[i].anger;
      confident += post.responses[i].confident;
      fear += post.responses[i].fear;
      joy += post.responses[i].analytical;
      sadness += post.responses[i].analytical;
      tentative += post.responses[i].analytical;
    }

    var arr = [analytical, anger, confident, fear, joy, sadness, tentative];

    let index = arr.indexOf(Math.max(...arr));

    var dominant;

    switch (index) {
      case 0:
        dominant = "Analytical";
        break;
      case 1:
        dominant = "Anger";
        break;
      case 2:
        dominant = "Confident";
        break;
      case 3:
        dominant = "Fear";
        break;
      case 4:
        dominant = "Joy";
        break;
      case 5:
        dominant = "Sadness";
        break;
      case 6:
        dominant = "Tentative";
        break;
      default:
        break;

    }


    const chartObj = {
      type: 'bar',                                // Show a bar chart
      data: {
        labels: ['Analytical', 'Anger', 'Confident', 'Fear', 'Joy', 'Sadness', 'Tentative'],   // Set X-axis labels
      datasets: [{
        label: 'Average Tone',
        data: arr           // Add data to the chart
      }]
    }
  }

    // this code attributed to quickchart.io documentation on js-functions


    const QuickChart = require('quickchart-js');

    const myChart = new QuickChart();
    myChart
      .setConfig({
        type: 'bar',
        data: { labels: ['Analytical', 'Anger', 'Confident', 'Fear', 'Joy', 'Sadness', 'Tentative'],
         datasets: [{ label: 'Average Tone', data: arr}]},
      })
      .setWidth(500)
      .setHeight(500)
      .setBackgroundColor('transparent');

    // Print the chart URL
    let chartUrl = myChart.getUrl();





    return (
      <div>
        <Image src={chartUrl} />
      </div>
  );
  }

  function WordCloud({post}) {

    let len = post.responses.length;
    if (len === 0) {
      return (
        <NoResponses/>
      );
    }



    let allText = "";

    for (var i = 0; i < len; i++) {
      allText += post.responses[i].body
    }

    // we will pass this large text field containing all response bodies
    // to a quickchart api which will return a wordcloud for us.

    // we need to make a post request and pass a couple important parameters
    // to get what we need.



    // sadly this will only work while deployed...



    let opts = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        text: allText,
        format: "png",
        width: 500,
        height: 500,
        removeStopwords: true,
        fontFamily: "sans-serif",
      }),
    };
    let resp = fetch(
      "https://quickchart.io/wordcloud/", opts);
    let respjs = resp.json();

    var newresp = JSON.parse(respjs);
    console.log(newresp);

    return (
      <div>
      </div>
    );



  }

  let post = grabPost(id);


  return (
    <Container>
      <Jumbotron>
        <br/>
        <h1 className="text-center">Dashboard </h1>
      </Jumbotron>
      <Row>
        <Col>
          <h3 className="text-center font-weight-bold">Campaign Title: {post.title} </h3>
          <h5 className="text-center font-weight-light">Offer: {post.offer} </h5>
          <h5 className="text-center font-weight-light">Coupon: {post.coupon} </h5>


        </Col>
      </Row>
      <Row>
        <Col className="text-center">
          <h5 className="text-center">Ad:</h5>
          <Image src={photo_path(post)} />
        </Col>
      </Row>
      <Row>
        <Col>
          <h4 className="text-center font-weight-bold">Average Customer Rating</h4>
          <AverageRating post={post}/>
        </Col>
      </Row>
      <Row>
        <Col>
          <h4 className="text-center font-weight-bold">Generated WordCloud</h4>
          <WordCloud post={post}/>

        </Col>
      </Row>


      <ToneAnalysis post={post}/>

      <ListResponses post={post}/>

    </Container>
  )


}


export default connect(
  ({posts, session}) => ({posts, session}))(ShowCampaign);
