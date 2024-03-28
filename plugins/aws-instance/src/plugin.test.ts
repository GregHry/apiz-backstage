import { awsInstancePlugin } from './plugin';

describe('aws-instance', () => {
  it('should export plugin', () => {
    expect(awsInstancePlugin).toBeDefined();
  });
});
