import Container from "@mui/material/Container";
import LogInForm from "@ui/Components/LogInForm";

export default function LogInPage() {
  return (
    <Container className="flex justify-center items-center" style={{height: "100vh"}}>
      <LogInForm/>
    </Container>
  );
}
