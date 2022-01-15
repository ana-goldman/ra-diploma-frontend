import { Fragment } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { fetchMoreItems} from "../redux/catalogSlice";
import Loader from "./Loader";

export default function DownloadBtn() {
  const dispatch = useDispatch();
  const { items, current, moreBtn, status } = useSelector((store) => store.catalogSlice);
  const { search } = useSelector((store) => store.searchSlice);
  let offset = items.length;

  const clickHandler = (e) => {
    e.preventDefault();
    let url;
    if (current && current.id !== 11 && search === '') { //установлена категория нет поиска
      url = `${process.env.REACT_APP_BASE_URL}items?categoryId=${current.id}&offset=${offset}`;
    } else if (current && current.id !== 11 && search !== '') { //установлена категория есть поиск
      url = `${process.env.REACT_APP_BASE_URL}items?categoryId=${current.id}&q=${search}&offset=${offset}`
    } else if (current && current.id === 11 && search !== '') { //нет категории есть поиск
      url = `${process.env.REACT_APP_BASE_URL}items?q=${search}&offset=${offset}`
    } else { //нет категории нет поиска
      url = `${process.env.REACT_APP_BASE_URL}items?&offset=${offset}`
    }
    
    dispatch(fetchMoreItems(url));
    offset = offset + 6;
  }

  return (
    <Fragment>
      {status === 'loadingMore' && <Loader/>}
      <div className="text-center">
        <button className={`btn btn-outline-primary ${moreBtn === false && 'invisible'}`} 
                onClick={clickHandler} 
                disabled={status === 'loadingMore'}
        >Загрузить ещё</button>
      </div>
    </Fragment>
  )
}