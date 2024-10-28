import React from "react";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import List from "@mui/material/List";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import StoreIcon from "@mui/icons-material/Store";
import PaymentIcon from "@mui/icons-material/Payment";
import { useTheme } from "@mui/material/styles";
import { StyledDrawer, DrawerHeader } from "./styles";
import { CustomAppBar } from "./components/CustomAppBar";
import { DrawerMenuItem } from "./components/DrawerMenuItem";
import { DrawerSubItem } from "./components/DrawerSubItem";

export default function App() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [materialOpen, setMaterialOpen] = React.useState(false);
  const [accountOpen, setAccountOpen] = React.useState(false);
  const [vendorOpen, setVendorOpen] = React.useState(false);
  const [orderOpen, setOrderOpen] = React.useState(false);

  const handleDrawerOpen = () => setOpen(true);
  const handleDrawerClose = () => setOpen(false);

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <CustomAppBar open={open} handleDrawerOpen={handleDrawerOpen} />
      <StyledDrawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </DrawerHeader>

        <Divider />

        <List>
          <DrawerMenuItem
            icon={AddIcon}
            text="Material Management"
            isOpen={materialOpen}
            onToggle={() => setMaterialOpen(!materialOpen)}
          >
            <DrawerSubItem icon={AddIcon} text="Add Material" />
            <DrawerSubItem icon={EditIcon} text="Update Material" />
            <DrawerSubItem icon={DeleteIcon} text="Delete Material" />
          </DrawerMenuItem>
        </List>

        <Divider />

        <List>
          <DrawerMenuItem
            icon={AccountBoxIcon}
            text="Account Management"
            isOpen={accountOpen}
            onToggle={() => setAccountOpen(!accountOpen)}
          >
            <DrawerSubItem icon={AddIcon} text="Add Account" />
            <DrawerSubItem icon={AddIcon} text="Add Milestone" />
          </DrawerMenuItem>
        </List>

        <Divider />

        <List>
          <DrawerMenuItem
            icon={StoreIcon}
            text="Vendor Management"
            isOpen={vendorOpen}
            onToggle={() => setVendorOpen(!vendorOpen)}
          >
            <DrawerSubItem icon={AddIcon} text="Add Vendor" />
          </DrawerMenuItem>
        </List>

        <Divider />

        <List>
          <DrawerMenuItem
            icon={PaymentIcon}
            text="Order Management"
            isOpen={orderOpen}
            onToggle={() => setOrderOpen(!orderOpen)}
          >
            <DrawerSubItem icon={PaymentIcon} text="Pay Amount" />
          </DrawerMenuItem>
        </List>
      </StyledDrawer>

      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        <Typography paragraph>
          Welcome to the Civil Engineering Task Management App! Select an option
          from the drawer to get started.
        </Typography>
      </Box>
    </Box>
  );
}
