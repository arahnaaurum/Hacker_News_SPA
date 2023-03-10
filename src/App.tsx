import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import News from './pages/news/News';
import Main from './pages/main/Main';
import './styles/App.css';
import Layout from './components/Layout';

function App(): JSX.Element {
  return (
    <BrowserRouter>
      <div className="App">
          <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Main />} />
            <Route path='/news/:id' element={<News />} />
          </Route>
          </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
