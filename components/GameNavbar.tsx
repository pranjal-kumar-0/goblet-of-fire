"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface TeamInfo {
  teamId: string;
  name: string;
  house: string;
}

interface GameNavbarProps {
  children: React.ReactNode;
  className?: string;
}

export default function GameNavbar({ children, className = "min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-black via-red-950 to-black px-4" }: GameNavbarProps) {
  const [teamInfo, setTeamInfo] = useState<TeamInfo | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const storedTeamInfo = localStorage.getItem('teamInfo');
    if (storedTeamInfo) {
      setTeamInfo(JSON.parse(storedTeamInfo));
    } else {
      router.push('/auth/login');
    }
    setIsLoading(false);
  }, [router]);

  const getHouseInfo = (houseString: string) => {
    const house = houseString?.toLowerCase() || '';
    
    if (house.includes('gryffindor')) {
      return { color: 'from-red-600 to-red-800', name: 'Gryffindor' };
    } else if (house.includes('slytherin')) {
      return { color: 'from-green-600 to-green-800', name: 'Slytherin' };
    } else if (house.includes('hufflepuff')) {
      return { color: 'from-yellow-600 to-yellow-800', name: 'Hufflepuff' };
    } else if (house.includes('ravenclaw')) {
      return { color: 'from-blue-600 to-blue-800', name: 'Ravenclaw' };
    } else {
      return { color: 'from-yellow-600 to-yellow-800', name: 'Unknown House' };
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('teamInfo');
    router.push('/');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-black via-red-950 to-black">
        <div className="text-yellow-300 font-['Cinzel_Decorative'] text-2xl">Loading...</div>
      </div>
    );
  }

  if (!teamInfo) {
    return null; // Will redirect to login
  }

  const houseInfo = getHouseInfo(teamInfo.house);

  return (
    <div className={className}>
      {/* Team Info Header */}
      <div className="absolute top-6 right-6 flex items-center space-x-4 z-50">
        <div className="text-right">
          <div className="text-yellow-200 font-['Cinzel_Decorative'] text-lg">{teamInfo.name}</div>
         
        </div>
        <button 
          onClick={handleLogout}
          className="px-4 py-2 text-sm bg-red-800 hover:bg-red-700 text-white rounded-lg transition-colors"
        >
          Logout
        </button>
      </div>
      {children}
    </div>
  );
}