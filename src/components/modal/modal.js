import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody } from 'reactstrap';
import {FormComponent} from './../form/form';
export const ModalWindow = (props) => {
  const {
    // id?'',
    isModalToggle,
    toggleModals,
    title,
    actionMethod,
    shop,
    toggleAction 
  } = props;

    return (
      <Modal size="xl" isOpen={isModalToggle} toggle={toggleModals} fade={false} backdropClassName='o-lay-backdrop'>
        <ModalHeader toggle={toggleModals}>{title}</ModalHeader>
        <ModalBody>
          <FormComponent id="dd" toggle={toggleModals} actionMethod={actionMethod} toggleAction={toggleAction} shop={shop} />
        </ModalBody>
      </Modal>
  );
}
