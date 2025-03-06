import { useEffect } from 'react';
import './App.css';
import Header from './Components/ProjectDashboard/Header';
import ContentTable from './Components/ProjectDashboard/Table';
import {  useData, ctx } from './utils/Configuration';
import TableCardContainer from './Components/TaskDashboard/TableCardContainer';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  const { data, setData, cardData, setCardData } = useData();

  useEffect(() => {
    if (!localStorage.getItem('data') || !localStorage.getItem('cardData')) {
      localStorage.setItem('data', JSON.stringify(data));
      localStorage.setItem('cardData', JSON.stringify(cardData));
    } else {
      const storedData = localStorage.getItem('data');
      const storedCardData = localStorage.getItem('cardData');

      if (storedData) setData(JSON.parse(storedData));
      if (storedCardData) setCardData(JSON.parse(storedCardData));
    }
  }, []);

  return (
    <>
      <BrowserRouter>
        <ctx.Provider value={{ data, setData, cardData, setCardData }}>
          <Routes>
            <Route path="/" element={<><Header /><ContentTable /></>} />
            <Route path="/board/:id" element={<><Header /><TableCardContainer /></>} />
          </Routes>
        </ctx.Provider>        
      </BrowserRouter>
    </>
  );
}

export default App;

