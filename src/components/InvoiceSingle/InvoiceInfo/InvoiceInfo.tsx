import { format } from 'date-fns';

// Type
import { InvoiceType } from '../../../types/types';

type Props = {
    selectedInvoice: InvoiceType | null;
};

const InvoiceInfo = ({ selectedInvoice }: Props) => {
    const createdDate =
        selectedInvoice &&
        format(new Date(selectedInvoice?.createdAt), 'd LLL yyyy');

    const paymentDue =
        selectedInvoice &&
        format(new Date(selectedInvoice?.paymentDue), 'd LLL yyyy');

    return (
        <div>
            {/*  First Section*/}
            <div className="flex justify-between sm:flex-col sm:items-start mb-[21px]">
                <div className="flex flex-col justify-start text-start sm:mb-[30px]">
                    <strong className="text-base dark:text-white text-[16px]">
                        <span className="text-baliHai">#</span>
                        {selectedInvoice?.id}
                    </strong>
                    <p className="text-baliHai text-xs dark:text-selago">
                        {' '}
                        {selectedInvoice?.description}
                    </p>
                </div>
                <div className="text-end text-baliHai dark:text-selago sm:mb-[31px]">
                    <p> {selectedInvoice?.senderAddress.street}</p>
                    <p>{selectedInvoice?.senderAddress.city}</p>
                    <p>{selectedInvoice?.senderAddress.postCode}</p>
                    <p>{selectedInvoice?.senderAddress.country}</p>
                </div>
            </div>

            {/*  Second Section*/}
            <div className=" text-start flex  justify-between tabletMini:flex-col">
                <div className="flex w-full gap-[25%] ">
                    <div className="flex flex-col gap-7">
                        <div className="flex flex-col ">
                            <p className="text-baliHai text-wrap text-[12px] mb-2 dark:text-selago">
                                Invoice Date
                            </p>
                            <strong className="text-[15px] dark:text-white ">
                                {createdDate}
                            </strong>
                        </div>
                        <div className="flex flex-col ">
                            <p className="text-baliHai mb-2 dark:text-selago">
                                Payment Due
                            </p>
                            <strong className="text-[15px] dark:text-white ">
                                {paymentDue}
                            </strong>
                        </div>
                    </div>
                    <div className="flex flex-col text-baliHai dark:text-selago">
                        <p className="mb-2 ">Bill to</p>
                        <strong className="text-black  text-[15px] mb-2 dark:text-white">
                            {selectedInvoice?.clientName}
                        </strong>

                        <p>{selectedInvoice?.clientAddress.street}</p>
                        <p>{selectedInvoice?.clientAddress.city}</p>
                        <p>{selectedInvoice?.clientAddress.postCode}</p>
                        <p>{selectedInvoice?.clientAddress.country}</p>
                    </div>
                </div>
                <div className="flex flex-col pr-14 min-w-[35%]">
                    <p className="text-baliHai mb-2 dark:text-selago  ">
                        Send to
                    </p>
                    <strong className="text-[15px] dark:text-white">
                        {selectedInvoice?.clientEmail}
                    </strong>
                </div>
            </div>
        </div>
    );
};

export default InvoiceInfo;
