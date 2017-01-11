import delay from './delay';

class ProductApi {
  static getAllProducts() {
    return new Promise( (resolve, reject) => {
      setTimeout( () => {
        resolve(Object.assign([], products));
      }, delay);
    });
  }
}

const products = [
  {
    id: 'audacity-of-hope',
    name: 'Audacity of Hope',
    price: 'ksh 1000.50',
    descriprion: 'Thoughts on Reclaiming the American Dream is the second book written by then-Senator Barack Obama',
    color: '',
    size: '',
    image:  'https://upload.wikimedia.org/wikipedia/en/2/28/AudacityofHope.jpg',
    category_id: 'books-are-meant-to-be-read',
    categoryName: 'Books',
    quantity: 25
  },
  {
    id: 'facing-mount-kenya',
    name: 'Facing Mount Kenya',
    price: 'ksh 800.50',
    descriprion: 'Book written by First president of Kenya Jomo Kenyatta',
    color: '',
    size: '',
    image: 'http://www.africanbookscollective.com/books/facing-mount-kenya/cover_preview',
    category_id: 'books-are-meant-to-be-read',
    categoryName: 'Books',
    quantity: 123
  },
  {
    id: 'vegetables',
    name: 'Vegetables',
    price: 'ksh 190',
    descriprion: 'a vegetable is any part of a plant that is consumed by humans as food as part of a savory meal.',
    color: 'green',
    size: '',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/Marketvegetables.jpg/220px-Marketvegetables.jpg',
    category_id: 'foodstuffs-should-always-be-eaten',
    categoryName: 'Food Stuffs',
    quantity: 500
  },
  {
    id: 'milk',
    name: 'Milk',
    price: 'ksh 100',
    descriprion: 'Milk is a pale liquid produced',
    color: 'white',
    size: '',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0e/Milk_glass.jpg/220px-Milk_glass.jpg',
    category_id: 'foodstuffs-should-always-be-eaten',
    categoryName: 'Food Stuffs',
    quantity: 23
  },
  {
    id: 'televisons',
    name: 'Televisions',
    price: 'ksh 10,000',
    descriprion: 'a telecommunication medium used for transmitting moving images in monochrome (black-and-white), or in color',
    color: 'black, white',
    size: '17, 18 inches',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/40/Cptvdisplay.jpg/300px-Cptvdisplay.jpg',
    category_id: 'electronics',
    categoryName: 'Electronics',
    quantity: 230
  },
  {
    id: 'home-theaters',
    name: 'Home Theater',
    price: 'ksh 100,000',
    descriprion: 'A "home theater in a box" (HTIB) is an integrated home theater package which "bundles" together a combination DVD or Blu-ray player, ',
    color: 'black',
    size: '',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/Digital_home_ap.jpg/200px-Digital_home_ap.jpg',
    category_id: 'electronics',
    categoryName: 'Electronics',
    quantity: 3
  }

];


export default ProductApi;
