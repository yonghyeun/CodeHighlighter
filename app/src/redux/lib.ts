import { useDispatch, useSelector } from "react-redux";
import type { AppStore } from "./model";

export const useAppSelector =
  useSelector.withTypes<ReturnType<AppStore["getState"]>>();
export const useAppDispatch = useDispatch.withTypes<AppStore["dispatch"]>();
