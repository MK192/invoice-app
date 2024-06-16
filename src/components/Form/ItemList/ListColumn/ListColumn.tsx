import { useEffect, useState } from 'react';

import {
    UseFormRegister,
    UseFieldArrayRemove,
    UseFormWatch,
    UseFormSetValue,
    FieldErrors,
    UseFormGetValues,
    Path,
} from 'react-hook-form';

// components

import { Field } from '../../Field';

// type
import { FormInputs, InvoiceType } from '../../../../types/types';

type Props = {
    invoice?: InvoiceType | null;
    register: UseFormRegister<FormInputs>;

    index: number;
    remove: UseFieldArrayRemove;
    error: FieldErrors<FormInputs>;
    watch: UseFormWatch<FormInputs>;
    setValue: UseFormSetValue<FormInputs>;
    getValues: UseFormGetValues<FormInputs>;
};
const ListColumn = ({
    invoice,
    register,
    index,
    remove,
    error,
    watch,
    setValue,
    getValues,
}: Props) => {
    const [isHovered, setIsHovered] = useState<number | null>(null);

    const handleHover = (id: number | null) => {
        setIsHovered(id);
    };

    const watchPrice = watch(`item_column.${index}.price` as Path<FormInputs>);
    const watchQuantity = watch(
        `item_column.${index}.quantity` as Path<FormInputs>,
    );

    useEffect(() => {
        // console.log(watchPrice, watchQuantity);

        setValue(
            `item_column.${index}.total` as Path<FormInputs>,
            +watchPrice * +watchQuantity,
        );
    }, [index, getValues, setValue, watchPrice, watchQuantity]);

    return (
        <div className="flex items-center tabletMini:flex-col tabletMini:items-start">
            <div className="w-10/12 mr-4 tabletMini:w-full">
                <Field
                    labelName="Item Name"
                    error={
                        error.item_column &&
                        error.item_column[index]?.name?.message
                    }
                    defaultvalue={invoice?.items[index]?.name}
                    {...register(
                        `item_column.${index}.name` as Path<FormInputs>,
                    )}
                />
            </div>
            <div className="flex items-center w-7/12 tabletMini:w-full">
                <div className="w-3/12 min-w-[46px] mr-4">
                    <Field
                        labelName="Qty"
                        error={
                            error.item_column &&
                            error.item_column[index]?.quantity?.message
                        }
                        defaultvalue={invoice?.items[index]?.quantity}
                        {...register(
                            `item_column.${index}.quantity` as Path<FormInputs>,
                            {
                                valueAsNumber: true,
                            },
                        )}
                        inputType="number"
                    />
                </div>
                <div className="w-7/12  mr-4">
                    <Field
                        labelName="Price"
                        error={
                            error.item_column &&
                            error.item_column[index]?.price?.message
                        }
                        defaultvalue={invoice?.items[index]?.price}
                        {...register(
                            `item_column.${index}.price` as Path<FormInputs>,
                            {
                                valueAsNumber: true,
                            },
                        )}
                        inputType="number"
                    />
                </div>
                <div className=" flex flex-col gap-6 w-4/12 self-start  min-w-[46px] mr-4 text-xs  tabletMini:w-full tabletMini:mr-auto ">
                    <label className="text-xs">Total</label>

                    <input
                        type="number"
                        className="dark:bg-mirageDark"
                        {...register(
                            `item_column.${index}.total` as Path<FormInputs>,
                        )}
                        readOnly
                    />
                </div>
                <div
                    onMouseEnter={() => handleHover(index)}
                    onMouseLeave={() => handleHover(null)}
                >
                    <button
                        onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            remove(index);
                        }}
                    >
                        <img
                            src={
                                isHovered === index
                                    ? '/redtrash.png'
                                    : '/trash.png'
                            }
                            className="w-7 "
                            alt="delete icon"
                        />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ListColumn;
