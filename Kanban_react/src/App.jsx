import { createContext, useState, useEffect } from 'react';
import './App.css';
import Header from './Components/ProjectDashboard/Header';
import ContentTable from './Components/ProjectDashboard/Table';
import { ctx,useData } from './utils/Configuration.jsx';
import TableCardContainer from './Components/TaskDashboard/TableCardContainer.jsx';
import { BrowserRouter, Routes, Route } from 'react-router-dom';




function App() {

  const{data,setData,cardData, setCardData}=useData();  
  useEffect(() => {
    console.log(localStorage.length)

    if (localStorage.length === 0) {
      localStorage.setItem('data', JSON.stringify(data));
      localStorage.setItem('cardData', JSON.stringify(cardData));
      
    }
    else {
      setData(JSON.parse(localStorage.getItem('data')));
      setCardData(JSON.parse(localStorage.getItem('cardData')));
    }
  }, []);

  return (
    <>
      <BrowserRouter>

        <ctx.Provider value={{ data, setData, cardData, setCardData }}>
          <Routes>
            <Route path="/" element={<><Header /><ContentTable /></>} />
            <Route path="/board/:id" element={<><Header/><TableCardContainer /></>} />
      </Routes>

        </ctx.Provider>
      </BrowserRouter>
      {/* <DragDropCards/> */}
    </>
  )
}
export default App
export { ctx };
