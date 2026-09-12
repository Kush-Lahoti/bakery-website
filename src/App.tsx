import  { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, X, Plus, Minus, Phone, Star, Heart, ChefHat, Instagram, MapPin } from 'lucide-react';
import { products, Product } from './data/products';
import { useCart } from './hooks/useCart';

export default function App() {
  const { cart, addToCart, updateQuantity, removeFromCart, total, totalItems, isCartOpen, setIsCartOpen } = useCart();
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedFlavour, setSelectedFlavour] = useState('');
  const [quantity, setQuantity] = useState(1);

  const categories = ['All', ...Array.from(new Set(products.map(p => p.category)))];
  const filteredProducts = activeCategory === 'All' ? products : products.filter(p => p.category === activeCategory);
  
  const handleOpenProduct = (product: Product) => {
    setSelectedProduct(product);
    setSelectedFlavour(product.flavours[0] || '');
    setQuantity(1);
  };

  const handleAddToCart = () => {
    if (!selectedProduct) return;
    addToCart({
      productId: selectedProduct.id,
      name: selectedProduct.name,
      flavour: selectedFlavour,
      price: selectedProduct.price,
      quantity,
      image: selectedProduct.image
    });
    setSelectedProduct(null);
  };

  return (
    <div className="min-h-screen relative overflow-x-hidden">
      {/* NAVBAR */}
      <nav className="fixed top-0 left-0 right-0 z-40 bg-pastel-cream/80 backdrop-blur-md border-b border-pastel-pink/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="font-display text-2xl font-bold text-pastel-brown tracking-tight">
              [BAKERY NAME]
            </div>
            
            <div className="hidden md:flex space-x-8">
              {['Home', 'Shop', 'About', 'Contact'].map((item) => (
                <a key={item} href={`#${item.toLowerCase()}`} className="text-pastel-brown hover:text-pastel-peach transition-colors font-medium">
                  {item}
                </a>
              ))}
            </div>

            <div className="flex items-center gap-4">
              <button onClick={() => setIsCartOpen(true)} className="relative p-2 hover:bg-pastel-pink/20 rounded-full transition">
                <ShoppingBag className="w-6 h-6 text-pastel-brown" />
                {totalItems > 0 && (
                  <span className="absolute top-0 right-0 bg-pastel-peach text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section id="home" className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="font-display text-5xl md:text-7xl font-bold leading-tight mb-6 text-pastel-brown">
              Handcrafted <br/><span className="text-pastel-peach">Happiness</span> in Every Bite.
            </h1>
            <p className="text-lg text-pastel-brown/80 mb-8 max-w-md">
              Welcome to your new favorite artisan bakery. We bake premium chocolate bowls, cookie tins, and millet cakes with love and vibrant flavors.
            </p>
            <div className="flex flex-wrap gap-4">
              <a href="#shop" className="bg-pastel-brown text-white px-8 py-4 rounded-full font-medium hover:bg-pastel-brown/90 transition-transform hover:scale-105 shadow-lg shadow-pastel-brown/20">
                Shop Now
              </a>
              <a href="#about" className="bg-pastel-pink/30 text-pastel-brown px-8 py-4 rounded-full font-medium hover:bg-pastel-pink/50 transition-colors">
                Explore Our Treats
              </a>
            </div>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="aspect-square rounded-[3rem] overflow-hidden shadow-2xl relative">
              <img src="/image_56362b.png" alt="Delicious Chocolate Bowl" className="object-cover w-full h-full hover:scale-105 transition-transform duration-700" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* SHOP SECTION */}
      <section id="shop" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-display text-4xl font-bold text-pastel-brown mb-4">Our Delicious Menu</h2>
            <div className="flex flex-wrap justify-center gap-2 mt-8">
              {categories.map(cat => (
                <button 
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-6 py-2 rounded-full font-medium transition-all ${
                    activeCategory === cat 
                      ? 'bg-pastel-peach text-white shadow-md' 
                      : 'bg-pastel-cream text-pastel-brown hover:bg-pastel-pink/30'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <AnimatePresence>
              {filteredProducts.map(product => (
                <motion.div 
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  key={product.id} 
                  className="bg-pastel-cream rounded-3xl p-4 shadow-sm hover:shadow-xl transition-shadow group cursor-pointer"
                  onClick={() => handleOpenProduct(product)}
                >
                  <div className="aspect-square rounded-2xl overflow-hidden mb-4 relative">
                    <img src={product.image} alt={product.name} className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500" />
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <span className="bg-white/90 text-pastel-brown px-6 py-2 rounded-full font-medium backdrop-blur-sm">Quick View</span>
                    </div>
                  </div>
                  <h3 className="font-display text-xl font-bold text-pastel-brown">{product.name}</h3>
                  <p className="text-pastel-brown/60 text-sm mt-1 truncate">{product.category}</p>
                  <div className="mt-4 flex justify-between items-center">
                    <span className="font-bold text-lg text-pastel-brown">₹{product.price}</span>
                    <button className="bg-pastel-mint text-pastel-brown p-2 rounded-full hover:bg-pastel-mint/80 transition-colors">
                      <Plus className="w-5 h-5" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section id="about" className="py-20 bg-pastel-lavender/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-3xl shadow-sm text-center transform hover:-translate-y-2 transition-transform">
              <div className="w-16 h-16 bg-pastel-pink/30 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <ChefHat className="w-8 h-8 text-pastel-brown" />
              </div>
              <h3 className="font-display text-xl font-bold mb-3">Made to Order</h3>
              <p className="text-pastel-brown/70">Everything is baked fresh just for you, ensuring maximum deliciousness.</p>
            </div>
            <div className="bg-white p-8 rounded-3xl shadow-sm text-center transform hover:-translate-y-2 transition-transform">
              <div className="w-16 h-16 bg-pastel-mint/30 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Heart className="w-8 h-8 text-pastel-brown" />
              </div>
              <h3 className="font-display text-xl font-bold mb-3">Handmade with Love</h3>
              <p className="text-pastel-brown/70">We pour our hearts into every recipe, using only the finest ingredients.</p>
            </div>
            <div className="bg-white p-8 rounded-3xl shadow-sm text-center transform hover:-translate-y-2 transition-transform">
              <div className="w-16 h-16 bg-pastel-yellow/50 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Star className="w-8 h-8 text-pastel-brown" />
              </div>
              <h3 className="font-display text-xl font-bold mb-3">Unique Flavours</h3>
              <p className="text-pastel-brown/70">From classic chocolate to innovative combinations you won't find elsewhere.</p>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer id="contact" className="bg-pastel-brown text-pastel-cream py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-3 gap-12">
          <div>
            <h3 className="font-display text-3xl font-bold mb-4">[BAKERY NAME]</h3>
            <p className="text-pastel-cream/70 mb-6 max-w-sm">
              Bringing color, joy, and the most decadent treats to your day.
            </p>
          </div>
          <div>
            <h4 className="font-bold text-lg mb-4 text-pastel-peach">Contact Us</h4>
            <div className="space-y-3">
              <a href="tel:8805773058" className="flex items-center gap-3 hover:text-pastel-peach transition-colors">
                <Phone className="w-5 h-5" />
                <span>+91 8805773058</span>
              </a>
              <p className="flex items-center gap-3">
                <MapPin className="w-5 h-5" />
                <span>[Placeholder Address, Pune]</span>
              </p>
            </div>
          </div>
          <div>
            <h4 className="font-bold text-lg mb-4 text-pastel-peach">Follow the sweetness</h4>
            <a href="#" className="flex items-center gap-3 hover:text-pastel-peach transition-colors">
              <Instagram className="w-5 h-5" />
              <span>@bakery_instagram</span>
            </a>
          </div>
        </div>
      </footer>

      {/* PRODUCT MODAL */}
      <AnimatePresence>
        {selectedProduct && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
            onClick={() => setSelectedProduct(null)}
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }}
              className="bg-white rounded-[2rem] max-w-4xl w-full overflow-hidden shadow-2xl flex flex-col md:flex-row max-h-[90vh]"
              onClick={e => e.stopPropagation()}
            >
              <div className="md:w-1/2 h-64 md:h-auto bg-pastel-pink/20">
                <img src={selectedProduct.image} alt={selectedProduct.name} className="w-full h-full object-cover" />
              </div>
              <div className="md:w-1/2 p-8 md:p-12 overflow-y-auto">
                <div className="flex justify-between items-start mb-4">
                  <h2 className="font-display text-3xl font-bold text-pastel-brown">{selectedProduct.name}</h2>
                  <button onClick={() => setSelectedProduct(null)} className="p-2 bg-pastel-cream rounded-full hover:bg-pastel-pink/30">
                    <X className="w-5 h-5 text-pastel-brown" />
                  </button>
                </div>
                <p className="text-xl font-semibold text-pastel-peach mb-4">₹{selectedProduct.price}</p>
                <p className="text-pastel-brown/70 mb-8">{selectedProduct.description}</p>
                
                <div className="mb-6">
                  <label className="block text-sm font-bold text-pastel-brown mb-3">Choose Flavour</label>
                  <div className="flex flex-wrap gap-3">
                    {selectedProduct.flavours.map(f => (
                      <button 
                        key={f} 
                        onClick={() => setSelectedFlavour(f)}
                        className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                          selectedFlavour === f ? 'bg-pastel-brown text-white' : 'bg-pastel-cream text-pastel-brown border border-pastel-brown/10'
                        }`}
                      >
                        {f}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="mb-8 flex items-center gap-6">
                  <label className="text-sm font-bold text-pastel-brown">Quantity</label>
                  <div className="flex items-center bg-pastel-cream rounded-full p-1">
                    <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="p-2 hover:bg-white rounded-full"><Minus className="w-4 h-4" /></button>
                    <span className="w-10 text-center font-bold">{quantity}</span>
                    <button onClick={() => setQuantity(quantity + 1)} className="p-2 hover:bg-white rounded-full"><Plus className="w-4 h-4" /></button>
                  </div>
                </div>

                <button 
                  onClick={handleAddToCart}
                  className="w-full py-4 bg-pastel-brown text-white rounded-2xl font-bold text-lg hover:bg-pastel-brown/90 transition-transform active:scale-95"
                >
                  Add to Cart — ₹{selectedProduct.price * quantity}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* SHOPPING CART SIDEBAR */}
      <AnimatePresence>
        {isCartOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50"
              onClick={() => setIsCartOpen(false)}
            />
            <motion.div 
              initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-2xl z-50 flex flex-col"
            >
              <div className="p-6 flex justify-between items-center border-b border-pastel-cream">
                <h2 className="font-display text-2xl font-bold text-pastel-brown flex items-center gap-2">
                  <ShoppingBag className="w-6 h-6" /> Your Cart
                </h2>
                <button onClick={() => setIsCartOpen(false)} className="p-2 bg-pastel-cream rounded-full hover:bg-pastel-pink/30">
                  <X className="w-5 h-5 text-pastel-brown" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                {cart.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center text-pastel-brown/50">
                    <ShoppingBag className="w-16 h-16 mb-4 opacity-20" />
                    <p className="text-lg">Your cart is feeling a little empty.</p>
                    <button onClick={() => setIsCartOpen(false)} className="mt-6 text-pastel-peach font-bold hover:underline">Start Shopping</button>
                  </div>
                ) : (
                  cart.map(item => (
                    <div key={item.id} className="flex gap-4 bg-pastel-cream/50 p-4 rounded-2xl">
                      <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-xl" />
                      <div className="flex-1">
                        <div className="flex justify-between">
                          <h4 className="font-bold text-pastel-brown">{item.name}</h4>
                          <button onClick={() => removeFromCart(item.id)}><X className="w-4 h-4 text-pastel-brown/50 hover:text-red-400" /></button>
                        </div>
                        <p className="text-sm text-pastel-brown/70">{item.flavour}</p>
                        <div className="flex justify-between items-center mt-2">
                          <div className="flex items-center bg-white rounded-lg p-1 border border-pastel-brown/10">
                            <button onClick={() => updateQuantity(item.id, -1)} className="px-2"><Minus className="w-3 h-3" /></button>
                            <span className="px-2 text-sm font-bold">{item.quantity}</span>
                            <button onClick={() => updateQuantity(item.id, 1)} className="px-2"><Plus className="w-3 h-3" /></button>
                          </div>
                          <p className="font-bold text-pastel-brown">₹{item.price * item.quantity}</p>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {cart.length > 0 && (
                <div className="p-6 bg-pastel-cream border-t border-pastel-pink/20">
                  <div className="flex justify-between mb-2 text-pastel-brown/70">
                    <span>Subtotal ({totalItems} items)</span>
                    <span>₹{total}</span>
                  </div>
                  <div className="flex justify-between mb-6 font-bold text-xl text-pastel-brown">
                    <span>Total</span>
                    <span>₹{total}</span>
                  </div>
                  <a 
                    href="tel:8805773058"
                    className="w-full py-4 bg-pastel-peach text-white rounded-2xl font-bold text-lg flex items-center justify-center gap-2 hover:bg-pastel-peach/90 transition-all shadow-lg shadow-pastel-peach/30"
                  >
                    <Phone className="w-5 h-5" /> Call to Order — 8805773058
                  </a>
                  <p className="text-center text-xs text-pastel-brown/50 mt-4">
                    Review your items above, then give us a call to place your order! No online payment required.
                  </p>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
