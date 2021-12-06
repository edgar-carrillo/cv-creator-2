import React, { Component } from 'react';
import { ExperienceSection } from './Sections';
import { AddBtn } from '../Buttons/AddRemoveBtn';
import uniqid from 'uniqid';

class Experience extends Component {
  constructor(props) {
    super(props);

    const key1 = uniqid();
    const key2 = uniqid();
    this.state = {
      experienceSections: [
        {
          key: key1,
          sectionKey: key1,
          isMainSection: true,
        },
      ],
      section: {
        key: key2,
        sectionKey: key2,
        isMainSection: true,
      },
    };

    this.createSection = this.createSection.bind(this);
    this.removeSection = this.removeSection.bind(this);
  }

  createSection = () => {
    this.setState({
      experienceSections: this.state.experienceSections
        .concat(this.state.section)
        .map((section, index, array) => {
          if (index === array.length - 1) {
            section.isMainSection = true;
            return section;
          } else {
            section.isMainSection = false;
            return section;
          }
        }),
    });

    const newKey = uniqid();
    this.setState({
      section: {
        key: newKey,
        sectionKey: newKey,
        isMainSection: true,
      },
    });
  };

  removeSection = (sectionId) => {
    this.setState({
      experienceSections: this.state.experienceSections
        .filter((section) => section.sectionKey !== sectionId)
        .map((section, index, array) => {
          if (index === array.length - 1) {
            section.isMainSection = true;
            return section;
          } else {
            section.isMainSection = false;
            return section;
          }
        }),
    });
  };

  render() {
    const { experienceSections } = this.state;
    if (experienceSections.length === 0) {
      return (
        <div>
          <AddBtn sectionKey={uniqid()} createSection={this.createSection} />
        </div>
      );
    } else {
      return (
        <div>
          {experienceSections.map((section) => {
            return (
              <ExperienceSection
                key={section.key}
                sectionKey={section.sectionKey}
                isMainSection={section.isMainSection}
                createSection={this.createSection}
                removeSection={this.removeSection}
              />
            );
          })}
        </div>
      );
    }
  }
}

export default Experience;
