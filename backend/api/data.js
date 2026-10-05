import { faker } from '@faker-js/faker';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  await new Promise((resolve) => setTimeout(resolve, 2000));

  const items = [];
  const count = Math.floor(Math.random() * 5) + 3;

  for (let i = 0; i < count; i++) {
    items.push({
      id: faker.string.uuid(),
      title: faker.lorem.sentence(),
      description: faker.lorem.paragraph(),
      image: faker.image.url(),
      price: faker.commerce.price(),
    });
  }

  res.json({
    status: 'ok',
    timestamp: Date.now(),
    items,
  });
}