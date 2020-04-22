import React, {useState, useEffect, createContext} from 'react'
import firebase from "../config/fbConfig";

export const CoinContext = createContext()

export const CoinProvider = (props) => {

    useEffect(() => {
        authListener();
      });
    
    //   const initials = user && user.email[0].toUpperCase();
      const [user, setUser] = useState( null )
    
    
      const authListener = () => {
        firebase.auth().onAuthStateChanged((user) => {
          if (user) {
            setUser( user );
          } else {
            setUser( null );
          }
        });
      };
    
      const storeUser = (user) => {
        setUser( user )
      }

    const gainers = (arr) => {
        return arr.sort((a,b) => b.percent_change_24h - a.percent_change_24h)
                .slice(0,10)
    }

    const losers = (arr) => {
        return arr.sort((a,b) => a.percent_change_24h - b.percent_change_24h)
                .slice(0,10)
    }
    

    return (
        <CoinContext.Provider value={{gainers: gainers(coins), losers: losers(coins)}}>
            {props.children}
        </CoinContext.Provider>
    )
}