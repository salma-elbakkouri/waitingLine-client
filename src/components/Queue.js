// src/components/Queue.js
import React from 'react';
import { useLocation } from 'react-router-dom';
import doctorimg from '../assets/doctor-jpg.png';
import '../style/queue.css';

const Queue = () => {
  const location = useLocation();
  const { numero, language: initialLanguage } = location.state || {};
  const language = initialLanguage || 'fr';

  if (numero === undefined) {
    return <h2>{language === 'fr' ? 'Erreur: Numéro non trouvé' : 'خطأ: لم يتم العثور على الرقم'}</h2>;
  }

  return (
    <div className="queue-container">
      <div className='infos'>
        <h2>{language === 'fr' ? 'Votre Numéro dans la File' : 'رقمك في الصف هو'}</h2>
      <div className="queue-number">{numero}</div>
      <p className="sms-message">
        {language === 'fr' ? 'Vous recevrez un SMS lorsque ce sera votre tour !!' : 'سوف تتلقى رسالة نصية عند وصول دورك !!'}
      </p>
      </div>
      
      <img src={doctorimg} alt="Doctor" className="doctor-image" />
    </div>
  );
};

export default Queue;
