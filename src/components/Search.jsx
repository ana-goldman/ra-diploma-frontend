import { Fragment } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { searchActions } from '../redux/searchSlice';
import { fetchItems } from '../redux/catalogSlice';

export default function Search() {
  const dispatch = useDispatch();
  const { visibility, search } = useSelector((store) => store.searchSlice);
  const { current } = useSelector((store) => store.catalogSlice);
  let url;

  if (current && current.id === 11) {
    url = `${process.env.REACT_APP_BASE_URL}items?q=${search}`
  } else {
    url = `${process.env.REACT_APP_BASE_URL}items?q=${search}&categoryId=${current.id}`;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (search !== '') {
      dispatch(fetchItems(url));
    }
  }
  
  const handleChange = (e) => {
    const { value } = e.target;
    console.log(value)
    dispatch(searchActions.changeSearchField(value));
  }

  return (
    <Fragment>
      {visibility === 'visible' && 
        <form className="catalog-search-form form-inline" onSubmit={handleSubmit}>
          <input 
            className="form-control" 
            placeholder="Поиск" 
            value={search}
            onChange={handleChange} 
          />
        </form>
      }
    </Fragment>
  )
}