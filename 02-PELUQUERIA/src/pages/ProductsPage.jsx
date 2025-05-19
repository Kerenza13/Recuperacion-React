import React, { useEffect, useState } from "react";

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_URL = import.meta.env.VITE_URL_API;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`${API_URL}/products`);
        if (!response.ok) {
          throw new Error("Error al cargar los productos");
        }
        const data = await response.json();
        setProducts(data);
      } catch (err) {
        setError(err.message || "Error al cargar los productos");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [API_URL]);

  if (loading) return <p className="p-4">Cargando productos...</p>;
  if (error) return <p className="p-4 text-red-500">{error}</p>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Productos Disponibles</h2>
      {products.length === 0 ? (
        <p className="text-gray-600">
          No hay productos disponibles en este momento.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="border p-4 rounded-lg shadow hover:shadow-md transition"
            >
              <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
              <p>Marca: {product.brand}</p>
              <p>{product.description}</p>
              <p>Precio: ${product.price.toFixed(2)}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductsPage;
