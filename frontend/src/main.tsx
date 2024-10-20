import ReactDOM from 'react-dom/client';
import store, { persistor } from './store/index.ts';
import { Provider } from 'react-redux';
import Background from './components/background/index.tsx';
import './styles/output.css';
import { RouterProvider } from 'react-router-dom';
import router from './router/index.tsx';
import { PersistGate } from 'redux-persist/integration/react';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <Background />
      <div className=" min-h-screen m-0 p-0">
        <RouterProvider router={router} fallbackElement={<p>Loading...</p>} />
      </div>
    </PersistGate>
  </Provider>
);
