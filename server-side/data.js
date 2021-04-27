import bcrypt from 'bcryptjs';

const data = {
    pptusers: [
        {
            name:'sultan',
            user_email:'sultan.malik@city.ac.uk',
            password: bcrypt.hashSync('sultan', 8),
            userCredentialsAdministrator: true,
        },
        {
            name:'Mike',
            user_email:'user@ppt',
            password: bcrypt.hashSync('mike', 8),
            userCredentialsAdministrator: false,
        },
    ],
    PPTitems: [
        {
            name: 'WTF Taekwondo Suit',
            item_category: 'Suits',
            picture: '/images/p1.jpg',
            cost:120,
            stock_number: 10,
            product_brand: 'WTF',
            user_rating: 4.5,
            review_count: 10,
            item_info: 'high quality item'
        },
        {
            name: 'Adidas Taekwondo Suit',
            item_category: 'Suits',
            picture: '/images/p2.jpg',
            cost:100,
            stock_number: 20,
            product_brand: 'Adidas',
            user_rating: 4.0,
            review_count: 10,
            item_info: 'high quality item'
        },
        {
            name: 'Nike Taekwondo Suit',
            item_category: 'Suits',
            picture: '/images/p3.jpg',
            cost:220,
            stock_number: 30,
            product_brand: 'Nike',
            user_rating: 4.5,
            review_count: 10,
            item_info: 'high quality item'
        },
        {
            name: 'Adidas Taekwondo Belts',
            item_category: 'Belts',
            picture: '/images/p4.jpg',
            cost:70,
            stock_number: 5,
            product_brand: 'Adidas',
            user_rating: 4.5,
            review_count: 10,
            item_info: 'high quality item'
        },
        {
            name: 'Adidas Red Body Armour',
            item_category: 'Body Armour',
            picture: '/images/p5.jpg',
            cost:80,
            stock_number: 0,
            product_brand: 'Adidas',
            user_rating: 4.5,
            review_count: 10,
            item_info: 'high quality item'
        },
        {
            name: 'Adidas Blue Body Armour',
            item_category: 'Body Armour',
            picture: '/images/p6.jpg',
            cost:80,
            stock_number: 12,
            product_brand: 'Adidas',
            user_rating: 4.5,
            review_count: 10,
            item_info: 'high quality item'
        },
    ]
}

export default data;