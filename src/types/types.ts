export type InvoiceType = {
    clientAddress: {
        street: string;
        city: string;
        country: string;
        postCode: string;
    };
    clientEmail: string;
    clientName: string;
    createdAt: string;
    description: string;
    id: string;
    items: [
        {
            name: string;
            price: number;
            quantity: number;
            total: number;
        },
    ];

    paymentDue: string;
    paymentTerms: number;
    senderAddress: {
        street: string;
        city: string;
        country: string;
        postCode: string;
    };
    status: string;
    total: number;
};

export type ItemsType = {
    name: string;
    price: number | string;
    quantity: number | string;
    total: number | string;
};

export type Column = {
    id: string;
    name: string;
    quantity: number | null;
    price: number | null;
};

export type FormInputs = {
    street_address_from: string;
    city_from: string;
    postCode_from: string;
    country_from: string;
    clientName: string;
    clientEmail: string;
    client_address: string;
    client_city: string;
    client_postCode: string;
    client_country: string;
    invoice_date: string;
    payment_terms: string;
    item_column: [
        {
            name: string;
            quantity: number | string;
            price: number | string;
            total: number | string;
        },
    ];

    description: string;
};

export type ColumnField = {
    item_column: [
        {
            item_name: string;
            item_quantity: number;
            item_price: number;
            item_total: number;
        },
    ];
};

export type InvoiceSliceType = {
    invoice: {
        invoices: InvoiceType[] | [];
        singleInvoice: InvoiceType;
        activeFilter: string;
        selectedFilter: boolean[];
        filteredInvoices: InvoiceType[] | [];
    };
};
