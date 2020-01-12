import React from 'react';

export default function Project(project) {
  return (
    <div className="project">
      <h4 className="project-name">{project.name}</h4>
      <div className="project-imagesContainer">
        {project.images.map(image =>
          <div
            className="project-imageContainer"
            key={image.id}
          >
            <img
              src={image.source}
              alt={image.alt}
              className="project-image"
            />
          </div>
        )}
      </div>
    </div>
  );
}
