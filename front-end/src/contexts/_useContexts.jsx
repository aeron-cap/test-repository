import { useContext } from "react";
import { CompanyContext } from "./Company";
import { ProjectContext } from "./Projects";
import { ResourceContext } from "./Resource";

const useCompany = () => useContext(CompanyContext);
const useProject = () => useContext(ProjectContext);
const useResource = () => useContext(ResourceContext);

export { useCompany, useProject, useResource };
