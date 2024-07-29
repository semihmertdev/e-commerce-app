// src/pages/HomePage.jsx
import styled from 'styled-components';

const HomeContainer = styled.div`
  padding: 1rem;
`;

const Title = styled.h1`
  font-size: 2rem;
  margin-bottom: 1rem;
`;

const Text = styled.p`
  font-size: 1rem;
  color: #666;
`;

function HomePage() {
  return (
    <HomeContainer>
      <Title>Welcome to Our Store</Title>
      <Text>Find the best products here!</Text>
    </HomeContainer>
  );
}

export default HomePage;
