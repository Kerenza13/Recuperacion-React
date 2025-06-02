import React, { useState, useEffect } from "react";
import { useHorario } from "../context/HorarioContext";
import { useCita } from "../context/CitaContext";
import { useAuth } from "../context/AuthContext";

const BookingPage = () => {
  const {
    horariosDisponibles,
    seleccionarFecha,
    verificarDisponibilidad,
    loading,
    error: horariosError,
  } = useHorario();
  const { selectedServices, addService, removeService } = useCita();
  const { token: userId } = useAuth();

  const [fecha, setFecha] = useState("");
  const [selectedHour, setSelectedHour] = useState(null);
  const [services, setServices] = useState([]);
  const [error, setError] = useState(null);
  const [bookingLoading, setBookingLoading] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);

  const API_URL = import.meta.env.VITE_URL_API;

  // Fetch all services to display
  useEffect(() => {
    setError(null);
    fetch(`${API_URL}services`)
      .then((res) => {
        if (!res.ok) {
          setError("Error al cargar servicios");
          return null;
        }
        return res.json();
      })
      .then((data) => {
        if (data) setServices(data);
      })
      .catch(() => setError("Error al cargar servicios"));
  }, [API_URL]);

  const handleDateChange = (e) => {
    const selectedDate = e.target.value;
    setFecha(selectedDate);
    seleccionarFecha(selectedDate);
    setSelectedHour(null);
    setError(null);
    setBookingSuccess(false);
  };

  const handleServiceToggle = (service) => {
    if (selectedServices.some((s) => s.id === service.id)) {
      removeService(service.id);
    } else {
      addService(service);
    }
    setError(null);
    setBookingSuccess(false);
  };

  const totalDuration = selectedServices.reduce(
    (acc, s) => acc + s.duration,
    0
  );

  const handleHourSelect = (hora) => {
    setSelectedHour(hora);
    setError(null);
    setBookingSuccess(false);
  };

  const isTimeAvailable = () => {
    if (!selectedHour || totalDuration === 0) return false;
    return verificarDisponibilidad(selectedHour, totalDuration);
  };

  const getDateTimeISOString = () => {
    if (!fecha || !selectedHour) return null;
    const [year, month, day] = fecha.split("-").map(Number);
    const hour = selectedHour.getHours();
    const minute = selectedHour.getMinutes();
    const dateTime = new Date(year, month - 1, day, hour, minute, 0, 0);
    return dateTime.toISOString();
  };

  const handleBookingSubmit = () => {
    setError(null);
    setBookingSuccess(false);

    if (!userId) {
      setError("Debes iniciar sesión para reservar una cita.");
      return;
    }
    if (selectedServices.length === 0) {
      setError("Selecciona al menos un servicio.");
      return;
    }
    if (!fecha) {
      setError("Selecciona una fecha.");
      return;
    }
    if (!selectedHour) {
      setError("Selecciona una hora.");
      return;
    }
    if (!isTimeAvailable()) {
      setError("El horario seleccionado no está disponible.");
      return;
    }

    const dateISO = getDateTimeISOString();
    if (!dateISO) {
      setError("Fecha u hora inválida.");
      return;
    }

    const body = {
      userId,
      date: dateISO,
      services: selectedServices.map((s) => s.id),
      duration: totalDuration,
      status: "pendiente",
    };

    setBookingLoading(true);

    fetch(`${API_URL}appointments`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    })
      .then((res) => {
        if (!res.ok) {
          return res.json().then((errData) => {
            setError(errData.message || "Error al guardar la cita.");
            return null;
          });
        }
        return res.json();
      })
      .then((data) => {
        if (data) {
          setBookingSuccess(true);
        }
      })
      .catch(() => {
        setError("Error al guardar la cita.");
      })
      .finally(() => setBookingLoading(false));
  };

  return (
    <div className="p-6 max-w-lg mx-auto">
      <h2 className="text-3xl font-bold mb-6">Reserva de Cita</h2>

      <section className="mb-6">
        <h3 className="font-semibold mb-2">Servicios a realizar:</h3>
        {services.length === 0 && !error && <p>Cargando servicios...</p>}
        {services.map((service) => (
          <label
            key={service.id}
            className="block mb-1 cursor-pointer select-none"
          >
            <input
              type="checkbox"
              checked={selectedServices.some((s) => s.id === service.id)}
              onChange={() => handleServiceToggle(service)}
              className="mr-2"
            />
            {service.name} — ${service.price.toFixed(2)} — {service.duration}{" "}
            min — {service.category}
          </label>
        ))}
      </section>

      <section className="mb-6">
        <label className="block font-semibold mb-2" htmlFor="fecha">
          Selecciona una fecha:
        </label>
        <input
          id="fecha"
          type="date"
          value={fecha}
          onChange={handleDateChange}
          className="w-full border rounded px-4 py-2"
          min={new Date().toISOString().split("T")[0]}
        />
      </section>

      <section className="mb-6">
        <h3 className="font-semibold mb-2">Selecciona una hora:</h3>
        {loading && <p>Cargando horarios...</p>}
        {horariosError && <p className="text-red-600 mb-2">{horariosError}</p>}

        <div className="flex flex-wrap gap-2">
          {horariosDisponibles.length === 0 && !loading && (
            <p>No hay horarios disponibles para esta fecha.</p>
          )}
          {horariosDisponibles.map((hora, i) => {
            const isSelected = selectedHour?.getTime() === hora.getTime();
            return (
              <button
                key={i}
                onClick={() => handleHourSelect(hora)}
                className={`px-4 py-2 border rounded transition ${
                  isSelected
                    ? "bg-blue-600 text-white"
                    : "bg-white text-gray-800 hover:bg-blue-100"
                }`}
              >
                {hora.toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </button>
            );
          })}
        </div>
      </section>

      <section className="mb-6">
        <p>
          <strong>Duración total:</strong> {totalDuration} minutos
        </p>
      </section>

      {error && <p className="text-red-600 mb-4">{error}</p>}
      {bookingSuccess && (
        <p className="text-green-600 mb-4">¡Cita reservada con éxito!</p>
      )}

      <button
        disabled={bookingLoading}
        onClick={handleBookingSubmit}
        className={`w-full py-3 rounded text-white font-semibold transition ${
          bookingLoading
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-blue-600 hover:bg-blue-700"
        }`}
      >
        {bookingLoading ? "Guardando..." : "Reservar Cita"}
      </button>
    </div>
  );
};

export default BookingPage;
