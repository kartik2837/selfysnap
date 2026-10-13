import { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '../Redux Toolkit/Store';

// ✅ react-redux v9+ का नया तरीका
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();