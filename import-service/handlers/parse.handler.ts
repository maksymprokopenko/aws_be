import { S3Event } from 'aws-lambda';

// controllers
import { parseController } from '../controllers';

export const parseFile = (event: S3Event) => {
    return parseController(event);
};
