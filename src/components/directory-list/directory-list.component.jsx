import './directory-list.styles.scss';
import DirectoryItem from '../directory-item/directory-item.component';

export default ({ categories }) => {
	return (
		<div className='directory-list-container'>
      {categories.map((category) => (
        <DirectoryItem key={category.id} {...category} />
      ))}
    </div>
	)
};