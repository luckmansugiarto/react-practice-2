import { createContext, useEffect, useState } from 'react';
import { getCategoriesAndDocuments } from '../utils/firebase/firebase.utils';
// import {
// } from '../utils/firebase/firebase.utils';

// the actual value we want to access
export const CategoriesContext = createContext({
	categories: {},
});

export const CategoriesProvider = ({ children }) => {
	const [categories, setCategories] = useState({});
	const value = { categories, setCategories };

	useEffect(() => {
		/*
			any async function that we wanna do inside a useEffect hook
			wrap it with an anonymous async function and call it manually
			as such
		*/
		const getCategoriesMap = async () => {
			const categoryMap = await getCategoriesAndDocuments();
			setCategories(categoryMap);
		};

		getCategoriesMap();
	}, []);

	return <CategoriesContext.Provider value={value}>
		{children}
	</CategoriesContext.Provider>;
}