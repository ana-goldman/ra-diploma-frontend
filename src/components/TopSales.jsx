import { useEffect, Fragment } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { fetchItems } from "../redux/topSalesSlice";
import ProductPreview from './ProductPreview';
import Loader from './Loader';

export default function TopSales() {
  const dispatch = useDispatch();
  const url = `${process.env.REACT_APP_BASE_URL}top-sales`;

  useEffect(() => {
    dispatch(fetchItems(url));
  }, [dispatch, url]);

  const { items, status } = useSelector((store) => store.topSalesSlice);

  if (status === 'error') return (
    <Fragment>
      <section className="top-sales">
        <h2 className="text-center">Хиты продаж!</h2>
        <div style={{textAlign: 'center', margin: 30, fontSize: 40}}>Something went wrong...</div>
      </section>
    </Fragment>
  )

  return (
    <Fragment>
      {items && <section className="top-sales">
        <h2 className="text-center">Хиты продаж!</h2>
        {status === 'loading' && <Loader/>}
        <div className="row">{
          items.map(o => <ProductPreview key={o.id}>{o}</ProductPreview>)
        }</div>
      </section>}
    </Fragment>
  )
}