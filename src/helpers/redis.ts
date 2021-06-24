import redisClient from '@config/redis';
import {promisify} from 'util';

export const getAsync = promisify(redisClient.get).bind(redisClient);