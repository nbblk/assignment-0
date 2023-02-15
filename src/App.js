import { BrowserRouter, Route, Routes } from 'react-router-dom';
import {Reading} from './pages/reading';
import {Writing} from './pages/writing';
import {Realtime} from './pages/realtime';
import {Deleting} from './pages/deleting';
import './App.css';

function App() {

  return (
    <div className="App">
      <h1>assignment</h1>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Reading />}></Route>
          <Route path="/read" element={<Reading />}></Route>
          <Route path="/write" element={<Writing />}></Route>
          <Route path="/delete" element={<Deleting />}></Route>
          <Route path="/realtime" element={<Realtime />}></Route>
        </Routes>
      
      </BrowserRouter>  </div>
 );
}

export default App;
