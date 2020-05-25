import React, { FC } from "react";
import Layout from "../components/Layout";
import MaterialSelection from "../components/stages/MaterialSelection";
import TestingStage from "../components/stages/TestingStage";
import TestResultsStage from "../components/stages/TestResultsStage";

const IndexPage: FC = () => (
    <Layout>
        <TestResultsStage />
    </Layout>
);

export default IndexPage;
