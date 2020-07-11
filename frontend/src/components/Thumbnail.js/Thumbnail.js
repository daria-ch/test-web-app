import React from 'react';

const styles = {
    width: '64px',
    height: '64px',
    marginRight: '10px'
};

const Thumbnail = props => {
    let image = null;

    if (props.image) {
        image = 'http://localhost:8000/uploads/' + props.image;
    }

    return <img alt="product" src={image} style={styles} className="img-thumbnail"/>;
};

export default Thumbnail;