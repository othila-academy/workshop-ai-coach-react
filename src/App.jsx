import { useState } from "react";
import Header from "./components/Header.jsx";
import CoachForm from "./components/CoachForm.jsx";
import SuggestionsList from "./components/SuggestionsList.jsx";
import SavedList from "./components/SavedList.jsx";
import { generateSuggestions, generateSuggestionsMistral } from "./api/llm.js";
// TODO (Étape 6): remplacer useState par un custom hook useLocalStorage
// import useLocalStorage from "./hooks/useLocalStorage.js";

// ✅ Étape 5 (Bonus) : Détection automatique de la disponibilité de Mistral
const MISTRAL_AVAILABLE = !!import.meta.env.VITE_MISTRAL_API_KEY;

export default function App() {
  const [suggestions, setSuggestions] = useState([]);
  const [saved, setSaved] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleGenerate = async (payload) => {
    setError("");
    setLoading(true);
    setSuggestions([]);
    try {
      // ✅ Étape 5 (Bonus) : Utilise Mistral si disponible, sinon fallback sur le mock
      const tips = MISTRAL_AVAILABLE 
        ? await generateSuggestionsMistral(payload)
        : await generateSuggestions(payload);
      setSuggestions(tips);
    } catch (e) {
      setError(e?.message || "Erreur inconnue");
      // En cas d'erreur Mistral, on peut fallback sur le mock
      if (MISTRAL_AVAILABLE) {
        try {
          const mockTips = await generateSuggestions(payload);
          setSuggestions(mockTips);
          setError("⚠️ API Mistral indisponible, mode mock activé.");
        } catch (mockError) {
          setError(e?.message || "Erreur inconnue");
        }
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSave = (tip) => {
    if (!saved.find((t) => t.id === tip.id)) {
      setSaved([tip, ...saved]);
    }
  };

  const handleUnsave = (id) => {
    setSaved(saved.filter((t) => t.id !== id));
  };

  return (
    <div className="container">
      <Header />
      
      {/* ✅ Indicateur de mode (Mock ou Mistral) */}
      {MISTRAL_AVAILABLE && (
        <div style={{ 
          textAlign: "center", 
          padding: "0.75rem", 
          background: "rgba(156, 169, 134, 0.2)",
          borderRadius: "var(--radius-md)",
          marginBottom: "1rem",
          fontSize: "0.9rem",
          color: "var(--bark)"
        }}>
          🤖 Mode <strong>Mistral AI</strong> activé
        </div>
      )}
      
      <CoachForm onGenerate={handleGenerate} disabled={loading} />

      {loading && <div className="loading">⏳ Génération en cours...</div>}
      {error && <div className="error">{error}</div>}

      <h2>Suggestions</h2>
      <SuggestionsList suggestions={suggestions} onSave={handleSave} />

      <h2>Favoris</h2>
      <SavedList saved={saved} onRemove={handleUnsave} />
    </div>
  );
}
