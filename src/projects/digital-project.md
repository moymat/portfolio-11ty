---
layout: "project/index.njk"
title: Digital Project
image: "/assets/img/projects/digital-project.png"
stack: ["nextjs", "figma"]
tags: ["featured"]
links:
  {
    github: "https://github.com/moymat/nextjs-archi",
    live: "https://digital-project.vercel.app/",
  }
description: Projet personnel d'un cabinet d'architecture fictif.
---

Basé sur une maquette _Figma_ mise à disposition gratuitement par [Martin Jozwiak](http://marcinjozwiak.pl){target="\_blank"}, ce projet m'a permis de découvrir _Next.js_ et par ce biais le SSR, le blur d'image et les modules _CSS_ notamment.

Ce site se décompose en cinq parties:

- une Landing composée entre autre d'un slider personnalisé et d'un formulaire de contact
- une page Gallerie regroupant l'ensemble des photos des projets fictifs
- une section Projets regroupant l'ensemble des projets architecturaux du cabinet fictif sur plusieurs pages
- une page par Projet
- une page Contact avec un formulaire et l'intégration d'une carte intéractive _Leaflet_.

J'ai également pris particulièrement soin à ce que le responsive du site ainsi que le SEO soient conformes aux attentes que pourraient avoir un client de ce genre.
