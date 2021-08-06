const mongoose = require('mongoose');
const cities = require('./cities');
const {places, descriptors} = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Connection Error'));
db.once('open', () => {
    console.log('Database Connected');
});

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for(let i = 0; i < 200; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: '60f6e7b0412dd13c08b5b218',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore eum, asperiores eligendi obcaecati hic, expedita suscipit sunt enim quam ea cupiditate porro odit dicta iure in officia velit eaque exercitationem!",
            price,
            geometry: { 
                "type" : "Point", 
                "coordinates" : [
                    cities[random1000].longitude,
                    cities[random1000].latitude
                ]
            },
            images: [ 
                { 
                    "url" : "https://res.cloudinary.com/dm9x5bfc5/image/upload/v1626966915/YelpCamp/brkthq98mnlhjnyvlu7e.png", 
                    "filename" : "YelpCamp/brkthq98mnlhjnyvlu7e" 
                }, 
                { 
                    "url" : "https://res.cloudinary.com/dm9x5bfc5/image/upload/v1626966916/YelpCamp/x2is7w7dqhnhmfdcgmjw.png", 
                    "filename" : "YelpCamp/x2is7w7dqhnhmfdcgmjw" 
                } 
            ]
        });
        await camp.save();
    }
};

seedDB().then(() => {
    mongoose.connection.close();
});
