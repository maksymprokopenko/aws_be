import { APIGatewayEvent, APIGatewayProxyResult } from 'aws-lambda';
import { PutObjectCommand } from '@aws-sdk/client-s3';
import { S3RequestPresigner } from "@aws-sdk/s3-request-presigner";
import { createRequest } from '@aws-sdk/util-create-request';
import { formatUrl } from '@aws-sdk/util-format-url';

// middleware
import { corsResponseMiddleware } from '../middleware';

// models
import { HTTPStatusCodes } from '../models';

// services
import { fileService, s3Service } from '../services';

export const importController = async (event: APIGatewayEvent): Promise<APIGatewayProxyResult> => {
    const client = s3Service.createS3ClientSpecific();
    const { queryStringParameters } = event;

    if (!queryStringParameters || !queryStringParameters.name) {
        return corsResponseMiddleware({
            statusCode: HTTPStatusCodes.BAD_REQUEST,
            body: 'File name should be provided!',
        });
    }

    // validate file format
    if (!fileService.validateFileName(queryStringParameters.name, 'csv')) {
        return corsResponseMiddleware({
            statusCode: HTTPStatusCodes.BAD_REQUEST,
            body: 'File format is incorrect. Only .csv files could be uploaded.',
        });
    }

    try {
        const signer = new S3RequestPresigner({ ...client.config });
        const request = await createRequest(
            client,
            new PutObjectCommand({
                Key: `uploaded/${queryStringParameters.name}`,
                Bucket: s3Service.bucket,
            }),
        );
        const signedUrl = formatUrl(await signer.presign(request));
        const prepareResponse = corsResponseMiddleware({
            statusCode: HTTPStatusCodes.SUCCESS,
            body: signedUrl,
        });

        return prepareResponse;
    } catch (error) {
        console.error(error);
        return corsResponseMiddleware({
            statusCode: HTTPStatusCodes.SERVER_ERROR,
            body: JSON.stringify(error),
        });
    }
};
