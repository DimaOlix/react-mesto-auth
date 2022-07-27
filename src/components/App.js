import React from 'react';
import Header from './Header.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js'
import Main from './Main.js';
import ImagePopup from './ImagePopup';
import Footer from './Footer.js';
import Api from '../utils/Api.js'
import EditProfilePopup from './EditProfilePopup.js';
import EditAvatarPopup from './EditAvatarPopup.js';
import AddPlacePopup from './AddPlacePopup.js';
import PopupWithConfirmation from './PopupWithConfirmation.js';


function App() {
  const [currentUser, setCurrentUser] = React.useState({name: '', about: ''});
  const [cards, setCards] = React.useState([]);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState(null);
  const [selectedCardDelete, setSelectedCardDelete] = React.useState(null);
  const [isConfirmationPopupOpen, setIsConfirmationPopupOpen] = React.useState(false);
  const isOpen = isEditAvatarPopupOpen || isEditProfilePopupOpen || isAddPlacePopupOpen || selectedCard

  React.useEffect(() => {
    Api.getUserInfo()
    .then((res) => {
      setCurrentUser(res);
    })
    .catch((err) => console.log(err))
  }, [])

  React.useEffect(() => {
    Api.getCardsInfo()
    .then((res) => {
      setCards(res);
    })
    .catch((err) => console.log(err))

  }, [])

  React.useEffect(() => {
    function closeByEscape(evt) {
      if(evt.key === 'Escape') {
        closeAllPopups();
      }
    }
    if(isOpen) {
      document.addEventListener('keydown', closeByEscape);
      return () => {
        document.removeEventListener('keydown', closeByEscape);
      }
    }
  }, [isOpen]) 

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    Api.changeLikeCardStatus(card._id, isLiked)
    .then((newCard) => {
      setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
    })
    .catch((err) => console.log(err))
  }

  function deleteCard() {
    Api.deleteCard(selectedCardDelete._id)
    .then(() => {
      setCards((state) => {
        return state.filter((c) => {
          return c._id !== selectedCardDelete._id;
        })
      });
    })
    .catch((err) => console.log(err))
  }

  function handleAddPlaceSubmit({title, link}) {
    Api.addCard(title, link)
    .then((newCard) => {
      setCards([newCard, ...cards]);
      closeAllPopups()
    })
    .catch((err) => console.log(err));
  }

  function handleUpdateUser({name, about}) {
    Api.editUserInfo(name, about)
    .then((res) => {
      setCurrentUser(res);
      closeAllPopups();
    })
    .catch((err) => console.log(err))
  }

  function handleUpdateAvatar({avatar}) {
    Api.editAvatar(avatar)
    .then((res) => {
      setCurrentUser(res);
      closeAllPopups();
    })
    .catch((err) => console.log(err))
  }

  function handleCardClick (card) {
    setSelectedCard(card);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }          
  
  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleConfirmationDelete() {
    setIsConfirmationPopupOpen(true);
  }
  
  function handleCardDeleteClick(card) {
    setSelectedCardDelete(card);
  }

  function handleDeleteCard(e) {
    e.preventDefault();
    deleteCard();
    closeAllPopups();
    setSelectedCardDelete(null);
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsConfirmationPopupOpen(false);
    setSelectedCard(null);
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className='page'>
        <Header/>
        <Main
          cards={cards}
          onCardLike={handleCardLike}
          onCardClick={handleCardClick}

          onCardDeleteClick={handleCardDeleteClick}

          onEditAvatar={handleEditAvatarClick}
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onConfirmationDelete={handleConfirmationDelete}
        />
        <ImagePopup
          card={selectedCard}
          onClose={closeAllPopups}
        />

        <EditProfilePopup 
          isOpen={isEditProfilePopupOpen} 
          onClose={closeAllPopups} 
          onUpdateUser={handleUpdateUser}
        />
      
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen} 
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
        />

        <EditAvatarPopup 
          isOpen={isEditAvatarPopupOpen} 
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />

        <PopupWithConfirmation
        isOpen={isConfirmationPopupOpen}
        onClose={closeAllPopups}
        onCardDelete={handleDeleteCard}
        >
        </PopupWithConfirmation>

        <Footer/>
      </div>
    </CurrentUserContext.Provider>
  )
}

export default App;
