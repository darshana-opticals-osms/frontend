import './EmptyState.css';

function EmptyState({ onClear }) {
  return (
    <section className="catalog-empty" aria-live="polite">
      <h2>No products found</h2>
      <p>Try a different search or clear the selected filters.</p>
      <button type="button" onClick={onClear}>
        Clear filters
      </button>
    </section>
  );
}

export default EmptyState;
