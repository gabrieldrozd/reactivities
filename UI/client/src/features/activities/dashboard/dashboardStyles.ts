import styled from "styled-components";
import {Link} from "react-router-dom";

// style to show underline when on hover
export const UserLinkWithOnHover = styled(Link)`
    text-decoration: none;

    &:hover {
        text-decoration: underline;
    }
`;
