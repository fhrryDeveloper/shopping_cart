import styled from "styled-components"
import { FaStar } from "react-icons/fa"
import { useOutletContext } from "react-router-dom"
import Loader from "./Loader"

const Image = styled.img`
  height: 100%;
`
const Article = styled.article`
  outline: 1px solid #1f1f1f50;
  display: flex;
  flex-direction: column;
  border-radius: 10px;
`
const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1rem;
  height: fit-content;
  animation: 1s fadeIn;
`
const Container2 = styled.div`
  height: 30vh;
  margin: 0 auto;
  padding: 25px;
`
const Container3 = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  justify-items: start;
  padding: 0.5rem;
  gap: 0.5rem;
`
const Button = styled.button`
  font-size: large;
  font-weight: bold;
  padding: 10px 0;
  width: 100%;
  color: #f7f8f9;
  background-color: #1f1f1f;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  border: 3px solid transparent;
  &:active {
    background: linear-gradient(#1f1f1f, #1f1f1f) padding-box,
      radial-gradient(
          circle,
          rgba(131, 58, 180, 1) 0%,
          rgba(253, 29, 29, 1) 50%,
          rgba(252, 176, 69, 1) 100%
        )
        border-box;
    border: 3px solid transparent;
  }
`
const StyledStar = styled(FaStar)`
  color: #fca311;
`

const LoaderSC = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  align-items: center;
`

function Products() {
  const [products, isLoading, error, handleAdd] = useOutletContext()
  if (isLoading)
    return (
      <LoaderSC>
        <p>Note: Loading Maybe Slow Due To API</p>
        <br />
        <Loader />
      </LoaderSC>
    )
  if (error) return <h2>An Error Has Occurred</h2>
  return (
    <Container>
      {products.map((product) => (
        <Article key={product.id}>
          <Container2>
            <Image src={product.image} alt="product-img" />
          </Container2>
          <Container3>
            <h2>
              {product.rating.rate}
              <StyledStar />
            </h2>
            <h2>{product.title}</h2>
            <h3>{product.price}$</h3>
          </Container3>
          <Button onClick={() => handleAdd(product.id)}>
            <p className="rainbow-text">Add To Cart</p>
          </Button>
        </Article>
      ))}
    </Container>
  )
}

export default Products
