import { SearchFormUserProps } from '@/components/repos/search_form';
import { ApplicationState } from '@/store';
import { Repository } from '@/store/repos/types';
import { Box, Card, Center, Container, Fade, Flex, Skeleton, SlideFade, Spacer, Spinner, VStack } from '@chakra-ui/react';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import { connect } from 'react-redux';

const SearchForm = dynamic<SearchFormUserProps>(() => import('@/components/repos/search_form'));
const RepoItem = dynamic(() => import('@/components/repos/repo_item'));

interface IndexStateProps {
  loading: boolean,
  rows: Repository[],
}

const Index: React.FunctionComponent<IndexStateProps> = ({ loading, rows }) => (
  <>
    <Head>
      <title>Repo Search</title>
    </Head>
    
    <Container maxW='container.xl' marginTop='2rem' alignItems='center'>
      <SearchForm />
      <Fade in={loading}>
        <Center>
          <Spinner mt={6} alignSelf='center' size='xl' />
        </Center>
      </Fade>
      <SlideFade in={!loading} dir='top'>
        <Center>
          <VStack spacing={4} maxW='container.md'>
            {rows.map(r => (<RepoItem {...r} />))}
          </VStack>
        </Center>
      </SlideFade>
    </Container>
  </>
)

export default connect(
  ({ repo }: ApplicationState) => ({ 
    loading: repo.loading,
    rows: repo.rows, 
  })
)(Index);
