import { useDispatch, useSelector } from "react-redux";
import type { AppStore } from "./model";
type RootState = ReturnType<AppStore["getState"]>;
type AppDispatcher = AppStore["dispatch"];

export const useAppSelector = useSelector.withTypes<RootState>();
export const useAppDispatch = useDispatch.withTypes<AppDispatcher>();
