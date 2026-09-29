// ✅ Étape 3 : Favoris affichés avec les mêmes cartes stylées
export default function SavedList({ saved, onRemove }) {
  if (!saved.length) {
    return (
      <div className="empty-state">
        <p className="muted" style={{ margin: 0 }}>
          Aucun favori pour l'instant.
          <br />
          Sauvegardez vos suggestions préférées pour les retrouver ici ! ⭐
        </p>
      </div>
    );
  }

  return (
    <div className="grid">
      {saved.map((s) => (
        <div 
          key={s.id} 
          className="card" 
          style={{ 
            marginBottom: "1rem",
            background: "rgba(255, 255, 255, 0.9)",
            position: "relative"
          }}
        >
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
              ⭐ {s.title}
            </h3>
            {s.tag && (
              <span className="tag">{s.tag}</span>
            )}
          </div>

          <p style={{ 
            margin: 0,
            color: "var(--charcoal)",
            lineHeight: "1.7",
            marginBottom: "1rem"
          }}>
            {s.body}
          </p>

          <button 
            className="danger" 
            onClick={() => onRemove(s.id)}
            style={{ marginTop: 0 }}
          >
            🗑️ Retirer
          </button>
        </div>
      ))}
    </div>
  );
}
