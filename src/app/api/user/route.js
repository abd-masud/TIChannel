import clientPromise from '../../../lib/db';
import { ObjectId } from 'mongodb';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { NextResponse } from 'next/server';


dotenv.config();

const secret = "DAFBD862C62671166124189A61EB8DAFBD862C62671166124189A61EB8DAFBD862C62671166124189A61EB8"

if (!secret) {
    throw new Error('JWT_SECRET is not defined in .env file');
}

// Sign-up - Create a new user
export async function POST(request) {
    const { name, email, password } = await request.json();

    if (!name || !email || !password) {
        return NextResponse.json({ success: false, message: 'Name, email, and password are required' }, { status: 400 });
    }

    try {
        const client = await clientPromise;
        const db = client.db('tichannel');

        const existingUser = await db.collection('users').findOne({ email });
        if (existingUser) {
            return NextResponse.json({ success: false, message: 'Email already exists' }, { status: 409 });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const result = await db.collection('users').insertOne({ name, email, password: hashedPassword, role: 1 });
        return NextResponse.json({ success: true, message: 'User created successfully', userId: result.insertedId }, { status: 201 });
    } catch (error) {
        console.error('Error creating user:', error.message);
        return NextResponse.json({ success: false, message: 'Error creating user', details: error.message }, { status: 500 });
    }
}

// Sign-in - Authenticate a user
export async function PUT(request) {
    const { email, password } = await request.json();

    if (!email || !password) {
        return NextResponse.json({ success: false, message: 'Email and password are required' }, { status: 400 });
    }

    try {
        const client = await clientPromise;
        const db = client.db('tichannel');

        const user = await db.collection('users').findOne({ email });
        if (!user) {
            return NextResponse.json({ success: false, message: 'Invalid email or password' }, { status: 401 });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return NextResponse.json({ success: false, message: 'Invalid email or password' }, { status: 401 });
        }

        const token = jwt.sign({ userId: user._id }, secret, { expiresIn: '1h' });
        return NextResponse.json({ success: true, message: 'Authenticated successfully', token }, { status: 200 });
    } catch (error) {
        console.error('Error signing in user:', error.message);
        return NextResponse.json({ success: false, message: 'Error signing in user', details: error.message }, { status: 500 });
    }
}

// Update Profile - Update user details
export async function PATCH(request) {
    const { userId, name, email, password } = await request.json();

    if (!userId || (!name && !email && !password)) {
        return NextResponse.json({ success: false, message: 'UserId and at least one of name, email, or password are required' }, { status: 400 });
    }

    try {
        const client = await clientPromise;
        const db = client.db('tichannel');

        const updateData = {};
        if (name) updateData.name = name;
        if (email) updateData.email = email;
        if (password) {
            const salt = await bcrypt.genSalt(10);
            updateData.password = await bcrypt.hash(password, salt);
        }

        const result = await db.collection('users').updateOne({ _id: new ObjectId(userId) }, { $set: updateData });

        if (result.matchedCount === 0) {
            return NextResponse.json({ success: false, message: 'User not found' }, { status: 404 });
        }

        return NextResponse.json({ success: true, message: 'Profile updated successfully' }, { status: 200 });
    } catch (error) {
        console.error('Error updating user profile:', error.message);
        return NextResponse.json({ success: false, message: 'Error updating profile', details: error.message }, { status: 500 });
    }
}
