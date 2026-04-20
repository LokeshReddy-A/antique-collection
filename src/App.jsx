import { useState, useMemo, useEffect } from 'react';
import { products } from './data';
import './index.css';

function App() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedEra, setSelectedEra] = useState("All");
  const [priceRange, setPriceRange] = useState(50000);
  const [page, setPage] = useState(1);
  const [isDark, setIsDark] = useState(false);
  
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);

  const ITEMS_PER_PAGE = 9;

  // Derive categories and eras for filters
  const categories = ["All", ...new Set(products.map(p => p.category))];
  const eras = ["All", ...new Set(products.map(p => p.era))];

  useEffect(() => {
    setPage(1); // Reset to page 1 on filter change
  }, [search, selectedCategory, selectedEra, priceRange]);

  useEffect(() => {
    if (isDark) document.body.classList.add('dark');
    else document.body.classList.remove('dark');
  }, [isDark]);

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());
      const matchCategory = selectedCategory === "All" || p.category === selectedCategory;
      const matchEra = selectedEra === "All" || p.era === selectedEra;
      const matchPrice = p.price <= priceRange;
      return matchSearch && matchCategory && matchEra && matchPrice;
    });
  }, [search, selectedCategory, selectedEra, priceRange]);

  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const paginatedProducts = filteredProducts.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  );

  const toggleWishlist = (product) => {
    setWishlist(prev => 
      prev.find(p => p.id === product.id) 
        ? prev.filter(p => p.id !== product.id) 
        : [...prev, product]
    );
  };

  const addToCart = (product) => {
    setCart(prev => {
      const existing = prev.find(p => p.id === product.id);
      if (existing) return prev; // Since antiques are unique, qty is 1 max
      return [...prev, product];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (id) => {
    setCart(prev => prev.filter(p => p.id !== id));
  };

  const removeFromWishlist = (id) => {
    setWishlist(prev => prev.filter(p => p.id !== id));
  };

  const cartTotal = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <>
      <nav className="nav">
        <div className="container nav-container">
          <div className="nav-brand">Estate Curator</div>
          <div className="nav-links" style={{alignItems: 'center'}}>
            <div style={{position: 'relative'}}>
              <input 
                type="text" 
                className="search-input" 
                placeholder="Search the archives..." 
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <span className="material-symbols-outlined" style={{position: 'absolute', right: 0, top: '4px', opacity: 0.5}}>search</span>
            </div>
            
            <button className="icon-btn" onClick={() => setIsDark(!isDark)}>
              <span className="material-symbols-outlined">{isDark ? "light_mode" : "dark_mode"}</span>
            </button>
            <button className="icon-btn" onClick={() => setIsWishlistOpen(true)}>
              <span className="material-symbols-outlined">favorite</span>
              {wishlist.length > 0 && <span className="badge">{wishlist.length}</span>}
            </button>
            <button className="icon-btn" onClick={() => setIsCartOpen(true)}>
              <span className="material-symbols-outlined">shopping_bag</span>
              {cart.length > 0 && <span className="badge">{cart.length}</span>}
            </button>
          </div>
        </div>
      </nav>

      <main className="container layout">
        <aside className="sidebar">
          <div className="filter-group">
            <h3 className="filter-title">Categories</h3>
            <ul className="filter-list">
              {categories.map(cat => (
                <li key={cat}>
                  <button 
                    className={`filter-btn ${selectedCategory === cat ? 'active' : ''}`}
                    onClick={() => setSelectedCategory(cat)}
                  >
                    <span>{cat}</span>
                    <span>({cat === "All" ? products.length : products.filter(p => p.category === cat).length})</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="filter-group">
            <h3 className="filter-title">Era</h3>
            <div className="chip-group">
              {eras.map(era => (
                <button 
                  key={era} 
                  className={`chip ${selectedEra === era ? 'active' : ''}`}
                  onClick={() => setSelectedEra(era)}
                >
                  {era}
                </button>
              ))}
            </div>
          </div>

          <div className="filter-group">
            <h3 className="filter-title">Price Range up to ${priceRange.toLocaleString()}</h3>
            <input 
              type="range" 
              min="1000" 
              max="50000" 
              step="500"
              value={priceRange}
              onChange={(e) => setPriceRange(Number(e.target.value))}
              style={{width: '100%', accentColor: 'var(--secondary)'}}
            />
            <div style={{display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', opacity: 0.6, marginTop: '0.5rem'}}>
              <span>$1,000</span>
              <span>$50,000+</span>
            </div>
          </div>
        </aside>

        <section style={{flexGrow: 1}}>
          <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '3rem'}}>
            <h1 style={{fontFamily: 'var(--font-headline)', fontSize: '3rem', color: 'var(--primary)', fontWeight: 300, letterSpacing: '-0.02em'}}>Masterpiece Collection</h1>
            <p style={{fontStyle: 'italic', opacity: 0.6, fontSize: '0.875rem'}}>Displaying {paginatedProducts.length} of {filteredProducts.length} Curated Rarities</p>
          </div>

          {paginatedProducts.length > 0 ? (
            <div className="product-grid">
              {paginatedProducts.map(product => {
                const isFav = wishlist.find(p => p.id === product.id);
                const inCart = cart.find(p => p.id === product.id);
                return (
                  <div key={product.id} className="product-card">
                    <div className="ornate-frame">
                      <div className="product-image-container">
                        <img 
                          src={product.image} 
                          alt={product.name} 
                          className="product-image"
                          loading="lazy"
                        />
                      </div>
                      <button 
                        className={`fav-btn ${isFav ? 'active' : ''}`}
                        onClick={() => toggleWishlist(product)}
                      >
                        <span className="material-symbols-outlined" style={{fontVariationSettings: isFav ? "'FILL' 1" : "'FILL' 0"}}>favorite</span>
                      </button>
                    </div>
                    
                    <div className="product-info">
                      <div>
                        <h3 className="product-title">{product.name}</h3>
                        <p className="product-meta">{product.description}</p>
                      </div>
                      <p className="product-price">${product.price.toLocaleString()}</p>
                    </div>
                    
                    <button 
                      className={`btn ${inCart ? 'btn-secondary' : 'btn-primary'}`} 
                      style={{width: '100%'}}
                      onClick={() => !inCart && addToCart(product)}
                    >
                      {inCart ? "In Collection" : "Secure Acquisition"}
                    </button>
                  </div>
                );
              })}
            </div>
          ) : (
            <div style={{textAlign: 'center', padding: '5rem 0', opacity: 0.5}}>
              <span className="material-symbols-outlined" style={{fontSize: '4rem', marginBottom: '1rem'}}>search_off</span>
              <p style={{fontFamily: 'var(--font-headline)', fontSize: '1.5rem'}}>No rarities found matching your criteria.</p>
            </div>
          )}

          {totalPages > 1 && (
            <div className="pagination">
              {Array.from({length: totalPages}, (_, i) => i + 1).map(p => (
                <button 
                  key={p} 
                  className={`page-btn ${page === p ? 'active' : ''}`}
                  onClick={() => setPage(p)}
                >
                  {p}
                </button>
              ))}
            </div>
          )}
        </section>
      </main>

      {/* Cart Drawer */}
      <div className={`overlay ${isCartOpen || isWishlistOpen ? 'open' : ''}`} onClick={() => {setIsCartOpen(false); setIsWishlistOpen(false);}}></div>
      
      <div className={`cart-drawer ${isCartOpen ? 'open' : ''}`}>
        <div className="drawer-header">
          <h4 className="drawer-title">Your Selection</h4>
          <button className="close-btn" onClick={() => setIsCartOpen(false)}>
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>
        <div className="drawer-items">
          {cart.length === 0 ? (
            <p style={{opacity: 0.5, textAlign: 'center', marginTop: '2rem'}}>Your selection is empty.</p>
          ) : (
            cart.map(item => (
              <div key={item.id} className="cart-item">
                <img src={item.image} alt={item.name} className="cart-item-img" />
                <div className="cart-item-info">
                  <h5 className="cart-item-title">{item.name}</h5>
                  <p className="cart-item-price">${item.price.toLocaleString()}</p>
                </div>
                <button className="close-btn" onClick={() => removeFromCart(item.id)} style={{opacity: 0.5}}>
                  <span className="material-symbols-outlined">delete</span>
                </button>
              </div>
            ))
          )}
        </div>
        {cart.length > 0 && (
          <div className="drawer-footer">
            <div className="cart-total">
              <span>Total Investment</span>
              <span>${cartTotal.toLocaleString()}</span>
            </div>
            <button className="btn btn-secondary" style={{width: '100%'}}>Initiate Transfer</button>
          </div>
        )}
      </div>

      {/* Wishlist Drawer */}
      <div className={`wishlist-drawer ${isWishlistOpen ? 'open' : ''}`}>
        <div className="drawer-header">
          <h4 className="drawer-title">Curated Wishlist</h4>
          <button className="close-btn" onClick={() => setIsWishlistOpen(false)}>
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>
        <div className="drawer-items">
          {wishlist.length === 0 ? (
            <p style={{opacity: 0.5, textAlign: 'center', marginTop: '2rem'}}>Your wishlist is empty.</p>
          ) : (
            wishlist.map(item => (
              <div key={item.id} className="cart-item">
                <img src={item.image} alt={item.name} className="cart-item-img" />
                <div className="cart-item-info">
                  <h5 className="cart-item-title">{item.name}</h5>
                  <p className="cart-item-price">${item.price.toLocaleString()}</p>
                </div>
                <button className="close-btn" onClick={() => removeFromWishlist(item.id)} style={{opacity: 0.5}}>
                  <span className="material-symbols-outlined">delete</span>
                </button>
              </div>
            ))
          )}
        </div>
      </div>

    </>
  );
}

export default App;
