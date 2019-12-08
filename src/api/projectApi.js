import apiBase from "./apiBase";

const resource = "/Project";

export default {
  name:'projectApi',
  getAll() {
     return apiBase.get(`${resource}/GetAllWithMilestonesAsync`);
  },
 getProject(projectId) {
    return apiBase.get(`${resource}/GetAsync?${projectId}`);
  }
};