import Header from './components/Header'
import NotesListPage from './pages/NotesListPage'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import NotePage from "./pages/NotePage"
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <div className="container dark">
        <div className="app">
        <Header/>
        <Routes> 
          <Route path="/" exact element={<NotesListPage/>}/>
          <Route path='note/:id' exact element={<NotePage/>}/>
        </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
