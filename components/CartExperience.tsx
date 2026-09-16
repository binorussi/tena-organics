"use client";

import { useState } from "react";
import { ProductWithStock } from "./ProductCard";
import Navbar from "./Navbar";
import Hero from "./Hero";
import ProductShop from "./ProductShop";
import { WhyTena } from "./WhyTena";
import { InvestInHealth } from "./InvestInHealth";
import { Footer } from "./Footer";
import { processCheckout } from "@/app/actions/checkout";

interface CartItem {
  product: ProductWithStock;
  weightGrams: number;
}

interface CartExperienceProps {
  products: ProductWithStock[];
}

export function CartExperience({ products }: CartExperienceProps) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Customer & Delivery State
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");

  const handleAddToCart = (product: ProductWithStock, weightGrams: number) => {
    setCart((prev) => [...prev, { product, weightGrams }]);

    const weightText = weightGrams >= 1000 ? `${weightGrams / 1000}kg` : `${weightGrams}g`;
    setToastMessage(`Added ${product.name} (${weightText}) to cart!`);

    setTimeout(() => {
      setToastMessage(null);
    }, 2500);
  };

  const handleRemoveItem = (indexToRemove: number) => {
    setCart((prev) => prev.filter((_, idx) => idx !== indexToRemove));
  };

  const totalItemsCount = cart.length;

  // Delivery Thresholds & Local Zones
  const FREE_ZONES = ["CMC", "Megenagna", "Hayat", "Goro", "Figa", "Gurd Shola"];
  const FREE_DELIVERY_THRESHOLD = 2000;
  const STANDARD_DELIVERY_FEE = 200;

  // Price & Delivery Calculations
  const subtotal = cart.reduce(
    (acc, item) => acc + item.product.price * (item.weightGrams / 250),
    0
  );

  const isLocalZone = FREE_ZONES.includes(selectedLocation);
  const qualifiesForFreeDelivery = subtotal >= FREE_DELIVERY_THRESHOLD || isLocalZone;

  const deliveryFee = qualifiesForFreeDelivery || subtotal === 0 ? 0 : STANDARD_DELIVERY_FEE;
  const amountNeededForFreeDelivery = Math.max(0, FREE_DELIVERY_THRESHOLD - subtotal);
  const grandTotal = subtotal + deliveryFee;

  const handleCheckout = async () => {
    if (!customerName.trim() || !customerPhone.trim() || !selectedLocation) {
      alert("Please fill in your Name, Phone Number, and Delivery Location.");
      return;
    }

    const orderItems = cart.map((item) => ({
      productId: item.product.id,
      productName: item.product.name,
      weightGrams: item.weightGrams,
    }));

    const res = await processCheckout(
      customerName,
      customerPhone,
      selectedLocation,
      orderItems,
      subtotal,
      deliveryFee
    );

    if (res.success) {
      alert("Order placed successfully! Telegram alert sent and stock updated.");
      setCart([]);
      setCustomerName("");
      setCustomerPhone("");
      setSelectedLocation("");
      setIsCartOpen(false);
    } else {
      alert(res.error);
    }
  };

  return (
    <>
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-24 right-6 z-50 bg-brand-green text-white text-sm font-medium px-4 py-3 rounded-xl shadow-lg flex items-center gap-2 animate-bounce">
          <span>🛒</span>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Floating Cart Button */}
      {totalItemsCount > 0 && !isCartOpen && (
        <button
          onClick={() => setIsCartOpen(true)}
          className="fixed bottom-6 right-6 z-40 bg-brand-green text-white px-5 py-3.5 rounded-full shadow-2xl flex items-center gap-3 border-2 border-brand-gold hover:scale-105 active:scale-95 transition-all duration-200"
          aria-label="Open Cart"
        >
          <div className="relative">
            <span className="text-xl">🛒</span>
            <span className="absolute -top-2 -right-2 bg-brand-gold text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center border border-white">
              {totalItemsCount}
            </span>
          </div>
          <span className="font-bold text-sm tracking-wide">View Cart</span>
        </button>
      )}

      {/* Clean Navbar Integration without wrapping div */}
      <Navbar 
        cartCount={totalItemsCount} 
        onOpenCart={() => setIsCartOpen(true)} 
      />

      <Hero />
      <WhyTena />
      <ProductShop products={products} onAddToCart={handleAddToCart} />
      <InvestInHealth />
      <Footer />

      {/* Slide-out Cart Drawer */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/40 backdrop-blur-sm">
          <div className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col p-5">
            
            {/* Drawer Header */}
            <div className="flex justify-between items-center pb-3 border-b flex-shrink-0">
              <h2 className="font-serif text-lg font-bold text-brand-green">Your Cart ({totalItemsCount})</h2>
              <button 
                onClick={() => setIsCartOpen(false)} 
                className="text-gray-400 hover:text-gray-600 text-2xl font-bold leading-none p-1"
              >
                &times;
              </button>
            </div>

            {/* Free Delivery Banner */}
            {cart.length > 0 && (
              <div className="mt-3 p-2 rounded-lg text-xs font-semibold text-center bg-brand-sage text-brand-green flex-shrink-0">
                {isLocalZone ? (
                  <span>📍 Local Zone Selected — <strong>FREE Delivery!</strong></span>
                ) : subtotal >= FREE_DELIVERY_THRESHOLD ? (
                  <span>🎉 Order exceeds 2,000 ETB — <strong>FREE Delivery Unlocked!</strong></span>
                ) : (
                  <span>
                    Add <strong>{amountNeededForFreeDelivery} ETB</strong> more for <strong>FREE Delivery</strong>
                  </span>
                )}
              </div>
            )}

            {/* Scrollable Main Content Container */}
            <div className="flex-1 overflow-y-auto my-3 pr-1 space-y-4">
              
              {/* Item List with Remove (X) Button */}
              {cart.length === 0 ? (
                <p className="text-center text-gray-500 py-10 text-sm">Your cart is currently empty.</p>
              ) : (
                <div className="space-y-2.5">
                  <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">Ordered Items</span>
                  <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                    {cart.map((item, idx) => (
                      <div 
                        key={idx} 
                        className="flex justify-between items-center bg-gray-50 border border-gray-100 p-2.5 rounded-lg text-xs hover:border-brand-sage transition-colors"
                      >
                        <div className="flex-1 pr-2">
                          <p className="font-bold text-brand-green">{item.product.name}</p>
                          <p className="text-[10px] text-gray-500">
                            Weight: {item.weightGrams >= 1000 ? `${item.weightGrams / 1000} kg` : `${item.weightGrams} g`}
                          </p>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="font-bold text-brand-gold">
                            {item.product.price * (item.weightGrams / 250)} ETB
                          </span>
                          <button
                            onClick={() => handleRemoveItem(idx)}
                            className="text-gray-400 hover:text-red-500 font-bold text-sm px-1 transition-colors"
                            title="Remove Item"
                          >
                            ✕
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Delivery Input Fields */}
              {cart.length > 0 && (
                <div className="space-y-2 pt-2 border-t">
                  <h3 className="text-[11px] font-bold text-brand-green uppercase tracking-wider">Delivery Details</h3>

                  <input
                    type="text"
                    placeholder="Full Name *"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full text-xs border rounded-lg p-2 bg-gray-50 focus:bg-white focus:ring-1 focus:ring-brand-green outline-none"
                  />

                  <input
                    type="tel"
                    placeholder="Phone Number (e.g., 0911...)"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    className="w-full text-xs border rounded-lg p-2 bg-gray-50 focus:bg-white focus:ring-1 focus:ring-brand-green outline-none"
                  />

                  <select
                    value={selectedLocation}
                    onChange={(e) => setSelectedLocation(e.target.value)}
                    className="w-full text-xs border rounded-lg p-2 bg-gray-50 focus:bg-white focus:ring-1 focus:ring-brand-green outline-none font-medium text-gray-700"
                  >
                    <option value="">Select Delivery Location *</option>
                    <optgroup label="Local Store Neighborhoods (FREE Delivery)">
                      <option value="CMC">CMC</option>
                      <option value="Megenagna">Megenagna</option>
                      <option value="Hayat">Hayat</option>
                      <option value="Goro">Goro</option>
                      <option value="Figa">Figa</option>
                      <option value="Gurd Shola">Gurd Shola</option>
                    </optgroup>
                    <optgroup label="Other Areas (200 ETB Standard Delivery)">
                      <option value="Bole">Bole</option>
                      <option value="Kazanchis">Kazanchis</option>
                      <option value="Piassa">Piassa</option>
                      <option value="Sarbet">Sarbet</option>
                      <option value="Gotera">Gotera</option>
                      <option value="Other">Other Location in Addis Ababa</option>
                    </optgroup>
                  </select>
                </div>
              )}
            </div>

            {/* Bottom Fixed Checkout Section */}
            {cart.length > 0 && (
              <div className="pt-3 border-t space-y-2 flex-shrink-0">
                <div className="space-y-1 text-xs text-gray-600">
                  <div className="flex justify-between">
                    <span>Subtotal:</span>
                    <span className="font-semibold text-gray-800">{subtotal} ETB</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Delivery Fee:</span>
                    <span className="font-semibold">
                      {deliveryFee === 0 ? (
                        <span className="text-emerald-700 font-bold">FREE</span>
                      ) : (
                        `${deliveryFee} ETB`
                      )}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm font-bold pt-1 border-t text-brand-green">
                    <span>Grand Total:</span>
                    <span className="text-brand-gold">{grandTotal} ETB</span>
                  </div>
                </div>

                <button
                  onClick={handleCheckout}
                  className="w-full bg-brand-gold hover:bg-brand-gold-hover text-white py-2.5 rounded-lg font-bold transition-colors text-sm shadow-md"
                >
                  Checkout
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}