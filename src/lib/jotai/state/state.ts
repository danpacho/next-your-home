import { AtomStore, SlectorAtomStore } from "../store"

type AtomGetter<AtomProvider, Key extends keyof AtomProvider> = Readonly<{
    atom: AtomProvider[Key]
    key: Key
}>

type AtomStoreKey = keyof typeof AtomStore
const _atom = <Key extends AtomStoreKey>(
    key: Key
): AtomGetter<typeof AtomStore, Key> => ({
    atom: AtomStore[key],
    key,
})

type SlectorAtomKey = keyof typeof SlectorAtomStore
const _slector = <Key extends SlectorAtomKey>(
    key: Key
): AtomGetter<typeof SlectorAtomStore, Key> => ({
    atom: SlectorAtomStore[key],
    key,
})

export { _atom, _slector }
