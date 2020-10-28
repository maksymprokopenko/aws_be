import type { Serverless } from 'serverless/aws';

const serverlessConfiguration: Serverless = {
  service: {
    name: 'product-service',
  },
  frameworkVersion: '2',
  custom: {
    webpack: {
      webpackConfig: './webpack.config.js',
      includeModules: true
    }
  },
  // Add the serverless-webpack plugin
  plugins: ['serverless-webpack'],
  provider: {
    name: 'aws',
    runtime: 'nodejs12.x',
    stage: 'dev',
    region: 'eu-west-1',
    apiGateway: {
      minimumCompressionSize: 1024,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
    },
  },
  functions: {
    productInfo: {
      handler: 'handler.productInfo',
      events: [
        {
          http: {
            method: 'get',
            path: 'getProductInfo',
          }
        }
      ]
    },
    productList: {
      handler: 'handler.productList',
      events: [
        {
          http: {
            method: 'get',
            path: 'getProductList',
          }
        }
      ]
    }
  }
}

module.exports = serverlessConfiguration;
