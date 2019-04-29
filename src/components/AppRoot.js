import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import getView from "../ducks/view/selectors/getView";
import useSelect from "../lib/useSelect";

import AboutView from "./AboutView";
import HomeView from "./HomeView";

const RootViews = {
  AboutView,
  HomeView,
};

function AppRoot() {
  const { root } = useSelect(getView);
  const RootView = RootViews[`${root}View`];

  return (
    <Container>
      <Row>
        <Col>
          <br />
          <RootView />
        </Col>
      </Row>
    </Container>
  );
}

export default AppRoot;
