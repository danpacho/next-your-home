# Lib 📦

1. **`GoogleAnalytics`**

    - Activate Google analytics
    - Run on `partytown🎉` thread, not `main` thread
        - get performance

2. **`jotai`**

    - Manage global state through `jotai`
    - **Small bundle size**
    - Create another global state by **adding an atom** in the `store object` at `@lib/store/index.ts`

    > Global status is accessible as follows

    ```ts
    import { useAtoms, _atom, _slector } from "@lib/jotai"

    const { atom_keyState, atom_keySetState } = useAtoms(_atom("atom_key"))

    const { slector_keyState, slector_keySetState } = useAtoms(
        _slector("slector_key")
    )
    ```

    - **`atom_key`** and **`slector_key`** can be queried with **vs code autocomplete 🧲!**

    1. **`_atom`** means pure global state
    2. **`_slector`** means use **`_atom`** state and derive new global state

---

3. **`unified`**

    - Markdown preprocessing utility function using `unified` package
    - Running on build time means serverside excute, not clientside

    1. `remark`: **Markdown processor**
        - `findMarkdownElement`
            1. find `md` element in `md` string
            2. return `md AST` object
        - `remarkAutomaticImageSize`
            1. local image size extraction
            2. store image size in alt, `(alt:width:height)`
        - `getTableOfContents`
            1. extract `h1` and `h2`
            2. return processed `toc` object
    2. `rehype`: **HTML processor**
        - `rehypeHeaderId`
            1. add header id to `h1` and `h2` element
            2. `id` = `heading` inner text
                > 🚫 Headings should be pure text, don't include another element.
