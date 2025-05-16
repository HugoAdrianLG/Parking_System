'use client';
import { useEffect, useState } from 'react';
import api from '@/services/api';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

interface ReportEntry {
  id: number;
  plate: string;
  type: string;
  ppm: number;
  entry_time: string;
  exit_time: string | null;
}

export default function VehicleTable() {
  const [data, setData] = useState<ReportEntry[]>([]);
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');

  const fetchReport = async () => {
    try {
      let res;
      if (from && to) {
        res = await api.get('/report', {
          params: { from, to },
        });
      } else {
        res = await api.get('/report');
      }
      setData(res.data);
    } catch (err) {
      console.error('Error cargando reporte', err);
    }
  };

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(
      data.map(item => ({
        Placa: item.plate,
        Tipo: item.type,
        'Tarifa por Minuto': `$${item.ppm}`,
        'Hora de Entrada': item.entry_time,
        'Hora de Salida': item.exit_time || '---',
      }))
    );

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Reporte');

    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const file = new Blob([excelBuffer], { type: 'application/octet-stream' });
    saveAs(file, 'reporte_estacionamiento.xlsx');
  };

  useEffect(() => {
    fetchReport();
  }, []);

  return (
    <div className="p-4 space-y-4">
      <h2 className="text-xl font-bold">Reporte General</h2>

      <div className="flex flex-wrap gap-2 items-center">
        <input
          type="datetime-local"
          value={from}
          onChange={(e) => setFrom(e.target.value)}
          className="border px-2 py-1 rounded"
        />
        <input
          type="datetime-local"
          value={to}
          onChange={(e) => setTo(e.target.value)}
          className="border px-2 py-1 rounded"
        />
        <button
          onClick={fetchReport}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Cargar Reporte
        </button>
        <button
          onClick={exportToExcel}
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          Exportar Excel
        </button>
      </div>

      <table className="w-full mt-4 border-collapse">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">Placa</th>
            <th className="border p-2">Tipo</th>
            <th className="border p-2">Tarifa</th>
            <th className="border p-2">Entrada</th>
            <th className="border p-2">Salida</th>
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td colSpan={5} className="text-center p-4 text-gray-500">
                No hay datos disponibles
              </td>
            </tr>
          ) : (
            data.map((v) => (
              <tr key={v.id}>
                <td className="border p-2">{v.plate}</td>
                <td className="border p-2">{v.type}</td>
                <td className="border p-2">${v.ppm}</td>
                <td className="border p-2"> {new Date(v.entry_time).toLocaleString('es-MX', { timeZone: 'America/Mexico_City' })}</td>
                <td className="border p-2"> {v.exit_time ? new Date(v.exit_time).toLocaleString('es-MX', { timeZone: 'America/Mexico_City' }) : '---'}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
