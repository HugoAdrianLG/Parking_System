'use client';
import { useState, useEffect } from 'react';
import api from '@/services/api';

interface VehicleType {
  id: number;
  type_name: string;
}

export default function EntryForm({ close }: { close: () => void }) {
  const [plate, setPlate] = useState('');
  const [typeId, setTypeId] = useState<number>(1);
  const [types, setTypes] = useState<VehicleType[]>([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    api.get('/getTypes')
      .then((res) => setTypes(res.data))
      .catch(() => setMessage('Error cargando tipos de vehículos'));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post('/entry', { plate, type_id: typeId });
      setMessage('Entrada registrada correctamente');
      setTimeout(() => {
        close();
      }, 1000);
    } catch (err) {
      setMessage('Error al registrar entrada');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 space-y-4">

      <h2 className="text-xl font-bold">Registrar Entrada</h2>
      
      <button
        type="button"
        onClick={close}
        className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 font-bold text-xl"
        aria-label="Cerrar modal">
        &times;
      </button>

      <input
        type="text"
        placeholder="Placa"
        value={plate}
        onChange={(e) => setPlate(e.target.value)}
        className="w-full p-2 border rounded"
        required
      />

      <select
        value={typeId}
        onChange={(e) => setTypeId(Number(e.target.value))}
        className="w-full p-2 border rounded"
      >
        {types.map((type) => (
          <option key={type.id} value={type.id}>
            {type.type_name}
          </option>
        ))}
      </select>

      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
        Registrar Entrada
      </button>

      {message && <p className="text-sm text-gray-700">{message}</p>}
    </form>
  );
}
