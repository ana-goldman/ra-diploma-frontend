import { useEffect, Fragment } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { catalogActions, fetchCategories } from "../redux/catalogSlice";

export default function CatalogNav() {
  const dispatch = useDispatch();
  const { categories, current } = useSelector((store) => store.catalogSlice);
  const url = `${process.env.REACT_APP_BASE_URL}categories`;

  useEffect(() => {
    dispatch(fetchCategories(url));
  }, [dispatch, url]);

  const clickHandler = (e) => {
    e.preventDefault();
    const categoryId = Number(e.target.id);
    dispatch(catalogActions.setCurrent(categoryId));
  }

  return (
    <Fragment>
      {categories && <ul className="catalog-categories nav justify-content-center">
        {categories.map(o => 
        <li className="nav-item" key={o.id} onClick={clickHandler}>
          <a className={`nav-link ${o.id === current.id && 'active'}`} id={o.id} href="/">{o.title}</a>
        </li>)
        }
      </ul>}
    </Fragment>
  )
}