import { Outlet, Link, useNavigate } from "react-router-dom"
import {
  FaShoppingCart,
  FaGithub,
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaBars,
} from "react-icons/fa"
import "./styles/index.css"
import { useEffect, useState } from "react"
import styled, { css } from "styled-components"
import useSWR from "swr"

function App() {
  const [cart, setCart] = useState([])
  const navigate = useNavigate()
  const fetcher = (url) =>
    fetch(url).then((res) =>
      res
        .json()
        .then((data) =>
          data.filter((product) => product.category.includes("clothing"))
        )
    )
  const {
    data: products,
    error,
    isLoading,
  } = useSWR("https://fakestoreapi.com/products", fetcher)

  function cartTotal() {
    let total = cart.reduce(
      (previous, current) => previous + current.price * current.quantity,
      0
    )
    return `Total: ${total.toFixed(2)}$`
  }

  function handleAdd(id) {
    const product = products.find((element) => element.id === id)
    if (cart.find((item) => item.id === product.id)) {
      setCart(
        cart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      )
    } else setCart([...cart, { ...product, quantity: 1 }])
  }

  function handleQuantity(id, e) {
    if (e.target.textContent === "+")
      setCart(
        cart.map((item) =>
          item.id === id ? { ...item, quantity: item.quantity + 1 } : item
        )
      )
    else {
      const product = cart.find((item) => item.id === id)
      if (product.quantity > 1)
        setCart(
          cart.map((item) =>
            item.id === id ? { ...item, quantity: item.quantity - 1 } : item
          )
        )
      else setCart(cart.filter((item) => item.id !== id))
    }
  }

  function showModal() {
    document.querySelector(".modal").style.display = "block"
  }

  function closeModal(e) {
    const modal = document.querySelector(".modal")
    if (e.target === modal) modal.style.display = "none"
  }

  function rickRoll() {
    window.open("https://www.youtube.com/watch?v=dQw4w9WgXcQ", "_blank")
  }
  return (
    <>
      <header>
        <h1 onClick={() => navigate("/")} className="title">
          Fake Shop
        </h1>
        <nav>
          <StyledLink to="/">Home</StyledLink>
          <StyledLink to="products">Products</StyledLink>
          <StyledLink to="contacts">Contacts</StyledLink>
          <CartWrapper>
            <CartCounter>{cart.length}</CartCounter>
            <FaShoppingCart
              className="icon"
              fontSize="2rem"
              onClick={showModal}
            />
          </CartWrapper>
        </nav>
      </header>
      <main>
        <Outlet context={[products, isLoading, error, handleAdd]} />
      </main>
      <footer>
        Copyright © 2022 Apestein{" "}
        <FaGithubSC
          onClick={() => window.open("https://github.com/Apestein", "_blank")}
        />
      </footer>
      <Modal onClick={closeModal} className="modal">
        <ModalContent>
          <H2>Your Cart</H2>
          {cart.map((item) => (
            <Container key={item.id}>
              <Image src={item.image} alt="cart-item" />
              <div>
                <H3>{item.title}</H3>
                <h3>{(item.price * item.quantity).toFixed(2) + "$"}</h3>
                <Wrapper>
                  <Button onClick={(e) => handleQuantity(item.id, e)}>-</Button>
                  <Span>{item.quantity}</Span>
                  <Button onClick={(e) => handleQuantity(item.id, e)}>+</Button>
                </Wrapper>
              </div>
            </Container>
          ))}
          <H2>{cartTotal()}</H2>
          <Button secondary onClick={rickRoll}>
            <p className="rainbow-text">Checkout</p>
          </Button>
          <Button
            secondary
            onClick={() =>
              (document.querySelector(".modal").style.display = "none")
            }
          >
            <p className="rainbow-text">Close</p>
          </Button>
        </ModalContent>
      </Modal>
      <Aside>
        <FaBars className="icon" fontSize="2rem" />
        <FaFacebook
          className="icon"
          onClick={() => window.open("https://www.facebook.com")}
          fontSize="2rem"
        />
        <FaInstagram
          className="icon"
          onClick={() => window.open("https://www.instagram.com")}
          fontSize="2rem"
        />
        <FaTwitter
          className="icon"
          onClick={() => window.open("https://www.twitter.com")}
          fontSize="2rem"
        />
      </Aside>
    </>
  )
}
export default App

const CartCounter = styled.div`
  border-radius: 50%;
  width: 1.5rem;
  height: 1.5rem;
  text-align: center;
  position: absolute;
  top: -10px;
  right: -10px;
  font-size: large;
  background-color: rgb(255, 153, 153);
`
const CartWrapper = styled.div`
  position: relative;
  border-radius: 50%;
  padding: 0.5rem;
  display: flex;
  place-content: center;
`
const Modal = styled.div`
  display: none;
  position: fixed;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
`
const ModalContent = styled.div`
  position: absolute;
  right: 0;
  height: 100%;
  width: min(500px, 50%);
  background-color: #f7f8f9;
  padding: 25px;
  overflow: scroll;
  animation: 1s slideIn;
`
const Container = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  margin-bottom: 25px;
`
const Image = styled.img`
  min-width: 100px;
  max-width: 30%;
`
const Button = styled.button`
  font-size: 2rem;
  width: 50px;
  color: #f7f8f9;
  background-color: #1f1f1f;
  border: none;
  ${(props) =>
    props.secondary &&
    css`
      min-width: fit-content;
      width: 50%;
      font-size: 1.5rem;
      padding: 0.5rem;
      border: 1px solid #f7f8f9;
    `};
`
const H3 = styled.h3`
  width: 300px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`
const Span = styled.span`
  font-size: large;
`
const Wrapper = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
`
const Aside = styled.aside`
  position: fixed;
  color: #f7f8f9;
  background-color: #1f1f1f;
  height: 100%;
  width: min(100px, 10%);
  display: grid;
  grid-template-rows: 80% 1fr 1fr 1fr;
  justify-content: center;
  padding-top: 2rem;
`
const StyledLink = styled(Link)`
  text-decoration: none;
  color: #1f1f1f;
  font-size: clamp(1rem, 2vw, 1.25rem);
`
const H2 = styled.h2`
  text-align: center;
`
const FaGithubSC = styled(FaGithub)`
  cursor: pointer;
`
