import React from 'react';
import { Switch, Route, Redirect, useHistory } from 'react-router-dom';
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
import ProtectedRoute from './ProtectedRoute.js';
import Login from './Login.js';
import Register from './Register.js';
import InfoTooltip from './InfoTooltip.js';
import ApiAuth from '../utils/ApiAuth.js'


function App() {
  const [currentUser, setCurrentUser] = React.useState({name: '', about: ''});
  const [cards, setCards] = React.useState([]);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState(null);
  const [selectedCardDelete, setSelectedCardDelete] = React.useState(null);
  const [isConfirmationPopupOpen, setIsConfirmationPopupOpen] = React.useState(false);
  const [statusRegister, setStatusRegistr] = React.useState(null);
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [userInfo, setUserInfo] = React.useState({ '_id': '', 'email': '' });
  const history = useHistory();
  
  
  const [registerOn, setRegisterOn] = React.useState(false);
  const [registerError, setRegisterError] = React.useState(false);
  
  const isOpen = isEditAvatarPopupOpen 
  || isEditProfilePopupOpen 
  || isAddPlacePopupOpen 
  || registerOn 
  || registerError 
  || selectedCard;

  console.log(isOpen)

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






function tokenCheck() {
  const jwt =  localStorage.getItem('jwt');

  if(!jwt) {
    return
  }

  ApiAuth.getEmail(jwt)
  .then((res) => {    
      setUserInfo({
        '_id': res.data['_id'],
        'email': res.data['email']
      });

      setLoggedIn(true);
  })
}

React.useEffect(() => {
  setLoggedIn(false);

  tokenCheck()
}, [])

React.useEffect(() => {
  if(loggedIn) {
    history.push('/');
  }
}, [loggedIn])


function onLogin({ values }) {
  ApiAuth.autorise({ values })
  .then((res) => {
    console.log(res.token)
    setUserInfo({'email': values.login});
    localStorage.setItem('jwt', res.token);
    setLoggedIn(true);
  })
}
// localStorage.removeItem('jwt');


function onRegister({ values }) {
  return ApiAuth.registr({ values })
  .then((res) => {
    console.log(res);
    setRegisterOn(true);    
    history.push('/sign-in');
  })
  .catch(() => {
    setRegisterError(true);
    history.push('/sign-up');
  })
}


function handleViewTooltip() {
  if(registerOn) {
    setStatusRegistr(true);
  } else if(registerError) {
    setStatusRegistr(false);
  } else {
    setStatusRegistr(null)
  }
}

React.useEffect(() => {
  handleViewTooltip()
}, [registerOn, registerError])


function handleSignOut() {
  localStorage.removeItem('jwt');
}











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
    setRegisterOn(false);
    setRegisterError(false)
    setSelectedCard(null);
  }
console.log(userInfo)
  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className='page'>

        <ProtectedRoute
        loggedIn={loggedIn}  
        path='/'
        userInfo={userInfo}
        setLoggedIn={setLoggedIn}
        onSignOut={handleSignOut}
        component={Header}  />
        
        <Switch>

          <Route path='/sign-in'>
            <Login onLogin={onLogin} />
          </Route>

          <Route path='/sign-up'>
            <Register onRegister={onRegister} />
          </Route>

          <ProtectedRoute 
          loggedIn={loggedIn}  
          path='/' 
          component={Main}          
          cards={cards}
          onCardLike={handleCardLike}
          onCardClick={handleCardClick}
          onCardDeleteClick={handleCardDeleteClick}
          onEditAvatar={handleEditAvatarClick}
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onConfirmationDelete={handleConfirmationDelete} />

          <Route>
            { loggedIn ? <Redirect to='/' /> : <Redirect to='/sign-in' /> }
          </Route>

        </Switch>

        <InfoTooltip 
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
        name="ok"
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

        <ProtectedRoute
        loggedIn={loggedIn}  
        path='/' 
        component={Footer} 
        />

        <InfoTooltip 

        setStatusRegistr={setStatusRegistr}
        statusRegister={statusRegister}

        registerOn={registerOn} 
        registerError={registerError} 
        isOpen={ registerOn || registerError ? 'popup_opened' : '' } 
        onClose={closeAllPopups}
        />

      </div>
    </CurrentUserContext.Provider>
  )
}

export default App;
