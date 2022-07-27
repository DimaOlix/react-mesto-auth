import React from 'react';
import PopupWithForm from './PopupWithForm.js';

export default function PopupWithConfirmation({isOpen, onCardDelete, onClose}) {


  return (
    <PopupWithForm
    name="confirmation"
    isOpen={`${isOpen ? 'popup_opened' : ''}`}
    onSubmit={onCardDelete}
    onClose={onClose}
    buttonText='Да'
    title='Вы уверены?'
    >
    </PopupWithForm>
  )
}