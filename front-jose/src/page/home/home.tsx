import React, { useState } from 'react';

interface Pizza {
  id: number;
  name: string;
  description: string;
  image: string;
  category: string;
}

const pizzas: Pizza[] = [
  {
    id: 1,
    name: 'Americana',
    description: 'Jamón, queso mozzarella, salsa tomate, oregano',
    image: '🍕',
    category: 'clasicas'
  },
  {
    id: 2,
    name: 'Hawaiana',
    description: 'Jamón ahumado, piña dulce, queso fundido',
    image: '🍍',
    category: 'especiales'
  },
  {
    id: 3,
    name: 'Pepperoni',
    description: 'Doble pepperoni, mozzarella, toque picante',
    image: '🍕',
    category: 'clasicas'
  }
];

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState('clasicas');
  const [cartCount, setCartCount] = useState(2);

  const categories = [
    { id: 'clasicas', label: 'Pizzas Clásicas' },
    { id: 'especiales', label: 'Especiales' },
    { id: 'calzones', label: 'Calzones' },
    { id: 'bebidas', label: 'Bebidas' }
  ];

  const handleAddToCart = () => {
    setCartCount(cartCount + 1);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span className="text-3xl">🍕</span>
            <h1 className="text-2xl font-bold text-red-600">FOCARELA</h1>
          </div>
          
          <nav className="flex items-center gap-6">
            <button className="text-red-600 hover:text-red-700 font-medium transition">
              Ver Menú
            </button>
            <button className="relative bg-red-600 text-white px-6 py-2 rounded-full hover:bg-red-700 transition font-medium flex items-center gap-2">
              Mi Pedido
              <span className="bg-white text-red-600 rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">
                {cartCount}
              </span>
            </button>
          </nav>
        </div>
      </header>

      {/* Hero Banner */}
      <section className="bg-gradient-to-r from-red-600 to-red-700 py-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-12">
            El auténtico sabor italiano en Abancay
          </h2>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <button className="bg-white text-red-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition flex items-center gap-2 text-lg">
              <span>🍕</span> Pedir Delivery
            </button>
            <button className="border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-red-600 transition flex items-center gap-2 text-lg">
              <span>🏪</span> Recojo en tienda
            </button>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="bg-white py-8 px-4 border-b border-gray-200">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-6 py-2 rounded-full font-semibold transition ${
                  selectedCategory === category.id
                    ? 'bg-yellow-400 text-gray-900'
                    : 'bg-white border-2 border-gray-200 text-gray-700 hover:border-gray-300'
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {pizzas.map((pizza) => (
            <div
              key={pizza.id}
              className="bg-white rounded-3xl shadow-lg overflow-hidden hover:shadow-xl transition transform hover:scale-105"
            >
              {/* Product Image Container */}
              <div className="bg-gradient-to-b from-yellow-300 to-yellow-200 h-48 flex items-center justify-center text-6xl">
                {pizza.image}
              </div>

              {/* Product Info */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {pizza.name}
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  {pizza.description}
                </p>

                {/* Add Button */}
                <button
                  onClick={handleAddToCart}
                  className="w-full bg-red-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-red-700 transition flex items-center justify-center gap-2"
                >
                  <span>+</span> Agregar
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4 mt-16">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-gray-400">© 2026 FOCARELA - El auténtico sabor italiano en Abancay</p>
        </div>
      </footer>
    </div>
  );
}
