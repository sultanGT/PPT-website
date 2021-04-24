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
            productCategory: 'Suits',
            picture: '/images/p1.jpg',
            price:120,
            countInStock: 10,
            productBrand: 'WTF',
            userRating: 4.5,
            numReviews: 10,
            productDescription: 'high quality item'
        },
        {
            name: 'Adidas Taekwondo Suit',
            productCategory: 'Suits',
            picture: '/images/p2.jpg',
            price:100,
            countInStock: 20,
            productBrand: 'Adidas',
            userRating: 4.0,
            numReviews: 10,
            productDescription: 'high quality item'
        },
        {
            name: 'Nike Taekwondo Suit',
            productCategory: 'Suits',
            picture: '/images/p3.jpg',
            price:220,
            countInStock: 30,
            productBrand: 'Nike',
            userRating: 4.5,
            numReviews: 10,
            productDescription: 'high quality item'
        },
        {
            name: 'Adidas Taekwondo Belts',
            productCategory: 'Belts',
            picture: '/images/p4.jpg',
            price:70,
            countInStock: 5,
            productBrand: 'Adidas',
            userRating: 4.5,
            numReviews: 10,
            productDescription: 'high quality item'
        },
        {
            name: 'Adidas Red Body Armour',
            productCategory: 'Body Armour',
            picture: '/images/p5.jpg',
            price:80,
            countInStock: 0,
            productBrand: 'Adidas',
            userRating: 4.5,
            numReviews: 10,
            productDescription: 'high quality item'
        },
        {
            name: 'Adidas Blue Body Armour',
            productCategory: 'Body Armour',
            picture: '/images/p6.jpg',
            price:80,
            countInStock: 12,
            productBrand: 'Adidas',
            userRating: 4.5,
            numReviews: 10,
            productDescription: 'high quality item'
        },
    ]
}

export default data;