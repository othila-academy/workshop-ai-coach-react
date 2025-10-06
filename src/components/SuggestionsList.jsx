// TODO (Étape 3): transformer ce rendu basique en cartes stylées (SuggestionCard)
export default function SuggestionsList({ suggestions, onSave }) {
  if (!suggestions.length) return <p className="muted">Aucune suggestion pour l'instant.</p>;
  return (
    <ul>
      {suggestions.map((s) => (
        <li key={s.id}>
          <strong>{s.title}</strong> — {s.body}
          <div><button onClick={() => onSave(s)}>⭐ Sauvegarder</button></div>
        </li>
      ))}
    </ul>
  );
}
