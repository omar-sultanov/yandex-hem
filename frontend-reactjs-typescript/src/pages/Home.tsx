import React, { useEffect } from 'react';
import Device from '../components/Device';
import '../assets/scss/app.scss';
import { useLazyGetInfoUserQuery, useLazyGetAllUnitsQuery } from '../redux/deviceApi';
import { Unit } from '../types/Unit';
import Data from '../../../data.json'

const Home = () => {
  const unitsQuery = useLazyGetAllUnitsQuery();
  const usersQuery = useLazyGetInfoUserQuery();

  const [getAllUnits, { data: unitsData, isLoading: unitsLoading, isError: unitsError }] = unitsQuery;
  const [getInfoUser, { data: usersData, isLoading: usersLoading, isError: usersError }] = usersQuery;

  useEffect(() => {

    getAllUnits()
    getInfoUser()

  }, [])

  if (unitsLoading || usersLoading) {
    return <div>Loading...</div>;
  }

  if (unitsError || usersError) {
    return <div>Error occurred while fetching data</div>;
  }

  // const devices:any = data.devices;
  // const allDevices = [{...usersData?.devices}, {...unitsData}]
  // const getSimple =async()=>{
  //   const response  =await axios.get('http://localhost/yandex/units')
  //   console.log(response);

  // }
  // getSimple()

   
  return (
    <div className='Home'>
      {usersData?.devices && usersData.devices.map((item: Unit, i: number) => <Device key={i} {...item} />)}
      {/* {unitsData && unitsData.map((item: Unit, i: number) => <Device key={i} {...item} />)} */}

    </div>
  );
};

export default Home;

