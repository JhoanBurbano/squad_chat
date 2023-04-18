import React, { useState, useEffect } from 'react';

import CreateRoom from './CreateRoom';
import JoinRoom from './JoinRoom';
import Logo from './Logo'
import { PrimaryButton, SecondaryButton } from '../../components/Buttons';

import { Container, Content } from './styles';

const Home: React.FC = () => {
  const [step, setStep] = useState(0);

  function handleStep(currentStep: number) {
    switch (currentStep) {
      case 0:
        return (
          <>
            <SecondaryButton onClick={() => setStep(1)}>Crear un Squad</SecondaryButton>

            <PrimaryButton onClick={() => setStep(2)}>Integrate con un Squad</PrimaryButton>
          </>
        );
      case 1:
        return <CreateRoom setStep={setStep} />;
      case 2:
        return <JoinRoom setStep={setStep} />;
      default:
       return null;
    }
  }

  return (
    <Container>
      <Content>
        <Logo/>
        {handleStep(step)}
      </Content>
    </Container>
  );
}

export default Home;