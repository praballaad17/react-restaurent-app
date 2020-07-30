import {createStore ,combineReducers} from 'redux';
import { Dishes } from './dish';
import { Comments } from './comments';
import { Promotions } from './promotion';
import { Leaders } from './leader';

export const ConfigureStore = () => {
    const store = createStore(
        combineReducers({
            dishes: Dishes,
            comments: Comments,
            promotions: Promotions,
            leaders: Leaders
        })
    );

    return store;
}