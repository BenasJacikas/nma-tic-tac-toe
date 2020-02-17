import * as React from "react";
import styled from "styled-components";

const Row = styled.div`
    width: 20%;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
`

const Table = styled.div`
    display: flex;
    flex-direction: column
`

const Square = styled.button`
    width: 100%;
    margin: 5px;
`

interface GridProps {
    squares: string[];
    onClick: (index: number) => void;
}

export const Grid = (props: GridProps) => {
    const { squares, onClick } = props;

    const generateSquare = (index: number) => {
        return <Square onClick={() => onClick(index)}>{squares[index]}</Square>
    }

    return (
        <Table>
            <Row>
                {generateSquare(0)}
                {generateSquare(1)}
                {generateSquare(2)}
            </Row>
            <Row>
                {generateSquare(3)}
                {generateSquare(4)}
                {generateSquare(5)}
            </Row>
            <Row>
                {generateSquare(6)}
                {generateSquare(7)}
                {generateSquare(8)}
            </Row>
        </Table>
    )
}