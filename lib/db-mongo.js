const { MongoClient } = require('mongodb');

// URL de connexion MongoDB
const mongoUrl = 'mongodb://mytodo-gehringerhugo-1816:HCKGe3aFWqXxq2DVbJKneOjFZOzeasA_Y5gC1oEun4UWOoV1uxclkQdevEehvgOI@0dc1fb73-62b1-4b43-b344-ea7a8573f04b.mytodo-gehringerhugo-1816.mongo.b.osc-fr1.scalingo-dbs.com:32719/mytodo-gehringerhugo-1816?ssl=true&replicaSet=mytodo-gehringerhugo-1816-rs0';

module.exports = {
  type: () => 'MongoDB',
  connect: async () => {
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

      // Retourner l'objet de la base de données si nécessaire
      return db;
    } catch (error) {
      console.error('Erreur lors de la connexion à MongoDB:', error);
      throw error;
    } finally {
      // Fermer la connexion
      await client.close();
    }
  },
};