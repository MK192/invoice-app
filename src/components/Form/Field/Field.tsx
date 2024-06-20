import { useState, forwardRef, useEffect, useRef } from 'react';
import { clsx } from 'clsx';

type Props = {
    labelName: string;
    inputPlaceholder?: string;
    inputType?: string;
    error: string | undefined;
    value?: string;
    defaultvalue: string | number | undefined;
    handleChange?: (e: number) => void;
};
type HTMLElement = HTMLInputElement | HTMLSelectElement;
const Field = forwardRef<HTMLElement, Props>(
    (
        {
            labelName,
            inputPlaceholder,
            inputType = 'text',
            error = '',
            value,
            defaultvalue,
            handleChange,
            ...other
        }: Props,
        ref,
    ) => {
        const options = [
            { value: 'option-1', text: 'Net 1 Day' },
            { value: 'option-2', text: 'Net 7 Days' },
            { value: 'option-3', text: 'Net 14 Days' },
            { value: 'option-4', text: 'Net 30 Days' },
        ];
        const [selected, setSelected] = useState(options[3].text);
        const [showErrorMsg, setShowErrorMsg] = useState(true);
        const myElementRef = useRef<HTMLDivElement>(null);

        useEffect(() => {
            // calculate is there a place for error msg to diplay it or just to change color of border
            const elementWidth =
                myElementRef.current && myElementRef.current.offsetWidth;

            if (elementWidth && elementWidth < 170) {
                setShowErrorMsg(false);
            }
        }, []);

        return (
            <div className="flex flex-col text-xs mb-6 w-full">
                <div className="flex justify-between" ref={myElementRef}>
                    <label
                        className={`${clsx(
                            'mb-[10px]',
                            error && 'text-red-500',
                        )}`}
                    >
                        {labelName}
                    </label>
                    {error && showErrorMsg && (
                        <span className={`${clsx(error && 'text-red-500')}`}>
                            {error}
                        </span>
                    )}
                </div>
                {inputType !== 'select' ? (
                    <input
                        type={inputType}
                        value={value}
                        className={`${clsx(
                            ' w-full border-[1px] border-selago rounded h-12 pl-[20px]  text-black font-bold dark:bg-ebonyClay dark:border-ebonyClay dark:text-white',
                            error && '!border-red-500 ',
                        )}`}
                        placeholder={inputPlaceholder}
                        onChange={(e) =>
                            handleChange && handleChange(Number(e.target.value))
                        }
                        {...other}
                        defaultValue={defaultvalue}
                        ref={ref as React.RefObject<HTMLInputElement>}
                    />
                ) : (
                    <div className="relative">
                        <select
                            className="border-[1px] z-10 w-full border-selago rounded hover:border-cornflowerBlue h-12 pl-[20px] text-black font-bold appearance-none dark:bg-ebonyClay dark:text-white dark:border-ebonyClay dark:hover:border-cornflowerBlue"
                            value={selected}
                            {...other}
                            ref={ref as React.RefObject<HTMLSelectElement>}
                            onChange={(e) => setSelected(e.target.value)}
                        >
                            {options.map((option) => {
                                return (
                                    <option key={option.value}>
                                        {option.text}
                                    </option>
                                );
                            })}
                        </select>
                        <img
                            src="/expand.png"
                            className="absolute top-3 right-3 w-6 z-0"
                        />
                    </div>
                )}
            </div>
        );
    },
);
export default Field;
