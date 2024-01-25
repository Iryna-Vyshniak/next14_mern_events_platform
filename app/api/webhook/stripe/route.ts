// server.js
// Use this sample code to handle webhook events in your integration.
// The library needs to be configured with your account's secret key.
// Ensure the key is kept out of any version control system you might be using.
import stripe from 'stripe';
import { NextResponse } from 'next/server';

import { createOrder } from '@/lib/actions/order.actions';


export async function POST(request: Request) {
    const body = await request.text()

    const sig = request.headers.get('stripe-signature') as string
    const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!

    let event

    try {
        event = stripe.webhooks.constructEvent(body, sig, endpointSecret)
    } catch (err) {
        return NextResponse.json({ message: 'Webhook error', error: err })
    }

    // Get the ID and type
    const eventType = event.type

    // Create a new order
    if (eventType === 'checkout.session.completed') {
        const { id, amount_total, metadata } = event.data.object

        const order = {
            stripeId: id,
            eventId: metadata?.eventId || '',
            buyerId: metadata?.buyerId || '',
            totalAmount: amount_total ? (amount_total / 100).toString() : '0',
            createdAt: new Date(),
        }

        const newOrder = await createOrder(order);

        return NextResponse.json({ message: 'OK', order: newOrder })
    }

    // Return a 200 response to acknowledge receipt of the event
    return new Response('', { status: 200 })
};
