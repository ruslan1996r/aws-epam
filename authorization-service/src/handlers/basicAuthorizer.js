import { logEvent } from '../../common/logEvent';

const generatePolicy = (principalId, resource, effect = 'Allow') => ({
  principalId,
  policyDocument: {
    Version: '2012-10-17',
    Statement: [
      {
        Action: 'execute-api:Invoke',
        Effect: effect,
        Resource: resource,
      },
    ],
  },
});

const basicAuthorizer = async (event) => {
  logEvent(event);

  const routeArn = event?.routeArn;
  const authorization = event?.headers?.authorization;

  if (!authorization) 'Unauthorized';

  const token = authorization.split(' ')?.[1] || null;

  let isAllowed = true;
  let userName = 'unknown';

  if (!token) {
    isAllowed = false
  } else {
    try {
      const buffer = Buffer.from(token, 'base64');
      const [username, password] = buffer.toString('utf-8').split(':');
      userName = username
      console.log(`username: ${username} and password: ${password}, buffer = ${buffer.toString('utf-8')}`);

      const expectedUserPassword = process.env[username];

      isAllowed = expectedUserPassword === password;
    } catch (error) {
      isAllowed = false;
    }
  }

  const allow = isAllowed ? 'Allow' : 'Deny'
  const policy = generatePolicy(userName, routeArn, allow);

  return policy
};

export { basicAuthorizer };
