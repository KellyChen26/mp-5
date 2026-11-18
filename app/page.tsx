import NewURLCreationForm from "@/component/NewURLCreationForm";
import styled from "styled-components";

const StyledText = styled.div`
    color: darkgreen;
    margin: 10px;
`

export default function Home() {
  return (
    <div>
        <StyledText>
            <h2>Shorten and customize your URLs!</h2>
            <p>Enter a URL and alias below!</p>
        </StyledText>
        <NewURLCreationForm/>
    </div>
  );
}