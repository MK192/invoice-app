import {
    UseFormRegister,
    useFieldArray,
    Control,
    FieldErrors,
    UseFormWatch,
    UseFormSetValue,
    UseFormGetValues,
} from 'react-hook-form';

// components
import { Button } from '../../Button';

import { ListColumn } from './ListColumn';
// type
import { FormInputs, InvoiceType } from '../../../types/types';

type Props = {
    invoice?: InvoiceType | null;
    register: UseFormRegister<FormInputs>;
    watch: UseFormWatch<FormInputs>;
    control: Control<FormInputs>;
    error: FieldErrors<FormInputs>;
    setValue: UseFormSetValue<FormInputs>;
    getValues: UseFormGetValues<FormInputs>;
};

const ItemList = ({
    invoice,
    register,
    watch,
    control,
    error,
    setValue,
    getValues,
}: Props) => {
    const { fields, append, remove } = useFieldArray({
        name: 'item_column',
        control,
    });

    return (
        <div>
            {fields.map((field, index) => {
                return (
                    <ListColumn
                        index={index}
                        invoice={invoice}
                        key={field?.id}
                        register={register}
                        error={error}
                        remove={remove}
                        watch={watch}
                        setValue={setValue}
                        getValues={getValues}
                    />
                );
            })}

            <Button
                variation="button-6"
                text="+ Add New Item"
                handleClick={() =>
                    append({
                        name: '',
                        quantity: '',
                        price: '',
                        total: '',
                    })
                }
            />
        </div>
    );
};

export default ItemList;
