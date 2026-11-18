//This is where the user can input URLs and their alias to get their shortened URL

"use client"

import {useState, useEffect} from "react";
import styled from "styled-components";
import createURLShortener from "@/lib/createURLShortener";


const StyledWrapper = styled.div`
    background-color: #C1E1C1;
    width: 90%;
    height: 50%;
    margin: 0 auto;
    border: dotted #3368A0 3px;
    padding: 10px;

    @media screen and (max-width: 1000px) {
        height: 40%;
    }
`

const StyledButton = styled.button`
    border: solid 2px cornflowerblue;
    background-color: white;
    display: flex;
    padding: 5px;
    margin: 20px auto;
`


const StyledInput = styled.input`
    width: 50%;
    text-align: center;
    padding: 10px;
    border: solid 2px cornflowerblue;
    border-radius: 5px;
    display: flex;
    margin: auto;
`

const StyledInputLabel = styled.label`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: left;
    color: hotpink;
    
`

const StyledHeader = styled.div`
    color: hotpink;
`

const StyledResult = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    color: midnightblue;
    
`

export default function NewURLCreationForm() {
    const [alias, setAlias] = useState("");
    const [url, setURL] = useState("");
    const [shortenedURL, setShortenedURL] = useState("");
    const [invalid, setInvalid] = useState("");
    const [domain, setDomain] = useState("");

    async function submittedVal() {
        setInvalid("");
        setShortenedURL("");
        try {
            const shortened = await createURLShortener({url, alias});
            if (shortened.length > 0) {
                setInvalid(shortened);
            } else {
                setShortenedURL(`${domain}/${alias}`);
            }
        } catch (e) {
            console.error(e);
            setInvalid("Error creating URL, please try again.");

        }
    }

    useEffect(() => {
       setDomain(window.location.origin);
    }, []);


    return (
        <StyledWrapper>
            <StyledHeader>
                <h1>Please enter your URL</h1>
            </StyledHeader>

            <form onSubmit={(e) =>
            {
                e.preventDefault();
                submittedVal();
            }}
            >

                <StyledInputLabel htmlFor="url-submission"><strong>URL:</strong> </StyledInputLabel>
                <StyledInput
                    name="url-submission"
                    placeholder="Please enter your URL"
                    value={url}
                    onChange={(e) => setURL(e.target.value)}
                    required
                />

                <StyledInputLabel htmlFor="alias-submission"><strong>Alias:</strong></StyledInputLabel>
                <StyledInput
                    name="alias-submission"
                    placeholder="Please enter your alias"
                    value={alias}
                    onChange={(e) => setAlias(e.target.value)}
                    required
                />

                <StyledButton type="submit" disabled={url === "" || alias === ""}>Shorten your url</StyledButton>

                {invalid && <p>{invalid}</p>}

            </form>

            {shortenedURL && (
                <div>
                    <StyledResult>
                        <h3>Here is your shortened URL:</h3>
                        <a href={shortenedURL} target="_blank" rel="noopener noreferrer">
                            {shortenedURL}
                        </a>
                    </StyledResult>
                </div>

            )}

        </StyledWrapper>

    )

}