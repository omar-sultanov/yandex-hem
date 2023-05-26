import { useControlScenariMutation, useGetOneDeviceQuery } from '@/redux';
import { faBackwardStep, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { round } from 'lodash';
import '../assets/scss/app.scss';

const AboutDevice = () => {
  const id = window.location.pathname.slice(1);
  const { data, isError, isLoading } = useGetOneDeviceQuery(id);
  if (isLoading) {
    return <h3>Loading ...</h3>;
  }

  if (isError || !data) {
    return <h3>Something went wrong</h3>;
  }

  return (
    <div className='About'>
      <h1>Об устройстве</h1>
      <div className='Info'>
        <div className='device_img'>
          <img src="https://yastatic.net/s3/doc-binary/freeze/xWZYcASKt9Ga9Ap5Ffy8wPyBLxo.png" alt="" />
        </div>
        <div className='info_device'>
          <ul>
            <li><b>Орнинальное название : </b><i>{data.name}</i></li>
            <li><b>Производитель : </b><i>Yandex Services AG</i></li>
            <li><b>Тип устройства : </b><i>"{data.type}"</i></li>
            <li><b>Идентификатор устройства : </b><i>"{data.id}"</i></li>
            <li><b>Сила тока : </b><i>"{round(data.properties[2].state.value, 2)} А"</i></li>
            <li><b>Напряжение : </b><i>"{round(data.properties[0].state.value, 2)} В"</i></li>
            <li><b>Электроэнергия : </b><i>"{round(data.properties[1].state.value, 2)} Вт"</i></li>
          </ul>
          <b><Link to={'/chart'}>Электроэнергия, используемая в течение дня (Построит график)</Link></b>
          <p>

            Яндекс Розетка, модель YNDX-0007. Сертификат соответствия: ЕАЭС RU С-CH.НА75.А.00014/19, серия RU № 0145813. ТР ТС 020/2011 «Электромагнитная совместимость технических средств», ТР ТС 004/2011 «О безопасности низковольтного оборудования».
          </p>
        </div>
      </div>
      <div className='about_btns'>
        <button id="scenari-button"><Link to={`/scenari/${id}`}><FontAwesomeIcon className='Icon' icon={faPlus} />Создать сценарий</Link></button>
        <button id="history-button"><Link to={'/'}><FontAwesomeIcon icon={faBackwardStep} /> Вернуться назад</Link></button>
      </div>

    </div>
  )
}

export default AboutDevice