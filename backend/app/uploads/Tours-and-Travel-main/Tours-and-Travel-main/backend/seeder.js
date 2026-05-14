const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Tour = require('./models/Tour');

dotenv.config();

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const tours = [
  {
    title: 'Everest Base Camp Trek',
    description: 'Experience the ultimate adventure by trekking to the base camp of the highest mountain in the world. Enjoy breathtaking views of the Himalayas and Sherpa culture.',
    price: 150000,
    location: 'Everest Base Camp',
    region: 'Koshi Province',
    images: ['https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=800&auto=format&fit=crop'],
    duration: 14,
    category: 'Adventure',
    featured: true,
    itinerary: [
      { day: 1, title: 'Arrival in Kathmandu', description: 'Welcome to Nepal! Upon arrival at Tribhuvan International Airport, you will be greeted by our representative and transferred to your hotel. Rest and prepare for the trek.' },
      { day: 2, title: 'Flight to Lukla and Trek to Phakding', description: 'Early morning flight to Lukla (2,860m) offering stunning views of the Himalayas. Begin the trek with a gentle walk to Phakding (2,610m).' },
      { day: 3, title: 'Trek to Namche Bazaar', description: 'Trek along the Dudh Koshi river, cross thrilling suspension bridges, and ascend steeply to Namche Bazaar (3,440m), the gateway to Everest.' }
    ]
  },
  {
    title: 'Pokhara Lakeside Retreat',
    description: 'Relax by the serene Phewa Lake with spectacular views of the Annapurna range. Enjoy boating, paragliding, and a vibrant nightlife.',
    price: 25000,
    location: 'Pokhara',
    region: 'Gandaki Province',
    images: ['https://images.unsplash.com/photo-1581803734138-0428d003328e?q=80&w=800&auto=format&fit=crop'],
    duration: 5,
    category: 'Relaxation',
    featured: true
  },
  {
    title: 'Chitwan Jungle Safari',
    description: 'Explore the wildlife of Nepal in Chitwan National Park. Spot rhinos, Bengal tigers, and crocodiles on an exciting elephant or jeep safari.',
    price: 35000,
    location: 'Chitwan',
    region: 'Bagmati Province',
    images: ['https://images.unsplash.com/photo-1548013146-72479768bada?q=80&w=800&auto=format&fit=crop'],
    duration: 3,
    category: 'Wildlife',
    featured: true
  },
  {
    title: 'Kathmandu Valley Cultural Tour',
    description: 'Discover the ancient temples, stupas, and palaces of the Kathmandu Valley. A deep dive into the rich history and traditions of Nepal.',
    price: 15000,
    location: 'Kathmandu',
    region: 'Bagmati Province',
    images: ['https://images.unsplash.com/photo-1587595431973-160d0d94add1?q=80&w=800&auto=format&fit=crop'],
    duration: 4,
    category: 'Cultural',
    featured: false
  },
  {
    title: 'Annapurna Circuit Trek',
    description: 'One of the best long-distance treks in the world. Cross the Thorong La Pass and witness diverse landscapes from lush valleys to arid peaks.',
    price: 120000,
    location: 'Annapurna Region',
    region: 'Gandaki Province',
    images: ['https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=800&auto=format&fit=crop'],
    duration: 18,
    category: 'Adventure',
    featured: false
  },
  {
    title: 'Lumbini Pilgrimage',
    description: 'Visit the birthplace of Lord Buddha. Explore the Maya Devi Temple and numerous international monasteries in a peaceful environment.',
    price: 18000,
    location: 'Lumbini',
    region: 'Lumbini Province',
    images: ['https://images.unsplash.com/photo-1581803734138-0428d003328e?q=80&w=800&auto=format&fit=crop'],
    duration: 2,
    category: 'Cultural',
    featured: false
  },
  {
    title: 'Nagarkot Sunrise View',
    description: 'Experience stunning sunrise views over the Himalayas, including Mount Everest. A perfect short getaway from Kathmandu.',
    price: 8000,
    location: 'Nagarkot',
    region: 'Bagmati Province',
    images: ['https://images.unsplash.com/photo-1587595431973-160d0d94add1?q=80&w=800&auto=format&fit=crop'],
    duration: 2,
    category: 'Relaxation',
    featured: true
  },
  {
    title: 'Bandipur Heritage Walk',
    description: 'Explore the beautifully preserved Newari culture and architecture in the hilltop town of Bandipur. Enjoy panoramic mountain views.',
    price: 12000,
    location: 'Bandipur',
    region: 'Gandaki Province',
    images: ['https://images.unsplash.com/photo-1581803734138-0428d003328e?q=80&w=800&auto=format&fit=crop'],
    duration: 3,
    category: 'Cultural',
    featured: false
  }
];

const importData = async () => {
  try {
    await Tour.deleteMany();
    await Tour.insertMany(tours);
    console.log('Data Imported!');
    process.exit();
  } catch (error) {
    console.error(`Error: ${error}`);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await Tour.deleteMany();
    console.log('Data Destroyed!');
    process.exit();
  } catch (error) {
    console.error(`Error: ${error}`);
    process.exit(1);
  }
};

if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}
