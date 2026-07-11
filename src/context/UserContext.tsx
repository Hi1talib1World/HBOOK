import React, { createContext, useContext, useState, useEffect } from 'react';
import { IonToast } from '@ionic/react';
import { badgesData } from '../data/badges';

interface UserContextType {
  username: string | null;
  avatar: string | null;
  xp: number;
  level: number;
  visitedCountries: string[];
  badgesUnlocked: string[];
  quizScores: { flag: number; capital: number; currency: number };
  addXp: (amount: number) => void;
  deductXp: (amount: number) => boolean;
  markVisited: (countryId: string) => void;
  updateQuizScore: (type: 'flag' | 'capital' | 'currency', score: number) => void;
  loginUser: (name: string, avatarPath: string) => void;
  logoutUser: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC = ({ children }) => {
  const [toastMessage, setToastMessage] = useState<string>('');
  // Initialize state from LocalStorage if available
  const [username, setUsername] = useState<string | null>(() => localStorage.getItem('gs_username'));
  const [avatar, setAvatar] = useState<string | null>(() => localStorage.getItem('gs_avatar'));
  const [xp, setXp] = useState<number>(() => parseInt(localStorage.getItem('gs_xp') || '0', 10));
  
  const [visitedCountries, setVisitedCountries] = useState<string[]>(() => {
    const saved = localStorage.getItem('gs_visited');
    return saved ? JSON.parse(saved) : [];
  });
  
  const [badgesUnlocked, setBadgesUnlocked] = useState<string[]>(() => {
    const saved = localStorage.getItem('gs_badges');
    return saved ? JSON.parse(saved) : [];
  });

  const [quizScores, setQuizScores] = useState<{ flag: number; capital: number; currency: number }>(() => {
    const saved = localStorage.getItem('gs_quiz_scores');
    return saved ? JSON.parse(saved) : { flag: 0, capital: 0, currency: 0 };
  });

  const level = Math.floor(xp / 100) + 1;

  // Multi-tab synchronization
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'gs_xp') setXp(parseInt(e.newValue || '0', 10));
      if (e.key === 'gs_visited') setVisitedCountries(JSON.parse(e.newValue || '[]'));
      if (e.key === 'gs_badges') setBadgesUnlocked(JSON.parse(e.newValue || '[]'));
      if (e.key === 'gs_quiz_scores') setQuizScores(JSON.parse(e.newValue || '{"flag":0,"capital":0,"currency":0}'));
      if (e.key === 'gs_username') setUsername(e.newValue);
      if (e.key === 'gs_avatar') setAvatar(e.newValue);
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  // Persist State Changes to LocalStorage
  useEffect(() => {
    if (username) localStorage.setItem('gs_username', username);
    else localStorage.removeItem('gs_username');
    
    if (avatar) localStorage.setItem('gs_avatar', avatar);
    else localStorage.removeItem('gs_avatar');

    localStorage.setItem('gs_xp', xp.toString());
    localStorage.setItem('gs_visited', JSON.stringify(visitedCountries));
    localStorage.setItem('gs_badges', JSON.stringify(badgesUnlocked));
    localStorage.setItem('gs_quiz_scores', JSON.stringify(quizScores));
  }, [username, avatar, xp, visitedCountries, badgesUnlocked, quizScores]);

  const loginUser = (name: string, avatarPath: string) => {
    setUsername(name);
    setAvatar(avatarPath);
  };

  const logoutUser = () => {
    setUsername(null);
    setAvatar(null);
    setXp(0);
    setVisitedCountries([]);
    setBadgesUnlocked([]);
    setQuizScores({ flag: 0, capital: 0, currency: 0 });
    localStorage.clear();
  };

  const addXp = (amount: number) => {
    setXp(prev => prev + amount);
  };

  const deductXp = (amount: number) => {
    if (xp >= amount) {
      setXp(prev => prev - amount);
      return true;
    }
    return false;
  };

  const markVisited = (countryId: string) => {
    if (!visitedCountries.includes(countryId)) {
      setVisitedCountries(prev => [...prev, countryId]);
      addXp(50);
    }
  };

  const updateQuizScore = (type: 'flag' | 'capital' | 'currency', score: number) => {
    setQuizScores(prev => ({
      ...prev,
      [type]: Math.max(prev[type], score)
    }));
  };

  // Badge unlock engine
  useEffect(() => {
    const newBadges = [...badgesUnlocked];
    const newlyUnlocked: string[] = [];

    const checkAndUnlock = (id: string) => {
      if (!newBadges.includes(id)) {
        newBadges.push(id);
        newlyUnlocked.push(id);
      }
    };

    if (visitedCountries.length >= 1) checkAndUnlock('first_spin');
    if (visitedCountries.includes('france')) checkAndUnlock('europe_expert');
    if (visitedCountries.length >= 3) checkAndUnlock('flag_bearer');
    if (visitedCountries.length >= 5) checkAndUnlock('globe_trotter');
    if (xp >= 1000) checkAndUnlock('trivia_king');

    if (newBadges.length !== badgesUnlocked.length) {
      setBadgesUnlocked(newBadges);
      
      // Notify the user of the last unlocked badge
      if (newlyUnlocked.length > 0) {
        const lastBadgeId = newlyUnlocked[newlyUnlocked.length - 1];
        const badgeDef = badgesData.find(b => b.id === lastBadgeId);
        if (badgeDef) {
          setToastMessage(`🏆 Badge Unlocked: ${badgeDef.name}!`);
        }
      }
    }
  }, [visitedCountries, xp, badgesUnlocked]);

  return (
    <UserContext.Provider value={{ 
      username, avatar, xp, level, visitedCountries, badgesUnlocked, quizScores,
      addXp, deductXp, markVisited, updateQuizScore, loginUser, logoutUser 
    }}>
      {children}
      <IonToast
        isOpen={!!toastMessage}
        message={toastMessage}
        duration={3000}
        onDidDismiss={() => setToastMessage('')}
        position="top"
        color="tertiary"
      />
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
