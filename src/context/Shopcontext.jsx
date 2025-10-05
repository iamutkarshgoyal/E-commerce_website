import React, {createContext} from 'react'
import cleaned_zara_all_data from '../Data/cleaned_zara_all_data'

export const ShopContext = createContext(null);

const ShopContextProvider = (props) => {
  const contextValue = {cleaned_zara_all_data};
  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  )
} ;

export default ShopContextProvider;
