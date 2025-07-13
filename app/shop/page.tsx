'use client'
import { useState, useEffect, useMemo } from 'react';
import CheckoutHeader from "../components/CheckoutHeader";
import Product from "../components/Product";
import shoesJson from '../data/shoes.json'
import styles from '../styles/Shop.module.css'

export default function CollectionPage() {
  const [filters, setFilters] = useState<{
    brands: string[];
    priceRange: number;
    colors: string[];
  }>({
    brands: [],
    priceRange: 500,
    colors: []
  });

  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 12;

  // Get unique brands and colors from the data
  const uniqueBrands = useMemo(() => {
    const brands = [...new Set(shoesJson.products.map(shoe => shoe.brandName))];
    return brands.filter(Boolean).sort();
  }, []);

  const uniqueColors = useMemo(() => {
    const colors = [...new Set(shoesJson.products.map(shoe => shoe.colour))];
    return colors.filter(Boolean).sort();
  }, []);

  // Filter products based on current filters
  const filteredProducts = useMemo(() => {
    return shoesJson.products.filter(shoe => {
      const matchesBrand = filters.brands.length === 0 || filters.brands.includes(shoe.brandName);
      const matchesPrice = shoe.price.current.value <= filters.priceRange;
      const matchesColor = filters.colors.length === 0 || filters.colors.includes(shoe.colour);
      
      return matchesBrand && matchesPrice && matchesColor;
    });
  }, [filters]);

  // Calculate pagination
  const totalProducts = filteredProducts.length;
  const totalPages = Math.ceil(totalProducts / productsPerPage);
  const startIndex = (currentPage - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;
  const currentProducts = filteredProducts.slice(startIndex, endIndex);

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [filters]);

  // Handle checkbox filter changes
  interface Filters {
    brands: string[];
    priceRange: number;
    colors: string[];
  }

  type FilterType = 'brands' | 'colors';

  const handleCheckboxChange = (filterType: FilterType, value: string) => {
    setFilters((prev: Filters) => ({
      ...prev,
      [filterType]: prev[filterType].includes(value)
        ? prev[filterType].filter((item: string) => item !== value)
        : [...prev[filterType], value]
    }));
  };

  // Handle price range change
  interface PriceChangeEvent {
    target: {
      value: string;
    };
  }

  const handlePriceChange = (value: number) => {
    setFilters((prev: Filters) => ({
      ...prev,
      priceRange: value
    }));
  };

  // Reset all filters
  const resetFilters = () => {
    setFilters({
      brands: [],
      priceRange: 500,
      colors: []
    });
    setCurrentPage(1);
  };

  // Handle page change
  interface HandlePageChangeEvent {
    (page: number): void;
  }

  const handlePageChange: HandlePageChangeEvent = (page) => {
    setCurrentPage(page);
    // Scroll to top of products section
    document.querySelector(`.${styles.shopProducts}`)?.scrollIntoView({ 
      behavior: 'smooth' 
    });
  };

  // Generate page numbers for pagination
  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxVisiblePages = 5;
    
    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      const startPage = Math.max(1, currentPage - 2);
      const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
      
      for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i);
      }
    }
    
    return pageNumbers;
  };

  return (
    <main className={styles.shop}>
      <CheckoutHeader link="/shop" linkTitle="Shop" title="Shop" />
      <div className={styles.shopContainer}>
        <div className={styles.shopHeader}>
          <p className="shop-description">
            Explore our collection of shoes ({totalProducts} items)
            {totalProducts > 0 && (
              <span> - Page {currentPage} of {totalPages}</span>
            )}
          </p>
        </div>
        <div className={styles.shopProducts}>
          {/* Filters Section */}
          <div className={styles.shopFilters}>
            <div className={styles.shopFiltersHeader}>
              <h2 className={styles.shopFiltersTitle}>Filters</h2>
              <button 
                onClick={resetFilters}
                className={styles.shopFiltersReset}
                style={{ 
                  background: 'none', 
                  border: '1px solid #ddd', 
                  padding: '4px 8px', 
                  cursor: 'pointer',
                  fontSize: '12px'
                }}
              >
                Reset
              </button>
            </div>
            
            {/* Brand Filter */}
            <div className={styles.shopFilterItem}>
              <label className={styles.shopFilterLabel}>Brand</label>
              <div className={styles.shopFilterOptions}>
                {uniqueBrands.map(brand => (
                  <div key={brand} className={styles.shopFilterOption}>
                    <input
                      type="checkbox"
                      id={`brand-${brand}`}
                      checked={filters.brands.includes(brand)}
                      onChange={() => handleCheckboxChange('brands', brand)}
                      className={styles.shopCheckboxInput}
                    />
                    <label htmlFor={`brand-${brand}`} className={styles.shopCheckboxLabel}>
                      {brand}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {/* Price Range Filter */}
            <div className={styles.shopFilterItem}>
              <label htmlFor="price">
                Price Range: $0 - ${filters.priceRange}
              </label>
              <input 
                type="range" 
                id="price" 
                name="price" 
                min="0" 
                max="500" 
                value={filters.priceRange}
                onChange={(e) => handlePriceChange(parseInt(e.target.value))}
              />
            </div>

            {/* Color Filter */}
            <div className={styles.shopFilterItem}>
              <label className={styles.shopFilterLabel}>Color</label>
              <div className={styles.shopFilterOptions}>
                {uniqueColors.map(color => (
                  <div key={color} className={styles.shopFilterOption}>
                    <input
                      type="checkbox"
                      id={`color-${color}`}
                      checked={filters.colors.includes(color)}
                      onChange={() => handleCheckboxChange('colors', color)}
                      className={styles.shopCheckboxInput}
                    />
                    <label htmlFor={`color-${color}`} className="shop-checkbox-label">
                      {color}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className={styles.shopShoesContainer}>
            {/* Products Grid */}
            <div className={styles.shopShoes}>
              {currentProducts.length > 0 ? (
                currentProducts.map((shoe) => (
                  <Product
                    key={shoe.id}
                    id={shoe.id}
                    title={shoe.name}
                    image={`https://${shoe.imageUrl}.jpg`}
                    rating={shoe.id || 0}
                    image2={`https://${shoe.additionalImageUrls[0]}.jpg`}
                    price={shoe.price.current.value}
                    extraImages={shoe.additionalImageUrls}
                    brand={shoe.brandName}
                    color={shoe.colour}
                    product={{
                      ...shoe,
                      color: shoe.colour || "",
                      price: shoe.price.current.value
                    }}
                  />
                ))
              ) : (
                <div className="shop-no-results">
                  <p>No products found matching your filters.</p>
                  <button onClick={resetFilters} style={{
                    padding: '8px 16px',
                    background: '#007bff',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer'
                  }}>
                    Clear Filters
                  </button>
                </div>
              )}
            </div>
            {/* Pagination */}
            {totalPages > 1 && (
              <div className={styles.shopPagination}>
                {/* Previous Button */}
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  style={{
                    background: currentPage === 1 ? '#f5f5f5' : 'white',
                    cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
                  }}
                  className={styles.shopPaginationButton}
                >
                  Previous
                </button>
                {/* Page Numbers */}
                {getPageNumbers().map(pageNum => (
                  <button
                    key={pageNum}
                    onClick={() => handlePageChange(pageNum)}
                    style={{
                      padding: '8px 12px',
                      border: '1px solid #ddd',
                      background: pageNum === currentPage ? '#007bff' : 'white',
                      color: pageNum === currentPage ? 'white' : 'black',
                      cursor: 'pointer',
                      borderRadius: '4px',
                      minWidth: '40px'
                    }}
                  >
                    {pageNum}
                  </button>
                ))}
                {/* Next Button */}
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  style={{
                    background: currentPage === totalPages ? '#f5f5f5' : 'white',
                    cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
                  }}
                  className={styles.shopPaginationButton}
                >
                  Next
                </button>
              </div>
            )}
            {/* Results Info */}
            {totalProducts > 0 && (
              <div className="shop-results-info" style={{
                textAlign: 'center',
                color: '#666',
                fontSize: '14px',
                marginTop: '16px'
              }}>
                Showing {startIndex + 1} - {Math.min(endIndex, totalProducts)} of {totalProducts} products
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}