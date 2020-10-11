import * as React from 'react';
import {SearchResultsContext} from '../store/searchResults/Context';
import {Card} from '../components/Card';
// import InfiniteScroll from 'react-infinite-scroll-component';
import { SearchFilters, SearchResult } from '../store/searchResults/Reducer';
import {Filter} from './Filter';

export interface SearchResults {
  date: string;
  events: any[];
}

export const Results = () => {
  const {searchResultsState} = React.useContext(SearchResultsContext);
  const searchResults = searchResultsState.searchResults;

  if (searchResultsState.searchFilters === SearchFilters.DISTRIBUTOR) {
    filterByDistributor();
  }
  return (
    <div className="SearchResults">
      <Filter />
      <div className="Results">
        {
          searchResults.length > 0 ? searchResults.map((e: any, index) => 
            <ResultsGroup date={e.date} events={e.events} key={index}/>
          ) : null
        }
      </div>
    </div>
  )
}

export const filterByDistributor = () => {
  // 
}

// export const InfiniteScrollResults = () => {
//   const {searchResultsState} = React.useContext(SearchResultsContext);
//   const [hasMore, setHasMore] = React.useState<boolean>(true);
//   const [maxLength, setMaxLength] = React.useState<number>(0);
//   const [visibleSearchResults, setVisibleSearchResults] = React.useState<SearchResult[]>([]);
//   const [visibleSearchResultsLength, setVisibleSearchResultsLength] = React.useState<number>(0);
//   const [startingIndex, setStartingIndex] = React.useState<number>(0);
//   const prefferedNumberOfResults: number = 15;
  
//   // preffered number of results per page = 15
//   // const setInitialData = React.useCallback(() => {
//   //   const initialDataSet: SearchResult[] = [];
//   //   while (visibleSearchResultsLength >= maxLength) {
//   //     const currentSearchResult = searchResultsState.searchResults[startingIndex];
//   //     initialDataSet.push(currentSearchResult);
//   //     setVisibleSearchResultsLength(visibleSearchResults + currentSearchResult.events.length);
//   //     setStartingIndex(startingIndex + 1);
//   //   }
//   // }, [maxLength, startingIndex, visibleSearchResults, searchResultsState.searchResults, visibleSearchResultsLength]);

//   React.useEffect(() => {
//     const maxLength: number = searchResultsState.searchResults.reduce((numberOfResults, searchResult) => 
//       numberOfResults += searchResult.events.length
//     , 0);

//     setMaxLength(maxLength);
//     //setInitialData();
//   }, [searchResultsState]);

//   const fetchMoreData = () => {
//     const visibleSearchResultsLength: number = visibleSearchResults.reduce((numberOfResults, searchResult) => numberOfResults += searchResult.events.length, 0);
//     if (visibleSearchResultsLength >= maxLength) {
//       setHasMore(false);
//       return
//     }

//     setTimeout(() => {
//       setVisibleSearchResults([])
//     }, 500)
//   }
  
//   // we receieved the whole array - searchResultsState
//   // search results length directly corresponds to the distinct number of dates returned from the call
//   // the number of results however, is not available at a glance - and will need to be tracked separately 
//   // we need to build up the visibleResults array with every scroll

//   const determineVisibleResults = () => {
//     // know your prefferedNumberOfResults
//     // track your currentNumberOfResults
//     // track the index of searchResultsState you're currently at
//     // while the length of the visibleResults is still above the currentNumberOfResults
//       // loop through the searchResultsState (starting at a certain index)
//       // push the whole searchResult object to visibleResults
//       // update currentNumberOfResults
//   }

//   return (
//     <div className="Results"> 
//       <InfiniteScroll
//         dataLength={searchResultsState.searchResults.length || 0}
//         hasMore={hasMore}
//         next={fetchMoreData}
//         loader={<h4>Loading...</h4>}
//       >
//         {
//           searchResultsState.searchResults.length > 0 ? searchResultsState.searchResults.map((e: any, index) => 
//             <ResultsGroup date={e.date} events={e.events} key={index}/>
//           ) : null
//         }
//       </InfiniteScroll>
//     </div>
//   )
// }

export const ResultsGroup = (searchResult: SearchResults) => {
  return (
    <div className="Results_group">
      <h1 className="Results_date">{searchResult.date !== 'null' ? searchResult.date : 'Date TBD'}</h1>
      {
        searchResult.events.map((e: any, index: number) => 
          <Card 
            name={e.name} 
            status={e.status}
            date={e.date} 
            time={e.time}
            priceBeforeFees={e.priceBeforeFees}
            priceAfterFees={e.priceAfterFees}
            isPriceEstimated={e.isPriceEstimated}
            source={e.source} 
            venueName={e.venueName}
            venueCity={e.venueCity}
            url={e.url}
            sourceUrl={e.sourceUrl}
            key={index}
          />
        )
      }
    </div>
  )
}

// we need to start keeping track of the custom fields on the objects which we always expect to have
// they are the crucial bits of the front end and should be treated as such in the code