import { SearchFormUserProps } from '@/components/repos/search_form';
import { ApplicationState } from '@/store';
import { Box, Card, Center, Container, Fade, Flex, Skeleton, Spacer, Spinner } from '@chakra-ui/react';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import { connect } from 'react-redux';

const SearchForm = dynamic<SearchFormUserProps>(() => import('@/components/repos/search_form'));

interface IndexStateProps {
  loading: boolean
}

const Index: React.FunctionComponent<IndexStateProps> = ({ loading }) => (
  <>
    <Head>
      <title>Repo Search</title>
    </Head>
    
    <Container maxW='container.xl' marginTop='2rem' alignItems='center'>
      <SearchForm />
      <Fade in={loading}>
        <Center mt={8}>
          <Spinner alignSelf='center' size='xl' />
        </Center>
      </Fade>
    </Container>
  </>
)

export default connect(
  ({ repo }: ApplicationState) => ({ loading: repo.loading })
)(Index);
