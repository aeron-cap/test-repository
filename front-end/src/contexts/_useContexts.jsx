import { useContext } from "react";
import { CompanyContext } from "./Company";
import { ProjectContext } from "./Projects";

const useCompany = () => useContext(CompanyContext);
const useProject = () => useContext(ProjectContext);

export { useProject, useCompany };
