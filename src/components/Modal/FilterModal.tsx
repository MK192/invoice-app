import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// redux
import { changeSelectedFilter } from '../../redux/invoiceSlice';

// type
import { InvoiceSliceType } from '../../types/types';

type Props = {
    setShowModal: (showModal: boolean) => void;
};
const FilterModal = ({ setShowModal }: Props) => {
    const ref = useRef<HTMLDivElement>(null);
    const selectedFilters = useSelector(
        (state: InvoiceSliceType) => state.invoice.selectedFilter,
    );
    // let copyFilters = [...selectedFilters];

    const checkOutsideClick = (event: MouseEvent) => {
        if (ref.current && !ref.current.contains(event.target as Node)) {
            setShowModal(false);
        }
    };

    const dispatch = useDispatch();

    useEffect(() => {
        document.addEventListener('click', checkOutsideClick);

        return () => {
            document.removeEventListener('click', checkOutsideClick);
        };
    }, []);

    const handlingCheckboxChange = (checkbox: string) => {
        /* index is used to change array element with that index */

        let index = null;
        if (checkbox === 'draft') index = 0;

        if (checkbox === 'pending') index = 1;

        if (checkbox === 'paid') index = 2;

        dispatch(changeSelectedFilter(index));
    };

    return (
        <div
            className="flex flex-col items-start gap-1.5 justify-center fixed z-index-30 w-48 h-32 p-6 overflow-hidden  bg-white text-black shadow-xl rounded-lg dark:bg-ebonyClay dark:text-white"
            ref={ref}
            onClick={(e) => e.stopPropagation()}
        >
            {/*first checkbox */}
            <div className="relative">
                <label className="font-bold">
                    <input
                        type="checkbox"
                        name="draft"
                        value="draft"
                        checked={selectedFilters[0]}
                        className="appearance-none  w-4 h-4 bg-selago border border-cornflowerBlue checked:bg-cornflowerBlue dark:bg-black dark:checked:bg-cornflowerBlue"
                        onChange={() => {
                            handlingCheckboxChange('draft');
                        }}
                    />{' '}
                    {selectedFilters[0] && (
                        <img
                            src="check.png"
                            className="bg-transparent w-2.5 absolute top-1 left-0.5 "
                        />
                    )}
                    Draft
                </label>
            </div>

            {/*second checkbox */}
            <div className="relative">
                <label className="font-bold">
                    <input
                        type="checkbox"
                        name="pending"
                        value="pending"
                        checked={selectedFilters[1]}
                        className="appearance-none  w-4 h-4 bg-selago border border-cornflowerBlue checked:bg-cornflowerBlue  dark:bg-black dark:checked:bg-cornflowerBlue"
                        onChange={() => {
                            handlingCheckboxChange('pending');
                        }}
                    />{' '}
                    {selectedFilters[1] && (
                        <img
                            src="check.png"
                            className="bg-transparent w-2.5 absolute top-1 left-0.5 "
                        />
                    )}
                    Pending
                </label>
            </div>

            {/*third checkbox */}
            <div className="relative">
                <label className="font-bold">
                    <input
                        type="checkbox"
                        name="paid"
                        value="paid"
                        checked={selectedFilters[2]}
                        className="appearance-none  w-4 h-4 bg-selago border border-cornflowerBlue checked:bg-cornflowerBlue  dark:bg-black dark:checked:bg-cornflowerBlue"
                        onChange={() => {
                            handlingCheckboxChange('paid');
                        }}
                    />{' '}
                    {selectedFilters[2] && (
                        <img
                            src="check.png"
                            className="bg-transparent w-2.5 absolute top-1 left-0.5"
                        />
                    )}
                    Paid
                </label>
            </div>
        </div>
    );
};

export default FilterModal;
