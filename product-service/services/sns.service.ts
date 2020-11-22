import { SNS } from 'aws-sdk';

export const pushMessage = (subject: string, message: string) => {
    const sns = new SNS({ region: 'eu-west-1' });

    sns.publish({
        Subject: subject,
        Message: message,
        TopicArn: process.env.SNS_ARN,
    }).send();
};
