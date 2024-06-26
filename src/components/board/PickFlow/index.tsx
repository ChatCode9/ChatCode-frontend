import styled from 'styled-components';

interface PickFlowProps {
  justifyContent?: string;
  margin?: string;
  border?: string;
  borderRadius?: string;
  padding?: string;
  textAlign?: string;
  color?: string;
  fontSize?: string;
  fontWeight?: string;
  width?: string;
}
const BESTS = [
  {
    id: 1,
    category: 'Q&A',
    title: 'ㅁㄴㅇㄻㄴㅇㄻㄴㅇㄻㄴㅇㄻㄴㅇㄻㄴㅇㄻㄴㅇㄻㄴㅇㄻㄴㅇㄻㅁㅁㅁ?',
  },
  {
    id: 2,
    category: '자유',
    title: 'ㅁㄴㅇㄻㄴㅇㄻㄴㅇㄻㄴㅇㄻㄴㅇㄻㄴㅇㄻㄴㅇㄻㄴㅇㄻㄴㅇㄻㅁㅁㅁ?',
  },
  {
    id: 3,
    category: 'Q&A',
    title: 'ㅁㄴㅇㄻㄴㅇㄻㄴㅇㄻㄴㅇㄻㄴㅇㄻㄴㅇㄻㄴㅇㄻㄴㅇㄻㄴㅇㄻㅁㅁㅁ?',
  },
  {
    id: 4,
    category: 'Q&A',
    title: 'ㅁㄴㅇㄻㄴㅇㄻㄴㅇㄻㄴㅇㄻㄴㅇㄻㄴㅇㄻㄴㅇㄻㄴㅇㄻㄴㅇㄻㅁㅁㅁ?',
  },
  {
    id: 5,
    category: 'TOPIC',
    title: 'ㅁㄴㅇㄻㄴㅇㄻㄴㅇㄻㄴㅇㄻㄴㅇㄻㄴㅇㄻㄴㅇㄻㄴㅇㄻㄴㅇㄻㅁㅁㅁ?',
  },
  {
    id: 6,
    category: 'Q&A',
    title: 'ㅁㄴㅇㄻㄴㅇㄻㄴㅇㄻㄴㅇㄻㄴㅇㄻㄴㅇㄻㄴㅇㄻㄴㅇㄻㄴㅇㄻㅁㅁㅁ?',
  },
];
const PickFlow: React.FC<PickFlowProps> = ({
  justifyContent,
  margin,
  border,
  borderRadius,
  padding,
  textAlign,
  color,
  fontSize,
  fontWeight,
  width,
}) => {
  return (
    <Container justifyContent={justifyContent} margin={margin} width={width}>
      <Wrapper border={border} borderRadius={borderRadius} padding={padding}>
        <Title textAlign={textAlign} color={color} fontSize={fontSize} fontWeight={fontWeight}>
          WEEKLY BEST
        </Title>
        <BestList>
          {BESTS.map((best) => (
            <BestItem key={best.id}>
              <div className="category">{best.category}</div>
              <p>{best.title}</p>
            </BestItem>
          ))}
        </BestList>
      </Wrapper>

      <Wrapper border={border} borderRadius={borderRadius} padding={padding}>
        <Title textAlign={textAlign} color={color} fontSize={fontSize} fontWeight={fontWeight}>
          MONTHLY BEST
        </Title>
        <BestList>
          {BESTS.map((best) => (
            <BestItem key={best.id}>
              <div className="category">{best.category}</div>
              <p>{best.title}</p>
            </BestItem>
          ))}
        </BestList>
      </Wrapper>
    </Container>
  );
};

export default PickFlow;

const Container = styled.div<PickFlowProps>`
  display: flex;
  width: ${(props) => props.width};
  justify-content: ${(props) => props.justifyContent || 'space-between'};
  margin: ${(props) => props.margin};
`;

const Wrapper = styled.div<PickFlowProps>`
  max-width: 500px;
  border: ${(props) => props.border};
  border-radius: ${(props) => props.borderRadius};
  padding: ${(props) => props.padding};
`;

const Title = styled.h2<PickFlowProps>`
  margin-bottom: 10px;
  padding-bottom: 5px;
  border-bottom: 1px solid #ccc;
  font-size: 30px;
  text-align: ${(props) => props.textAlign || 'center'};
  color: ${(props) => props.color};
  font-size: ${(props) => props.fontSize};
  font-weight: ${(props) => props.fontWeight};
`;

const BestList = styled.ul`
  padding-left: 10px;
  padding-right: 10px;

  li + li {
    margin-top: 10px;
  }
`;

const BestItem = styled.li`
  display: flex;
  justify-content: center;
  align-items: center;

  .category {
    width: 65px;
    height: 25px;
    background-color: #8d8ba7;
    color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 15px;
  }

  p {
    flex: 1;
    padding: 0 5px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`;
