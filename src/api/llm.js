// STARTER — version minimale fonctionnelle (mock simple)
// TODO (Étape 4): retourner 3 conseils au lieu d'1, en fonction de category/tone/constraints
// TODO (Étape 5 - Bonus): brancher Mistral (voir README)

const makeId = () => Math.random().toString(36).slice(2, 9);

export async function generateSuggestions({ goal /*, category, tone, constraints */ }) {
  // Simule une "latence réseau"
  await new Promise((r) => setTimeout(r, 400));

  return [
    {
      id: makeId(),
      title: "Premier petit pas",
      body: `Choisis une action de 2 minutes en lien avec "${goal}" et fais-la dès demain matin.`,
      tag: "Starter"
    }
  ];
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
