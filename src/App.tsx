import '@/index.css';
import { store } from '@/store';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { TidePools } from './Pages/TidePools';

const MainContext = React.createContext({});
const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
    <Provider store={store}>
      <BrowserRouter>
        <MainContext.Provider value={{}}>
          <TidePools/>
        </MainContext.Provider>
      </BrowserRouter>
    </Provider>
    </QueryClientProvider>
  </React.StrictMode>,
);
