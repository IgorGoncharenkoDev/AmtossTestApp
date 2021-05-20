import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension/index'
import logger from 'redux-logger'
import rootReducer from './reducers/rootReducer'

const middlewares = []

if (process.env.NODE_ENV === 'development') {
	middlewares.push(logger)
}

const composedEnhancer = composeWithDevTools(applyMiddleware(...middlewares))

const store = createStore(rootReducer, composedEnhancer)

export default store
