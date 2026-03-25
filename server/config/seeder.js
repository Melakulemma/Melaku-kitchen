const User = require('../models/User');
const Product = require('../models/Product');

const mockProducts = [
  { name_en: 'Doro Wat', name_am: 'ዶሮ ወጥ', price: 450, category: 'Main', rating: 5, description: 'Spicy chicken stew with egg and berbere sauce', image: '/images/doro-wat.jpg' },
  { name_en: 'Kitfo', name_am: 'ክትፎ', price: 550, category: 'Main', rating: 4.5, description: 'Minced raw beef marinated in mitmita and niter kibbeh', image: '/images/kitfo.jpg' },
  { name_en: 'Tibs', name_am: 'ጥብስ', price: 500, category: 'Main', rating: 5, description: 'Sautéed cubed beef or lamb with vegetables', image: '/images/tibs.jpg' },
  { name_en: 'Enjera', name_am: 'እንጀራ', price: 50, category: 'Main', rating: 4, description: 'Traditional sourdough flatbread, the foundation of every meal', image: '/images/enjera.jpg' },
  { name_en: 'Firfir', name_am: 'ፍርፍር', price: 180, category: 'Main', rating: 4.5, description: 'Shredded injera cooked with berbere spice and niter kibbeh', image: '/images/firfir.jpg' },
  { name_en: 'Tihlo', name_am: 'ጥህሎ', price: 220, category: 'Main', rating: 4, description: 'Baked barley dumplings served with spicy lamb stew', image: '/images/tihlo.jpg' },
  { name_en: 'Chechebsa', name_am: 'ጨጨብሳ', price: 160, category: 'Main', rating: 4.5, description: 'Shredded flatbread mixed with berbere and niter kibbeh — a breakfast favourite', image: '/images/chechebsa.jpg' },
  { name_en: 'Beyaynetu', name_am: 'በያይነቱ', price: 300, category: 'Vegetarian', rating: 5, description: 'A colourful platter of various Ethiopian vegetarian dishes on injera', image: '/images/beyaynetu.jpg' },
  { name_en: 'Pasta', name_am: 'ፓስታ', price: 250, category: 'Main', rating: 3.5, description: 'Ethiopian-style tomato pasta with local spices', image: '/images/pasta.jpg' },
  { name_en: 'Shiro', name_am: 'ሽሮ', price: 200, category: 'Vegetarian', rating: 4, description: 'Smooth chickpea stew with spiced butter', image: '/images/shiro.jpg' },
  { name_en: 'Tej', name_am: 'ጠጅ', price: 150, category: 'Drinks', rating: 4.5, description: 'Traditional Ethiopian honey wine', image: '/images/tej.jpg' },
  { name_en: 'Tela', name_am: 'ጠላ', price: 80, category: 'Drinks', rating: 4, description: 'Traditional homemade Ethiopian sorghum beer', image: '/images/tela.jpg' },
  { name_en: 'Areke', name_am: 'አረቄ', price: 120, category: 'Drinks', rating: 3.5, description: 'Traditional Ethiopian distilled spirit made from grain', image: '/images/areke.jpg' },
  { name_en: 'Water', name_am: 'ውሃ', price: 30, category: 'Drinks', rating: 5, description: 'Fresh chilled mineral water', image: '/images/water.jpg' },
  { name_en: 'Keneto Coffee', name_am: 'ቀነቶ ቡና', price: 70, category: 'Drinks', rating: 5, description: 'Rich Ethiopian coffee served in traditional style', image: '/images/keneto.jpg' },
];

const seedAdmin = async () => {
  try {
    const adminExists = await User.findOne({ email: 'admin@melaku.com' });
    if (!adminExists) {
      await User.create({
        name: 'Admin',
        email: 'admin@melaku.com',
        password: 'admin1234',
        isAdmin: true
      });
      console.log('Admin user created: admin@melaku.com / admin1234');
    }

    // Seed products if empty
    const productCount = await Product.countDocuments();
    if (productCount === 0) {
      await Product.insertMany(mockProducts);
      console.log('Mock products seeded: 15 items');
    }
  } catch (error) {
    console.error('Seeder Error:', error.message);
  }
};

module.exports = seedAdmin;
