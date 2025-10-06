import { useState } from "react";

// Version starter minimale : un objectif + un bouton.
// TODO (Étape 1): ajouter catégorie (bien-être / productivité) et ton (bienveillant / direct / scientifique)
// TODO (Étape 2): validation 10–140 caractères + compteur restant

export default function CoachForm({ onGenerate, disabled }) {
  const [goal, setGoal] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO (Étape 2): empêcher la soumission si invalide
    onGenerate({ goal, category: "bien-etre", tone: "bienveillant", constraints: [] });
    setGoal("");
  };

  return (
    <form className="card" onSubmit={handleSubmit}>
      <label>
        Ton objectif
        <textarea
          value={goal}
          onChange={(e) => setGoal(e.target.value)}
          placeholder="Ex : M'organiser le matin pour être plus serein(e)"
          rows={3}
        />
      </label>

      {/* TODO (Étape 1): ajouter select catégorie + select ton */}
      {/* TODO (Étape 1): ajouter des contraintes via checkbox (10 min/jour, sans matériel, budget 0€) */}

      <button disabled={disabled} type="submit">Générer</button>
    </form>
  );
}
