import { Link } from 'react-router-dom';
import { Switcher } from '../Switcher';

const Nav = () => {
    return (
        <nav className="flex flex-col z-30 items-center justify-between  w-25 bg-oxfordBlue dark:bg-mirage rounded-tr-[25px] rounded-br-[25px] fixed h-screen lg:h-25 lg:w-screen lg:items-start lg:flex-row lg:overflow-hidden">
            <Link to="/">
                <div className="h-25 w-25 bg-heliotrope  text-white ] rounded-tr-[20px] flex justify-center items-center">
                    Invoices
                </div>
            </Link>
            <div className="flex flex-col items-center justify-start border-b-7 lg:flex-row lg:items-center">
                {/*<img src="moon.png" className="w-6" alt="moon icon" />*/}
                <div className="mt-8">
                    <Switcher />
                </div>
                <hr className="border-fiord w-25 mt-9 lg:rotate-90 lg:mb-9" />
                <img
                    src="/profile.png"
                    className="w-10 mt-9 mb-9 lg:mr-14 bg-transparent rounded-[50%]"
                />
            </div>
        </nav>
    );
};

export default Nav;
