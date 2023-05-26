import React from 'react';
import './App.css';
import JSONPretty from 'react-json-pretty';
import 'react-json-pretty/themes/monikai.css';
import Home from './pages/Home'
import Chart from './pages/Chart';
import Header from './components/Header';
import AboutDevice from './pages/About'
import { Route, Routes } from 'react-router-dom';
import AddScenari from './pages/Scenari';

function App() {
  const [result, setResult] = React.useState<string>('Loading...');
  
  // useEffect(() => {
  // getData().then((data) => {
  //   console.log('===== FETCHED DATA =====');
  //   console.log(data);
  //   setResult(JSON.stringify(data, null, 2));
  // });
  // }, []);

  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:id" element={<AboutDevice />} />
        <Route path="/chart" element={<Chart />} />
        <Route path="/scenari/:id" element={<AddScenari/>} />
      </Routes>

    </div>
  );
}

export default App;
