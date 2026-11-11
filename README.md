# Rattrapage — le quiz des podcasts longs

Application web statique. Un épisode = un fichier JSON dans `data/`.

```
index.html                 l'application entière
manifest.json              installation sur l'écran d'accueil
sw.js                      cache hors connexion
icons/                     icônes
data/index.json            la liste des épisodes à charger
data/<slug>.json           un épisode, produit par l'agent Éditeur
.nojekyll                  demande à GitHub Pages de servir les fichiers tels quels
```

## Ajouter un épisode

Deux gestes, aucun code à toucher :

1. déposer le fichier produit par l'Éditeur dans `data/`
2. ajouter son nom de fichier à `data/index.json`

C'est ce que le pipeline automatisera à l'étape 2.

## Mise en ligne, sans ligne de commande

1. **Compte** — aller sur github.com, créer un compte si besoin.
2. **Dépôt** — bouton `+` en haut à droite → *New repository*. Nom :
   `quiz-gdiy`. Visibilité : **Public** (Pages est payant sur un dépôt privé).
   Ne cocher aucune case d'initialisation. *Create repository*.
3. **Fichiers** — sur la page qui suit, lien *uploading an existing file*.
   Glisser le **contenu** du dossier décompressé, pas le dossier lui-même :
   `index.html`, `manifest.json`, `sw.js`, `README.md`, `.nojekyll`, et les
   dossiers `data` et `icons`. Puis *Commit changes*.
4. **Publication** — onglet *Settings* → *Pages* dans la colonne de gauche.
   *Source* : `Deploy from a branch`. *Branch* : `main`, dossier `/ (root)`.
   *Save*.
5. **Attendre une minute.** L'adresse s'affiche en haut de cette même page :
   `https://<ton-pseudo>.github.io/quiz-gdiy/`

Si `.nojekyll` n'apparaît pas dans la fenêtre de glisser-déposer, c'est que
le système le masque : sur macOS, `Cmd + Maj + .` affiche les fichiers
cachés. Le site fonctionne sans lui, il évite juste une classe de surprises
plus tard.

## Installer sur le téléphone

Ouvrir l'adresse dans le navigateur du téléphone, puis :

- **iPhone (Safari)** : bouton Partager → *Sur l'écran d'accueil*
- **Android (Chrome)** : menu `⋮` → *Ajouter à l'écran d'accueil*

L'icône se comporte alors comme une application : plein écran, sans barre
d'adresse, et jouable hors connexion une fois la première partie lancée.

## Mettre à jour

Déposer les fichiers modifiés dans le dépôt (*Add file* → *Upload files*).
Le site se republie seul en une minute. Le service worker va au réseau
d'abord, donc un rechargement suffit au joueur — il n'y a pas de cache à
purger.

## Ce qui n'est pas encore là

- **Classement partagé.** Le record est pour l'instant local à l'appareil.
  Le point de branchement est signalé en commentaire à la fin de
  `index.html`.
- **`videoUrl`.** Vide dans le JSON de l'épisode. Renseignée, elle rend
  chaque timecode cliquable.
