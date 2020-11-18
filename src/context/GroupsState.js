import React, { createContext, useReducer } from "react";
import AppReducer from "./AppReducer";

const initialState = {
  groups: [],
};

export const GroupsContext = createContext(initialState);

export const GroupsProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  function deleteGroup(groupId) {
    dispatch({
      type: "DELETE_GROUP",
      payload: groupId,
    });
  }

  function createGroup(group) {
    dispatch({
      type: "CREATE_GROUP",
      payload: group,
    });
  }

  function updateGroup(group) {
    dispatch({
      type: "UPDATE_GROUP",
      payload: group,
    });
  }

  return (
    <GroupsContext.Provider
      value={{
        groups: state.groups,
        deleteGroup,
        createGroup,
        updateGroup,
      }}
    >
      {children}
    </GroupsContext.Provider>
  );
};
