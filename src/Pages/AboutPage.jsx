import PageNavigation from "../components/PageNavigation";
import styles from "./AboutPage.module.css"


export default  function AboutPage() {
    return (
       <main className={styles.about} >
        <PageNavigation />

        <section>
            <img src="cameraGuy.jpg" alt="A person standing on a mountain" />
            <div>
                <h2>Remember</h2>
                <p>Remember is an application that enables Alzheimer patients that have not completely lost their memory to keep track of their day today activies, in this case we help on enabling our patients note down and remember the places they have been to.</p>

                <p>In the same way the application enables them to pinpoint those places they have been to and write down notes about those places, what they did, who they were with and the date and tinme they were there. In so doing the patients can always look back and be able to memorise these activities to help them with their memory and record moments of their life.</p>
            </div>
        </section>
       </main>
    );
}


