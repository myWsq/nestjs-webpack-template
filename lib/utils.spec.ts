import { sayHello } from '@lib/utils';

describe('Utils Library', () => {
  it('should be defined', () => {
    expect(sayHello).toBeDefined();
  });
});
