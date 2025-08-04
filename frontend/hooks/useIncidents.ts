import { useEffect, useState } from 'react';
import { auth } from '../lib/firebase';
import { getApiUrl } from '../lib/api';
import toast from 'react-hot-toast';

export type Incident = {
  id: number;
  userId: string;
  type: string;
  description: string;
  summary?: string;
  createdAt: string;
};

export function useIncidents() {
  const [incidents, setIncidents] = useState<Incident[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchIncidents = async () => {
    if (!auth.currentUser) {
      toast.error('You must be logged in to view incidents.');
      setLoading(false);
      return;
    }

    try {
      const token = await auth.currentUser.getIdToken();
      const res = await fetch(getApiUrl('/incidents'), {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) {
        const error = await res.json();
        toast.error(error.error || 'Failed to fetch incidents');
        setLoading(false);
        return;
      }

      const data = await res.json();
      setIncidents(data);
    } catch (error) {
      toast.error('An unexpected error occurred while fetching incidents.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchIncidents();
  }, []);

  return { incidents, loading, refetch: fetchIncidents };
}

export async function createIncident(type: string, description: string) {
  if (!auth.currentUser) {
    toast.error('You must be logged in to create an incident.');
    return;
  }

  try {
    const token = await auth.currentUser.getIdToken();
    const res = await fetch(getApiUrl('/incidents'), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ type, description }),
    });

    if (!res.ok) {
      const error = await res.json();
      toast.error(error.error || error.message || 'Failed to create incident');
      return;
    }

    const data = await res.json();
    toast.success('Incident created successfully!');
    return data;
  } catch (error) {
    toast.error('An unexpected error occurred while creating incident.');
    console.log(error);
    return;
  }
}