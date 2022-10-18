export const products = Array(10)
  .fill({})
  .map((_, i) => {
    return {
      id: String(i + 1),
      description: `Description ${i + 1}`,
      price: (i + 50) * 4,
      title: `Product ${i + 1}`,
    }
  });
