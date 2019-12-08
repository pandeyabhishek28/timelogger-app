import apiBase from "./apiBase";

const resource = "/Milestone";
export default {
  name:'milestoneApi',
  getMilestone(milestoneId) {
    return apiBase.get(`${resource}/${milestoneId}`);
  },
  createMilestone(milestone) {
    return apiBase.post(`${resource}/PostAsync/`, milestone);
  },
  updateMilestone(id, milestone) {
      return apiBase.put(`${resource}/PutAsync?id=${id}`, milestone);
  }
};