// src/routes.ts

import { errorHandler } from '@backstage/backend-common';
import express from 'express';
import Router from 'express-promise-router';
import { Logger } from 'winston';



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

  router.get('/dummyjson', async (_, response) => {
    try {
      // Authentification
      const authResponse = await fetch('https://dummyjson.com/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: 'kminchelle',
          password: '0lelplR',
        }),
      });
      const authData = await authResponse.json();
      // Vérification que la réponse contient un token
      if (!authData.token) {
        throw new Error('Échec de l\'authentification avec DummyJson');
      }
      // Token utilisé pour faire la requête
      const dummyJsonResponse = await fetch('https://dummyjson.com/users', {
        headers: { Authorization: `Bearer ${authData.token}` },
      });
      
      const data = await dummyJsonResponse.json();

      response.json(data);
    } catch (error: any) { // Utilisation de "error: any" pour gérer totu type d'erreur
      logger.error('Erreur lors de la récupération des données depuis DummyJson :', error.message);
      
      response.status(500).json({ error: 'Échec de la récupération des données depuis DummyJson' });
    }
  });

  // Middleware pour gérer les erreurs
  router.use(errorHandler());

  return router;
}
