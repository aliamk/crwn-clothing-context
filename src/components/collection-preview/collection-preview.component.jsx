import React from 'react';
import { withRouter } from 'react-router-dom';

import CollectionItem from '../collection-item/collection-item.component'

// import './collection-preview.styles.scss'

import {
  CollectionPreviewContainer,
  TitleContainer,
  PreviewContainer
} from './collection-preview.styles';

const CollectionPreview = ({ title, items, history, match, routeName }) => (
  <CollectionPreviewContainer>
    <TitleContainer onClick={() => history.push(`${match.path}/${routeName}`)}>
      {title.toUpperCase()}
    </TitleContainer>
    <PreviewContainer>
      {items
        .filter((item, idx) => idx < 4)
        .map(item => (
          <CollectionItem key={item.id} item={item} />
        ))}
    </PreviewContainer>
  </CollectionPreviewContainer>
);

export default withRouter(CollectionPreview);

/* This is the content on the '/shop' page. The COLLECTION-PREVIEW
 is the container for the COLLECTION-ITEMS which consists of 5 rows 
 of data, each containing a Title, 4 images, a footer with captions and prices.

const CollectionPreview = ({ title, items }) => (
  <div className="collection-preview">
    <h1 className='title'>{ title.toUpperCase() }</h1>
    <div className="preview">
      {
        items
        .filter(( item, idx ) => idx < 4 ) // display only 4 items per collection
        .map( item => (
          <CollectionItem key={ item.id } item={ item }/>
        ))
      }
    </div>
  </div>
)
export default CollectionPreview
*/