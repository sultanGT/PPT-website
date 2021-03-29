import bcrypt from 'bcryptjs';

const data = {
    users: [
        {
            name:'Sultan',
            email:'sultan.malik@city.ac.uk',
            password: bcrypt.hashSync('sultan', 8),
            isAdmin: true,
        },
        {
            name:'Mike',
            email:'user@city.ac.uk',
            password: bcrypt.hashSync('mike', 8),
            isAdmin: false,
        },
    ],
    products: [
        {
            name: 'WTF Taekwondo Suit',
            category: 'Suits',
            picture: '/images/p1.jpg',
            price:120,
            countInStock: 10,
            brand: 'WTF',
            rating: 4.5,
            numReviews: 10,
            description: 'high quality item'
        },
        {
            name: 'Adidas Taekwondo Suit',
            category: 'Suits',
            picture: '/images/p2.jpg',
            price:100,
            countInStock: 20,
            brand: 'Adidas',
            rating: 4.0,
            numReviews: 10,
            description: 'high quality item'
        },
        {
            name: 'Nike Taekwondo Suit',
            category: 'Suits',
            picture: '/images/p3.jpg',
            price:220,
            countInStock: 30,
            brand: 'Nike',
            rating: 4.5,
            numReviews: 10,
            description: 'high quality item'
        },
        {
            name: 'Adidas Taekwondo Belts',
            category: 'Belts',
            picture: '/images/p4.jpg',
            price:70,
            countInStock: 5,
            brand: 'Adidas',
            rating: 4.5,
            numReviews: 10,
            description: 'high quality item'
        },
        {
            name: 'Adidas Red Body Armour',
            category: 'Body Armour',
            picture: '/images/p5.jpg',
            price:80,
            countInStock: 0,
            brand: 'Adidas',
            rating: 4.5,
            numReviews: 10,
            description: 'high quality item'
        },
        {
            name: 'Adidas Blue Body Armour',
            category: 'Body Armour',
            picture: '/images/p6.jpg',
            price:80,
            countInStock: 12,
            brand: 'Adidas',
            rating: 4.5,
            numReviews: 10,
            description: 'high quality item'
        },
    ]
}

export default data;