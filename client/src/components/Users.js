import React from 'react';
import {
  Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button, Modal, ModalHeader
} from 'reactstrap';
import './Users.css';

class Users extends React.Component{

    state = {
        modal: false,
        loading: true,
        person: []
    }

    toggle = () => {
        //Clear error
        this.setState({
            modal: !this.state.modal
        });
    };

        async componentDidMount() {
            const url = "/getData";
            const response = await fetch(url);
            const data = await response.json();
            this.setState({ person: data, loading: false});
        };


    render() {
        return (
            <div>
                <div className="user-div">
                    {this.state.loading || !this.state.person ? (
                        <div>Loading Users...</div>
                    ) : (
                        <div className="home">
                            <h1>Musify Users</h1>
                            {this.state.person.map((users, index) => {
                                return (
                                    <div>
                                    

                                    <Card>
                                        <CardImg top width="100%" src="https://www.seekpng.com/png/full/847-8474751_download-empty-profile.png" alt="Card image cap" />
                                        <CardBody>
                                        <CardTitle tag="h5">{users.fname}</CardTitle>
                                        <CardSubtitle tag="h6" className="mb-2 text-muted">{users.email}</CardSubtitle>
                                        <CardText>{users.country}</CardText>
                                        <CardText>{users.skills}</CardText>
                                        <Button onClick={this.toggle}>View Profile</Button>
                                        </CardBody>
                                    </Card>
                                    
                                    <Modal isOpen={this.state.modal} toggle={this.toggle}>
                                        <ModalHeader toggle={this.toggle}>{users.fname}</ModalHeader>
                                        <Card>
                                        <CardImg top width="100%" src="https://www.seekpng.com/png/full/847-8474751_download-empty-profile.png" alt="Card image cap" />
                                        <CardBody>
                                        <CardTitle tag="h5">{users.fname}</CardTitle>
                                        <CardSubtitle tag="h6" className="mb-2 text-muted">{users.email}</CardSubtitle>
                                        <CardText>{users.country}</CardText>
                                        <CardText>{users.skills}</CardText>
                                        <Button onClick={this.toggle}>View Profile</Button>
                                        </CardBody>
                                    </Card>
                                    </Modal>
                                    
                                    </div>
                                    )
                            })}
                        </div>
                    )}
                </div>
            </div>
            
        );
    }
}

export default Users