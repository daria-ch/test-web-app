import React from 'react';
import {Media, NavLink} from "reactstrap";
import {NavLink as RouterNavLink} from 'react-router-dom';
import Thumbnail from "../Thumbnail.js/Thumbnail";
import './ArticleItem.css';


const ArticleItem = ({title, description, image, category, user, id}) => {


    return (
        <Media className='article-item'>
            <Media left href="#">
                <Thumbnail image={image}/>
            </Media>
            <Media body>
                <Media heading className='article-header'>
                    {title}
                </Media>
                <NavLink tag={RouterNavLink} to={'/articles/' + id} active className='article-link'>Read
                    more...</NavLink>
            </Media>
        </Media>
    );
};

export default ArticleItem;