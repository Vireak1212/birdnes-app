import React, { useState, useEffect, useContext, createContext } from "react";
import auth from "@react-native-firebase/auth";
import firestore from '@react-native-firebase/firestore';

var pack = require('../../package.json')
const authContext = createContext();

export function ProvideAuth({ children }) {
    const _auth = useProvideAuth();
    return <authContext.Provider value={_auth}>{children}</authContext.Provider>;
}

export const useAuth = () => {
    return useContext(authContext);
};

function useProvideAuth() {
    const [user, setUser] = useState(null);
    const [isUpdate, setIsUpdate] = useState(false);
    async function checkUser() {
        if (auth().currentUser !== null) {
            let client = await firestore().collection("clients").where("uid", "==", auth().currentUser.uid).get();
            if (client.docs.length > 0) {
                setUser(true)
            }
            else {
                if (auth().currentUser !== null)
                    await auth().signOut()
                setUser(false)
            }
        }
        else {
            setUser(false)
        }
    }
    async function checkVersion() {
        let record = await firestore().collection("settings").doc("1").get();
        if (record.exists) {
            if (record.data().app_version !== pack.version && record.data().force_update) {
                setIsUpdate(true)
            }
        }
    }
    useEffect(() => {
        checkVersion();
        checkUser();
    }, []);

    return {
        isUpdate,
        user
    };
}