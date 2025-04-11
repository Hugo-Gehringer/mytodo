- Création d'une app sur  scalingo avec lien vers le fork du projet pour déployer a chaque push sur master
- Création d'une ressource MongoDB sur scalingo. A la création la variable SCALINGO_MONGO_URL secret est ajouté en environnement dans l'app sur scalingo.
- Modification du fichier .env pour ajouter la variable SCALINGO_MONGO_URL (pour tester en local)
- modification du server.js pour utiliser la variable SCALINGO_MONGO_URL  et la BDD au lieu d'utiliser la mémoire
- Modification du db-mongo.js pour utiliser la variable SCALINGO_MONGO_URL au lieu de host, port, user, password.
    ```js self.init = () => {
    return new Promise((resolve, reject) => {
      const uri = credentials.SCALINGO_MONGO_URL;
      if (!uri) return reject(new Error("SCALINGO_MONGO_URL not set"));

      MongoClient.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true
      }, (err, client) => {
        if (err) return reject(err);
        db = client.db().collection(COLLECTION_NAME);
        resolve();
      });
    });
  };
  ```
- -Déploiement au push de l'application sur scalingo
