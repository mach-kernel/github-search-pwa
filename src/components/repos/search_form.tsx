import * as repoActions from '@/store/repos/actions';
import { SearchRepoQuery } from '@/store/repos/types';
import { Card, Divider, Heading, IconButton, Input, InputGroup, InputLeftElement, InputRightElement } from '@chakra-ui/react';
import { CloseIcon, DeleteIcon, SearchIcon } from '@chakra-ui/icons';
import { connect } from 'react-redux';
import { ActionType } from 'typesafe-actions';
import { ApplicationState } from '@/store';

interface SearchFormStateProps {
  currentQuery?: Partial<SearchRepoQuery>;
}

interface SearchFormDispatchProps {
  updateQuery: (q: Partial<SearchRepoQuery>) => ActionType<typeof repoActions.updateQueryAction>;
  searchRequest: (q: SearchRepoQuery) => ActionType<typeof repoActions.repoSearchAction.request>;
}

export type SearchFormProps = SearchFormStateProps & SearchFormDispatchProps;

const SearchForm: React.FunctionComponent<SearchFormProps> = ({ currentQuery, updateQuery }) => (
  <Card w='100%' padding={25}>
    <Heading mb={1} fontWeight={400}>
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
        onInput={(e: React.ChangeEvent<HTMLInputElement>) => updateQuery({ q: e.target.value }) }
      />

      {currentQuery?.q?.length && 
      <InputRightElement
        children={<IconButton 
                    onClick={() => updateQuery({ q: '' })}
                    aria-label='Search database' 
                    icon={<CloseIcon />}
                  />}
      />}
    </InputGroup>
  </Card>
);

export default connect(
  ({ repo }: ApplicationState) => ({ currentQuery: repo.query }),
  (dispatch) => ({ 
    updateQuery: (
      q: Partial<SearchRepoQuery>
    ) => dispatch(repoActions.updateQueryAction(q)),
  })
)(SearchForm);
