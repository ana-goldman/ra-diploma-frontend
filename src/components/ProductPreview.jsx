export default function ProductPreview(props) {
  const {
    id,
    title,
    price,
    images
  } = props.children;
  
  return (
    <div className="col-4">
      <div className="card catalog-item-card">
        <img src={images[0]}
             className="card-img-top img-fluid" alt={title}/>
          <div className="card-body">
            <p className="card-text">{title}</p>
            <p className="card-text">{price}</p>
            <a href={`${process.env.PUBLIC_URL}/catalog/${id}.html`} className="btn btn-outline-primary">Заказать</a>
          </div>
      </div>
    </div>
  )
}