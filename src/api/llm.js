// ✅ Étape 4 : Mock intelligent avec 3 suggestions variées selon catégorie/ton/contraintes
// TODO (Étape 5 - Bonus): brancher Mistral (voir README)

const makeId = () => Math.random().toString(36).slice(2, 9);

// Banques de conseils par catégorie
const wellnessTips = {
  bienveillant: [
    {
      title: "Rituel matinal doux",
      body: "Commence chaque journée par 5 minutes de respiration consciente. Cela t'aidera progressivement à {goal}.",
      tag: "🧘 Bien-être"
    },
    {
      title: "Journal de gratitude",
      body: "Note 3 petites choses positives chaque soir. Cette pratique douce renforce ton bien-être en lien avec {goal}.",
      tag: "🧘 Bien-être"
    },
    {
      title: "Micro-pause nature",
      body: "Accorde-toi 10 minutes par jour dehors, même sur un balcon. La connexion à la nature soutient {goal}.",
      tag: "🧘 Bien-être"
    }
  ],
  direct: [
    {
      title: "Action immédiate",
      body: "Identifie LA première action concrète pour {goal} et fais-la dans les 24h. Pas d'excuses.",
      tag: "🎯 Direct"
    },
    {
      title: "Bloque ton agenda",
      body: "Réserve 15 minutes par jour à heure fixe pour {goal}. Traite ce rendez-vous comme non-négociable.",
      tag: "🎯 Direct"
    },
    {
      title: "Mesure tes progrès",
      body: "Définis 1 indicateur simple pour suivre {goal} et note-le quotidiennement. Ce qui se mesure s'améliore.",
      tag: "🎯 Direct"
    }
  ],
  scientifique: [
    {
      title: "Approche evidence-based",
      body: "Les études montrent que l'exposition progressive est efficace. Applique cette méthode à {goal} sur 21 jours.",
      tag: "🔬 Science"
    },
    {
      title: "Neuroplasticité guidée",
      body: "Ton cerveau crée de nouvelles connexions par répétition. Pratique une micro-habitude liée à {goal} à la même heure.",
      tag: "🔬 Science"
    },
    {
      title: "Optimisation circadienne",
      body: "Aligne {goal} avec ton rythme biologique : énergie haute le matin, consolidation le soir.",
      tag: "🔬 Science"
    }
  ]
};

const productivityTips = {
  bienveillant: [
    {
      title: "Un pas à la fois",
      body: "Divise {goal} en petites étapes. Célèbre chaque micro-victoire, c'est important pour ta motivation.",
      tag: "⚡ Productivité"
    },
    {
      title: "Environnement bienveillant",
      body: "Crée un espace de travail agréable et rangé. Un environnement positif facilite {goal}.",
      tag: "⚡ Productivité"
    },
    {
      title: "Énergie avant performance",
      body: "Respecte tes cycles d'énergie. Travaille sur {goal} quand tu te sens naturellement disponible.",
      tag: "⚡ Productivité"
    }
  ],
  direct: [
    {
      title: "Timeboxing strict",
      body: "Alloue 25 minutes chrono à {goal}, puis pause de 5 min. Répète. La contrainte crée l'efficacité.",
      tag: "⚡ Productivité"
    },
    {
      title: "Élimination impitoyable",
      body: "Identifie 3 distractions qui sabotent {goal} et supprime-les aujourd'hui. Focus = résultats.",
      tag: "⚡ Productivité"
    },
    {
      title: "Batch processing",
      body: "Regroupe toutes les tâches similaires pour {goal} et traite-les d'un coup. Stop au multitasking.",
      tag: "⚡ Productivité"
    }
  ],
  scientifique: [
    {
      title: "Effet Zeigarnik",
      body: "Commence {goal} sans le finir en une fois. Les tâches inachevées restent en mémoire et te poussent à continuer.",
      tag: "🔬 Science"
    },
    {
      title: "Loi de Parkinson inversée",
      body: "Réduis ton temps alloué à {goal} de 30%. La contrainte temporelle stimule l'efficience cognitive.",
      tag: "🔬 Science"
    },
    {
      title: "Charge cognitive optimale",
      body: "Limite à 3 tâches max par session pour {goal}. La surcharge mentale diminue la performance de 40%.",
      tag: "🔬 Science"
    }
  ]
};

// Modificateurs de contraintes
const constraintModifiers = {
  "10min": " (adaptable en 10 min)",
  "sans-materiel": " (sans aucun équipement)",
  "budget-zero": " (100% gratuit)"
};

export async function generateSuggestions({ goal, category, tone, constraints }) {
  // Simule une "latence réseau"
  await new Promise((r) => setTimeout(r, 600));

  // Sélectionne la banque appropriée
  const tipsBank = category === "bien-etre" ? wellnessTips : productivityTips;
  const tips = tipsBank[tone] || tipsBank.bienveillant;

  // Applique les contraintes
  const constraintSuffix = constraints
    .map(c => constraintModifiers[c])
    .join(", ");

  // Retourne 3 suggestions variées
  return tips.map((tip) => ({
    id: makeId(),
    title: tip.title + (constraints.length > 0 ? " ⚡" : ""),
    body: tip.body.replace("{goal}", `"${goal}"`) + constraintSuffix,
    tag: tip.tag
  }));
}

// Exemple pour la suite (bonus) — à activer quand prêt :
// export async function generateSuggestionsMistral({ goal, category, tone, constraints }) {
//   const key = import.meta.env.VITE_MISTRAL_API_KEY;
//   if (!key) throw new Error("VITE_MISTRAL_API_KEY manquante.");
//   const system = `Tu es un coach ${category}. Ton:${tone}. Contraintes:${constraints?.join(", ")||"aucune"}.
//   Donne 3 conseils courts, concrets, JSON strict: [{\"title\", \"body\", \"tag\"}].`;
//   const res = await fetch("https://api.mistral.ai/v1/chat/completions", {
//     method: "POST",
//     headers: { "Authorization": `Bearer ${key}`, "Content-Type": "application/json" },
//     body: JSON.stringify({
//       model: "open-mistral-7b",
//       messages: [ { role: "system", content: system }, { role: "user", content: `Objectif: ${goal}` } ],
//       temperature: 0.7
//     })
//   });
//   if (!res.ok) throw new Error(await res.text());
//   const data = await res.json();
//   let content = data?.choices?.[0]?.message?.content ?? "[]";
//   let parsed;
//   try { parsed = JSON.parse(content); } catch { parsed = []; }
//   return parsed.slice(0,3).map((t) => ({ id: makeId(), title: t.title || "Conseil", body: t.body || "", tag: t.tag || "IA" }));
// }
