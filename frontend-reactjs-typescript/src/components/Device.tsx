import { useControlDeviceMutation, useGetOneDeviceQuery, useLazyGetOneDeviceQuery } from '@/redux';
import { Unit, Property } from '@/types/Unit';
import { faCircleInfo } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { round } from 'lodash';
import '../assets/scss/app.scss';
import { PowerInfo } from '@/types/PowerInfo';
import { useDispatch, useSelector } from 'react-redux';
import { selectInfoData, setActionStatus, setInfoPower } from '@/redux/slices/infoSlice';

const Device = (device: Unit) => {
  const [controlDevice, { isError, error, isSuccess }] = useControlDeviceMutation()
  const [getOneDevice,{ data }] = useLazyGetOneDeviceQuery();

  const [countUsePower, setCountUsePower] = useState<PowerInfo[]>([])
  const dispatch = useDispatch();
  const { statusAction } = useSelector(selectInfoData);
  const onChangeInfo = (data: PowerInfo[]) => dispatch(setInfoPower(data));
  const onChangeActionStatus = (status:boolean) => dispatch(setActionStatus(status));

  useEffect(()=>{
    getOneDevice(device.id)
  },[])
  if (isError) {
    console.log(isError);
  }
  if (device['img'] == undefined) {
    device = { ...device, img: "https://yastatic.net/s3/doc-binary/freeze/xWZYcASKt9Ga9Ap5Ffy8wPyBLxo.png" }
  }

  const onClickConnect = async () => {
    onChangeActionStatus(!statusAction)
    setCountUsePower([...countUsePower, {
      time: new Date().toLocaleString('ru-Ru'),
      power: data?.properties[1].state.value
    }])
    onChangeInfo(countUsePower)

    const response = await controlDevice({
      devices: [
        {
          id: device.id,
          actions: [
            {
              type: "devices.capabilities.on_off",
              state: {
                instance: "on",
                value: statusAction
              }
            }
          ]
        }
      ]
    }).unwrap()
    return response
  }
  return (
    <div className="Item">
      <img
        src={device.img}
        alt=""
      />
      <div className="Item_paramters">
        <h3>{device.name}</h3>
        <div className='Item_body'>
          <ul>
            {data?.properties.map((Property: Property, i: number) =>
              <li key={i}><b>{round(Property.state.value, 2)}</b><span>{Property.state.instance}</span></li>
            )}
          </ul>
        </div>
        <div className='btn_group'>
          <button className={statusAction ?  'Toggle_btn_click':'Toggle_btn'} onClick={onClickConnect}>{statusAction ? 'Вкл' : 'Выкл'}</button>
          <Link to={`/${device.id}`}><FontAwesomeIcon className='AboutIcon' icon={faCircleInfo} /></Link>
        </div>
      </div>
    </div>
  );
};
export default Device;