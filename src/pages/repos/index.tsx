import { SearchFormUserProps } from '@/components/repos/search_form';
import { ApplicationState } from '@/store';
import { Repository } from '@/store/repos/types';
import { Box, Card, Center, Container, Fade, Flex, Skeleton, SlideFade, Text, Spinner, VStack } from '@chakra-ui/react';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import { connect } from 'react-redux';

const SearchForm = dynamic<SearchFormUserProps>(() => import('@/components/repos/search_form'));
const RepoItem = dynamic(() => import('@/components/repos/repo_item'));

interface IndexStateProps {
  loading: boolean,
  rows: Repository[],
  total: number,
}

const Index: React.FunctionComponent<IndexStateProps> = ({ loading, rows, total }) => (
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
        <Center mb={8}>
          <VStack spacing={4} maxW='container.md'>
            { total > 0 && <Text fontSize='sm' color='gray.600'> Found { total } repos</Text> }
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
    total: repo.total,
  })
)(Index);
