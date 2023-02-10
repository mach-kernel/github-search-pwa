import '@/styles/globals.css'
import 'react-flexbox-grid/dist/react-flexbox-grid.css'

import type { AppProps } from 'next/app'
import { wrapper } from '@/store/index';
import { Provider } from 'react-redux';
import { Box, ChakraProvider, Container, Flex, IconButton, Spacer, useColorMode } from '@chakra-ui/react';
import { createStandaloneToast } from '@chakra-ui/toast'
import { MoonIcon } from '@chakra-ui/icons';

const { ToastContainer, toast } = createStandaloneToast();
export const globalToast = toast;

const ColorModeToggle = () => {
  const { toggleColorMode } = useColorMode();
  return (
    <Flex 
      minW='90%' 
      m={2} 
      flexDir='column'>
      <Box alignSelf='flex-end'>
        <IconButton
          onClick={toggleColorMode}
          aria-label='Dark mode' 
          icon={<MoonIcon />} 
        />
      </Box>
    </Flex>
  )
}

const App = ({ Component, ...ctx }: AppProps) => {
  const { store, props } = wrapper.useWrappedStore(ctx);
  
  return <>
    <ChakraProvider>
      <ToastContainer />
      <Provider store={store}>
        <ColorModeToggle />
        <Component {...props} />
      </Provider>
    </ChakraProvider>
  </>;
};

export default App;