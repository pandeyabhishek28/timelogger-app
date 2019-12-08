import _ from 'underscore'
// in progress,
export default {
  getProjects: state => state.Projects,
  getProjectsById: (state, id) => {
    return _.findWhere(state.Projects, { id: id })
  },
  getSelectedViewDays: state =>state.DefaultVueCalViewDays,
  getSelectedStartDate: state =>state.SelectedStartDate,
  getDateTimeFormat: state =>state.DefaultDateTimeFormat,
}
