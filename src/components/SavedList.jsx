export default function SavedList({ saved, onRemove }) {
  if (!saved.length) return <p className="muted">Aucun favori.</p>;
  return (
    <ul>
      {saved.map((s) => (
        <li key={s.id}>
          <span>{s.title}</span>
          <button onClick={() => onRemove(s.id)}>Retirer</button>
        </li>
      ))}
    </ul>
  );
}
