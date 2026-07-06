const Api = {
  baseURL: 'https://fakestoreapi.com',
  timeout: 60000,
  endpoints: getEndpoints()
};

function getEndpoints() {
  return {
    products: '/products',
    productsById: (id: number) => `/products/${id}`,
    category: '/products/categories',
    productsByCategory: (category: string) => `/products/category/${category}`
  }
}

export default Api;