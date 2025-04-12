import React from 'react';
import Projects from "@/components/projects";
import SecureTemplate from "@/layouts/secure-template";

const ProjectsMain = () => {
  return (
    <SecureTemplate title="Projects">
      <Projects />
    </SecureTemplate>
  );
};

export default ProjectsMain;