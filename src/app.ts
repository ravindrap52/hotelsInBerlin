import { listen } from './server';
import { logger } from './helpers/logging';

listen().catch(error => {
  logger.error(error);
});
