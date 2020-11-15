import { S3 } from 'aws-sdk';
import { S3 as S3Specific, S3ClientConfig } from '@aws-sdk/client-s3';

class S3Service {
    readonly bucket: string;
    readonly region: string;
    config: S3.Types.ClientConfiguration;
    configSpecific: S3ClientConfig;

    constructor() {
        this.bucket = 'uploaded-mp';
        this.region = 'eu-west-1';

        this.createConfig();
    }

    createS3Client(): S3 {
        return new S3(this.config);
    }

    createS3ClientSpecific(): S3Specific {
        return new S3Specific(this.configSpecific);
    }

    private createConfig(): void {
        this.config = {
            region: this.region,
        };
        this.configSpecific = {
            region: this.region,
        };
    }
}

export const s3Service = new S3Service();
