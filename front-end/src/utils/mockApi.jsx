import initialResources from "./resources.json";
import initialProjects from "./projects.json";
import initialCompanies from "./companies.json";

let resources = [...initialResources];
let projects = [...initialProjects];
let companies = [...initialCompanies];

const findById = (array, id) => array.find((item) => item.id === id);

//resources All resources are array = []
//projects
//companies

const mockApi = (method, endpoint, data = null) => {
  let requestText = `Request Made: %c${method} - ${endpoint} ${
    data !== null ? `${JSON.stringify(data)}` : ``
  }`;
  let requestTheme = `color: green`;
  if (method.toUpperCase() === "POST") {
    requestTheme = `color: lightblue`;
  }
  if (method.toUpperCase() === "PUT") {
    requestTheme = `color: orange`;
  }
  if (method.toUpperCase() === "DELETE") {
    requestTheme = `color: red`;
  }
  console.log(requestText, requestTheme);

  const result = { status: false, data: null };

  switch (method.toUpperCase()) {
    case "GET": {
      const getEndpoint = endpoint.split("/");
      const resourceType = getEndpoint[1];

      switch (resourceType) {
        case "resources": {
          const validData = resources.filter((item) => !item.isDeleted);
          if (getEndpoint.length === 3) {
            const resourceId = parseInt(getEndpoint[2], 10);
            const resource = findById(validData, resourceId);

            if (resource) {
              result.status = true;
              result.data = resource;
              return result;
            } else {
              result.status = false;
              return result;
            }
          } else {
            result.status = true;
            result.data = validData;
            return result;
          }
        }

        case "projects": {
          const validData = projects.filter((item) => !item.isDeleted);
          if (getEndpoint.length === 3) {
            const projectId = parseInt(getEndpoint[2], 10);
            const project = findById(validData, projectId);
            if (project) {
              result.status = true;
              result.data = project;
              return result;
            } else {
              result.status = false;
              return result;
            }
          } else {
            result.status = true;
            result.data = validData;
            return result;
          }
        }
        case "companies": {
          const validData = companies.filter((item) => !item.isDeleted);
          if (getEndpoint.length === 3) {
            const developerId = parseInt(getEndpoint[2], 10);
            const developer = findById(validData, developerId);
            if (developer) {
              result.status = true;
              result.data = developer;
              return result;
            } else {
              result.status = false;
              return result;
            }
          } else {
            result.status = true;
            result.data = validData;
            return result;
          }
        }
        default:
          return result;
      }
    }
    case "POST": {
      switch (endpoint) {
        case "/resources": {
          const newResource = { ...data, id: resources.length + 1 };
          resources.push(newResource);
          result.status = true;
          result.data = newResource;
          return result;
        }
        case "/projects": {
          const newProject = { ...data, id: projects.length + 1 };
          projects.push(newProject);
          result.status = true;
          result.data = newProject;
          return result;
        }
        case "/companies": {
          const newDeveloper = { ...data, id: companies.length + 1 };
          companies.push(newDeveloper);
          result.status = true;
          result.data = newDeveloper;
          return result;
        }
        default:
          return result;
      }
    }
    case "PUT": {
      const putEndpoint = endpoint.split("/");
      const resourceType = putEndpoint[1];

      switch (resourceType) {
        case "resources": {
          const validData = resources.filter((item) => !item.isDeleted);
          const resourceId = parseInt(putEndpoint[2], 10);
          const resourceToUpdate = findById(validData, resourceId);
          if (resourceToUpdate) {
            Object.assign(resourceToUpdate, data);
            result.status = true;
            result.data = resourceToUpdate;
            return result;
          }
          return result;
        }
        case "projects": {
          const validData = projects.filter((item) => !item.isDeleted);
          const projectId = parseInt(putEndpoint[2], 10);
          const projectToUpdate = findById(validData, projectId);
          if (projectToUpdate) {
            Object.assign(projectToUpdate, data);
            result.status = true;
            result.data = projectToUpdate;
            return result;
          }
          return result;
        }

        case "companies": {
          const validData = companies.filter((item) => !item.isDeleted);
          const developerId = parseInt(putEndpoint[2], 10);
          const developerToUpdate = findById(validData, developerId);
          if (developerToUpdate) {
            Object.assign(developerToUpdate, data);
            result.status = true;
            result.data = developerToUpdate;
            return result;
          }
          return result;
        }

        default:
          return result;
      }
    }
    case "DELETE": {
      const deleteEndpoint = endpoint.split("/");
      const resourceType = deleteEndpoint[1];

      switch (resourceType) {
        case "resources": {
          const resourceId = parseInt(deleteEndpoint[2], 10);
          const index = resources.findIndex((item) => item.id === resourceId);
          if (index !== -1) {
            resources[index].isDeleted = true;
            const deletedResource = resources[index];
            result.status = true;
            result.data = deletedResource;
            return result;
          }
          return result;
        }

        case "projects": {
          const projectId = parseInt(deleteEndpoint[2], 10);
          const index = projects.findIndex((item) => item.id === projectId);
          if (index !== -1) {
            projects[index].isDeleted = true;
            const deletedProject = projects[index];
            result.status = true;
            result.data = deletedProject;
            return result;
          }
          return result;
        }

        case "companies": {
          const developerId = parseInt(deleteEndpoint[2], 10);
          const index = companies.findIndex((item) => item.id === developerId);
          if (index !== -1) {
            companies[index].isDeleted = true;
            const deletedDeveloper = companies[index];
            result.status = true;
            result.data = deletedDeveloper;
            return result;
          }
          return result;
        }

        default:
          return result;
      }
    }
    default:
      return result;
  }
};

export default mockApi;

// console.log("Test mockApi - Get all resources", mockApi("GET", "/resources"));
// console.log(
//   "Test mockApi - Get resource with ID 1",
//   mockApi("GET", "/resources/1")
// );
// console.log(
//   "Test mockApi - Add a new resource",
//   mockApi("POST", "/resources", { name: "New Resource" })
// );
// console.log(
//   "Test mockApi - Update resource with ID 1",
//   mockApi("PUT", "/resources/1", { name: "Updated Resource" })
// );
