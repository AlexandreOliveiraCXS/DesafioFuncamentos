import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface Request{
  title: string,

  value: number,

  type: 'income' | 'outcome'
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ title, value, type }: Request): Transaction {
    const { total } = this.transactionsRepository.getBalance();

    if (!['income','outcome'].includes(type))
      throw new Error('Transactions type is invalid');    

    if(total < value && type === 'outcome')
      throw new Error('You do not have enough balance');    

    
    const transation = this.transactionsRepository.create({ title, value, type });
    return transation;
  }
}

export default CreateTransactionService;
