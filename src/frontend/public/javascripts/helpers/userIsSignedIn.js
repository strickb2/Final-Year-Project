import { getCurrentUserStatus } from "../data/fetchData.js";

export async function userIsSignedIn() {
    var oUserPromise = await getCurrentUserStatus();
    
    if (oUserPromise.status === 200) {
        return true;
    } else {
        return false;
    }
};