const resultHit = (hit) => `<div class="result-hit">
  <div class="result-hit__image-container">
    <img class="result-hit__image" src="${hit.image}" />
  </div>
  <div class="result-hit__details">
    <h3 class="result-hit__name">${hit._highlightResult.name.value}</h3>
    <p class="result-hit__price">$${hit.price}</p>
  </div>
  <div class="result-hit__controls">
 <button id="view-item-${hit.objectID}" class="result-hit__view">View</button>
    <button id="add-to-cart-${hit.objectID}" class="result-hit__cart">Add To Cart</button>
  </div>
</div>`;

export default resultHit;
