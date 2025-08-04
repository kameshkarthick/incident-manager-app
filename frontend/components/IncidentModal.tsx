import { X, FileText } from 'lucide-react';
import { useState } from 'react';

export default function IncidentModal({
  open,
  onClose,
  onSubmit,
}: {
  open: boolean;
  onClose: () => void;
  onSubmit: (incident: {
    type: string;
    description: string;
  }) => void;
}) {
  const [type, setType] = useState('');
  const [description, setDescription] = useState('');

  if (!open) return null;

  const handleSubmit = () => {
    if (!type || !description) return;
    onSubmit({ type, description });
    onClose();
    setType('');
    setDescription('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white w-full max-w-md rounded-xl shadow-xl p-6 relative">
        <button
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-700"
          onClick={onClose}
        >
          <X className="w-5 h-5" />
        </button>
        <div className="flex items-center space-x-2 mb-4">
          <FileText className="text-indigo-600" />
          <h2 className="text-xl font-semibold">Report New Incident</h2>
        </div>

        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-gray-700">Type</label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="mt-1 w-full rounded-md border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            >
              <option value="">Select Type</option>
              <option value="fall">Fall</option>
              <option value="behaviour">Behaviour</option>
            </select>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">Description</label>
            <div className="relative">
              <input
                type="text"
                placeholder="Describe the incident"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="mt-1 w-full rounded-md border border-gray-300 px-4 py-2 pl-10 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
              <FileText className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
            </div>
          </div>
        </div>

        <div className="mt-6 flex justify-end space-x-3">
          <button
            className="bg-gray-100 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-200"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
            onClick={handleSubmit}
            disabled={!type || !description}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}