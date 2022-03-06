![Groupomania](frontend/src/assets/icon-left-font-monochrome-black.svg)

# **GROUPOMANIA**

Le site Groupomania, un réseau social d’entreprise.
Project réalisé par APIOU Kalene pour Groupomania

● Stack : Express, Node.JS,JWT, Sequelize, Multer, Bcrypt, VueJS 3

## Description

Création de pages dynamiques pour un réseau social,  
Création de **messages/commentaires**, **suppression** et **modification**.

Développer avec :

-   [SASS](https://sass-lang.com/documentation)
-   [VueJS 3](https://v3.vuejs.org/)
-   [vuetifyJS](https://next.vuetifyjs.com/en)
-   [Sequelize ORM](https://sequelize.org/v7/)
-   [MySQL](https://www.mysql.com/fr/)

# Installation Groupomania

Cloner le projet :

```
git clone https://github.com/kaleneDeveloper/KaleneApiou_7_21022022
```

## Installation Backend

#### Dans le dossier backend créer un dossier images et dans le dossier images créer un dossier profile

```
à partir du dossier cloné :
cd backend
npm install
```

#### Créer un fichier .env dans le dossier config

```
# NODE APP ENVIRONMENT VARIABLE
NODE_ENV=development
PORT=3000
TOKEN_KEY="RANDOM_SECRET_KEY"
# DATABASE CONNECTION
DB_HOST= 'Ajouter vos infos'
DB_USER= 'Ajouter vos infos'
DB_NAME=sequelize_02
DB_PASSWORD= 'Ajouter vos infos'
```

#### Créer une base de donnée avec le nom sequelize_02

```
CREATE DATABASE sequelize_02;
Verifier vos données de connection dans le fichier /backend/server/config/.env
```

#### Démarrage backend

```
cd backend/server
node server
```

## Installation Frontend

#### Démarrage frontend

```
à partir du dossier cloné :
cd frontend
npm install
npm run serve
```

## Création d'un Admin

```
Creer un compte puis ouvrir la base donnée
Rentrer dans la tables "users"
Changer la valeur de "admin" de 0 à 1
```

### Contact

Kalene APIOU : <apiou.kalene@gmail.com>
