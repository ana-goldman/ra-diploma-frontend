import headerlogo from "../images/header-logo.png";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { searchActions } from '../redux/searchSlice';

export default function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { visibility, search } = useSelector((store) => store.searchSlice);
  const { cart } = useSelector((store) => store.cartSlice);
  const totalItems = cart && cart.length >= 1 ? cart.length : null;

  const toggleSearch = (e) => {
    dispatch(searchActions.setVisibility(visibility === 'visible' ? 'hidden': 'visible'))
    submit(e);
  }

  const handleChange = (e) => {
    const { value } = e.target;
    dispatch(searchActions.changeSearchField(value));
  }

  const submit = (e) => {
    e.preventDefault();
    if (search !== '') navigate('/catalog.html');
  }

  return (
    <header className="container">
      <div className="row">
        <div className="col">
          <nav className="navbar navbar-expand-sm navbar-light bg-light">
            <NavLink className="navbar-brand" to="/">
              <img 
                src={headerlogo}
                alt="Bosa Noga"
              />
            </NavLink>
            <div className="collapase navbar-collapse" id="navbarMain">
              <ul className="navbar-nav mr-auto">
                <li className="nav-item">
                  <NavLink className="nav-link" to="/">Главная</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/catalog.html">Каталог</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/about.html">О магазине</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/contacts.html">Контакты</NavLink>
                </li>
              </ul>
              <div>
                <div className="header-controls-pics">
                  <div 
                    data-id="search-expander" 
                    className="header-controls-pic header-controls-search"
                    onClick={toggleSearch}
                  ></div>
                  <div className="header-controls-pic header-controls-cart" onClick={() => {navigate('/cart.html')}}>
                    <div className={totalItems >= 1 ? "header-controls-cart-full" : "header-controls-cart"}>{totalItems}</div>
                    <div className="header-controls-cart-menu"></div>
                  </div>
                </div>
                <form data-id="search-form" onSubmit={submit}
                      className={`header-controls-search-form form-inline ${visibility === 'hidden' && 'invisible'}`}>
                  <input 
                    className="form-control" 
                    placeholder="Поиск"
                    value={search}
                    onChange={handleChange}
                  />
                </form>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </header>
  )
}