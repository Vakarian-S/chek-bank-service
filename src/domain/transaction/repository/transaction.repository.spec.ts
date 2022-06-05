import { TransactionRepository } from './transaction.repository';

describe('HistoryRepository', () => {
  it('should be defined', () => {
    expect(new TransactionRepository()).toBeDefined();
  });
});
