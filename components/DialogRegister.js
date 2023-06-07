import React from 'react';

import {
  Modal,
  InputGroup,
  Form,
  Button
} from 'react-bootstrap';

import {
  useState,
  useEffect
} from 'react';



function DialogRegister(props){

  const [email, setEmail] = useState(null);

  const [password, setPassword] = useState(null);

    
  const handleEmailChange = (e) => {
      setEmail(e.target.value);
  }

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
}

const handleRegister = () => {
  props.onRegister(email, password);
}


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
                        onChange={handleEmailChange}
                    />

                  <Form.Label>Password</Form.Label>
                    <InputGroup>
                        <Form.Control
                            type="password"
                            onChange={handlePasswordChange}
                        />



                        <Button
                            variant="secondary"
                        >Show</Button>
                    </InputGroup>

                    <Form.Group className="mt-2">
                    <Button
                        variant="outline-primary"
                        size="sm"
                    >Already have an Account</Button>

                    </Form.Group>

                </Form>
            </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={props.onClose}>
            Cancel
          </Button>

          <Button variant="primary" onClick={handleRegister}>

            Create Account
          </Button>

        </Modal.Footer>
      </Modal>
    );
}
export default DialogRegister;