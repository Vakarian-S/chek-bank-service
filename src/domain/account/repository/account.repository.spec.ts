import { AccountRepository } from './account.repository';

describe('AccountRepository', () => {
  it('should be defined', () => {
    expect(new AccountRepository()).toBeDefined();
  });
});
