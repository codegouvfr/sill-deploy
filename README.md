<<<<<<< HEAD
# Catalogi

## A Software Catalog application

This repository contains the catalogi software, a web application to manage
a catalog of software.

## Full documentation

The full documentation is available [here](https://codegouvfr.github.io/catalogi/)

## It is deployed on several places

1. [https://code.gouv.fr/sill](https://code.gouv.fr/sill/) for the
list of recommanded Free Software for French administrations.
2. [https://logiciels.catalogue-esr.fr/](https://logiciels.catalogue-esr.fr/) for the French Research Minister, listing mostly HAL softwares.

## Code organization
=======
# Fork de Catalogi

Ce dépôt est un fork du projet [Catalogi](https://github.com/etalab/catalogi). Pour un déploiement spécifique pour le SILL.

# Le problème

Les administrations sont encouragées par la loi pour une République numérique à privilégier des logiciels libres pour préserver « la maîtrise, la pérennité et l'indépendance de leurs systèmes d'information » (cf. [Article 16](https://www.legifrance.gouv.fr/loda/article_lc/LEGIARTI000033205068)).
>>>>>>> 48bd8033 (ci: ci for deployement of SILL, add workflow to update from upstream every day + update README)

Mais quels logiciels libres utiliser et pourquoi ? Quand plusieurs logiciels libres remplissent la même fonction, lequel privilégier ? Quelle version minimale est acceptable ?

<<<<<<< HEAD
- api: Application API (also includes jobs, that can be run periodically)
- web: Web frontend
- docs: Documentation, as deployed [here](https://codegouvfr.github.io/catalogi/)
- deploy-examples: Examples of deployment. For now, there is only a Docker Compose example.

## Governance and contributions
=======
La mise en oeuvre de la loi exige que les administrations puissent se renseigner directement sur les logiciels libres déjà utilisés par d'autres administrations.

Le SILL, Socle Interministeriel de Logiciel Libre, s'attaque à ce problème de partage de l'information.
>>>>>>> 48bd8033 (ci: ci for deployement of SILL, add workflow to update from upstream every day + update README)

# Historique

Le SILL était à l'origine une liste sous format PDF qui était mise à jour tous les ans par les groupes MIM (Mutualisation InterMinistérielle).

<<<<<<< HEAD
## License
=======
La version publique de la liste indiquait les logiciels libres utilisés au sein des administrations centrales et la version à utiliser. Une liste privée accessibles aux membres des groupes MIM indiquait en plus le nom de l'agent public référent.
>>>>>>> 48bd8033 (ci: ci for deployement of SILL, add workflow to update from upstream every day + update README)

Cette liste servaient aux DSI des ministères à faire les mises à jour nécessaires et à découvrir des logiciels libres utilisés par d'autres ministères.

En 2019, le SILL a été publié sous forme d'une application web à l'adresse https://sill.etalab.gouv.fr, qui redirigeait vers https://sill.code.gouv.fr depuis février 2023 jusqu'à présent, et désormais sur https://code.gouv.fr/sill. La page de visualisation était générée à partir de fichiers `csv` maintenus manuellement sur un dépôt public.

En 2022, le SILL a été repensé pour permettre aux agents publics de référencer eux-mêmes des logiciels libres ou de contacter directement l'agent public référent d'un logiciel. Cette nouvelle version a également vocation de permettre aux agents inscrits des logiciels au sein même de leur navigateur.