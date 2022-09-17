import React, { FC } from 'react';
import './styles.scss';
type ContainerProps = {
    children: React.ReactNode;
}

const Container = (props: ContainerProps) => {
    return (
        <div className="jumbotron__container">
            {props.children}
        </div>
    );
}

export default Container;
