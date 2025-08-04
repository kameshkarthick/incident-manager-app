// pages/index.tsx
import { useState, useEffect } from 'react';
import { useAuth } from '../components/AuthProvider';
import { useRouter } from 'next/router';
import IncidentTable from '../components/IncidentTable';
import IncidentModal from '../components/IncidentModal';
import Header from '../components/Header';
import { createIncident, useIncidents } from '../hooks/useIncidents';

const dummyAvatars = [
  'https://i.pravatar.cc/100?img=1',
  'https://i.pravatar.cc/100?img=2',
  'https://i.pravatar.cc/100?img=3',
];

type Incident = {
  id: string;
  summary: string;
  createdAt: string;
};

export default function Home() {
  const { user } = useAuth();
  const router = useRouter();
  const [modalOpen, setModalOpen] = useState(false);
  const { incidents, loading, refetch }= useIncidents()

  useEffect(() => {
    if (user === null) {
      router.push('/login');
    }
  }, [user, router]);

  if (!user) return <div className="p-6">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />

      <main className="min-h-screen bg-gray-100 p-6">
        <div className="max-w-6xl mx-auto">
          <IncidentTable incidents={incidents} onAdd={() => setModalOpen(true)} />
        </div>

        <IncidentModal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          onSubmit={async (incident) => {
            await createIncident(incident.type, incident.description);
            refetch();
          }}
        />
      </main>
    </div>
  );
}