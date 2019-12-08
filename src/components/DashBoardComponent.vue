<template >
<div v-if="!isloading">
  <vue-cal 
         :no-event-overlaps= true
         :selectedDate=selectedDate
         background: true
         :disable-views="['years', 'year','month']"
         editable-events
         :events="calendarEvents"
         @ready="logEvents($event)"
         @view-change="loadSchedule($event)"
         @event-duration-change="updateEventSchedule($event)">

 <div slot="event-renderer" slot-scope="{ event, view }">
       {{view}}
     <div class="vuecal__event-title" v-html="event.title" />
    <small class="vuecal__event-time">
      <strong>Event start:</strong> <br/>
      <span>{{ event.start }}</span><br/>
      <strong>Event end:</strong>
      <br/> 
      <span>{{ event.end }}</span>
    </small>
 </div>
</vue-cal>
</div>
<div v-else-if="isloading">
 <b-spinner variant="success" type="grow" label="Spinning"></b-spinner>
</div>
</template>

<script>
import Vue from "vue";
import VueCal from 'vue-cal';
import Vuetify from 'vuetify';
import 'vue-cal/dist/vuecal.css';
import 'vuetify/dist/vuetify.min.css';

Vue.use(Vuetify)

import store from '../store';
import timelineApi  from "../api/timelineApi";
import milestoneApi  from "../api/milestoneApi";
import moment from "moment";

export default {
  name: "DashBoardComponent",
  components: { VueCal },
  data(){
    return{
        isloading:false,
        milestoneEvents: [],
        selectedDate: moment(new Date(), moment.ISO_8601).format(this.$store.state.VueCalDateTimeFormat)
      }
   },
  computed:{
  calendarEvents(){
        var temp=[];
        console.log(this.milestoneEvents);
        for (var index in this.milestoneEvents) {
               var milestoneEvent= this.milestoneEvents[index];
               var event= {
                          id:milestoneEvent.itemId,
                          start: moment(milestoneEvent.startDateTime, moment.ISO_8601).format(this.$store.state.VueCalDateTimeFormat),
                          end: moment(milestoneEvent.endDateTime,moment.ISO_8601).format(this.$store.state.VueCalDateTimeFormat),
                          title: milestoneEvent.title,
                          class: 'sport',
                          content: '<font-awesome-icon icon="circle" size="3x"/>',
                }
                temp.push(event);
          }   
          return temp;
      }
  },
  created(){ 
           console.log('created');
           this.loadMilestoneSchedule(this.$store.state.DefaultVueCalViewDays, new Date());
   },
  methods:{
     logEvents(e){
           console.log(e);
        },
      loadSchedule(event){
          this.logEvents(event);
          if(event.view=="day"){
            this.$store.state.DefaultVueCalViewDays=1;
          }
           var startDate=event.startDate;
           this.selectedDate=startDate;
           this.loadMilestoneSchedule(this.$store.state.DefaultVueCalViewDays,startDate);
        },
       updateEventSchedule(event){
         if(event.id<=0) return;
         //milestone.endDateTime=event.end; to avoid observer
         var mappedMilestone=this.milestoneEvents.find(mevent=> mevent.itemId===event.id);
         var milestone=
         {
              itemId:mappedMilestone.itemId,
              projectId:mappedMilestone.projectId,
              milestoneId:mappedMilestone.milestoneId,
              title:mappedMilestone.title,
              startDateTime:mappedMilestone.startDateTime,
              endDateTime:event.end
         };
         
         milestoneApi.updateMilestone(event.id, milestone).then(response=>{
           console.log("Successfully updated " + event.id);
         }).catch(error=>{
           console.log(error);
         })
        },
      loadMilestoneSchedule(numberOfdays,startDate){
             this.isloading=true;
             console.log(this.isloading);
             timelineApi.getScheduleOfSelectedDays(numberOfdays, startDate)
            .then(response=>
            {
                console.log(response.data);
                this.$data.isloading = false;
                this.$data.milestoneEvents=response.data;
            }).catch(error=>console.log(error));
        }
      }
 };

</script>
<style>

.vuecal__menu.li {border-bottom-color: rgb(255, 255, 255);color: #fff;}
.vuecal__menu.li.active {background-color: rgba(255, 255, 255, 0.15);}
.vuecal__title-bar {background-color: #f5e8e4;}
.vuecal__cell.today, .vuecal__cell.current {background-color: rgba(255, 250, 240, 0.4);}
.vuecal:not(.vuecal--day-view) .vuecal__cell.selected {background-color: rgba(235, 255, 245, 0.4);}
.vuecal__cell.selected:before {border-color: rgba(66, 185, 131, 0.5);}
.vuecal__event {background-color: rgba(173, 216, 230, 0.5);}
</style>