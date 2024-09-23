import { Link } from "react-router-dom";
import PageNavigation from "../components/PageNavigation";


 export default function HomePage() {
    return (
       
            <main >
                <PageNavigation />

                <section>
                    <h1>We help you remember...
                    <br />
                    Remember helps you keep your fond experiences. </h1>
                    <h2>
                        With Remember, for every footstep you took to another country,restaurant or activity you did...we help you remember every happy moment.
                    </h2>
                    <Link>Start your journey</Link>
                </section>
            </main>
            
      
    )
}


