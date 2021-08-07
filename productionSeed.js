const mongoose = require('mongoose');
const cities = require('./cities');
const {places, descriptors} = require('./seedHelpers');
const Campground = require('../models/campground');

const dbUrl = process.env.DB_URL;
mongoose.connect(dbUrl, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Connection Error'));
db.once('open', () => {
    console.log('Database Connected');
});

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for(let i = 0; i < 100; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: '610694caf480040015132116',
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
                    "url" : "https://source.unsplash.com/collection/880012/800x600", 
                    "filename" : `seedImg${i}` 
                }
            ]
        });
        await camp.save();
    }
};

seedDB().then(() => {
    mongoose.connection.close();
});
