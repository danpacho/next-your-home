# Blog Lib 📦

1. **`jotai @1.7.0`**

    - Manage your blog's global state through `jotai`, a package containing a **small bundle capacity** of **3.3 kb**
    - You can create another global state by **adding an atom** to a `store object`
    - Global status is accessible as follows

    ```ts
    import { useAtoms, _atom, _slector } from "@lib/jotai"

    const { your_atom_keyState, your_atom_keySetState } = useAtoms(
        _atom("your_atom_key")
    )

    const { your_slector_keyState, your_slector_keySetState } = useAtoms(
        _slector("your_slector_key")
    )
    ```

    - `_atom` means pure global state
    - `_slector` means use `_atom` state and derive new global state
    - **`your_atom_key`** and **`your_slector_key`** can be queried with **vs code autocomplete 🧲!**

---

2. **`unified` family package**
    - Markdown preprocessing utility function using `unified` family package
    - Running on build time, means serverside excute
    - `rehypeHeaderId`
        1. add header id to `h1` and `h2`
        2. `id` = `heading` inner text
    - `findMarkdownElement`
        1. find `md` element in pure `md` string
        2. return `AST` object
    - `getTableOfContents`
        1. extract `h1` and `h2`
        2. return processed `toc` object
