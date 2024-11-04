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
  const name = data.get('name');
  const description = data.get('description');
  const featured = data.get('featured');
  const status = data.get('status');
  const file = data.get('file');

  if (!file) {
    return NextResponse.json({ success: false, message: "No file uploaded" });
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);
  const filename = file.name;

  try {
    await writeFile(path.join(process.cwd(), 'public/uploads', filename), buffer);
    const icon = `/uploads/${filename}`;

    const client = await clientPromise;
    const db = client.db('tichannel');
    const result = await db.collection('genres').insertOne({ icon, name, description, featured, status });
    return NextResponse.json({ success: true, message: 'Genre created successfully', status: 201, filename });
  } catch (error) {
    return NextResponse.json({ success: false, message: 'File upload failed', status: 500 });
  }
}

// GET - Retrieve all genres or a specific genre by ID
export async function GET(request) {
  const client = await clientPromise;
  const db = client.db('tichannel');
  const url = new URL(request.url);
  const id = url.searchParams.get('id');

  try {
    if (id) {
      const genre = await db.collection('genres').findOne({ _id: new ObjectId(id) });
      if (!genre) return NextResponse.json({ success: false, message: 'Genre not found', status: 404 });
      return NextResponse.json({ success: true, genre, status: 200 });
    } else {
      const genres = await db.collection('genres').find().toArray();
      return NextResponse.json({ success: true, genres, status: 200 });
    }
  } catch (error) {
    return NextResponse.json({ success: false, message: 'Error fetching genres', status: 500 });
  }
}

// DELETE - Delete a genre by ID
export async function DELETE(request) {
  const client = await clientPromise;
  const db = client.db('tichannel');
  const url = new URL(request.url);
  const id = url.searchParams.get('id');

  if (!id) return NextResponse.json({ success: false, message: 'ID is required', status: 400 });

  try {
    const genre = await db.collection('genres').findOne({ _id: new ObjectId(id) });
    if (!genre) return NextResponse.json({ success: false, message: 'Genre not found', status: 404 });

    if (genre.icon) {
      const filePath = path.join(process.cwd(), genre.icon);
      await unlink(filePath);
    }

    await db.collection('genres').deleteOne({ _id: new ObjectId(id) });
    return NextResponse.json({ success: true, message: 'Genre deleted successfully', status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false, message: 'Error deleting genre', status: 500 });
  }
}

// PUT - Update a genre by ID
export async function PUT(request) {
  const data = await request.formData();
  const id = data.get('id');
  const name = data.get('name');
  const description = data.get('description');
  const featured = data.get('featured');
  const status = data.get('status');
  const file = data.get('file');

  if (!id) return NextResponse.json({ success: false, message: 'ID is required', status: 400 });

  const client = await clientPromise;
  const db = client.db('tichannel');

  try {
    const genre = await db.collection('genres').findOne({ _id: new ObjectId(id) });
    if (!genre) return NextResponse.json({ success: false, message: 'Genre not found', status: 404 });

    let icon = genre.icon;
    if (file) {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const filename = file.name;
      await writeFile(path.join(process.cwd(), 'public/uploads', filename), buffer);

      // Delete the old file if exists
      if (genre.icon) {
        const oldFilePath = path.join(process.cwd(), genre.icon);
        await unlink(oldFilePath);
      }

      icon = `/uploads/${filename}`;
    }

    await db.collection('genres').updateOne(
      { _id: new ObjectId(id) },
      { $set: { icon, name, description, featured, status } }
    );
    return NextResponse.json({ success: true, message: 'Genre updated successfully', status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false, message: 'Error updating genre', status: 500 });
  }
}
