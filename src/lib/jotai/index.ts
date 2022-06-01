import { Atom, SetStateAction, useAtom } from "jotai"

type StringLiteral<Literal> = Literal extends string
    ? string extends Literal
        ? never
        : Literal
    : never

type AtomGetters<ObjectType, KeyName> = {
    [Property in keyof ObjectType as `${StringLiteral<KeyName>}${Capitalize<
        string & Property
    >}`]: ObjectType[Property]
}

type JotaiStateAction<AtomType> = {
    atom: Atom<AtomType>
    state: AtomType
    setState: (update: SetStateAction<AtomType>) => void
}

type JotaiStateManager<AtomType, TypeName> = AtomGetters<
    JotaiStateAction<AtomType>,
    TypeName
>

const useAtoms = <AtomType, Name extends string>(atomInfo: {
    atom: Atom<AtomType>
    key: Name
}): JotaiStateManager<AtomType, Name> => {
    const [state, setState] = useAtom(atomInfo.atom)
    const jotaiManager: JotaiStateManager<AtomType, Name> = {
        [`${atomInfo.key}Atom`]: atomInfo.atom,
        [`${atomInfo.key}State`]: state,
        [`${atomInfo.key}SetState`]: setState,
    }

    return jotaiManager
}

export { useAtoms }

export * from "./state/state"
