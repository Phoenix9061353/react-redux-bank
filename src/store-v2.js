import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import accountReducer from './features/accounts/accountSlice';
import customerReducer from './features/customers/customerSlice';

//Classic redux
//將所有reducer結合成rootReducer
const rootReducer = combineReducers({
  account: accountReducer,
  customer: customerReducer,
});

//創建store並使用
const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

export default store;
