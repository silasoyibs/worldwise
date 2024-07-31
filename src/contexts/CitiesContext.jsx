import { createContext, useContext, useEffect, useReducer } from "react";
const CITY_URL = "http://localhost:9000";
// Create Cities Context
const CitiesContext = createContext();
// initialState (this is all the initial state from the beginning)
const initialState ={
  cities:[],
  isLoading:false,
  error:"",
  currentCity:{},
}

// reducer function (this is where all the action and the state are updated like your set in state)
function reducer(state,action){
   switch(action.type){
    case 'loading':
      return{
        ...state, 
        isLoading:true
      };

     case 'cities/loaded':
      return{
        ...state, 
        isLoading:false,
        cities:action.payload
      };

     case "city/loaded":
     return{
        ...state,
        isLoading: false,
        currentCity:action.payload
     };

     case 'cities/created':
     return {
        ...state,
        isLoading: false,
        cities:[...state.cities, action.payload],
        currentCity:action.payload
     };

     case 'cities/deleted':
      return {
        ...state,
        isLoading: false,
        cities:state.cities.filter(city=> city.id !== action.payload),
        currentCity: {},
     };

      case 'rejected':
        return{
          ...state,
          isLoading:false,
          error:action.payload
        };

      default:
        throw new Error("unknow action type");
   }
}
// useReducer 

// Create Cities Provider
function CitiesProvider({children}) {
  const[{cities,isLoading,currentCity},dispatch]=useReducer(reducer,initialState);
    useEffect(function () {
      async function fetchCities() {
        dispatch({type:"loading"})
        try {
          const res = await fetch(`${CITY_URL}/cities`);
          const data = await res.json();
          dispatch({type:"cities/loaded", payload: data});
        } catch {
           dispatch({
            type:"rejected",
            payload:"there was an error loading data"
           })
        } 
      }
      fetchCities();
    }, []);


    // fetch city data
 async function fetchCity(id){
    dispatch({type:"loading"})
      try{
        const res = await fetch(`${CITY_URL}/cities/${id}`);
        const data = await res.json();
        dispatch({type:"city/loaded", payload:data})
      }catch{
        dispatch({
          type:"rejected",
          payload:"there was an error loading data"
         })
      }
  }

async function createCity(newCity){
  dispatch({type:"loading"})
    try{
      const res = await fetch(`${CITY_URL}/cities`,{
        method:'POST',
        body:JSON.stringify(newCity),
        headers:{
          "content-Type": "application/json",
        },
      });
      const data = await res.json();
      dispatch({type:"cities/created", payload: data});
    }catch{
      alert("new city was not added");
    }
}
async function deleteCity(id) {
  dispatch({type:"loading"})
  try{
     await fetch(`${CITY_URL}/cities/${id}`,{
      method:'DELETE',
    }
    );
    dispatch({type:"cities/deleted", payload: id});
  }catch{
    dispatch({
      type:"rejected",
      payload:"there was an error loading data"
     })
  }
 
}


  function getFlag(flag) {
        if (flag === undefined) return;
        let countryCode = Array.from(flag, (codeUnit) => codeUnit.codePointAt())
          .map((char) => String.fromCharCode(char - 127397).toLowerCase())
          .join("");
      
        return (
          <img src={`https://flagcdn.com/24x18/${countryCode}.png`} alt="flag" />
        );
      }
return(
    <CitiesContext.Provider value={{
        cities,
        isLoading,
        getFlag,
        fetchCity,
        currentCity,
        createCity,
        deleteCity
    }}>
        {children}
    </CitiesContext.Provider>
)
}

// Consume City Context
function useCity(){
    const context = useContext(CitiesContext);
    if(context === undefined) throw Error ('city context was used outside provider');
    return context
}

export {CitiesProvider, useCity}
