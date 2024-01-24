'use server';

import Stripe from 'stripe';

import { CheckoutParamsProps } from "@/types";
import { redirect } from 'next/navigation';


// checkout order information
export const checkoutOrder = async (order: CheckoutParamsProps) => {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

    const price = order.isFree ? 0 : Number(order.price) * 100;

    try {
        // Create Checkout Sessions from body params.
        const session = await stripe.checkout.sessions.create({
            line_items: [
                {
                    // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
                    price_data: {
                        currency: 'usd',
                        unit_amount: price,
                        product_data: {
                            name: order.eventTitle,
                        }
                    },
                    quantity: 1,
                },
            ],
            metadata: {
                eventId: order.eventId,
                buyer: order.buyerId,
            },
            mode: 'payment',
            success_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/profile`,
            cancel_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/`,
        });

        redirect(session.url!)

    } catch (error) {
        throw error;
    }
}