/* eslint-disable no-undef */
import deepFreeze from 'deep-freeze';
import reducer, { invoiceSlice } from '../redux/invoiceSlice';

describe('testing invoiceSlice from redux', () => {
    // TEST 1

    const initialObject = {
        invoices: [],
        singleInvoice: null,
        activeFilter: '',
        selectedFilter: [false, false, false],
        filteredInvoices: [],
    };

    it('should return the initial state', () => {
        deepFreeze(initialObject);

        expect(reducer(initialObject, { type: undefined })).toEqual({
            invoices: [],
            singleInvoice: null,
            activeFilter: '',
            selectedFilter: [false, false, false],
            filteredInvoices: [],
        });
    });

    // TEST 2
    const testObject = {
        id: expect.any(String),
        createdAt: '2021-10-11',
        paymentDue: '2021-11-10',
        description: 'Logo Concept',
        paymentTerms: 30,
        clientName: 'Alysa Werner',
        clientEmail: 'alysa@email.co.uk',
        status: 'pending',
        senderAddress: {
            street: '19 Union Terrace',
            city: 'London',
            postCode: 'E1 3EZ',
            country: 'United Kingdom',
        },
        clientAddress: {
            street: '63 Warwick Road',
            city: 'Carlisle',
            postCode: 'CA20 2TG',
            country: 'United Kingdom',
        },
        items: [
            {
                name: 'Logo Sketches',
                quantity: 1,
                price: 102.04,
                total: 102.04,
            },
        ],
        total: 102.04,
    };

    it('should add new invoice in redux - invoiceSlice', async () => {
        deepFreeze(initialObject);

        const formData = {
            street_address_from: '19 Union Terrace',
            city_from: 'London',
            postCode_from: 'E1 3EZ',
            country_from: 'United Kingdom',
            clientName: 'Alysa Werner',
            clientEmail: 'alysa@email.co.uk',
            client_address: '63 Warwick Road',
            client_city: 'Carlisle',
            client_postCode: 'CA20 2TG',
            client_country: 'United Kingdom',
            invoice_date: '2021-10-11',
            payment_terms: 'Net 30 Days',
            item_column: [
                {
                    name: 'Logo Sketches',
                    quantity: 1,
                    price: 102.04,
                    total: 102.04,
                },
            ],

            description: 'Logo Concept',
        };

        const mockEvent = {
            nativeEvent: {
                submitter: {
                    name: 'pending',
                },
            },
        };

        const oldState = invoiceSlice.reducer(initialObject, {
            type: undefined,
        });
        expect(oldState.invoices.length).toEqual(0);
        const newState = invoiceSlice.reducer(
            initialObject,
            invoiceSlice.actions.addInvoice([formData, mockEvent]),
        );
        const { invoices } = newState;
        expect(invoices.length).toEqual(1);

        expect(invoices[0]).toEqual(testObject);
    });
});
