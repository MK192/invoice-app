// type
import { ItemsType } from '../../../types/types';

//  function

import { calculateTotal } from '../../../utils/functions';

type Props = {
    items: ItemsType[] | undefined;
};

const DueCalculation = ({ items }: Props) => {
    return (
        <div className="mt-[48px] bg-selagoLight rounded-lg dark:bg-ebonyClay dark:text-white">
            <div className="p-8 pb-2">
                {items?.map((item, index) => {
                    return (
                        <div
                            className="flex rounded-lg"
                            key={`${item.name}-${index}`}
                        >
                            <div className="flex flex-col w-8/12 text-start gap-7 text-[12px] tabletMini:6/12 ">
                                {index === 0 && (
                                    <p className="text-baliHai text-[11px] dark:text-selago sm:hidden">
                                        Item Name
                                    </p>
                                )}
                                <strong key={item.name} className="pb-8">
                                    <p> {item.name}</p>
                                    <p className="hidden mt-2 text-baliHai sm:block ">
                                        {' '}
                                        {`${item.quantity} x £ ${Number(
                                            item.price,
                                        ).toFixed(2)}`}
                                    </p>
                                </strong>
                            </div>

                            <div className="flex flex-col w-1/12 gap-7 text-[12px] sm:hidden">
                                {index === 0 && (
                                    <p className="text-baliHai text-[11px] dark:text-selago ">
                                        QTY
                                    </p>
                                )}
                                <strong
                                    key={item.name}
                                    className="text-baliHai dark:text-selago"
                                >
                                    {' '}
                                    {item.quantity}
                                </strong>
                            </div>

                            <div className="flex flex-col w-[25%] gap-7 text-[12px] text-end sm:hidden tabletMini:w-[35%]">
                                {index === 0 && (
                                    <p className="text-baliHai text-[11px] dark:text-selago">
                                        Price
                                    </p>
                                )}
                                <strong
                                    key={item.name}
                                    className="text-baliHai dark:text-selago"
                                >
                                    £ {Number(item.price)?.toFixed(2)}
                                </strong>
                            </div>

                            <div className="flex flex-col gap-7 text-[12px] w-[35%] text-end">
                                {index === 0 && (
                                    <p className="text-baliHai text-[11px] dark:text-selago sm:hidden">
                                        Total
                                    </p>
                                )}
                                <strong
                                    key={item.name}
                                    className="sm:mt-[10px]"
                                >
                                    £{' '}
                                    {(
                                        Number(item.price) *
                                        Number(item.quantity)
                                    )?.toFixed(2)}
                                </strong>
                            </div>
                        </div>
                    );
                })}
            </div>
            {/*  total section*/}
            <div className="flex text-white bg-oxfordBlue justify-between items-center px-8 py-6 rounded-bl-md rounded-br-md dark:bg-vulkan">
                <p className="text-[11px]">Amount Due </p>
                <strong className="text-2xl">
                    £ {items && calculateTotal(items).toFixed(2)}
                </strong>
            </div>
        </div>
    );
};

export default DueCalculation;
