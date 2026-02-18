# Apprendre React Native — Parcours dans ce projet

Tu utilises déjà **Expo** + **React Native** + **TypeScript**. Ce fichier te donne un ordre logique pour tout ce que tu dois savoir. Tu peux demander à l’assistant : *« Explique-moi la partie X »* ou *« Fais un exercice sur Y »*.

---

## 1. Les bases de React (déjà utilisées dans ton app)

- **Composants** : une page = une fonction qui retourne du JSX (`View`, `Text`, `Button`).
- **State** : `useState` pour les données qui changent (todo list, formulaire, timer).
- **Effets** : `useEffect` pour les actions “après le rendu” (timer, fetch dans `request.tsx`).
- **Handlers** : `useCallback` pour ne pas recréer les fonctions à chaque rendu (comme dans `home.tsx`).
- **Valeurs dérivées** : `useMemo` pour calculs coûteux ou listes filtrées (`visibleTodos`, `stats`).

**À faire** : Relis `app/(tabs)/home.tsx` et repère où sont `useState`, `useCallback`, `useMemo`.

---

## 2. React Native : les briques d’interface

- **View** : bloc de mise en page (comme un `div`).
- **Text** : tout texte doit être dans un `<Text>`.
- **TextInput** : champs de saisie (form, todo).
- **Button** : bouton natif (limité en style).
- **Pressable** : zone cliquable avec feedback (filtres, cases à cocher).
- **StyleSheet.create** : styles regroupés, meilleur pour les perfs et la lisibilité.
- **Flexbox** : `flex`, `flexDirection`, `justifyContent`, `alignItems` — c’est la base du layout (pas de CSS classique).

**À faire** : Dans un écran, change `flexDirection: 'row'` en `'column'` et regarde le résultat.

---

## 3. Listes et scroll

- **FlatList** : pour des listes longues (todo). Utilise `data`, `renderItem`, `keyExtractor`.
- **ScrollView** : pour un contenu scrollable court (ex. formulaire).
- **KeyboardAvoidingView** : pour que le clavier ne cache pas les champs (form, todo).

Tu as tout ça dans `home.tsx` ; c’est le bon pattern pour une liste de tâches.

---

## 4. Navigation (Expo Router)

- **Fichiers = routes** : `app/index.tsx` → `/`, `app/timer.tsx` → `/timer`, `app/request.tsx` → `/request`, `app/modal.tsx` → `/modal`.
- **Link** : `<Link href="/timer">` ou bouton avec `asChild` pour naviguer sans recharger.
- **Layouts** : `_layout.tsx` définit les onglets (tabs) ou la pile d’écrans (Stack).

**À faire** : Ajoute une nouvelle page `app/notes.tsx` et un lien depuis la home vers `/notes`.

---

## 5. Données et réseau

- **fetch** : tu l’utilises dans `request.tsx` pour une API.
- **États** : `loading`, `error`, `data` — toujours gérer les 3 pour une requête.
- **useEffect + async** : faire le `fetch` dans un `useEffect`, avec un flag `isMounted` pour éviter de mettre à jour l’état après démontage.

**À faire** : Dans `request.tsx`, affiche aussi le `body` du post et un message d’erreur clair si la requête échoue.

---

## 6. Formulaires et saisie

- **Controlled inputs** : `value={email}` + `onChangeText={setEmail}` (comme dans le form et la todo).
- **Validation** : soit dans `useEffect` (comme dans `form.tsx`), soit au submit.
- **Clavier** : `returnKeyType`, `onSubmitEditing`, `secureTextEntry` pour les mots de passe.

Tu as déjà un form avec validation ; tu peux ajouter un champ “email” et vérifier le format.

---

## 7. Images et médias

- **expo-image** : `<Image source={require('@/assets/images/logo.png')} />` pour les images locales (tu l’utilises pour le logo).
- **Images distantes** : `source={{ uri: 'https://...' }}`.

---

## 8. Persistance locale (prochaine étape “pro”)

- **expo-secure-store** : pour tokens / petits secrets.
- **AsyncStorage** : pour préférences ou sauvegarder la todo list. On peut l’ajouter ensemble à ta todo pour qu’elle survive au redémarrage de l’app.

---

## 9. Bonnes habitudes

- **TypeScript** : typer les props et le state (comme `Todo`, `Post` dans ton projet).
- **Composants réutilisables** : extraire des blocs répétés (ex. une ligne de todo) dans un composant.
- **Fichiers** : un composant par fichier, ranger les écrans dans `app/`, les composants dans `components/`.

---

## Comment utiliser ce guide

1. Suis l’ordre 1 → 9.
2. Pour chaque partie, **relis le code correspondant** dans ton projet (home, form, request, timer).
3. Quand tu veux aller plus loin sur un point, dis par exemple :
   - *« Explique-moi les hooks (useState, useEffect) »*
   - *« Montre-moi comment sauvegarder la todo avec AsyncStorage »*
   - *« Fais un exercice sur FlatList »*

Comme ça, tu apprends tout ce qu’il faut savoir en React Native, en t’appuyant sur ce projet pour t’exercer.
