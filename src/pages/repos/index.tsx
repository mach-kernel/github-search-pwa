import { type SearchFormUserProps } from '@/components/repos/search_form'
import { wrapper, type ApplicationState } from '@/store'
import { type Repository, type SearchRepoQuery } from '@/store/repos/types'
import { Box, Card, Center, Container, Fade, Flex, Skeleton, SlideFade, Text, Spinner, VStack } from '@chakra-ui/react'
import dynamic from 'next/dynamic'
import Head from 'next/head'
import { connect } from 'react-redux'
import { InView, useInView } from 'react-intersection-observer'
import { repoSearchAction, updateQueryAction } from '@/store/repos/actions'
import { type ActionType } from 'typesafe-actions'
import { GetServerSideProps } from 'next'
import { END } from 'redux-saga'

const SearchForm = dynamic<SearchFormUserProps>(async () => await import('@/components/repos/search_form'))
const RepoItem = dynamic(async () => await import('@/components/repos/repo_item'))

interface IndexDispatchProps {
  updateQuery: (q: Partial<SearchRepoQuery>) => ActionType<typeof updateQueryAction>
}

interface IndexStateProps {
  loading: boolean
  rows: Repository[]
  total: number
  query?: Partial<SearchRepoQuery>
}

export type IndexProps = IndexDispatchProps & IndexStateProps

const Index: React.FunctionComponent<IndexProps> = ({ loading, rows, total, query, updateQuery }) => (
  <>
    <Head>
      <title>Repo Search</title>
    </Head>

    <Container maxW='container.xl' marginTop='2rem' alignItems='center'>
      <SearchForm />
      <SlideFade in={rows.length > 0} dir='top'>
        <Center mt={6} mb={8}>
          <VStack spacing={4} maxW='container.md'>
            { total > 0 && <Text fontSize='sm' color='gray.600'> Found { total } repos</Text> }
            { rows.map((r) => (<RepoItem key={`ri-${r.id}`} {...r} />)) }
          </VStack>
        </Center>
      </SlideFade>
      <Fade in={loading}>
        <Center>
          <Spinner mt={6} mb={6} alignSelf='center' size='xl' />
        </Center>
      </Fade>
      <InView initialInView={false}
              onChange={(iv, e) => {
                if (iv && (rows.length > 0)) { updateQuery({ ...query, page: (query?.page ?? 1) + 1 }) }
              }} />
    </Container>
  </>
)

export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps((store) => async (ctx) => {
  console.log(ctx.query)
  store.dispatch(updateQueryAction(ctx.query));
  // for
  store.dispatch(END);

  await store.sagaTask?.toPromise();
  return { props: { query: ctx.query } };
})

export default connect(
  ({ repo }: ApplicationState) => ({
    loading: repo.loading,
    rows: repo.rows,
    total: repo.total,
    query: repo.query
  }),
  (dispatch) => ({
    updateQuery: (
      q: Partial<SearchRepoQuery>
    ) => dispatch(updateQueryAction(q))
  })
)(Index)
