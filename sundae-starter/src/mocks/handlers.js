import { http, HttpResponse } from 'msw';

export const handlers = [
  // A url é mockada, pode ser qualquer uma e em qualquer porta.
  // Aqui é utilizada http://localhost:3030 porque o servidor teste está configurado para isso,
  // mas poderíamos colocar qualquer outra que daria na mesma
  http.get('http://localhost:3030/scoops', () => {
    return HttpResponse.json([
      { name: 'Chocolate', imagePath: 'images/chocolate.png' },
      { name: 'Vanilla', imagePath: 'images/vanilla.png' },
    ]);
  }),

  http.get('http://localhost:3030/toppings', () => {
    return HttpResponse.json([
      { name: 'Cherries', imagePath: '/images/cherries.png' },
      { name: 'M&Ms', imagePath: '/images/m-and-ms.png' },
      { name: 'Hot fudge', imagePath: '/images/hot-fudge.png' },
    ]);
  }),
];
