import { Link } from "react-router-dom";
import PageNavigation from "../components/PageNavigation";
import styles from "./Homepage.module.css";


 export default function HomePage() {
    return (
       
            <main className={styles.homepage} >
                <PageNavigation />

                <section>
                    <h1>We help you remember...
                    <br />
                    Remember helps you keep your fond experiences. </h1>
                    <h2>
                        With Remember, for every footstep you took to another country, restaurant or activity you did...we help you remember every happy moment.
                    </h2>
                    <Link to="/app" className="cta">Start your journey</Link>
                </section>
            </main>
            
      
    )
}


