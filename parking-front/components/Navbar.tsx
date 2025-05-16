// components/Navbar.tsx
'use client';

import { Dispatch, SetStateAction } from 'react';

type Props = {
  setShowEntry: Dispatch<SetStateAction<boolean>>;
  setShowExit: Dispatch<SetStateAction<boolean>>;
};

export default function Navbar({ setShowEntry, setShowExit }: Props) {
  return (
    
  <nav className="bg-gray-800 text-white px-4 py-4 flex justify-between items-center">
    <h1 className="text-lg font-bold">Sistema de Estacionamiento</h1>

    <div className="flex gap-4">
      <button onClick={() => setShowEntry(true)} className="hover:underline">
        Registrar Entrada
      </button>
      <button onClick={() => setShowExit(true)} className="hover:underline">
        Marcar Salida
      </button>
    </div>
  </nav>
  );
}
