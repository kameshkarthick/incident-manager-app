import { Incident } from "@/hooks/useIncidents";

interface IncidentTableProps {
    incidents: Incident[];
    onAdd: () => void;
  }
  
  export default function IncidentTable({ incidents, onAdd }: IncidentTableProps) {
    const formatDate = (dateString: string) => {
      try {
        return new Intl.DateTimeFormat('en-US', {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
        }).format(new Date(dateString));
      } catch {
        return dateString;
      }
    };
  
    return (
      <div className="bg-white rounded-xl shadow overflow-x-auto">
        <div className="flex items-center justify-between px-6 py-4 border-b">
          <h2 className="text-xl font-semibold">Incidents</h2>
          <button
            onClick={onAdd}
            className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
          >
            New Incident
          </button>
        </div>
  
        <table className="w-full text-sm text-left">
          <thead className="bg-gray-50 text-gray-600 uppercase text-xs">
            <tr>
              <th className="px-6 py-3">Description</th>
              <th className="px-6 py-3">Type</th>
              <th className="px-6 py-3">Summary</th>
              <th className="px-6 py-3">Created At</th>
            </tr>
          </thead>
          <tbody>
            {incidents.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-6 py-4 text-center text-gray-500">
                  No incidents found.
                </td>
              </tr>
            ) : (
              incidents.map((incident) => (
                <tr key={incident.id} className="border-t hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium text-gray-900">
                    {incident.description}
                  </td>
                  <td className="px-6 py-4 text-gray-700">{incident.type}</td>
                  <td className="px-6 py-4 font-medium text-gray-900">
                    {incident.summary || '-'}
                  </td>
                  <td className="px-6 py-4 text-gray-500">{formatDate(incident.createdAt)}</td>
                  
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    );
}