// components/Header.tsx
import { useRouter } from 'next/router';
import { getAuth } from 'firebase/auth';
import { useAuth } from './AuthProvider';
import { LogOut } from 'lucide-react';

export default function Header() {
  const { user } = useAuth();
  const router = useRouter();
  const auth = getAuth();

  const handleLogout = async () => {
    await auth.signOut();
    router.push('/login');
  };

  if (!user) return null;
  const avatarUrl = user.photoURL;
  const userName = user.displayName || user.email;

  return (
    <header className="bg-white shadow-sm px-6 py-3 flex justify-between items-center">
      <div className="flex items-center gap-4">
        {avatarUrl ? (
          <img
            src={avatarUrl}
            alt="User avatar"
            className="w-10 h-10 rounded-full object-cover"
          />
        ) : (
          <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 font-bold uppercase">
            {userName?.charAt(0)}
          </div>
        )}
        <div className="text-gray-800">
          <div className="text-sm text-gray-500">Logged in as</div>
          <div className="font-medium">{userName}</div>
        </div>
      </div>

      <button
        onClick={handleLogout}
        className="p-2 rounded-full hover:bg-gray-100 transition-colors"
        title="Logout"
        aria-label="Logout"
      >
        <LogOut className="w-5 h-5 text-red-500" />
      </button>
    </header>
  );
}