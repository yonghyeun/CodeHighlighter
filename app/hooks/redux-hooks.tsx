import { useSelector, useDispatch } from 'react-redux';

import type { RootState, AppDispatcher } from '@/store';

export const useAppSelector = useSelector.withTypes<RootState>();
export const useAppDispatch = useDispatch.withTypes<AppDispatcher>();
