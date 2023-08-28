//For Learning just "pure redux"(classic)
//還沒有分割（slice）
import { combineReducers, createStore } from 'redux';

const initialStateAccount = {
  balance: 0,
  loan: 0,
  loanPurpose: '',
};

const initialStateCustomer = {
  fullName: '',
  nationalID: '',
  createdAt: '',
};

/*
- 與useReducer很像
- 不同的是：
    - state會先設 default值為initialState
    - action.type的default會直接return當下的state（不是throw error）
*/
function accountReducer(state = initialStateAccount, action) {
  switch (action.type) {
    case 'account/deposit':
      return { ...state, balance: state.balance + action.payload };
    case 'account/withdraw':
      return { ...state, balance: state.balance - action.payload };
    case 'account/requestLoan':
      if (state.loan > 0) return state;
      return {
        ...state,
        loan: action.payload.amount,
        balance: state.balance + action.payload.amount,
        loanPurpose: action.payload.purpose,
      };
    case 'account/payLoan':
      return {
        ...state,
        loan: 0,
        loanPurpose: '',
        balance: state.balance - state.loan,
      };
    default:
      return state;
  }
}

function customerReducer(state = initialStateCustomer, action) {
  switch (action.type) {
    case 'customer/createCustomer':
      return {
        ...state,
        fullName: action.payload.fullName,
        nationalID: action.payload.nationalID,
        createdAt: action.payload.createdAt,
      };
    case 'customer/updateName':
      return { ...state, fullName: action.payload };
    default:
      return state;
  }
}

//將所有reducer結合成rootReducer
const rootReducer = combineReducers({
  account: accountReducer,
  customer: customerReducer,
});

//創建store並使用（實際上不會需要一個一個打type → 用 action creator）
const store = createStore(rootReducer);
// store.dispatch({ type: 'account/deposit', payload: 500 });
// store.dispatch({
//   type: 'account/requestLoan',
//   payload: { amount: 1000, purpose: 'Buy a car' },
// });
// store.dispatch({
//   type: 'account/payLoan',
// });

//Action creator
function deposit(amount) {
  return { type: 'account/deposit', payload: amount };
}

function withdraw(amount) {
  return { type: 'account/withdraw', payload: amount };
}

function requestLoan(amount, purpose) {
  return {
    type: 'account/requestLoan',
    payload: { amount, purpose },
  };
}

function payLoan() {
  return { type: 'account/payLoan' };
}

function createCustomer(fullName, nationalID) {
  return {
    type: 'customer/createCustomer',
    payload: {
      fullName,
      nationalID,
      createdAt: new Date().toISOString(),
    },
  };
}

function updateName(fullName) {
  return { type: 'customer/updateName', payload: fullName };
}

//使用（實際：與react連結後在組件處使用）
store.dispatch(deposit(500));
console.log(store.getState());
store.dispatch(withdraw(300));
console.log(store.getState());
store.dispatch(requestLoan(1000, 'Buy a new car'));
console.log(store.getState());
store.dispatch(payLoan());
console.log(store.getState());

store.dispatch(createCustomer('Phoenix Chang', '987561242'));
console.log(store.getState());
