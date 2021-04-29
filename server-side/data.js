import bcrypt from 'bcryptjs';

//Initial PPT user list data to be inserted into PPT web application
const data = {
    pptusers: [
        {
            name:'sultan',
            email:'sultan.malik@city.ac.uk',
            password: bcrypt.hashSync('sultan', 8),
            userCredentialsAdministrator: true,
        },
        {
            name:'user',
            email:'user@pptwebsite.co.uk',
            password: bcrypt.hashSync('mike', 8),
            userCredentialsAdministrator: false,
        },
        {
            name:'Admin',
            email:'admin@pptwebsite.co.uk',
            password: bcrypt.hashSync('mike', 8),
            userCredentialsAdministrator: true,
        },
    ],
    //Initial PPT item list data to be inserted into PPT web application
    PPTitems: [
        {
            name: 'WTF Taekwondo Suit',
            item_category: 'Suits',
            picture: '/images/p1.jpg',
            cost: 65,
            stock_number: 10,
            item_brand: 'WTF',
            user_rating: 4.5,
            review_count: 10,
            item_info: 'Lightweight design mixed with durability and style, Great for all skill levels, from beginner to expert, Simple yet stylish design at an affordable price, High Quality, smart looking uniform both flexible and durable'
        },
        {
            name: 'Adidas WT Adiflex 2 Dobok',
            item_category: 'Suits',
            picture: '/images/p2.jpg',
            cost: 84,
            stock_number: 10,
            item_brand: 'Adidas',
            user_rating: 4.0,
            review_count: 10,
            item_info: 'Lightweight design mixed with durability and style, Great for all skill levels, from beginner to expert, Simple yet stylish design at an affordable price, High Quality, smart looking uniform both flexible and durable'
        },
        {
            name: 'Nike Taekwondo Suit',
            item_category: 'Suits',
            picture: '/images/p3.jpg',
            cost: 95,
            stock_number: 10,
            item_brand: 'Nike',
            user_rating: 4.5,
            review_count: 10,
            item_info: 'Lightweight design mixed with durability and style, Great for all skill levels, from beginner to expert, Simple yet stylish design at an affordable price, High Quality, smart looking uniform both flexible and durable'
        },
        {
            name: 'Adidas Taekwondo Belts',
            item_category: 'Belts',
            picture: '/images/p4.jpg',
            cost:20,
            stock_number: 5,
            item_brand: 'Adidas',
            user_rating: 4.5,
            review_count: 10,
            item_info: '100% cotton belts. Good for Karate, Judo and Taekwondo'
        },
        {
            name: 'Adidas Red Body Armour',
            item_category: 'Body Armour',
            picture: '/images/p5.jpg',
            cost: 59.99,
            stock_number: 6,
            item_brand: 'Adidas',
            user_rating: 4.5,
            review_count: 10,
            item_info: 'Body protector for training and competition, Reversible Red or Blue, Shoulder protection, CE Approved, WT Approved'
        },
        {
            name: 'Adidas Blue Body Armour',
            item_category: 'Body Armour',
            picture: '/images/p6.jpg',
            cost:59,
            stock_number: 12,
            item_brand: 'Adidas',
            user_rating: 5,
            review_count: 10,
            item_info: 'Body protector for training and competition, Reversible Red or Blue, Shoulder protection, CE Approved, WT Approved'
        },
        {
            name: 'Tusah Head Guards',
            item_category: 'Head Guards',
            picture: '/images/p7.jpg',
            cost:29,
            stock_number: 12,
            item_brand: 'Tusah',
            user_rating: 4.5,
            review_count: 10,
            item_info: 'Light, WTF approved head guard, perfect for Tae Kwon Do training sessions.'
        },
        {
            name: 'Adidas Head Guards',
            item_category: 'Head Guards',
            picture: '/images/p8.jpg',
            cost:49,
            stock_number: 12,
            item_brand: 'Adidas',
            user_rating: 4,
            review_count: 10,
            item_info: 'Light, WTF approved head guard, perfect for Tae Kwon Do training sessions.'
        },
        {
            name: 'Adidas Kicking Pads',
            item_category: 'Pads',
            picture: '/images/p9.jpg',
            cost:19,
            stock_number: 12,
            item_brand: 'Adidas',
            user_rating: 5,
            review_count: 10,
            item_info: 'Double hand pad for speed kick training'
        },


    ]
}

export default data;