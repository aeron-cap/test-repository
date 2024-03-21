import { useContext } from "react";
import { CompanyContext } from "./Company";
import { ProjectContext } from "./Projects";
import { ResourceContext } from "./Resource";
import { RequestContext } from "./Requests";

const useCompany = () => useContext(CompanyContext);
const useProject = () => useContext(ProjectContext);
const useResource = () => useContext(ResourceContext);
const useRequest = () => useContext(RequestContext);

export { useCompany, useProject, useResource, useRequest };
