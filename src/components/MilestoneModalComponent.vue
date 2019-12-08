<template>
  <div>
    <b-button @click="show=true" variant="info" class="list-item-button" block fluid pill>{{milestone.title}}</b-button>
   <b-modal
      v-model="show"
      title="Update Target Time"
      :header-bg-variant="headerBgVariant"
      :header-text-variant="headerTextVariant"
      :body-bg-variant="bodyBgVariant"
      :body-text-variant="bodyTextVariant"
      :footer-bg-variant="footerBgVariant"
      :footer-text-variant="footerTextVariant"
      @ok="handleSubmit()"
    >
      <b-container block fluid>
         <b-row class="mb-1">
          <b-col cols="5">Task Detail</b-col>
          <b-col>
             <label>: {{milestone.title}}</label>
          </b-col>
          </b-row>

        <b-row class="mb-2">
          <b-col cols="5">Start Date Time</b-col>
          <b-col>
             <label id="startDate">: {{ milestone.startDateTime | formatDate}} </label> 
          </b-col>
         </b-row>
         <b-row class="mb-2"> 
          <b-col cols="5">Target Date Time</b-col>
          <b-col>
           <b-button variant="outline-info"> 
            <datetime type="datetime"  v-model="endDateTime"  class="theme-custom" input-id="endDate" format="dd-M-yyyy HH:mm"
                     :phrases="{ok: 'Continue', cancel: 'Exit'}" :hour-step="2"  :minute-step="15" :week-start="7"
                      use12-hour  auto >
             </datetime>
           </b-button>
            </b-col>
         </b-row>
      </b-container>
    </b-modal>
  </div>
</template>

<script>
import Vue from 'vue';
import {Datetime} from 'vue-datetime';
import 'vue-datetime/dist/vue-datetime.css';
// There are some bug with this component, that's why I have to use this way.
Vue.component("datetime",Datetime);

import timelineApi from "../api/timelineApi";
import milestoneApi from "../api/milestoneApi";

export default {
    name: "MilestoneModalComponent",
    props:{
        milestone:{}
        },
    data() {
      return {
        endDateTime: this.milestone.endDateTime,
        show: false,
        datetimeFormat:this.$store.state.DefaultDateTimeFormat,
        headerBgVariant: 'info',
        headerTextVariant: 'dark',
        bodyBgVariant: 'light',
        bodyTextVariant: 'dark',
        footerBgVariant: 'informative',
        footerTextVariant: 'dark',
      }
    },
    methods:{
      handleSubmit(){
           this.$props.milestone.endDateTime=this.$data.endDateTime;
           milestoneApi.updateMilestone(this.$props.milestone.itemId, this.$props.milestone).then(response=>{
           console.log(response);
           }).catch(error=>{
           console.log(error);
           });
        },
      handleOk(bvModalEvt) {
        bvModalEvt.preventDefault();
        this.handleSubmit();
      }
     }
   }
</script>

<style>
.list-item-button {
min-height: 15px;
max-height: 30px;
word-wrap: none !important; 
white-space: nowrap;
text-align:left !important;
padding-top: 1px !important; 
}

.theme-custom .vdatetime-popup__header,
.theme-custom .vdatetime-calendar__month__day--selected > span > span,
.theme-custom .vdatetime-calendar__month__day--selected:hover > span > span {
  background: #33cccc;
}
.theme-custom .vdatetime-year-picker__item--selected,
.theme-custom .vdatetime-time-picker__item--selected,
.theme-custom .vdatetime-popup__actions__button {
  color:#33cccc;
}
</style>
