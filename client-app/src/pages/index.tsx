import React, { FC } from "react";
import Layout from "../components/Layout";
import MaterialSelection from "../components/stages/MaterialSelection";
import TestingStage from "../components/stages/TestingStage";
import TestResultsStage from "../components/stages/TestResultsStage";
import { useDispatch, useSelector } from "react-redux";
import {
    applicationSlice,
    ApplicationState,
    getState,
} from "../store/application/applicationSlice";
import { useHotkeys } from "react-hotkeys-hook";
import { dictionarySlice } from "../store/dictionary/dictionarySlice";
import {
    currentTestSlice,
    shuffleNewTest,
} from "../store/currentTest/currentTestSlice";

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
    const dispatch = useDispatch();

    useHotkeys(
        ["meta+shift+backspace", "ctrl+shift+backspace"],
        () => {
            dispatch(dictionarySlice.actions.clear());
            dispatch(currentTestSlice.actions.clearRaw());
        },
        {
            enableOnFormTags: ["input", "textarea"],
        }
    );

    useHotkeys(
        ["meta+shift+enter", "ctrl+shift+enter"],
        () => {
            dispatch(shuffleNewTest());
            dispatch(applicationSlice.actions.testStage(ApplicationState.Test));
            dispatch(currentTestSlice.actions.fetchNext());
        },
        {
            enableOnFormTags: ["input", "textarea"],
        }
    );

    return <Layout>{StageToComponentMap.get(appState)}</Layout>;
};

export default IndexPage;
