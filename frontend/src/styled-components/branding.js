import styled from 'styled-components';


/******************************** BRANDING ********************************/
export const palette = {
    primary_1: "#33FF00",
    primary_2: "#C2FFB2",
    primary_3: "#70FF4C",
    primary_4: "#24B200",
    primary_5: "#198000",
    secondary_1: "#FFF500",
    secondary_2: "#FFFCB2",
    secondary_3: "#FFF84C",
    secondary_4: "#B2AB00",
    secondary_5: "#807A00",
    accent_1: "#00F0FF",
    accent_2: "#B2FAFF",
    accent_3: "#4CF4FF",
    accent_4: "#00A8B2",
    accent_5: "#007880",
    core_1: "#FFFFFF",
    core_2: "#BFBFBF",
    core_3: "808080",
    core_4: "#404040",
    core_5: "#000000",
}

export const Logomark = styled.div`
background-image: url(${props => props.src})
width: 70px;
`

export const ProfilePicture = styled.div`
> img {
    width: ${props => props.size === "small" ? 90 : 140}px;
    border-radius: 50%;
}
`







