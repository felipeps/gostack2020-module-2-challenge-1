import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface Request {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ title, value, type }: Request): Transaction {
    if (!['income', 'outcome'].includes(type)) {
      throw new Error('Invalid transaction type');
    }

    if (type === 'outcome') {
      const { total } = this.transactionsRepository.getBalance();

      if (value > total) {
        throw new Error('No enough balance');
      }
    }

    const newTransaction = this.transactionsRepository.create({
      title,
      value,
      type,
    });

    return newTransaction;
  }
}

export default CreateTransactionService;
