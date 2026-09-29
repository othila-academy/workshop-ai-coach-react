import { useState } from "react";
import Header from "./components/Header.jsx";
import CoachForm from "./components/CoachForm.jsx";
import SuggestionsList from "./components/SuggestionsList.jsx";
import SavedList from "./components/SavedList.jsx";
import { generateSuggestions } from "./api/llm.js";
// TODO (Étape 6): remplacer useState par un custom hook useLocalStorage
// import useLocalStorage from "./hooks/useLocalStorage.js";

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
      const tips = await generateSuggestions(payload);
      setSuggestions(tips);
    } catch (e) {
      setError(e?.message || "Erreur inconnue");
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
      <CoachForm onGenerate={handleGenerate} disabled={loading} />

      {loading && <p>⏳ Génération en cours...</p>}
      {error && <p className="muted">⚠️ {error}</p>}

      <h2>Suggestions</h2>
      <SuggestionsList suggestions={suggestions} onSave={handleSave} />

      <h2>Favoris</h2>
      <SavedList saved={saved} onRemove={handleUnsave} />
    </div>
  );
}
