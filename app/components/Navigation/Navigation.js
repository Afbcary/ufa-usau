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
                    <h4>Authors</h4>
                    <p>Written by Austin Cary</p>
                    <p>Site by Austin and Lauren Cary</p>
                    <div className="image-container">
                        <Image
                            //  use /lauren_and_austin.jpg for local dev
                            // src={"/lauren_and_austin.jpg"}
                            src={"/ufa-usau/lauren_and_austin.jpg"}
                            alt={"Austin and Lauren Cary"}
                            className={'image'}
                            fill={true}
                            style={{borderRadius: '25px'}}
                        />
                    </div>
                </footer>
            </nav>
        </section>
    )
}
// 2200
//2400