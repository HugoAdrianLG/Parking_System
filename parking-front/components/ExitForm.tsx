'use client';
import { useState } from 'react';
import api from '@/services/api';

export default function ExitForm({ close }: { close: () => void }) {
  const [plate, setPlate] = useState('');
  const [response, setResponse] = useState<null | any>(null);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setResponse(null);
    try {
      const res = await api.post('/exit', { plate });
      setResponse(res.data);
    } catch (err) {
      setError('Vehículo no encontrado o ya salió');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 space-y-4">
      
      <button
        type="button"
        onClick={close}
        className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 font-bold text-xl"
        aria-label="Cerrar modal">
        &times;
      </button>

      <h2 className="text-xl font-bold">Registrar Salida</h2>

      <input
        type="text"
        placeholder="Placa"
        value={plate}
        onChange={(e) => setPlate(e.target.value)}
        className="w-full p-2 border rounded"
        required
      />

      <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">
        Registrar Salida
      </button>

      {error && <p className="text-red-500">{error}</p>}

      {response && (
        <div className="mt-2 text-sm text-gray-700">
          <p><strong>Placa:</strong> {response.plate}</p>
          <p><strong>Tipo:</strong> {response.type}</p>
          <p><strong>Minutos:</strong> {response.minutes}</p>
          <p><strong>Tarifa:</strong> ${response.rate}</p>
          <p><strong>Total:</strong> ${response.amount}</p>
        </div>
      )}
    </form>
  );
}
