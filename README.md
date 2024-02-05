# TP IGL - Moteur de Recherche d'Articles Scientifiques

## Overview

The TP IGL project is a web application designed to streamline the search, filtering, and management of scientific articles. Our goal is to provide users with a user-friendly platform that allows efficient access to relevant scientific content based on specific search criteria. The project is organized into distinct directories, including Backend, Frontend, and Documentation, each serving a crucial role in the application's functionality.

## Table of Contents

1. [Introduction](#introduction)
2. [Project Structure](#project-structure)
3. [User Features](#user-features)
   - [Search](#search)
   - [Results](#results)
   - [Filters](#filters)
   - [Article Details](#article-details)
   - [Favorites](#favorites)
4. [Article Characteristics](#article-characteristics)
5. [Administrator Features](#administrator-features)
   - [Moderator Management](#moderator-management)
   - [Article Upload](#article-upload)
   - [Article Processing](#article-processing)
   - [Error Correction](#error-correction)
6. [Technologies Used](#technologies-used)
7. [Links](#links)
   - [Projet Drive](#projet-drive)
   - [Énoncé](#énoncé)
   - [Diagrams](#diagrams)
      - [Components Diagram](#components-diagram)
      - [Classes Diagram](#classes-diagram)
      - [DataBase Schema](#database-schema)
   - [Figma Design](#figma-design)


## Introduction

The TP IGL project focuses on delivering a seamless experience for users seeking scientific articles. By providing advanced search capabilities, filtering options, and article management features, our application aims to cater to the diverse needs of researchers, academics, and enthusiasts.

## Project Structure

The project is structured into key directories:

- **Backend**: Manages server-side logic, including authentication, article extraction, and management.
- **Frontend**: Handles the user interface for an intuitive and responsive user experience.
- **Documentation**: Contains comprehensive documentation covering article structures, modules, and system functionalities.

## User Features

- **Search:** Users can perform advanced searches by specifying keywords, authors, titles, and full-text to retrieve relevant scientific articles.

- **Results:** Search results are displayed in chronological order, presenting the most recent articles first.

- **Filters:** Users can filter search results based on keywords, authors, institutions, and the publication date range.

- **Article Details:** Detailed information about each scientific article, including both textual and PDF formats of the full text, is available for users.

- **Favorites:** A feature allows users to save and revisit their favorite scientific articles for future reference.

## Article Characteristics

Scientific articles are characterized by:

- Title
- Abstract
- Authors
- Institutions
- Keywords
- Full-text (in textual format)
- URL to the associated PDF file
- References

## Administrator Features

- **Moderator Management:** Administrators have the ability to add, remove, or modify moderators to oversee and manage the platform effectively.

- **Article Upload:** Administrators can initiate article upload operations using URLs containing PDF articles.

- **Article Processing:** The system processes uploaded PDFs, extracting relevant information and indexing it in Elasticsearch for efficient retrieval.

- **Error Correction:** Moderators can review and correct any errors in the information extracted from PDF articles, ensuring data accuracy.

## Technologies Used

- Backend: Python/Django
- Frontend: React.js
- Storage and Search: Elasticsearch

## Links

### Projet Drive

- [Project Drive Link]( https://drive.google.com/drive/folders/15WRZnJ5oFkftp3iE-TuaKbINaSNraRAd?usp=drive_link )

### Énoncé

- [Project énoncé Document]( https://drive.google.com/file/d/1rd_N4WBpBeo1aoOZal8GIqLncyMMgBiy/view?usp=sharing )

### Diagrams
- [Components Diagram]( https://lucid.app/lucidchart/b131bdbe-e753-481e-aa72-2c18ae8c7a63/edit?beaconFlowId=8FF84A62782E1FED&invitationId=inv_a2dc2edc-b15e-4f0c-9916-1873c72401d5&page=0_0# )
- [Classes Diagram]( https://lucid.app/lucidchart/475eb93d-7e6b-4042-a50e-92ac77c3fb59/edit?beaconFlowId=1A99DFD4D7FE81C7&invitationId=inv_894851c4-f9fe-4be1-ae7d-ad1f693bebc8&page=0_0# )
- [DataBase Schema]( https://drawsql.app/teams/merys-team/diagrams/schema-bdd-tp-igl-23-24 )

### Figma Design

- [Figma Design]( https://www.figma.com/file/JwZGUrP2dFYvt9f0nSCkny/TP-IGL?type=design&node-id=0%3A1&mode=design&t=lOfRuItm6wMwmzIA-1 )

### Commands To Run SciQuest On Your Browser

#  To Run SciQuest :
`docker-compose up --build`

Access SciQuest through : [http://127.0.0.1/](http://127.0.0.1/)

#  To Shut Down SciQuest :

`docker-compose down`




