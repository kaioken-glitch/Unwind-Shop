function scrollList(direction) {
    const categoryList = document.getElementById('categoryList');
    const scrollAmount = 100; // Adjust as needed

    if (direction === 'left') {
        categoryList.scrollLeft -= scrollAmount;
    } else if (direction === 'right') {
        categoryList.scrollLeft += scrollAmount;
    }
}

document.addEventListener('DOMContentLoaded', async () => {
  const mb = document.getElementById('mb');
  const searchInput = document.getElementById('bcs');
  const searchIcon = document.querySelector('.fa-magnifying-glass');

  const products = await fetchMockProducts();

  if (products && products.length > 0) {
    displayProducts(products);

    searchIcon.addEventListener('click', () => {
      const searchTerm = searchInput.value.trim();
      if (searchTerm !== '') {
        performProductSearch(searchTerm);
      }
    });

    searchInput.addEventListener('input', () => {
      clearProductSearchResults();
    });
  } else {
    console.error('Error fetching mock product data');
  }
});

async function fetchMockProducts() {
  const mockApiEndpoint = 'https://fakestoreapi.com/products?_limit=30';

  try {
    const response = await fetch(mockApiEndpoint);
    const data = await response.json();

    return data.map(item => ({
      image: item.thumbnailUrl,
      description: item.title
    }));
  } catch (error) {
    console.error('Error fetching mock product data:', error);
    return [];
  }
}

function displayProducts(products) {
  const mb = document.getElementById('mb');

  for (let i = 0; i < 10; i++) {
    const fd = document.createElement('div');
    fd.classList.add('fd');
    mb.appendChild(fd);

    for (let j = 0; j < 3; j++) {
      const pd = document.createElement('div');
      pd.classList.add('pd');

      const productIndex = i * 3 + j;
      if (productIndex < products.length) {
        const product = products[productIndex];

        const img = document.createElement('img');
        img.src = product.image;
        pd.appendChild(img);

        const overlay = document.createElement('div');
        overlay.classList.add('overlay');

        const description = document.createElement('div');
        description.classList.add('description');
        description.innerText = product.description;

        overlay.appendChild(description);
        pd.appendChild(overlay);

        fd.appendChild(pd);
      }
    }
  }
}

async function performProductSearch(searchTerm) {
  try {
    const searchApiEndpoint = `https://fakestoreapi.com/products?title=${searchTerm}`;
    const response = await fetch(searchApiEndpoint);
    const data = await response.json();

    clearProductSearchResults();
    displayProducts(data);
  } catch (error) {
    console.error('Error fetching search results:', error);
  }
}

function clearProductSearchResults() {
  const mb = document.getElementById('mb');
  mb.innerHTML = ''; // Clear the existing products
}
