import bcrypt from 'bcryptjs';

const data = {
    users: [
        {
            name:'admin',
            user_email:'admin@ppt',
            password: bcrypt.hashSync('admin', 8),
            userCredentialsAdministrator: true,
        },
        {
            name:'Mike',
            user_email:'user@ppt',
            password: bcrypt.hashSync('mike', 8),
            userCredentialsAdministrator: false,
        },
    ],
    products: [
        {
            name: 'WTF Taekwondo Suit',
            product_catergory: 'Suits',
            picture: '/images/p1.jpg',
            price:120,
            countInStock: 10,
            productBrand: 'WTF',
            user_rating: 4.5,
            numReviews: 10,
            productDescription: 'high quality item'
        },
        {
            name: 'Adidas Taekwondo Suit',
            product_catergory: 'Suits',
            picture: '/images/p2.jpg',
            price:100,
            countInStock: 20,
            productBrand: 'Adidas',
            user_rating: 4.0,
            numReviews: 10,
            productDescription: 'high quality item'
        },
        {
            name: 'Nike Taekwondo Suit',
            product_catergory: 'Suits',
            picture: '/images/p3.jpg',
            price:220,
            countInStock: 30,
            productBrand: 'Nike',
            user_rating: 4.5,
            numReviews: 10,
            productDescription: 'high quality item'
        },
        {
            name: 'Adidas Taekwondo Belts',
            product_catergory: 'Belts',
            picture: '/images/p4.jpg',
            price:70,
            countInStock: 5,
            productBrand: 'Adidas',
            user_rating: 4.5,
            numReviews: 10,
            productDescription: 'high quality item'
        },
        {
            name: 'Adidas Red Body Armour',
            product_catergory: 'Body Armour',
            picture: '/images/p5.jpg',
            price:80,
            countInStock: 0,
            productBrand: 'Adidas',
            user_rating: 4.5,
            numReviews: 10,
            productDescription: 'high quality item'
        },
        {
            name: 'Adidas Blue Body Armour',
            product_catergory: 'Body Armour',
            picture: '/images/p6.jpg',
            price:80,
            countInStock: 12,
            productBrand: 'Adidas',
            user_rating: 4.5,
            numReviews: 10,
            productDescription: 'high quality item'
        },
    ]
}

export default data;