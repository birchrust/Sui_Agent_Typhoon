import { atom } from "jotai"
import { atomWithStorage } from "jotai/utils"

export const resultAtom = atomWithStorage("result", "")
export const currenIdAtom = atomWithStorage("currenId", "")
export const urlAtom = atom("")
