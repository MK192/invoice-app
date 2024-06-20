import { useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { formSchema } from '../../schema/formSchema';
import { useQueryClient } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';

// type
import { InvoiceType, FormInputs } from '../../types/types';

// components
import { FormTitle } from './FormTitle';
import { BillTitle } from './BillTitle';
import { Field } from './Field';
import { ItemList } from './ItemList';
import { FormFooter } from './FormFooter';

// Functions
import { isErrorEmpty, invalidateInactive } from '../../utils/functions';

// Redux
import { addInvoice, editInvoice } from '../../redux/invoiceSlice';

type Props = {
    setShowForm: (showForm: boolean) => void;
    invoice?: InvoiceType | null;
};

const Form = ({ setShowForm, invoice }: Props) => {
    const ref = useRef<HTMLFormElement>(null);

    const {
        register,
        control,
        handleSubmit,
        formState,
        watch,
        setValue,
        getValues,
    } = useForm<FormInputs>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            item_column: invoice?.items,
        },
    });
    const dispatch = useDispatch();

    const queryClient = useQueryClient();
    const { errors } = formState;
    const checkOutsideClick = (event: MouseEvent) => {
        if (ref.current && !ref.current.contains(event.target as Node)) {
            setShowForm(false);
        }
    };
    useEffect(() => {
        document.addEventListener('click', checkOutsideClick);

        return () => {
            document.removeEventListener('click', checkOutsideClick);
        };
    }, []);

    return (
        <div className="top-0 bottom-0 left-0 right-0  fixed flex items-start z-20 bg-overlay">
            <form
                className="bg-white w-8/12 h-full  relative rounded-br-[20px] rounded-tr-[20px] overflow-y-auto z-100 text-shipCove pt-[56px] pl-[159px] pr-[56px] pb-[32px] text-left
                dark:bg-mirageDark dark:text-white tabletMini:w-screen tabletMini:px-6 lg:w-10/12 lg:pl-[56px] lg:pt-[135px] "
                onSubmit={handleSubmit((formValues, event) => {
                    setShowForm(false);
                    invoice
                        ? dispatch(
                              editInvoice([
                                  formValues,
                                  invoice.id,
                                  queryClient,
                              ]),
                          )
                        : dispatch(addInvoice([formValues, event]));
                    invalidateInactive(queryClient);
                })}
                ref={ref}
            >
                <div className="hidden  mb-6 tabletMini:block ">
                    <button
                        onClick={() => setShowForm(false)}
                        className="flex font-bold items-center gap-6  "
                    >
                        <img
                            src="/right.png"
                            className="w-1.5 h-2 rotate-180 justify-items-start z-1"
                            alt="arrowhead pointed left"
                        />
                        <p className="dark:text-white"> Go back</p>
                    </button>
                </div>

                <FormTitle InvoiceId={invoice?.id} />

                <BillTitle title={'Bill From'} />
                <Field
                    labelName="Street Address"
                    error={errors.street_address_from?.message}
                    defaultvalue={invoice?.senderAddress.street}
                    {...register('street_address_from')}
                />
                <div className="flex gap-6 mt-6 ">
                    <Field
                        labelName="City"
                        error={errors.city_from?.message}
                        defaultvalue={invoice?.senderAddress.city}
                        {...register('city_from')}
                    />
                    <Field
                        labelName="Post Code"
                        error={errors.postCode_from?.message}
                        defaultvalue={invoice?.senderAddress.postCode}
                        {...register('postCode_from')}
                    />
                    <Field
                        labelName="Country"
                        error={errors.country_from?.message}
                        defaultvalue={invoice?.senderAddress.country}
                        {...register('country_from')}
                    />
                </div>

                <BillTitle title={'Bill To'} />

                <Field
                    labelName="Client's Name"
                    error={errors.clientName?.message}
                    defaultvalue={invoice?.clientName}
                    {...register('clientName')}
                />
                <Field
                    labelName="Client's Email"
                    error={errors.clientEmail?.message}
                    defaultvalue={invoice?.clientEmail}
                    inputPlaceholder="e.g.email@example.com"
                    {...register('clientEmail')}
                />
                <Field
                    labelName="Street Address"
                    error={errors.client_address?.message}
                    defaultvalue={invoice?.clientAddress.street}
                    {...register('client_address')}
                />
                <div className="flex gap-6 mt-6 ">
                    <Field
                        labelName="City"
                        error={errors.client_city?.message}
                        defaultvalue={invoice?.clientAddress.city}
                        {...register('client_city')}
                    />
                    <Field
                        labelName="Post Code"
                        error={errors.client_postCode?.message}
                        defaultvalue={invoice?.clientAddress.postCode}
                        {...register('client_postCode')}
                    />
                    <Field
                        labelName="Country"
                        error={errors.client_country?.message}
                        defaultvalue={invoice?.clientAddress.country}
                        {...register('client_country')}
                    />
                </div>

                <div className="flex gap-6">
                    <Field
                        labelName="Invoice Date"
                        error={errors.invoice_date?.message}
                        defaultvalue={invoice?.createdAt}
                        inputType="date"
                        {...register('invoice_date')}
                    />
                    <Field
                        labelName="Payment Terms"
                        error={errors.payment_terms?.message}
                        defaultvalue={invoice?.paymentTerms}
                        inputType="select"
                        {...register('payment_terms')}
                    />
                </div>
                <Field
                    error={errors.description?.message}
                    labelName="Project Description"
                    defaultvalue={invoice?.description}
                    {...register('description')}
                />

                <ItemList
                    register={register}
                    invoice={invoice}
                    control={control}
                    error={errors}
                    watch={watch}
                    setValue={setValue}
                    getValues={getValues}
                />
                {!isErrorEmpty(errors) && (
                    <div className="mt-9 text-red-500">
                        <p>-All fields must be added</p>
                        <p>-All items must be added</p>
                    </div>
                )}
                <FormFooter
                    edit={invoice ? true : false}
                    setShowForm={setShowForm}
                />
            </form>
        </div>
    );
};

export default Form;
