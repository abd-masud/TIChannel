import { NextResponse } from 'next/server';
import clientPromise from '../../../../lib/db';
import { ObjectId } from 'mongodb';

// POST - Create a new invoice
export async function POST(req) {
    const { customerId, email, amount, date, description, status } = await req.json();

    if (!customerId || !email || !amount || !date || !status) {
        return NextResponse.json({ success: false, message: 'CustomerId, email, amount, date, and status are required' }, { status: 400 });
    }

    try {
        const client = await clientPromise;
        const db = client.db('tichannel');

        const result = await db.collection('invoices').insertOne({ customerId, email, amount, date, description, status });
        return NextResponse.json({ success: true, message: 'Invoice created successfully', invoiceId: result.insertedId }, { status: 201 });
    } catch (error) {
        console.error('Error creating invoice:', error.message);
        return NextResponse.json({ success: false, message: 'Error creating invoice', details: error.message }, { status: 500 });
    }
}

// GET - Retrieve all invoices or a specific invoice by ID
export async function GET(req) {
    const client = await clientPromise;
    const db = client.db('tichannel');
    const url = new URL(req.url);
    const id = url.searchParams.get('id');
    const email = url.searchParams.get('email');

    try {
        if (id) {
            // Fetch by invoice ID
            const invoice = await db.collection('invoices').findOne({ _id: new ObjectId(id) });
            if (!invoice) return NextResponse.json({ success: false, message: 'Invoice not found', status: 404 });
            return NextResponse.json({ success: true, invoice, status: 200 });
        } else if (email) {
            // Fetch invoices by email
            const invoices = await db.collection('invoices').find({ email }).toArray();
            if (!invoices.length) return NextResponse.json({ success: false, message: 'No invoices found for this email', status: 404 });
            return NextResponse.json({ success: true, invoices, status: 200 });
        } else {
            // Fetch all invoices
            const invoices = await db.collection('invoices').find().toArray();
            return NextResponse.json({ success: true, invoices, status: 200 });
        }
    } catch (error) {
        console.error('Error fetching invoices:', error);
        return NextResponse.json({ success: false, message: 'Error fetching invoices', details: error.message }, { status: 500 });
    }
}
