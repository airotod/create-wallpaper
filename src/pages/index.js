import React, { useState, useRef } from "react"
import { useForm } from "react-hook-form"
import styled from "styled-components"
import styles from "./index.module.css"

const Container = styled.div`
  color: ${props => props.fontColor};
  background-color: ${props => props.backColor};
  background-image: ${props => props.backImage};
  background-size: cover;
`
const ColorBtn = styled.button`
  font-family: inherit;
  margin: 4px 5px;
  width: 41px;
  height: 41px;
  border-radius: 41px;
  outline: none;
  border: solid 1px #5a5a5a;
  cursor: pointer;
  background: ${props => props.btnColor};
`
const COLORS = {
  WHITE: "#ffffff",
  BLACK: "#000000",
  BLUE: "#2B547E",
  YELLOW: "#FBB117",
  PINK: "#C25A7C",
}
const Cnvs = styled.canvas`
  width: 500px;
  width: ${props => props.cnvsWidth};
  height: ${props => props.cnvsHeight};
  display: none;
  margin: 0 auto;
  border-radius: 3px;
  border: 1px solid #ddd;
`
export default function Home({ data }) {
  const { register, handleSubmit } = useForm()
  const onSubmit = data => {
    console.log(data)
    setMyText(data["myText"])
    setMyAuthor(data["myAuthor"])
  }
  const [myText, setMyText] = useState("Write main text")
  const [myAuthor, setMyAuthor] = useState("Write subtext")

  const lineHeight = 2.4
  const canvasRef = useRef(null)
  const [backColor, setBackColor] = useState("#000000")
  const [fontColor, setFontColor] = useState("#ffffff")
  const [authorColor, setAuthorColor] = useState("ffffff")
  const [dwnldHref, setDwnldHref] = useState("")
  const [cnvsWidth, setCnvsWidth] = useState("500px")
  const [cnvsHeight, setCnvsHeight] = useState("500px")
  const [pxlWidth, setPxlWidth] = useState("1800px")
  const [pxlHeight, setPxlHeight] = useState("1800px")
  const [fontSize, setFontSize] = useState("44px")
  const [fontMaxWidth, setFontMaxWidth] = useState("1350px")
  const [fontStyle, setFontStyle] = useState("Merriweather")
  const [btnColor, setBtnColor] = useState("#000000")

  React.useEffect(() => {
    const cnvs = canvasRef.current
    const ctx = cnvs.getContext("2d")
    draw(cnvs, ctx, myText, lineHeight, fontStyle)
    console.log("called")
  })

  function draw(cnvs, ctx, text, lineHeight, fontStyle) {
    let line = ""
    const maxWidth = parseInt(fontMaxWidth.slice(0, -2))
    const midX = cnvs.width / 2
    ctx.fillStyle = `${backColor}`
    ctx.fillRect(0, 0, cnvs.width, cnvs.height)
    ctx.fillStyle = `${fontColor}`
    ctx.font = `${fontSize} ${fontStyle}`
    ctx.textBaseline = "top"
    ctx.textAlign = "center"

    const wordList = text.split(" ")
    let textList = []
    for (let i = 0; i < wordList.length; i++) {
      let tmpLine = line + wordList[i] + " "
      let tmpLength = ctx.measureText(tmpLine).width

      if (tmpLength < maxWidth) {
        line = tmpLine
      } else {
        textList.push(line)
        line = wordList[i] + " "
      }
    }
    textList.push(line)
    textList.push("")
    textList.push(myAuthor)
    const q = parseInt(textList.length / 2)
    const r = textList.length % 2
    let curY = cnvs.height / 2
    if (r === 0) {
      curY = curY - parseInt(fontSize.slice(0, -2)) * lineHeight * q
    } else {
      curY = curY - parseInt(fontSize.slice(0, -2)) * lineHeight * (q + 0.5)
    }

    for (let i = 0; i < textList.length; i++) {
      if (i === textList.length - 1) {
        ctx.fillStyle = `${authorColor}`
        ctx.font = `${parseInt(fontSize.slice(0, -2)) - 2}px Roboto`
      } else {
        ctx.fillStyle = `${fontColor}`
        ctx.font = `${fontSize} Merriweather`
      }
      ctx.fillText(textList[i], midX, curY)
      curY = curY + parseInt(fontSize.slice(0, -2)) * lineHeight
    }
  }

  function dwnld_img(cnvs, ctx) {
    const image = cnvs.toDataURL("image/jpeg")
    setDwnldHref(image)
  }

  return (
    <Container
      className={styles.post}
      backColor={backColor}
      fontColor={fontColor}
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={styles.wrap_form}
        id="input_form"
      >
        <input
          className={styles.input_item}
          id="text"
          type="text"
          name="myText"
          ref={register}
          placeholder="Write main text"
        />
        <input
          className={`${styles.input_item} ${styles.input_author}`}
          id="author"
          type="text"
          name="myAuthor"
          ref={register}
          placeholder="Write subtext"
        />
        <input className={styles.input_item} type="submit" value="Submit" />
      </form>
      <div className={styles.wrap_post} id="wrap_post">
        <div className={styles.content} />
        {myText}
        <div className={styles.author}>{myAuthor}</div>
      </div>
      <div className={styles.btn_container} id="btn_container">
        <div className={styles.color_btn}>
          <ColorBtn
            btnColor={COLORS.WHITE}
            onClick={() => {
              setBackColor(COLORS.WHITE)
              setFontColor(COLORS.BLACK)
              setAuthorColor("#696969")
            }}
          ></ColorBtn>
          <ColorBtn
            btnColor={COLORS.BLACK}
            onClick={() => {
              setBackColor(COLORS.BLACK)
              setFontColor(COLORS.WHITE)
              setAuthorColor("#989898")
            }}
          ></ColorBtn>
          <ColorBtn
            btnColor={COLORS.PINK}
            onClick={() => {
              setBackColor(COLORS.PINK)
              setFontColor(COLORS.WHITE)
              setAuthorColor("#fdcee1")
            }}
          ></ColorBtn>
          <ColorBtn
            btnColor={COLORS.BLUE}
            onClick={() => {
              setBackColor(COLORS.BLUE)
              setFontColor(COLORS.WHITE)
              setAuthorColor("#bfe7f7")
            }}
          ></ColorBtn>
          <ColorBtn
            btnColor={COLORS.YELLOW}
            onClick={() => {
              setBackColor(COLORS.YELLOW)
              setFontColor(COLORS.WHITE)
              setAuthorColor("#d0c3f1")
            }}
          ></ColorBtn>
        </div>
        <div className={styles.dwnld_btns}>
          <a
            id="dwnld_btn"
            className={styles.dwnld_btn}
            onClick={() => {
              setCnvsWidth("500px")
              setCnvsHeight("1082px")
              setPxlWidth("828px")
              setPxlHeight("1792px")
              setFontSize("32px")
              setFontMaxWidth("660px")
              let w = document.getElementById("dwnld_window")
              w.style.display = "block"
              let f = document.getElementById("input_form")
              f.style.opacity = 0.3
              let p = document.getElementById("wrap_post")
              p.style.opacity = 0.3
              let b = document.getElementById("btn_container")
              b.style.opacity = 0.3
            }}
          >
            <div>
              Download <span className={styles.dwnld_size}>(Mobile)</span>
            </div>
          </a>
          <button
            id="dwnld_btn"
            className={styles.dwnld_btn}
            onClick={() => {
              setCnvsWidth("500px")
              setCnvsHeight("281px")
              setPxlWidth("1920px")
              setPxlHeight("1080px")
              setFontSize("26px")
              setFontMaxWidth("780px")
              let w = document.getElementById("dwnld_window")
              w.style.display = "block"
              let f = document.getElementById("input_form")
              f.style.opacity = 0.3
              let p = document.getElementById("wrap_post")
              p.style.opacity = 0.3
              let b = document.getElementById("btn_container")
              b.style.opacity = 0.3
            }}
          >
            <div>
              Download <span className={styles.dwnld_size}>(Desktop)</span>
            </div>
          </button>
        </div>
      </div>
      <div className={styles.dwnld_window} id="dwnld_window">
        <p>Download wallpaper?</p>
        <div className={styles.select_btn_container}>
          <a
            id="dwnld_btn"
            className={styles.select_btn}
            onClick={() => {
              let w = document.getElementById("dwnld_window")
              w.style.display = "none"
              let f = document.getElementById("input_form")
              f.style.opacity = 1
              let p = document.getElementById("wrap_post")
              p.style.opacity = 1
              let b = document.getElementById("btn_container")
              b.style.opacity = 1
            }}
          >
            No
          </a>
          <a
            id="dwnld_btn"
            download="image.jpeg"
            href={dwnldHref}
            className={styles.select_btn}
            onClick={() => {
              const cnvs = canvasRef.current
              const ctx = cnvs.getContext("2d")
              dwnld_img(cnvs, ctx)
              let w = document.getElementById("dwnld_window")
              w.style.display = "none"
              let f = document.getElementById("input_form")
              f.style.opacity = 1
              let p = document.getElementById("wrap_post")
              p.style.opacity = 1
              let b = document.getElementById("btn_container")
              b.style.opacity = 1
            }}
          >
            Yes
          </a>
        </div>
      </div>
      <div className={styles.image_canvas}>
        <Cnvs
          id="canvas"
          className={styles.canvas}
          ref={canvasRef}
          cnvsHeight={cnvsHeight}
          cnvsWidth={cnvsWidth}
          height={pxlHeight}
          width={pxlWidth}
          onClick={() => {
            const cnvs = canvasRef.current
            const ctx = cnvs.getContext("2d")
            draw(cnvs, ctx, myText, lineHeight)
          }}
        ></Cnvs>
      </div>
    </Container>
  )
}
