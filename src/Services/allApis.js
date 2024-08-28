import commonApi from "./commonApi";
import base_url from "./base_url";

export const registerApi = (data) => {
  return commonApi("POST", `${base_url}/reg`, data, "");
};
export const loginApi = (data) => {
  return commonApi("POST", `${base_url}/log`, data);
};
export const addProjectApi = async (data, header) => {
  return await commonApi("POST", `${base_url}/addProject`, data, header);
};
export const getUserProjects = async (header) => {
  return await commonApi("GET", `${base_url}/userprojects`, "", header);
};
export const getAllProjects = async () => {
  return await commonApi("GET", `${base_url}/allProjects`, "", "");
};

export const deleteProject = async (id, header) => {
  return await commonApi(
    "DELETE",
    `${base_url}/delete-project/${id}`,
    {},
    header
  );
};
export const updateProjectAPI = async(id, data, header ) => {
return await commonApi("PUT", `${base_url}/updateproject/${id}`,data,header)
}
export const updateProfileApi = async(data, header) => {
  return await commonApi("PUT", `${base_url}/profile`, data , header)
}
