import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const CreateTaskPage = () => {
  const [formData, setFormData] = useState({ title: "", description: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_URL_API;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title || !formData.description) return;
    try {
      const response = await fetch(`${API_URL}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, completed: false }),
      });
      if (!response.ok) {
        throw new Error("Error al guardar la tarea");
      }
      navigate("/");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-lg">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Crear Tarea</h1>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="text"
              name="title"
              placeholder="Título"
              value={formData.title}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <input
              type="text"
              name="description"
              placeholder="Descripción"
              value={formData.description}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div className="flex justify-between items-center pt-4">
            <Link 
              to="/" 
              className="text-gray-600 hover:text-gray-800 transition-colors"
            >
              Volver al inicio
            </Link>
            <button 
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded-lg transition-colors"
            >
              Guardar tarea
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateTaskPage;
