import React, { useState } from "react";
import { Agent } from "../types/agent";
import { Link } from "react-router-dom";
import { Box, Button } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import AddIcon from "@mui/icons-material/Add";
import {
  DataGrid,
  GridToolbar,
  GridColDef,
  GridActionsCellItem,
} from "@mui/x-data-grid";
import AgentForm from "./AgentForm";
import useAgentDelete from "../hooks/useAgentDelete";

interface AgentListProps {
  agents: Agent[];
  refetch: () => void;
}

const AgentList: React.FC<AgentListProps> = ({ agents, refetch }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [agentToEdit, setAgentToEdit] = useState<Agent | null>(null);
  const { deleteAgent } = useAgentDelete();

  const columns: GridColDef<Agent>[] = [
    { field: "id", headerName: "ID" },
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      renderCell: (params) => (
        <Link to={`/agents/${params.row.id}`}>{params.row.name}</Link>
      ),
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
    },
    {
      field: "status",
      headerName: "Status",
      type: "string",
      flex: 1,
    },
    {
      field: "lastSeen",
      headerName: "Last Seen",
      type: "date",
      description: "This column has a value getter and is not sortable.",
      sortable: false,
      flex: 1,
      valueGetter: (value, row) => new Date(row.lastSeen),
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      flex: 1,
      cellClassName: "actions",
      getActions: ({ row }) => {
        return [
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            onClick={() => handleEditClick(row)}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={() => handleDeleteClick(row)}
            color="inherit"
          />,
        ];
      },
    },
  ];

  const handleCreateClick = () => {
    const clearAgent: Agent = {
      name: "",
      email: "",
      status: "Active",
      lastSeen: "",
      department: "",
      location: "",
    };
    setAgentToEdit(clearAgent);
    setIsDialogOpen(true);
  };

  const handleEditClick = (agent: Agent) => {
    setAgentToEdit(agent);
    setIsDialogOpen(true);
  };

  const handleDeleteClick = async (agent: Agent) => {
    try {
      await deleteAgent(agent.id as number);
      refetch();
    } catch (err: any) {
      console.error(err);
    }
  };

  return (
    <Box sx={{ height: "100%", width: "100%" }}>
      <Button startIcon={<AddIcon />} onClick={handleCreateClick}>
        Create an Agent
      </Button>
      <DataGrid
        rows={agents}
        columns={columns}
        disableColumnFilter
        disableColumnSelector
        disableDensitySelector
        slots={{ toolbar: GridToolbar }}
        slotProps={{
          toolbar: {
            showQuickFilter: true,
          },
        }}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 10,
            },
          },
        }}
        pageSizeOptions={[10, 20]}
        disableRowSelectionOnClick
      />
      <AgentForm
        isDialogOpen={isDialogOpen}
        reloadAgents={refetch}
        agent={agentToEdit}
        onClose={() => setIsDialogOpen(false)}
      />
    </Box>
  );
};

export default AgentList;
