import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import { DataGrid } from "@mui/x-data-grid";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const initialRows = [
  { id: 1, materialName: "Concrete" },
  { id: 2, materialName: "Steel" },
  { id: 3, materialName: "Wood" },
  { id: 4, materialName: "Brick" },
  { id: 5, materialName: "Glass" },
];

export default function MaterialGrid() {
  const [rows, setRows] = React.useState(initialRows);
  const [materialName, setMaterialName] = React.useState("");
  const [editId, setEditId] = React.useState(null);
  const [idCounter, setIdCounter] = React.useState(initialRows.length + 1);
  const [open, setOpen] = React.useState(false); // State for dialog

  const handleAddMaterial = () => {
    if (materialName.trim() === "") return;

    const newMaterial = { id: idCounter, materialName };
    setRows((prevRows) => [...prevRows, newMaterial]);
    setMaterialName("");
    setIdCounter((prevId) => prevId + 1);
    setOpen(false); // Close dialog after adding
  };

  const handleEditMaterial = (id) => {
    const materialToEdit = rows.find((row) => row.id === id);
    setMaterialName(materialToEdit.materialName);
    setEditId(id);
    setOpen(true); // Open dialog for editing
  };

  const handleSaveEdit = () => {
    setRows((prevRows) =>
      prevRows.map((row) =>
        row.id === editId ? { ...row, materialName } : row
      )
    );
    setMaterialName("");
    setEditId(null);
    setOpen(false); // Close dialog after saving
  };

  const handleDeleteMaterial = (id) => {
    setRows((prevRows) => prevRows.filter((row) => row.id !== id));
  };

  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "materialName",
      headerName: "Material Name",
      width: 200,
      editable: true,
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 150,
      renderCell: (params) => (
        <Box sx={{ display: "flex", gap: 1 }}>
          <IconButton
            color="primary"
            onClick={() => handleEditMaterial(params.row.id)}
          >
            <EditIcon />
          </IconButton>
          <IconButton
            color="error"
            onClick={() => handleDeleteMaterial(params.row.id)}
          >
            <DeleteIcon />
          </IconButton>
        </Box>
      ),
    },
  ];

  return (
    <Box sx={{ width: "100%" }}>
      <Button variant="contained" onClick={() => setOpen(true)} sx={{ mb: 2 }}>
        Add Material
      </Button>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={1000}
        disableRowSelectionOnClick
        autoHeight
        pagination={false}
      />

      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>{editId ? "Edit Material" : "Add Material"}</DialogTitle>
        <DialogContent>
          <TextField
            label="Material Name"
            variant="outlined"
            value={materialName}
            onChange={(e) => setMaterialName(e.target.value)}
            fullWidth
            autoFocus
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button
            variant="contained"
            onClick={editId ? handleSaveEdit : handleAddMaterial}
          >
            {editId ? "Save" : "Add"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
