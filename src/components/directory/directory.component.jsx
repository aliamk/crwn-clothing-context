import React from 'react';
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import { selectDirectorySections } from '../../redux/directory/directory.selectors'

import MenuItem from '../menu-item/menu-item.component'

// import './directory.styles.scss'

import { DirectoryMenuContainer } from './directory.styles';

const Directory = ({ sections }) => (
  <DirectoryMenuContainer>
    {sections.map(({ id, ...otherSectionProps }) => (
      <MenuItem key={id} {...otherSectionProps} />
    ))}
  </DirectoryMenuContainer>
);

const mapStateToProps = createStructuredSelector({
  sections: selectDirectorySections
});

export default connect(mapStateToProps)(Directory);


/* On the homepage
Directory Menu: Contains 5 x Menu Items that navigate to the /shop section
Menu Item:  Contains background images and CONTENT (Title and Subtitle)


const Directory = ({ sections }) => (
  <div className="directory-menu">
    { sections.map(({ id, ...otherSectionProps} ) => (
        <MenuItem key={id} { ...otherSectionProps } />
      ))
    }
  </div>
)

const mapStateToProps = createStructuredSelector({
  sections: selectDirectorySections
})

export default connect(
  mapStateToProps,
)(Directory)

*/