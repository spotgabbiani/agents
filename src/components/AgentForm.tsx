import React, { useEffect } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { Agent } from "../types/agent";
import useAgentMutation from "../hooks/useAgentMutation";
import "../css/form.css";

interface AgentFormProps {
  agent?: Agent | null; // Optional agent for editing
  isDialogOpen: boolean;
  reloadAgents: () => void;
  onClose: () => void; // Callback to close the form after successful submission
}

const AgentForm: React.FC<AgentFormProps> = ({
  agent,
  isDialogOpen,
  reloadAgents,
  onClose,
}) => {
  const { mutate, isLoading, error } = useAgentMutation();

  const initialValues: Agent = {
    id: agent?.id || 0,
    name: agent?.name || "",
    email: agent?.email || "",
    status: agent?.status || "Active",
    lastSeen: agent?.lastSeen || "",
    department: agent?.department || "",
    location: agent?.location || "",
  };

  useEffect(() => {
    const newAgent: Agent = agent
      ? { ...agent }
      : {
          name: "",
          email: "",
          status: "Active",
          lastSeen: "",
          department: "",
          location: "",
        };
    formik.setValues({ ...newAgent });
  }, [agent]);

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    status: Yup.string()
      .oneOf(["Active", "Inactive"])
      .required("Status is required"),
  });

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      try {
        await mutate(values);
        reloadAgents();
        onClose(); // Close the form after successful submission
      } catch (err: any) {
        // Handle submission errors (e.g., display an error message to the user)
        console.error(err);
        // You might want to display the error to the user here
      }
    },
  });

  return (
    <Dialog fullWidth open={isDialogOpen} onClose={onClose}>
      <DialogTitle>
        {agent?.id ? `Updating Agent ${agent.name}` : "Create Agent"}
      </DialogTitle>
      <DialogContent>
        <form onSubmit={formik.handleSubmit}>
          <div>
            <label htmlFor="name">Name:</label>
            <input id="name" type="text" {...formik.getFieldProps("name")} />
            {formik.touched.name && formik.errors.name && (
              <div className="error">{formik.errors.name}</div>
            )}
          </div>

          <div>
            <label htmlFor="email">Email:</label>
            <input id="email" type="email" {...formik.getFieldProps("email")} />
            {formik.touched.email && formik.errors.email && (
              <div className="error">{formik.errors.email}</div>
            )}
          </div>

          <div>
            <label htmlFor="status">Status:</label>
            <select id="status" {...formik.getFieldProps("status")}>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
            {formik.touched.status && formik.errors.status && (
              <div className="error">{formik.errors.status}</div>
            )}
          </div>

          <div>
            <label htmlFor="department">Department:</label>
            <input
              id="department"
              type="text"
              {...formik.getFieldProps("department")}
            />
            {formik.touched.department && formik.errors.department && (
              <div className="error">{formik.errors.department}</div>
            )}
          </div>

          <div>
            <label htmlFor="location">Location:</label>
            <input
              id="location"
              type="text"
              {...formik.getFieldProps("location")}
            />
            {formik.touched.location && formik.errors.location && (
              <div className="error">{formik.errors.location}</div>
            )}
          </div>

          {isLoading && <p>Saving...</p>}
          {error && <p>Error: {error}</p>}
          <DialogActions>
            <Button onClick={onClose}>Cancel</Button>
            <Button type="submit">
              {agent?.id ? "Update Agent" : "Create Agent"}
            </Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AgentForm;
