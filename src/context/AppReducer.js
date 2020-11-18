export default (state, action) => {
    switch(action.type) {
      case 'DELETE_GROUP':
        return {
          ...state,
          groups: state.groups.filter(group => group.id !== action.payload)
        }
      case 'CREATE_GROUP':
          alert("CREATE")
        return {
          ...state,
          groups: [action.payload, ...state.groups]
        }
      case 'UPDATE_GROUP':
        //update
        return {
          ...state,
          groups: [action.payload, ...state.groups]
        }
      default:
        return state;
    }
  }