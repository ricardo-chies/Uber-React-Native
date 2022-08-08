import React, {Component} from 'react';

import {Container, TypeTitle, TypeDescription, TypeImage, RequestButton, RequestButtonText} from './styles';

import uberx from '../../assets/uberx.png';

export default class Details extends Component {
    render() {
        return <Container>
            <TypeTitle>Popular</TypeTitle>
            <TypeDescription>Viagnes baratas para o dia a dia</TypeDescription>

            <TypeImage source={uberx} />
            <TypeTitle>Uber X</TypeTitle>
            <TypeDescription>Sua primeira viagem será de graça!</TypeDescription>

            <RequestButton onPress={() => {}}>
                <RequestButtonText>Solicitar Uber X</RequestButtonText>
            </RequestButton>
        </Container>
    }
}