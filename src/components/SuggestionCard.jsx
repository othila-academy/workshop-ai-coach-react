// ✅ Étape 3 : Composant carte stylée pour afficher une suggestion
export default function SuggestionCard({ suggestion, onSave }) {
  return (
    <div className="card" style={{ 
      marginBottom: "1rem",
      background: "rgba(255, 255, 255, 0.9)",
      position: "relative"
    }}>
      <div style={{ 
        display: "flex", 
        justifyContent: "space-between", 
        alignItems: "flex-start",
        gap: "1rem",
        marginBottom: "0.75rem"
      }}>
        <h3 style={{ 
          margin: 0,
          color: "var(--primary-dark)",
          fontSize: "1.25rem",
          fontWeight: 600,
          flex: 1
        }}>
          {suggestion.title}
        </h3>
        {suggestion.tag && (
          <span className="tag">{suggestion.tag}</span>
        )}
      </div>

      <p style={{ 
        margin: 0,
        color: "var(--charcoal)",
        lineHeight: "1.7",
        marginBottom: "1rem"
      }}>
        {suggestion.body}
      </p>

      <button 
        className="secondary" 
        onClick={() => onSave(suggestion)}
        style={{ marginTop: 0 }}
      >
        ⭐ Sauvegarder
      </button>
    </div>
  );
}
