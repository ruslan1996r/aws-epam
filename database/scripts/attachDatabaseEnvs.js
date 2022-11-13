// ? https://docs.aws.amazon.com/cli/latest/reference/lambda/update-function-configuration.html
// ? https://docs.aws.amazon.com/lambda/latest/dg/configuration-envvars.html

const { exec } = require("child_process");
const { promisify } = require('util');
require('dotenv').config()

const lambdas = [
  'product-service-dev-getProductsList',
  'product-service-dev-getProductsById',
  'product-service-dev-createProduct',
  'product-service-dev-catalogBatchProcess',
]

const buildVariables = () => {
  const keys = ['HOST', 'PORT', 'DB_USER', 'PASSWORD', 'DATABASE']
  const vars = keys.map(key => `${key}=${process.env[key]}`).join();


  return `"Variables={${vars}}"`
}

const lambdasEnvs = async () => {
  const vars = buildVariables()

  lambdas.map(lambda => {
    const cmd = `aws lambda update-function-configuration \
    --function-name ${lambda} \
    --environment ${vars}`

    return promisify(exec)(cmd)
  })

  return Promise.all(lambdas);
}

(async () => await lambdasEnvs())();
