import { QueryClient } from '@tanstack/react-query';
import { FieldErrors } from 'react-hook-form';

// Type
import { FormInputs, ItemsType } from '../types/types';

// Calculate total for single page
export const calculateTotal = (items: ItemsType[]) => {
    let total = 0;

    if (!Array.isArray(items)) {
        throw new Error('Argument must be array!');
    }
    if (
        items.some(
            (item) =>
                typeof item !== 'object' ||
                !('price' in item) ||
                !('quantity' in item),
        )
    ) {
        throw new Error(
            'Each item must be an object with "price" and "quantity" properties',
        );
    }

    items?.map((item) => {
        total += Number(item.price) * Number(item.quantity);
    });

    return total;
};

// calculate total for form invoice

export const invoiceTotal = (itemColumn: ItemsType[]) => {
    const initialValue = 0;
    const total = itemColumn.reduce(
        (accumulator, currentValue: ItemsType) =>
            accumulator + Number(currentValue.total),
        initialValue,
    );

    return total;
};
// create new invoice from Form data

export const createInovice = (formvalues: FormInputs, event) => {
    const paymentTerms = parseInt(
        formvalues?.payment_terms?.match(/\d+/)[0],
        10,
    );

    const dateObject = new Date(formvalues.invoice_date);
    /* buttonType get name of button that is clicked because status depend on that.
    If save as draft button is clicked invoice status is draft, save and
    send create pending status*/
    const buttonType = event.nativeEvent.submitter.name;
    // Add the number of days
    dateObject.setDate(dateObject.getDate() + paymentTerms);

    // Format the result as "YYYY-MM-DD"
    const paymentDue = dateObject.toISOString().slice(0, 10);

    const newId = generateId();
    const total = invoiceTotal(formvalues.item_column);

    const newInvoice = {
        id: newId,
        createdAt: formvalues.invoice_date,
        paymentDue: paymentDue,
        description: formvalues.description,
        paymentTerms: paymentTerms,
        clientName: formvalues.clientName,
        clientEmail: formvalues.clientEmail,
        status: buttonType,
        senderAddress: {
            street: formvalues.street_address_from,
            city: formvalues.city_from,
            postCode: formvalues.postCode_from,
            country: formvalues.country_from,
        },
        clientAddress: {
            street: formvalues.client_address,
            city: formvalues.client_city,
            postCode: formvalues.client_postCode,
            country: formvalues.client_country,
        },
        items: formvalues.item_column,
        total: total,
    };

    fetch(`http://localhost:3004/invoices`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newInvoice),
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then((data) => {
            console.log('Invoce posted successfully:', data);
        });
};

// function to edit invoice
export const editInvoice = (formvalues: FormInputs, id: string) => {
    const paymentTerms = parseInt(
        formvalues?.payment_terms?.match(/\d+/)[0],
        10,
    );

    const dateObject = new Date(formvalues.invoice_date);

    // Add the number of days
    dateObject.setDate(dateObject.getDate() + paymentTerms);

    // Format the result as "YYYY-MM-DD"
    const paymentDue = dateObject.toISOString().slice(0, 10);

    console.log(paymentTerms);
    console.log(paymentDue);
    console.log(formvalues);

    const total = invoiceTotal(formvalues.item_column);
    const editedInvoice = {
        id: id,
        createdAt: formvalues.invoice_date,
        paymentDue: paymentDue,
        description: formvalues.description,
        paymentTerms: paymentTerms,
        clientName: formvalues.clientName,
        clientEmail: formvalues.clientEmail,
        status: 'pending',
        senderAddress: {
            street: formvalues.street_address_from,
            city: formvalues.city_from,
            postcode: formvalues.postCode_from,
            country: formvalues.country_from,
        },
        clientAddress: {
            street: formvalues.client_address,
            city: formvalues.client_city,
            postCode: formvalues.client_postCode,
            country: formvalues.client_country,
        },
        items: formvalues.item_column,
        total: total,
    };

    fetch(`http://localhost:3004/invoices/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(editedInvoice),
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then((data) => {
            console.log('Invoice edited successfully:', data);
        });
};
// check if  errors object  is empty

export const isErrorEmpty = (obj: FieldErrors<FormInputs>) => {
    return Object.keys(obj).length === 0;
};

export const generateId = (prefixLength = 2, numericLength = 4) => {
    const generateRandomString = (length: number) => {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        return Array.from({ length }, () =>
            characters.charAt(Math.floor(Math.random() * characters.length)),
        ).join('');
    };
    const prefix = generateRandomString(prefixLength);
    const numbers = Array.from({ length: numericLength }, () =>
        Math.floor(Math.random() * 10),
    ).join('');

    return `${prefix}${numbers}`;
};

/* invalidate all tanstack querys except active. All other queries would be 
refetched even if they initialy have cashed data.*/

export const invalidateInactive = (queryClient: QueryClient) => {
    queryClient.invalidateQueries({
        queryKey: ['invoices'],
        exact: false,
        refetchType: 'none',
        type: 'inactive',
    });
};

/* invalidate all cashe for provided query */

export const invalidateInvoices = (
    queryClient: QueryClient,
    query: string[],
) => {
    queryClient.invalidateQueries({
        queryKey: query,
    });
};
