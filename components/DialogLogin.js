import React from 'react';

import {
  Modal,
  InputGroup,
  Form,
  Button
} from 'react-bootstrap';


function DialogLogin(props){

    return(
      <Modal
      show={props.show} 
      onHide={props.onClose}
      size="lg"
      >

        <Modal.Header closeButton>
        <Modal.Title>Login to Murban</Modal.Title>
        </Modal.Header>

        <Modal.Body>
                <Form>
                    <Form.Label>Email</Form.Label>
                    <Form.Control 
                    />
                    <Form.Label>Password</Form.Label>
                    <InputGroup>
                        <Form.Control
                        />
                        <Button
                            variant="secondary"
                        >Show</Button>
                    </InputGroup>
                  
                    <Form.Group className="mt-2">
                    <Button
                        variant="outline-primary"
                        size="sm"
                    >Forgot password?</Button>{' '}
                    <Button 
                        variant="outline-primary"
                        size="sm"
                    >Create new account</Button>
                    </Form.Group>

                </Form> 
            </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={props.onClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={props.onClose}>
            Login
          </Button>
        </Modal.Footer>
      </Modal>
    );
}
export default DialogLogin;