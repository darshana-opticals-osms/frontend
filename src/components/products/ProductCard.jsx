import { Link } from 'react-router-dom';
import { formatCurrency } from '../../utils/formatCurrency';
import './ProductCard.css';

function ProductCard({ product }) {
  return (
    <article className="product-card">
      <Link
        className="product-card__image-link"
        to={`/products/${product.id}`}
        aria-label={`View ${product.name}`}
      >
        <img
          className="product-card__image"
          src={product.imageUrl}
          alt={product.imageAlt}
        />
      </Link>

      <div className="product-card__body">
        <p className="product-card__brand">{product.brand}</p>
        <h2 className="product-card__name">
          <Link to={`/products/${product.id}`}>{product.name}</Link>
        </h2>
        <p className="product-card__meta">
          {product.category} Â· {product.frameType}
        </p>
        <div className="product-card__price-row">
          <strong>{formatCurrency(product.price)}</strong>
          {product.originalPrice > product.price ? (
            <span>{formatCurrency(product.originalPrice)}</span>
          ) : null}
        </div>
        <Link className="product-card__details" to={`/products/${product.id}`}>
          View details
        </Link>
      </div>
    </article>
  );
}

export default ProductCard;
