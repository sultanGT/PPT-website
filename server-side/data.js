import bcrypt from 'bcryptjs';

//Initial PPT user list data to be inserted into PPT web application
const data = {
    PPTusers: [
        {
            name:'sultan',
            email:'sultan.malik@city.ac.uk',
            password: bcrypt.hashSync('sultan', 8),
            userCredentialsAdministrator: true,
        },
        {
            name:'user',
            email:'user@ppt',
            password: bcrypt.hashSync('user', 8),
            userCredentialsAdministrator: false,
        },
        {
            name:'admin',
            email:'admin@ppt',
            password: bcrypt.hashSync('admin', 8),
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
            cost: 59,
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
        {
            name: 'Peak Performance Taekwondo Suit',
            item_category: 'Suit',
            picture: '/images/p15.jpg',
            cost:59,
            stock_number: 12,
            item_brand: 'Peak Performance',
            user_rating: 5,
            review_count: 10,
            item_info: 'Peak Performance Takwondo suit, Lightweight design mixed with durability and style, Great for all skill levels WT Approved'
        },
        {
            name: 'Peak Performance Kicking Pad',
            item_category: 'Pads',
            picture: '/images/p13.jpg',
            cost:25,
            stock_number: 12,
            item_brand: 'Peak Performance',
            user_rating: 4.5,
            review_count: 10,
            item_info: 'Large kicking pad for power drills and techniques.'
        },
        {
            name: 'Peak Performance Head Guard',
            item_category: 'Head Guards',
            picture: '/images/p14.jpg',
            cost:49,
            stock_number: 12,
            item_brand: 'Peak Performance',
            user_rating: 4,
            review_count: 10,
            item_info: 'Light approved head guard, perfect for Tae Kwon Do training sessions.'
        },
        {
            name: 'PPT - DAN Grading Course',
            item_category: 'Pads',
            picture: '/images/p11.jpg',
            cost:19,
            stock_number: 20,
            item_brand: 'Peak Performance',
            user_rating: 5,
            review_count: 10,
            item_info: 'This course is designed for advanced level of students to achieve DAN grades from black belt'
        },
        {
            name: 'PPT - KUP Grading Course',
            item_category: 'Courses',
            picture: '/images/p10.jpg',
            cost:10,
            stock_number: 12,
            item_brand: 'Peak Performance',
            user_rating: 5,
            review_count: 10,
            item_info: 'This course is designed as a step by step guide on how to pass Taekwondo gradings from 10th KUP (white belt) to 1st KUP (Black Tag)'
        },


    ]
}

export default data;