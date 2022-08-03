import React from "react";
import InfoTooltipOk from '../images/InfoTooltipOk.svg';
import InfoTooltipErr from '../images/InfoTooltipErr.svg';


function InfoTooltip({registerOn, registerError, isOpen, onClose, statusRegister, setStatusRegistr }) {

  const [viewTooltip, setViewTooltip] = React.useState(null);

  // function handleViewTooltip() {
  //   if(registerOn) {
  //     setViewTooltip(true);
  //   } else if(registerError) {
  //     setViewTooltip(false);
  //   } else {
  //     setViewTooltip(null)
  //   }
  // }

  // React.useEffect(() => {
  //   if(isOpen) {
  //     handleViewTooltip();
  //   }
  // }, [isOpen])

  return (
    <div className={`popup ${ isOpen }`}>


      <div className="popup__container">
      <button
      className={`popup__close`}
      type="button"
      aria-label="Закрыть"
      onClick={onClose}></button>
        <img className="popup__image" src={ statusRegister ? InfoTooltipOk : InfoTooltipErr } alt="Картинка"/>
        <p className="popup__text">{ statusRegister ? 
        'Вы успешно зарегистрировались!' : 
        'Что-то пошло не так! Попробуйте ещё раз.' }</p>         
      </div>
      
    </div>
  )
}

export default InfoTooltip;