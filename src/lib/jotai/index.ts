import { Atom, SetStateAction, useAtom } from "jotai"

type StringLiteral<Literal> = Literal extends string
    ? string extends Literal
        ? never
        : Literal
    : never

type AtomGetters<ObjectType, AtomName> = {
    [Property in keyof ObjectType as `${StringLiteral<AtomName>}${Capitalize<
        string & Property
    >}`]: ObjectType[Property]
}

type JotaiStateAction<AtomType> = {
    state: AtomType
    setState: (update: SetStateAction<AtomType>) => void
    atom: Atom<AtomType>
}

type JotaiStateManager<AtomType, AtomName> = AtomGetters<
    JotaiStateAction<AtomType>,
    AtomName
>

const useAtoms = <AtomType, AtomName extends string>(atomInfo: {
    atom: Atom<AtomType>
    key: AtomName
}): JotaiStateManager<AtomType, AtomName> => {
    const [state, setState] = useAtom(atomInfo.atom)
    const manager: JotaiStateManager<AtomType, AtomName> = {
        [`${atomInfo.key}State`]: state,
        [`${atomInfo.key}SetState`]: setState,
        [`${atomInfo.key}Atom`]: atomInfo.atom,
    }

    return manager
}

export { useAtoms }

export * from "./state/state"
