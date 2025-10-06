// TODO (Étape 6): implémenter ce custom hook puis l'utiliser dans App.jsx
// Signature attendue: const [val, setVal] = useLocalStorage(key, initialValue)
import { useState, useEffect } from "react";

export default function useLocalStorage(key, initialValue) {
  const [val, setVal] = useState(initialValue);

  useEffect(() => {
    // TODO: lire la valeur depuis localStorage au montage
  }, [key]);

  useEffect(() => {
    // TODO: persister 'val' dans localStorage
  }, [key, val]);

  return [val, setVal];
}
