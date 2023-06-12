import { useNavigate } from "react-router-dom"
import styled from "styled-components"
import HeroImg from "./assets/hero-img.png"

function Home() {
  const navigate = useNavigate()
  return (
    <Container>
      <Wrapper>
        <H1 className="hero-title">
          Underground Styles Fashion Week Special Sale 99% OFF
        </H1>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut finibus
          ornare vehicula. Pellentesque habitant morbi tristique senectus et
          netus et malesuada fames ac turpis egestas.
        </p>
        <Button onClick={() => navigate("/products")}>
          <p className="rainbow-text">Shop Now</p>
        </Button>
      </Wrapper>
      <Image src={HeroImg} alt="hero-img" />
    </Container>
  )
}
const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 1rem;
  animation: 1s fadeIn;
`
const Image = styled.img`
  width: max(150px, 33%);
`
const Button = styled.button`
  font-size: clamp(1rem, 3vw, 2rem);
  padding: 1rem;
  color: #f7f8f9;
  background-color: #1f1f1f;
  border-radius: 30px 10px;
  border: none;
  cursor: pointer;
`
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  align-items: flex-start;
`
const H1 = styled.h1`
  font-size: clamp(1rem, 4vw, 4rem);
`
export default Home
