// Storybook
import type { Meta, StoryObj } from '@storybook/react';
import type { TypeWithDeepControls } from 'storybook-addon-deep-controls';

// Components
import Invoice from '../components/Invoice/Invoice';
const meta = {
    tags: ['autodocs'],
    component: Invoice,

    argTypes: {},
    parameters: {
        // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
        layout: 'fullscreen',
        deepControls: { enabled: true },
    },
} satisfies Meta<typeof Invoice>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: TypeWithDeepControls<Story> = {
    args: {
        invoice: {
            id: 'RT3080',
            createdAt: '2021-08-18',
            paymentDue: '2021-08-19',
            description: 'Re-branding',
            paymentTerms: 1,
            clientName: 'Jensen Huang',
            clientEmail: 'jensenh@mail.com',
            status: 'paid',
            senderAddress: {
                street: '19 Union Terrace',
                city: 'London',
                postCode: 'E1 3EZ',
                country: 'United Kingdom',
            },
            clientAddress: {
                street: '106 Kendell Street',
                city: 'Sharrington',
                postCode: 'NR24 5WQ',
                country: 'United Kingdom',
            },
            items: {
                name: 'Brand Guidelines',
                quantity: 1,
                price: 1800.9,
                total: 1800.9,
            },

            total: 1800.9,
        },
    },
    argTypes: {
        'invoice.id': { control: 'text' },
        'invoice.paymentDue': { control: 'text' },
        'invoice.clientName': { control: 'text' },
        'invoice.total': { control: 'number' },
        'invoice.status': {
            options: ['paid', 'pending', 'draft'],
            control: { type: 'radio' },
        },
    },
};
