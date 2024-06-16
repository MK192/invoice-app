type Props = {
    InvoiceId: string | undefined;
};
const FormTitle = ({ InvoiceId }: Props) => {
    return (
        <div className="text-3xl text-black mb-12 block dark:text-white">
            {InvoiceId ? (
                <strong>
                    Edit <span className="text-baliHai">#</span> {InvoiceId}
                </strong>
            ) : (
                <strong>New Inovice</strong>
            )}
        </div>
    );
};

export default FormTitle;
