import { Container } from 'react-bootstrap';
import { Switch, Route } from 'react-router-dom';

import './App.scss';
import Nav from './Nav';
//import UsersList from './Users/List';
import UsersNew from './Users/New';
import PostsNew from './Posts/New';
import Feed from './Feed';
//import Home from './Home';
import Login from './Login';
//import Campaigns from './Campaigns';
//import ShowCampaign from './ShowCampaign';
import Show from './Posts/Show'


// Some of this code attributed to Nat Tuck's lecture code provided for the photo-blog-spa app

function App() {
  return (
    <Container>
      <Nav />
      <Switch>
        <Route path="/" exact>
          <Feed />
        </Route>
        <Route path="/posts/new" exact>
          <PostsNew />
        </Route>
        <Route path="/posts/:id">
          <Show />
        </Route>
        <Route path="/users/new" exact>
          <UsersNew />
        </Route>
        <Route path="/login" exact>
          <Login />
        </Route>

      </Switch>
    </Container>
  );
}

export default App;
