type Props = {
    title: string;
};

const BillTitle = ({ title }: Props) => {
    return <p className="text-cornflowerBlue mb-6 font-bold">{title}</p>;
};
export default BillTitle;
