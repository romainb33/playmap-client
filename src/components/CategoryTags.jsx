import React from 'react'
import '../styles/CategoryTags.css'

const CategoryTags = (props) => {
    const {category, id} = props
    return (
        <label className="cat-tags">
            <input type="radio" name="category" id={id} />
            <span className="tags">{category}</span>
        </label>
    )
}

export default CategoryTags
