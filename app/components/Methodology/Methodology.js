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
                            <ul>
                                <li>UFA - <a href="https://watchufa.com/league/news/2024-ufa-team-rosters-announced-season">roster announcement</a> and <a href="https://watchufa.com/league/power-rankings/2024-ufa-way-too-early-preseason">preseason power rankings</a></li>
                                <li>USAU - ulti-verse.com SQLLite database snapshot</li>
                                <li>USAU - frisbee-rankings.com</li>
                                <li>Club Team Roster Determination - We used the last team a player participated with, after August 1st, in the 2023 season.</li>
                                <li>Scraping with Beautiful Soup</li>
                                <li>{`We didn't worry about efficiency at all due to the small size of the total data used, so we used Python and *all* the for loops.`}</li>
                            </ul>
                        </div>
                    </article>
                    <article>
                        <div>
                            <ul>
                                <h4>Data Cleaning</h4>
                                <li>Pandas</li>
                                <li>Nickname matching - Some players use different names in UFA vs club. We joined on a dataset of common nicknames to include everyone we could find.</li>
                                <li>Teams with the same name.  Mischief, Hazard, and Scoop</li>
                                <li>Players with the same name.</li>
                            </ul>
                        </div>
                    </article>
                    <article>
                        <div>
                            <h4>Analysis</h4>
                            <ul>
                                <li><a href="https://www.chartjs.org/">Chart.js</a> for reactive charts</li>
                            </ul>
                        </div>
                    </article>
                    <article>
                        <div>
                            <h4>Deploying</h4>
                            <ul>
                                <li>Static site with Next.js (React)</li>
                                <li>Hosted with Github pages</li>
                                <li>Automated build and deploy with <a href="https://github.com/gregrickaby/nextjs-github-pages">nextjs.github.pages</a></li>
                                <li>The code is ✨open source✨ at <a href="https://github.com/Afbcary/ufa-usau">github.com/Afbcary/ufa-usau</a></li>
                            </ul>
                        </div>
                    </article>
                </div>
            </div>
        </section>
    )
}