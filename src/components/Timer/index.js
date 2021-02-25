import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import { Button } from '@material-ui/core';


export default () => {
  const [dateTimeNow, setDateTimeNow] = useState(new Date());
  const [startAt, setStartAt] = useState(new Date());
  const [isStarted, setIsStarted] = useState(false);
  const [isReseted, setIsReseted] = useState(false);
  const [isWait, setIsWait] = useState(false)
  const [waitStartAt, setWaitStartAt] = useState(null)

  useEffect( () => {
    setStartAt(new Date())
  }, [isStarted])

  useEffect( () => {
    setWaitStartAt(new Date())
  }, [isWait])

  const difference = () => {
    if (!isWait) {
      return 0
    }
    return new Date().getTime() - waitStartAt.getTime()
  }

  const interval = setInterval( () => {
    setDateTimeNow(new Date(new Date().getTime() - difference()))
  }, 1000)

  const Start = () => {
    if (isStarted) {
      if(isWait) {
        clearInterval(interval)
        return new Date(waitStartAt.getTime() - startAt.getTime()).toISOString().slice(11, 19)
      }
      if (dateTimeNow.getTime() >= startAt.getTime()) {
        return new Date(dateTimeNow.getTime() - startAt.getTime()).toISOString().slice(11, 19)
      }
      if (isReseted) {
        return new Date(dateTimeNow.getTime() - startAt.getTime()).toISOString().slice(11, 19)
      }
    }
    return "00:00:00"
  }

  return <Container>

    <Timer>{Start()}</Timer>

    <ButtonContainer>
      <Button
        variant="outlined"
        color="primary"
        disabled={isWait}
        onClick={ () => setIsStarted(!isStarted) }
      >
        Start/Stop
      </Button>
      <Button
        variant="outlined"
        color="primary"
        onClick={ () => setIsWait(!isWait) }
        disabled={!isStarted}
      >
        Wait
      </Button>
      <Button
        variant="outlined"
        color="primary"
        disabled={!isStarted}
        onClick={ () => {
          setIsReseted(true)
          setStartAt(new Date())
        }}
      >
        Reset
      </Button>
    </ButtonContainer>

  </Container>
}

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0px auto;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 450px;
  justify-content: space-around;
  margin-top: 50px;
`;

const Timer = styled.div`
  width: 200px;
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #bbdefb;
  box-shadow: 0px 0px 20px #bbdefb;
  border-radius: 50%;
  font-size: 25px;
`;
