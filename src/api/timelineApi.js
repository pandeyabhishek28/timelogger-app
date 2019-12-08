import apiBase from "./apiBase";
import moment from "moment";

const resource = "/TimeLine";

export default {
  name:'timelineApi',
  getScheduleOfSelectedDays(days, startDate) {
       var date = moment(startDate).format('L');
        return apiBase.get(`${resource}/GetScheduleAsync?numberOfDay=${days}&startDate=${date}`);
   }
 };