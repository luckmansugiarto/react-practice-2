import { Fragment, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CategoriesContext } from '../../contexts/categories.context';
import CategoryPreview from '../../components/category-preview/category-preview.component';

export default () => {
	const { categories } = useContext(CategoriesContext);

	return (
		<>
		{
			Object.keys(categories).map(title => {
				return (
					<CategoryPreview key={title} title={title} products={categories[title]} />
				)
			})
		}
		</>
	);
}