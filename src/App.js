import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Header from './components/Header';
import Footer from './components/Footer';
import Banner from './components/Banner';
import About from './pages/About';
import Contacts from './pages/Contacts';
import NotFound from './pages/404';
import Home from './pages/Home';
import Catalog from './components/Catalog';
import Product from './components/Product';
import Cart from './components/Cart';

function App() {
  return (
    <Router basename={process.env.PUBLIC_URL}>
      <Header/>
      <main className="container">
        <div className="row">
          <div className="col">
            <Banner/>
            <Routes>
              <Route path='/' element={<Home/>}></Route>
              <Route path='/catalog.html' element={<Catalog/>}></Route>
              <Route path='/about.html' element={<About/>}></Route>
              <Route path='/contacts.html' element={<Contacts/>}></Route>
              <Route path='/catalog/:id.html' element={<Product/>}></Route>
              <Route path='/cart.html' element={<Cart/>}></Route>
              <Route path='*' element={<NotFound/>}></Route>
            </Routes>
          </div>
        </div>
      </main>
      <Footer/>
    </Router>
  );
}

export default App;
