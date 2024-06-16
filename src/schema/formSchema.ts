import { z } from 'zod';

const itemColumnSchema = z.object({
    name: z
        .string()
        .min(1, { message: `can't be empty` })
        .max(256, { message: `Max number of characters is 256` }),
    quantity: z.number().positive(),
    price: z.number().positive(),
    total: z.number().positive(),
});

export const formSchema = z.object({
    street_address_from: z
        .string()
        .min(1, { message: `can't be empty` })
        .max(256, { message: `Max number of characters is 256` }),
    city_from: z
        .string()
        .min(1, { message: `can't be empty` })
        .max(256, { message: `Max number of characters is 256` }),

    postCode_from: z
        .string()
        .min(1, { message: `can't be empty` })
        .max(256, { message: `Max number of characters is 256` }),
    country_from: z
        .string()
        .min(1, { message: `can't be empty` })
        .max(256, { message: `Max number of characters is 256` }),
    clientName: z
        .string()
        .min(1, { message: `can't be empty` })
        .max(256, { message: `Max number of characters is 256` }),
    clientEmail: z.string().email(),
    client_address: z
        .string()
        .min(1, { message: `can't be empty` })
        .max(256, { message: `Max number of characters is 256` }),
    client_city: z
        .string()
        .min(1, { message: `can't be empty` })
        .max(256, { message: `Max number of characters is 256` }),
    client_postCode: z
        .string()
        .min(1, { message: `can't be empty` })
        .max(256, { message: `Max number of characters is 256` }),
    client_country: z
        .string()
        .min(1, { message: `can't be empty` })
        .max(256, { message: `Max number of characters is 256` }),
    payment_terms: z.string(),
    invoice_date: z.string().min(1, { message: `Chose Date` }),

    item_column: z.array(itemColumnSchema),
    description: z
        .string()
        .min(1, { message: `can't be empty` })
        .max(256, { message: `Max number of characters is 256` }),
});
