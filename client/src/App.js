import React, {Component} from 'react';
import Navbar from "./components/Navbar"
import MyProfile from "./components/MyProfile";
import ViewProfile from "./components/ViewProfile";
import HomePage from "./components/Home";
import { Container } from 'reactstrap';
import Users from "./components/Users";
import {Provider} from 'react-redux';
import store from './store'
import { loadUser } from './actions/authActions'


import { BrowserRouter as Router, Route } from "react-router-dom";

import './App.css';

class App extends Component {

  componentDidMount() {
    store.dispatch(loadUser());
  }

  render () {
    return(
      <Router>
        <Route path="/" component={Root} />
        <Route path="/home" component={Home} />
        <Route path="/users" component={UserPage} />
        <Route path="/myprofile" component={MyProfilePage} />
        <Route path="/editprofile" component={EditProfilePage} />
      </Router>
    );
  }
}

const Root = () => (
  <Provider store={store}>
    <div className="App">
      <Navbar />
    </div>
  </Provider>
);

const Home = () => (
  <Provider store={store}>
    <div className="Home">
      <Container>
        <HomePage />
      </Container>
    </div>
  </Provider>
);

const UserPage = () => (
    <Provider store={store}>
      <div className="Users">
        <Users />
      </div>
    </Provider>
);

const MyProfilePage = () => (
  <Provider store={store}>
    <div className="MyProfile">
      <ViewProfile />
    </div>
  </Provider>
);

const EditProfilePage = () => (
  <Provider store={store}>
    <div className="EditMyProfile">
      <MyProfile />
    </div>
  </Provider>
);

export default App;
