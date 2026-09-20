import './LoadingState.css';

function LoadingState() {
  return (
    <div className="catalog-loading" role="status" aria-live="polite">
      <span className="catalog-loading__spinner" aria-hidden="true" />
      <span>Loading products...</span>
    </div>
  );
}

export default LoadingState;
