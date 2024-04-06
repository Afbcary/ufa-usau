export default function Methodology() {
    return (
        <section id="methodology">
            <div className="container">
                <h2>Methodology</h2>
                <p>This project had four major components: data gathering, data cleaning, deploying as a static website, and analysis.</p>
                <div className="features">
                    <article>
                        <div>
                            <h4>Data Gathering</h4>
                            <p>UFA</p>
                            <p>USAU - ulti-verse.com SQLLite database snapshot</p>
                            <p>USAU - frisbee-rankings.com</p>
                            <p>Club Team Roster Determination - Participated in series (sectionals, regionals, nationals, Club Champs)</p>
                            <p>{`We didn't worry about efficiency at all due to the small size of the total data used, so we used Python.`}</p>
                            <p>Scraping with Beautiful Soup</p>
                        </div>
                    </article>
                    <article>
                        <div>
                            <h4>Data Cleaning</h4>
                            <p>Pandas for SQL-like functionality</p>
                            <p>Nickname matching</p>
                            <p>Teams with the same name.  Mischief, Hazard, and Scoop</p>
                            <p>Players with the same name.</p>
                        </div>
                    </article>
                    <article>
                        <div>
                            <h4>Deploying</h4>
                            <p>Static site with Next.js (React)</p>
                            <p>Hosted with Github pages</p>
                            <p>Automated build and deploy with <a href="https://github.com/gregrickaby/nextjs-github-pages">nextjs.github.pages</a></p>
                            <p>The code is open source at <a href="https://github.com/Afbcary/ufa-usau">github.com/Afbcary/ufa-usau</a></p>
                            <p></p>
                        </div>
                    </article>
                    <article>
                        <div>
                            <h4>Analysis</h4>
                            <p>Chart.js for reactive charts</p>
                        </div>
                    </article>
                </div>
            </div>
        </section>
    )
}