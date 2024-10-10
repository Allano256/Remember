import { createContext, useContext, useReducer } from "react";

const AuthContext = createContext();

const initialState = {
  user: null,
  isAuthenticated: false,
};

function reducer(state, action) {
  switch (action.type) {
    case "login":
      return { ...state, user: action.payload, isAuthenticated: true };
    case "logout":
      return { ...state, user: null, isAuthenticated: false };
    default:
      throw new Error("Unknown action");
  }
}


function AuthProvider({ children }) {
  const [{ user, isAuthenticated }, dispatch] = useReducer(
    reducer,
    initialState
  );

  // Login function to authenticate user with backend

  async function login(username, password) {
    try{
      const response= await fetch("http://127.0.0.1:8000/dj-rest-auth/login/", {
        method:'POST',
        headers: {
          'Content-Type':'application/json',
        },
        body: JSON.stringify({username, password}),

      });
       
      const data= await response.json();

      if (response.ok){
        console.log(data)
       const token=data.access_token;
       const refresh_token = data.refresh_token
       
        localStorage.setItem('token', token);
        localStorage.setItem('refresh_token', refresh_token);
       
        dispatch({type: 'login', payload:data});
      } else {
        const  errorData= await response.json();
        console.error('Error ', errorData.error);
      }
    } catch (error){
      console.error('Login failed', error)
    }
  }



  function logout() {
    localStorage.removeItem('token');
    dispatch({ type: "logout" });

   
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
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
