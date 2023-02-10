import '@/styles/globals.css'
import 'react-flexbox-grid/dist/react-flexbox-grid.css'

import type { AppProps } from 'next/app'
import { wrapper } from '@/store/index';
import { Provider } from 'react-redux';
import { ChakraProvider } from '@chakra-ui/react';

const App = ({ Component, ...ctx }: AppProps) => {
  const { store, props } = wrapper.useWrappedStore(ctx);
  
  return <>
    <ChakraProvider>
      <Provider store={store}>
        <Component {...props} />
      </Provider>      
    </ChakraProvider>
  </>;
};

export default App;