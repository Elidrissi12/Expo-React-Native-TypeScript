## Vue d’ensemble du front React Native

Ce fichier résume tout ce qui a été ajouté/modifié dans l’app Expo pour que tu puisses réviser et apprendre tranquillement.

---

## 1. Navigation & structure des écrans

- **Expo Router + Onglets** (`app/(tabs)/_layout.tsx`) :
  - `index` → **Dashboard** (Todo list industrielle)
  - `api` → **API** (test et apprentissage des requêtes réseau)
  - `tools` → **Outils** (Timer, Formulaire, etc.)
- Chaque fichier dans `app/` est une **route** :
  - `app/(tabs)/index.tsx` → importe `home.tsx` (Dashboard).
  - `app/(tabs)/api.tsx` → onglet API, réutilise `app/request.tsx`.
  - `app/(tabs)/tools.tsx` → onglet Outils, boutons vers `timer` et `form`.
  - `app/timer.tsx` → écran Timer.
  - `app/request.tsx` → écran de requête API.
  - `app/form.tsx` → écran Formulaire.
  - `app/modal.tsx` → écran `/modal` (modal Expo Router).

---

## 2. Dashboard (Todo list) — `app/(tabs)/home.tsx`

### 2.1. Fonctionnalités

- **Todo list complète** :
  - Ajouter une tâche (champ texte + bouton + touche Entrée).
  - Marquer comme **terminée** / non terminée (tap sur la case).
  - Marquer comme **Important** (appui long sur le texte).
  - **Éditer** le texte d’une tâche (bouton Modifier, champ de saisie inline).
  - **Supprimer** une tâche (bouton “X”).
  - **Supprimer toutes les terminées** (bouton en bas).
- **Filtres** :
  - `Toutes` / `À faire` / `Terminées` avec puces (chips) cliquables.
- **Stats** :
  - Calculées avec `useMemo`: total, terminées, restantes.
  - Affichées dans la **barre du bas** (bottom).

### 2.2. Design (Header / Content / Bottom)

- **Header** :
  - Logo (`expo-image`) + nom **“Ma Todo List”** + sous-titre “Dashboard des tâches”.
- **Content** :
  - Ligne de filtres (chips).
  - Ligne de saisie (TextInput + bouton “Ajouter”).
  - Liste des tâches (FlatList).
- **Bottom** :
  - Texte de stats (à faire / terminées / total).
  - Bouton “Supprimer terminées”.

### 2.3. Persistance avec AsyncStorage

- **Type Todo** :

  ```ts
  type Todo = {
    id: string;
    text: string;
    done: boolean;
    createdAt: number;
    important: boolean;
  };
  ```

- **Stockage local** :
  - Clé de stockage : `@todos`.
  - `useEffect` au montage → lit dans AsyncStorage, parse en `Todo[]`, met dans le state.
  - `useEffect` sur `todos` → sérialise en JSON et sauvegarde dans AsyncStorage.
  - Objectif : que la liste **reste** après fermeture / redémarrage de l’app.

---

## 3. Écran API — `app/request.tsx` (onglet API via `app/(tabs)/api.tsx`)

### 3.1. Ce que fait l’écran

- Appelle l’API publique :

  ```txt
  https://jsonplaceholder.typicode.com/posts/{id}
  ```

- États gérés :
  - `data: Post | null` → réponse de l’API.
  - `loading: boolean` → affichage d’un spinner et du texte “Chargement…”.
  - `error: string | null` → message rouge si problème réseau/HTTP.
  - `postId: string` → id du post (1 à 100) saisi par l’utilisateur.
  - `reloadKey: number` → sert uniquement à forcer le `useEffect` à rerun.

### 3.2. Interactions

- L’utilisateur :
  - tape un id (ex: `5`) dans le `TextInput` numérique.
  - clique sur **“Recharger”** pour lancer ou relancer la requête.
- `useEffect` dépend de `[reloadKey, postId]` :
  - à chaque clic sur Recharger ou changement d’id, on refait `fetch`.

### 3.3. Structure visuelle

- En haut : `TextInput` pour l’id.
- Au centre : spinner / message d’erreur / titre + body du post.
- En bas : bouton “Recharger” avec largeur à `80%`.

---

## 4. Écran Tools — `app/(tabs)/tools.tsx`

- Sert de **hub d’outils** :
  - Titre “Outils” + sous-titre explicatif.
  - Boutons :
    - “Timer” → route `/timer`.
    - “Formulaire” → route `/form`.
- Utilise `Link` d’Expo Router avec `asChild` pour que le `Button` devienne le déclencheur de navigation.

---

## 5. Timer — `app/timer.tsx`

- Utilise `useState` + `useEffect` :
  - `seconds` (nombre de secondes écoulées).
  - `isRunning` (booléen start/pause).
- `useEffect` gère un `setInterval` typé (`ReturnType<typeof setInterval>`) et le nettoie dans le `return`.
- Boutons :
  - **Start/Pause** (toggle de `isRunning`).
  - **Reset** (remet `seconds` à 0 et arrête le timer).

Objectif pédagogique : bien comprendre `useEffect` avec un intervalle et le nettoyage.

---

## 6. Formulaire — `app/form.tsx`

- Champs :
  - `name` (texte simple).
  - `password` (avec `secureTextEntry`).
- Validation dans un `useEffect` :
  - `Name is required` si `name` vide.
  - `Password is required` si `password` vide.
- Bouton “Submit” :
  - Si `error === ''` → `alert('Form submitted!')`.
  - Sinon → `alert('Please fix the errors before submitting.')`.
- Design :
  - Conteneur centré, fond (configurable).
  - Inputs largeur `80%`, bouton avec même largeur via un wrapper `buttonContainer`.

---

## 7. Layout des onglets — `app/(tabs)/_layout.tsx`

- Utilise les composants fournis par le template Expo (HapticTab, IconSymbol, Colors, useColorScheme).
- Définit les trois onglets :
  - `index` → Dashboard (`title: 'Dashboard'`, icône `house.fill`).
  - `api` → API (`title: 'API'`, icône `network`).
  - `tools` → Outils (`title: 'Outils'`, icône `wrench.and.screwdriver`).
- `headerShown: false` car chaque écran gère son propre “header” interne.

---

## 8. Comment utiliser ce projet pour apprendre

- **React (hooks, state, effets)** : relis `home.tsx`, `request.tsx`, `timer.tsx`, `form.tsx`.
- **React Native (UI)** : observe les `StyleSheet.create`, `FlatList`, `KeyboardAvoidingView`.
- **Expo Router (navigation)** : regarde `app/(tabs)/_layout.tsx`, `app/(tabs)/api.tsx`, `app/(tabs)/tools.tsx`.
- **Données & API** : expérimente dans `request.tsx` (changer l’URL, gérer plus de cas).
- **Persistance** : prends modèle sur `home.tsx` pour stocker d’autres choses avec AsyncStorage.

Tu peux me demander à tout moment :
- d’expliquer un fichier (ex: *« explique-moi `home.tsx` ligne par ligne »*),
- de rajouter une fonctionnalité (ex: *« ajoute un écran de détails pour une tâche »*),
- ou de transformer ce front pour parler à un futur backend .NET.

