import React from 'react';
import styled from 'styled-components';

const HomeContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const HeroSection = styled.section`
  height: 100vh;
  background-image: url('/images/Homepage_Background.JPG');
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
`;



const ScrollIndicator = styled.div`
  position: absolute;
  bottom: 30px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 10;
  cursor: pointer;
`;

const ScrollCircle = styled.div`
  width: 40px;
  height: 40px;
  border: 2px solid #000;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #ffffff;
`;

const ScrollArrow = styled.div`
  width: 0;
  height: 0;
  border-left: 6px solid transparent;
  border-right: 6px solid transparent;
  border-top: 8px solid #000;
  transform: translateY(2px);
`;

const MainContent = styled.section`
  background-color: white;
  padding: 80px 40px;
  position: relative;
`;

const HomepageLabel = styled.div`
  position: absolute;
  top: 20px;
  left: 40px;
  font-size: 14px;
  color: #666;
  font-weight: 400;
  font-family: 'Inter', sans-serif;
  text-transform: lowercase;
`;

const MainTitle = styled.h2`
  font-size: 3rem;
  font-weight: 700;
  color: #000;
  text-align: center;
  margin: 0 0 60px 0;
  font-family: 'Inter', sans-serif;
  line-height: 1.2;

  @media (max-width: 768px) {
    font-size: 2rem;
    margin-bottom: 40px;
    text-align: center;
  }
`;

const AboutSection = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 40px;
  margin-bottom: 80px;
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    text-align: center;
    gap: 20px;
  }
`;

const ProfileImage = styled.img`
  width: 200px;
  height: 200px;
  border-radius: 50%;
  object-fit: cover;
  flex-shrink: 0;

  @media (max-width: 768px) {
    width: 150px;
    height: 150px;
  }
`;

const AboutText = styled.div`
  flex: 1;
  font-size: 16px;
  line-height: 1.6;
  color: #000;
  font-family: 'Inter', sans-serif;
  margin-top: 30px;
`;

const QuotesSection = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
  max-width: 1200px;
  margin: 0 auto;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 20px;
  }
`;

const QuoteCard = styled.div`
  background-color: #f5f5f5;
  padding: 30px;
  border-radius: 15px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

const QuoteText = styled.p`
  font-size: 18px;
  font-weight: 400;
  color: #000;
  margin: 0 0 20px 0;
  line-height: 1.4;
  font-family: 'Inter', sans-serif;
  
  strong {
    font-weight: 700;
  }
`;

const QuoteAuthor = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const AuthorImage = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
`;

const AuthorInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const AuthorName = styled.span`
  font-weight: 600;
  color: #000;
  font-size: 14px;
  font-family: 'Inter', sans-serif;
`;

const AuthorTitle = styled.span`
  color: #666;
  font-size: 12px;
  font-family: 'Inter', sans-serif;
`;

const Home: React.FC = () => {
  const scrollToContent = () => {
    const contentSection = document.querySelector('section:nth-child(2)');
    if (contentSection) {
      contentSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <HomeContainer>
      <HeroSection>
        <ScrollIndicator onClick={scrollToContent}>
          <ScrollCircle>
            <ScrollArrow />
          </ScrollCircle>
        </ScrollIndicator>
      </HeroSection>

      <MainContent>
        <HomepageLabel>homepage</HomepageLabel>
        <MainTitle>What's Goodie! It's your boy RAQ</MainTitle>
        
        <AboutSection>
          <ProfileImage src="/images/profile_icon.JPG" alt="Raquib Alam" />
          <AboutText>
            Yoooo! Hope whoever reading this is having a great day! My Name is Raquib Alam and I am a current 3rd year undergraduate at UC Davis majoring in Computer Science and Stats. This is just a little portfolio website I made for myself to showcase my projects and learnings and love for computer science! In my free time I love to hoop, workout, VIBE CODE, hangout and try new food spots and love watching the lakers and the chargers
          </AboutText>
        </AboutSection>

        <QuotesSection>
          <QuoteCard>
            <QuoteText><strong>"The past is in your head,</strong> the future is in your hands"</QuoteText>
            <QuoteAuthor>
              <AuthorImage src="/images/LeBron.jpg" alt="LeBron James" />
              <AuthorInfo>
                <AuthorName>LeGoat</AuthorName>
                <AuthorTitle>Lakers</AuthorTitle>
              </AuthorInfo>
            </QuoteAuthor>
          </QuoteCard>

          <QuoteCard>
            <QuoteText><strong>"I don't stop when I'm tired.</strong> I Stop when I'm done"</QuoteText>
            <QuoteAuthor>
              <AuthorImage src="/images/goggins.jpg" alt="David Goggins" />
              <AuthorInfo>
                <AuthorName>David G.</AuthorName>
                <AuthorTitle>Goat</AuthorTitle>
              </AuthorInfo>
            </QuoteAuthor>
          </QuoteCard>

          <QuoteCard>
            <QuoteText><strong>"You Prepare, you study.</strong> You gotta stay ready"</QuoteText>
            <QuoteAuthor>
              <AuthorImage src="/images/Rivers.jpeg" alt="Philip Rivers" />
              <AuthorInfo>
                <AuthorName>Phillip R</AuthorName>
                <AuthorTitle>Chargers</AuthorTitle>
              </AuthorInfo>
            </QuoteAuthor>
          </QuoteCard>
        </QuotesSection>
      </MainContent>
    </HomeContainer>
  );
};

export default Home;