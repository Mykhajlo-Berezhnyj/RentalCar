import NavBar from "../../NavBar/NavBar";
import Container from "../Container/Container";
import Logo from "../Logo/Logo";
import css from "./AppBar.module.css";

export default function AppBar() {
  return (
    <div className={css.header}>
      <Container className={css.appBar}>
          <Logo />
          <NavBar />
      </Container>
    </div>
  );
}
