import React from 'react';

import {
  useState,
  useEffect
} from 'react';


import {
  Modal,
  InputGroup,
  Form,
  Button
} from 'react-bootstrap';


function DialogLogin(props){

  const [email, setEmail] = useState(null);

  const [password, setPassword] = useState(null);


  const handleEmailChange = (e) => {
      setEmail(e.target.value);
  }

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
}

const handleLogin = () => {
  props.onLogin(email, password);

}

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
                         onChange={handleEmailChange}
                    />
                    <Form.Label>Password</Form.Label>
                    
                    <InputGroup>
                        <Form.Control
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
                    >Forgot password?</Button>{' '}
                    <Button
                        onClick={props.onRegister}
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
          <Button variant="primary" onClick={handleLogin}>

            Login
          </Button>
        </Modal.Footer>
      </Modal>
    );
}
export default DialogLogin;