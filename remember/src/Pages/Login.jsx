import PageNavigation from "../components/PageNavigation";

 export default function  Login() {
    return (
        <main>
            <PageNavigation />
            <form action="">
                <div>
                    <label htmlFor="email">Email </label>
                    <input type="email" id="email" />
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password"  />
                </div>

                <div>
                    <button>Login</button>
                </div>
            </form>
        </main>
    );
}


