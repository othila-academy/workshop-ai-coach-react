// ✅ Étape 6 (Bonus) : Custom hook pour persister l'état dans localStorage
import { useState, useEffect } from "react";

export default function useLocalStorage(key, initialValue) {
  // Initialisation : lecture depuis localStorage ou valeur par défaut
  const [val, setVal] = useState(() => {
    try {
      const stored = localStorage.getItem(key);
      return stored ? JSON.parse(stored) : initialValue;
    } catch (error) {
      console.error(`Erreur lecture localStorage (${key}):`, error);
      return initialValue;
    }
  });

  // Sauvegarde dans localStorage à chaque modification
  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(val));
    } catch (error) {
      console.error(`Erreur écriture localStorage (${key}):`, error);
    }
  }, [key, val]);

  return [val, setVal];
}
