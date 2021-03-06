import React from "react"
import "./styles.scss"
import { StaticQuery, graphql } from "gatsby"
import { Row, Col } from "react-bootstrap"
import Glitch from "components/vendor/glitch"
import Typewriter from "typewriter-effect"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowDown } from "@fortawesome/free-solid-svg-icons"
import ThemeContext from "../../context"
import Text from "./text.yml"

class Hero extends React.Component {
  static contextType = ThemeContext

  render() {
    return (
      <section id={`${this.props.id}`} className="hero" style={ { height: this.context.height } }>
        <Row>
          <Col md={12} className="profile">
            {this.profile()}
            {this.scrollIndicator()}
            {this.icons()}
          </Col>
        </Row>
      </section>
    )
  }

  profile() {
    return (
      <React.Fragment>
        <div className="content-text">
          <div className="line-text">
            <h4>{Text.intro}</h4>
          </div>
          <Glitch text={Text.name} />

          <Typewriter options = {
            {
              strings: Text.subtitles.map((data, index) => { return "# ".concat(data) }),
              autoStart: true,
              loop: true,
            }
          } />
        </div>
      </React.Fragment>
    )
  }

  icons() {
    return this.props.icons.edges.map((value, index) => {
      return (
        <img src={value.node.childImageSharp.fluid.src}
          className={
            `animated fadeIn move-${
              Math.floor(Math.random() * 10) % 2 === 0 ? "up" : "down"
            } float-image`
          }
          style={
            {
              left: `${index * 10}%`,
              bottom: `${Math.random() *
                (+(index % 2 === 0 ? 80 : 20) - +(index % 2 === 0 ? 70 : 10)) +
                +(index % 2 === 0 ? 70 : 10)}%`
            }
          }
          alt="shape"
          key={index}
        />
      )
    })
  }

  scrollIndicator() {
    return (
      <div className="scroll-indicator content-text hidden-xs">
        {Text.scroll_indicator} <FontAwesomeIcon icon={faArrowDown} />
      </div>
    )
  }
}

export default props => (
  <StaticQuery query={
    graphql `
      query {
        icons: allFile(
          filter: {
            extension: { regex: "/(png)/" }
            relativeDirectory: { eq: "icons" }
          }
        )
        {
          edges {
            node {
              childImageSharp {
                fluid(maxWidth: 100) {
                  src
                }
              }
            }
          }
        }
      }
    `
  }
  render = { ({ icons }) => <Hero icons={icons} {...props} /> }
  />
)
