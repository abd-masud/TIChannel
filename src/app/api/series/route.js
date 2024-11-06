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
  const title = data.get('title');
  const genres = data.get('genres');
  const release_date  = data.get('release_date');
  const trailer_url  = data.get('trailer_url');
  const custom_tag  = data.get('custom_tag');
  const series_type  = data.get('series_type');
  const description = data.get('description');
  const thumbnail = data.get('thumbnail');
  const poster = data.get('poster');

  if (!poster || !thumbnail) {
    return NextResponse.json({ success: false, message: "No file uploaded" });
  }

  const bytes = await thumbnail.arrayBuffer();
  const buffer = Buffer.from(bytes);
  const thumbnail_name = thumbnail.name;
  const _bytes = await poster.arrayBuffer();
  const _buffer = Buffer.from(_bytes);
  const poster_name = poster.name;

  try {
    await writeFile(path.join(process.cwd(), 'public/uploads', thumbnail_name), buffer);
    const _thumbnail = `/uploads/${thumbnail_name}`;
    await writeFile(path.join(process.cwd(), 'public/uploads', poster_name), _buffer);
    const _poster = `/uploads/${poster_name}`;

    const client = await clientPromise;
    const db = client.db('tichannel');
    const result = await db.collection('series').insertOne({ title, genres, release_date, trailer_url, custom_tag, series_type, description, _thumbnail,  _poster});
    return NextResponse.json({ success: true, message: 'Genre created successfully', status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, message: 'File upload failed', status: 500 });
  }
}

// GET - Retrieve all series or a specific genre by ID
export async function GET(request) {
  const client = await clientPromise;
  const db = client.db('tichannel');
  const url = new URL(request.url);
  const id = url.searchParams.get('id');

  try {
    if (id) {
      const genre = await db.collection('series').findOne({ _id: new ObjectId(id) });
      if (!genre) return NextResponse.json({ success: false, message: 'Genre not found', status: 404 });
      return NextResponse.json({ success: true, genre, status: 200 });
    } else {
      const series = await db.collection('series').find().toArray();
      return NextResponse.json({ success: true, series, status: 200 });
    }
  } catch (error) {
    return NextResponse.json({ success: false, message: 'Error fetching series', status: 500 });
  }
}

// PUT - Update a genre by ID
export async function PUT(request) {
  const client = await clientPromise;
  const db = client.db('tichannel');
  const data = await request.formData();
  const id = data.get('id');
  const title = data.get('title');
  const genres = data.get('genres');
  const release_date  = data.get('release_date');
  const trailer_url  = data.get('trailer_url');
  const custom_tag  = data.get('custom_tag');
  const series_type  = data.get('series_type');
  const description = data.get('description');
  const thumbnail = data.get('thumbnail');
  const poster = data.get('poster');

  if (!id || !title || !description || !genres) {
    return NextResponse.json({ success: false, message: "ID, title, description, and genres are required" });
  }

  let updateData = { title, genres, release_date, trailer_url, custom_tag, series_type, description };

  try {
    if (thumbnail) {
      const bytes = await thumbnail.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const thumbnail_name = thumbnail.name;
      await writeFile(path.join(process.cwd(), 'public/uploads', thumbnail_name), buffer);
      updateData._thumbnail = `/uploads/${thumbnail_name}`;
    }

    if (poster) {
      const _bytes = await poster.arrayBuffer();
      const _buffer = Buffer.from(_bytes);
      const poster_name = poster.name;
      await writeFile(path.join(process.cwd(), 'public/uploads', poster_name), _buffer);
      updateData._poster = `/uploads/${poster_name}`;
    }

    const result = await db.collection('series').updateOne({ _id: new ObjectId(id) }, { $set: updateData });

    if (result.modifiedCount === 0) {
      return NextResponse.json({ success: false, message: 'Genre not found or no changes made', status: 404 });
    }

    return NextResponse.json({ success: true, message: 'Genre updated successfully', status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false, message: 'Error updating genre', status: 500 });
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
    const genre = await db.collection('series').findOne({ _id: new ObjectId(id) });
    if (!genre) return NextResponse.json({ success: false, message: 'Genre not found', status: 404 });

    if (genre.icon) {
      const filePath = path.join(process.cwd(), genre.icon);
      await unlink(filePath);
    }

    await db.collection('series').deleteOne({ _id: new ObjectId(id) });
    return NextResponse.json({ success: true, message: 'Genre deleted successfully', status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false, message: 'Error deleting genre', status: 500 });
  }
}
