// src/routes.ts

import { errorHandler } from '@backstage/backend-common';
import express from 'express';
import Router from 'express-promise-router';
import { Logger } from 'winston';
import axios from 'axios';


export interface RouterOptions {
  logger: Logger;
}

export async function createRouter(
  options: RouterOptions,
): Promise<express.Router> {
  const { logger } = options;

  const router = Router();
  router.use(express.json());

  // Route pour la vérification de l'état de santé
  router.get('/health', (_, response) => {
    logger.info('PONG!');
    response.json({ status: 'ok' });
  });

  // Route pour récupérer des données à partir de DummyJson
  // router.get('/dummyjson', async (_, response) => {
  //   try {
  //     const dummyJsonResponse = await axios.get('https://www.dummyjson.com/users');
  //     response.json(dummyJsonResponse.data);
  //   } catch (error: any) { // Utilisation de "error: any" pour gérer les erreurs de type inconnu
  //     logger.error('Erreur lors de la récupération des données depuis DummyJson :', error.message);
  //     // Afficher plus d'informations sur l'erreur
  //     logger.error('Détails de l\'erreur :', error);
  //     response.status(500).json({ error: 'Échec de la récupération des données depuis DummyJson', details:error.toString() });
  //   }
  // });
  router.get('/dummyjson', async (_, response) => {
    try {
      // Authentification
      const authResponse = await fetch('https://dummyjson.com/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: 'kminchelle',
          password: '0lelplR',
          // expiresInMins: 60, // optional
        }),
      });
  
      const authData = await authResponse.json();
  
      // Vérifiez que la réponse contient un token
      if (!authData.token) {
        throw new Error('Échec de l\'authentification avec DummyJson');
      }
  
      // Utilisez le token pour faire une requête GET à https://www.dummyjson.com/products
      const dummyJsonResponse = await fetch('https://dummyjson.com/users', {
        headers: { Authorization: `Bearer ${authData.token}` },
      });
  
      const data = await dummyJsonResponse.json();
  
      response.json(data);
    } catch (error: any) { // Utilisation de "error: any" pour gérer les erreurs de type inconnu
      logger.error('Erreur lors de la récupération des données depuis DummyJson :', error.message);
      // Afficher plus d'informations sur l'erreur
      logger.error('Détails de l\'erreur :', error);
      response.status(500).json({ error: 'Échec de la récupération des données depuis DummyJson', details: error.toString() });
    }
  });

  // Middleware pour gérer les erreurs
  router.use(errorHandler());

  return router;
}
