// ✅ Étape 3 : Affichage avec cartes stylées et état vide amélioré
import SuggestionCard from "./SuggestionCard.jsx";

export default function SuggestionsList({ suggestions, onSave }) {
  if (!suggestions.length) {
    return (
      <div className="empty-state">
        <p className="muted" style={{ margin: 0 }}>
          Aucune suggestion pour l'instant. 
          <br />
          Remplissez le formulaire ci-dessus pour commencer ! 🌱
        </p>
      </div>
    );
  }

  return (
    <div className="grid">
      {suggestions.map((s) => (
        <SuggestionCard 
          key={s.id} 
          suggestion={s} 
          onSave={onSave} 
        />
      ))}
    </div>
  );
}
