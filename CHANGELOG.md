# Changelog

## Unreleased

### Added
- DDP-021: Integrated the product catalog with backend APIs for product listing, product details, search, category, brand, minimum price, and maximum price filtering.
- Added loading, empty-result, and friendly API error states.
- Added automated tests for catalog integration and filter behaviour.

### Changed
- Product cards and product details now handle the fields returned by the backend API safely.
- Catalog API requests now use the environment-based API base URL.

### Removed
- Removed the legacy static product dataset and unused static catalog images.
