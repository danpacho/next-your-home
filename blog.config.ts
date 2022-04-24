export interface UserPalleteType {
    primary1: string
    primary2: string
    primary3: string
    primary4: string
}

const userPallete: UserPalleteType = {
    primary1: "#776350",
    primary2: "#A68A68",
    primary3: "#D9BD9C",
    primary4: "#F2E2CE",
}

const config = {
    //* description file format
    useTXT: false,
    //* personal pallete
    userPallete,
    //* use KaTeX
    useKaTeX: false,
}

export default config
