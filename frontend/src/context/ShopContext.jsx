import React, {  useState } from "react";
import { createContext } from "react";
import { products } from "../assets/frontend_assets/assets";
import { toast } from "react-toastify";
export const ShopContext=createContext();
import {useNavigate} from "react-router-dom";
const ShopContextProvider=(props)=>{
    const currency='₹';
    const delivery_fee=10;
    const [search,setSearch]=useState('');
    const [showSearch,setShowSearch]=useState(false );
    const [cartItem,setCartItem]=useState({});
    const navigate=useNavigate();

    const addToCart=async(itemId,size)=>{
        if(!size){
            toast.error("Select Product Size");
            return;
        }
        let cartData=structuredClone(cartItem);
        if(cartData[itemId]){
            if(cartData[itemId][size]){
                cartData[itemId][size] += 1;

            }
            else{
                cartData[itemId][size]=1;
            }
        }
        else{
            cartData[itemId]={};
            cartData[itemId][size]=1
        }
        setCartItem(cartData)

    }
    const getCartCount=()=>{
        let totalCount=0;
        for(const items in cartItem){
            for(const item in cartItem[items]){
                try {
                    if(cartItem[items][item]>0){
                        totalCount+=cartItem[items][item]
                    }
                } catch{
                    console("something is wrong!!")
                }
            }
        }
        return totalCount;
    }

    const updateQuantity=async(itemId,size,quantity)=>{
        let cartData=structuredClone(cartItem);
        cartData[itemId][size]=quantity;
        setCartItem(cartData);
    }
    const getCartAmount=()=>{
        let totalAmount=0;
        for(const items in cartItem){
            let itemInfo=products.find((product)=>product._id===items)
            for (const item in cartItem[items]){
                try{
                    if(cartItem[items][item]>0){
                        totalAmount+=itemInfo.price*cartItem[items][item];
                    }
                }
                catch(error){
                   console.log(error)
                }
            }
        }
        return totalAmount;
    }
    const value={
        products,
        currency,
        delivery_fee,
        search,setSearch,
        showSearch,setShowSearch,
        cartItem,addToCart,
        getCartCount,
        updateQuantity,
        getCartAmount,
        navigate
    }
    return (
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider;
