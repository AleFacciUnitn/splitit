import Container from "@mui/material/Container";
import CircularProgress from "@mui/material/CircularProgress";

export default function CircularLoading() {
  return(
    <Container className="flex justify-center items-center" sx={{height: "100vh"}}>
      <CircularProgress/>
    </Container>
  );
}
