import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface TransactionList {
  transactions: Transaction[];
  balance: Balance;
}

class ListTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute(): TransactionList {
    const transactions = this.transactionsRepository.all();
    const balance = this.transactionsRepository.getBalance();

    const transactionList = { transactions, balance };

    return transactionList;
  }
}

export default ListTransactionService;
