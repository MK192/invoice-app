import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';

// Redux
import { deleteInvoice, markAsPaid } from '../../../redux/invoiceSlice';

// component
import { InvoiceStatus } from '../../InvoiceStatus';
import { Button } from '../../Button';

// type
import { InvoiceType } from '../../../types/types';

// Functions
import {
    invalidateInactive,
    invalidateInvoices,
} from '../../../utils/functions';
type Props = {
    status: string | undefined;
    selectedInvoice: InvoiceType | null;
    setShowForm: (showForm: boolean) => void;
};

const SingleHeader = ({ status, selectedInvoice, setShowForm }: Props) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const queryClient = useQueryClient();

    return (
        <div className="w-full ">
            <div>
                <button
                    onClick={() => navigate(-1)}
                    className="flex font-bold items-center gap-6  "
                >
                    <img
                        src="/right.png"
                        className="w-6.5 justify-items-start z-1"
                        alt="arrowhead pointed left"
                    />
                    <p className="dark:text-white"> Go back</p>
                </button>
            </div>

            <div className="flex mt-8 bg-white h-[88px] py-6 px-8 justify-between rounded dark:bg-mirage sm:h-[91px] tabletMini:px-3 ">
                <div className="flex gap-4 items-center sm:justify-between sm:w-full sm:p-6">
                    <p className="text-baliHai">Status</p>

                    <InvoiceStatus invoiceStatus={status} />
                </div>
                <div className="flex column gap-2 sm:hidden">
                    <Button
                        variation="button-3"
                        text="Edit"
                        handleClick={() => {
                            selectedInvoice?.status === 'draft' &&
                                setShowForm(true);
                        }}
                    />
                    <Button
                        variation="button-5"
                        text="Delete"
                        handleClick={() => {
                            dispatch(deleteInvoice(selectedInvoice?.id));
                            queryClient.removeQueries({
                                queryKey: ['invoice', selectedInvoice?.id],
                            });
                            invalidateInvoices(queryClient, ['invoices']);
                            navigate(-1);
                        }}
                    />
                    <Button
                        variation="button-2"
                        text="Mark as Paid"
                        handleClick={() => {
                            dispatch(
                                markAsPaid([selectedInvoice, queryClient]),
                            );

                            invalidateInactive(queryClient);
                        }}
                    />
                </div>
            </div>
        </div>
    );
};

export default SingleHeader;
