import { createSlice } from '@reduxjs/toolkit';

// Type
import { InvoiceType } from '../types/types';
// Functions
import { generateId, invoiceTotal } from '../utils/functions';

export const invoiceSlice = createSlice({
    name: 'invoice',
    initialState: {
        invoices: [],
        singleInvoice: null,
        activeFilter: '',
        selectedFilter: [false, false, false],
        filteredInvoices: [],
    },

    reducers: {
        // fetching invoices from json server
        fetchInvoices: (state, action) => {
            state.invoices = action.payload;
        },

        // fetch single invoice
        fetchSingleInvoice: (state, action) => {
            state.singleInvoice = action.payload;
        },

        // update filtered data after new fetch
        updateFilter: (state, action) => {
            state.filteredInvoices = action.payload;
        },
        // add new invoice
        addInvoice: (state, action) => {
            const paymentTerms = parseInt(
                action.payload[0]?.payment_terms?.match(/\d+/)[0],
                10,
            );
            console.log(action.payload[0]);
            // console.log(action.payload[0].invoice_date);
            const dateObject = new Date(action.payload[0].invoice_date);
            /* buttonType get name of button that is clicked because status depend on that.
            If save as draft button is clicked invoice status is draft, save and
            send create pending status*/
            const buttonType = action.payload[1].nativeEvent?.submitter?.name;
            // Add the number of days
            dateObject.setDate(dateObject?.getDate() + paymentTerms);

            // Format the result as "YYYY-MM-DD"
            const paymentDue = dateObject?.toISOString().slice(0, 10);

            const newId = generateId();
            const total = invoiceTotal(action.payload[0].item_column);

            const newInvoice = {
                id: newId,
                createdAt: action.payload[0].invoice_date,
                paymentDue: paymentDue,
                description: action.payload[0].description,
                paymentTerms: paymentTerms,
                clientName: action.payload[0].clientName,
                clientEmail: action.payload[0].clientEmail,
                status: buttonType,
                senderAddress: {
                    street: action.payload[0].street_address_from,
                    city: action.payload[0].city_from,
                    postCode: action.payload[0].postCode_from,
                    country: action.payload[0].country_from,
                },
                clientAddress: {
                    street: action.payload[0].client_address,
                    city: action.payload[0].client_city,
                    postCode: action.payload[0].client_postCode,
                    country: action.payload[0].client_country,
                },
                items: action.payload[0].item_column,
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
                        throw new Error(
                            `HTTP error! Status: ${response.status}`,
                        );
                    }
                    return response.json();
                })
                .then((data) => {
                    //     console.log('Invoce posted successfully:', data);
                });

            /* inicijalno ako se ne uradi filter filteredInvoices ce biti
                prazan a zapravo treba da sadrzi sve invoice jer je aktivan svaki
                filter. Zato mu dodajem vrednost manuelno ako nije aktiviraan
                 filter pre dodavanja */
            state.filteredInvoices =
                state.filteredInvoices?.length === 0
                    ? state.invoices
                    : state.filteredInvoices;
            if (state.filteredInvoices?.status === state.activeFilter) {
                state.filteredInvoices?.push(newInvoice);
            }
            state.invoices?.push(newInvoice);
        },
        // delete selected invoice
        deleteInvoice: (state, action) => {
            fetch(`http://localhost:3004/invoices/${action.payload}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            })
                .then((response) => {
                    if (!response.ok) {
                        throw new Error(
                            `HTTP error! Status: ${response.status}`,
                        );
                    }
                    return response.json();
                })
                .then((data) => {
                    console.log('Item deleted successfully:', data);
                });

            state.filteredInvoices = state.filteredInvoices.filter(
                (invoice) => invoice.id !== action.payload,
            );
            state.invoices = state.invoices.filter(
                (invoice) => invoice.id !== action.payload,
            );
        },

        // function to edit invoice
        editInvoice: (state, action) => {
            const formvalues = action.payload[0];
            const id = action.payload[1];
            const queryClient = action.payload[2];
            // console.log(formvalues);
            const paymentTerms = parseInt(
                formvalues?.payment_terms?.match(/\d+/)[0],
                10,
            );

            const dateObject = new Date(formvalues?.invoice_date);

            // Add the number of days
            dateObject.setDate(dateObject.getDate() + paymentTerms);

            // Format the result as "YYYY-MM-DD"
            const paymentDue = dateObject.toISOString().slice(0, 10);

            const total = invoiceTotal(formvalues?.item_column);
            const editedInvoice = {
                id: id,
                createdAt: formvalues?.invoice_date,
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
                        throw new Error(
                            `HTTP error! Status: ${response.status}`,
                        );
                    }
                    return response.json();
                })
                .then((data) => {
                    console.log('Invoice edited successfully:', data);
                });

            const targetIndex = state.filteredInvoices.findIndex(
                (item: InvoiceType) => item.id === id,
            );
            state.filteredInvoices[targetIndex] = editedInvoice;
            state.singleInvoice = editedInvoice;

            // update data for this query
            queryClient.setQueryData(['invoice', id], {
                ...editedInvoice,
            });
        },

        // change invoice status to paid
        markAsPaid: (state, action) => {
            console.log(action.payload);
            const invoice = action.payload[0];
            const queryClient = action.payload[1];

            fetch(`http://localhost:3004/invoices/${invoice.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ ...invoice, status: 'paid' }),
            })
                .then((response) => {
                    if (!response.ok) {
                        throw new Error(
                            `HTTP error! Status: ${response.status}`,
                        );
                    }
                    return response.json();
                })
                .then((data) => {
                    console.log('Item status change to paid:', data);
                });

            const targetIndex = state.filteredInvoices.findIndex(
                (item: InvoiceType) => item.id === invoice.id,
            );
            state.singleInvoice.status = 'paid';
            state.filteredInvoices[targetIndex].status = 'paid';

            // update data for this query
            queryClient.setQueryData(['invoice', invoice?.id], {
                ...invoice,
                status: 'paid',
            });
        },
        // return filtered invoices
        changeSelectedFilter: (state, action) => {
            // const array = action.payload;
            const index = action.payload;
            state.selectedFilter[index] = !state.selectedFilter[index];
            // console.log(action.payload);
            state.filteredInvoices = [];
            if (state.selectedFilter[0]) {
                state.activeFilter = 'draft';
                state.filteredInvoices = [
                    ...state.filteredInvoices,
                    ...state.invoices.filter(
                        (invoice: InvoiceType) => invoice.status === 'draft',
                    ),
                ];
            }
            if (state.selectedFilter[1]) {
                state.activeFilter = 'pending';
                state.filteredInvoices = [
                    ...state.filteredInvoices,
                    ...state.invoices.filter(
                        (invoice: InvoiceType) => invoice.status === 'pending',
                    ),
                ];
            }
            if (state.selectedFilter[2]) {
                state.activeFilter = 'paid';
                state.filteredInvoices = [
                    ...state.filteredInvoices,
                    ...state.invoices.filter(
                        (invoice: InvoiceType) => invoice.status === 'paid',
                    ),
                ];
            }
            if (
                !state.selectedFilter[0] &&
                !state.selectedFilter[1] &&
                !state.selectedFilter[2]
            )
                state.filteredInvoices = state.invoices;
        },
    },
});

export const {
    fetchInvoices,
    updateFilter,
    fetchSingleInvoice,
    addInvoice,
    deleteInvoice,
    editInvoice,
    markAsPaid,
    changeSelectedFilter,
} = invoiceSlice.actions;

export default invoiceSlice.reducer;
