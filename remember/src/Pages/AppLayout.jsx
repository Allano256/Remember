import AppNavigation from "../components/AppNavigation"
import PageNavigation from "../components/PageNavigation"

function AppLayout() {
    return (
        <div>
            <PageNavigation />
            <AppNavigation />
            <h1>This is the page layout!</h1>
            
        </div>
    )
}

export default AppLayout
