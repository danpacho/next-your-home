import memoize from "fast-memoize"

type Func = (...funcArgs: any[]) => any

/**
 * @param isMemo memo the return value of function
 * @param func memo target function
 * @returns
 */
const memo = <MemoFunc extends Func>(isMemo: boolean, func: MemoFunc) =>
    isMemo ? memoize<MemoFunc>(func) : func

export default memo
