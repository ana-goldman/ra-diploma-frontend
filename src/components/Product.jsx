import { useEffect, Fragment } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { fetchItem, productActions } from '../redux/productSlice';
import { cartActions } from '../redux/cartSlice';
import Loader from './Loader';

export default function Product() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let { id } = useParams();
  const { product, pickedSize, count, status } = useSelector((store) => store.productSlice);
  const { cart } = useSelector((store) => store.cartSlice);

  const {
    title,
    images,
    sku,
    manufacturer,
    color,
    material,
    season,
    reason,
    sizes,
    price,
  } = product;

  const url = `${process.env.REACT_APP_BASE_URL}items/${id}`;

  useEffect(() => {
    dispatch(fetchItem(url));
  }, [dispatch, url]);

  const clickHandler = () => {
    const itemInCart = cart.find( o => o.title === title && o.pickedSize === pickedSize);
    itemInCart ? dispatch(cartActions.addMore({ id: Number(id), title, pickedSize, count, price })) : dispatch(cartActions.setCart({ id: Number(id), title, pickedSize, count, price }));
    navigate('/cart.html');
  }

  if (status === 'error') return <div style={{textAlign: 'center', margin: 30, fontSize: 40}}>Something went wrong...</div>

  return (
    <Fragment>
      {status === 'loading' && <Loader/>}
      {status === 'success' && product && <section className="catalog-item">
        <h2 className="text-center">{title}</h2>
        <div className="row">
          <div className="col-5">
            <img src={images && images[0]}
              className="img-fluid" alt={title}/>
          </div>
          <div className="col-7">
            <table className="table table-bordered">
              <tbody>
                <tr>
                  <td>Артикул</td>
                  <td>{sku}</td>
                </tr>
                <tr>
                  <td>Производитель</td>
                  <td>{manufacturer}</td>
                </tr>
                <tr>
                  <td>Цвет</td>
                  <td>{color}</td>
                </tr>
                <tr>
                  <td>Материалы</td>
                  <td>{material}</td>
                </tr>
                <tr>
                  <td>Сезон</td>
                  <td>{season}</td>
                </tr>
                <tr>
                  <td>Повод</td>
                  <td>{reason}</td>
                </tr>
              </tbody>
            </table>
            <div className="text-center">
              <p>Размеры в наличии: 
                {sizes && sizes.map(({ size, avalible}) => {
                  return (
                    avalible && (
                      <span key={size} 
                            className={`catalog-item-size ${pickedSize === size && 'selected'}`} 
                            onClick={() => dispatch(productActions.setPickedSize(size))}>{size}
                      </span>
                    )
                  );
                })}
              </p>
              <p>Количество: <span className="btn-group btn-group-sm pl-2">
                <button className="btn btn-secondary"  onClick={() => dispatch(productActions.setCount(count - 1 >= 1 ? count - 1 : 1))}>-</button>
                <span className="btn btn-outline-primary">{count}</span>
                <button className="btn btn-secondary" onClick={() => dispatch(productActions.setCount(count + 1 <= 10 ? count + 1 : 10))}>+</button>
              </span>
              </p>
            </div>
            <button className="btn btn-danger btn-block btn-lg" 
                    onClick={clickHandler}
                    disabled={!pickedSize}
            >В корзину</button>
          </div>
        </div>
      </section>
      }
    </Fragment>
  )
}