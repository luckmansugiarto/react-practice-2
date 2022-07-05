import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { CategoriesContext } from '../../contexts/categories.context';
import ProductCard from '../../components/product-card/product-card.component';

import './category.styles.scss';

export default () => {
	const { category } = useParams();
	const { categories } = useContext(CategoriesContext);
	const [products, setProducts] = useState(categories[category]);

	useEffect(() => {
		setProducts(categories[category]);
	}, [category, categories]);

	return (
		<div className='category-container'>
			<h2>
				<span className='title'>
					{category.toUpperCase()}
				</span>
			</h2>
			<div className='products'>
			{
				products && products.map(product =>
					<ProductCard key={product.id} product={product} />
				)
			}
			</div>
		</div>
	)
}