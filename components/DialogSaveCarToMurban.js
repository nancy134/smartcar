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


function DialogSaveCarToMurban(props){

    return(
      <Modal
      show={props.show}
      onHide={props.onClose}
      size="lg"
      >

        <Modal.Header closeButton>
            <Modal.Title>Save Car to Murban</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <div>Save cars to Murban</div>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={props.onClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={props.OnSave}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    );
}
export default DialogSaveCarToMurban;