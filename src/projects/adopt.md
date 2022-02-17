---
title: Adopt
image: "/assets/img/projects/adopt.webp"
illus: "/assets/img/illus/adopt.webp"
context: Projet personnel
year: "2021/22"
stack: ["react", "postgresql", "express", "materialui", "heroku"]
tags: ["featured", "wip"]
links:
  {
    github: "https://github.com/moymat/adopt",
    live: "https://adopt-flax.vercel.app/",
  }
excerpt: Application web <br> Mettre en relation les associations et refuges animaliers avec de potentiels adoptants
description: Ce projet est un concept d'application web permettant de mettre plus facilement en relation les associations et refuges animaliers avec de potentiels adoptants.
---

En l'état actuel, la base de données _PSQL_ hebergée sur _Heroku_, tout comme le serveur _Express.js_, ne contient que des associations et animaux fictifs. Il est possible des rechercher des animaux en fonction de leur localisation (ou de se géolocaliser) et de filtrer cette recherche par âge et sexe.

Les informations de géolocalisation sont stockées directement dans la base de données et ont été récupérées sur l'[API Découpage Administratif](https://geo.api.gouv.fr/decoupage-administratif/communes){target="\_blank" .content-link}. Les API Google [Places API](https://developers.google.com/maps/documentation/places/web-service/overview){target="\_blank" .content-link} et [Maps API](https://developers.google.com/maps/documentation/javascript/overview){target="\_blank" .content-link} sont également utilisées ponctuellement afin d'obtenir des coordonnées plus précises et de récupérer les informations de géolocalisation de l'utilisateur.

Le front, déployé sur _Vercel_, est développé sous _React_. Ce projet me permet également d'approfondir mes connaissances dans _Material UI_.

_Le projet étant à l'état de prototype, celui-ci ne possède pas encore de version mobile._

<!--
A l'avenir, le projet permettra:

- Pour les associations:
  - de s'inscrire et de se connecter
  - de créer, mettre à jour et supprimer des fiches d'animaux
  - de connecter leur compte facebook afin de centraliser leur communication sur l'application
  - d'avoir un outil complet de gestion des animaux dont elles s'occupent
- Pour les utilisateurs:
  - de s'inscrire et de se connecter
  - de mettre en favoris des animaux ou des recherches afin de les retrouver plus facilement
  - de partager des fiches sur les réseaux sociaux
  - de s'abonner à une recherche afin d'être rapidement informé des derniers ajouts

Au niveau du projet, les fiches seront également plus complètes tout comme les filtres de recherche (par exemple, les associations pourront indiquer si l'animal accepte d'autres animaux ou non, s'il a besoin de sortir, etc...). -->
