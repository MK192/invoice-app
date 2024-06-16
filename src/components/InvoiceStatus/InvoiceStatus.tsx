import { clsx } from 'clsx';

type Props = {
    invoiceStatus: string | undefined;
};
const InvoiceStatus = ({ invoiceStatus }: Props) => {
    return (
        <div
            className={`${clsx(
                'w-[92px] flex items-center justify-center pr-3 h-[40px]  mr-[20px]  before:mx-2 before:rounded-full before:content-[" "] before:h-2 before:w-2 rounded-lg font-bold sm:mr-0 tablet:mr-[10px]',
                invoiceStatus === 'paid' &&
                    'bg-polar text-shamrock before:bg-shamrock before:text-shamrock dark:bg-shamrockDark',
                invoiceStatus === 'pending' &&
                    'bg-pizazz text-serenade  before:bg-serenade before:text-serenade dark:bg-serenadeDark',
                invoiceStatus === 'draft' &&
                    'bg-athensGray text-oxfordBlue  before:bg-oxfordBlue before:text-oxfordBlue dark:bg-athensGrayDark dark:text-athensGray dark:before:bg-athensGray before:athensGray',
            )}`}
        >
            <p className="first-letter:uppercase"> {invoiceStatus}</p>
        </div>
    );
};

export default InvoiceStatus;
