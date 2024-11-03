import clientPromise from '../../../lib/db';
import { ObjectId } from 'mongodb';

// Fetch all categories
export async function GET(req) {
    try {
        const client = await clientPromise;
        const db = client.db('tichannel');
        const categories = await db.collection('categories').find().toArray();
        return new Response(JSON.stringify(categories), { status: 200 });
    } catch (error) {
        console.error('Error fetching categories:', error.message);
        return new Response(JSON.stringify({ error: 'Failed to fetch categories' }), { status: 500 });
    }
}

// Add a new category
export async function POST(req) {
    try {
        const client = await clientPromise;
        const db = client.db('tichannel');
        const { name, order } = await req.json();

        if (!name || !order) {
            return new Response(JSON.stringify({ error: 'Name and order are required' }), { status: 400 });
        }
        
        const result = await db.collection('categories').insertOne({ name, order });
        return new Response(JSON.stringify({ message: 'Category added successfully', categoryId: result.insertedId }), { status: 201 });
    } catch (error) {
        console.error('Error adding category:', error.message);
        return new Response(JSON.stringify({ error: 'Failed to add category' }), { status: 500 });
    }
}

// Update an existing category
export async function PUT(req) {
    try {
        const client = await clientPromise;
        const db = client.db('tichannel');
        const { id, name, order } = await req.json();

        if (!id || !name || !order) {
            return new Response(JSON.stringify({ error: 'ID, name, and order are required' }), { status: 400 });
        }

        const result = await db.collection('categories').updateOne(
            { _id: new ObjectId(id) },
            { $set: { name, order } }
        );

        if (result.matchedCount === 0) {
            return new Response(JSON.stringify({ error: 'Category not found' }), { status: 404 });
        }

        return new Response(JSON.stringify({ message: 'Category updated successfully' }), { status: 200 });
    } catch (error) {
        console.error('Error updating category:', error.message);
        return new Response(JSON.stringify({ error: 'Failed to update category' }), { status: 500 });
    }
}

// Delete a category
export async function DELETE(req) {
    try {
        const client = await clientPromise;
        const db = client.db('tichannel');
        const { id } = await req.json();

        if (!id) {
            return new Response(JSON.stringify({ error: 'ID is required' }), { status: 400 });
        }

        const result = await db.collection('categories').deleteOne({ _id: new ObjectId(id) });

        if (result.deletedCount === 0) {
            return new Response(JSON.stringify({ error: 'Category not found' }), { status: 404 });
        }

        return new Response(JSON.stringify({ message: 'Category deleted successfully' }), { status: 200 });
    } catch (error) {
        console.error('Error deleting category:', error.message);
        return new Response(JSON.stringify({ error: 'Failed to delete category' }), { status: 500 });
    }
}
