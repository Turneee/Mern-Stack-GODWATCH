import categoryReducer from './category.reducer';
import { combineReducers } from 'redux';
import authReducer from './auth.reducer';
import productReducers from './product.reducers';
import cartReducer from './cart.reducer';
import userReducer from './user.reducer';

const rootReducer = combineReducers({
   
    category: categoryReducer,
    product: productReducers,
    auth: authReducer,
    cart: cartReducer,
    user: userReducer
});

export default rootReducer; 