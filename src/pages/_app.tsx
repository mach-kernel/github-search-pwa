import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { wrapper } from '@/store/index';
import { Provider } from 'react-redux';

const App = ({ Component, ...ctx }: AppProps) => {
  const { store, props } = wrapper.useWrappedStore(ctx);
  
  return <>
    <Provider store={store}>
      <Component {...props} />
    </Provider>
  </>;
};

export default App;