import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import LoadingState from '../components/products/LoadingState';
import { getProductById } from '../services/productService';
import { formatCurrency } from '../utils/formatCurrency';
import './ProductDetailPage.css';

function ProductDetailPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    setLoading(true);

    getProductById(id).then((result) => {
      if (active) {
        setProduct(result);
        setLoading(false);
      }
    });

    return () => {
      active = false;
    };
  }, [id]);

  useEffect(() => {
    const previousTitle = document.title;

    if (loading) {
      document.title = 'Product | Darshana Opticals';
    } else if (product) {
      document.title = `${product.name} | Darshana Opticals`;
    } else {
      document.title = 'Product Not Found | Darshana Opticals';
    }

    return () => {
      document.title = previousTitle;
    };
  }, [loading, product]);

  if (loading) {
    return (
      <section className="product-detail">
        <LoadingState />
      </section>
    );
  }

  if (!product) {
    return (
      <section className="product-detail product-detail--missing">
        <p className="product-detail__eyebrow">Darshana Opticals</p>
        <h1>Product not found</h1>
        <p>The requested eyewear item is not available in this catalog.</p>
        <Link to="/products">Back to products</Link>
      </section>
    );
  }

  return (
    <article className="product-detail">
      <nav className="product-detail__breadcrumb" aria-label="Breadcrumb">
        <Link to="/">Home</Link>
        <span aria-hidden="true">/</span>
        <Link to="/products">Products</Link>
        <span aria-hidden="true">/</span>
        <span>{product.name}</span>
      </nav>

      <div className="product-detail__layout">
        <div className="product-detail__media">
          <img src={product.imageUrl} alt={product.imageAlt} />
        </div>

        <div className="product-detail__info">
          <p className="product-detail__eyebrow">{product.brand}</p>
          <h1>{product.name}</h1>
          <p className="product-detail__category">{product.category}</p>

          <div className="product-detail__price">
            <strong>{formatCurrency(product.price)}</strong>
            {product.originalPrice > product.price ? (
              <span>{formatCurrency(product.originalPrice)}</span>
            ) : null}
          </div>

          <dl className="product-detail__specs">
            <div>
              <dt>Frame type</dt>
              <dd>{product.frameType}</dd>
            </div>
            <div>
              <dt>Colour</dt>
              <dd>{product.color}</dd>
            </div>
            <div>
              <dt>Category</dt>
              <dd>{product.category}</dd>
            </div>
            <div>
              <dt>Brand</dt>
              <dd>{product.brand}</dd>
            </div>
          </dl>

          <Link className="product-detail__back" to="/products">
            Back to products
          </Link>
        </div>
      </div>

      <section className="product-detail__description-card">
        <h2>Description</h2>
        <p>{product.description}</p>
        <h3>What is included</h3>
        <ul>
          <li>Eyewear frame</li>
          <li>Protective carrying case</li>
          <li>Cleaning cloth</li>
        </ul>
      </section>
    </article>
  );
}

export default ProductDetailPage;
