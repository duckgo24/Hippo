import { configureStore } from '@reduxjs/toolkit'

import accountReducer from './slice/account.slice'

const rootReducer = {
    account: accountReducer,
}

export const store = configureStore({
    reducer: rootReducer,
    
})