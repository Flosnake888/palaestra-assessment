# palaestra-assessment

Les quatre fichiers statiques servis à `www.palaestra.fr` via jsDelivr.

| Fichier | Rôle |
|---|---|
| `assessment.css` · `assessment.js` | La page `/assessment` : le questionnaire joueur |
| `blueprint.css` · `blueprint.js` | Le moteur de rendu des rapports joueurs (`/players/...`) |

Les sources et la documentation vivent dans
`~/Documents/Claude/PALAESTRA/04-Ops/onboarding-leads/`.
Ne jamais éditer ici directement : régénérer depuis `assessment-app.html`
et `blueprint-SAMPLE-daniel-rahman.html`, puis recopier.

## Servir

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh<!--
-->/FLORENT/palaestra-assessment@v1/assessment.css">
<script src="https://cdn.jsdelivr.net/gh/FLORENT/palaestra-assessment@v1/assessment.js" defer></script>
```

**Toujours épingler un tag** (`@v1`, `@v2`...), jamais `@main` : jsDelivr met une branche
en cache sept jours, et on finit par déboguer une version qui n'est plus celle du dépôt.

## Publier une nouvelle version

```bash
git add -A && git commit -m "assessment: <ce qui change>"
git tag v2 && git push origin main --tags
```

Puis remplacer `@v1` par `@v2` dans les blocs Embed Webflow.
