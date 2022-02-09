---
title: Bristol
image: "/assets/img/projects/bristol.png"
illus: "/assets/img/illus/bristol.jpg"
context: projet de fin de formation
year: 2021
stack:
  [
    "react",
    "postgresql",
    "redis",
    "socketio",
    "materialui",
    "express",
    "heroku",
  ]
tags: ["featured"]
links:
  {
    github: "https://github.com/moymat/bristolbe",
    live: "https://vercel.com/moymat/projet-13-bristol",
  }
description: Projet de fin de formation à l'école imaginé et créé de A à Z sur une période d'un mois en collaboration avec deux autres développeurs.
---

Sur **Bristol**, mon rôle a été principalement celui de _Lead Dev Back_ et de _Git Master_, bien que j'ai a plusieurs reprise également participé à l'élaboration du front.

Ce projet a pour objectif de permettre le partage, l'organisation et la création collaborative de fiches méthodologiques.

Le back est développé sous _Express.js_ et la base de donnée est en _PSQL_. Le serveur utilise également _Redis_ pour stocker certaines informations temporaires tels les refresh token permettant l'identification des utilisateurs par exemple. _Socket.io_ a également été intégré afin de permettre aux collaborateurs d'être informés immédiatement des modifications des fiches. Enfin, l'envoie des emails de confirmation est faite avec _Nodemailer_.

Le front quand à lui est développé sous _React_ et l'UI a été conçue avec _Material UI_. En ce qui concerne l'outil de traitement de texte, notre choix s'est porté sur _Quill_.
