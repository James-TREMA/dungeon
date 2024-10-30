# Dungeon

Bienvenue dans **Dungeon**, un projet de gestion d’un univers de jeu immersif, mettant en avant des éléments tels que des donjons, des objets, des emplacements et des régions. Ce projet utilise une base de données PostgreSQL pour stocker et organiser les données du jeu et expose ces informations via une API REST construite avec Node.js et TypeScript.

## Technologies Utilisées

Ce projet est basé sur une stack moderne pour garantir une performance et une extensibilité optimales :

- **Node.js** avec **TypeScript** : pour construire le backend et gérer la logique métier.
- **PostgreSQL** : comme base de données principale pour stocker les données du jeu de manière relationnelle.
- **Docker** : pour faciliter la gestion et l’isolation de l'environnement de base de données.
- **TypeORM** : pour l'ORM (Object-Relational Mapping), permettant une manipulation plus simple de la base de données via des modèles d’entité.

## Prérequis

Avant de commencer, assurez-vous d'avoir installé :

- [Docker](https://www.docker.com/) (si vous souhaitez exécuter PostgreSQL dans un conteneur)
- [Node.js et npm](https://nodejs.org/)

## Installation

1. **Clonez le dépôt :**

   ```bash
   git clone https://github.com/James-TREMA/dungeon.git
   cd dungeon
   ```

2. **Installez les dépendances :**

   ```bash
   npm install
   ```

3. **Démarrez un conteneur Docker pour PostgreSQL :**

   Si vous souhaitez exécuter PostgreSQL via Docker, utilisez la commande suivante pour démarrer un conteneur PostgreSQL :

   ```bash
   docker run --name dungeon-postgres -e POSTGRES_USER=postgres -e POSTGRES_PASSWORD=your_password -e POSTGRES_DB=Lestania -p 5432:5432 -d postgres
   ```

   Remplacez `your_password` par un mot de passe sécurisé.

4. **Vérifiez l'état du conteneur Docker PostgreSQL :**

   Utilisez la commande suivante pour vérifier si le conteneur est bien démarré :

   ```bash
   docker ps
   ```

5. **Accédez à la console du conteneur PostgreSQL :**

   Une fois le conteneur PostgreSQL en cours d'exécution, vous pouvez y accéder pour exécuter des commandes SQL :

   ```bash
   docker exec -it dungeon-postgres bash
   ```

6. **Accédez à PostgreSQL à l'intérieur du conteneur :**

   Dans le bash du conteneur, accédez à PostgreSQL avec l'utilisateur `postgres` et la base de données `Lestania` :

   ```bash
   psql -U postgres -d Lestania
   ```

   Vous pouvez maintenant interagir avec la base de données pour effectuer des opérations SQL.

## Démarrage de l'Application

Pour démarrer le serveur, exécutez la commande suivante :

```bash
npm start
```

Le serveur est configuré pour surveiller les modifications dans les fichiers TypeScript et redémarrer automatiquement grâce à Nodemon.

## Commandes Utiles

Voici quelques commandes utiles pour gérer votre environnement Docker et PostgreSQL :

- **Lister les conteneurs Docker en cours d'exécution** :

  ```bash
  docker ps
  ```

- **Accéder au bash du conteneur** :

  ```bash
  docker exec -it dungeon-postgres bash
  ```

- **Accéder à PostgreSQL à l'intérieur du conteneur** :

  ```bash
  psql -U postgres -d Lestania
  ```

## Structure du Projet

Le projet est structuré pour être facilement extensible :

- **src/entities/models** : contient les définitions des entités TypeORM, telles que `Region`, `Location`, `Dungeon`, `Chest`, `Item` et `User`.
- **src/database/seeds** : contient les fichiers de seed pour peupler la base de données avec des données initiales.
- **src/controllers** : gère les différents contrôleurs de l'API exposant les données des entités.
- **src/config** : contient les fichiers de configuration, y compris `ConfigDB.ts` pour les paramètres de la base de données.

## Mise à jour à venir
- Interface web

## Contribution

Les contributions sont les bienvenues ! N'hésitez pas à ouvrir une issue pour rapporter un bug ou suggérer des améliorations.

Merci de l'intérêt porté à **Dungeon**. J'espère que ce projet saura captiver votre imagination et vous aider dans vos propres développements !