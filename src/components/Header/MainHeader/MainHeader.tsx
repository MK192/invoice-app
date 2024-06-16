import { useState } from 'react';
import { clsx } from 'clsx';

// components
import { Button } from '../../Button';
import FilterModal from '../../Modal/FilterModal';

type Props = {
    numberOfInvoices: number;
    setShowForm: (showForm: boolean) => void;
};

const MainHeader = ({ numberOfInvoices, setShowForm }: Props) => {
    const [isModalActive, setIsModalActive] = useState(false);

    return (
        <div>
            <div className="flex items-start justify-between w-187 md:w-full">
                <div className="flex flex-col items-start ">
                    <h1
                        className={`${clsx(
                            'font-bold text-black text-[34px] dark:text-white  sm:text-[24px]',
                        )}`}
                    >
                        Invoices
                    </h1>

                    {numberOfInvoices === 0 && (
                        <p className="text-xs text-baliHai dark:text-baliHai">
                            No Invoice
                        </p>
                    )}
                    {numberOfInvoices > 0 && (
                        <p className="text-xs text-baliHai dark:text-baliHai ">
                            <span className="sm:hidden">There are </span>
                            {numberOfInvoices}{' '}
                            <span className="sm:hidden">total</span> invoices
                        </p>
                    )}
                </div>

                <div className="flex gap-x-7 items-start ">
                    <div className="flex gap-x-3.5 mt-4 relative">
                        <button
                            onClick={(e) => {
                                setIsModalActive(!isModalActive);
                                e.stopPropagation();
                            }}
                            className="flex gap-2"
                        >
                            <p className="text-xs font-bold  text-black dark:text-white">
                                Filter{' '}
                                <span className="sm:hidden">by status</span>
                            </p>
                            <img
                                src="expand.png"
                                className="w-5 "
                                alt="arrowhead pointed down"
                            />
                        </button>

                        {isModalActive && (
                            <div className="absolute top-10 right-32 ">
                                <FilterModal setShowModal={setIsModalActive} />
                            </div>
                        )}
                    </div>
                    <Button
                        variation="button-1"
                        text={'New'}
                        handleClick={() => setShowForm(true)}
                    />
                </div>
            </div>
        </div>
    );
};

export default MainHeader;
