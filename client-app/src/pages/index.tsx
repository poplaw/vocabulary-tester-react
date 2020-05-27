import React, { FC } from "react";
import Layout from "../components/Layout";
import MaterialSelection from "../components/stages/MaterialSelection";
import TestingStage from "../components/stages/TestingStage";
import TestResultsStage from "../components/stages/TestResultsStage";
import { useSelector } from "react-redux";
import {
    getState,
    ApplicationState,
} from "../store/application/applicationSlice";

const StageToComponentMap: Map<ApplicationState, React.ReactElement> = new Map<
    ApplicationState,
    React.ReactElement
>();

StageToComponentMap.set(
    ApplicationState.DictionarySelection,
    <MaterialSelection />
)
    .set(ApplicationState.Test, <TestingStage />)
    .set(ApplicationState.TestResult, <TestResultsStage />);

const IndexPage: FC = () => {
    const appState: ApplicationState = useSelector(getState);

    return <Layout>{StageToComponentMap.get(appState)}</Layout>;
};

export default IndexPage;
