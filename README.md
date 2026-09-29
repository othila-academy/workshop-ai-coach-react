# 🧑‍🎓 Starter — Workshop React: AI Coach

## 🎯 But
Construire une mini‑app React qui génère des conseils de bien‑être/productivité (mock d'abord, puis API Mistral en bonus).

---

## ⚡ Pourquoi Vite ?

Ce projet utilise **Vite** comme outil de build, voici pourquoi c'est génial :

### 🚀 **Rapidité exceptionnelle**
- **Démarrage instantané** : Le serveur de dev démarre en millisecondes (vs plusieurs secondes avec Create React App)
- **Hot Module Replacement (HMR) ultra-rapide** : Vos modifications apparaissent immédiatement sans recharger la page
- **Build optimisé** : Production 10x plus rapide grâce à esbuild

### 💡 **Moderne & Simple**
- **ES Modules natifs** : Utilise les imports natifs du navigateur en développement
- **Configuration minimale** : Fonctionne out-of-the-box, pas de config complexe
- **Support TypeScript/JSX** : Pas besoin de configuration supplémentaire

### 🎨 **Expérience développeur**
- **Erreurs claires** : Messages d'erreur lisibles et précis
- **Import CSS/assets** : Import direct d'images, fonts, CSS modules
- **Variables d'environnement** : Support natif avec `import.meta.env`

### 📦 **Ce projet**
```
vite.config.js → Configuration Vite avec plugin React SWC
index.html → Point d'entrée (à la racine, pas dans public/)
src/ → Votre code React
```

**Commandes utiles :**
```bash
npm run dev     # Lance le serveur de développement
npm run build   # Crée un build de production
npm run preview # Prévisualise le build de production
```

---

## ⚙️ Installation
```bash
npm install
npm run dev
```
Ouvrez http://localhost:5173

---

## 🧩 À faire (roadmap guidée)

### Étape 1 — Formulaire enrichi
Dans `src/components/CoachForm.jsx` :
- [x] Ajouter un **select Catégorie** (bien‑être / productivité)
- [x] Ajouter un **select Ton** (bienveillant / direct / scientifique)
- [x] Ajouter des **checkbox Contraintes** (10 min/jour, sans matériel, budget 0 €)
- [x] À la soumission, inclure ces valeurs dans l'objet passé à `onGenerate`

### Étape 2 — Validation & UX
- [ ] Limiter l'objectif à **10–140 caractères**
- [ ] Afficher un **compteur de caractères restants**
- [ ] Désactiver le bouton si invalide

### Étape 3 — Rendu des suggestions
Dans `SuggestionsList.jsx` :
- [ ] Remplacer la liste `<ul>` par des **cartes** (nouveau composant `SuggestionCard` ou style custom)
- [ ] Afficher le `tag` (catégorie) sous forme de **badge**
- [ ] Ajouter un état vide stylé (ex: “Aucune suggestion…”)

### Étape 4 — Mock “un peu intelligent”
Dans `src/api/llm.js` :
- [ ] Retourner **3 suggestions** (au lieu d’1)
- [ ] Varier le contenu selon **catégorie**, **ton** et **contraintes**
- [ ] Astuce: créer une petite fabrique de titres / phrases

### Étape 5 — (Bonus) Activer Mistral
- [ ] Copier `.env.example` → `.env` et renseigner `VITE_MISTRAL_API_KEY`
- [ ] Dans `App.jsx`, importer `generateSuggestionsMistral` et l'utiliser **à la place** de `generateSuggestions`
- [ ] Gérer les erreurs réseau & afficher un loader

### Étape 6 — (Bonus) Persistance locale
Dans `src/hooks/useLocalStorage.js` :
- [ ] Lire la valeur depuis `localStorage` au montage (`JSON.parse`)
- [ ] Sauvegarder la valeur à chaque modification (`JSON.stringify`)
- [ ] Utiliser ce hook pour `saved` **et** (si vous voulez) `suggestions`

---

## ✅ Critères de réussite
- Une saisie d'objectif valide lance la génération
- 3 cartes de conseils s'affichent avec un bouton ⭐ "Sauvegarder"
- Les favoris apparaissent dans la section **Favoris** (et peuvent être retirés)
- (Bonus) Les favoris restent après refresh (localStorage)
- (Bonus) L’API Mistral fonctionne avec votre clé

---

## 🆘 Aide
- Console navigateur (F12) pour voir les erreurs
- Inspecter le DOM pour vérifier vos champs contrôlés
- Si l’API échoue: rester en **mode mock**

Happy Coding ! 💙

---

_Fait avec ❤️ par Othila Academy_