
import { writeFile, unlink } from 'fs/promises';
import { NextResponse } from 'next/server';
import path from 'path';
import clientPromise from '../../../lib/db';
import { ObjectId } from 'mongodb';

// Disable Next.js body parsing for handling file uploads
export const config = {
    api: {
        bodyParser: false,
    },
};

// POST - Create a new genre
export async function POST(request) {
    const data = await request.formData();
    const name = data.get('title');
    const series = data.get('series');
    const stream_link = data.get('stream_link');
    const description = data.get('description');
    const status = data.get('status');
    const category = data.get('category');
    const token = data.get('token');
    const file = data.get('file');

    if (!file) {
        return NextResponse.json({ success: false, message: "No file uploaded" });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const filename = file.name;

    try {
        await writeFile(path.join(process.cwd(), 'public/uploads', filename), buffer);
        const thumbnail = `/uploads/${filename}`;

        const client = await clientPromise;
        const db = client.db('tichannel');
        const result = await db.collection('episode').insertOne({
            thumbnail,
            name,
            description,
            status,
            series,
            stream_link,
            category,
            token
        });

        return NextResponse.json({ success: true, message: 'Genre created successfully', status: 201, filename });
    } catch (error) {
        return NextResponse.json({ success: false, message: 'File upload failed', status: 500 });
    }
}



// GET - Retrieve all episodes or a specific genre by ID
export async function GET(request) {
    const client = await clientPromise;
    const db = client.db('tichannel');
    const url = new URL(request.url);
    const id = url.searchParams.get('id');

    try {
        if (id) {
            const genre = await db.collection('episode').findOne({ _id: new ObjectId(id) });
            if (!genre) return NextResponse.json({ success: false, message: 'Genre not found', status: 404 });
            return NextResponse.json({ success: true, genre, status: 200 });
        } else {
            const episodes = await db.collection('episode').find().toArray();
            return NextResponse.json({ success: true, episodes, status: 200 });
        }
    } catch (error) {
        return NextResponse.json({ success: false, message: 'Error fetching episodes', status: 500 });
    }
}

// PUT - Update an episode by ID
export async function PUT(request) {
    const data = await request.formData();
    const id = data.get('id');
    const name = data.get('title');
    const description = data.get('description');
    const status = data.get('status');
    const category = data.get('category');
    const token = data.get('token');
    const file = data.get('file');

    if (!id || !name || !description || !status) {
        return NextResponse.json({ success: false, message: "ID, title, description, and status are required" });
    }

    let updateData = { name, description, status };

    // Add category and token to the update data if they are provided
    if (category) updateData.category = category;
    if (token) updateData.token = token;

    try {
        if (file) {
            const bytes = await file.arrayBuffer();
            const buffer = Buffer.from(bytes);
            const filename = file.name;
            await writeFile(path.join(process.cwd(), 'public/uploads', filename), buffer);
            updateData.thumbnail = `/uploads/${filename}`;
        }

        const client = await clientPromise;
        const db = client.db('tichannel');
        const result = await db.collection('episode').updateOne(
            { _id: new ObjectId(id) },
            { $set: updateData }
        );

        if (result.modifiedCount === 0) {
            return NextResponse.json({ success: false, message: 'Episode not found or no changes made', status: 404 });
        }

        return NextResponse.json({ success: true, message: 'Episode updated successfully', status: 200 });
    } catch (error) {
        return NextResponse.json({ success: false, message: 'Error updating episode', status: 500 });
    }
}


// DELETE - Delete an episode by ID
export async function DELETE(request) {
    const client = await clientPromise;
    const db = client.db('tichannel');
    const url = new URL(request.url);
    const id = url.searchParams.get('id');

    if (!id) return NextResponse.json({ success: false, message: 'ID is required', status: 400 });

    try {
        const episode = await db.collection('episode').findOne({ _id: new ObjectId(id) });
        if (!episode) return NextResponse.json({ success: false, message: 'Episode not found', status: 404 });

        if (episode.thumbnail) {
            const filePath = path.join(process.cwd(), 'public', episode.thumbnail);
            await unlink(filePath);
        }

        await db.collection('episode').deleteOne({ _id: new ObjectId(id) });
        return NextResponse.json({ success: true, message: 'Episode deleted successfully', status: 200 });
    } catch (error) {
        return NextResponse.json({ success: false, message: 'Error deleting episode', status: 500 });
    }
}