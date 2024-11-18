import { NextResponse } from 'next/server';
import clientPromise from '../../../../lib/db';


export async function POST(req) {
    const { email, user_id, plan_id, status, payment_status, package_duration, start_date } = await req.json();

    if (!email) {
        return NextResponse.json({ success: false, message: 'Email is required' }, { status: 400 });
    }

    try {
        const client = await clientPromise;
        const db = client.db('tichannel');

        const existingSubscriber = await db.collection('subscribers').findOne({ email, user_id, plan_id, status, payment_status, package_duration, start_date });
        if (existingSubscriber) {
            return NextResponse.json({ success: false, message: 'Subscriber already exists' }, { status: 409 });
        }

        const result = await db.collection('subscribers').insertOne({ email, user_id, plan_id, status, payment_status, package_duration, start_date });
        return NextResponse.json({ success: true, message: 'Subscribed successfully', subscriberId: result.insertedId }, { status: 201 });
    } catch (error) {
        console.error('Error subscribing:', error.message);
        return NextResponse.json({ success: false, message: 'Error subscribing', details: error.message }, { status: 500 });
    }
}

// PATCH - Toggle subscriber status
export async function PATCH(req) {
    const { subscriberId } = await req.json();

    if (!subscriberId) {
        return NextResponse.json({ success: false, message: 'Subscriber ID is required' }, { status: 400 });
    }

    try {
        const client = await clientPromise;
        const db = client.db('tichannel');

        const subscriber = await db.collection('subscribers').findOne({ _id: new ObjectId(subscriberId) });
        if (!subscriber) {
            return NextResponse.json({ success: false, message: 'Subscriber not found' }, { status: 404 });
        }

        const newStatus = subscriber.status === 'Active' ? 'Deactive' : 'Active';
        await db.collection('subscribers').updateOne({ _id: new ObjectId(subscriberId) }, { $set: { status: newStatus } });

        return NextResponse.json({ success: true, message: `Status toggled to ${newStatus}` }, { status: 200 });
    } catch (error) {
        console.error('Error toggling status:', error.message);
        return NextResponse.json({ success: false, message: 'Error toggling status', details: error.message }, { status: 500 });
    }
}