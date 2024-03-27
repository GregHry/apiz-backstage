import { errorHandler } from '@backstage/backend-common';
import express from 'express';
import Router from 'express-promise-router';
import { Logger } from 'winston';
import { EC2 } from 'aws-sdk'; // Importez AWS SDK EC2
import { StopInstancesCommand } from "@aws-sdk/client-ec2";
import { EC2Client } from "@aws-sdk/client-ec2"; // Importez EC2Client
import { StartInstancesCommand } from "@aws-sdk/client-ec2";


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

  // Endpoint pour démarrer une instance EC2
  router.post('/start-instance', async (_, response) => {

    try {
      const client = new EC2Client({ region: "eu-west-3" }); 
      const command = new StartInstancesCommand({
        InstanceIds: ['i-062384a56c259671a'] // ID de l'instance EC2
      });

      const { StartingInstances } = await client.send(command);
      const instanceIdList = StartingInstances?.map(
        (instance) => ` • ${instance.InstanceId}`,
      );
      logger.info("Starting instances:");
      logger.info(instanceIdList?.join("\n"));

      response.json({ success: true });
    } catch (error: any) {
      logger.error('Erreur lors du démarrage de l\'instance EC2 :', error.message);
      response.status(500).json({ error: 'Échec du démarrage de l\'instance EC2' });
    }
  
  });

  // Endpoint pour arrêter une instance EC2
  router.post('/stop-instance', async (_, response) => {
   
    try {
      const client = new EC2Client({ region: "eu-west-3" }); 
      const command = new StopInstancesCommand({
        InstanceIds: ['i-062384a56c259671a'] // ID de l'instance EC2
      });

      const { StoppingInstances } = await client.send(command);
      const instanceIdList = StoppingInstances?.map(
        (instance) => ` • ${instance.InstanceId}`,
      );
      logger.info("Stopping instances:");
      logger.info(instanceIdList?.join("\n"));

      response.json({ success: true });
    } catch (error: any) {
      logger.error('Erreur lors de l\'arrêt de l\'instance EC2 :', error.message);
      response.status(500).json({ error: 'Échec de l\'arrêt de l\'instance EC2' });
    }
  });

  // Middleware pour gérer les erreurs
  router.use(errorHandler());

  return router;
}
