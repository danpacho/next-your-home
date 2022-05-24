import {
    RecoilState,
    Resetter,
    SetterOrUpdater,
    RecoilValueReadOnly,
    useRecoilValue,
    useRecoilState,
    useResetRecoilState,
} from "recoil"

type StringLiteral<Literal> = Literal extends string
    ? string extends Literal
        ? never
        : Literal
    : never

type RecoilGetters<ObjectType, KeyName> = {
    [Property in keyof ObjectType as `${StringLiteral<KeyName>}${Capitalize<
        string & Property
    >}`]: ObjectType[Property]
}

type Recoil<AtomType> = {
    state: AtomType
    setState: SetterOrUpdater<AtomType>
    reset: Resetter
    callBack?: () => void
}

type RecoilSlector<AtomType> = {
    state: AtomType
}

type RecoilStateManager<AtomType, TypeName> = RecoilGetters<
    Recoil<AtomType>,
    TypeName
>

type RecoilSlectorManager<AtomType, TypeName> = RecoilGetters<
    RecoilSlector<AtomType>,
    TypeName
>

const useAtom = <AtomType, Name extends string>(atomInfo: {
    atom: RecoilState<AtomType>
    key: Name
}): RecoilStateManager<AtomType, Name> => {
    const [state, setState] = useRecoilState(atomInfo.atom)
    const reset = useResetRecoilState(atomInfo.atom)

    const recoilManager: RecoilStateManager<AtomType, Name> = {
        [`${atomInfo.key}State`]: state,
        [`${atomInfo.key}SetState`]: setState,
        [`${atomInfo.key}Reset`]: reset,
    }

    return recoilManager
}

const useSlector = <AtomType, Name extends string>(atomInfo: {
    atom: RecoilValueReadOnly<AtomType>
    key: Name
}): RecoilSlectorManager<AtomType, Name> => {
    const derivedState = useRecoilValue(atomInfo.atom)
    return {
        [`${atomInfo.key}State`]: derivedState,
    }
}

export { useAtom, useSlector }
export * from "./state"
