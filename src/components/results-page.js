import algoliasearch from 'algoliasearch';
import instantsearch from 'instantsearch.js';
import {
  searchBox,
  hits,
  pagination,
  configure,
  refinementList,
} from 'instantsearch.js/es/widgets';
import aa from 'search-insights';

import resultHit from '../templates/result-hit';

/**
 * @class ResultsPage
 * @description Instant Search class to display content on main page.
 */
class ResultPage {
  constructor() {
    this._registerClient();
    this._registerWidgets();
    this._startSearch();
  }

  /**
   * Handles creating the search client and creating an instance of instant search.
   
   * @private
   * @returns {void}
   */
  _registerClient() {
    this._searchClient = algoliasearch(
      process.env.ALGOLIA_APP_ID,
      process.env.ALGOLIA_API_KEY
    );
    aa('init', {
      appId: process.env.ALGOLIA_APP_ID,
      apiKey: process.env.ALGOLIA_API_KEY,
      useCookie: true,
    });
    this._searchInstance = instantsearch({
      indexName: process.env.ALGOLIA_INDEX,
      searchClient: this._searchClient,
    });
  }

  /**
   * Adds widgets to the Algolia instant search instance.
   
   * @private
   * @returns {void}
   */
  _registerWidgets() {
    this._searchInstance.addWidgets([
      searchBox({
        container: '#searchbox',
      }),
      hits({
        container: '#hits',
        templates: {
          item: resultHit,
        },
      }),
      configure({
        clickAnalytics: true,
        enablePersonalization: true,
      }),
      pagination({
        container: '#pagination',
      }),
      refinementList({
        container: '#brand-facet',
        attribute: 'brand',
      }),
      refinementList({
        container: '#categories-facet',
        attribute: 'categories',
      }),
    ]);
  }

  /**
   * Retrieves the search context for a given hit.
   *
   * @private
   * @param {string} objectID - The objectID of the hit.
   * @returns {{ queryID: string, position: number }} - The queryID and absolute position of the hit.
   */
  _getSearchContext(objectID) {
    const {
      queryID,
      page,
      hitsPerPage,
      hits: searchHits,
    } = this._searchInstance.helper.lastResults;

    const positionOnPage = searchHits.findIndex(
      (hit) => hit.objectID === objectID
    );
    const position = positionOnPage + page * hitsPerPage + 1;

    return {
      queryID,
      position,
    };
  }

  /**
   * Sends a click event to Algolia Insights.
   *
   * @private
   * @param {string} objectID - The objectID of the clicked hit.
   * @returns {void}
   */
  _sendClickEvent(objectID) {
    const { queryID, position } = this._getSearchContext(objectID);

    aa('clickedObjectIDsAfterSearch', {
      index: process.env.ALGOLIA_INDEX,
      eventName: 'Hit Clicked',
      queryID,
      objectIDs: [objectID],
      positions: [position],
    });
  }

  /**
   * Sends a conversion event to Algolia Insights.
   *
   * @private
   * @param {string} objectID - The objectID of the converted hit.
   * @returns {void}
   */
  _sendCartEvent(objectID) {
    const { queryID } = this._getSearchContext(objectID);

    aa('convertedObjectIDsAfterSearch', {
      index: process.env.ALGOLIA_INDEX,
      eventName: 'Added To Cart',
      queryID,
      objectIDs: [objectID],
    });
  }

  /**
   * Starts instant search after widgets are registered.
   
   * @private
   * @returns {void}
   */
  _startSearch() {
    this._searchInstance.start();

    document.addEventListener('click', (event) => {
      const id = event.target.id;

      if (id.startsWith('view-item-')) {
        const objectID = id.replace('view-item-', '');
        this._sendClickEvent(objectID);
      }

      if (id.startsWith('add-to-cart-')) {
        const objectID = id.replace('add-to-cart-', '');
        this._sendCartEvent(objectID);
      }
    });
  }
}

export default ResultPage;
