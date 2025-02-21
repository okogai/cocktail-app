import mongoose from 'mongoose';
import User from "../models/User";
import Cocktail from "../models/Cocktail";

const run = async () => {
    await mongoose.connect('mongodb://localhost/recipes');
    const db = mongoose.connection;

    try {
        await db.dropCollection('cocktails');
        await db.dropCollection('users');
    } catch (e) {
        console.log('Collections were not present, skipping drop');
    }

    const [user, admin] = await User.create([
        {
            email: 'user@example.com',
            password: '123',
            token: crypto.randomUUID(),
            role: 'user',
            displayName: 'User',
            confirmPassword: '123'
        },
        {
            email: 'admin@example.com',
            password: '123',
            token: crypto.randomUUID(),
            role: 'admin',
            displayName: 'Admin',
            confirmPassword: '123'
        },
    ]);

    await Cocktail.create([
        {
            user: user._id,
            title: 'Margarita',
            description: 'Classic cocktail with tequila, lime, and triple sec.',
            image: 'images/margarita.jpg',
            ingredients: [
                { name: 'Tequila', amount: '50ml' },
                { name: 'Triple sec', amount: '30ml' },
                { name: 'Lime juice', amount: '15ml' },
                { name: 'Salt', amount: 'to taste' },
            ],
            rating: [
                { user: user._id, rate: 4 },
            ],
        },
        {
            user: admin._id,
            title: 'Old Fashioned',
            description: 'A whiskey-based classic cocktail with bitters and sugar.',
            image: 'images/old-fashioned.jpg',
            ingredients: [
                { name: 'Whiskey', amount: '50ml' },
                { name: 'Bitters', amount: '2 dashes' },
                { name: 'Sugar cube', amount: '1' },
                { name: 'Orange peel', amount: '1 piece' },
            ],
            rating: [
                { user: user._id, rate: 5 },
            ],
        },
        {
            user: user._id,
            title: 'Mojito',
            description: 'Refreshing cocktail with rum, lime, and mint.',
            image: 'images/mojito.jpg',
            ingredients: [
                { name: 'Rum', amount: '50ml' },
                { name: 'Mint leaves', amount: '10 leaves' },
                { name: 'Sugar', amount: '2 tsp' },
                { name: 'Lime juice', amount: '25ml' },
            ],
            rating: [
                { user: admin._id, rate: 3 },
            ],
        },
        {
            user: admin._id,
            title: 'Cosmopolitan',
            description: 'A stylish cocktail with vodka, cranberry, and lime.',
            image: 'images/cosmopolitan.jpg',
            ingredients: [
                { name: 'Vodka', amount: '40ml' },
                { name: 'Triple sec', amount: '15ml' },
                { name: 'Cranberry juice', amount: '30ml' },
                { name: 'Lime juice', amount: '15ml' },
            ],
            rating: [
                { user: user._id, rate: 4 },
            ],
        },
    ]);

    console.log('Fixtures added');
    await mongoose.connection.close();
};

run().catch(console.error);
