import createSagaMiddleware from 'redux-saga'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
import { createStore as createReduxStore, applyMiddleware, compose } from 'redux'
import { routerMiddleware as createRouterMiddleware } from 'connected-react-router'
import { routinePromiseWatcherSaga } from 'redux-saga-routines'
import { reducer as storageReducer } from 'redux-storage'
import { logger as loggerMiddleware } from 'redux-logger'
import { composeWithDevTools } from 'redux-devtools-extension'
import { persistStore, persistReducer } from 'redux-persist'
import { History } from 'history'

import rootSaga from './sagas'
import config from './config'
import { createReducers } from './reducers'

export function createStore(history: History) {
  // const storageMiddleware = createStorageMiddleware(storageEngine)
  const sagaMiddleware = createSagaMiddleware()
  const routerMiddleware = createRouterMiddleware(history)
  const reducers = createReducers(history)

  const persistConfig = {
    key: 'root',
    storage,
    blacklist: ['userList', 'orgList', 'currentUser']
  }

  const middlewares = [
    // storageMiddleware,
    sagaMiddleware,
    routerMiddleware
  ]
  if (config.isDevelopment) {
    middlewares.push(loggerMiddleware)
  }

  const composeWrapper = config.isDevelopment
    ? composeWithDevTools({})
    : compose
  const persistedReducer = persistReducer(persistConfig, reducers)
  const store = createReduxStore(
    storageReducer(persistedReducer),
    composeWrapper(applyMiddleware(...middlewares))
  )
  const persistor = persistStore(store)
  sagaMiddleware.run(rootSaga)
  sagaMiddleware.run(routinePromiseWatcherSaga)

  return { store, persistor }
}
