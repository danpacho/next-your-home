# Blog Lib 📦

1. **`jotai @1.7.0`**

-   Manage your blog's global state through `jotai`, a package containing a **small bundle capacity** of **3.3 kb**

-   You can create another global state by **adding an atom** to a `store object`

-   Global status is accessible as follows

```ts
import { useAtoms, _atom } from "@lib/jotai"

const { your_atom_keyState, your_atom_keySetState } = useAtoms(
    _atom("your_atom_key")
)
```

-   **`your_atom_key`** can be queried with **vs code autocomplete 🧲!**
