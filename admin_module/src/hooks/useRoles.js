// src/hooks/useRoles.js

import {
  useCallback,
  useEffect,
  useState,
} from "react";

import {
  getRoles,
  addRole,
  updateRole,
  deleteRole,
} from "../services/roleService";

export default function useRoles() {
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] =
    useState(true);
  const [refreshing, setRefreshing] =
    useState(false);

  const loadRoles = useCallback(
    async (refresh = false) => {
      try {
        refresh
          ? setRefreshing(true)
          : setLoading(true);

        const data = await getRoles();
        setRoles(data);
      } finally {
        setLoading(false);
        setRefreshing(false);
      }
    },
    []
  );

  useEffect(() => {
    loadRoles();
  }, [loadRoles]);

  async function createRole(name) {
    await addRole(name);
    await loadRoles();
  }

  async function editRole(id, name) {
    await updateRole(id, name);
    await loadRoles();
  }

  async function removeRole(id) {
    await deleteRole(id);
    await loadRoles();
  }

  return {
    roles,
    loading,
    refreshing,
    loadRoles,
    createRole,
    editRole,
    removeRole,
  };
}