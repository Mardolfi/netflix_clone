import { useMatch, useResolvedPath, Link } from "react-router-dom";
import styled from "styled-components";

function CustomLink(props) {
    const resolvedPath = useResolvedPath(props.to)
    const isActive = useMatch({path: resolvedPath.pathname, end: true});

    return ( 
        <LinkStyle to={props.to} style={isActive ? {'fontWeight': 'bolder'} : {'fontWeight': 'lighter'}}>{props.children}</LinkStyle>
    );
}

const LinkStyle = styled(Link)`
    color: white;
    text-decoration: none;
    position: relative;
    top: 45px;
    font-size: 0.8rem;
    height: 20px;
`

export default CustomLink;