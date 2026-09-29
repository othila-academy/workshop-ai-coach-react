import { useState } from "react";

// ✅ Étape 1 & 2 : Formulaire enrichi avec validation complète
export default function CoachForm({ onGenerate, disabled }) {
  const [goal, setGoal] = useState("");
  const [category, setCategory] = useState("bien-etre");
  const [tone, setTone] = useState("bienveillant");
  const [constraints, setConstraints] = useState([]);

  // Validation : 10-140 caractères
  const MIN_CHARS = 10;
  const MAX_CHARS = 140;
  const goalLength = goal.trim().length;
  const isValidLength = goalLength >= MIN_CHARS && goalLength <= MAX_CHARS;
  const remaining = MAX_CHARS - goalLength;

  const handleConstraintChange = (constraint) => {
    setConstraints((prev) =>
      prev.includes(constraint)
        ? prev.filter((c) => c !== constraint)
        : [...prev, constraint]
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isValidLength) return;
    
    onGenerate({ 
      goal: goal.trim(), 
      category, 
      tone, 
      constraints 
    });
    
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
        <div style={{ 
          marginTop: "0.5rem", 
          fontSize: "0.875rem", 
          color: remaining < 0 ? "var(--danger)" : "var(--earth)" 
        }}>
          {goalLength < MIN_CHARS && (
            <span>Minimum {MIN_CHARS} caractères · </span>
          )}
          <span>{remaining} caractères restants</span>
        </div>
      </label>

      <div className="row" style={{ marginTop: "1.25rem" }}>
        <label style={{ flex: 1 }}>
          Catégorie
          <select 
            value={category} 
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="bien-etre">🧘 Bien-être</option>
            <option value="productivite">⚡ Productivité</option>
          </select>
        </label>

        <label style={{ flex: 1 }}>
          Ton
          <select 
            value={tone} 
            onChange={(e) => setTone(e.target.value)}
          >
            <option value="bienveillant">💚 Bienveillant</option>
            <option value="direct">🎯 Direct</option>
            <option value="scientifique">🔬 Scientifique</option>
          </select>
        </label>
      </div>

      <fieldset style={{ 
        border: "2px solid var(--linen)", 
        borderRadius: "var(--radius-md)", 
        padding: "1rem", 
        marginTop: "1.25rem" 
      }}>
        <legend style={{ 
          padding: "0 0.5rem", 
          fontWeight: 600, 
          color: "var(--bark)" 
        }}>
          Contraintes (optionnel)
        </legend>
        
        <label style={{ 
          display: "flex", 
          alignItems: "center", 
          gap: "0.5rem", 
          marginBottom: "0.5rem",
          cursor: "pointer",
          fontWeight: "normal"
        }}>
          <input
            type="checkbox"
            checked={constraints.includes("10min")}
            onChange={() => handleConstraintChange("10min")}
          />
          ⏱️ Maximum 10 minutes par jour
        </label>

        <label style={{ 
          display: "flex", 
          alignItems: "center", 
          gap: "0.5rem", 
          marginBottom: "0.5rem",
          cursor: "pointer",
          fontWeight: "normal"
        }}>
          <input
            type="checkbox"
            checked={constraints.includes("sans-materiel")}
            onChange={() => handleConstraintChange("sans-materiel")}
          />
          🙌 Sans matériel
        </label>

        <label style={{ 
          display: "flex", 
          alignItems: "center", 
          gap: "0.5rem",
          cursor: "pointer",
          fontWeight: "normal"
        }}>
          <input
            type="checkbox"
            checked={constraints.includes("budget-zero")}
            onChange={() => handleConstraintChange("budget-zero")}
          />
          💸 Budget 0 €
        </label>
      </fieldset>

      <button 
        disabled={disabled || !isValidLength} 
        type="submit"
      >
        Générer {isValidLength ? "✨" : "⏳"}
      </button>
    </form>
  );
}
