import React from 'react';

import {
  Modal,
  InputGroup,
  Form,
  Button
} from 'react-bootstrap';


function DialogRegister(props){

    return(
      <Modal
      show={props.show}
      onHide={props.onClose}
      size="lg"
      >

        <Modal.Header closeButton>
        <Modal.Title>Create an Account with Murban</Modal.Title>
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
                    >Login</Button>
                    </Form.Group>

                </Form>
            </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={props.onClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={props.onClose}>
            Register
          </Button>
        </Modal.Footer>
      </Modal>
    );
}
export default DialogRegister;