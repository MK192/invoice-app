import { DarkModeSwitch } from 'react-toggle-dark-mode';
import useDarkSide from '../../hooks/useDarkSide';

export default function Switcher() {
    const [colorTheme, setTheme] = useDarkSide();

    const toggleDarkMode = () => {
        setTheme(colorTheme);
    };

    return (
        <>
            <DarkModeSwitch
                style={{ marginBottom: '2rem' }}
                sunColor="#7E88C3"
                moonColor="#7E88C3"
                checked={colorTheme === 'dark' ? true : false}
                onChange={toggleDarkMode}
                size={25}
            />
        </>
    );
}
