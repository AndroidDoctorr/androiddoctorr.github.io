import React from 'react';

export default function Project(project) {
  return (
    <div className="project">
      <h4 className="project-name">{project.name}</h4>
      <div className="project-imagesContainer">
        {project.images.map(image =>
          <a
            className="project-imageContainer"
            href="javascript:void(0);"
            onClick={e => {
              e.target.blur();
              return false;
            }}
          >
            <img
              src={image.source}
              alt={image.alt}
              className="project-image"
            />
          </a>
        )}
      </div>
    </div>
  );
}
