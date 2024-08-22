import { AppDispatch } from "@/state/store";

let dispatchRef: any;

export const setDispatchRef = (dispatch: any) => {
    dispatchRef = dispatch;
};

export const getDispatchRef = () => {
    return dispatchRef;
};