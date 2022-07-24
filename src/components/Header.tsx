import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import { getAuth } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const Offset = styled("div")(({ theme }) => theme.mixins.toolbar);

const Heater = () => {
  const auth = getAuth();
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        flexGrow: 1,
      }}
    >
      <AppBar position="fixed">
        <Toolbar>
          <Typography
            variant="h6"
            component="div"
            sx={{
              flexGrow: 1,
            }}
          >
            TODO
          </Typography>
          <Button
            color="inherit"
            onClick={async () => {
              try {
                await auth.signOut();
                navigate("/login");
              } catch (error) {
                console.log(error);
              }
            }}
          >
            Logout
          </Button>
        </Toolbar>
      </AppBar>
      <Offset />
    </Box>
  );
};

export default Heater;
