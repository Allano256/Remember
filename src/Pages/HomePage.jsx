import { Link } from "react-router-dom";
import PageNavigation from "../components/PageNavigation";
import styles from "./Homepage.module.css";


 export default function Home() {
    return (
       
            <main className={styles.home} >
             <div className="unsupported-message">
             <p> Un-Supported Device.  <br/> <br/>
             This application is designed for iPads or larger screens. Please switch to a device with a larger screen to access the app.</p>
              </div>
                
              <div className="app-content" >
                  <PageNavigation />
                   <section>
                    <h1>We help you remember...
                    <br />
                    Remember helps you keep your fond memories! </h1>
                    <h2>
                        With Remember, for every footstep you took to another country, restaurant or activity you did...we help you remember every happy moment.
                    </h2>
                    <Link to="/login" className="cta">Start your journey</Link>
                </section>
             </div>      
          </main>
            
      
    )
}


