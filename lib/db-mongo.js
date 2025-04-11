const { MongoClient } = require('mongodb');

// URL de connexion MongoDB
const mongoUrl = 'mongodb://mytodo-gehringerhugo-1816:HCKGe3aFWqXxq2DVbJKneOjFZOzeasA_Y5gC1oEun4UWOoV1uxclkQdevEehvgOI@0dc1fb73-62b1-4b43-b344-ea7a8573f04b.mytodo-gehringerhugo-1816.mongo.b.osc-fr1.scalingo-dbs.com:32719/mytodo-gehringerhugo-1816?ssl=true&replicaSet=mytodo-gehringerhugo-1816-rs0';

// Fonction principale pour se connecter à MongoDB
async function connectToMongoDB() {
  const client = new MongoClient(mongoUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  try {
    // Connexion au client MongoDB
    await client.connect();
    console.log('Connexion réussie à MongoDB');

    // Accéder à la base de données
    const db = client.db('mytodo-gehringerhugo-1816');
    console.log('Base de données sélectionnée:', db.databaseName);

    // Effectuer des opérations ici si nécessaire
  } catch (error) {
    console.error('Erreur lors de la connexion à MongoDB:', error);
  } finally {
    // Fermer la connexion
    await client.close();
  }
}

module.exports = function (env) {
  // Configuration MongoDB ici
  return {
    connect: () => {
      console.log('Connexion à MongoDB avec', env.MONGO_URL);
      // Logique de connexion
    },
  };
};