import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faPhone, faHospital } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import '../style/form.css';

const Form = () => {
  const navigate = useNavigate();
  const [language, setLanguage] = useState('fr');
  const [formData, setFormData] = useState({
    nomcomplet: '',
    telephone: '',
    type: '',
  });

  

  const toggleLanguage = () => {
    setLanguage((prevLanguage) => (prevLanguage === 'fr' ? 'ar' : 'fr'));
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    fetch('http://localhost:3003/add-patient', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then(response => response.json())
      .then(data => {
        if (data.id) {
          navigate('/queue', {
            state: {
              numero: data.numero,
              language,
              peopleBefore: data.peopleBefore,
              nomcomplet: formData.nomcomplet,
              telephone: formData.telephone,
              type: formData.type,
            }
          });
        } else {
          alert(language === 'fr' ? 'Erreur lors de l\'ajout du patient' : 'حدث خطأ أثناء إضافة المريض');
        }
      })
      .catch((error) => {
        console.error('Error:', error);
        alert(language === 'fr' ? 'Erreur lors de l\'ajout du patient' : 'حدث خطأ أثناء إضافة المريض');
      });
  };

  return (
    <div className='form'>
    <div className="form-container">
      <h2>Bienvenue au Centre Arbouni</h2>
      <form className="user-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="nomcomplet" className="floating-label">Nom Complet</label>
          <input
            type="text"
            id="nomcomplet"
            name="nomcomplet"
            required
            value={formData.nomcomplet}
            onChange={handleChange}
          />
          <FontAwesomeIcon icon={faUser} className="input-icon" />
        </div>
        <div className="form-group">
          <label htmlFor="telephone" className="floating-label">Numero telephone</label>
          <input
            type="text"
            id="telephone"
            name="telephone"
            required
            value={formData.telephone}
            onChange={handleChange}
          />
          <FontAwesomeIcon icon={faPhone} className="input-icon" />
        </div>
        <div className="form-group">
          <label htmlFor="type" className="floating-label">Type Visite</label>
          <select id="type" name="type" value={formData.type} onChange={handleChange}>
          <option value=""></option>
            <option value="kinesitherapie">Kinésithérapie</option>
            <option value="physiotherapie">Physiothérapie</option>
            <option value="reeducation">Rééducation</option>
            <option value="osteopathie">Ostéopathie</option>
            <option value="rehabilitation_sportive">Réhabilitation Sportive</option>
            <option value="acupuncture">Acupuncture</option>
          </select>
          <FontAwesomeIcon icon={faHospital} className="input-icon" />
        </div>
        <button type="submit" className="submit-button">Valider</button>
        <p className="footer-text">@copyrights 2024 cabinet</p>
      </form>
      
    </div>
    </div>
  );
};

export default Form;
