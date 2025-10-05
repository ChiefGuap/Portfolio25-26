import React from 'react';
import styled from 'styled-components';

const AboutSection = styled.section`
  padding: ${({ theme }) => theme.spacing['3xl']} 0;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: ${({ theme }) => theme.spacing['4xl']} 0;
  }
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${({ theme }) => theme.spacing.md};

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: 0 ${({ theme }) => theme.spacing.lg};
  }
`;

const SectionTitle = styled.h1`
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing['2xl']};
  color: ${({ theme }) => theme.colors.text};
`;

const AboutContent = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.spacing['2xl']};

  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-template-columns: 1fr 1fr;
    align-items: start;
  }
`;

const AboutText = styled.div`
  p {
    font-size: ${({ theme }) => theme.fontSizes.lg};
    line-height: 1.7;
    margin-bottom: ${({ theme }) => theme.spacing.lg};
    color: ${({ theme }) => theme.colors.textLight};
  }
`;

const SkillsSection = styled.div`
  background-color: ${({ theme }) => theme.colors.surface};
  padding: ${({ theme }) => theme.spacing.xl};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  box-shadow: ${({ theme }) => theme.shadows.sm};
`;

const SkillsTitle = styled.h3`
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  color: ${({ theme }) => theme.colors.text};
`;

const SkillsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: ${({ theme }) => theme.spacing.md};
`;

const SkillCategory = styled.div`
  h4 {
    color: ${({ theme }) => theme.colors.primary};
    margin-bottom: ${({ theme }) => theme.spacing.sm};
    font-size: ${({ theme }) => theme.fontSizes.base};
  }

  ul {
    list-style: none;
    
    li {
      color: ${({ theme }) => theme.colors.textLight};
      margin-bottom: ${({ theme }) => theme.spacing.xs};
      font-size: ${({ theme }) => theme.fontSizes.sm};
      
      &::before {
        content: '▸';
        color: ${({ theme }) => theme.colors.primary};
        margin-right: ${({ theme }) => theme.spacing.xs};
      }
    }
  }
`;

const About: React.FC = () => {
  return (
    <AboutSection>
      <Container>
        <SectionTitle>About Me</SectionTitle>
        <AboutContent>
          <AboutText>
            <p>
              I am a Computer Science student at the University of California, Davis (GPA: 3.6/4.0), 
              with minors in Statistics and Technology Management, driven to build scalable, intelligent 
              systems that solve real-world problems. My academic foundation in algorithms, machine learning, 
              and data structures is complemented by extensive hands-on experience in both corporate and 
              research environments.
            </p>
            <p>
              My professional experience includes a role as a Software Systems Engineer Intern at Northrop 
              Grumman, where I developed automation scripts in Python and Bash that increased operational 
              efficiency by 55%. In a research capacity at the Laboratory for AI, Robotics and Automation, 
              I implemented a curriculum-learning variant of Proximal Policy Optimization (PPO) in PyTorch, 
              boosting robotic grasp success rates by 45% and designing a data-collection pipeline for 
              distributed training on NVIDIA A100 GPUs.
            </p>
            <p>
              Beyond technical roles, I've demonstrated strong product leadership as the Co-Founder and VP 
              of Engineering for Product Space. There, I architected and launched a full-stack web application 
              using React.js and Express.js, built a complete CI/CD pipeline, and mentored a team of over 
              35 student engineers. This passion for building is also reflected in my project portfolio, 
              which includes an AI-powered sports analytics chatbot using LangChain and a hybrid CNN model 
              for brain cancer detection that achieved 93% test accuracy.
            </p>
            <p>
              I am eager to apply this diverse skill set in software engineering, machine learning, and 
              product leadership to create innovative and impactful solutions.
            </p>
          </AboutText>
          
          <SkillsSection>
            <SkillsTitle>Skills & Technologies</SkillsTitle>
            <SkillsGrid>
              <SkillCategory>
                <h4>Languages</h4>
                <ul>
                  <li>Java</li>
                  <li>Python</li>
                  <li>C/C++</li>
                  <li>SQL (Postgres)</li>
                  <li>JavaScript</li>
                  <li>HTML/CSS</li>
                  <li>R</li>
                  <li>Swift</li>
                  <li>GoLang</li>
                </ul>
              </SkillCategory>
              
              <SkillCategory>
                <h4>Frameworks & Libraries</h4>
                <ul>
                  <li>React</li>
                  <li>Node.js</li>
                  <li>Flask</li>
                  <li>Spring Boot</li>
                  <li>FastAPI</li>
                  <li>Streamlit</li>
                  <li>LangChain</li>
                  <li>PyTorch</li>
                  <li>TensorFlow</li>
                  <li>Scikit-learn</li>
                  <li>OpenCV</li>
                  <li>JUnit</li>
                  <li>Material-UI</li>
                  <li>WordPress</li>
                  <li>Playwright</li>
                </ul>
              </SkillCategory>
              
              <SkillCategory>
                <h4>Data & Analysis</h4>
                <ul>
                  <li>pandas</li>
                  <li>NumPy</li>
                  <li>Matplotlib</li>
                  <li>Statsmodels</li>
                  <li>FAISS</li>
                </ul>
              </SkillCategory>
              
              <SkillCategory>
                <h4>Tools & Platforms</h4>
                <ul>
                  <li>Git</li>
                  <li>Docker</li>
                  <li>Travis CI</li>
                  <li>Vercel</li>
                  <li>Supabase</li>
                  <li>Google Cloud Platform (GCP)</li>
                  <li>Linux</li>
                  <li>VS Code</li>
                  <li>PyCharm</li>
                  <li>IntelliJ</li>
                  <li>Eclipse</li>
                  <li>Visual Studio</li>
                  <li>Figma</li>
                  <li>Adobe Creative Suite</li>
                </ul>
              </SkillCategory>
            </SkillsGrid>
          </SkillsSection>
        </AboutContent>
      </Container>
    </AboutSection>
  );
};

export default About;
