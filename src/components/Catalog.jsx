import { useEffect, Fragment } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { fetchItems} from "../redux/catalogSlice";
import ProductPreview from './ProductPreview';
import CatalogNav from './CatalogNav';
import Search from './Search';
import Loader from './Loader';
import DownloadBtn from './DownloadBtn';

export default function Catalog() {
  const dispatch = useDispatch();
  const { items, current, status } = useSelector((store) => store.catalogSlice);
  const { search } = useSelector((store) => store.searchSlice);

  let url;
  if (current && current.id !== 11 && search === '') { //установлена категория нет поиска
    url = `${process.env.REACT_APP_BASE_URL}items?categoryId=${current.id}`;
  } else if (current && current.id !== 11 && search !== '') { //установлена категория есть поиск
    url = `${process.env.REACT_APP_BASE_URL}items?categoryId=${current.id}&q=${search}`
  } else if (current && current.id === 11 && search !== '') { //нет категории есть поиск
    url = `${process.env.REACT_APP_BASE_URL}items?q=${search}`
  } else { //нет категории нет поиска
    url = `${process.env.REACT_APP_BASE_URL}items`
  }

  useEffect(() => {
    dispatch(fetchItems(url));
  }, [dispatch, url]);

  if (status === 'error') return (
    <Fragment>
      <section className="catalog">
      <h2 className="text-center">Каталог</h2>
        <div style={{textAlign: 'center', margin: 30, fontSize: 40}}>Something went wrong...</div>
      </section>
    </Fragment>
  )

  return (
    <section className="catalog">
      <h2 className="text-center">Каталог</h2>
      {status === 'loading' && <Loader/>}
      <Search />
      <CatalogNav />
      {items && <div className="row">
        {items.map(o => <ProductPreview key={o.id}>{o}</ProductPreview>)}</div>
      }
      <DownloadBtn/>
    </section>
  )
}