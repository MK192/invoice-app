/* eslint-disable no-undef */
import { calculateTotal } from '../utils/functions';

describe('Test calculateTotal function from InvoiceSingle', () => {
    // TEST 1
    it('should pass, successfully calculate total for invoice', () => {
        // object for testing
        const invoice = {
            items: [
                {
                    name: 'Brand Guidelines',
                    quantity: 1,
                    price: 1800.9,
                    total: 1800.9,
                },
                {
                    name: 'QTR',
                    quantity: 4,
                    price: 860,
                    total: 3440,
                },
            ],
            total: 5240.9,
        };
        const total = calculateTotal(invoice.items);

        expect(total).toEqual(5240.9);
    });

    // TEST 2
    it('should throw error, because function argument is not array', () => {
        const invoice = {
            items: {
                name: 'QTR',
                quantity: 4,
                price: 860,
                total: 3440,
            },
        };
        expect(() => calculateTotal(invoice.items)).toThrow(
            'Argument must be array!',
        );
    });

    // TEST 3
    it('should throw error, because provided objects inside array dont have expected properties', () => {
        const invoice = {
            items: [
                {
                    name: 'QTR',
                    id: 25,
                },
            ],
        };
        expect(() => calculateTotal(invoice.items)).toThrow(
            'Each item must be an object with "price" and "quantity" properties',
        );
    });
});
