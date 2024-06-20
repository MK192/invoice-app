import { Link } from 'react-router-dom';

// Component
import { Invoice } from '../Invoice';

// type
import { InvoiceType } from '../../types/types';

type Props = {
    filteredInvoices: InvoiceType[];
};

const InvoicesTable = ({ filteredInvoices }: Props) => {
    return (
        <div className="mt-16 md:w-full ">
            {filteredInvoices &&
                filteredInvoices.map((invoice) => {
                    return (
                        <div key={invoice.id}>
                            <Link to={`invoice/${invoice.id}`}>
                                <Invoice invoice={invoice} />
                            </Link>
                        </div>
                    );
                })}
        </div>
    );
};

export default InvoicesTable;
