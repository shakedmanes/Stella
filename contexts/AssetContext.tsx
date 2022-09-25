import { createContext, PropsWithChildren } from "react";

import useAsset from "../hooks/useAsset";


export const AssetContext = createContext({});


export const AssetContextProvider = (props: PropsWithChildren) => {
    const [asset, setAsset, playAsset] = useAsset();
    
    return (
        <AssetContext.Provider value={[ asset, setAsset, playAsset ]}>
            {props.children}
        </AssetContext.Provider>
    );
};

