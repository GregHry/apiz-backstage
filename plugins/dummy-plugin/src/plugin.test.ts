import { dummyPluginPlugin } from './plugin';

describe('dummy-plugin', () => {
  it('should export plugin', () => {
    expect(dummyPluginPlugin).toBeDefined();
  });
});
