import React from "react";
import "./loading.css";
import { Dimmer, Loader } from "semantic-ui-react";

const Loading: React.FC = () => (
  <div className="Loading">
    <Dimmer active inverted>
      <Loader inverted>Loading</Loader>
    </Dimmer>
  </div>
);

export default Loading;
