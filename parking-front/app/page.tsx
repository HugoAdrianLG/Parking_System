'use client';

import { useState } from 'react';
import Navbar from '../components/Navbar'
import EntryForm from '../components/EntryForm';
import ExitForm from '../components/ExitForm';
import VehicleTable from '@/components/VehicleTable';

export default function HomePage() {
  const [showEntry, setShowEntry] = useState(false);
  const [showExit, setShowExit] = useState(false);

  return (
    <div>
      <Navbar setShowEntry={setShowEntry} setShowExit={setShowExit} />

      <main className="p-4 space-y-6">
        <VehicleTable />
      </main>

      {showEntry && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <EntryForm close={() => setShowEntry(false)} />
          </div>
        </div>
      )}
      {showExit && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <ExitForm close={() => setShowExit(false)} />
          </div>
        </div>
      )}
    </div>
  );
}
