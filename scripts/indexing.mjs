import 'dotenv/config.js';
import algoliasearch from 'algoliasearch';
import products from '../data/products.json' with { type: 'json' };

const appId = process.env.ALGOLIA_APP_ID;
const writeApiKey = process.env.ALGOLIA_API_KEY;
const indexName = process.env.ALGOLIA_INDEX


if (!appId) {
  throw new Error('Missing ALGOLIA_APP_ID environment variable.');
}

if (!writeApiKey) {
  throw new Error('Missing ALGOLIA_API_KEY environment variable.');
}

if (!indexName) {
  throw new Error('Missing ALGOLIA_INDEX environment variable.');
}

const client = algoliasearch(appId, writeApiKey);
const index = client.initIndex(indexName);

async function indexProducts() {

  const transformedData = products.map(product => {
    const isCamera = product.categories.some(cat =>
      cat.toLowerCase().includes('camera')
    );
    return isCamera
      ? { ...product, price: Math.floor(product.price * 0.8) }
      : product;
  });

  await index.saveObjects(transformedData);

  await index.setSettings({
    attributesForFaceting: ["categories", "brand"],
    searchableAttributes: ["name", "brand", "categories", "type", "description"],
    customRanking: ["desc(popularity)", "desc(rating)"],
  });

  console.log(`Indexed ${transformedData.length} products.`);
}

try {
  await indexProducts();
} catch (error) {
  console.error(error);
  process.exitCode = 1;
}
