import { createContext, useContext, useReducer } from "react";


const API_BASE_URL = 'https://drf-api-remember-f742a049740b.herokuapp.com/api/v1'
const AuthContext = createContext();


const initialState = {
  user: null,
  isAuthenticated: false,
  error:null,
};

function reducer(state, action) {
  switch (action.type) {
    case "login":
      return { ...state, user: action.payload, isAuthenticated: true };
    case "logout":
      return { ...state, user: null, isAuthenticated: false };
    case "setError":
      return { ...state, error: action.payload };
    default:
      throw new Error("Unknown action");
  }
}


function AuthProvider({ children }) {
  const [{ user, isAuthenticated, error }, dispatch] = useReducer(
    reducer,
    initialState
  );

  // Login function to authenticate user with backend

  async function login(email, password) {
    try{
      const response= await fetch(`${API_BASE_URL}/auth/login/`, {
        method:'POST',
        headers: {
          'Content-Type':'application/json',
        },
        body: JSON.stringify({email, password}),

      });
       
      const data= await response.json();

      if (response.ok){
        
       const token=data.tokens.access;
       const refresh_token = data.tokens.refresh
       const user = data.user;
       
        localStorage.setItem('token', token);
        localStorage.setItem('refresh_token', refresh_token);
       
        dispatch({type: 'login', payload:user});
      } else {
        const errorMessage = data.error || "Invalid login credentials";
        dispatch({ type: "setError", payload: errorMessage }); // Set error message
        
      }
    } catch (error){
      console.error('Login failed', error)
      dispatch({ type: "setError", payload: "Login failed, check the email and password." }); // Handle unexpected errors
    }
  }

  function logout() {
    localStorage.removeItem('token');
    dispatch({ type: "logout" });

  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout, error }}>
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined)
    throw new Error("AuthContext was used outside AuthProvider");
  return context;
}

export { AuthProvider, useAuth };
