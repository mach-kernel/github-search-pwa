import SearchForm from '@/components/repos/search_form';
import { Container } from '@chakra-ui/react';
import Head from 'next/head';
import { connect } from 'react-redux';

const Index: React.FunctionComponent = () => (
  <>
    <Head>
      <title>Repo Search</title>
    </Head>
    <Container maxW='container.xl' marginTop='2rem'>
      <SearchForm />
    </Container>
  </>
)

export default Index;
