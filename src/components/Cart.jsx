/* eslint-disable jsx-a11y/scope */
import { useEffect, Fragment } from 'react';
import { useSelector, useDispatch } from "react-redux";
import shortid from 'shortid';
import { cartActions, postOrder } from '../redux/cartSlice';
import Loader from './Loader';

export default function Cart() {
  const dispatch = useDispatch();
  const { cart, status } = useSelector((store) => store.cartSlice);
  let number = 1;

  useEffect(() => {
    dispatch(cartActions.resetStatus());
  }, [dispatch]);

  const subitHandler = (e) => {
    e.preventDefault();
    const { phone, address } = e.target.elements;
    const body = {
      owner: {
        phone: phone.value,
        address: address.value,
      },
      items: cart.length >= 1 && cart.map(({ id, price, count }) => ({ id, price, count })),
    };
    dispatch(postOrder(body));
    phone.value = '';
    address.value = '';
  }

  return (
    <Fragment>
      <section className="cart">
        <h2 className="text-center">Корзина</h2>
        <table className="table table-bordered">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Название</th>
              <th scope="col">Размер</th>
              <th scope="col">Кол-во</th>
              <th scope="col">Стоимость</th>
              <th scope="col">Итого</th>
              <th scope="col">Действия</th>
            </tr>
          </thead>
          <tbody>
            {cart.map(o => {
              return (<tr key={shortid.generate()}>
                <td scope="row">{number++}</td>
                <td><a href={`/catalog/${o.id}.html`}>{o.title}</a></td>
                <td>{o.pickedSize}</td>
                <td>{o.count}</td>
                <td>{o.price}</td>
                <td>{o.count * o.price}</td>
                <td><button className="btn btn-outline-danger btn-sm" onClick={() => dispatch(cartActions.deleteItem(o.id))}>Удалить</button></td>
              </tr>)
            })}
            <tr>
              <td colSpan="5" className="text-right">Общая стоимость</td>
              <td>{cart.reduce((a, b) => (a + b.price * b.count), 0)}</td>
            </tr>
          </tbody>
        </table>
      </section>
      {status === 'loading' && <Loader/>}
      {status === 'success' && <section className="order"><h2 className="text-center">Поздравляем с заказом! Все прошло успешно {':)'}</h2></section>}
      {status === 'error' && <section className="order"><h2 className="text-center">Что-то пошло не так...Попробуете снова?</h2></section>}
      <section className="order">
        <h2 className="text-center">Оформить заказ</h2>
        <div className="card" style={{maxWidth: '30rem', margin: '0 auto'}}>
          <form className="card-body" onSubmit={subitHandler}>
            <div className="form-group">
              <label htmlFor="phone">Телефон</label>
              <input className="form-control" id="phone" placeholder="Ваш телефон" required/>
            </div>
            <div className="form-group">
              <label htmlFor="address">Адрес доставки</label>
              <input className="form-control" id="address" placeholder="Адрес доставки" required/>
            </div>
            <div className="form-group form-check">
              <input type="checkbox" className="form-check-input" id="agreement" required/>
              <label className="form-check-label" htmlFor="agreement">Согласен с правилами доставки</label>
            </div>
            <button type="submit" className="btn btn-outline-secondary">Оформить</button>
          </form>
        </div>
      </section>
    </Fragment>
  )
}