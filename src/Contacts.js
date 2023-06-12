import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa"
import styled from "styled-components"

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  row-gap: 100px;
  justify-items: center;
  animation: 1s fadeIn;
`
const H2 = styled.h2`
  grid-column: 1/4;
  justify-self: center;
`
const A = styled.a`
  color: #1f1f1f;
  font-size: 2rem;
`
function Contacts() {
  function copyEmailToClipBoard() {
    navigator.clipboard.writeText("lucledo@protonmail.com")
    alert("Copied email to clipboard: lucledo@protonmail.com")
  }

  return (
    <Container>
      <A
        href="https://github.com/Apestein"
        target="_blank"
        rel="noopener noreferrer"
      >
        <FaGithub />
      </A>
      <A
        href="https://www.linkedin.com/in/luc-ledo/"
        target="_blank"
        rel="noopener noreferrer"
      >
        <FaLinkedin />
      </A>
      <A>
        <FaEnvelope onClick={copyEmailToClipBoard} className="icon" />
      </A>
      <H2>FakeStore Rodeo Drive 42, Los Angeles USA</H2>
    </Container>
  )
}

export default Contacts
