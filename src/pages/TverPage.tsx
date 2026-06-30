import LandPageTemplate from '../components/LandPageTemplate'

const tverData = {
  name: 'Тверь',
  fullName: 'СВЕТЛАЯ ДОЛИНА',
  location: 'Тверская область, р-н Ржевский',
  image: '/images/tver-bg.jpg',
  mapUrl: 'https://yandex.ru/maps/?pt=34.5,56.2&z=12&l=sat',
  inDevelopment: false,
  buttons: {
    presentation: 'https://disk.yandex.ru/d/0FcURhVsl9jMkQ',
    tour3d: '',
    chess: 'https://disk.yandex.ru/d/_bA0jHhzuMWOjg',
    renders: 'https://disk.yandex.ru/d/r1JgHzfbfx8iUA',
    layouts: 'https://disk.yandex.ru/d/OQIj3TKbDJTlIQ',
    profitability: '#/installment/tver',
    documentsClient: 'https://disk.yandex.ru/d/ymbuRYnn8R0EYw',
    documentsAgent: 'https://disk.yandex.ru/d/ymbuRYnn8R0EYw',
    photos: 'https://disk.yandex.ru/d/NuE37AQZJvehDg'
  }
}

export default function TverPage() {
  return <LandPageTemplate landData={tverData} />
}
