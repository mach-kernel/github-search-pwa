import * as repoActions from '@/store/repos/actions';
import { Repository, SearchRepoQuery } from '@/store/repos/types';
import { Card, Divider, Heading, IconButton, Input, InputGroup, InputLeftElement, InputRightElement, Select } from '@chakra-ui/react';
import { CloseIcon, DeleteIcon, SearchIcon, UpDownIcon } from '@chakra-ui/icons';
import { connect } from 'react-redux';
import { ActionType } from 'typesafe-actions';
import { ApplicationState } from '@/store';

interface SearchFormStateProps {
  currentQuery?: Partial<SearchRepoQuery>;
}

interface SearchFormDispatchProps {
  updateQuery: (q: Partial<SearchRepoQuery>) => ActionType<typeof repoActions.updateQueryAction>;
  clearQuery: (...rows: Repository[]) => ActionType<typeof repoActions.clearQuery>;
}

export interface SearchFormUserProps {}

export type SearchFormProps = SearchFormStateProps & SearchFormDispatchProps & SearchFormUserProps;

const SearchForm: React.FunctionComponent<SearchFormProps> = ({ currentQuery, updateQuery, clearQuery }) => (
  <Card 
    zIndex={100}
    position='sticky'
    top={0}
    w='100%'
    padding={25}
    shadow='lg'
  >
    <Heading mb={1} fontWeight={400} bgClip='text' bgColor='blue.600'>
      Find a repo
    </Heading>
    <Divider opacity={0.25} mb={8} />
    <InputGroup>
      <InputLeftElement
        pointerEvents='none'
        children={<SearchIcon color='gray.300' />}
      />
      <Input
        value={currentQuery?.q ?? ''}
        placeholder='language:clojure instaparse' 
        onInput={(e: React.ChangeEvent<HTMLInputElement>) => updateQuery({ q: e.target.value, page: 1 }) }
      />

      {currentQuery?.q?.length && 
      <InputRightElement
        children={<IconButton 
                    onClick={() => {
                      updateQuery({ q: '' });
                      clearQuery();
                    }}
                    aria-label='Search database' 
                    icon={<CloseIcon />}
                  />}
      />}
    </InputGroup>
  </Card>
);

export default connect<SearchFormStateProps, SearchFormDispatchProps, SearchFormUserProps, ApplicationState>(
  ({ repo }: ApplicationState) => ({ currentQuery: repo.query }),
  (dispatch) => ({ 
    updateQuery: (
      q: Partial<SearchRepoQuery>
    ) => dispatch(repoActions.updateQueryAction(q)),
    clearQuery: () => dispatch(repoActions.clearQuery()),
  })
)(SearchForm);
