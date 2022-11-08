// import { mock } from 'aws-sdk-mock';

import { importProductsFile } from '../src/handlers';

//* https://github.com/dwyl/aws-sdk-mock/issues/197 - how to mock S3 methods

const mockedSignedUrl = 'https://signed-url'

// mock('S3', 'getSignedUrlPromise', (operation, params, callback) => {
//   return callback(null, mockedSignedUrl);
// });

jest.mock('aws-sdk', () => ({
  S3: jest.fn().mockImplementation(() => ({
    getSignedUrlPromise: () => mockedSignedUrl,
  }))
}))

describe("importProductsFile", () => {
  it("should return signed url", async () => {
    const data = await importProductsFile({});

    expect(data.statusCode).toBe(200);
    expect(JSON.parse(data.body).url).toBe(mockedSignedUrl);
  });
});
