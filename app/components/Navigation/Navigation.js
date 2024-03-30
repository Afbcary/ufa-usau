import { useState } from "react";

export default function Navigation() {
    const [activeNav, setActiveNav] = useState('Motivation');
    const navItems = [
        "Motivation",
        "Analysis",
        "Methodology",
        "Acknowledgements",
    ];

    return (
        <section id="header">
            <nav id="nav">
                <ul>
                    {navItems.map((item) => (
                        <li key={item}>
                            <a href={`#${item.toLowerCase()}`} 
                                className={item == activeNav ? "active" : ""}
                                onClick={() => setActiveNav(item)}>
                                {item}
                            </a>
                        </li>
                    ))}
                </ul>
            </nav>
        </section>
    )
}