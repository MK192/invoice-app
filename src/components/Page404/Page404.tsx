import { Link } from 'react-router-dom';

const Page404 = () => {
    return (
        <div className="h-screen flex items-center justify-center flex-col w-screen  gap-10 text-red-500 lg:ml-0 ">
            <p className="text-4xl text-center border-solid border-2 border-red-500 p-5">
                Error&nbsp;404&nbsp;-&nbsp; Page not found
            </p>
            <Link to={'/'}>
                <p className="text-2xl underline"> Back To Main</p>
            </Link>
        </div>
    );
};
export default Page404;
