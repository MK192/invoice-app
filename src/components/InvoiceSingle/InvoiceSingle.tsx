import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useNavigate, useParams } from 'react-router-dom';

// Component
import { Nav } from '../Nav';
import { Form } from '../Form';
import { Button } from '../Button';
import { SingleHeader } from './SingleHeader';
import { InvoiceInfo } from './InvoiceInfo';
import { Page404 } from '../Page404';
import { Loading } from '../Loading';
import { DueCalculation } from './DueCalculation';

// Redux
import {
    deleteInvoice,
    fetchSingleInvoice,
    markAsPaid,
} from '../../redux/invoiceSlice';

//type
import { InvoiceSliceType } from '../../types/types';

// Functions
import { invalidateInactive } from '../../utils/functions';

const InvoiceSingle = () => {
    const id = useParams();
    const { invoiceId } = id;

    const navigate = useNavigate();
    const dispatch = useDispatch();
    let selectedInvoice = useSelector(
        (state: InvoiceSliceType) => state.invoice.singleInvoice,
    );
    const [showForm, setShowForm] = useState<boolean>(false);
    const {
        isLoading,
        isError,

        data: invoice,
    } = useQuery({
        queryKey: ['invoice', invoiceId],

        refetchOnWindowFocus: false,
        queryFn: () =>
            fetch(`http://localhost:3004/invoices/${invoiceId}`).then(
                async (res) => {
                    const data = await res.json();

                    dispatch(fetchSingleInvoice(data));
                    console.log('fetch single');

                    return data;
                },
            ),
        staleTime: 10000000,
    });

    // if there is cashed data for this key, we use it if not we use selectedInvoice
    selectedInvoice = invoice ? invoice : selectedInvoice;

    const queryClient = useQueryClient();

    return (
        <div
            className="flex h-full lg:flex-col 
        transition-all ease-in-out duration-700 dark:bg-vulkan min-h-screen overflow-hidden"
        >
            <div className="w-[103px] relative z-10">
                <Nav />

                {showForm && (
                    <Form setShowForm={setShowForm} invoice={selectedInvoice} />
                )}
            </div>
            {isError && <Page404 />}
            {isLoading ? (
                <div>{<Loading />}</div>
            ) : (
                <div className="flex flex-col items-center w-[730px] h-full sm:pb-0 tabletMini:px-[20px] md:w-full md:px-[40px] mx-auto  pt-[64px] pb-[54px] lg:py-[135px] text-black z-1">
                    <SingleHeader
                        status={selectedInvoice?.status}
                        selectedInvoice={selectedInvoice}
                        setShowForm={setShowForm}
                    />
                    <div className="bg-white mt-5  p-[48px] w-full  rounded sm:h-full md:h-[602px] md:p-8 dark:bg-mirage">
                        <InvoiceInfo selectedInvoice={selectedInvoice} />
                        <DueCalculation items={selectedInvoice?.items} />
                    </div>

                    <div className="gap-2 hidden mt-[56px] bg-white w-screen h-[91px] justify-center items-center  dark:bg-mirage sm:flex ">
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
                                navigate(-1);
                            }}
                        />
                        <Button
                            variation="button-2"
                            text="Mark as Paid"
                            handleClick={() => {
                                dispatch(markAsPaid(selectedInvoice));

                                invalidateInactive(queryClient);
                            }}
                        />
                    </div>
                </div>
            )}
        </div>
    );
};
export default InvoiceSingle;
