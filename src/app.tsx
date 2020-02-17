import * as React from "react";
import { Grid } from "components/grid";

export const App = () => {
    const squares = [ "", "X", "O", "", "X", "X", "O", "O", "O"];
    const onClick = () => {};
    return (
        <Grid squares={squares} onClick={onClick} />
    )
}