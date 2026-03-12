# Customization SILL

Source versionnée de la configuration UI spécifique au SILL. Les serveurs déploient
des **tags catalogi upstream** (`git checkout vX.Y.Z` dans les scripts `update-sill-*.sh`),
qui ne contiennent jamais ce dossier. Le script de déploiement récupère donc `customization/`
**depuis `origin/main`** (= ce repo) après le checkout du tag, et le monte via un override
compose. Le code applicatif reste figé au tag ; seule la config est superposée.

## Branchement dans le script de déploiement

Dans `update-sill-preprod.sh` / `update-sill-docker-compose.sh` (cf. `deploy/` à la racine du
repo pour les versions de référence), après le `git checkout $versionTag`, ajouter :

```bash
# customization vit sur main, absente des tags upstream → on la superpose
git fetch origin main
rm -rf customization
git archive origin/main customization | tar -x -C .
```

Puis référencer l'override (qui vit dans `customization/`) en second `-f` des trois commandes
docker compose :

```bash
sudo docker compose -f docker-compose.preprod.yml -f customization/docker-compose.preprod.override.yml build
sudo docker compose -f docker-compose.preprod.yml -f customization/docker-compose.preprod.override.yml down
sudo docker compose -f docker-compose.preprod.yml -f customization/docker-compose.preprod.override.yml up -d
```

(remplacer `preprod` par `prod` sur la machine de prod)

> `git archive | tar` garde les fichiers **untracked** (ils survivent à `git checkout .` et au
> checkout de tag, sans toucher à l'index en HEAD détaché). Les chemins `./customization/...` de
> l'override sont résolus depuis la racine du projet compose (dossier du 1er `-f`), donc l'override
> fonctionne bien qu'il soit dans `customization/`.

## Traductions

`customization/translations/fr.json` et `en.json` surchargent les libellés de l'UI.
Contrairement à `ui-config.json`, ils sont **deep-mergés** avec les défauts upstream
(`api/src/rpc/translations/{fr,en}_default.json`) via `deepmerge` dans `getTranslations.ts` :
on ne met donc que les clés à changer, par ex.

```json
{
  "home": {
    "theSillInAFewWords": "Le SILL en quelques mots",
    "theSillInAFewWordsParagraph": "<p>…</p>"
  }
}
```

Le paragraphe d'intro utilise des balises `<a1>`…`<a4>` (et `<space />` côté EN) qui injectent
les URLs déclarées dans `home.theSillInAFewWordsParagraphLinks` de `ui-config.json`.

## Mise à jour de la config

Modifier `ui-config.json` ici (le fichier est parsé **entier** au boot de l'API, aucun
merge avec les défauts : un fichier partiel empêche l'API de démarrer ; les clés inconnues
du schéma sont ignorées, la config peut donc précéder le code). Les fichiers de traduction
sont au contraire des overrides **partiels** (deep-merge). Puis re-curl sur le
serveur et `docker compose -f ... -f ... up -d --force-recreate api update`.
