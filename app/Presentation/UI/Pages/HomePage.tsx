import Container from "@mui/material/Container";
import Expenses from "../Components/Expenses";

export default function HomePage() {
  return (
    <Container className="flex flex-col">
      <Expenses/>
    </Container>
  );
}
