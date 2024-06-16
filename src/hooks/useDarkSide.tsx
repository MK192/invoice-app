import { useState, useEffect } from 'react';

export default function useDarkSide() {
    const prefersDark = window.matchMedia(
        '(prefers-color-scheme: dark)',
    ).matches;
    const prefersLight = window.matchMedia(
        '(prefers-color-scheme: light)',
    ).matches;

    const preferedTheme = prefersDark ? 'dark' : prefersLight ? 'light' : false;

    const [theme, setTheme] = useState(
        localStorage.theme ? localStorage.theme : preferedTheme,
    );
    const colorTheme = theme === 'dark' ? 'light' : 'dark';

    useEffect(() => {
        const root = window.document.documentElement;
        root.classList.remove(colorTheme);
        root.classList.add(theme);
        localStorage.setItem('theme', theme);
    }, [colorTheme, theme]);
    return [colorTheme, setTheme];
}
