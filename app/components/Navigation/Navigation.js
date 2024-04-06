import { useState } from "react";
import Image from "next/image";

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
                <footer>
                    <h4>Creators</h4>
                    <p>Austin and Lauren Cary</p>
                    <Image 
                        src={"/ufa-usau/lauren_and_austin.jpg"}
                        alt={"Austin and Lauren Cary"}
                        className={'image'}
                        priority
                    />
                </footer>
            </nav>
        </section>
    )
}