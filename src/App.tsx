import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MedicalRecords from './pages/MedicalRecords';
import Navbar from './components/Navbar';

function App() {
  return (
    <Router>
      <Navbar />
      <div className='pt-16'>
        <Routes>
          <Route path='/records' element={<MedicalRecords />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
