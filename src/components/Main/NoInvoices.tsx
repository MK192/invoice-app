const NoInvoices = () => {
    return (
        <div className="flex flex-col items-center mx-auto w-96 mt-20 ">
            {' '}
            <img
                src="Hero.png"
                alt="woman with megafon inside open letter"
                className="w-60 bg-transparent"
            />
            <strong className="mt-20 font-bold text-baliHai text-xl dark:text-selago">
                There is nothing here
            </strong>
            <div className="w-48">
                <p className="mt-2 text-baliHai text-xs tracking-wide dark:text-selago">
                    Create an invoice by clicking the
                    <span className="font-bold dark:text-white">
                        {' '}
                        New Invoice{' '}
                    </span>{' '}
                    button and get started
                </p>
            </div>
        </div>
    );
};

export default NoInvoices;
