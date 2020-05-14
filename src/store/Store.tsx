import * as React from 'react';
// component which will house all the necessary contexts 
const defaultValue = '';
const SearchResultsContext: React.Context<any> = React.createContext(defaultValue);

const Store: React.FunctionComponent = ({children}) => {
  const [searchResults, setSearchResults] = React.useState(defaultValue);
  return (
    <SearchResultsContext.Provider value={[searchResults, setSearchResults]}>
      {children}
    </SearchResultsContext.Provider>
  ) 
}

export default Store;