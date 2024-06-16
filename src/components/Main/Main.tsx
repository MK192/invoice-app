import { useSelector, useDispatch } from 'react-redux';
import { useQuery } from '@tanstack/react-query';

// Redux
import { fetchInvoices } from '../../redux/invoiceSlice';

// components
import { MainHeader } from '../Header/MainHeader';
import NoInvoices from './NoInvoices';
import InvoicesTable from './InvoicesTable';
import { Loading } from '../Loading';

// type
import { InvoiceSliceType } from '../../types/types';

type Props = {
    setShowForm: (showForm: boolean) => void;
};
const Main = ({ setShowForm }: Props) => {
    const invoices = useSelector(
        (state: InvoiceSliceType) => state.invoice.invoices,
    );

    const selectedFilter = useSelector(
        (state: InvoiceSliceType) => state.invoice.selectedFilter,
    );
    const filteredInvoices = useSelector(
        (state: InvoiceSliceType) => state.invoice.filteredInvoices,
    );
    const dispatch = useDispatch();
    const { isLoading } = useQuery({
        queryKey: ['invoices', ...selectedFilter],

        refetchOnWindowFocus: false,
        queryFn: () =>
            fetch(`http://localhost:3004/invoices`).then(async (res) => {
                const data = await res.json();
                dispatch(fetchInvoices(data));

                console.log('fetch');

                return data;
            }),
        staleTime: 10000000,
    });

    return (
        <>
            {isLoading &&
            (invoices.length === 0 || filteredInvoices.length === 0) ? (
                <Loading />
            ) : (
                <main className="flex flex-col items-center min-h-screen  mx-auto pt-16 px-5 lg:py-36 tablet:px-6 md:w-full  md:px-12 ">
                    {invoices?.length === 0 ? (
                        <div className="md:w-full">
                            <MainHeader
                                numberOfInvoices={
                                    filteredInvoices.length > 0
                                        ? filteredInvoices?.length
                                        : invoices.length
                                }
                                setShowForm={setShowForm}
                            />
                            <NoInvoices />
                        </div>
                    ) : (
                        <div className="md:w-full">
                            <MainHeader
                                numberOfInvoices={
                                    filteredInvoices.length > 0
                                        ? filteredInvoices?.length
                                        : invoices.length
                                }
                                setShowForm={setShowForm}
                            />
                            <InvoicesTable
                                filteredInvoices={
                                    filteredInvoices.length > 0
                                        ? filteredInvoices
                                        : invoices
                                }
                            />
                        </div>
                    )}
                </main>
            )}
        </>
    );
};

export default Main;
