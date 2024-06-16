import { clsx } from 'clsx';

type Props = {
    variation: string;
    text: string;
    type?: 'button' | 'submit' | 'reset';
    buttonName?: string;
    handleClick?: () => void;
};
const Button = ({
    variation = 'button-1',
    text,
    type = 'button',
    buttonName,
    handleClick,
}: Props) => {
    const classes = clsx(
        `h-12 rounded-3xl flex px-1 items-center font-bold text-[12px] transition ease-in-out delay-100`,
        variation === 'button-1' &&
            'bg-cornflowerBlue text-white  hover:bg-heliotrope ',
        variation === 'button-2' &&
            'bg-cornflowerBlue text-white hover:bg-heliotrope ',
        variation === 'button-3' &&
            'bg-athensGrayDark text-shipCove hover:bg-selago dark:bg-ebonyClay dark:text-selago dark:hover:bg-white dark:hover:text-selago',
        variation === 'button-4' &&
            'bg-oxfordBlue text-baliHai hover:bg-vulkan  dark:text-selago dark:hover:bg-mirage',
        variation === 'button-5' &&
            'bg-burntSienna text-white hover:bg-monaLisa',
        variation === 'button-6' &&
            'bg-athensGrayDark text-shipCove hover:bg-selago w-full',
    );

    return (
        <div>
            <button
                className={classes}
                type={type}
                name={buttonName}
                onClick={(e) => {
                    handleClick && handleClick();
                    e.stopPropagation();
                    // e.preventDefault();
                }}
            >
                {variation === 'button-1' && (
                    <div className="relative z-0">
                        <img
                            src="Oval.png"
                            className="w-8 relative "
                            alt="round circle"
                        />
                        <img
                            src="plus.png"
                            className="w-3 absolute top-2.5 left-2.5 z-10"
                        />
                    </div>
                )}
                <p
                    className={clsx(
                        variation === 'button-1' &&
                            `sm:after:content-[''] xl:after:content-['_Invoice']`,
                        variation === 'button-6' ? 'mx-auto' : 'mx-4',
                    )}
                >
                    {text}
                </p>
            </button>
        </div>
    );
};

export default Button;
