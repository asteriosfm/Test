import styled from 'styled-components';
import Timer from './components/Timer';

export default () => {
  return (
    <Container>
      <Timer/>
    </Container>
  );
}

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  overflow-x: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
`;
