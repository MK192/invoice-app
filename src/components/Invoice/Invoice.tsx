import { format } from 'date-fns';

// type
import { InvoiceType } from '../../types/types';

// components
import InvoiceStatus from '../InvoiceStatus/InvoiceStatus';

type Props = {
    invoice: InvoiceType;
};

const Invoice = ({ invoice }: Props) => {
    const createdAt =
        invoice.createdAt && format(new Date(invoice.createdAt), 'd LLL yyyy');
    return (
        <div className="flex items-center  w-187 dark:bg-mirage rounded transition-all ease-in-out duration-[500ms] sm:p-6 sm:items-end md:w-full h-16 bg-white mt-3 px-7 md:pl-6 md:pr-8 shadow-sm  sm:h-[134px] tablet:text-[10px] tablet:px-2">
            <div className="flex sm:flex-col sm:relative sm:self-start  sm:text-left sm:items-start w-full items-center ">
                <p className="text-left text-black font-bold  dark:text-white    w-[18%] sm:text-xs sm:mb-6 md:w-[18%]  tablet:text-[10px] ">
                    {' '}
                    <span className="text-baliHai">#</span>
                    {invoice.id}
                </p>
                <p className="text-left text-baliHai     w-[27%] sm:w-[85%] sm:mb-2 sm:text-xs md:w-[27%] tablet:text-[10px]">
                    {' '}
                    Due {createdAt}
                </p>

                <p className=" text-left text-baliHai   w-[25%] sm:hidden tablet:text-[10px] tablet:w-[25%] md:w-[25%]">
                    {invoice.clientName}
                </p>
                <p className="text-right font-bold text-black text-base mr-[8%]  dark:text-white w-[23%] sm:w-full sm:text-[16px] sm:text-left tablet:mr-[20px] tablet:w-[23%] md:w-1/5 md:text-xs   md:mr-[40px] ">
                    £ {invoice.total?.toFixed(2)}
                </p>
            </div>
            <div className="flex flex-col gap-8 ">
                <p className=" text-left text-baliHai  hidden w-[25%] sm:block sm:w-full sm:text-right tablet:text-[10px] tablet:w-[25%] md:w-[25%]">
                    {invoice.clientName}
                </p>
                <InvoiceStatus invoiceStatus={invoice.status} />
            </div>
            <img
                src="right.png"
                className="w-6.5 sm:hidden rotate-180"
                alt="arrowhead pointed right"
            />
        </div>
    );
};

export default Invoice;
