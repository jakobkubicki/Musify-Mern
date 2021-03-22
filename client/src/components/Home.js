import React from 'react';
import { Jumbotron, Button } from 'reactstrap';
import RegisterModal from './auth/RegisterModal';

const Home = (props) => {
  return (
    <div>

        <h1 className="display-3">Hello! Welcome to Musify</h1>
        <p className="lead">This is the homepage.</p>
        <hr className="my-2" />
        <p>© Jakob Kubicki 2021</p>

    </div>
  );
};

export default Home;