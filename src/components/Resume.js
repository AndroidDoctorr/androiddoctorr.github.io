import React from 'react';
import Modal from 'react-modal';
import Sidebar from './Sidebar';
import Experience from './Experience';
import Education from './Education';
import Project from './Project';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { experiences, educations, projectList } from '../utils/variables';

Modal.setAppElement('#root')

export default function Resume(props) {
  const [modalIsOpen, setModalIsOpen] = React.useState(false);
  const [selectedExperience, setSelectedExperience] = React.useState("");
  const projects = projectList[selectedExperience.id];

  return (
    <div className="resume">
      <Sidebar />
      <div className="main">
        <div className="main-intro">
          {"Full-stack (primarily front-end) developer with 5 years professional experience."}
        </div>
        <h3 className="main-sectionHeader">
          {"Experience"}
        </h3>
        <div className="main-sectionContainer">
          {experiences.map(experience =>
            <Experience
              {...experience}
              showProjectModal={() => {
                setModalIsOpen(true);
                setSelectedExperience(experience);
              }}
            />
          )}
        </div>
        <h3 className="main-sectionHeader">
          {"Education"}
        </h3>
        <div className="main-sectionContainer">
          {educations.map(education =>
            <Education {...education} />
          )}
        </div>
      </div>
      <Modal
        isOpen={modalIsOpen}
        contentLabel="Projects"
        shouldCloseOnOverlayClick
        className="modal-container animated rubberBand"
        overlayClassName="modal-overlay"
        onRequestClose={() => {
          setModalIsOpen(false)
        }}
      >
          <h3 className="modal-title">{"Projects - " + selectedExperience.company}</h3>
          <button
            title="Close"
            onClick={() => setModalIsOpen(false)}
            className="button-clear modal-close"
            style={{ color: "#888" }}
          >
            <FontAwesomeIcon icon={faTimes} />
          </button>
          <div className="modal-projectContainer">
            {!!projects && projects.map(project =>
              <Project {...project} />
            )}
          </div>
      </Modal>
    </div>
  );
}
