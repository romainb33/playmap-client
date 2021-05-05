import React from 'react'
import '../styles/CategoryTags.css'

const CategoryTags = (props) => {
    const {category, id} = props
    return (
        <label class="cat-tags">
            <input type="radio" name="category" id={id} />
            <span class="tags">{category}</span>
        </label>
    )
}

export default CategoryTags
