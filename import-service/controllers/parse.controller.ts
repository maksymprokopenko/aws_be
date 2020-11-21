import { S3Event, S3EventRecord } from 'aws-lambda';
const csv = require('csv-parser');

// services
import { s3Service } from '../services';

export const parseController = (event: S3Event) => {
    const client = s3Service.createS3Client();

    event.Records.forEach((record: S3EventRecord) => {
        const dataStream = client.getObject({
            Bucket: s3Service.bucket,
            Key: record.s3.object.key,
        }).createReadStream();

        dataStream.pipe(
            csv(),
        ).on('data', (pack: any) => {
            console.log('File pack', pack);
        }).on('end', async () => {
            const prepareFullName = `${s3Service.bucket}/${record.s3.object.key}`;
            const newFile = record.s3.object.key.replace('uploaded', 'parsed');
            const newFullName = `${s3Service.bucket}/${newFile}`;

            try {
                await client.copyObject({
                    Bucket: s3Service.bucket,
                    CopySource: prepareFullName,
                    Key: newFile,
                }).promise();

                console.log(`File moved from ${prepareFullName} to ${newFullName}`);

                await client.deleteObject({
                    Bucket: s3Service.bucket,
                    Key: record.s3.object.key,
                }).promise();

                console.log(`Original file was removed successfully from ${prepareFullName}!`);
            } catch (error) {
                console.error('Error while file moving!', error);
            }
        });
    });
};
